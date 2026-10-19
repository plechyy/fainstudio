/*
 * Uloží soubor do soukromého úložiště administrace (Soubory).
 *
 *   node scripts/admin-upload.mjs audity reports/audit.pdf
 *   node scripts/admin-upload.mjs loga brand/*.png
 *   node scripts/admin-upload.mjs --sync        pošle celou složku .admin-files/ do Vercel Blob
 *
 * Kategorie: audity | loga | ostatni. S proměnnou BLOB_READ_WRITE_TOKEN (z prostředí nebo .env.local)
 * jde soubor do Vercel Blob (private), jinak jen do lokální složky .admin-files/ (je v .gitignore).
 * Soubory nikdy nepatří do gitu ani do public/ (repozitář je veřejný).
 */
import { put } from '@vercel/blob';
import { copyFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';

const CATS = ['audity', 'loga', 'ostatni'];
const TYPES = { pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml', ico: 'image/x-icon', zip: 'application/zip', md: 'text/markdown; charset=utf-8', txt: 'text/plain; charset=utf-8', csv: 'text/csv; charset=utf-8', json: 'application/json' };
const root = join(import.meta.dirname, '..');
const local = join(root, '.admin-files');

async function loadToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  try {
    const m = (await readFile(join(root, '.env.local'), 'utf8')).match(/^BLOB_READ_WRITE_TOKEN=(.+)$/m);
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
  } catch {
    return '';
  }
}

const clean = (raw) => basename(raw).normalize('NFC').replace(/[^\p{L}\p{N}._ ()+-]/gu, '_').replace(/^\.+/, '').trim().slice(0, 120);

const token = await loadToken();
const args = process.argv.slice(2);

async function store(cat, path) {
  const name = clean(path);
  if (token) {
    const data = await readFile(path);
    const ext = name.split('.').pop().toLowerCase();
    await put(`admin/${cat}/${name}`, data, { access: 'private', allowOverwrite: true, addRandomSuffix: false, contentType: TYPES[ext] || 'application/octet-stream', token });
    console.log(`Blob   ${cat}/${name}`);
  } else {
    await mkdir(join(local, cat), { recursive: true });
    await copyFile(path, join(local, cat, name));
    console.log(`lokálně ${cat}/${name}`);
  }
}

if (args[0] === '--sync') {
  if (!token) {
    console.error('Chybí BLOB_READ_WRITE_TOKEN (Vercel → Storage → Blob → .env.local). Nic neposláno.');
    process.exit(1);
  }
  for (const cat of CATS) {
    let names = [];
    try {
      names = await readdir(join(local, cat));
    } catch {}
    for (const n of names) await store(cat, join(local, cat, n));
  }
} else if (CATS.includes(args[0]) && args.length > 1) {
  for (const f of args.slice(1)) await store(args[0], f);
} else {
  console.error('Použití: node scripts/admin-upload.mjs <audity|loga|ostatni> <soubor...>  |  --sync');
  process.exit(1);
}
