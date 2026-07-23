/**
 * Pricing tiers. Prices are in USD, per Shopify billing convention, and
 * are charged through the Shopify Billing API — so they appear on the
 * merchant's existing Shopify invoice. Both facts are surfaced in the UI.
 *
 * The free tier is honest and prominent (§9): it's genuinely complete for
 * a micro-store, not a crippled trial.
 */

export type PricingTier = {
  id: string;
  name: string;
  /** Display price, e.g. "$0", "$29". */
  price: string;
  /** Cadence label, e.g. "/mo". Empty for BYOK. */
  cadence: string;
  priceNote?: string;
  conversations: string;
  tagline: string;
  features: string[];
  /** Visually highlighted as the default recommendation. */
  featured?: boolean;
  /** The BYOK card: hairline-strong border, no fill. */
  distinct?: boolean;
  cta: { label: string; href: string };
};

export const billingNote =
  "Prices in USD, per Shopify billing convention. Billing runs through the Shopify Billing API, so it lands on your existing Shopify invoice — no separate card, no new vendor to set up.";

export const pricing: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "",
    conversations: "100 conversations / mo",
    tagline: "Complete for micro-stores — not a trial.",
    features: [
      "Order tracking",
      "Product Q&A",
      "Email escalation",
      "Every answer shows its source",
    ],
    cta: { label: "Start free", href: "/contact" },
  },
  {
    id: "growth",
    name: "Growth",
    price: "$29",
    cadence: "/mo",
    conversations: "1,000 conversations / mo",
    tagline: "For a store that's past its first hires.",
    features: [
      "Everything in Free",
      "Returns automation",
      "Guardrails and action log",
      "Analytics and scheduled reports",
    ],
    featured: true,
    cta: { label: "Join the beta", href: "/contact" },
  },
  {
    id: "pro",
    name: "Pro",
    price: "$79",
    cadence: "/mo",
    conversations: "5,000 conversations / mo",
    tagline: "For higher volume and more languages.",
    features: [
      "Everything in Growth",
      "Helpdesk connectors",
      "Multilingual answers",
      "Priority catalogue sync",
    ],
    cta: { label: "Join the beta", href: "/contact" },
  },
  {
    id: "byok",
    name: "BYOK",
    price: "Growth or Pro price",
    cadence: "",
    priceNote: "You pay your LLM provider directly.",
    conversations: "Unlimited conversations",
    tagline: "Bring your own key. No conversation cap.",
    features: [
      "All Growth or Pro features",
      "Your own LLM provider key",
      "Key encrypted at rest, validated, never logged",
      "No per-conversation metering from us",
    ],
    distinct: true,
    cta: { label: "Talk to us about BYOK", href: "/contact" },
  },
];
