"use client";

import { useTransition } from "react";
import { Star } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

import styles from "./page.module.css";
import { useFavorites } from "./favorites-context";

/**
 * Compact star for a table row. Replaces a column that used to hold the same
 * 🇻🇳 flag on every one of the 176 rows.
 */
export default function FavoriteStar({
  schoolId,
  schoolSlug,
  schoolName,
}: {
  schoolId: string;
  schoolSlug: string;
  schoolName: string;
}) {
  const { ids, isSignedIn, authLoaded, toggle } = useFavorites();
  const [pending, startTransition] = useTransition();

  // Row clicks navigate to the school page, so the star must not bubble.
  function stop(event: React.MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  // Same as FavoriteButton: an unloaded Clerk degrades to the signed-out star
  // rather than 176 dead placeholders down the table.
  if (!authLoaded || !isSignedIn) {
    return (
      <span onClick={stop}>
        <SignInButton mode="modal">
          <button
            type="button"
            className={styles.starButton}
            aria-label={`Đăng nhập để lưu ${schoolName}`}
            title="Đăng nhập để lưu trường này"
          >
            <Star aria-hidden />
          </button>
        </SignInButton>
      </span>
    );
  }

  const isOn = ids?.has(schoolId) ?? false;

  return (
    <button
      type="button"
      onClick={(event) => {
        stop(event);
        startTransition(async () => {
          await toggle(schoolId, schoolSlug);
        });
      }}
      disabled={ids === null || pending}
      aria-pressed={isOn}
      aria-label={isOn ? `Bỏ lưu ${schoolName}` : `Lưu ${schoolName}`}
      title={isOn ? "Bỏ lưu" : "Lưu trường này"}
      className={`${styles.starButton} ${isOn ? styles.starButtonOn : ""}`}
    >
      <Star aria-hidden fill={isOn ? "currentColor" : "none"} />
    </button>
  );
}
