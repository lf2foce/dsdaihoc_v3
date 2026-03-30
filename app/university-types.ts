export type UniversityRow = {
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
  campusSummary: string;
  information: string;
  programs: string;
  admissionMethods: string;
  admissionScore: string;
  tags: string[];
  sourceUrl: string;
};
