import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PricingCards } from "@/components/pricing/PricingCards";
import { billingNote } from "@/lib/pricing";

export function Pricing() {
  return (
    <Section id="pricing">
      <Reveal>
        <SectionHeading
          eyebrow="Pricing"
          title="Honest tiers, including a real free one."
          lede="The free tier is complete for a micro-store, not a locked demo. Paid tiers add automation and volume."
        />
      </Reveal>

      <Reveal className="mt-14">
        <PricingCards />
      </Reveal>

      <Reveal className="mt-6">
        <p className="max-w-2xl text-sm leading-relaxed text-faint">
          {billingNote}
        </p>
      </Reveal>
    </Section>
  );
}
