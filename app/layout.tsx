import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Good AI List",
  description: "AI open source projects and developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full subpixel-antialiased font-sans"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="data-ui-theme"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="goodailist-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
