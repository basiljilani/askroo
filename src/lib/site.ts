/**
 * Single source of truth for the site's identity, contact details and
 * navigation. Every canonical URL, OG tag and JSON-LD block derives from
 * here — changing the domain should be the only edit needed to re-point
 * the site.
 *
 * Values marked `// confirm before launch` are placeholders.
 */

export type NavLink = {
  label: string;
  href: string;
  /** External links open in a new tab and get rel="noreferrer". */
  external?: boolean;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://askroo.com.au"
).replace(/\/$/, "");

export const siteConfig = {
  name: "AskRoo",
  legalName: "AskRoo Pty Ltd", // confirm before launch
  url: SITE_URL, // confirm before launch
  tagline: "Answers with receipts.",
  description:
    "AskRoo is the AI support agent for Shopify merchants. It answers where-is-my-order, returns and product questions from your live store data — and shows the source for every answer.",
  seoTitle:
    "AskRoo — AI customer support for Shopify, grounded in your live store data",
  keywords: [
    "Shopify AI support",
    "WISMO automation",
    "Shopify returns automation",
    "AI customer service Australia",
    "Shopify chatbot",
    "order tracking chat",
  ],
  contact: {
    email: "connect@askroo.io",
    address: "8 Hadenfeld Ave, Macquarie University, New South Wales 2109, Australia",
  },
  /** ABN placeholder — replace with the registered number before launch. */
  abn: "00 000 000 000",
  /** Omit any social account that doesn't exist yet. */
  social: {
    linkedin: "https://www.linkedin.com/company/askroo", // confirm before launch
    x: "https://x.com/askroo", // confirm before launch
  },
  foundedYear: 2026,
} as const;

export type SiteConfig = typeof siteConfig;

/** Primary header navigation. */
export const primaryNav: NavLink[] = [
  { label: "Product", href: "/product" },
  { label: "Learn", href: "/how-it-works" },
  { label: "Beta", href: "/beta" },
  { label: "About", href: "/about" },
];

/** The one conversion action, repeated site-wide. */
export const primaryCta = {
  label: "Join the beta",
  href: "/contact",
} as const;

/** Footer navigation, grouped. Rendered from data — never hardcoded. */
export const footerNav: NavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Capabilities", href: "/product" },
      { label: "Learn", href: "/how-it-works" },
      { label: "Beta", href: "/beta" },
      { label: "Sources", href: "/sources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Join the beta", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

/** Social links as an array, skipping any that are empty/undefined. */
export const socialLinks: NavLink[] = Object.entries(siteConfig.social)
  .filter(([, href]) => Boolean(href))
  .map(([key, href]) => ({
    label: key === "x" ? "X" : key.charAt(0).toUpperCase() + key.slice(1),
    href,
    external: true,
  }));

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean === "/" ? "" : clean}`;
}
