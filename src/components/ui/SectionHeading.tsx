import { createElement } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-400" />
      {children}
    </span>
  );
}

/** The eyebrow + display headline + lede pattern used atop each section. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  id,
  className,
  titleClassName,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  as?: React.ElementType;
  id?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {createElement(
        Tag,
        {
          id,
          className: cn(
            "display mt-4 text-display-l text-bright text-balance",
            titleClassName,
          ),
        },
        title,
      )}
      {lede ? (
        <p
          className={cn(
            "mt-5 text-lede text-dim",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
