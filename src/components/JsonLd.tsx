/** Renders a JSON-LD script tag. Data is serialised server-side. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; no user input is embedded.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
