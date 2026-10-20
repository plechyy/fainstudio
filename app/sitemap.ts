import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
import { cases } from '@/lib/content';

// datum poslední větší změny obsahu; při úpravě textů přepsat
const UPDATED = new Date('2026-10-19');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: UPDATED, changeFrequency: 'monthly', priority: 1 },
    ...cases.items.map((c) => ({ url: `${SITE}/pripady/${c.id}`, lastModified: UPDATED, changeFrequency: 'yearly' as const, priority: 0.5 })),
    { url: `${SITE}/ochrana-udaju`, lastModified: UPDATED, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
