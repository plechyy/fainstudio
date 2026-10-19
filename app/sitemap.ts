import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

// datum poslední větší změny obsahu; při úpravě textů přepsat
const UPDATED = new Date('2026-10-19');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: UPDATED, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/ochrana-udaju`, lastModified: UPDATED, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
