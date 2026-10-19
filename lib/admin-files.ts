/*
 * Soukromé soubory v administraci (audity, loga a cokoli dalšího). Jen na serveru.
 *
 * Soubory NIKDY nejsou ve veřejné složce ani v gitu (repozitář je veřejný). Číst je jde jen přes
 * /admin/files/..., které ověřuje přihlášení.
 *   • Na ostrém webu: Vercel Blob s přístupem „private“ (proměnná BLOB_READ_WRITE_TOKEN, kterou
 *     Vercel přidá, když ke projektu připojíte Blob store). Bez ní se nic neukládá.
 *   • Lokálně (npm run dev): složka .admin-files/ (je v .gitignore).
 */
import { del, get, list, put } from '@vercel/blob';
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { CATEGORIES } from './admin-files-meta';
export { CATEGORIES };
export type Cat = keyof typeof CATEGORIES;
export const isCat = (v: string): v is Cat => v in CATEGORIES;

export const MAX_BYTES = 4_400_000; // limit těla požadavku na Vercelu je ~4,5 MB
export const ALLOWED = ['pdf', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'ico', 'zip', 'md', 'txt', 'csv', 'json', 'docx', 'xlsx', 'pptx'];
// tyto typy se otevřou v prohlížeči, ostatní (hlavně SVG) se jen stáhnou, aby nemohl běžet žádný skript
const INLINE = new Set(['pdf', 'png', 'jpg', 'jpeg', 'webp', 'gif']);

const TYPES: Record<string, string> = {
  pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif',
  svg: 'image/svg+xml', ico: 'image/x-icon', zip: 'application/zip', md: 'text/markdown; charset=utf-8',
  txt: 'text/plain; charset=utf-8', csv: 'text/csv; charset=utf-8', json: 'application/json',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

export const ext = (name: string) => (name.split('.').pop() || '').toLowerCase();
export const contentType = (name: string) => TYPES[ext(name)] || 'application/octet-stream';
export const isInline = (name: string) => INLINE.has(ext(name));

/** Jen bezpečné znaky, žádná cesta (zabraňuje `../`). */
export function cleanName(raw: string) {
  const base = raw.split(/[\\/]/).pop() || '';
  const n = base.normalize('NFC').replace(/[^\p{L}\p{N}._ ()+-]/gu, '_').replace(/^\.+/, '').trim().slice(0, 120);
  return n;
}

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const localDir = () => join(process.cwd(), '.admin-files');
const key = (cat: Cat, name: string) => `admin/${cat}/${name}`;

export function storageStatus() {
  if (useBlob()) return { ok: true as const, where: 'Vercel Blob (soukromé)' };
  if (process.env.NODE_ENV !== 'production') return { ok: true as const, where: 'složka .admin-files na tomhle počítači' };
  return { ok: false as const, where: 'Úložiště není připojené. Ve Vercelu připojte Blob store (Storage → Create → Blob, private).' };
}

export type FileRow = { cat: Cat; name: string; size: number; at: number };

export async function listFiles(): Promise<FileRow[]> {
  const rows: FileRow[] = [];
  if (useBlob()) {
    let cursor: string | undefined;
    do {
      const r = await list({ prefix: 'admin/', cursor, limit: 500 });
      for (const b of r.blobs) {
        const [, cat, ...rest] = b.pathname.split('/');
        const name = rest.join('/');
        if (isCat(cat) && name) rows.push({ cat, name, size: b.size, at: new Date(b.uploadedAt).getTime() });
      }
      cursor = r.hasMore ? r.cursor : undefined;
    } while (cursor);
  } else if (process.env.NODE_ENV !== 'production') {
    for (const cat of Object.keys(CATEGORIES) as Cat[]) {
      let names: string[] = [];
      try {
        names = await readdir(join(localDir(), cat));
      } catch {}
      for (const name of names) {
        const st = await stat(join(localDir(), cat, name));
        if (st.isFile()) rows.push({ cat, name, size: st.size, at: st.mtimeMs });
      }
    }
  }
  return rows.sort((a, b) => b.at - a.at);
}

export async function saveFile(cat: Cat, name: string, data: Buffer) {
  if (useBlob()) {
    await put(key(cat, name), data, { access: 'private', allowOverwrite: true, contentType: contentType(name), addRandomSuffix: false });
    return;
  }
  if (process.env.NODE_ENV === 'production') throw new Error('storage_not_configured');
  await mkdir(join(localDir(), cat), { recursive: true });
  await writeFile(join(localDir(), cat, name), data);
}

export async function readStored(cat: Cat, name: string): Promise<{ body: ReadableStream<Uint8Array> | Buffer; size: number } | null> {
  if (useBlob()) {
    const r = await get(key(cat, name), { access: 'private' });
    if (!r || r.statusCode !== 200) return null;
    return { body: r.stream, size: r.blob.size };
  }
  if (process.env.NODE_ENV === 'production') return null;
  try {
    const buf = await readFile(join(localDir(), cat, name));
    return { body: buf, size: buf.length };
  } catch {
    return null;
  }
}

export async function removeFile(cat: Cat, name: string) {
  if (useBlob()) {
    await del(key(cat, name));
    return;
  }
  if (process.env.NODE_ENV === 'production') return;
  await rm(join(localDir(), cat, name), { force: true });
}
