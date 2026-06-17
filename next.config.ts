import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["100.108.232.57"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
