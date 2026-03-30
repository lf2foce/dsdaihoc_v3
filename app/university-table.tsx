"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Fragment, type ReactNode, useMemo } from "react";
import styles from "./page.module.css";
import { getMajorChipStyle } from "./university-taxonomy";
import type { UniversityDetail, UniversityListRow } from "./university-types";

function renderInlineMarkdown(text: string): ReactNode[] {
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
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function renderHighlightedText(text: string, query: string) {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return text;

  const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === trimmedQuery.toLowerCase() ? (
      <mark key={`${part}-${index}`} className={styles.searchMark}>
        {part}
      </mark>
    ) : (
      <Fragment key={`${part}-${index}`}>{part}</Fragment>
    ),
  );
}

function MarkdownContent({ content }: { content: string }) {
  const blocks = useMemo(() => {
    const lines = content.split("\n");
    const parsed: Array<
      | { type: "heading"; level: number; text: string }
      | { type: "list"; ordered: boolean; items: string[] }
      | { type: "paragraph"; text: string }
    > = [];

    let paragraphBuffer: string[] = [];
    let listBuffer: string[] = [];
    let listOrdered = false;

    const flushParagraph = () => {
      if (!paragraphBuffer.length) return;
      parsed.push({ type: "paragraph", text: paragraphBuffer.join(" ").trim() });
      paragraphBuffer = [];
    };

    const flushList = () => {
      if (!listBuffer.length) return;
      parsed.push({ type: "list", ordered: listOrdered, items: listBuffer });
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
        parsed.push({
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
    return parsed;
  }, [content]);

  return (
    <div className={styles.markdownContent}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const className =
            block.level <= 2 ? styles.markdownHeadingLg : styles.markdownHeadingSm;
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
  title,
  content,
}: {
  title?: string;
  content: string;
}) {
  if (!content) return null;

  return (
    <section className={styles.detailSection}>
      {title ? <h3 className={styles.detailHeading}>{title}</h3> : null}
      <div className={styles.detailText}>
        <MarkdownContent content={content} />
      </div>
    </section>
  );
}

export default function UniversityTable({
  rows,
  query,
  openSlug,
  openDetail,
  detailLoading,
  detailError,
  onToggleRow,
}: {
  rows: UniversityListRow[];
  query: string;
  openSlug: string | null;
  openDetail: UniversityDetail | null;
  detailLoading: boolean;
  detailError: string | null;
  onToggleRow: (slug: string | null) => void;
}) {
  const openRow = rows.find((row) => row.slug === openSlug) ?? null;

  function renderDetailContent(row: UniversityListRow) {
    const majorChipStyle = getMajorChipStyle(row.featuredMajor);

    return (
      <div className={styles.detailCard}>
        <div className={styles.detailTop}>
          <div className={styles.detailTitleWrap}>
            <h2 className={styles.detailTitle}>{row.fullName}</h2>
          </div>
          <div className={styles.chips}>
            <span className={`${styles.chip} ${styles.chipMuted}`}>{row.type}</span>
            {row.campuses.map((campus) => (
              <span
                key={`${row.shortName}-detail-${campus}`}
                className={`${styles.chip} ${styles.chipMuted}`}
              >
                {campus}
              </span>
            ))}
            <span className={styles.chip} style={majorChipStyle}>
              {row.featuredMajor}
            </span>
          </div>
        </div>

        <div className={styles.detailIntro}>{row.description}</div>

        {detailLoading ? (
          <p className={styles.detailStatus}>Đang tải nội dung chi tiết...</p>
        ) : null}

        {detailError ? (
          <p className={`${styles.detailStatus} ${styles.detailStatusError}`}>{detailError}</p>
        ) : null}

        {openDetail ? (
          <>
            <DetailSection content={openDetail.information} />
            <DetailSection title="Cơ sở đào tạo" content={openDetail.campusSummary} />
            <DetailSection title="Chương trình đào tạo" content={openDetail.programs} />
            <DetailSection
              title="Phương thức xét tuyển"
              content={openDetail.admissionMethods}
            />
            <DetailSection title="Điểm chuẩn" content={openDetail.admissionScore} />
          </>
        ) : null}

        <div className={styles.detailInlineActions}>
          {row.sourceUrl ? (
            <a
              href={row.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.detailSource}
            >
              Nguồn chính
            </a>
          ) : null}
          <Link href={`/truong/${row.slug}`} className={styles.detailPrimaryActionInline}>
            Xem trang riêng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableScrollWrapper}>
      <div className={`${styles.tableContainer} ${styles.desktopTable}`}>
        <table className={styles.table}>
          <colgroup>
            <col className={styles.colFlag} />
            <col className={styles.colSchool} />
            <col className={styles.colDescription} />
            <col className={styles.colType} />
            <col className={styles.colMajor} />
            <col className={styles.colCampus} />
          </colgroup>
          <thead>
            <tr>
              <th className={`${styles.th} ${styles.stickyFlag} ${styles.flagCell}`} />
              <th className={`${styles.th} ${styles.stickyRepo}`}>Trường</th>
              <th className={styles.th}>Mô tả</th>
              <th className={`${styles.th} ${styles.desktopOnly}`}>Loại trường</th>
              <th className={`${styles.th} ${styles.desktopOnly}`}>Ngành nổi bật</th>
              <th className={`${styles.th} ${styles.desktopOnly}`}>Campus</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isOpen = row.slug === openSlug;
              const majorChipStyle = getMajorChipStyle(row.featuredMajor);
              return (
                <Fragment key={row.slug}>
                  <tr
                    className={`${styles.row} ${styles.clickableRow} ${isOpen ? styles.rowOpen : ""}`}
                    onClick={() => onToggleRow(isOpen ? null : row.slug)}
                  >
                    <td className={`${styles.td} ${styles.stickyFlag} ${styles.flagCell}`}>
                      {row.flag}
                    </td>
                    <td className={`${styles.td} ${styles.stickyRepo}`}>
                      <div className={styles.repoCell}>
                        <div className={styles.repoOwner}>{row.shortName}</div>
                        <div className={styles.repoName}>
                          {renderHighlightedText(row.fullName, query)}
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.descCellExpanded}>
                        {renderHighlightedText(row.description, query)}
                      </div>
                    </td>
                    <td className={`${styles.td} ${styles.desktopOnly}`}>
                      <span className={`${styles.chip} ${styles.chipMuted}`}>{row.type}</span>
                    </td>
                    <td className={`${styles.td} ${styles.desktopOnly}`}>
                      <span className={styles.chip} style={majorChipStyle}>
                        {row.featuredMajor}
                      </span>
                    </td>
                    <td className={`${styles.td} ${styles.desktopOnly}`}>
                      <div className={styles.chips}>
                        {row.campuses.map((campus) => (
                          <span
                            key={`${row.shortName}-${campus}`}
                            className={`${styles.chip} ${styles.chipMuted}`}
                          >
                            {campus}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                  {isOpen ? (
                    <tr className={styles.detailRow}>
                      <td className={styles.detailCell} colSpan={6}>
                        {renderDetailContent(row)}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.mobileList}>
        {rows.map((row) => {
          const isOpen = row.slug === openSlug;

          return (
            <div key={`mobile-${row.slug}`} className={styles.mobileItem}>
              <button
                type="button"
                className={`${styles.mobileRow} ${isOpen ? styles.mobileRowOpen : ""}`}
                onClick={() => onToggleRow(isOpen ? null : row.slug)}
              >
                <div className={styles.mobileRowSchool}>
                  <div className={styles.repoOwner}>{row.shortName}</div>
                  <div className={styles.repoName}>
                    {renderHighlightedText(row.fullName, query)}
                  </div>
                </div>
                <div className={styles.mobileRowDesc}>
                  <div className={styles.descCellExpanded}>
                    {renderHighlightedText(row.description, query)}
                  </div>
                </div>
              </button>
              {isOpen ? (
                <div className={styles.mobileDetailWrap}>
                  {renderDetailContent(row)}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className={styles.topFab}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Lên đầu trang"
        title="Lên đầu"
      >
        <ArrowUp />
      </button>
      {openRow ? (
        <button
          type="button"
          className={styles.collapseFab}
          onClick={() => onToggleRow(null)}
          aria-label={`Thu gọn ${openRow.fullName}`}
          title="Thu gọn"
        >
          Thu gọn
        </button>
      ) : null}
    </div>
  );
}
