import { Container } from "./Container";
import { Eyebrow } from "./SectionHeading";

/** Interior-page hero: eyebrow + big title + lede, clear of the fixed header. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative border-b border-hairline">
      <Container>
        <div className="max-w-3xl pb-14 pt-36 md:pb-20 md:pt-44">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="display mt-5 text-display-l text-bright">{title}</h1>
          {lede ? (
            <p className="mt-6 max-w-2xl text-lede text-dim">{lede}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}
