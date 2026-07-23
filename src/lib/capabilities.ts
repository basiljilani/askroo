/**
 * The product's capabilities — one typed list that drives the homepage
 * grid, /product, /product/[slug], footer links and the contact form's
 * "area of interest" select.
 *
 * Copy follows the honesty rules (§9): capabilities describe what the
 * product does and what it deliberately won't do. No measured results.
 */

export type GlyphName =
  | "parcel"
  | "return"
  | "catalogue"
  | "handoff"
  | "guardrail"
  | "triage";

export type Phase =
  | "Available at launch"
  | "Phase 2"
  | "Phase 3";

export type CapabilityExample = {
  question: string;
  answer: string;
  source: string;
  latency?: string;
};

export type Capability = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  longDescription: string;
  outcomes: string[];
  includes: string[];
  /** What live data this capability reads. */
  grounding: string;
  /** What it deliberately won't do. */
  limits: string[];
  glyph: GlyphName;
  featured: boolean;
  phase: Phase;
  /** A grounded example answer, for the CiteChip motif on the detail page. */
  example?: CapabilityExample;
};

export const capabilities: Capability[] = [
  {
    slug: "order-tracking",
    title: "Order tracking",
    tagline: "Where's my order, answered.",
    summary:
      "Verifies the shopper, then reads live fulfilment and tracking status straight from your store. No guessed dates.",
    longDescription:
      "The most common ticket you get is the one AskRoo is built to end. When a shopper asks where their order is, AskRoo verifies them by email and order number, then reads live fulfilment and tracking status through Shopify's Admin API. The answer is whatever your carrier is actually reporting, at the moment of asking — not a plausible-sounding guess.",
    outcomes: [
      "WISMO tickets answered without a human touching them",
      "Shoppers get carrier-accurate status day or night",
      "Every answer carries the order it came from",
    ],
    includes: [
      "Email + order-number verification before any detail is shared",
      "Live fulfilment and tracking read at answer time",
      "Carrier status passed through verbatim, with its source",
    ],
    grounding:
      "Live order, fulfilment and tracking data via the Shopify Admin API, fetched at the moment the shopper asks.",
    limits: [
      "Never guesses a delivery date the carrier hasn't given.",
      "Won't share order details until the shopper is verified.",
    ],
    glyph: "parcel",
    featured: true,
    phase: "Available at launch",
    example: {
      question: "Hey, where's my order? It's been a few days.",
      answer:
        "Your order shipped Tuesday and is with Australia Post now. Tracking says it's out for delivery today.",
      source: "order #1042",
      latency: "fetched 0.4s ago",
    },
  },
  {
    slug: "returns-and-exchanges",
    title: "Returns and exchanges",
    tagline: "Eligibility checked, return started, in chat.",
    summary:
      "Runs your actual returns policy as a rules engine and can start a return — without ever touching a refund.",
    longDescription:
      "Returns are where generic bots do the most damage, because getting the policy wrong has a cost. AskRoo runs your real returns policy as a rules engine: it checks the item, the window and the condition, tells the shopper plainly whether they're eligible, and can initiate the return there and then. The language is written to sit correctly alongside Australian Consumer Law, so a shopper's statutory rights are never talked over.",
    outcomes: [
      "Eligible returns started in the conversation, not a follow-up email",
      "Consistent policy answers that match what you actually wrote",
      "Refund decisions stay with you",
    ],
    includes: [
      "Your returns policy encoded as checkable rules",
      "Return initiation from inside the chat",
      "Returns language aligned with Australian Consumer Law",
    ],
    grounding:
      "Your published returns policy plus the live order's items, dates and fulfilment state.",
    limits: [
      "Initiates returns only — never executes refunds.",
      "Never edits orders autonomously.",
      "Auto-approval stays off until you turn it on.",
    ],
    glyph: "return",
    featured: true,
    phase: "Available at launch",
    example: {
      question: "I bought these boots two weeks ago, can I return them?",
      answer:
        "Yes — they're inside your 30-day window and unworn items qualify. I've started the return and emailed you the label.",
      source: "order #0987 · returns policy",
      latency: "checked 0.3s ago",
    },
  },
  {
    slug: "product-answers",
    title: "Product answers",
    tagline: "Catalogue-grounded product Q&A.",
    summary:
      "Retrieval over your full live catalogue, with price and stock fetched fresh at answer time — never recalled.",
    longDescription:
      "Shoppers ask about fit, materials, compatibility and what's in stock. AskRoo answers from your catalogue, not from a model's memory: retrieval-augmented generation over the full live catalogue, kept in sync by webhook and reconciled nightly. Price and stock are fetched live at the moment of the answer, so a shopper is never quoted a number that changed an hour ago. When it isn't confident enough, it escalates instead of guessing.",
    outcomes: [
      "Product questions answered from your real catalogue",
      "Prices and stock levels that are current, not cached",
      "Low-confidence questions handed to a human, not fabricated",
    ],
    includes: [
      "Retrieval over the full catalogue (pgvector on Postgres)",
      "Incremental webhook sync with a nightly reconcile",
      "Live price and stock lookup at answer time",
    ],
    grounding:
      "Your live product catalogue, embedded for retrieval, with price and inventory read live per answer.",
    limits: [
      "Below a confidence threshold it escalates rather than guessing.",
      "Never invents specs, prices or stock claims.",
    ],
    glyph: "catalogue",
    featured: true,
    phase: "Available at launch",
    example: {
      question: "Is the merino base layer in stock in medium?",
      answer:
        "Yes — 6 in stock in medium right now, $89. It's 100% merino, 190gsm.",
      source: "catalogue · SKU MER-190-M",
      latency: "stock read 0.2s ago",
    },
  },
  {
    slug: "escalation",
    title: "Escalation",
    tagline: "A handoff that doesn't restart the conversation.",
    summary:
      "When a human is needed, they get the full transcript, order context and a ticket reference. The shopper never repeats themselves.",
    longDescription:
      "The measure of a good support agent isn't only what it answers — it's how cleanly it steps aside. When AskRoo escalates, the merchant receives the full transcript, the order context and a ticket reference in their inbox. The shopper doesn't start over, and your team doesn't reconstruct what already happened. A handoff is a continuation, not a reset.",
    outcomes: [
      "Humans pick up with full context, not a cold start",
      "Shoppers never repeat their question to a second responder",
      "A clean ticket reference on every handoff",
    ],
    includes: [
      "Full conversation transcript delivered to your inbox",
      "Order and shopper context attached",
      "A ticket reference the shopper can quote",
    ],
    grounding:
      "The live conversation, the shopper's verified identity and the associated order context.",
    limits: [
      "Hands off to your inbox — it isn't a full ticketing suite.",
      "You decide the escalation thresholds; it follows them.",
    ],
    glyph: "handoff",
    featured: false,
    phase: "Available at launch",
    example: {
      question: "This is the third time my parcel's been sent to the wrong address.",
      answer:
        "That's not right, and I want a person on it. I've passed your full conversation and order to the team — reference SR-2213. They'll reply to this thread.",
      source: "ticket SR-2213 · order #0761",
      latency: "handed off 0.1s ago",
    },
  },
  {
    slug: "guardrails",
    title: "Guardrails",
    tagline: "You set the rules once; it doesn't improvise.",
    summary:
      "Brand voice, banned topics, discount policy, escalation thresholds. Every automated action is logged, visible and reversible.",
    longDescription:
      "AskRoo does what you tell it to and nothing you didn't. You set the brand voice, the topics it won't touch, the discount policy and the thresholds at which it escalates — once, in plain settings. Every automated action it takes is logged, visible in the dashboard and reversible. There's no improvising on your behalf, because a support agent that surprises you is a liability, not a feature.",
    outcomes: [
      "Answers that sound like your store, within the lines you set",
      "A complete, inspectable log of every automated action",
      "Anything it did, you can undo",
    ],
    includes: [
      "Brand voice, banned topics and discount policy controls",
      "Configurable escalation thresholds",
      "Full action log — visible and reversible in the dashboard",
    ],
    grounding:
      "Your configured rules, applied to every conversation and every automated action.",
    limits: [
      "Won't take an action you haven't allowed.",
      "Conservative defaults; you widen them deliberately.",
    ],
    glyph: "guardrail",
    featured: false,
    phase: "Available at launch",
    example: {
      question: "Can you give me 40% off? Another shop did.",
      answer:
        "I can't apply a discount that isn't part of your store's offers, so I won't invent one. Here's the current promotion, and I can flag your note to the team.",
      source: "guardrail · discount policy",
      latency: "rule checked 0.1s ago",
    },
  },
  {
    slug: "inbox-and-triage",
    title: "Inbox and triage",
    tagline: "The queue, sorted by what actually matters.",
    summary:
      "A lightweight support inbox with AI severity rating, a written rationale, staff override and reply from your own domain.",
    longDescription:
      "Not everything gets automated, so what's left needs to be sorted well. AskRoo's inbox rates each conversation from Low to Urgent and shows you why, in a written rationale you can override. You can forward to a supervisor in one click, reply from your own SMTP domain, and receive scheduled daily, weekly or monthly reports. It's deliberately narrow — a lightweight inbox that's good at triage, not a helpdesk pretending to be everything.",
    outcomes: [
      "The urgent conversation surfaces before the trivial one",
      "A written reason for every severity rating, not a mystery score",
      "Replies that come from your own domain",
    ],
    includes: [
      "AI severity rating (Low → Urgent) with a written rationale",
      "Staff override and one-click forward to a supervisor",
      "Reply from your own SMTP domain",
      "Scheduled daily, weekly and monthly reports",
    ],
    grounding:
      "The content of each conversation, rated against severity signals you can review and override.",
    limits: [
      "A lightweight inbox — no SLA management, macros or multi-channel ticketing.",
      "Severity is a suggestion; your staff have the final call.",
    ],
    glyph: "triage",
    featured: false,
    phase: "Available at launch",
    example: {
      question: "My order arrived smashed and I need it for a gift tomorrow.",
      answer:
        "Rated Urgent: damaged item, time-critical. Rationale — negative sentiment, deadline in under 24h. Forwarded to your supervisor queue.",
      source: "triage · severity: Urgent",
      latency: "rated 0.2s ago",
    },
  },
];

