import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Cta } from "@/components/sections/Cta";
import { SourceRef } from "@/components/ui/SourceRef";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Why AskRoo is Australian-first, why it stays deliberately narrow, and an honest account of where the product is: pre-launch, in a short build to App Store submission.",
  path: "/about",
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

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A support agent that would rather escalate than bluff."
        lede="AskRoo exists because merchants have been burned by chatbots that sound confident and get it wrong. The fix isn't a better-sounding bot. It's one that reads your live data and shows its source."
      />

      <Block eyebrow="Why Australia first" title="An Australian evening is a US team's night.">
        <p>
          When an Australian shopper asks where their order is at 9pm, the
          support teams that could answer are asleep on the other side of the
          world. Grounded automation matters more here, not less.
        </p>
        <p>
          So we start local and do it properly: Australian English, returns
          language written to sit correctly alongside Australian Consumer Law,
          and data handled in an Australian region under the Privacy Act 1988
          and the Australian Privacy Principles. There are over 120,000 live
          Shopify stores in Australia
          <SourceRef id="shopify-scale" /> — this is a real market, not a test
          bed.
        </p>
      </Block>

      <Block eyebrow="Why narrow" title="Better at a few things than mediocre at everything.">
        <p>
          AskRoo is not a helpdesk. There's no SLA management, no macros, no
          multi-channel ticketing. It answers where-is-my-order, returns and
          product questions from live store data, escalates cleanly when it
          should, and sorts what's left in a lightweight inbox.
        </p>
        <p>
          That narrowness is the point. WISMO alone is 30–50% of ecommerce
          support volume
          <SourceRef id="wismo" /> — and over half in peak. Automating a few
          high-volume jobs without ever inventing an answer is worth more than a
          broad tool that bluffs.
        </p>
      </Block>

      <Block eyebrow="Where we are" title="Pre-launch, and honest about it.">
        <p>
          AskRoo is pre-revenue and in a short build toward Shopify App Store
          submission. There are no customers to quote yet, so we don't. The
          numbers on this site are either sourced third-party market data or
          clearly-labelled targets we're building toward — never results we
          haven&rsquo;t measured.
        </p>
        <p>
          If that reads as cautious, good. A product whose entire pitch is that
          it doesn&rsquo;t make things up shouldn&rsquo;t make things up about
          itself.
        </p>
      </Block>

      <Block eyebrow="Who's building it" title="A small team, close to the work.">
        <p>
          AskRoo is built by a small team in Sydney. Being early means you talk
          to the people writing the code, not a support queue, and the roadmap
          bends to what founding merchants actually need.
        </p>
        <p>
          If that&rsquo;s the kind of vendor you want on a young but important
          part of your store, the founding cohort is open.
        </p>
      </Block>

      <Cta />
    </>
  );
}
