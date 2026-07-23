"use client";

import { useArmedReveal } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered fade + slide + blur-in. Arms itself only if it starts
 * below the fold on mount and motion is allowed — otherwise it renders
 * exactly as server-rendered: visible and static. The transition itself
 * lives in CSS (see globals.css [data-reveal]).
 */
export function Reveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useArmedReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
