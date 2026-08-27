import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import { buildSchoolSlugs } from "./university-slug";
import type {
  DatasetMeta,
  UniversityListRow,
  UniversityRow,
} from "./university-types";

type ApprovedItem = {
  id: number | string;
  display_order?: number | string;
  short_name?: string;
  name?: string;
  school_type?: string;
  featured_major?: string | string[];
  description?: string;
  information?: string;
  campus?: string;
  campus_locations?: string[];
  programs?: string;
  admission_methods?: string;
  admission_score?: string;
  tags?: string[];
  source_url?: string;
  source_urls?: string[];
  last_crawled_at?: string;
};

type ApprovedPayload = {
  count: number;
  items: ApprovedItem[];
};

const DEFAULT_FLAG = "🇻🇳";

function normalizeText(value?: string | number | null) {
  if (value == null) return "";
  return String(value).trim();
}

function normalizeTextList(value?: string | string[]) {
  if (!value) return [];
  const items = Array.isArray(value) ? value : [value];
  return items.map(normalizeText).filter(Boolean);
}

function normalizeNumber(value?: string | number | null) {
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeIsoDate(value?: string | null) {
  const raw = normalizeText(value);
  if (!raw) return "";
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

/**
 * Crawled URLs carry trailing markdown fences, punctuation and inconsistent
 * root slashes; normalising them keeps the deduped list free of near-twins.
 */
function cleanUrl(value: string) {
  const trimmed = value.trim().replace(/[`"'\s]+$/g, "").replace(/[.,;)]+$/g, "");
  if (!/^https?:\/\//.test(trimmed)) return "";

  try {
    const url = new URL(trimmed);
    if (url.pathname === "/" && !url.search && !url.hash) {
      return `${url.protocol}//${url.host}`;
    }
    return url.toString();
  } catch {
    return "";
  }
}

const TWO_LEVEL_SUFFIXES = new Set([
  "edu.vn",
  "com.vn",
  "gov.vn",
  "org.vn",
  "net.vn",
  "ac.vn",
  "ac.uk",
  "co.uk",
]);

/** "tuyensinh.fpt.edu.vn" -> "fpt.edu.vn", so subdomains group together. */
function registrableDomain(url: string) {
  try {
    const parts = new URL(url).hostname.replace(/^www\./, "").split(".");
    const lastTwo = parts.slice(-2).join(".");
    const depth = TWO_LEVEL_SUFFIXES.has(lastTwo) ? 3 : 2;
    return parts.slice(-depth).join(".");
  } catch {
    return "";
  }
}

function normalizeSourceUrls(item: ApprovedItem) {
  const primary = cleanUrl(normalizeText(item.source_url));
  const all = [primary, ...normalizeTextList(item.source_urls).map(cleanUrl)].filter(
    Boolean,
  );
  const sourceUrls = Array.from(new Set(all));

  // schema.org `sameAs` must identify the entity itself, so press coverage on
  // cafef/dantri/vnexpress is dropped and only the school's own domain kept.
  const primaryDomain = registrableDomain(sourceUrls[0] ?? "");
  const officialUrls = primaryDomain
    ? sourceUrls.filter((url) => registrableDomain(url) === primaryDomain)
    : [];

  return { sourceUrls, officialUrls };
}

export const loadUniversityRows = cache(async (): Promise<UniversityRow[]> => {
  const filePath = path.join(process.cwd(), "data", "universities.approved.json");

  try {
    const raw = await readFile(filePath, "utf8");
    const payload = JSON.parse(raw) as ApprovedPayload;
    const sortedItems = (payload.items ?? [])
      .slice()
      .sort((left, right) => {
        const leftOrder = normalizeNumber(left.display_order);
        const rightOrder = normalizeNumber(right.display_order);

        if (leftOrder != null && rightOrder != null) return leftOrder - rightOrder;
        if (leftOrder != null) return -1;
        if (rightOrder != null) return 1;

        return normalizeText(left.name).localeCompare(normalizeText(right.name), "vi");
      });
    const slugs = buildSchoolSlugs(
      sortedItems.map((item) => normalizeText(item.name) || `truong-${item.id}`),
    );

    return sortedItems.map((item, index) => {
      const { sourceUrls, officialUrls } = normalizeSourceUrls(item);

      return {
        rank: index + 1,
        displayOrder: normalizeNumber(item.display_order),
        slug: slugs[index],
        flag: DEFAULT_FLAG,
        shortName: normalizeText(item.short_name) || `ID ${item.id}`,
        fullName: normalizeText(item.name) || `Trường ${item.id}`,
        type: normalizeText(item.school_type) || "Chưa rõ",
        featuredMajor: normalizeTextList(item.featured_major)[0] || "Đa ngành",
        description: normalizeText(item.description) || "Chưa có mô tả.",
        campuses: (item.campus_locations ?? []).map(normalizeText).filter(Boolean),
        campusSummary: normalizeText(item.campus),
        information: normalizeText(item.information),
        programs: normalizeText(item.programs),
        admissionMethods: normalizeText(item.admission_methods),
        admissionScore: normalizeText(item.admission_score),
        tags: (item.tags ?? []).map(normalizeText).filter(Boolean),
        sourceUrl: sourceUrls[0] ?? "",
        sourceUrls,
        officialUrls,
        lastModified: normalizeIsoDate(item.last_crawled_at),
      };
    });
  } catch {
    return [];
  }
});

export const loadUniversityListRows = cache(async (): Promise<UniversityListRow[]> => {
  const rows = await loadUniversityRows();
  return rows.map(
    ({
      rank,
      displayOrder,
      slug,
      flag,
      shortName,
      fullName,
      type,
      featuredMajor,
      description,
      campuses,
      tags,
      sourceUrl,
      sourceUrls,
      officialUrls,
      lastModified,
    }) => ({
      rank,
      displayOrder,
      slug,
      flag,
      shortName,
      fullName,
      type,
      featuredMajor,
      description,
      campuses,
      tags,
      sourceUrl,
      sourceUrls,
      officialUrls,
      lastModified,
    }),
  );
});

export const loadUniversityBySlug = cache(async (slug: string) => {
  const rows = await loadUniversityRows();
  return rows.find((row) => row.slug === slug) ?? null;
});

/**
 * Dataset-level facts surfaced in copy, JSON-LD and sitemap freshness signals.
 * `lastModified` is the newest record refresh, so it moves only when data does.
 */
export const loadDatasetMeta = cache(async (): Promise<DatasetMeta> => {
  const rows = await loadUniversityRows();
  const newest = rows.reduce((latest, row) => {
    if (!row.lastModified) return latest;
    return !latest || row.lastModified > latest ? row.lastModified : latest;
  }, "");

  return {
    count: rows.length,
    lastModified: newest || new Date(0).toISOString(),
  };
});
