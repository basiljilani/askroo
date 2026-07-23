import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { AnswerBubble } from "@/components/ui/AnswerBubble";
import { HeroGradient } from "@/components/hero/HeroGradient";

export function Hero({ background }: { background?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background: WebGL when provided, else the static gradient. */}
      {background ?? <HeroGradient />}

      {/* Radial dark scrim keeps the headline legible over the backdrop. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(130% 90% at 50% 22%, transparent 38%, color-mix(in oklab, var(--color-void) 78%, transparent) 82%, var(--color-void) 100%)",
        }}
      />

      <Container>
        <div className="flex min-h-[100svh] flex-col justify-center pb-24 pt-32 md:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-rise" style={{ animationDelay: "0ms" }}>
              <Eyebrow>Shopify app · Australian built</Eyebrow>
            </div>

            <h1
              className="display animate-rise mt-6 text-display-xl text-bright"
              style={{ animationDelay: "60ms" }}
            >
              It reads your orders.
              <br />
              <span className="text-gradient">Then it answers.</span>
            </h1>

            <p
              className="animate-rise mx-auto mt-6 max-w-xl text-lede text-dim"
              style={{ animationDelay: "140ms" }}
            >
              The AI support agent for Shopify shoppers. It answers
              where-is-my-order, returns and product questions from your live
              store data, and shows the source for every answer.
            </p>

            <div
              className="animate-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Join the beta
              </Button>
              <Button
                href="/how-it-works"
                variant="secondary"
                size="lg"
                className="group w-full sm:w-auto"
              >
                See how it works
                <ArrowRight />
              </Button>
            </div>
          </div>

          {/* The thesis, stated as a demonstration rather than a claim. */}
          <div
            className="animate-rise mx-auto mt-14 w-full max-w-xl"
            style={{ animationDelay: "320ms" }}
          >
            <AnswerBubble
              question="Hi, where's my order? It's been a few days."
              answer="Your order shipped Tuesday and it's with Australia Post now. Tracking says it's out for delivery in Newtown today."
              source="order #1042"
              latency="fetched 0.4s ago"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
