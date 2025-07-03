import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'ew.com', 'jhwosgvbnbwkkfqohazf.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
