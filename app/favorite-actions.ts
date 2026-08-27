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
  failed?: boolean;
};

/**
 * Fetched once per page and shared through FavoritesProvider. Asking per school
 * would mean one round trip for every row in a 176-row table.
 *
 * Errors are caught rather than thrown. An uncaught server action rejection
 * takes down the whole page with "This page couldn't load"; a star that fails
 * to save should not cost the reader the page they were reading.
 */
export async function listMyFavoriteIds(): Promise<string[]> {
  try {
    return [...(await getFavoriteSchoolIds())];
  } catch (error) {
    console.error("[favorites] không đọc được danh sách đã lưu", error);
    return [];
  }
}

export async function toggleFavorite(
  schoolId: string,
  schoolSlug: string,
  nextFavorited: boolean,
): Promise<ToggleResult> {
  try {
    const ok = nextFavorited
      ? await addFavorite(schoolId, schoolSlug)
      : await removeFavorite(schoolId);

    if (!ok) return { favorited: !nextFavorited, signedIn: false };

    revalidatePath("/my-schools");
    return { favorited: nextFavorited, signedIn: true };
  } catch (error) {
    console.error("[favorites] không lưu được trường", error);
    return { favorited: !nextFavorited, signedIn: true, failed: true };
  }
}
