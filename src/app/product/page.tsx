import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CapabilityCard } from "@/components/ui/CapabilityCard";
import { Roadmap } from "@/components/sections/Roadmap";
import { Cta } from "@/components/sections/Cta";
import { capabilities } from "@/lib/capabilities";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Product",
  description:
    "Six capabilities, each grounded in your live Shopify data: order tracking, returns, product answers, escalation, guardrails and a triage inbox.",
  path: "/product",
});

export default function ProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Every answer, grounded in your live store."
        lede="Six jobs, each done narrowly and well. None of them improvise on your behalf, and every one shows where its answer came from."
      />

      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => (
            <StaggerItem key={capability.slug} index={i} className="h-full">
              <CapabilityCard capability={capability} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Roadmap />
      <Cta />
    </>
  );
}
