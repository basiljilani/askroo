"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/hooks";

/* Device-adaptive quality: fewer, larger points on coarse-pointer / low-core
   devices, and a capped DPR everywhere. */
function getQuality() {
  if (typeof window === "undefined") {
    return { detail: 24, size: 5.5, dpr: 1.5 };
  }
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const low = coarse || cores <= 4;
  return low
    ? { detail: 18, size: 7, dpr: 1 }
    : { detail: 32, size: 5, dpr: 1.5 };
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uAmp;
  varying float vElev;

  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0*C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0*C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 dir = normalize(position);
    float n1 = snoise(position * 1.4 + vec3(0.0, uTime * 0.5, 0.0));
    float n2 = snoise(position * 3.0 - vec3(uTime * 0.3));
    float elevation = n1 * 0.7 + n2 * 0.3;
    vElev = elevation * 0.5 + 0.5;

    vec3 displaced = position + dir * elevation * uAmp;
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    gl_PointSize = uSize * uPixelRatio * (1.6 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uWarm;
  uniform vec3 uCold;
  varying float vElev;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uCold, uWarm, smoothstep(0.35, 0.85, vElev));
    gl_FragColor = vec4(color, 1.0) * alpha;
  }
`;

function PointCloud({
  detail,
  size,
  animate,
}: {
  detail: number;
  size: number;
  animate: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const spin = useRef(0);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Icosahedron as GPU points — normals and uvs stripped (unused).
  const geometry = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, detail);
    g.deleteAttribute("normal");
    g.deleteAttribute("uv");
    return g;
  }, [detail]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: size },
      uPixelRatio: {
        value: Math.min(
          typeof window !== "undefined" ? window.devicePixelRatio : 1,
          1.5,
        ),
      },
      uAmp: { value: 0.3 },
      uWarm: { value: new THREE.Color("#e08a38") },
      uCold: { value: new THREE.Color("#3e4a73") },
    }),
    [size],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const uTime = matRef.current?.uniforms.uTime;
    if (uTime && animate) {
      uTime.value += d * 0.3;
    }
    // Eased pointer parallax (damped lerp, never snapped).
    mouse.current.tx = state.pointer.x * 0.35;
    mouse.current.ty = state.pointer.y * 0.25;
    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04;

    if (pointsRef.current) {
      spin.current += d * (animate ? 0.05 : 0);
      pointsRef.current.rotation.y = spin.current + mouse.current.x;
      pointsRef.current.rotation.x = mouse.current.y;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} scale={1.35}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Re-renders the scene once whenever the active state changes, so the
    frameloop="never" case still paints a correct static frame. */
function InvalidateOnChange({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [active, invalidate]);
  return null;
}

export function HeroCanvas() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const quality = useMemo(getQuality, []);

  // Stop rendering entirely when off-screen or the tab is hidden.
  useEffect(() => {
    if (reduced) {
      setActive(false);
      return;
    }
    const el = wrapRef.current;
    if (!el) return;

    let inView = false;
    let visible = !document.hidden;
    const update = () => setActive(inView && visible);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        update();
      },
      { threshold: 0.05 },
    );
    io.observe(el);

    const onVisibility = () => {
      visible = !document.hidden;
      update();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className="animate-fade absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={quality.dpr}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 3.2], fov: 50 }}
      >
        <InvalidateOnChange active={active} />
        <PointCloud
          detail={quality.detail}
          size={quality.size}
          animate={active}
        />
      </Canvas>
    </div>
  );
}
