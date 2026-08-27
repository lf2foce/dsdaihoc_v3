"use server";

import { revalidatePath } from "next/cache";

import {
  addFavorite,
  getFavoriteSchoolIds,
  removeFavorite,
} from "./favorites";

export type ToggleResult = {
  favorited: boolean;
  signedIn: boolean;
};

/** Called on mount by the star button, so school pages stay static. */
export async function isFavorite(schoolId: string): Promise<ToggleResult> {
  const ids = await getFavoriteSchoolIds();
  return { favorited: ids.has(schoolId), signedIn: true };
}

export async function toggleFavorite(
  schoolId: string,
  schoolSlug: string,
  nextFavorited: boolean,
): Promise<ToggleResult> {
  const ok = nextFavorited
    ? await addFavorite(schoolId, schoolSlug)
    : await removeFavorite(schoolId);

  if (!ok) return { favorited: !nextFavorited, signedIn: false };

  revalidatePath("/truong-cua-toi");
  return { favorited: nextFavorited, signedIn: true };
}
