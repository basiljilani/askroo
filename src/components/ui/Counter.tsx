"use client";

import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { cn } from "@/lib/utils";

function format(n: number, decimals: number) {
  return new Intl.NumberFormat("en-AU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/**
 * Counts a number up once, in view, on an easeOutExpo curve. Renders the
 * final value immediately if JS or motion is unavailable, or if it's
 * already visible on load — so the number is never missing.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value); // final value by default (SSR / no-JS safe)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only animate elements that begin below the fold.
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;

    setN(0);
    let raf = 0;
    let start = 0;
    const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          obs.disconnect();
          const tick = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            setN(value * easeOutExpo(p));
            if (p < 1) raf = requestAnimationFrame(tick);
            else setN(value);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {format(n, decimals)}
      {suffix}
    </span>
  );
}
