import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[82vh] items-center overflow-hidden">
      <div aria-hidden="true" className="grid-veil absolute inset-0 -z-10" />
      <Container>
        <div className="mx-auto max-w-xl pb-20 pt-32 text-center">
          <p className="eyebrow">404 · not found</p>
          <h1 className="display mt-5 text-display-l text-bright">
            This page didn&rsquo;t ship.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lede text-dim">
            The link is broken or the page moved. No guessing here — here&rsquo;s
            the way back.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/">Back home</Button>
            <Button href="/product" variant="secondary" className="group">
              See the product
              <ArrowRight />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
