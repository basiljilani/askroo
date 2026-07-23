import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "./site";

/** Per-page metadata helper. Canonical + OG derive from siteConfig. */
export function buildMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const desc = description ?? siteConfig.description;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: title ?? siteConfig.seoTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.seoTitle,
      description: desc,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
