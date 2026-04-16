import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Vercel deployment
  reactStrictMode: true,
  
  // Image optimization for Vercel
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  
  // Power by header
  poweredByHeader: false,
  
  // Compress responses
  compress: true,
  
  // TypeScript configuration
  typescript: {
    // Allow production builds even with TypeScript errors
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
