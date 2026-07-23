import { siteConfig, absoluteUrl, socialLinks } from "./site";
import { faqs } from "./faq";

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
          streetAddress: "8 Hadenfeld Ave",
          addressLocality: "Macquarie University",
          addressRegion: "NSW",
          postalCode: "2109",
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

/** SoftwareApplication schema. Pricing-free while AskRoo is in beta. */
export function softwareApplicationGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Customer support",
    operatingSystem: "Web, Shopify",
    description: siteConfig.description,
    url: absoluteUrl("/beta"),
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}
