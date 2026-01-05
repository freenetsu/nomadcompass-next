import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  // TEMPORAIREMENT DÉSACTIVÉ pour résoudre le double callback OAuth
  // Réactiver après avoir testé l'authentification
  reactStrictMode: false,
  poweredByHeader: false,

  // Compression
  compress: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ["lucide-react", "@/components"],
  },
};

export default nextConfig;
