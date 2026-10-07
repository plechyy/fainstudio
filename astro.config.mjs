// @ts-check
import { defineConfig } from 'astro/config';

// Statický výstup. Až bude potřeba serverová část (odesílání formuláře,
// API), přidá se @astrojs/vercel a jednotlivé routy dostanou
// `export const prerender = false` — zbytek webu zůstane statický.
export default defineConfig({
  site: 'https://fainstudio.com',
  server: { port: 4321, host: true },
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
