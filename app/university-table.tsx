"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { Fragment } from "react";
import styles from "./page.module.css";
import { getMajorChipStyle } from "./university-taxonomy";
import type { UniversityListRow } from "./university-types";

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

/**
 * Every matching row is rendered; rows outside the current page are hidden with
 * CSS rather than sliced away. Same HTML for everyone — a crawler that does not
 * run JS still finds a link to all 186 schools, while the reader keeps paging
 * through ten at a time.
 */
export default function UniversityTable({
  rows,
  query,
  pageStart,
  pageEnd,
  onSelect,
}: {
  rows: UniversityListRow[];
  query: string;
  pageStart: number;
  pageEnd: number;
  onSelect: (row: UniversityListRow) => void;
}) {
  const router = useRouter();

  function isOnCurrentPage(index: number) {
    return index >= pageStart && index < pageEnd;
  }

  function openSchool(row: UniversityListRow) {
    onSelect(row);
    router.push(`/truong/${row.slug}`);
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
            {rows.map((row, index) => {
              const majorChipStyle = getMajorChipStyle(row.featuredMajor);
              const rowClassName = [
                styles.row,
                styles.clickableRow,
                isOnCurrentPage(index) ? "" : styles.rowOffPage,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <tr
                  key={row.slug}
                  className={rowClassName}
                  onClick={() => openSchool(row)}
                >
                  <td className={`${styles.td} ${styles.stickyFlag} ${styles.flagCell}`}>
                    {row.flag}
                  </td>
                  <td className={`${styles.td} ${styles.stickyRepo}`}>
                    <div className={styles.repoCell}>
                      <div className={styles.repoOwner}>{row.shortName}</div>
                      <div className={styles.repoName}>
                        <Link
                          href={`/truong/${row.slug}`}
                          className={styles.repoNameLink}
                          onClick={(event) => {
                            event.stopPropagation();
                            onSelect(row);
                          }}
                        >
                          {renderHighlightedText(row.fullName, query)}
                        </Link>
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
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileList}>
        {rows.map((row, index) => (
          <div
            key={`mobile-${row.slug}`}
            className={[
              styles.mobileItem,
              isOnCurrentPage(index) ? "" : styles.rowOffPage,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={styles.mobileRow} onClick={() => openSchool(row)}>
              <div className={styles.mobileRowSchool}>
                <div className={styles.repoOwner}>{row.shortName}</div>
                <div className={styles.repoName}>
                  <Link
                    href={`/truong/${row.slug}`}
                    className={styles.repoNameLink}
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelect(row);
                    }}
                  >
                    {renderHighlightedText(row.fullName, query)}
                  </Link>
                </div>
              </div>
              <div className={styles.mobileRowDesc}>
                <div className={styles.descCellExpanded}>
                  {renderHighlightedText(row.description, query)}
                </div>
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
}
