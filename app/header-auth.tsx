"use client";

import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

import styles from "./page.module.css";

/**
 * The header renders on statically generated pages, so auth state cannot come
 * from `auth()` on the server — that would opt `/`, `/faqs` and `/quiz` out of
 * static rendering. Resolved on the client instead.
 *
 * Clerk Core 3 removed <SignedIn> / <SignedOut>; useAuth() is the replacement.
 */
export default function HeaderAuth({ active }: { active: boolean }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <span className={styles.headerAuthPlaceholder} aria-hidden />;
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button type="button" className={styles.tab}>
          Đăng nhập
        </button>
      </SignInButton>
    );
  }

  return (
    <>
      <Link
        href="/my-schools"
        className={`${styles.tab} ${active ? styles.tabActive : ""}`.trim()}
        aria-current={active ? "page" : undefined}
      >
        My schools
      </Link>
      <UserButton />
    </>
  );
}
