import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import styles from "../../page.module.css";
import {
  loadUniversityBySlug,
  loadUniversityRows,
} from "../../university-data";

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
  const school = await loadUniversityBySlug(slug);

  if (!school) {
    return {
      title: "Không tìm thấy trường | Đại học VN",
    };
  }

  const description = school.description || `Thông tin tuyển sinh và ngành học của ${school.fullName}.`;

  return {
    title: `${school.fullName} | Đại học VN`,
    description,
    openGraph: {
      title: `${school.fullName} | Đại học VN`,
      description,
      type: "article",
    },
    alternates: {
      canonical: `/truong/${school.slug}`,
    },
  };
}

export default async function SchoolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const school = await loadUniversityBySlug(slug);

  if (!school) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.detailPageHeader}>
          <Link href="/" className={styles.detailBackLink}>
            ← Quay lại danh sách trường
          </Link>
          <div className={styles.detailPageTitleWrap}>
            <p className={styles.detailPageEyebrow}>Hồ sơ trường đại học</p>
            <h1 className={styles.detailPageTitle}>{school.fullName}</h1>
            <div className={styles.chips}>
              <span className={`${styles.chip} ${styles.chipMuted}`}>{school.type}</span>
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
        </div>
      </header>

      <main className={styles.main}>
        <article className={styles.detailPageArticle}>
          <p className={styles.detailIntro}>{school.description}</p>

          <DetailSection title="Tổng quan" content={school.information} />
          <DetailSection title="Cơ sở đào tạo" content={school.campusSummary} />
          <DetailSection title="Chương trình đào tạo" content={school.programs} />
          <DetailSection
            title="Phương thức xét tuyển"
            content={school.admissionMethods}
          />
          <DetailSection title="Điểm chuẩn" content={school.admissionScore} />

          {school.sourceUrl ? (
            <a
              href={school.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.detailSource}
            >
              Xem nguồn chính thức
            </a>
          ) : null}
        </article>
      </main>
    </div>
  );
}
