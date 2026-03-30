"use client";

import { startTransition, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import styles from "./page.module.css";

function subscribe() {
  return () => {};
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={() => {
        startTransition(() => {
          setTheme(isLight ? "dark" : "light");
        });
      }}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
