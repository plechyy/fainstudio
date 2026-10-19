import type { cases } from '@/lib/content';

/** vizuál jednoho případu podle typu (feed, score, photo…) */
export type CaseVisual<T extends string> = Extract<(typeof cases.items)[number]['visual'], { type: T }>;
