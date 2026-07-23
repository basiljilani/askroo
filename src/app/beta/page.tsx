import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { softwareApplicationGraph } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Beta",
  description:
    "AskRoo is in beta. The first three months are free — the whole thing, not a trial. No card, no catch. The only cost is your honest feedback.",
  path: "/beta",
});

function Block({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section className="border-t border-hairline">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.4fr] md:gap-14">
        <div className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display mt-4 text-3xl text-bright md:text-4xl">
            {title}
          </h2>
        </div>
        <div className="max-w-2xl space-y-4 leading-relaxed text-dim">
          {children}
        </div>
      </div>
    </Section>
  );
}

const faq = [
  {
    q: "Do I need a credit card?",
    a: "No. There's nothing to enter, because there's nothing to charge.",
  },
  {
    q: "What's the catch?",
    a: "Feedback. That's genuinely it. Tell us what works and what doesn't.",
  },
  {
    q: "What happens at month four?",
    a: "We'll have talked long before then. Nothing charges automatically, and you won't get a surprise invoice.",
  },
  {
    q: "Can I leave whenever?",
    a: "Yes — uninstall and you're done, and your data goes with you. Closing the tab works too; we'll cope.",
  },
];

export default function BetaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Beta"
        title="The beta deal, in plain English."
        lede="AskRoo is new, and we'd rather earn your trust than your credit card. So here's the whole arrangement, with nothing hidden in a pricing table — because there isn't one yet."
      />

      <Block eyebrow="What it costs" title="Nothing. For three months.">
        <p>
          Your first three months are free. All of it — order tracking, returns,
          product answers, escalation, the triage inbox. Not a stripped-down
          trial that nags you to upgrade. The real thing, on the house, while
          we&rsquo;re both in beta.
        </p>
      </Block>

      <Block
        eyebrow="What we want instead"
        title="Your real tickets and honest feedback."
      >
        <p>
          We learn from actual shopper questions, not a demo store. Send us the
          messy ones. Tell us when Roo gets it wrong, or answers something in a
          way that doesn&rsquo;t sound like you. That&rsquo;s the arrangement,
          and it&rsquo;s the only one for now.
        </p>
      </Block>

      <Block eyebrow="What beta means" title="It's good, not finished.">
        <p>
          Roo is careful by design — it escalates rather than guessing, and it
          never invents an order it can&rsquo;t see. But it&rsquo;s young, and
          you&rsquo;ll find rough edges. When you do, you&rsquo;ll have a direct
          line to the people who can fix them, usually the same week, not a
          ticket that disappears into a queue.
        </p>
      </Block>

      <Block
        eyebrow="After three months"
        title="We'll talk before anything changes."
      >
        <p>
          No surprise invoice. No card sitting on file. No holding your data
          hostage to make you stay. When it&rsquo;s time to talk about what comes
          next, you&rsquo;ll hear it from us first, in plain words, with plenty
          of notice.
        </p>
      </Block>

      <Section className="border-t border-hairline">
        <p className="eyebrow">The short version</p>
        <h2 className="display mt-4 text-3xl text-bright md:text-4xl">
          The questions everyone asks.
        </h2>
        <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {faq.map((item) => (
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
