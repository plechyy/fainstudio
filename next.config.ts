import type { NextConfig } from 'next';

// Stránky se předrenderují staticky; jen API cesta formuláře (/api/kontakt) běží na serveru.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
