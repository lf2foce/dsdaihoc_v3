import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { buildSchoolSlugs } from "./university-slug";
import type { UniversityRow } from "./university-types";

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

export async function loadUniversityRows(): Promise<UniversityRow[]> {
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

    return sortedItems.map((item, index) => ({
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
      sourceUrl: normalizeText(item.source_url),
    }));
  } catch {
    return [];
  }
}

export async function loadUniversityBySlug(slug: string) {
  const rows = await loadUniversityRows();
  return rows.find((row) => row.slug === slug) ?? null;
}
