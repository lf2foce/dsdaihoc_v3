"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

import styles from "./page.module.css";
import { useFavorites } from "./favorites-context";

/**
 * The labelled star on a school page. State comes from FavoritesProvider, which
 * fetched it once, so this component makes no request of its own.
 */
export default function FavoriteButton({
  schoolId,
  schoolSlug,
  schoolName,
}: {
  schoolId: string;
  schoolSlug: string;
  schoolName: string;
}) {
  const { ids, isSignedIn, authLoaded, toggle } = useFavorites();
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!authLoaded) {
    return <span className={styles.favoriteButtonPlaceholder} aria-hidden />;
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button
          type="button"
          className={`${styles.favoriteButton} ${styles.favoriteButtonPrimary}`}
        >
          <Star aria-hidden />
          Lưu trường này
        </button>
      </SignInButton>
    );
  }

  const isOn = ids?.has(schoolId) ?? false;

  function onToggle() {
    setFailed(false);
    startTransition(async () => {
      const ok = await toggle(schoolId, schoolSlug);
      setFailed(!ok);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        disabled={ids === null || pending}
        aria-pressed={isOn}
        aria-label={isOn ? `Bỏ lưu ${schoolName}` : `Lưu ${schoolName} vào trường của tôi`}
        className={`${styles.favoriteButton} ${
          isOn ? styles.favoriteButtonOn : styles.favoriteButtonPrimary
        }`}
      >
        <Star aria-hidden fill={isOn ? "currentColor" : "none"} />
        {isOn ? "Đã lưu" : "Lưu trường này"}
      </button>
      {failed ? (
        <span className={styles.favoriteError} role="status">
          Chưa lưu được, bạn thử lại nhé.
        </span>
      ) : isOn ? (
        <Link href="/my-schools" className={styles.favoriteSavedLink}>
          Xem trường của tôi →
        </Link>
      ) : null}
    </>
  );
}
