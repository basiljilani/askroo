import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { Counter } from "@/components/ui/Counter";
import { SourceRef } from "@/components/ui/SourceRef";
import { marketFacts, productTargets, costPerContact } from "@/lib/metrics";
import { cn } from "@/lib/utils";

export function Metrics() {
  return (
    <Section id="why">
      <Reveal>
        <SectionHeading
          eyebrow="The case for grounded automation"
          title="The maths is the argument."
          lede="Support that a human touches costs real money, and most of it is the same few questions. Automating those well is the whole opportunity."
        />
      </Reveal>

      {/* The argument, on its own: cost per contact. */}
      <Reveal className="mt-12">
        <div className="panel p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <CostBar
              label={costPerContact.human.label}
              value={costPerContact.human.value}
              decimals={costPerContact.human.decimals}
              width="100%"
              tone="neutral"
            />
            <CostBar
              label={costPerContact.ai.label}
              value={costPerContact.ai.value}
              decimals={costPerContact.ai.decimals}
              width="13.6%"
              tone="accent"
            />
          </div>
          <p className="mt-7 border-t border-hairline pt-5 text-sm text-dim">
            AI self-service runs at roughly an eighth of the cost of a
            human-assisted contact.
            <SourceRef id={costPerContact.sourceId} /> The trick is doing it
            without inventing answers.
          </p>
        </div>
      </Reveal>

      {/* Market facts — sourced, attributed, animated. */}
      <div className="mt-16">
        <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
          The market
        </h3>
        <Stagger className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {marketFacts.map((fact, i) => (
            <StaggerItem
              key={fact.id}
              index={i}
              className="bg-ink p-6"
            >
              <p className="display text-4xl text-bright md:text-5xl">
                {fact.display ? (
                  fact.display
                ) : (
                  <Counter
                    value={fact.value}
                    prefix={fact.prefix}
                    suffix={fact.suffix}
                    decimals={fact.decimals ?? 0}
                  />
                )}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-dim">
                {fact.caption}
                <SourceRef id={fact.sourceId} />
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Product targets — labelled TARGET, static. Commitments, not results. */}
      <div className="mt-14">
        <div className="flex items-center gap-3">
          <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
            What we&rsquo;re building toward
          </h3>
          <span className="h-px flex-1 bg-hairline" />
        </div>
        <p className="mt-3 max-w-xl text-sm text-faint">
          AskRoo is pre-launch. These are targets we&rsquo;re building to and
          will publish against — not measured results.
        </p>
        <Stagger className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
          {productTargets.map((t, i) => (
            <StaggerItem key={t.id} index={i} className="bg-ink p-6">
              <span className="inline-flex items-center gap-1.5 rounded border border-accent-600 bg-[color-mix(in_oklab,var(--color-accent-500)_12%,transparent)] px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent-300">
                {t.label}
              </span>
              <p className="display mt-4 text-3xl text-bright">{t.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-dim">
                {t.caption}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

function CostBar({
  label,
  value,
  decimals,
  width,
  tone,
}: {
  label: string;
  value: number;
  decimals: number;
  width: string;
  tone: "neutral" | "accent";
}) {
  return (
    <div>
      <p className="text-sm text-dim">{label}</p>
      <p className="display mt-2 text-5xl text-bright md:text-6xl">
        <Counter value={value} prefix="$" decimals={decimals} />
      </p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-elev-1">
        <div
          className={cn(
            "h-full rounded-full",
            tone === "accent"
              ? "bg-accent-400"
              : "bg-[color-mix(in_oklab,#fff_18%,transparent)]",
          )}
          style={{ width }}
        />
      </div>
    </div>
  );
}
