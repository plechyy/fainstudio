'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin-session';
import { ALLOWED, MAX_BYTES, cleanDir, cleanName, ext, removeFile, saveFile } from '@/lib/admin-files';

export type UploadState = { ok?: string; error?: string };

export async function uploadFile(_p: UploadState, form: FormData): Promise<UploadState> {
  await requireAdmin();
  const dir = cleanDir(String(form.get('dir') || ''));
  const file = form.get('file');
  if (dir === null) return { error: 'Neplatná složka.' };
  if (!(file instanceof File) || file.size === 0) return { error: 'Vyberte soubor.' };
  if (file.size > MAX_BYTES) return { error: 'Soubor je větší než 4,4 MB. Větší nahrajte skriptem scripts/admin-upload.mjs.' };
  const name = cleanName(file.name);
  if (!name || !ALLOWED.includes(ext(name))) return { error: `Tenhle typ souboru nejde nahrát. Povolené: ${ALLOWED.join(', ')}.` };
  try {
    await saveFile(dir, name, Buffer.from(await file.arrayBuffer()));
  } catch (e) {
    return { error: e instanceof Error && e.message === 'storage_not_configured' ? 'Úložiště není připojené (Vercel Blob).' : 'Nahrání se nepovedlo.' };
  }
  revalidatePath('/admin/soubory', 'layout');
  return { ok: `Nahráno: ${name}` };
}

export async function deleteFile(form: FormData) {
  await requireAdmin();
  const dir = cleanDir(String(form.get('dir') || ''));
  const name = cleanName(String(form.get('name') || ''));
  if (dir === null || !name) return;
  await removeFile(dir, name);
  revalidatePath('/admin/soubory', 'layout');
}

/** Složka vznikne tím, že se do ní něco nahraje; tady se jen otevře prázdná. */
export async function createFolder(form: FormData) {
  await requireAdmin();
  const parent = cleanDir(String(form.get('dir') || ''));
  const name = cleanName(String(form.get('name') || '')).replace(/^\./, '');
  if (parent === null || !name) return;
  const dir = cleanDir(parent ? `${parent}/${name}` : name);
  if (dir === null) return;
  redirect(`/admin/soubory/${dir.split('/').map(encodeURIComponent).join('/')}`);
}
