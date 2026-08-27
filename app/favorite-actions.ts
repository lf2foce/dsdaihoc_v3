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
 * Errors are caught rather than thrown. An uncaught server action rejection
 * takes down the whole page with "This page couldn't load"; a star that fails
 * to save should not cost the reader the article they were reading.
 */
export async function isFavorite(schoolId: string): Promise<ToggleResult> {
  try {
    const ids = await getFavoriteSchoolIds();
    return { favorited: ids.has(schoolId), signedIn: true };
  } catch (error) {
    console.error("[favorites] không đọc được trạng thái đã lưu", error);
    return { favorited: false, signedIn: true, failed: true };
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

    revalidatePath("/truong-cua-toi");
    return { favorited: nextFavorited, signedIn: true };
  } catch (error) {
    console.error("[favorites] không lưu được trường", error);
    return { favorited: !nextFavorited, signedIn: true, failed: true };
  }
}
