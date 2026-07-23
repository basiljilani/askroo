import { cn } from "@/lib/utils";

/**
 * Small arrow that nudges right on parent hover. Pair with Button or any
 * element carrying the `group` class.
 */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        "h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5",
        className,
      )}
    >
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  );
}
