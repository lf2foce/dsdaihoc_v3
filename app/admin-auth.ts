import "server-only";

import { currentUser } from "@clerk/nextjs/server";

/**
 * Admins are listed by email rather than by a Clerk role on purpose: a role set
 * on the test instance does not carry over to the live one, and this project is
 * about to switch between them. An email allowlist survives that move.
 */
function adminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function getAdminEmail(): Promise<string | null> {
  const allowed = adminEmails();
  if (!allowed.size) return null;

  const user = await currentUser();
  if (!user) return null;

  const email = (
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    ""
  ).toLowerCase();

  return email && allowed.has(email) ? email : null;
}

export async function isAdmin() {
  return (await getAdminEmail()) !== null;
}
