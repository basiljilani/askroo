import { cn } from "@/lib/utils";

/** Max-width page gutter. 76rem, responsive horizontal padding. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[76rem] px-6 md:px-8", className)}>
      {children}
    </div>
  );
}
