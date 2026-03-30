import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import styles from "../../page.module.css";
import { getMajorChipStyle } from "../../university-taxonomy";
import {
  loadUniversityRows,
} from "../../university-data";
import type { UniversityRow } from "../../university-types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function renderInlineMarkdown(text: string) {
  const parts = text
    .split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|https?:\/\/[^\s)]+(?:\([^\s)]*\))?)/g)
    .filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={index} href={part} target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    return part;
  });
}

function stripMarkdown(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSeoDescription(school: UniversityRow) {
  const parts = [
    school.description,
    school.featuredMajor ? `Ngành nổi bật: ${school.featuredMajor}.` : "",
    school.campuses.length ? `Campus: ${school.campuses.join(", ")}.` : "",
  ].filter(Boolean);

  return parts.join(" ").slice(0, 320);
}

function getSourceHost(sourceUrl: string) {
  if (!sourceUrl) return "";

  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, "");
  } catch {
    return sourceUrl;
  }
}

function createFactItems(school: UniversityRow) {
  return [
    { label: "Tên viết tắt", value: school.shortName },
    { label: "Loại trường", value: school.type },
    { label: "Ngành nổi bật", value: school.featuredMajor },
    { label: "Số campus", value: String(school.campuses.length || 1) },
    {
      label: "Khu vực đào tạo",
      value: school.campuses.length ? school.campuses.join(", ") : "Đang cập nhật",
    },
    {
      label: "Nguồn chính thức",
      value: school.sourceUrl ? getSourceHost(school.sourceUrl) : "Đang cập nhật",
    },
  ].filter((item) => item.value);
}

function createFaqItems(school: UniversityRow) {
  return [
    {
      question: `${school.fullName} là trường công lập hay tư thục?`,
      answer: `${school.fullName} hiện được phân loại là ${school.type.toLowerCase()}.`,
    },
    {
      question: `Ngành nổi bật của ${school.shortName} là gì?`,
      answer: `Ngành nổi bật đang được hiển thị cho trường là ${school.featuredMajor.toLowerCase()}.`,
    },
    {
      question: `${school.shortName} có các campus ở đâu?`,
      answer: school.campuses.length
        ? `${school.shortName} hiện có thông tin campus tại ${school.campuses.join(", ")}.`
        : `${school.shortName} hiện chưa có dữ liệu campus chi tiết trên hệ thống.`,
    },
    {
      question: `Xem thông tin chính thức của ${school.shortName} ở đâu?`,
      answer: school.sourceUrl
        ? `Anh/chị có thể kiểm tra thông tin chính thức của trường tại ${school.sourceUrl}.`
        : `Hiện trang này chưa có liên kết nguồn chính thức của trường.`,
    },
  ];
}

function buildJsonLd(school: UniversityRow, faqs: ReturnType<typeof createFaqItems>) {
  const pageUrl = `https://dsdaihoc.com/truong/${school.slug}`;
  const organization = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: school.fullName,
    alternateName: school.shortName,
    description: buildSeoDescription(school),
    url: pageUrl,
    sameAs: school.sourceUrl || undefined,
    address: school.campuses.length
      ? {
          "@type": "PostalAddress",
          addressCountry: "VN",
          addressLocality: school.campuses[0],
        }
      : undefined,
    areaServed: school.campuses.length
      ? school.campuses.map((campus) => ({
          "@type": "City",
          name: campus,
        }))
      : undefined,
    knowsAbout: [school.featuredMajor, ...school.tags].filter(Boolean),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Danh sách đại học",
        item: "https://dsdaihoc.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: school.fullName,
        item: pageUrl,
      },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [organization, breadcrumb, faqPage];
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: Array<
    | { type: "heading"; level: number; text: string }
    | { type: "list"; ordered: boolean; items: string[] }
    | { type: "paragraph"; text: string }
  > = [];

  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let listOrdered = false;

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    blocks.push({ type: "paragraph", text: paragraphBuffer.join(" ").trim() });
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length) return;
    blocks.push({ type: "list", ordered: listOrdered, items: listBuffer });
    listBuffer = [];
    listOrdered = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    const listMatch = line.match(/^([-*]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      listOrdered = /^\d+\.$/.test(listMatch[1]);
      listBuffer.push(listMatch[2].trim());
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();

  return (
    <div className={styles.markdownContent}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const className =
            block.level <= 2 ? styles.markdownHeadingLg : styles.markdownHeadingSm;
          return (
            <h2 key={index} className={className}>
              {renderInlineMarkdown(block.text)}
            </h2>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          const listClassName = block.ordered
            ? styles.markdownOrderedList
            : styles.markdownList;

          return (
            <ListTag key={index} className={listClassName}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInlineMarkdown(item)}</li>
              ))}
            </ListTag>
          );
        }

        return (
          <p key={index} className={styles.markdownParagraph}>
            {renderInlineMarkdown(block.text)}
          </p>
        );
      })}
    </div>
  );
}

function DetailSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  if (!content) return null;

  return (
    <section className={styles.detailSection}>
      <h2 className={styles.detailHeading}>{title}</h2>
      <div className={styles.detailText}>
        <MarkdownContent content={content} />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const rows = await loadUniversityRows();
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rows = await loadUniversityRows();
  const school = rows.find((row) => row.slug === slug) ?? null;

  if (!school) {
    return {
      title: "Không tìm thấy trường | Danh sách đại học",
    };
  }

  const description = buildSeoDescription(school);
  const canonical = `/truong/${school.slug}`;

  return {
    title: `${school.fullName} | Tuyển sinh, ngành học, campus`,
    description,
    keywords: [
      school.fullName,
      school.shortName,
      school.featuredMajor,
      ...school.campuses,
      "tuyen sinh",
      "diem chuan",
      "hoc phi",
    ],
    openGraph: {
      title: `${school.fullName} | Tuyển sinh, ngành học, campus`,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${school.fullName} | Tuyển sinh, ngành học, campus`,
      description,
    },
    alternates: {
      canonical,
    },
  };
}

export default async function SchoolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rows = await loadUniversityRows();
  const school = rows.find((row) => row.slug === slug) ?? null;

  if (!school) {
    notFound();
  }

  const relatedSchools = rows
    .filter((row) => row.slug !== school.slug)
    .sort((left, right) => {
      const leftScore =
        Number(left.featuredMajor === school.featuredMajor) * 3 +
        Number(left.type === school.type) * 2 +
        left.campuses.filter((campus) => school.campuses.includes(campus)).length;
      const rightScore =
        Number(right.featuredMajor === school.featuredMajor) * 3 +
        Number(right.type === school.type) * 2 +
        right.campuses.filter((campus) => school.campuses.includes(campus)).length;

      return rightScore - leftScore;
    })
    .slice(0, 4);

  const majorChipStyle = getMajorChipStyle(school.featuredMajor);
  const factItems = createFactItems(school);
  const faqItems = createFaqItems(school);
  const jsonLd = buildJsonLd(school, faqItems);
  const overviewText = stripMarkdown(school.information || school.description);
  const campusText = stripMarkdown(school.campusSummary);
  const programsText = stripMarkdown(school.programs);
  const admissionText = stripMarkdown(school.admissionMethods);
  const scoreText = stripMarkdown(school.admissionScore);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className={styles.header}>
        <div className={styles.detailPageHeader}>
          <nav className={styles.detailBreadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.detailBreadcrumbLink}>
              Danh sách đại học
            </Link>
            <span className={styles.detailBreadcrumbDivider}>/</span>
            <span className={styles.detailBreadcrumbCurrent}>{school.shortName}</span>
          </nav>
          <Link href="/" className={styles.detailBackLink}>
            ← Quay lại danh sách trường
          </Link>

          <div className={styles.detailHero}>
            <div className={styles.detailHeroMain}>
              <div className={styles.detailPageTitleWrap}>
                <p className={styles.detailPageEyebrow}>Hồ sơ trường đại học</p>
                <h1 className={styles.detailPageTitle}>{school.fullName}</h1>
                <p className={styles.detailHeroLead}>
                  Trang tổng hợp nhanh về tuyển sinh, ngành học nổi bật, campus và thông tin chính
                  thức của {school.shortName}.
                </p>
                <div className={styles.chips}>
                  <span className={`${styles.chip} ${styles.chipMuted}`}>{school.type}</span>
                  <span className={styles.chip} style={majorChipStyle}>
                    {school.featuredMajor}
                  </span>
                  {school.campuses.map((campus) => (
                    <span
                      key={`${school.slug}-${campus}`}
                      className={`${styles.chip} ${styles.chipMuted}`}
                    >
                      {campus}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.detailHeroActions}>
                <Link href="/" className={styles.detailPrimaryAction}>
                  Xem trong danh sách
                </Link>
                {school.sourceUrl ? (
                  <a
                    href={school.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.detailSecondaryAction}
                  >
                    Website chính thức
                  </a>
                ) : null}
              </div>
            </div>

            <div className={styles.detailFactGrid}>
              {factItems.map((item) => (
                <div key={item.label} className={styles.detailFactCard}>
                  <p className={styles.detailFactLabel}>{item.label}</p>
                  <p className={styles.detailFactValue}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <article className={styles.detailPageArticleSeo}>
          <p className={styles.detailIntro}>{school.description}</p>

          <section className={styles.detailQuickSummary}>
            <div className={styles.detailSummaryCard}>
              <h2 className={styles.detailSummaryTitle}>Tóm tắt nhanh</h2>
              <p className={styles.detailSummaryText}>
                {overviewText || school.description}
              </p>
            </div>
            <div className={styles.detailSummaryCard}>
              <h2 className={styles.detailSummaryTitle}>Những gì nên xem đầu tiên</h2>
              <ul className={styles.detailBulletList}>
                {programsText ? <li>Ngành học và chương trình đào tạo nổi bật</li> : null}
                {admissionText ? <li>Phương thức xét tuyển đang có trên hệ thống</li> : null}
                {scoreText ? <li>Thông tin điểm chuẩn và mức tham khảo</li> : null}
                {campusText ? <li>Khu vực đào tạo và hệ thống campus</li> : null}
                {school.sourceUrl ? <li>Nguồn chính thức để kiểm tra cập nhật mới nhất</li> : null}
              </ul>
            </div>
          </section>

          <DetailSection title="Tổng quan trường" content={school.information} />
          <DetailSection title="Ngành học và chương trình đào tạo" content={school.programs} />
          <DetailSection title="Thông tin tuyển sinh" content={school.admissionMethods} />
          <DetailSection title="Điểm chuẩn tham khảo" content={school.admissionScore} />
          <DetailSection title="Campus và khu vực đào tạo" content={school.campusSummary} />

          <section className={styles.detailSection}>
            <h2 className={styles.detailHeading}>Câu hỏi thường gặp</h2>
            <div className={styles.detailFaqList}>
              {faqItems.map((item) => (
                <article key={item.question} className={styles.detailFaqCard}>
                  <h3 className={styles.detailFaqQuestion}>{item.question}</h3>
                  <p className={styles.detailFaqAnswer}>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          {relatedSchools.length ? (
            <section className={styles.detailSection}>
              <h2 className={styles.detailHeading}>Trường liên quan</h2>
              <div className={styles.relatedSchoolGrid}>
                {relatedSchools.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/truong/${item.slug}`}
                    className={styles.relatedSchoolCard}
                  >
                    <p className={styles.relatedSchoolMeta}>{item.shortName}</p>
                    <h3 className={styles.relatedSchoolTitle}>{item.fullName}</h3>
                    <p className={styles.relatedSchoolDesc}>{item.description}</p>
                    <div className={styles.chips}>
                      <span className={`${styles.chip} ${styles.chipMuted}`}>{item.type}</span>
                      <span className={styles.chip} style={getMajorChipStyle(item.featuredMajor)}>
                        {item.featuredMajor}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {school.sourceUrl ? (
            <a
              href={school.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.detailSource}
            >
              Xem nguồn chính thức của {school.shortName}
            </a>
          ) : null}
        </article>
      </main>
    </div>
  );
}
