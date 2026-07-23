import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { channelRoadmap } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

function StatusPill({
  available,
  phase,
}: {
  available: boolean;
  phase: string;
}) {
  const label = available ? "Live" : phase;
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.14em]",
        available
          ? "border-accent-600 bg-[color-mix(in_oklab,var(--color-accent-500)_12%,transparent)] text-accent-300"
          : phase === "Not planned"
            ? "border-hairline text-faint"
            : "border-hairline-strong text-dim",
      )}
    >
      {label}
    </span>
  );
}

export function Roadmap() {
  return (
    <Section id="roadmap">
      <Reveal>
        <SectionHeading
          eyebrow="Roadmap"
          title="What ships now, and what's next."
          lede="Web chat is what launches. The rest is sequenced honestly — including the channel we've decided not to build."
        />
      </Reveal>

      <Stagger className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
        {channelRoadmap.map((item, i) => (
          <StaggerItem
            key={item.channel}
            index={i}
            className="flex items-start justify-between gap-4 bg-ink p-6"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-medium text-bright">
                  {item.channel}
                </h3>
                <StatusPill available={item.available} phase={item.phase} />
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-dim">
                {item.detail}
              </p>
            </div>
            <span className="shrink-0 font-mono text-caption text-faint">
              {item.timing}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
