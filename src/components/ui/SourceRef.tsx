import { getSource } from "@/lib/sources";

/** Superscript citation link to /sources. */
export function SourceRef({ id }: { id: string }) {
  const s = getSource(id);
  if (!s) return null;
  return (
    <a
      href={`/sources#${id}`}
      aria-label={`Source ${s.index}: ${s.publisher}, ${s.title}`}
      className="ml-0.5 align-super font-mono text-[0.6em] text-accent-300 transition-colors hover:text-accent-100"
    >
      {s.index}
    </a>
  );
}
