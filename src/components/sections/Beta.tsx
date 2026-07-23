import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";

export function Beta() {
  return (
    <Section id="beta">
      <Reveal>
        <div className="panel p-8 text-center md:p-14">
          <Eyebrow>Beta · on the house</Eyebrow>

          <h2 className="display mx-auto mt-5 max-w-3xl text-display-l text-bright">
            There&rsquo;s no pricing page.
            <br />
            <span className="text-gradient">We haven&rsquo;t written it yet.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lede text-dim">
            AskRoo is in beta, so the first three months are free. No card, no
            catch, no fine print — mostly because we haven&rsquo;t built any of
            that yet. You bring the messy real tickets and honest feedback. Roo
            brings the answers.
          </p>

          <div className="mt-10 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1">
            <span className="display text-5xl text-bright md:text-6xl">Free</span>
            <span className="text-lede text-faint">for your first</span>
            <span className="display text-5xl text-accent-300 md:text-6xl">
              3 months
            </span>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Join the beta
            </Button>
            <Button
              href="/beta"
              variant="secondary"
              size="lg"
              className="group w-full sm:w-auto"
            >
              How the beta works
              <ArrowRight />
            </Button>
          </div>

          <p className="mt-8 font-mono text-caption text-faint">
            No card up front. Leaving means uninstalling — or just closing the
            tab. We&rsquo;ll cope.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
