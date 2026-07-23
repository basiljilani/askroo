"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CiteChip } from "@/components/ui/CiteChip";
import { faqs } from "@/lib/faq";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const reduced = useReducedMotion();

  return (
    <Section id="faq">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.5fr] md:gap-14">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title="The things a skeptical merchant asks first."
              lede="If it isn't here, ask us directly — we'd rather answer than have you guess."
            />
          </Reveal>
        </div>

        <Reveal>
          <ul className="border-y border-hairline">
            {faqs.map((item) => {
              const isOpen = openId === item.id;
              const btnId = `faq-btn-${item.id}`;
              const panelId = `faq-panel-${item.id}`;
              return (
                <li key={item.id} className="border-b border-hairline last:border-b-0">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-base font-medium text-bright">
                        {item.question}
                      </span>
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-300 ease-out-expo",
                          isOpen
                            ? "rotate-45 text-accent-300"
                            : "text-faint",
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      >
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </button>
                  </h3>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: reduced ? 0 : 0.32,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-2xl pb-6 pr-6">
                      <p className="leading-relaxed text-dim">{item.answer}</p>
                      {item.cite ? (
                        <div className="mt-4">
                          <CiteChip
                            source={item.cite.source}
                            latency={item.cite.latency}
                          />
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
