import { siteConfig, absoluteUrl, socialLinks } from "./site";
import { faqs } from "./faq";
import { pricing } from "./pricing";

/** Organization + WebSite graph for the root layout. */
export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        email: siteConfig.contact.email,
        foundingDate: String(siteConfig.foundedYear),
        sameAs: socialLinks.map((s) => s.href),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sydney",
          addressRegion: "NSW",
          addressCountry: "AU",
        },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-AU",
        publisher: { "@id": absoluteUrl("/#organization") },
      },
    ],
  };
}

/** FAQPage schema for the homepage. */
export function faqGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** SoftwareApplication + offers for the pricing page. */
export function softwareApplicationGraph() {
  const offers = pricing
    .filter((t) => /^\$\d/.test(t.price))
    .map((t) => ({
      "@type": "Offer",
      name: t.name,
      price: t.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      category: t.conversations,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Customer support",
    operatingSystem: "Web, Shopify",
    description: siteConfig.description,
    url: absoluteUrl("/pricing"),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "79",
      offerCount: String(offers.length),
      offers,
    },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}
