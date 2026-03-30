import type { MetadataRoute } from "next";

import { loadUniversityRows } from "./university-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://dsdaihoc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await loadUniversityRows();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/gop-y`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const schoolRoutes: MetadataRoute.Sitemap = rows.map((row) => ({
    url: `${baseUrl}/truong/${row.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...schoolRoutes];
}
