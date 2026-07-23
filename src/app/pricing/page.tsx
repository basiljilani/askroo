import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCards } from "@/components/pricing/PricingCards";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { billingNote } from "@/lib/pricing";
import { softwareApplicationGraph } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Four tiers including a genuinely free plan. Priced in USD and billed through the Shopify Billing API, so it lands on your existing Shopify invoice.",
  path: "/pricing",
});

type Cell = boolean | string;

const tierNames = ["Free", "Growth", "Pro", "BYOK"];
const comparison: { label: string; values: Cell[] }[] = [
  { label: "Conversations / month", values: ["100", "1,000", "5,000", "Unlimited"] },
  { label: "Order tracking", values: [true, true, true, true] },
  { label: "Product Q&A", values: [true, true, true, true] },
  { label: "Email escalation", values: [true, true, true, true] },
  { label: "Sourced answers", values: [true, true, true, true] },
  { label: "Returns automation", values: [false, true, true, true] },
  { label: "Guardrails & action log", values: [false, true, true, true] },
  { label: "Analytics & scheduled reports", values: [false, true, true, true] },
  { label: "Helpdesk connectors", values: [false, false, true, true] },
  { label: "Multilingual answers", values: [false, false, true, true] },
  { label: "Bring your own LLM key", values: [false, false, false, true] },
];

const billingFaq = [
  {
    q: "Which currency, and how am I billed?",
    a: "Prices are in USD and charged through the Shopify Billing API, so the cost appears on your existing Shopify invoice. There's no separate card and no new vendor to set up.",
  },
  {
    q: "What counts as a conversation?",
    a: "One shopper thread, however many messages it takes to resolve. Follow-ups in the same thread don't count again.",
  },
  {
    q: "What happens if I reach my limit?",
    a: "We won't cut a shopper off mid-conversation. You'll be prompted to move up a tier, and you can do it in a click.",
  },
  {
    q: "Can I change or cancel tiers?",
    a: "Any time, through Shopify. Changes are prorated the way the rest of your Shopify billing works.",
  },
];

function CheckMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mx-auto h-4 w-4 text-accent-400"
    >
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Pay for what you use, on your Shopify invoice."
        lede="A genuinely free tier for micro-stores, paid tiers that add automation and volume, and bring-your-own-key if you'd rather pay your model provider directly."
      />

      <Section>
        <PricingCards />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-faint">
          {billingNote}
        </p>
      </Section>

      {/* BYOK explainer */}
      <Section className="border-t border-hairline">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.4fr] md:gap-14">
          <SectionHeading
            eyebrow="Bring your own key"
            title="Your model, your bill, no cap."
          />
          <div className="panel p-6 md:p-8">
            <p className="leading-relaxed text-dim">
              On paid tiers you can point AskRoo at your own LLM provider key
              instead of ours. You pay the provider directly, there&rsquo;s no
              per-conversation cap from us, and you keep control of which model
              answers your shoppers.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-dim">
              {[
                "Your key is encrypted at rest, validated on entry, and never logged.",
                "Use any of the six supported providers, chosen on eval results.",
                "Switch back to metered billing whenever you want.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Full comparison */}
      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="Compare" title="Every tier, side by side." />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline-strong">
                <th className="py-4 pr-4 text-left font-medium text-faint">
                  Feature
                </th>
                {tierNames.map((name) => (
                  <th
                    key={name}
                    className="px-4 py-4 text-center font-medium text-bright"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-hairline">
                  <td className="py-4 pr-4 text-dim">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td
                      key={`${row.label}-${i}`}
                      className="px-4 py-4 text-center"
                    >
                      {typeof v === "string" ? (
                        <span className="font-mono text-xs text-dim">{v}</span>
                      ) : v ? (
                        <CheckMark />
                      ) : (
                        <span aria-hidden="true" className="text-faint">
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Billing FAQ */}
      <Section className="border-t border-hairline">
        <SectionHeading eyebrow="Billing" title="The money questions." />
        <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {billingFaq.map((item) => (
            <div key={item.q}>
              <dt className="text-base font-medium text-bright">{item.q}</dt>
              <dd className="mt-2 leading-relaxed text-dim">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Cta />
      <JsonLd data={softwareApplicationGraph()} />
    </>
  );
}
