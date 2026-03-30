"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import styles from "./page.module.css";
import { getMajorColor } from "./university-taxonomy";
import UniversityTable from "./university-table";
import type { UniversityRow } from "./university-types";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function CategoryDropdown({
  categories,
  open,
  search,
  selectedCategories,
  onClose,
  onOpenChange,
  onSearchChange,
  onToggle,
  onClearAll,
  onSelectAll,
}: {
  categories: string[];
  open: boolean;
  search: string;
  selectedCategories: Set<string>;
  onClose: () => void;
  onOpenChange: (next: boolean) => void;
  onSearchChange: (value: string) => void;
  onToggle: (label: string) => void;
  onClearAll: () => void;
  onSelectAll: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [onClose, open]);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className={styles.multiSelectDropdown} ref={dropdownRef}>
      <Button
        type="button"
        variant="outline"
        className={`${styles.multiSelectTrigger} ${styles.controlSurface}`}
        onClick={() => onOpenChange(!open)}
      >
        <span>Ngành</span>
        <span className={styles.selectedCount}>{selectedCategories.size}</span>
        <ChevronDown data-icon="inline-end" />
      </Button>
      {open ? (
        <div className={styles.multiSelectMenu}>
          <div className={styles.multiSelectSearchWrap}>
            <Search className={styles.multiSelectSearchIcon} />
            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Lọc nhóm ngành..."
              className={styles.multiSelectSearch}
            />
          </div>
          <div className={styles.multiSelectActions}>
            <button
              type="button"
              className={styles.multiSelectActionBtn}
              onClick={onSelectAll}
            >
              Chọn tất cả
            </button>
            <button
              type="button"
              className={styles.multiSelectActionBtn}
              onClick={onClearAll}
            >
              Bỏ chọn hết
            </button>
          </div>
          <div className={styles.multiSelectList}>
            {filteredCategories.map((category) => {
              const checked = selectedCategories.has(category);
              const color = getMajorColor(category);
              return (
                <button
                  key={category}
                  type="button"
                  className={styles.multiSelectOption}
                  onClick={() => onToggle(category)}
                >
                  <span
                    className={`${styles.checkboxIcon} ${checked ? styles.checkboxIconChecked : ""}`}
                  >
                    {checked ? <Check /> : null}
                  </span>
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: color.dot }}
                  />
                  <span className={styles.optionLabel}>{category}</span>
                </button>
              );
            })}
            {!filteredCategories.length ? (
              <div className={styles.multiSelectEmpty}>Không có nhóm ngành phù hợp.</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ActiveFilters({
  query,
  selectedLocation,
  selectedCategories,
  totalCategories,
  onClearQuery,
  onClearLocation,
  onReset,
  mobileResetOnly = false,
  compactResetLabel = false,
}: {
  query: string;
  selectedLocation: string;
  selectedCategories: Set<string>;
  totalCategories: number;
  onClearQuery: () => void;
  onClearLocation: () => void;
  onReset: () => void;
  mobileResetOnly?: boolean;
  compactResetLabel?: boolean;
}) {
  const hiddenCategoryCount = totalCategories - selectedCategories.size;

  if (
    !query.trim() &&
    selectedLocation === "Tất cả tỉnh thành" &&
    hiddenCategoryCount === 0
  ) {
    return null;
  }

  return (
    <div className={styles.activeFilters}>
      {query.trim() ? (
        <button type="button" className={styles.filterChip} onClick={onClearQuery}>
          <span>Từ khóa: {query.trim()}</span>
          <X />
        </button>
      ) : null}
      {selectedLocation !== "Tất cả tỉnh thành" ? (
        <button type="button" className={styles.filterChip} onClick={onClearLocation}>
          <span>Tỉnh thành: {selectedLocation}</span>
          <X />
        </button>
      ) : null}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={`${styles.filterResetButton} ${styles.controlSurface} ${mobileResetOnly ? styles.filterResetButtonMobileOnly : ""}`}
        onClick={onReset}
      >
        <RotateCcw data-icon="inline-start" />
        {compactResetLabel ? "Reset" : "Xoá bộ lọc"}
      </Button>
    </div>
  );
}

function PaginationControls({
  currentPage,
  totalPages,
  pageSize,
  onPrev,
  onNext,
  onGoToPage,
  onPageSizeChange,
  onReset,
  showReset,
  mobileOnly = false,
}: {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPrev: () => void;
  onNext: () => void;
  onGoToPage: (page: number) => void;
  onPageSizeChange: (nextValue: string) => void;
  onReset: () => void;
  showReset: boolean;
  mobileOnly?: boolean;
}) {
  const pages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis-end", totalPages] as const;
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "ellipsis-start",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ] as const;
    }

    return [
      1,
      "ellipsis-start",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis-end",
      totalPages,
    ] as const;
  }, [currentPage, totalPages]);

  return (
    <div
      className={`${styles.pagination} ${mobileOnly ? styles.paginationMobileOnly : styles.paginationDesktopOnly}`}
    >
      <button
        type="button"
        className={`${styles.pageBtn} ${styles.pageBtnIcon} ${currentPage <= 1 ? styles.pageBtnDisabled : ""}`}
        disabled={currentPage <= 1}
        aria-label="Trang trước"
        onClick={onPrev}
      >
        <ChevronLeft />
      </button>
      <div className={styles.pageNumberGroup} aria-label="Danh sách trang">
        {pages.map((page) =>
          typeof page === "number" ? (
            <button
              key={page}
              type="button"
              className={`${styles.pageNumberBtn} ${page === currentPage ? styles.pageNumberBtnActive : ""}`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onGoToPage(page)}
            >
              {page}
            </button>
          ) : (
            <span key={page} className={styles.pageEllipsis}>
              ...
            </span>
          ),
        )}
      </div>
      <button
        type="button"
        className={`${styles.pageBtn} ${styles.pageBtnIcon} ${currentPage >= totalPages ? styles.pageBtnDisabled : ""}`}
        disabled={currentPage >= totalPages}
        aria-label="Trang sau"
        onClick={onNext}
      >
        <ChevronRight />
      </button>
      <select
        className={styles.pageSizeSelect}
        value={String(pageSize)}
        onChange={(event) => onPageSizeChange(event.target.value)}
        aria-label="Số trường mỗi trang"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      {mobileOnly && showReset ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={`${styles.filterResetButton} ${styles.controlSurface} ${styles.filterResetButtonBottom}`}
          onClick={onReset}
        >
          <RotateCcw data-icon="inline-start" />
          Reset
        </Button>
      ) : null}
    </div>
  );
}

