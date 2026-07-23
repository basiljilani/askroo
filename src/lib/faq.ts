/**
 * FAQ content — feeds the homepage accordion and the FAQPage JSON-LD.
 * Answers are plain text so they serialise cleanly into structured data.
 *
 * The first answer carries a CiteChip: the motif earning its keep (§5).
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  /** Optional citation chip rendered under the answer (the motif). */
  cite?: { source: string; latency?: string };
};

export const faqs: FaqItem[] = [
  {
    id: "hallucinations",
    question: "How do you stop it making things up?",
    answer:
      "Four things, working together. It retrieves from your live catalogue rather than a model's memory. Price and stock are fetched live at the moment of the answer, never recalled. Below a confidence threshold it escalates to a human instead of guessing. And we run a weekly audit of 50 real conversations for hallucinated specs, prices or stock — with zero tolerance. The point of the product is that it doesn't bluff, so we measure whether it does.",
    cite: { source: "catalogue · live stock read", latency: "0.2s ago" },
  },
  {
    id: "data",
    question: "What data do you store, and where?",
    answer:
      "PII is retained for 90 days by default. Hosting is in an Australian region. Handling is aligned to the Privacy Act 1988 and the Australian Privacy Principles for Australian merchants, and to GDPR for EU merchants. We request the minimum Shopify scopes needed, and we've completed Shopify's Level 2 protected customer data access. The full detail is on the privacy page.",
  },
  {
    id: "refunds",
    question: "Can it issue refunds?",
    answer:
      "No. It initiates returns. Refunds and order edits stay with you, by design. An agent that can move money on its own is a risk you didn't ask for.",
  },
  {
    id: "theme",
    question: "Will it edit my theme?",
    answer:
      "No. AskRoo installs as a theme app extension, so no theme code is edited and nothing breaks when you switch themes.",
  },
  {
    id: "models",
    question: "Which AI models does it use?",
    answer:
      "Six providers, with a supported-models list published from our eval results rather than picked by brand. On paid tiers you can bring your own key; it's encrypted at rest, validated on entry, and never logged.",
  },
  {
    id: "unknown",
    question: "What happens when it doesn't know?",
    answer:
      "It escalates with full context instead of guessing. The human who picks up gets the transcript, the order and a ticket reference, and the shopper doesn't repeat themselves. That behaviour is the whole point, not a fallback we're embarrassed by.",
  },
  {
    id: "channels",
    question: "Does it handle email, SMS or WhatsApp?",
    answer:
      "Not yet. Web chat is what ships now. Email is Phase 2, SMS and WhatsApp are Phase 3, and voice isn't planned. We'd rather do a few channels properly than all of them badly.",
  },
  {
    id: "multi-store",
    question: "Can I run more than one store?",
    answer: "One store per install in v1.",
  },
  {
    id: "helpdesk",
    question: "Is it a full helpdesk replacement?",
    answer:
      "No. There's no SLA management, no macros, no multi-channel ticketing. It's a support agent with a lightweight inbox, and it's better at that for being narrow.",
  },
  {
    id: "cost",
    question: "How much will the AI usage cost me?",
    answer:
      "It's metered per conversation and modelled into the tiers, so there's no surprise bill. If you'd rather pay your provider directly, bring your own key and there's no per-conversation cap from us.",
  },
  {
    id: "australia",
    question: "Why Australia first?",
    answer:
      "An Australian shopper's evening is a US support team's night, so grounded automation matters more here. We ship Australian English, returns language aligned with Australian Consumer Law, and Australian-region data handling — properly, not as an afterthought.",
  },
];
