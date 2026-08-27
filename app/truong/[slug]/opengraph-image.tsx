import { ImageResponse } from "next/og";

import { loadUniversityBySlug, loadUniversityRows } from "../../university-data";
import { formatVnDate } from "../../site-config";

export const alt = "Hồ sơ trường đại học trên Danh sách Đại học";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamicParams = false;

export async function generateStaticParams() {
  const rows = await loadUniversityRows();
  return rows.map((row) => ({ slug: row.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const school = await loadUniversityBySlug(slug);

  const title = school?.fullName ?? "Danh sách Đại học";
  const facts = school
    ? [school.type, school.featuredMajor, ...school.campuses.slice(0, 2)].filter(Boolean)
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0d1117",
          color: "#f0f6fc",
          fontSize: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <span>🎓</span>
          <span style={{ color: "#8b949e" }}>dsdaihoc.com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: title.length > 48 ? 58 : 70,
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {facts.map((fact) => (
              <div
                key={fact}
                style={{
                  padding: "10px 22px",
                  border: "1px solid #30363d",
                  borderRadius: 999,
                  fontSize: 26,
                  color: "#c9d1d9",
                }}
              >
                {fact}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: "#8b949e",
          }}
        >
          <div style={{ width: 64, height: 6, background: "#2f81f7", borderRadius: 3 }} />
          <span>
            {`Tuyển sinh · Điểm chuẩn · Campus${
              school?.lastModified ? ` · Cập nhật ${formatVnDate(school.lastModified)}` : ""
            }`}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
