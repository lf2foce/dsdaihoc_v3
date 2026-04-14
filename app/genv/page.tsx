import type { Metadata } from "next";
import GenvClient from "./genv-client";

export const metadata: Metadata = {
  title: "Genv | Giải pháp số hiện đại cho doanh nghiệp",
  description:
    "Genv cung cấp giải pháp AI, dữ liệu và sản phẩm số giúp doanh nghiệp tăng trưởng bền vững bằng công nghệ hiện đại.",
};

export default function GenvPage() {
  return <GenvClient />;
}
