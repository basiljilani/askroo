"use client";

import dynamic from "next/dynamic";
import { HeroGradient } from "./HeroGradient";

/**
 * WebGL hero background. The Three.js canvas is dynamically imported with
 * ssr:false and only loads on the client; the static gradient sits behind
 * it as the base layer, the loading fallback and the reduced-motion frame.
 */
const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => null },
);

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-20">
      <HeroGradient />
      <HeroCanvas />
    </div>
  );
}
