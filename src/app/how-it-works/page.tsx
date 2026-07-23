import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Cta } from "@/components/sections/Cta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "How it works",
  description:
    "Install from the Shopify App Store, sync your catalogue and policies, set the rules, and go live — usually in about fifteen minutes, with no theme code edited.",
  path: "/how-it-works",
});

const details = [
  {
    title: "Nothing edits your theme",
    body: "AskRoo installs as a theme app extension. It never touches your theme's code, so switching or updating themes won't break it and there's nothing to paste in.",
  },
  {
    title: "It reads what's already there",
    body: "Your catalogue, returns policy and FAQs are read straight from your store and indexed for retrieval. No exports, no spreadsheets, no manual upload step.",
  },
  {
    title: "Conservative until you say so",
    body: "Defaults lean cautious. Auto-approving returns is off until you turn it on, and every automated action is logged and reversible from the dashboard.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Live on your storefront in about fifteen minutes."
        lede="Four steps, no developer required. Here's the whole setup, and what's happening underneath it."
      />

      <HowItWorks heading={false} />

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow="Why it's quick"
          title="The fifteen minutes, unpacked."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {details.map((d) => (
            <div key={d.title} className="panel p-6">
              <h3 className="text-lg font-medium text-bright">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Cta />
    </>
  );
}
