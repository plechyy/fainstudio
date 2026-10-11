import type { NextConfig } from 'next';

// Statický export: build vyprodukuje čisté HTML/CSS/JS do out/ — žádný server.
// Nasazení na Vercel (nebo kamkoli). Hlavičky řeší vercel.json.
// Až bude potřeba serverová část (odeslání formuláře), smaž `output: 'export'`
// a přidej @vercel/next adaptér — zbytek webu zůstane statický.
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
