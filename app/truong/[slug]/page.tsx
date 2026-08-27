import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  HelpCircle,
  MapPin,
  TrendingUp,
} from "lucide-react";

import styles from "../../page.module.css";
import { getMajorChipStyle } from "../../university-taxonomy";
import { absoluteUrl, formatVnDate, siteName, siteUrl } from "../../site-config";
import FavoriteButton from "../../favorite-button";
import {
  loadUniversityBySlug,
  loadUniversityRows,
} from "../../university-data";
import type { UniversityRow } from "../../university-types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

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

/** Trim on a word boundary so snippets never end mid-word. */
function truncateAtWord(text: string, limit: number) {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

function buildSeoDescription(school: UniversityRow) {
  const parts = [
    stripMarkdown(school.description),
    school.featuredMajor ? `Ngành nổi bật: ${school.featuredMajor}.` : "",
    school.campuses.length ? `Campus: ${school.campuses.join(", ")}.` : "",
  ].filter(Boolean);

  return truncateAtWord(parts.join(" "), 300);
}

/**
 * A self-contained answer of ~50 words placed above everything else: LLM
 * retrieval scores passages independently, so the top passage has to resolve
 * "what is this school" without the reader scrolling.
 */
function buildTldr(school: UniversityRow) {
  const where = school.campuses.length
    ? `có cơ sở đào tạo tại ${school.campuses.join(", ")}`
    : "chưa có dữ liệu campus chi tiết trên hệ thống";
  const source = school.sourceUrl
    ? ` Thông tin được đối chiếu với nguồn công bố chính thức tại ${getSourceHost(school.sourceUrl)}.`
    : "";

  return `${school.fullName} (${school.shortName}) là ${school.type.toLowerCase()}, ${where}, với ngành đào tạo nổi bật là ${school.featuredMajor.toLowerCase()}. Trang này tổng hợp phương thức xét tuyển, điểm chuẩn tham chiếu, chương trình đào tạo và hệ thống campus của trường.${source}`;
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

/**
 * Headings are phrased the way people actually ask the question. One list
 * drives the body and the table of contents so the two cannot drift apart.
 * `tocLabel` is the short form; `title` is the full question.
 */
function createSections(school: UniversityRow) {
  return [
    {
      id: "tong-quan",
      tocLabel: "Tổng quan",
      title: `${school.shortName} là trường đại học như thế nào?`,
      content: school.information,
      Icon: GraduationCap,
      accent: "blue",
    },
    {
      id: "nganh-dao-tao",
      tocLabel: "Ngành đào tạo",
      title: `${school.shortName} đào tạo những ngành nào?`,
      content: school.programs,
      Icon: BookOpen,
      accent: "violet",
    },
    {
      id: "tuyen-sinh",
      tocLabel: "Phương thức xét tuyển",
      title: `${school.shortName} xét tuyển bằng những phương thức nào?`,
      content: school.admissionMethods,
      Icon: ClipboardList,
      accent: "teal",
    },
    {
      id: "diem-chuan",
      tocLabel: "Điểm chuẩn",
      title: `Điểm chuẩn ${school.shortName} khoảng bao nhiêu?`,
      content: school.admissionScore,
      Icon: TrendingUp,
      accent: "amber",
    },
    {
      id: "campus",
      tocLabel: "Cơ sở đào tạo",
      title: `${school.shortName} có những cơ sở đào tạo nào?`,
      content: school.campusSummary,
      Icon: MapPin,
      accent: "rose",
    },
  ] as const;
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
  const pageUrl = absoluteUrl(`/truong/${school.slug}`);
  const description = buildSeoDescription(school);
  const officialUrls = school.officialUrls;

  const organization = {
    "@type": "CollegeOrUniversity",
    "@id": `${pageUrl}#school`,
    name: school.fullName,
    alternateName: school.shortName,
    description,
    // The entity's own url is its official site; this page is the document
    // *about* it, linked through mainEntityOfPage.
    url: officialUrls[0] || pageUrl,
    sameAs: officialUrls.length ? officialUrls : undefined,
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
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

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${school.fullName} | Tuyển sinh, ngành học, campus`,
    description,
    inLanguage: "vi-VN",
    dateModified: school.lastModified || undefined,
    about: { "@id": `${pageUrl}#school` },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteName,
        item: absoluteUrl("/"),
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
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    isPartOf: { "@id": `${pageUrl}#webpage` },
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, organization, breadcrumb, faqPage],
  };
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
          // h3 keeps the document outline valid under the section's own h2.
          return (
            <h3 key={index} className={className}>
              {renderInlineMarkdown(block.text)}
            </h3>
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
  id,
  title,
  content,
  Icon,
  accent,
}: {
  id: string;
  title: string;
  content: string;
  Icon: LucideIcon;
  accent: string;
}) {
  if (!content) return null;

  return (
    <section id={id} className={styles.detailSection} data-accent={accent}>
      <div className={styles.detailSectionHead}>
        <span className={styles.detailSectionIcon} aria-hidden>
          <Icon />
        </span>
        <h2 className={styles.detailHeading}>{title}</h2>
      </div>
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
  const school = await loadUniversityBySlug(slug);

  if (!school) {
    return {
      title: "Không tìm thấy trường | Danh sách đại học",
    };
  }

  const description = buildSeoDescription(school);
  const canonical = `/truong/${school.slug}`;
  const title = `${school.fullName} | Tuyển sinh, ngành học, campus`;

  return {
    title,
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
      title,
      description,
      url: canonical,
      type: "article",
      modifiedTime: school.lastModified || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical,
    },
  };
}

export default async function SchoolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const school = await loadUniversityBySlug(slug);
  const rows = await loadUniversityRows();

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
  const sections = createSections(school).filter((section) => section.content);
  const jsonLd = buildJsonLd(school, faqItems);
  const overviewText = stripMarkdown(school.information || school.description);
  const campusText = stripMarkdown(school.campusSummary);
  const programsText = stripMarkdown(school.programs);
  const admissionText = stripMarkdown(school.admissionMethods);
  const scoreText = stripMarkdown(school.admissionScore);
  const updatedLabel = formatVnDate(school.lastModified);

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
              {siteName}
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
                <FavoriteButton
                  schoolId={school.id}
                  schoolSlug={school.slug}
                  schoolName={school.fullName}
                />
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
        <div className={styles.detailBody}>
        <article className={styles.detailPageArticleSeo}>
          <p className={styles.detailTldr}>
            {buildTldr(school)}
            {updatedLabel ? (
              <span className={styles.detailUpdated}>
                Dữ liệu cập nhật tới{" "}
                <time dateTime={school.lastModified.slice(0, 10)}>{updatedLabel}</time>.
              </span>
            ) : null}
          </p>

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

          {sections.map((section) => (
            <DetailSection
              key={section.id}
              id={section.id}
              title={section.title}
              content={section.content}
              Icon={section.Icon}
              accent={section.accent}
            />
          ))}

          <section id="faq" className={styles.detailSection} data-accent="slate">
            <div className={styles.detailSectionHead}>
              <span className={styles.detailSectionIcon} aria-hidden>
                <HelpCircle />
              </span>
              <h2 className={styles.detailHeading}>
                Câu hỏi thường gặp về {school.shortName}
              </h2>
            </div>
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
            <section id="lien-quan" className={styles.detailSection} data-accent="slate">
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

        {/* Sticky rail, desktop only. Plain anchors — no JS, so the page stays
            statically rendered and nothing extra ships to the client. */}
        <aside className={styles.detailToc} aria-label="Mục lục trang">
          <p className={styles.detailTocLabel}>Trong trang này</p>
          <nav className={styles.detailTocNav}>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={styles.detailTocLink}
                data-accent={section.accent}
              >
                <span className={styles.detailTocDot} aria-hidden />
                {section.tocLabel}
              </a>
            ))}
            <a href="#faq" className={styles.detailTocLink} data-accent="slate">
              <span className={styles.detailTocDot} aria-hidden />
              Câu hỏi thường gặp
            </a>
            {relatedSchools.length ? (
              <a href="#lien-quan" className={styles.detailTocLink} data-accent="slate">
                <span className={styles.detailTocDot} aria-hidden />
                Trường liên quan
              </a>
            ) : null}
          </nav>
          {school.sourceUrl ? (
            <a
              href={school.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.detailTocSource}
            >
              Website chính thức ↗
            </a>
          ) : null}
        </aside>
        </div>
      </main>
    </div>
  );
}
