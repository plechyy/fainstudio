import type { NextConfig } from 'next';

// Stránky se předrenderují staticky; jen API cesta formuláře (/api/kontakt) běží na serveru.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
  // nahrávání souborů v administraci: Vercel pustí tělo požadavku nejvýš ~4,5 MB
  experimental: { serverActions: { bodySizeLimit: '4500kb' } },
};

export default nextConfig;
