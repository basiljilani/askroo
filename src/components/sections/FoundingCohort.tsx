import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";

const youGet = [
  "A direct line to the team building it, not a support queue",
  "Founding pricing, locked for as long as you stay",
  "Real influence on what gets built next",
];

const weAsk = [
  "Real ticket volume, so we learn from actual shoppers",
  "About thirty minutes of feedback a week",
  "Patience with a young product that's honest about its edges",
];

export function FoundingCohort() {
  return (
    <Section id="founding-cohort">
      <Reveal>
        <SectionHeading
          eyebrow="Founding cohort"
          title="Be one of the first Australian stores on AskRoo."
          lede="AskRoo is pre-launch and we're not pretending otherwise. Instead of borrowed testimonials, here's a straight offer to the merchants who get in early."
        />
      </Reveal>

      <Reveal className="mt-12">
        <div className="panel p-6 md:p-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-300">
                What you get
              </h3>
              <ul className="mt-5 space-y-3.5">
                {youGet.map((item) => (
                  <li key={item} className="flex gap-3 text-dim">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
                What we ask
              </h3>
              <ul className="mt-5 space-y-3.5">
                {weAsk.map((item) => (
                  <li key={item} className="flex gap-3 text-dim">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-faint"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-dim">
              The first cohort is twenty Australian Shopify stores. We review
              applications one at a time.
            </p>
            <Button href="/contact" className="group shrink-0">
              Apply for the beta
              <ArrowRight />
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
