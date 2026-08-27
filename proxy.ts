import { clerkMiddleware } from "@clerk/nextjs/server";

// Next 16 renamed `middleware.ts` to `proxy.ts`; Clerk 7.8+ recognises both.
// No route is protected here — the whole site stays public and only the
// favourite actions check for a signed-in user.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next internals and static assets unless they appear in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
