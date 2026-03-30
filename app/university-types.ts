export type UniversityListRow = {
  rank: number;
  displayOrder: number | null;
  slug: string;
  flag: string;
  shortName: string;
  fullName: string;
  type: string;
  featuredMajor: string;
  description: string;
  campuses: string[];
  tags: string[];
  sourceUrl: string;
};

export type UniversityDetail = {
  campusSummary: string;
  information: string;
  programs: string;
  admissionMethods: string;
  admissionScore: string;
};

export type UniversityRow = UniversityListRow & UniversityDetail;
