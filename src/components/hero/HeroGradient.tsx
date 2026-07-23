/**
 * Static backdrop for the hero. Deliberately restrained — a single low
 * ochre wash rather than diffuse glow blobs, so the hero reads sharp and
 * leans on the point cloud and type. Also the WebGL fallback / reduced-
 * motion still frame.
 */
export function HeroGradient() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
      <div
        className="absolute left-1/2 top-[-12%] h-[48vh] w-[62vw] max-w-[780px] -translate-x-1/2 rounded-full opacity-30 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent-500) 32%, transparent), transparent 72%)",
        }}
      />
    </div>
  );
}
