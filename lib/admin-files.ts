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
  return base.normalize('NFC').replace(/[^\p{L}\p{N}._ ()+-]/gu, '_').replace(/^\.+/, '').trim().slice(0, 120);
}

export const MAX_DEPTH = 4;

/** Složka jako `loga/favicony` (bez lomítek na krajích). Vrátí null, když v ní je cokoli nebezpečného. */
export function cleanDir(raw: string): string | null {
  const segs = raw.split('/').filter(Boolean);
  if (segs.length > MAX_DEPTH) return null;
  for (const s of segs) if (cleanName(s) !== s || s.startsWith('.')) return null;
  return segs.join('/');
}

const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
// token se předává výslovně, jinak by knihovna při zapnutém OIDC zkoušela jiné přihlášení
const auth = () => ({ token: process.env.BLOB_READ_WRITE_TOKEN });
const localDir = () => join(process.cwd(), '.admin-files');
const key = (dir: string, name: string) => `admin/${dir ? `${dir}/` : ''}${name}`;

export function storageStatus() {
  if (useBlob()) return { ok: true as const, where: 'Vercel Blob (soukromé)' };
  if (process.env.NODE_ENV !== 'production') return { ok: true as const, where: 'složka .admin-files na tomhle počítači' };
  return { ok: false as const, where: 'Úložiště není připojené. Ve Vercelu připojte Blob store (Storage → Create → Blob, private).' };
}

export type FileRow = { dir: string; name: string; size: number; at: number };

async function walk(base: string, rel: string, out: FileRow[]) {
  let entries: string[] = [];
  try {
    entries = await readdir(join(base, rel));
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.startsWith('.')) continue;
    const st = await stat(join(base, rel, e));
    if (st.isDirectory()) await walk(base, rel ? `${rel}/${e}` : e, out);
    else if (st.isFile()) out.push({ dir: rel, name: e, size: st.size, at: st.mtimeMs });
  }
}

export async function listFiles(): Promise<FileRow[]> {
  const rows: FileRow[] = [];
  if (useBlob()) {
    let cursor: string | undefined;
    do {
      const r = await list({ prefix: 'admin/', cursor, limit: 500, ...auth() });
      for (const b of r.blobs) {
        const parts = b.pathname.split('/').slice(1);
        const name = parts.pop() || '';
        if (name) rows.push({ dir: parts.join('/'), name, size: b.size, at: new Date(b.uploadedAt).getTime() });
      }
      cursor = r.hasMore ? r.cursor : undefined;
    } while (cursor);
  } else if (process.env.NODE_ENV !== 'production') {
    await walk(localDir(), '', rows);
  }
  return rows;
}

export async function saveFile(dir: string, name: string, data: Buffer) {
  if (useBlob()) {
    await put(key(dir, name), data, { access: 'private', allowOverwrite: true, contentType: contentType(name), addRandomSuffix: false, ...auth() });
    return;
  }
  if (process.env.NODE_ENV === 'production') throw new Error('storage_not_configured');
  await mkdir(join(localDir(), dir), { recursive: true });
  await writeFile(join(localDir(), dir, name), data);
}

export async function readStored(dir: string, name: string): Promise<{ body: ReadableStream<Uint8Array> | Buffer; size: number } | null> {
  if (useBlob()) {
    const r = await get(key(dir, name), { access: 'private', ...auth() });
    if (!r || r.statusCode !== 200) return null;
    return { body: r.stream, size: r.blob.size };
  }
  if (process.env.NODE_ENV === 'production') return null;
  try {
    const buf = await readFile(join(localDir(), dir, name));
    return { body: buf, size: buf.length };
  } catch {
    return null;
  }
}

export async function removeFile(dir: string, name: string) {
  if (useBlob()) {
    await del(key(dir, name), auth());
    return;
  }
  if (process.env.NODE_ENV === 'production') return;
  await rm(join(localDir(), dir, name), { force: true });
}
