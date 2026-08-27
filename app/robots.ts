import type { MetadataRoute } from "next";

import { siteUrl } from "./site-config";

/**
 * Answer engines are listed explicitly rather than relying on the wildcard, so
 * the intent is unambiguous to operators and to the crawlers themselves.
 * Training crawlers (GPTBot, ClaudeBot, Google-Extended) are allowed too —
 * flip any of them to `disallow` if you later want indexing without training.
 */
const answerEngineAgents = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
  "YouBot",
];

/** Signed-in and admin surfaces. /admin already 401s, this just keeps it out
 *  of crawl logs entirely. */
const PRIVATE_PATHS = ["/api/", "/admin", "/my-schools"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      ...answerEngineAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
