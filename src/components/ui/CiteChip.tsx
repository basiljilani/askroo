import { cn } from "@/lib/utils";

/**
 * The signature element (§5). A citation chip — a receipt line naming the
 * source of an answer. The whole site's argument, compressed to ~40px of
 * mono type. It never carries a claim, only a source and a latency: the
 * moment it asserts something, it becomes the thing it's meant to disprove.
 */
export function CiteChip({
  source,
  latency,
  className,
}: {
  source: string;
  latency?: string;
  className?: string;
}) {
  const label = `Source: ${source}${latency ? `, ${latency}` : ""}`;
  return (
    <span className={cn("chip-cite", className)} role="note" aria-label={label}>
      <span aria-hidden="true" className="-mt-px font-mono text-accent-400">
        ⌐
      </span>
      <span aria-hidden="true">
        from {source}
        {latency ? (
          <>
            <span className="mx-1 text-accent-600">·</span>
            <span className="text-accent-300/80">{latency}</span>
          </>
        ) : null}
      </span>
    </span>
  );
}
