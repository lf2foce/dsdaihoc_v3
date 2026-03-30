import { NextResponse } from "next/server";

import { loadUniversityBySlug } from "../../../university-data";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/truong/[slug]">,
) {
  const { slug } = await context.params;
  const school = await loadUniversityBySlug(slug);

  if (!school) {
    return NextResponse.json({ message: "School not found" }, { status: 404 });
  }

  return NextResponse.json({
    campusSummary: school.campusSummary,
    information: school.information,
    programs: school.programs,
    admissionMethods: school.admissionMethods,
    admissionScore: school.admissionScore,
  });
}
