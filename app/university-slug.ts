function slugifyPart(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function buildSchoolSlugs(values: string[]) {
  const counts = new Map<string, number>();

  return values.map((value) => {
    const base = slugifyPart(value) || "truong";
    const currentCount = counts.get(base) ?? 0;
    counts.set(base, currentCount + 1);

    return currentCount === 0 ? base : `${base}-${currentCount + 1}`;
  });
}
