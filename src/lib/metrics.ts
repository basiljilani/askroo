/**
 * Two separate arrays, rendered differently (§9):
 *
 *  - productTargets  → labelled TARGET, rendered STATIC. These are
 *    commitments, not measured results. We never animate a number up to a
 *    target we haven't hit — that would borrow the grammar of achievement.
 *
 *  - marketFacts     → sourced third-party data, attributed to /sources.
 *    These are real and may animate.
 *
 * The $13.50-vs-$1.84 pair is the argument. One section is built around it.
 */

export type ProductTarget = {
  id: string;
  /** Static display string — commitment phrasing, never a counted-up number. */
  value: string;
  label: "TARGET";
  caption: string;
};

export type MarketFact = {
  id: string;
  /** Numeric target for the counter (the value it counts up to). */
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** If set, render this static string instead of animating (ranges, pairs). */
  display?: string;
  caption: string;
  /** Links to a source on /sources. */
  sourceId: string;
};

/** Product targets — labelled, static, honest. */
export const productTargets: ProductTarget[] = [
  {
    id: "deflection",
    value: "60%+",
    label: "TARGET",
    caption: "WISMO and returns deflection within 60 days of going live.",
  },
  {
    id: "first-response",
    value: "< 3s",
    label: "TARGET",
    caption: "Median first response, or the conversation escalates.",
  },
  {
    id: "install",
    value: "< 15 min",
    label: "TARGET",
    caption: "From install to live on your storefront.",
  },
  {
    id: "hallucinations",
    value: "0",
    label: "TARGET",
    caption: "Hallucinated specs, prices or stock claims. Audited weekly.",
  },
  {
    id: "providers",
    value: "6",
    label: "TARGET",
    caption: "LLM providers supported, chosen on eval results.",
  },
];

/** Market facts — sourced, attributed, may animate. */
export const marketFacts: MarketFact[] = [
  {
    id: "au-spend",
    value: 82.6,
    prefix: "$",
    suffix: "B",
    decimals: 1,
    caption: "Australian online retail spend in 2025, up 14% year on year.",
    sourceId: "au-ecommerce",
  },
  {
    id: "au-stores",
    value: 120000,
    suffix: "+",
    caption: "Live Shopify stores in Australia.",
    sourceId: "shopify-scale",
  },
  {
    id: "wismo-share",
    value: 50,
    display: "30–50%",
    caption: "of ecommerce support volume is WISMO — over 50% in peak season.",
    sourceId: "wismo",
  },
  {
    id: "ai-adoption",
    value: 88,
    suffix: "%",
    caption: "of contact centres use AI, but only 25% have fully integrated it.",
    sourceId: "zendesk",
  },
];

/** The cost-per-contact comparison — the argument, rendered on its own. */
export const costPerContact = {
  human: { value: 13.5, prefix: "$", decimals: 2, label: "Human-assisted contact" },
  ai: { value: 1.84, prefix: "$", decimals: 2, label: "AI self-service contact" },
  sourceId: "gartner-cost",
} as const;
