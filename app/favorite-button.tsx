"use client";

import { useEffect, useState, useTransition } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";

import styles from "./page.module.css";
import { isFavorite, toggleFavorite } from "./favorite-actions";

/**
 * School pages are statically generated, so the favourite state cannot be part
 * of the HTML — it is resolved on the client once Clerk knows who is signed in.
 * The page's markup, and everything crawlers read, is unaffected.
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
  const { isLoaded, isSignedIn } = useAuth();
  // null means "not looked up yet" — deriving `resolved` from it avoids a
  // synchronous setState inside the effect, which cascades renders.
  const [favorited, setFavorited] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();
  const resolved = favorited !== null;

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    let active = true;
    isFavorite(schoolId)
      .then((result) => active && setFavorited(result.favorited))
      .catch(() => active && setFavorited(false));

    return () => {
      active = false;
    };
  }, [isLoaded, isSignedIn, schoolId]);

  if (!isLoaded) {
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

  const isOn = favorited === true;

  function onToggle() {
    const next = !isOn;
    setFavorited(next); // optimistic
    setFailed(false);
    startTransition(async () => {
      const result = await toggleFavorite(schoolId, schoolSlug, next);
      setFavorited(result.favorited);
      setFailed(Boolean(result.failed));
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        disabled={!resolved || pending}
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
          Chưa lưu được, anh/chị thử lại nhé.
        </span>
      ) : isOn ? (
        <Link href="/truong-cua-toi" className={styles.favoriteSavedLink}>
          Xem trường của tôi →
        </Link>
      ) : null}
    </>
  );
}
