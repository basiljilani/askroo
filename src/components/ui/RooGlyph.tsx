import { cn } from "@/lib/utils";
import type { GlyphName } from "@/lib/capabilities";

/**
 * Hand-drawn line-art glyphs, one per capability. Geometric, stroke-only,
 * 1.25px, no fills. No icon library — these are the product's own marks.
 */
const GLYPHS: Record<GlyphName, string[]> = {
  // parcel-in-transit: an iso box with motion trails
  parcel: [
    "M12 4 4 8v8l8 4 8-4V8L12 4Z",
    "M4 8l8 4 8-4",
    "M12 12v8",
    "M1.5 10.5H4",
    "M0.8 14H3",
  ],
  // return arc: an arrow that curves back
  return: ["M9 7 4.5 11.5 9 16", "M4.5 11.5H14a5.5 5.5 0 0 1 0 11h-2.5"],
  // tagged catalogue card: doc with folded corner and lines
  catalogue: [
    "M6 3.5h6.5L18 9v9.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z",
    "M12 3.5V9h5.5",
    "M7.5 13h6",
    "M7.5 16.5h4",
  ],
  // handoff bridge: two nodes joined by a directed link
  handoff: [
    "M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M18 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M9 12h6",
    "M13 9.5 15.5 12 13 14.5",
  ],
  // guardrail bracket: brackets around a check
  guardrail: [
    "M8 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3",
    "M16 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3",
    "M9 12l2 2 4-4",
  ],
  // triage stack: a queue with a flagged item
  triage: [
    "M5 6h14",
    "M5 10h14",
    "M5 14h8",
    "M5 18h8",
    "M15 13.5v7l2.4-1.7 2.4 1.7v-7Z",
  ],
};

export function RooGlyph({
  name,
  className,
}: {
  name: GlyphName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
    >
      {GLYPHS[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
