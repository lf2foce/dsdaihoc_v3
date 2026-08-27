"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "@clerk/nextjs";

import { listMyFavoriteIds, toggleFavorite } from "./favorite-actions";

type FavoritesValue = {
  /** null while unknown — signed out, or the first fetch has not returned. */
  ids: Set<string> | null;
  isSignedIn: boolean;
  authLoaded: boolean;
  toggle: (schoolId: string, schoolSlug: string) => Promise<boolean>;
};

const FavoritesContext = createContext<FavoritesValue | null>(null);

/**
 * One fetch per page, shared by every star on it. The school table renders 176
 * rows; asking the server per row would be 176 round trips on load.
 */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const [ids, setIds] = useState<Set<string> | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    let active = true;
    listMyFavoriteIds()
      .then((list) => active && setIds(new Set(list)))
      .catch(() => active && setIds(new Set()));

    return () => {
      active = false;
    };
  }, [isLoaded, isSignedIn]);

  const toggle = useCallback(
    async (schoolId: string, schoolSlug: string) => {
      const next = !ids?.has(schoolId);

      // Optimistic: the star flips now, and reverts if the write is rejected.
      setIds((current) => {
        const updated = new Set(current ?? []);
        if (next) updated.add(schoolId);
        else updated.delete(schoolId);
        return updated;
      });

      const result = await toggleFavorite(schoolId, schoolSlug, next);

      setIds((current) => {
        const updated = new Set(current ?? []);
        if (result.favorited) updated.add(schoolId);
        else updated.delete(schoolId);
        return updated;
      });

      return !result.failed;
    },
    [ids],
  );

  const value = useMemo<FavoritesValue>(
    () => ({ ids, isSignedIn: Boolean(isSignedIn), authLoaded: isLoaded, toggle }),
    [ids, isSignedIn, isLoaded, toggle],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error("useFavorites phải nằm trong FavoritesProvider");
  return value;
}
