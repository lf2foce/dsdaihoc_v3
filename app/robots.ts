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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...answerEngineAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
