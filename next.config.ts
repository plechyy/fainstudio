import type { NextConfig } from 'next';

// Stránky se předrenderují staticky. Server běží jen lokálně pro tlačítko „Uložit na web“
// v Color studiu (/api/brand/save); na produkci ta cesta vrací 404.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
