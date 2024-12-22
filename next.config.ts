import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://stg-catalyst-external-distributor-api.pulseid.com/:path*",
      },
    ];
  },
};

export default nextConfig;
