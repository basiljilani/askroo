import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { capabilities } from "@/lib/capabilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "/",
    "/product",
    "/how-it-works",
    "/beta",
    "/about",
    "/sources",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const capabilityEntries: MetadataRoute.Sitemap = capabilities.map((c) => ({
    url: absoluteUrl(`/product/${c.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...capabilityEntries];
}
