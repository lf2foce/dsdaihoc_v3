import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://dsdaihoc.com";

export const metadata: Metadata = {
  title: "Danh sách đại học | Tìm Trường Đại Học Phù Hợp",
  description:
    "Tìm kiếm và so sánh các trường đại học tại Việt Nam để chọn nơi học phù hợp nhất với bạn.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Danh sách đại học | Tìm Trường Đại Học Phù Hợp",
    description:
      "Tìm kiếm và so sánh các trường đại học tại Việt Nam để chọn nơi học phù hợp nhất với bạn.",
    url: baseUrl,
    siteName: "Danh sách đại học",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danh sách đại học | Tìm Trường Đại Học Phù Hợp",
    description:
      "Tìm kiếm và so sánh các trường đại học tại Việt Nam để chọn nơi học phù hợp nhất với bạn.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
