import { cn } from "@/lib/utils";
import { MARK_BUBBLE, MARK_DOTS } from "@/lib/logo";

/**
 * The AskRoo mark: a clean chat bubble with a typing indicator, cut into
 * an ochre tile. Geometry lives in @/lib/logo so every rendering (favicon,
 * apple icon, OG image, in-page logo) stays in sync.
 */
export function RooMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="26"
        fill="var(--color-accent-400)"
      />
      <g
        fill="var(--color-void)"
        dangerouslySetInnerHTML={{ __html: MARK_BUBBLE }}
      />
      <g
        fill="var(--color-accent-400)"
        dangerouslySetInnerHTML={{ __html: MARK_DOTS }}
      />
    </svg>
  );
}

/** Logo lockup: the Roo mark + AskRoo wordmark. */
export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  wordmark = true,
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <RooMark className={cn("h-8 w-8", markClassName)} />
      {wordmark ? (
        <>
          <span
            className={cn(
              "text-[1.075rem] font-medium tracking-tight text-bright",
              wordmarkClassName,
            )}
          >
            Ask<span className="text-accent-300">Roo</span>
          </span>
          {/* Keep the name available to assistive tech even if the
              wordmark is visually hidden on the narrowest screens. */}
          {wordmarkClassName?.includes("hidden") ? (
            <span className="sr-only">AskRoo</span>
          ) : null}
        </>
      ) : (
        <span className="sr-only">AskRoo</span>
      )}
    </span>
  );
}
