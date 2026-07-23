import { cn } from "@/lib/utils";

/** Styled long-form text container (legal, policy copy). */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("prose-roo max-w-2xl", className)}>{children}</div>;
}
