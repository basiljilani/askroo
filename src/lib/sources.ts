/**
 * Every market statistic the site cites, with its attribution and year.
 * Drives /sources and the superscript citation links on the homepage.
 *
 * A citation page on a site about citations is the right kind of joke —
 * we play it straight (§11).
 */

export type Source = {
  id: string;
  /** Superscript index shown next to a stat and on the sources page. */
  index: number;
  /** The figure(s) this source backs. */
  claim: string;
  publisher: string;
  title: string;
  year: number;
  note?: string;
};

export const sources: Source[] = [
  {
    id: "au-ecommerce",
    index: 1,
    claim: "Australian online retail spend of $82.6B in 2025, up 14% year on year.",
    publisher: "Marketix Digital",
    title: "Australian eCommerce Statistics 2026",
    year: 2026,
    note: "Australia Post eCommerce data, compiled via Marketix Digital.",
  },
  {
    id: "shopify-scale",
    index: 2,
    claim: "120,000+ live Shopify stores in Australia.",
    publisher: "Craftberry",
    title: "Shopify App Store and merchant scale, 2026",
    year: 2026,
  },
  {
    id: "wismo",
    index: 3,
    claim:
      "WISMO is 30–50% of ecommerce support volume, and over 50% in peak season.",
    publisher: "Decagon, ShippyPro, ClaimLane and LateShipment",
    title: "WISMO share benchmarks",
    year: 2026,
    note: "Range reflects several independent benchmarks.",
  },
  {
    id: "gartner-cost",
    index: 4,
    claim:
      "$13.50 per human-assisted contact versus $1.84 per AI self-service contact.",
    publisher: "Gartner",
    title: "Cost-per-contact benchmark, via AI-CX compendia",
    year: 2026,
  },
  {
    id: "zendesk",
    index: 5,
    claim:
      "88% of contact centres use AI, but only 25% have fully integrated it.",
    publisher: "Zendesk",
    title: "AI adoption survey",
    year: 2026,
  },
  {
    id: "polaris",
    index: 6,
    claim: "AI customer-service market sizing and growth.",
    publisher: "Polaris Market Research",
    title: "AI customer-service market sizing",
    year: 2026,
    note: "Informs the market framing on the About page.",
  },
];

export function getSource(id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}
