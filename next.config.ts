import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["100.108.232.57", "192.168.1.35"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
