/**
 * The AskRoo mark, defined once so the React component, favicon, apple
 * icon and OG image never drift.
 *
 * A clean, friendly kangaroo silhouette — leaning forward, tail sweeping
 * back, long hind foot — set as a dark cut-out in the ochre tile. Flat,
 * no glow, and legible down to a favicon.
 */

/** The kangaroo shapes, colourless — they inherit fill/stroke from the parent <g>. */
export const ROO_INNER = `<path d="M40 66 C 32 74, 22 81, 13 85" fill="none" stroke-width="12"/><path d="M49 66 L52 83 L75 85" fill="none" stroke-width="12"/><path d="M64 30 C 60 25, 53 25, 49 30 C 44 36, 41 45, 40 54 C 39 61, 42 67, 49 68 C 56 69, 62 64, 64 57 C 66 50, 67 42, 66 37 C 65.5 34, 65 32, 64 30 Z"/><path d="M60 46 L70 50" fill="none" stroke-width="5"/><circle cx="63" cy="25" r="10"/><ellipse cx="75" cy="27" rx="8" ry="5" transform="rotate(8 75 27)"/><path d="M58 18 L51 5" fill="none" stroke-width="6"/><path d="M65 16 L64 2" fill="none" stroke-width="6"/>`;

/** Positions the kangaroo, with padding, inside the 100×100 tile. */
export const ROO_TRANSFORM = "translate(11 12) scale(0.8)";

/** Self-contained SVG string (hex colours) for static / Satori contexts. */
export function markSvg(opts?: {
  tile?: string;
  glyph?: string;
  rx?: number;
}): string {
  const tile = opts?.tile ?? "#e08a38";
  const glyph = opts?.glyph ?? "#08090d";
  const rx = opts?.rx ?? 26;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="3" y="3" width="94" height="94" rx="${rx}" fill="${tile}"/><g fill="${glyph}" stroke="${glyph}" stroke-linecap="round" stroke-linejoin="round" transform="${ROO_TRANSFORM}">${ROO_INNER}</g></svg>`;
}

/** The mark as a data URI, for <img> in Satori (OG image, apple icon). */
export function markDataUri(opts?: Parameters<typeof markSvg>[0]): string {
  return `data:image/svg+xml,${encodeURIComponent(markSvg(opts))}`;
}