/** Featured capabilities, in list order. */
export const featuredCapabilities = capabilities.filter((c) => c.featured);

/** Look up a capability by slug. */
export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}

/** Options for the contact form's "area of interest" select. */
export const interestOptions = [
  ...capabilities.map((c) => ({ value: c.slug, label: c.title })),
  { value: "beta", label: "Joining the beta" },
  { value: "other", label: "Something else" },
];

/** Channel roadmap — clearly not yet available. Builds credibility. */
export type RoadmapItem = {
  channel: string;
  phase: Phase | "Not planned";
  timing: string;
  detail: string;
  available: boolean;
};

export const channelRoadmap: RoadmapItem[] = [
  {
    channel: "Web chat",
    phase: "Available at launch",
    timing: "Now",
    detail: "The storefront widget. This is what ships first.",
    available: true,
  },
  {
    channel: "Email",
    phase: "Phase 2",
    timing: "+4–6 weeks",
    detail: "Answering support email with the same grounding as web chat.",
    available: false,
  },
  {
    channel: "SMS + WhatsApp",
    phase: "Phase 3",
    timing: "+6–8 weeks",
    detail: "The same agent on the channels shoppers already message from.",
    available: false,
  },
  {
    channel: "Voice",
    phase: "Not planned",
    timing: "Out of scope",
    detail: "Not on the roadmap. We'd rather do fewer channels properly.",
    available: false,
  },
];
