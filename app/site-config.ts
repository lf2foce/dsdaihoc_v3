export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://dsdaihoc.com"
).replace(/\/+$/, "");

export const siteName = "Danh sách Đại học";

export const siteDescription =
  "Danh sách Đại học tổng hợp thông tin của các trường đại học tại Việt Nam: phương thức xét tuyển, điểm chuẩn tham chiếu, ngành đào tạo nổi bật và campus của từng trường, chuẩn hoá từ nguồn công bố chính thức.";

export const siteLocale = "vi-VN";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(pathname: string) {
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

/** "06/07/2026" from an ISO timestamp, for visible freshness stamps. */
export function formatVnDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}

/**
 * Metadata `openGraph` is replaced wholesale by a child segment, not merged, so
 * the root `opengraph-image.tsx` never reaches a page that declares its own
 * `openGraph`. Every such page spreads this in explicitly.
 */
export const defaultOgImages = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Danh sách Đại học — tra cứu trường đại học Việt Nam",
  },
];
