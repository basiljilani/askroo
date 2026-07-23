import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  /** If set, renders a link (next/link for internal, <a> for external). */
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  target?: string;
  rel?: string;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-out-expo select-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-400 text-void hover:bg-accent-300 hover:-translate-y-px active:translate-y-0",
  secondary:
    "bg-glass border border-hairline text-bright backdrop-blur-sm hover:-translate-y-px hover:border-hairline-strong hover:bg-elev-1 active:translate-y-0",
  ghost: "text-dim hover:text-accent-300",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href ?? "");

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={rest.target ?? "_blank"}
          rel={rest.rel ?? "noreferrer"}
          aria-label={rest["aria-label"]}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={rest["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
