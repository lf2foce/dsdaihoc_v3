import type { Metadata } from "next";
import GenvClient from "./genv-client";
import { defaultOgImages } from "../site-config";

const genvDescription =
  "Genv cung cấp giải pháp AI, dữ liệu và sản phẩm số giúp doanh nghiệp tăng trưởng bền vững bằng công nghệ hiện đại.";

export const metadata: Metadata = {
  title: "Genv | Giải pháp số hiện đại cho doanh nghiệp",
  description: genvDescription,
  alternates: { canonical: "/genv" },
  openGraph: {
    images: defaultOgImages,
    title: "Genv | Giải pháp số hiện đại cho doanh nghiệp",
    description: genvDescription,
    url: "/genv",
    type: "website",
  },
  twitter: {
      images: defaultOgImages,
    card: "summary_large_image",
    title: "Genv | Giải pháp số hiện đại cho doanh nghiệp",
    description: genvDescription,
  },
};

export default function GenvPage() {
  return <GenvClient />;
}
