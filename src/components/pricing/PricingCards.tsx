import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { pricing, type PricingTier } from "@/lib/pricing";

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent-400"
    >
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "panel relative flex flex-col p-6",
        tier.featured && "ring-1 ring-accent-500/30",
        // BYOK: hairline-strong border, no fill.
        tier.distinct &&
          "border-hairline-strong bg-transparent bg-none shadow-none",
      )}
    >
      {tier.featured ? (
        <span className="absolute -top-3 left-6 rounded-full border border-accent-600 bg-ink px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent-300">
          Recommended
        </span>
      ) : null}

      <h3 className="text-lg font-medium text-bright">{tier.name}</h3>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="display text-4xl text-bright">{tier.price}</span>
        {tier.cadence ? (
          <span className="text-sm text-faint">{tier.cadence}</span>
        ) : null}
      </div>
      {tier.priceNote ? (
        <p className="mt-1 text-xs text-faint">{tier.priceNote}</p>
      ) : null}

      <p className="mt-3 text-sm text-accent-300/85">{tier.tagline}</p>
      <p className="mt-4 font-mono text-caption text-dim">
        {tier.conversations}
      </p>

      <ul className="mt-5 flex-1 space-y-2.5 text-sm text-dim">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        href={tier.cta.href}
        variant={tier.featured ? "primary" : "secondary"}
        className="mt-6 w-full"
      >
        {tier.cta.label}
      </Button>
    </div>
  );
}

export function PricingCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-4", className)}>
      {pricing.map((tier) => (
        <PricingCard key={tier.id} tier={tier} />
      ))}
    </div>
  );
}
