import { cn } from "@/lib/utils";
import { CiteChip } from "./CiteChip";
import { RooMark } from "./Logo";

/**
 * A shopper question + AI answer + optional citation chip. The site's
 * thesis, stated as a demonstration. Used by the hero, the ProofStrip and
 * the capability pages.
 *
 * tone="plain" is the generic-chatbot rendering used in the ProofStrip: a
 * neutral avatar and (usually) no chip. We never label it — the missing
 * chip does the work (§5).
 */
export function AnswerBubble({
  question,
  answer,
  source,
  latency,
  tone = "askroo",
  className,
}: {
  question?: string;
  answer: string;
  source?: string;
  latency?: string;
  tone?: "askroo" | "plain";
  className?: string;
}) {
  return (
    <div className={cn("panel p-5 sm:p-6", className)}>
      {question ? (
        <div className="mb-4 flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-sm border border-hairline bg-elev-2 px-3.5 py-2.5 text-sm leading-relaxed text-dim">
            {question}
          </p>
        </div>
      ) : null}

      <div className="flex items-start gap-3">
        {tone === "askroo" ? (
          <RooMark className="mt-0.5 h-7 w-7 shrink-0" />
        ) : (
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[9px] border border-hairline bg-elev-1">
            <span className="h-1.5 w-1.5 rounded-full bg-faint" />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-[0.95rem] leading-relaxed text-bright">{answer}</p>
          {source ? (
            <div className="mt-3">
              <CiteChip source={source} latency={latency} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
