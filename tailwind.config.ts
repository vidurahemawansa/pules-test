import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const destinationUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://stg-catalyst-external-distributor-api.pulseid.com";

    return [
      {
        source: "/api/:path*",
        destination: `${destinationUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
