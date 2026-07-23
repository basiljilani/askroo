/**
 * The AskRoo mark, defined once so the React component, favicon, apple
 * icon and OG image never drift.
 *
 * A clean, professional chat bubble with a typing indicator — the iconic
 * support-chat glyph — cut into the ochre tile. Flat, no glow, legible at
 * a favicon.
 */

/** The speech bubble body + tail (fill inherited from the parent <g>). */
export const MARK_BUBBLE = `<rect x="23" y="26" width="54" height="39" rx="15.5"/><path d="M34 60 L28 75 L50 62 Z"/>`;

/** The three typing dots (rendered in the tile colour, so they read as holes). */
export const MARK_DOTS = `<circle cx="37" cy="45.5" r="5.2"/><circle cx="50" cy="45.5" r="5.2"/><circle cx="63" cy="45.5" r="5.2"/>`;

/** Self-contained SVG string (hex colours) for static / Satori contexts. */
export function markSvg(opts?: {
  tile?: string;
  glyph?: string;
  rx?: number;
}): string {
  const tile = opts?.tile ?? "#e08a38";
  const glyph = opts?.glyph ?? "#08090d";
  const rx = opts?.rx ?? 26;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="3" y="3" width="94" height="94" rx="${rx}" fill="${tile}"/><g fill="${glyph}">${MARK_BUBBLE}</g><g fill="${tile}">${MARK_DOTS}</g></svg>`;
}

/** The mark as a data URI, for <img> in Satori (OG image, apple icon). */
export function markDataUri(opts?: Parameters<typeof markSvg>[0]): string {
  return `data:image/svg+xml,${encodeURIComponent(markSvg(opts))}`;
}
