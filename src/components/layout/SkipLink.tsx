/**
 * Skip-to-content link. Visually hidden until focused, first in tab order.
 */
export function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border focus:border-hairline-strong focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bright"
    >
      Skip to content
    </a>
  );
}
