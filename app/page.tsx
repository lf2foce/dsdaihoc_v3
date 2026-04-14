import Script from "next/script";

import styles from "./page.module.css";
import HomeSponsor from "./home-sponsor";
import { loadUniversityListRows } from "./university-data";
import UniversityBrowser from "./university-browser";
import SiteHeader from "./site-header";

export default async function Home() {
  const rows = await loadUniversityListRows();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://dsdaihoc.com";
  const topSchools = rows.slice(0, 10);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Danh sách đại học",
      url: baseUrl,
      description:
        "Tìm kiếm và so sánh các trường đại học tại Việt Nam để chọn nơi học phù hợp nhất với bạn.",
      inLanguage: "vi-VN",
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Danh sách đại học Việt Nam",
      url: baseUrl,
      description:
        "Trang tổng hợp trường đại học tại Việt Nam theo ngành nổi bật, loại trường và khu vực đào tạo.",
      isPartOf: {
        "@type": "WebSite",
        name: "Danh sách đại học",
        url: baseUrl,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: rows.length,
        itemListElement: topSchools.map((row, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${baseUrl}/truong/${row.slug}`,
          name: row.fullName,
        })),
      },
    },
  ];

  return (
    <div className={styles.page}>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader activeTab="Trường" />

      <main className={styles.main}>
        <h1 className="sr-only">Danh sách đại học Việt Nam</h1>
        <HomeSponsor />
        <UniversityBrowser rows={rows} />
      </main>
    </div>
  );
}
