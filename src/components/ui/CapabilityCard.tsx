"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { Capability } from "@/lib/capabilities";
import { RooGlyph } from "./RooGlyph";
import { ArrowRight } from "./ArrowRight";

/**
 * A capability card with a cursor-tracked radial ochre spotlight. The
 * pointer position is written to CSS custom properties on mousemove — not
 * React state — so hovering never triggers a re-render.
 */
export function CapabilityCard({
  capability,
  className,
}: {
  capability: Capability;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={`/product/${capability.slug}`}
      onMouseMove={onMove}
      className={cn(
        "group panel relative block overflow-hidden p-6 transition-transform duration-300 ease-out-expo hover:-translate-y-1",
        className,
      )}
    >
      {/* Cursor spotlight — driven by --mx/--my, no re-render. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0px), color-mix(in oklab, var(--color-accent-400) 15%, transparent), transparent 60%)",
        }}
      />
      <div className="relative">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-elev-1 text-accent-300 transition-transform duration-300 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
          <RooGlyph name={capability.glyph} className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-lg font-medium text-bright">
          {capability.title}
        </h3>
        <p className="mt-1 font-mono text-caption text-accent-300/90">
          {capability.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-dim">
          {capability.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-bright">
          Learn more
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
