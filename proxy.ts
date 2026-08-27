import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Next 16 renamed `middleware.ts` to `proxy.ts`; Clerk 7.8+ recognises both.
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

/**
 * The site stays public; only /admin demands a session here. Being signed in is
 * not enough to *be* an admin — the email allowlist is checked again inside the
 * admin layout, because this proxy guards navigation but not server actions.
 */
export default clerkMiddleware(async (auth, request) => {
  if (isAdminRoute(request)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next internals and static assets unless they appear in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
