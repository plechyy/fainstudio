import type { NextConfig } from 'next';

// Stránky se předrenderují staticky; server je potřeba jen pro editor textů (/api/edit/*).
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
