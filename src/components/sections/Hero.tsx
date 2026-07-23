import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { Eyebrow } from "@/components/ui/SectionHeading";
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
              Roo reads the room.
              <br />
              <span className="text-gradient">Then opens its mouth.</span>
            </h1>

            <p
              className="animate-rise mx-auto mt-6 max-w-2xl text-lede text-dim"
              style={{ animationDelay: "140ms" }}
            >
              It&rsquo;s 3am. You&rsquo;re asleep. Roo isn&rsquo;t. It reads your
              live order data first, answers second, and shows exactly which
              order it checked.
            </p>

            <div
              className="animate-rise mt-9 flex justify-center"
              style={{ animationDelay: "220ms" }}
            >
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
        </div>
      </Container>
    </section>
  );
}
