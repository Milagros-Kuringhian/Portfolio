import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) => [
    {
      url: `${siteConfig.url}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/${locale}/projects`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);
}
