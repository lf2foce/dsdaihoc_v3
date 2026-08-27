import styles from "./page.module.css";
import HomeSponsor from "./home-sponsor";
import {
  absoluteUrl,
  formatVnDate,
  siteDescription,
  siteName,
  siteUrl,
} from "./site-config";
import { loadDatasetMeta, loadUniversityListRows } from "./university-data";
import UniversityBrowser from "./university-browser";
import SiteHeader from "./site-header";

export default async function Home() {
  const rows = await loadUniversityListRows();
  const { count, lastModified } = await loadDatasetMeta();
  const updatedLabel = formatVnDate(lastModified);
  const regionCount = new Set(
    rows.flatMap((row) => row.campuses).filter(Boolean),
  ).size;
  const publicCount = rows.filter((row) => row.type === "Công lập").length;
  const privateCount = rows.filter((row) => row.type === "Tư thục").length;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      inLanguage: "vi-VN",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteUrl}/#collection`,
      name: `Danh sách ${count} trường đại học Việt Nam`,
      url: siteUrl,
      description: `Trang tổng hợp ${count} trường đại học tại Việt Nam theo ngành nổi bật, loại trường và khu vực đào tạo.`,
      inLanguage: "vi-VN",
      dateModified: lastModified,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: {
        "@type": "ItemList",
        name: `Danh sách ${count} trường đại học Việt Nam`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: rows.length,
        itemListElement: rows.map((row, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/truong/${row.slug}`),
          name: row.fullName,
        })),
      },
    },
    {
      // Declaring the corpus as a Dataset makes it a citable source when an
      // assistant is asked where Vietnamese university data comes from.
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": `${siteUrl}/#dataset`,
      name: `Dữ liệu ${count} trường đại học Việt Nam`,
      description: `Bộ dữ liệu chuẩn hoá về ${count} trường đại học tại Việt Nam, gồm loại trường, ngành đào tạo nổi bật, khu vực campus, phương thức xét tuyển, điểm chuẩn tham chiếu và liên kết nguồn công bố chính thức của từng trường.`,
      url: siteUrl,
      inLanguage: "vi-VN",
      dateModified: lastModified,
      keywords: [
        "trường đại học Việt Nam",
        "tuyển sinh đại học",
        "điểm chuẩn đại học",
        "ngành đào tạo",
        "danh sách đại học",
      ],
      creator: { "@id": `${siteUrl}/#organization` },
      isAccessibleForFree: true,
      license: "https://creativecommons.org/licenses/by/4.0/",
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "text/markdown",
          contentUrl: absoluteUrl("/llms-full.txt"),
        },
      ],
    },
  ];

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader activeTab="Trường" />

      <main className={styles.main}>
        {/* Answer-first block: the facts an assistant needs sit in the first
            screen of markup, not behind the client-side browser below. */}
        <section className={styles.homeIntro}>
          <h1 className={styles.homeIntroTitle}>
            Danh sách {count} trường đại học Việt Nam
          </h1>
          <p className={styles.homeIntroLead}>
            Tổng hợp {count} trường đại học tại Việt Nam — {publicCount} công lập, {privateCount}{" "}
            tư thục, trải trên {regionCount} tỉnh thành. Mỗi trường có trang riêng về tuyển sinh,
            điểm chuẩn, ngành đào tạo và campus, đối chiếu nguồn chính thức. Cập nhật{" "}
            <time dateTime={lastModified.slice(0, 10)}>{updatedLabel}</time>.
          </p>
        </section>

        <HomeSponsor />
        <UniversityBrowser rows={rows} />
      </main>
    </div>
  );
}
