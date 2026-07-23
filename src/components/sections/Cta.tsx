import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export function Cta() {
  return (
    <Section className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-veil absolute inset-0 -z-10" />
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>The whole point</Eyebrow>
        <h2 className="display mt-5 text-display-l text-bright text-balance">
          Answers your shoppers can check.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lede text-dim">
          Join the Australian beta and put a grounded support agent in front of
          your shoppers — one that shows its source, or escalates instead of
          guessing.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/contact" size="lg" className="w-full sm:w-auto">
            Join the beta
          </Button>
          <Button
            href={`mailto:${siteConfig.contact.email}`}
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto"
          >
            {siteConfig.contact.email}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
