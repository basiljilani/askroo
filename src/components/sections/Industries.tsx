import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

const industries = [
  {
    name: "Fashion and apparel",
    line: "Sizing, fit and returns, answered from your actual policy.",
  },
  {
    name: "Health, beauty and supplements",
    line: "Ingredient and usage questions, grounded in your catalogue.",
  },
  {
    name: "Homewares and furniture",
    line: "Dimensions, stock and delivery windows, read live.",
  },
  {
    name: "Food and beverage",
    line: "Allergens, freshness and shipping, straight from your product data.",
  },
  {
    name: "Sporting goods and outdoor",
    line: "Compatibility and spec questions, answered from the catalogue.",
  },
  {
    name: "Electronics and accessories",
    line: "Specs, compatibility and warranty, without guessing.",
  },
];

export function Industries() {
  return (
    <Section id="industries">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.4fr] md:gap-14">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="Who it's for"
              title="Built for where Australian Shopify actually sells."
              lede="The same grounded answers, tuned to the questions each category gets asked most."
            />
          </Reveal>
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
          {industries.map((industry, i) => (
            <StaggerItem
              key={industry.name}
              index={i}
              className="bg-ink p-6 transition-colors hover:bg-elev-1"
            >
              <h3 className="text-base font-medium text-bright">
                {industry.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">
                {industry.line}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
