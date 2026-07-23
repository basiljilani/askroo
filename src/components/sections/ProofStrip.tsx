import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CiteChip } from "@/components/ui/CiteChip";
import { RooMark } from "@/components/ui/Logo";

const QUESTION = "Will my order arrive before the weekend?";

export function ProofStrip() {
  return (
    <Section id="proof">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="The difference is a receipt"
          title="Same question. One of them can prove it."
          lede="A generic chatbot sounds just as confident when it's wrong. The only visible difference is whether the answer shows where it came from."
        />
      </Reveal>

      {/* The shared shopper question, asked once. */}
      <Reveal className="mx-auto mt-12 flex max-w-2xl justify-center">
        <p className="rounded-2xl rounded-br-sm border border-hairline bg-elev-2 px-4 py-2.5 text-sm text-dim">
          {QUESTION}
        </p>
      </Reveal>

      <Stagger className="mx-auto mt-6 grid max-w-4xl gap-5 md:grid-cols-2">
        {/* Generic bot — plausible, confident, wrong. No source, no name. */}
        <StaggerItem index={0} className="panel flex flex-col p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[9px] border border-hairline bg-elev-1">
              <span className="h-1.5 w-1.5 rounded-full bg-faint" />
            </span>
            <p className="text-[0.95rem] leading-relaxed text-bright">
              Yes, it&rsquo;ll be there by Friday. You&rsquo;re all set.
            </p>
          </div>
          {/* Deliberately no citation chip. The gap is the point. */}
        </StaggerItem>

        {/* AskRoo — correct, and it shows its source. */}
        <StaggerItem
          index={1}
          className="panel flex flex-col p-5 sm:p-6 ring-1 ring-accent-500/20"
        >
          <div className="mb-3 flex items-center gap-2">
            <RooMark className="h-5 w-5" />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-300">
              AskRoo
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="min-w-0">
              <p className="text-[0.95rem] leading-relaxed text-bright">
                It&rsquo;s with Australia Post now, but they haven&rsquo;t given
                a delivery date yet, so I won&rsquo;t promise Friday. I&rsquo;ll
                message you the moment they do.
              </p>
              <div className="mt-3">
                <CiteChip source="order #2087 · Australia Post" latency="checked 0.3s ago" />
              </div>
            </div>
          </div>
        </StaggerItem>
      </Stagger>

      <Reveal className="mx-auto mt-8 max-w-2xl text-center">
        <p className="text-sm text-faint">
          Both answers took a second. Only one of them can tell you where it got
          the answer.
        </p>
      </Reveal>
    </Section>
  );
}
