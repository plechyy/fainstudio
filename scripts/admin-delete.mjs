/*
 * Smaže složku (včetně všeho uvnitř) z privátního úložiště administrace.
 *   node scripts/admin-delete.mjs loga/navrhy-100
 * Bez BLOB_READ_WRITE_TOKEN maže jen lokální .admin-files/.
 */
import { del, list } from '@vercel/blob';
import { readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const dir = (process.argv[2] || '').replace(/^\/+|\/+$/g, '');
if (!dir || dir.includes('..')) {
  console.error('Zadejte složku, např. loga/navrhy-100');
  process.exit(1);
}
let token = process.env.BLOB_READ_WRITE_TOKEN || '';
if (!token) {
  try {
    const m = (await readFile(join(root, '.env.local'), 'utf8')).match(/^BLOB_READ_WRITE_TOKEN=(.+)$/m);
    token = m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
  } catch {}
}
if (token) {
  let cursor;
  let n = 0;
  do {
    const r = await list({ prefix: `admin/${dir}/`, cursor, limit: 500, token });
    if (r.blobs.length) await del(r.blobs.map((b) => b.url), { token });
    n += r.blobs.length;
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  console.log(`Smazáno ${n} souborů z Blobu: ${dir}`);
} else {
  await rm(join(root, '.admin-files', dir), { recursive: true, force: true });
  console.log(`Smazáno lokálně: ${dir}`);
}
