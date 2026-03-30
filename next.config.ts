import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dai-hoc/:legacyId",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
