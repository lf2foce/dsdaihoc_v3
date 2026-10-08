import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on Dokploy: see Dockerfile.
  output: "standalone",
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
