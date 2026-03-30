"use client";

import { Fragment, type ReactNode, useMemo, useState } from "react";
import styles from "./page.module.css";

export type UniversityRow = {
  rank: number;
  flag: string;
  shortName: string;
  fullName: string;
  type: string;
  featuredMajor: string;
  description: string;
  campuses: string[];
  campusSummary: string;
  information: string;
  programs: string;
  admissionMethods: string;
  admissionScore: string;
  tags: string[];
  sourceUrl: string;
};

function renderInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);

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
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function MarkdownContent({ content }: { content: string }) {
  const blocks = useMemo(() => {
    const lines = content.split("\n");
    const parsed: Array<
      | { type: "heading"; level: number; text: string }
      | { type: "list"; items: string[] }
      | { type: "paragraph"; text: string }
    > = [];

    let paragraphBuffer: string[] = [];
    let listBuffer: string[] = [];

    const flushParagraph = () => {
      if (!paragraphBuffer.length) return;
      parsed.push({ type: "paragraph", text: paragraphBuffer.join(" ").trim() });
      paragraphBuffer = [];
    };

    const flushList = () => {
      if (!listBuffer.length) return;
      parsed.push({ type: "list", items: listBuffer });
      listBuffer = [];
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
          return (
            <ul key={index} className={styles.markdownList}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInlineMarkdown(item)}</li>
              ))}
            </ul>
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

export default function UniversityTable({ rows }: { rows: UniversityRow[] }) {
  const [openRank, setOpenRank] = useState<number | null>(null);
  const openRow = rows.find((row) => row.rank === openRank) ?? null;

  return (
    <div className={styles.tableScrollWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <colgroup>
            <col className={styles.colRank} />
            <col className={styles.colFlag} />
            <col className={styles.colSchool} />
            <col className={styles.colDescription} />
            <col className={styles.colType} />
            <col className={styles.colMajor} />
            <col className={styles.colCampus} />
          </colgroup>
          <thead>
            <tr>
              <th className={`${styles.th} ${styles.stickyRank}`}>#</th>
              <th className={`${styles.th} ${styles.stickyFlag}`} />
              <th className={`${styles.th} ${styles.stickyRepo}`}>Trường</th>
              <th className={styles.th}>Mô tả</th>
              <th className={styles.th}>Loại trường</th>
              <th className={styles.th}>Ngành nổi bật</th>
              <th className={styles.th}>Campus</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isOpen = row.rank === openRank;
              return (
                <Fragment key={`${row.rank}-${row.shortName}`}>
                  <tr
                    className={`${styles.row} ${styles.clickableRow} ${isOpen ? styles.rowOpen : ""}`}
                    onClick={() => setOpenRank(isOpen ? null : row.rank)}
                  >
                    <td className={`${styles.td} ${styles.stickyRank}`}>{row.rank}</td>
                    <td className={`${styles.td} ${styles.stickyFlag}`}>{row.flag}</td>
                    <td className={`${styles.td} ${styles.stickyRepo}`}>
                      <div className={styles.repoCell}>
                        <div className={styles.repoOwner}>{row.shortName}</div>
                        <div className={styles.repoName}>{row.fullName}</div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.descCellExpanded}>{row.description}</div>
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.chip} ${styles.chipMuted}`}>{row.type}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.chip} ${styles.chipMuted}`}>
                        {row.featuredMajor}
                      </span>
                    </td>
                    <td className={styles.td}>
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
                      <td className={styles.detailCell} colSpan={7}>
                        <div className={styles.detailCard}>
                          <div className={styles.detailTop}>
                            <div className={styles.detailTitleWrap}>
                              <span className={styles.detailBadge}>#{row.rank}</span>
                              <h2 className={styles.detailTitle}>{row.fullName}</h2>
                            </div>
                            <div className={styles.chips}>
                              <span className={`${styles.chip} ${styles.chipMuted}`}>
                                {row.type}
                              </span>
                              {row.campuses.map((campus) => (
                                <span
                                  key={`${row.shortName}-detail-${campus}`}
                                  className={`${styles.chip} ${styles.chipMuted}`}
                                >
                                  {campus}
                                </span>
                              ))}
                              <span className={`${styles.chip} ${styles.chipMuted}`}>
                                {row.featuredMajor}
                              </span>
                            </div>
                          </div>

                          <div className={styles.detailIntro}>{row.description}</div>

                          <DetailSection content={row.information} />
                          <DetailSection title="Cơ sở đào tạo" content={row.campusSummary} />
                          <DetailSection title="Chương trình đào tạo" content={row.programs} />
                          <DetailSection
                            title="Phương thức xét tuyển"
                            content={row.admissionMethods}
                          />
                          <DetailSection title="Điểm chuẩn" content={row.admissionScore} />

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
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {openRow ? (
        <button
          type="button"
          className={styles.collapseFab}
          onClick={() => setOpenRank(null)}
          aria-label={`Thu gọn ${openRow.fullName}`}
          title="Thu gọn"
        >
          Thu gọn
        </button>
      ) : null}
    </div>
  );
}
