import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

/*
 * Vyhledávače i AI vyhledávače (ChatGPT, Claude, Perplexity, Gemini, Copilot, Apple) smí číst celý web.
 * Výslovně je jmenujeme, aby je nezablokovalo žádné budoucí obecné pravidlo. Jen API formuláře je mimo.
 */
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'SeznamBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: AI_BOTS, allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
