import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "betzpools.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "www.betzpools.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
