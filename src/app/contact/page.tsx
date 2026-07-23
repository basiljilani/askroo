import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Talk to the team building AskRoo, or apply for the Australian founding beta. Email us directly, or use the form.",
  path: "/contact",
});

const expectations = [
  "You reach the people building it, not a support queue.",
  "We reply within a day or two, in your inbox.",
  "No sales sequence. If it's not a fit, we'll tell you.",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the people building it."
        lede="Applying for the founding beta, weighing it up, or just have a question — this reaches us directly."
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.4fr] md:gap-14">
          <aside className="space-y-8">
            <div>
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-300">
                Email
              </h2>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-2 block text-lg text-bright transition-colors hover:text-accent-300"
              >
                {siteConfig.contact.email}
              </a>
            </div>

            <div>
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
                Where we are
              </h2>
              <p className="mt-2 text-dim">{siteConfig.contact.address}</p>
            </div>

            <div>
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
                What to expect
              </h2>
              <ul className="mt-3 space-y-2.5">
                {expectations.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-dim">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
