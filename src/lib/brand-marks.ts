/**
 * The platforms AskRoo is grounded in and speaks to, for the StackMarquee.
 *
 * Rendered as simple monochrome wordmarks with abstract geometric glyphs —
 * deliberately NOT the third-party trademarks, and never hotlinked from a
 * logo CDN. Grouped by relationship, because "grounded in", "reads from"
 * and "runs on" are three different truths (§ pushback 4c).
 */

export type MarkGroup = "Grounded in" | "Reads from" | "Runs on";

export type BrandMark = {
  name: string;
  group: MarkGroup;
  /** Key into GLYPHS below. */
  glyph: GlyphKey;
};

export type GlyphKey =
  | "orbit"
  | "stack"
  | "wave"
  | "node"
  | "hex"
  | "bolt"
  | "ring"
  | "grid"
  | "spark"
  | "prism"
  | "vector";

export const brandMarks: BrandMark[] = [
  // Grounded in — the data AskRoo answers from.
  { name: "Shopify", group: "Grounded in", glyph: "hex" },
  { name: "Postgres", group: "Grounded in", glyph: "stack" },
  { name: "pgvector", group: "Grounded in", glyph: "vector" },
  // Reads from — carriers and fulfilment it looks up live.
  { name: "Australia Post", group: "Reads from", glyph: "wave" },
  { name: "Shippit", group: "Reads from", glyph: "bolt" },
  // Runs on — the LLM providers it can be pointed at.
  { name: "Claude", group: "Runs on", glyph: "spark" },
  { name: "GPT", group: "Runs on", glyph: "orbit" },
  { name: "Gemini", group: "Runs on", glyph: "prism" },
  { name: "Kimi", group: "Runs on", glyph: "ring" },
  { name: "Qwen", group: "Runs on", glyph: "node" },
  { name: "DeepSeek", group: "Runs on", glyph: "grid" },
];

/**
 * Abstract monochrome glyphs (24×24, stroke-only). Rendered with
 * currentColor. Intentionally generic — texture, not trademarks.
 */
export const GLYPHS: Record<GlyphKey, string> = {
  orbit:
    "M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM3 12h2M19 12h2",
  stack:
    "M4 8l8-4 8 4-8 4-8-4ZM4 12l8 4 8-4M4 16l8 4 8-4",
  wave: "M3 14c3 0 3-4 6-4s3 4 6 4 3-4 6-4",
  node: "M12 4v6M12 14v6M6 12h12M9 9l6 6M15 9l-6 6",
  hex: "M12 3l7 4v10l-7 4-7-4V7l7-4Z",
  bolt: "M13 3 5 13h6l-1 8 8-11h-6l1-7Z",
  ring: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  grid: "M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z",
  spark: "M12 3v6M12 15v6M3 12h6M15 12h6M6.5 6.5l3 3M17.5 6.5l-3 3",
  prism: "M12 3 3 19h18L12 3ZM12 3v16",
  vector: "M6 18 18 6M8 6H18v10",
};
