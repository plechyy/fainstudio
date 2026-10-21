'use server';

import { requireAdmin } from '@/lib/admin-session';
import { saveFile } from '@/lib/admin-files';

import { LIKES_DIR, LIKES_FILE } from './likes';

/** Uloží celý seznam olajkovaných návrhů (čísla jako „017“). Soubor zůstává v soukromých Souborech. */
export async function saveLikes(list: string[]): Promise<{ ok: boolean }> {
  await requireAdmin();
  const clean = [...new Set(list.filter((n) => /^\d{3}$/.test(n)))].sort().slice(0, 200);
  try {
    await saveFile(LIKES_DIR, LIKES_FILE, Buffer.from(JSON.stringify(clean)));
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
