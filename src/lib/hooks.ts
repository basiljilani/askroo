"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** useLayoutEffect that no-ops on the server (avoids the SSR warning). */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** True if the user prefers reduced motion. Reactive to changes. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Scroll direction for the hide-on-down / reveal-on-up header (§4).
 * Returns "up" | "down" and whether the page is scrolled past a threshold.
 */
export function useScrollDirection(threshold = 24) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > threshold);
      // Ignore tiny jitters and the rubber-band at the very top.
      if (Math.abs(y - lastY.current) > 6) {
        setDirection(y > lastY.current && y > 80 ? "down" : "up");
        lastY.current = y;
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, scrolled };
}

/**
 * The "armed" reveal hook. Returns a ref to attach to an element.
 * Only arms (hides, then reveals on scroll) when the element starts below
 * the fold on mount AND motion is allowed. Otherwise the element is left
 * exactly as server-rendered: visible and static.
 */
export function useArmedReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only arm elements that begin below the fold — never hide what's
    // already on screen.
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;

    el.dataset.reveal = "armed";

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = "shown";
            obs.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
