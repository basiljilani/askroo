import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { CapabilityCard } from "@/components/ui/CapabilityCard";
import { capabilities } from "@/lib/capabilities";

export function CapabilitiesGrid() {
  return (
    <Section id="capabilities">
      <Reveal>
        <SectionHeading
          eyebrow="What it does"
          title="Six jobs, each done narrowly and well."
          lede="Every one reads live store data and shows its work. None of them improvise on your behalf."
        />
      </Reveal>

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, i) => (
          <StaggerItem key={capability.slug} index={i} className="h-full">
            <CapabilityCard capability={capability} className="h-full" />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10">
        <Button href="/product" variant="secondary" className="group">
          See how each one is grounded
          <ArrowRight />
        </Button>
      </Reveal>
    </Section>
  );
}