export default function UniversityBrowser({ rows }: { rows: UniversityRow[] }) {
  const majorOptions = useMemo(
    () =>
      Array.from(
        new Set(rows.map((row) => row.featuredMajor.trim()).filter(Boolean)),
      ).sort((a, b) => a.localeCompare(b, "vi")),
    [rows],
  );
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Tất cả tỉnh thành");
  const [categorySearch, setCategorySearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    () =>
      new Set(
        Array.from(
          new Set(rows.map((row) => row.featuredMajor.trim()).filter(Boolean)),
        ),
      ),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(debouncedQuery);
  const hasActiveFilters =
    !!query.trim() ||
    selectedLocation !== "Tất cả tỉnh thành" ||
    selectedCategories.size !== majorOptions.length;

  useEffect(() => {
    function syncSlugFromUrl() {
      const nextSlug = new URLSearchParams(window.location.search).get("truong");
      setOpenSlug((current) => (current === nextSlug ? current : nextSlug));
    }

    syncSlugFromUrl();
    window.addEventListener("popstate", syncSlugFromUrl);
    return () => window.removeEventListener("popstate", syncSlugFromUrl);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [query]);

  const locationOptions = useMemo(() => {
    const locations = new Set<string>();
    rows.forEach((row) => {
      row.campuses.forEach((campus) => {
        if (campus) locations.add(campus);
      });
    });
    return ["Tất cả tỉnh thành", ...Array.from(locations).sort((a, b) => a.localeCompare(b, "vi"))];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = normalizeText(deferredQuery);

    return rows.filter((row) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          row.shortName,
          row.fullName,
          row.description,
          row.featuredMajor,
          row.type,
          ...row.campuses,
          ...row.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesLocation =
        selectedLocation === "Tất cả tỉnh thành" ||
        row.campuses.some((campus) => campus === selectedLocation);

      const matchesCategory =
        selectedCategories.size > 0 && selectedCategories.has(row.featuredMajor);

      return matchesQuery && matchesLocation && matchesCategory;
    });
  }, [deferredQuery, rows, selectedCategories, selectedLocation]);

  const openRowIndex = useMemo(
    () =>
      openSlug
        ? filteredRows.findIndex((row) => row.slug === openSlug)
        : -1,
    [filteredRows, openSlug],
  );

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const resolvedOpenSlug =
    openSlug && filteredRows.some((row) => row.slug === openSlug) ? openSlug : null;
  const effectiveCurrentPage =
    openRowIndex >= 0
      ? Math.floor(openRowIndex / pageSize) + 1
      : Math.min(currentPage, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (effectiveCurrentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [effectiveCurrentPage, filteredRows, pageSize]);

  const replaceOpenSlug = useCallback(
    (slug: string | null) => {
      const nextParams = new URLSearchParams(window.location.search);
      if (slug) {
        nextParams.set("truong", slug);
      } else {
        nextParams.delete("truong");
      }

      const nextQuery = nextParams.toString();
      const nextUrl = nextQuery
        ? `${window.location.pathname}?${nextQuery}`
        : window.location.pathname;
      window.history.replaceState(null, "", nextUrl);
    },
    [],
  );

  function handleQueryChange(nextValue: string) {
    setQuery(nextValue);
    setCurrentPage(1);
  }

  function handleLocationChange(nextValue: string) {
    setSelectedLocation(nextValue);
    setCurrentPage(1);
  }

  function handlePageSizeChange(nextValue: string) {
    const parsed = Number(nextValue);
    if (!Number.isFinite(parsed) || parsed <= 0) return;
    setOpenSlug(null);
    replaceOpenSlug(null);
    setPageSize(parsed);
    setCurrentPage(1);
  }

  function handleToggleRow(slug: string | null) {
    setCategoryOpen(false);
    setOpenSlug(slug);
    replaceOpenSlug(slug);
  }

  function goToPage(nextPage: number) {
    const normalizedPage = Math.min(Math.max(nextPage, 1), totalPages);
    setOpenSlug(null);
    replaceOpenSlug(null);
    setCurrentPage(normalizedPage);
  }

  useEffect(() => {
    if (!openSlug) return;
    if (resolvedOpenSlug) return;
    replaceOpenSlug(null);
  }, [openSlug, replaceOpenSlug, resolvedOpenSlug]);

  function toggleCategory(label: string) {
    setCurrentPage(1);
    setSelectedCategories((current) => {
      const next = new Set(current);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  function resetFilters() {
    setQuery("");
    setDebouncedQuery("");
    setSelectedLocation("Tất cả tỉnh thành");
    setCategorySearch("");
    setCategoryOpen(false);
    setSelectedCategories(new Set(majorOptions));
    setCurrentPage(1);
    setOpenSlug(null);
    replaceOpenSlug(null);
  }

  function clearAllCategories() {
    setCurrentPage(1);
    setSelectedCategories(new Set());
  }

  function selectAllCategories() {
    setCurrentPage(1);
    setSelectedCategories(new Set(majorOptions));
  }

  return (
    <section>
      <div className={styles.controlsRow}>
        <div className={styles.controls}>
          <div className={styles.searchField}>
            <input
              type="text"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Tìm kiếm trường đại học..."
              className={`${styles.input} ${styles.controlSurface} ${styles.searchInput}`}
            />
            <span className={styles.searchCount}>
              {filteredRows.length}
            </span>
          </div>
          <CategoryDropdown
            categories={majorOptions}
            open={categoryOpen}
            search={categorySearch}
            selectedCategories={selectedCategories}
            onClose={() => setCategoryOpen(false)}
            onOpenChange={setCategoryOpen}
            onSearchChange={setCategorySearch}
            onToggle={toggleCategory}
            onClearAll={clearAllCategories}
            onSelectAll={selectAllCategories}
          />
          <select
            className={`${styles.input} ${styles.select} ${styles.controlSurface}`}
            value={selectedLocation}
            onChange={(event) => handleLocationChange(event.target.value)}
          >
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location === "Tất cả tỉnh thành" ? "Tỉnh thành" : location}
              </option>
            ))}
          </select>
        </div>

        <PaginationControls
          currentPage={effectiveCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPrev={() => goToPage(effectiveCurrentPage - 1)}
          onNext={() => goToPage(effectiveCurrentPage + 1)}
          onGoToPage={goToPage}
          onPageSizeChange={handlePageSizeChange}
          onReset={resetFilters}
          showReset={hasActiveFilters}
        />
      </div>

      <ActiveFilters
        query={query}
        selectedLocation={selectedLocation}
        selectedCategories={selectedCategories}
        totalCategories={majorOptions.length}
        onClearQuery={() => setQuery("")}
        onClearLocation={() => setSelectedLocation("Tất cả tỉnh thành")}
        onReset={resetFilters}
        mobileResetOnly
        compactResetLabel
      />

      <UniversityTable
        rows={paginatedRows}
        query={deferredQuery}
        openSlug={resolvedOpenSlug}
        onToggleRow={handleToggleRow}
      />

      <PaginationControls
        currentPage={effectiveCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPrev={() => goToPage(effectiveCurrentPage - 1)}
        onNext={() => goToPage(effectiveCurrentPage + 1)}
        onGoToPage={goToPage}
        onPageSizeChange={handlePageSizeChange}
        onReset={resetFilters}
        showReset={hasActiveFilters}
        mobileOnly
      />
    </section>
  );
}
