import { Container } from "@/components/ui/Container";
import { brandMarks, GLYPHS } from "@/lib/brand-marks";

function Mark({ name, glyph }: { name: string; glyph: keyof typeof GLYPHS }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-hairline bg-glass px-4 py-2">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4 text-accent-300"
      >
        <path d={GLYPHS[glyph]} />
      </svg>
      <span className="whitespace-nowrap text-sm text-dim">{name}</span>
    </span>
  );
}

export function StackMarquee() {
  // Two identical halves so the -50% translate loops seamlessly.
  const track = [...brandMarks, ...brandMarks];

  return (
    <section className="border-y border-hairline py-14 md:py-16" aria-label="What AskRoo is built on and connects to">
      <Container>
        <p className="eyebrow text-center">
          Grounded in, reads from, and runs on
        </p>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-faint">
          Not a customer list. This is what AskRoo is built on, the carriers it
          reads live, and the models you can point it at.
        </p>
      </Container>

      <div className="group relative mt-9 overflow-hidden">
        <div className="marquee-mask">
          <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
            {track.map((mark, i) => (
              <Mark
                key={`${mark.name}-${i}`}
                name={mark.name}
                glyph={mark.glyph}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
