import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Cta } from "@/components/sections/Cta";
import { buildMetadata } from "@/lib/metadata";
import { sources } from "@/lib/sources";

export const metadata = buildMetadata({
  title: "Sources",
  description:
    "Every market statistic cited on this site, with its publisher and year. Product targets are labelled separately and are not results.",
  path: "/sources",
});

export default function SourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sources"
        title="Every number on this site, attributed."
        lede="A product about showing your sources ought to show its own. These are the third-party market figures we cite. Anything about AskRoo's own performance is labelled a target, not a result."
      />

      <Section>
        <ol className="space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
          {sources.map((s) => (
            <li
              key={s.id}
              id={s.id}
              className="scroll-mt-28 bg-ink p-6 md:p-7"
            >
              <div className="flex gap-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent-600 bg-[color-mix(in_oklab,var(--color-accent-500)_12%,transparent)] font-mono text-xs text-accent-300">
                  {s.index}
                </span>
                <div>
                  <p className="text-bright">{s.claim}</p>
                  <p className="mt-2 font-mono text-caption text-dim">
                    {s.publisher} — {s.title} ({s.year})
                  </p>
                  {s.note ? (
                    <p className="mt-2 text-sm text-faint">{s.note}</p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-faint">
          Figures are drawn from published third-party research and reflect the
          most recent data available at the time of writing. Where a range is
          shown, it reflects several independent benchmarks rather than a single
          source.
        </p>
      </Section>

      <Cta />
    </>
  );
}
