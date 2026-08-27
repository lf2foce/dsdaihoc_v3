import { ImageResponse } from "next/og";

import { loadDatasetMeta } from "./university-data";
import { formatVnDate } from "./site-config";

export const alt = "Danh sách Đại học — tra cứu trường đại học Việt Nam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { count, lastModified } = await loadDatasetMeta();

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

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
            {`Danh sách ${count} trường đại học Việt Nam`}
          </div>
          <div style={{ fontSize: 34, color: "#8b949e", lineHeight: 1.4 }}>
            Phương thức xét tuyển · Điểm chuẩn tham chiếu · Ngành đào tạo · Campus
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
          <span>{`Cập nhật ${formatVnDate(lastModified)}`}</span>
        </div>
      </div>
    ),
    size,
  );
}
