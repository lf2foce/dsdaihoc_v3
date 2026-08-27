import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";

import { sql } from "./db";

/**
 * `favorites.user_id` is a foreign key into `users`, which was populated by the
 * retired chat app's Clerk sync. That sync no longer runs, and a different
 * Clerk instance may be in play, so mirror the signed-in user on demand rather
 * than assuming the row is already there.
 */
async function ensureUserRow() {
  const user = await currentUser();
  if (!user) return null;

  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress;

  // No email means nothing to satisfy the NOT NULL / UNIQUE constraint with.
  if (!email) return null;

  // The 487 pre-existing rows carry Clerk ids from the instance the retired
  // chat app used, so the same person signs in today under a different id.
  // ON CONFLICT (id) sails past that and lands on users_email_unique instead.
  // Re-key the row to the current id first; the foreign keys carry messages
  // and favourites across (ON UPDATE CASCADE).
  await sql`
    UPDATE users
       SET id         = ${user.id},
           first_name = ${user.firstName},
           last_name  = ${user.lastName},
           image_url  = ${user.imageUrl},
           updated_at = NOW()
     WHERE email = ${email} AND id <> ${user.id}
  `;

  await sql`
    INSERT INTO users (id, email, first_name, last_name, image_url)
    VALUES (${user.id}, ${email}, ${user.firstName}, ${user.lastName}, ${user.imageUrl})
    ON CONFLICT (id) DO UPDATE
      SET email      = EXCLUDED.email,
          first_name = EXCLUDED.first_name,
          last_name  = EXCLUDED.last_name,
          image_url  = EXCLUDED.image_url,
          updated_at = NOW()
  `;

  return user.id;
}

export async function getFavoriteSchoolIds(): Promise<Set<string>> {
  const { userId } = await auth();
  if (!userId) return new Set();

  const rows = (await sql`
    SELECT school_id FROM favorites WHERE user_id = ${userId}
  `) as { school_id: string }[];

  return new Set(rows.map((row) => row.school_id));
}

export async function getFavorites() {
  const { userId } = await auth();
  if (!userId) return [];

  return (await sql`
    SELECT school_id, school_slug, created_at
    FROM favorites
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `) as { school_id: string; school_slug: string; created_at: string }[];
}

export async function addFavorite(schoolId: string, schoolSlug: string) {
  const userId = await ensureUserRow();
  if (!userId) return false;

  await sql`
    INSERT INTO favorites (user_id, school_id, school_slug)
    VALUES (${userId}, ${schoolId}, ${schoolSlug})
    ON CONFLICT (user_id, school_id) DO UPDATE
      SET school_slug = EXCLUDED.school_slug
  `;

  return true;
}

export async function removeFavorite(schoolId: string) {
  const { userId } = await auth();
  if (!userId) return false;

  await sql`
    DELETE FROM favorites WHERE user_id = ${userId} AND school_id = ${schoolId}
  `;

  return true;
}
