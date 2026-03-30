"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
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
import { getMajorTone, majorCategories } from "./university-taxonomy";
import UniversityTable, { type UniversityRow } from "./university-table";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function CategoryDropdown({
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

  const filteredCategories = majorCategories.filter((category) =>
    category.label.toLowerCase().includes(search.trim().toLowerCase()),
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
              const checked = selectedCategories.has(category.label);
              return (
                <button
                  key={category.label}
                  type="button"
                  className={styles.multiSelectOption}
                  onClick={() => onToggle(category.label)}
                >
                  <span
                    className={`${styles.checkboxIcon} ${checked ? styles.checkboxIconChecked : ""}`}
                  >
                    {checked ? <Check /> : null}
                  </span>
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: category.color }}
                  />
                  <span className={styles.optionLabel}>{category.label}</span>
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
  onClearQuery,
  onClearLocation,
  onReset,
}: {
  query: string;
  selectedLocation: string;
  selectedCategories: Set<string>;
  onClearQuery: () => void;
  onClearLocation: () => void;
  onReset: () => void;
}) {
  const hiddenCategoryCount = majorCategories.length - selectedCategories.size;

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
        className={`${styles.filterResetButton} ${styles.controlSurface}`}
        onClick={onReset}
      >
        <RotateCcw data-icon="inline-start" />
        Xoá bộ lọc
      </Button>
    </div>
  );
}

export default function UniversityBrowser({ rows }: { rows: UniversityRow[] }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Tất cả tỉnh thành");
  const [categorySearch, setCategorySearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    () => new Set(majorCategories.map((category) => category.label)),
  );
  const deferredQuery = useDeferredValue(debouncedQuery);

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
        selectedCategories.size === 0 ||
        majorCategories
          .filter((category) => selectedCategories.has(category.label))
          .some((category) => category.tone === getMajorTone(row.featuredMajor));

      return matchesQuery && matchesLocation && matchesCategory;
    });
  }, [deferredQuery, rows, selectedCategories, selectedLocation]);

  function toggleCategory(label: string) {
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
    setSelectedCategories(new Set(majorCategories.map((category) => category.label)));
  }

  function clearAllCategories() {
    setSelectedCategories(new Set());
  }

  function selectAllCategories() {
    setSelectedCategories(new Set(majorCategories.map((category) => category.label)));
  }

  return (
    <section>
      <div className={styles.controlsRow}>
        <div className={styles.controls}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm kiếm trường đại học..."
            className={`${styles.input} ${styles.controlSurface}`}
          />
          <CategoryDropdown
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
            onChange={(event) => setSelectedLocation(event.target.value)}
          >
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location === "Tất cả tỉnh thành" ? "Tỉnh thành" : location}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.pagination}>
          <button
            type="button"
            className={`${styles.pageBtn} ${styles.pageBtnIcon} ${styles.pageBtnDisabled}`}
            disabled
            aria-label="Trang trước"
          >
            <ChevronLeft />
          </button>
          <span className={styles.pageInfo}>
            <span className={styles.pageInfoCurrent}>1</span> /{" "}
            <span className={styles.pageInfoCurrent}>1</span>
          </span>
          <span className={styles.pageInfo}>({filteredRows.length} trường)</span>
          <button
            type="button"
            className={`${styles.pageBtn} ${styles.pageBtnIcon} ${styles.pageBtnDisabled}`}
            disabled
            aria-label="Trang sau"
          >
            <ChevronRight />
          </button>
          <select className={styles.pageSizeSelect} defaultValue="20" disabled>
            <option>20</option>
          </select>
        </div>
      </div>

      <ActiveFilters
        query={query}
        selectedLocation={selectedLocation}
        selectedCategories={selectedCategories}
        onClearQuery={() => setQuery("")}
        onClearLocation={() => setSelectedLocation("Tất cả tỉnh thành")}
        onReset={resetFilters}
      />

      <UniversityTable rows={filteredRows} query={deferredQuery} />
    </section>
  );
}
