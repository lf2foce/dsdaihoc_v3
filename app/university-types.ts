export type UniversityListRow = {
  /** Stable dataset id. Favourites key on this, never on the derived slug. */
  id: string;
  rank: number;
  displayOrder: number | null;
  slug: string;
  shortName: string;
  fullName: string;
  type: string;
  featuredMajor: string;
  description: string;
  campuses: string[];
  tags: string[];
  sourceUrl: string;
  /** Every source the record was built from, primary one first. */
  sourceUrls: string[];
  /** Subset of sourceUrls on the school's own domain — safe for schema sameAs. */
  officialUrls: string[];
  /** ISO timestamp of the last data refresh, or "" when unknown. */
  lastModified: string;
};

export type UniversityDetail = {
  campusSummary: string;
  information: string;
  programs: string;
  admissionMethods: string;
  admissionScore: string;
};

export type UniversityRow = UniversityListRow & UniversityDetail;

export type DatasetMeta = {
  count: number;
  /** ISO timestamp of the most recently refreshed record. */
  lastModified: string;
};
