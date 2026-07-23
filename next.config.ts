import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep the app self-contained: no remote image hosts, no external logo CDNs.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
