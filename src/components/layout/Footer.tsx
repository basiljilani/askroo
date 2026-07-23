import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { siteConfig, footerNav, socialLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
              AI support for Shopify merchants that answers from your live
              store data — and shows the source for every answer.
            </p>
            <div className="mt-6 space-y-1.5 text-sm">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block text-dim transition-colors hover:text-accent-300"
              >
                {siteConfig.contact.email}
              </a>
              {/* Email + registered address only. No phone number. */}
              <p className="text-faint">{siteConfig.contact.address}</p>
            </div>
            {socialLinks.length > 0 ? (
              <ul className="mt-6 flex items-center gap-2">
                {socialLinks.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-hairline bg-glass px-3.5 text-xs text-dim transition-colors hover:border-hairline-strong hover:text-bright"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Nav groups — driven by data */}
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-faint">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-dim transition-colors hover:text-bright"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-8 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl leading-relaxed">
            © {siteConfig.foundedYear} {siteConfig.legalName}. ABN{" "}
            {siteConfig.abn}. Not affiliated with or endorsed by Shopify Inc.
          </p>
          <p className="font-mono tracking-wide">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
