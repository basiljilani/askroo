import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { AnswerBubble } from "@/components/ui/AnswerBubble";
import { RooGlyph } from "@/components/ui/RooGlyph";
import { CapabilityCard } from "@/components/ui/CapabilityCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { Cta } from "@/components/sections/Cta";
import { capabilities, getCapability } from "@/lib/capabilities";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return {};
  return buildMetadata({
    title: capability.title,
    description: capability.summary,
    path: `/product/${capability.slug}`,
  });
}

export default async function CapabilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();

  const others = capabilities.filter((c) => c.slug !== capability.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Capability · ${capability.phase}`}
        title={capability.title}
        lede={capability.summary}
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-elev-1 text-accent-300">
          <RooGlyph name={capability.glyph} className="h-6 w-6" />
        </span>
      </PageHeader>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Main */}
          <div>
            <p className="text-lede text-dim">{capability.longDescription}</p>

            <h2 className="mt-12 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-300">
              What you get
            </h2>
            <ul className="mt-5 space-y-3.5">
              {capability.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-dim">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                  />
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
              What&rsquo;s included
            </h2>
            <ul className="mt-5 space-y-3.5">
              {capability.includes.map((o) => (
                <li key={o} className="flex gap-3 text-dim">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-faint"
                  />
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aside */}
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {capability.example ? (
              <AnswerBubble
                question={capability.example.question}
                answer={capability.example.answer}
                source={capability.example.source}
                latency={capability.example.latency}
              />
            ) : null}

            <div className="panel p-6">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-300">
                Grounded in
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-dim">
                {capability.grounding}
              </p>
            </div>

            <div className="rounded-2xl border border-hairline-strong bg-transparent p-6">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
                What it won&rsquo;t do
              </h2>
              <ul className="mt-4 space-y-3">
                {capability.limits.map((l) => (
                  <li key={l} className="flex gap-3 text-sm text-dim">
                    <span aria-hidden="true" className="mt-0.5 text-accent-400">
                      —
                    </span>
                    <span className="leading-relaxed">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <Button href="/product" variant="ghost" className="group">
            <span aria-hidden="true" className="mr-1 transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            All capabilities
          </Button>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <h2 className="text-xl font-medium text-bright">More capabilities</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.slice(0, 3).map((c) => (
            <CapabilityCard key={c.slug} capability={c} className="h-full" />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/product" variant="secondary" className="group">
            See all six
            <ArrowRight />
          </Button>
        </div>
      </Section>

      <Cta />
    </>
  );
}
