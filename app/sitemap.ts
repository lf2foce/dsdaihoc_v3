import type { MetadataRoute } from "next";

import { absoluteUrl } from "./site-config";
import { loadDatasetMeta, loadUniversityListRows } from "./university-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await loadUniversityListRows();
  const { lastModified: datasetModified } = await loadDatasetMeta();
  const dataDate = new Date(datasetModified);
  // Static marketing pages change with releases, not with the dataset.
  const buildDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: dataDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/quiz"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/faqs"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/ai4sd"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/genv"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/gop-y"),
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const schoolRoutes: MetadataRoute.Sitemap = rows.map((row) => ({
    url: absoluteUrl(`/truong/${row.slug}`),
    // Per-record freshness, so a re-crawl signal only fires when data moved.
    lastModified: row.lastModified ? new Date(row.lastModified) : dataDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...schoolRoutes];
}
