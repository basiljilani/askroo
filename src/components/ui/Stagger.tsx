"use client";

import { createElement } from "react";
import { useArmedReveal } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Container for a staggered reveal. Same armed pattern as Reveal: only
 * hides its children if it starts below the fold. Children must be
 * <StaggerItem> so they pick up the per-item delay.
 */
export function Stagger({
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

/** One staggered child. `index` sets the incremental 0.08s delay. */
export function StaggerItem({
  index = 0,
  as: Tag = "div",
  className,
  children,
}: {
  index?: number;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  return createElement(
    Tag,
    {
      "data-stagger": "",
      className: cn(className),
      style: { "--stagger-i": index } as React.CSSProperties,
    },
    children,
  );
}
