"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/lib/how-it-works";

export function HowItWorks({ heading = true }: { heading?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <Section id="how-it-works">
      {heading ? (
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Fifteen minutes, not a project."
            lede="No theme code, no data uploads, nothing acting on your behalf before you allow it. Here's the whole setup."
          />
        </Reveal>
      ) : null}

      <ol ref={ref} className="relative mx-auto mt-14 max-w-3xl">
        {/* Progress rail — fills as you scroll through the steps. */}
        <div className="absolute bottom-6 left-[17px] top-6 w-px bg-hairline md:left-[23px]">
          <motion.div
            aria-hidden="true"
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-accent-400 to-accent-600"
          />
        </div>

        {steps.map((step) => (
          <li
            key={step.n}
            className="relative grid grid-cols-[auto_1fr] gap-5 pb-12 last:pb-0"
          >
            <div className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-hairline-strong bg-ink font-mono text-sm text-accent-300 md:h-12 md:w-12">
              {step.n}
            </div>
            <div className="pt-1 md:pt-2.5">
              <h3 className="text-xl font-medium text-bright">{step.title}</h3>
              <p className="mt-1 text-sm text-accent-300/85">{step.summary}</p>
              <p className="mt-3 max-w-xl leading-relaxed text-dim">
                {step.detail}
              </p>
              <p className="mt-3 font-mono text-caption text-faint">
                {step.caption}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
