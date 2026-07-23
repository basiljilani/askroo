import { createElement } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * Owns vertical rhythm (py-24 / md:py-32). By default it wraps children in
 * a Container; pass `bleed` for full-width children (marquees, dividers).
 */
export function Section({
  as = "section",
  id,
  className,
  containerClassName,
  bleed = false,
  children,
}: {
  as?: React.ElementType;
  id?: string;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
  children: React.ReactNode;
}) {
  const inner = bleed ? (
    children
  ) : (
    <Container className={containerClassName}>{children}</Container>
  );
  return createElement(
    as,
    { id, className: cn("relative py-24 md:py-32", className) },
    inner,
  );
}
