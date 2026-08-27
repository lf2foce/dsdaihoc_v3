import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Next 16 renamed `middleware.ts` to `proxy.ts`; Clerk 7.8+ recognises both.
 *
 * No route matching here. Clerk deprecated createRouteMatcher because a path
 * pattern can diverge from how Next actually routes a request, leaving a
 * protected resource reachable. The check lives on the resource instead —
 * app/admin/layout.tsx — which is also the only place that can guard server
 * actions.
 */
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
