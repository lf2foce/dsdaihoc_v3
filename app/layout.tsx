import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';

import {
  absoluteUrl,
  defaultOgImages,
  siteDescription,
  siteName,
  siteUrl,
} from "./site-config";

const defaultTitle = "Danh sách đại học | Tìm Trường Đại Học Phù Hợp";

export const metadata: Metadata = {
  // No `template`: child pages already carry their own suffix, so a template
  // here would double it.
  title: defaultTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: defaultOgImages,
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
    images: defaultOgImages,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

/**
 * Site-level entity. Every page's JSON-LD points back at these @ids so an
 * assistant resolves one consistent publisher instead of many look-alikes.
 */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/opengraph-image"),
      },
      areaServed: { "@type": "Country", name: "Việt Nam" },
      knowsLanguage: "vi-VN",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      inLanguage: "vi-VN",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className="h-full subpixel-antialiased font-sans"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider
          attribute="data-ui-theme"
          defaultTheme="light"
          enableSystem={false}
          storageKey="goodailist-theme"
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
