'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-session';
import { ALLOWED, MAX_BYTES, cleanName, ext, isCat, removeFile, saveFile } from '@/lib/admin-files';

export type UploadState = { ok?: string; error?: string };

export async function uploadFile(_p: UploadState, form: FormData): Promise<UploadState> {
  await requireAdmin();
  const cat = String(form.get('cat') || '');
  const file = form.get('file');
  if (!isCat(cat)) return { error: 'Vyberte složku.' };
  if (!(file instanceof File) || file.size === 0) return { error: 'Vyberte soubor.' };
  if (file.size > MAX_BYTES) return { error: 'Soubor je větší než 4,4 MB. Větší nahrajte skriptem scripts/admin-upload.mjs.' };
  const name = cleanName(file.name);
  if (!name || !ALLOWED.includes(ext(name))) return { error: `Tenhle typ souboru nejde nahrát. Povolené: ${ALLOWED.join(', ')}.` };
  try {
    await saveFile(cat, name, Buffer.from(await file.arrayBuffer()));
  } catch (e) {
    return { error: e instanceof Error && e.message === 'storage_not_configured' ? 'Úložiště není připojené (Vercel Blob).' : 'Nahrání se nepovedlo.' };
  }
  revalidatePath('/admin');
  return { ok: `Nahráno: ${name}` };
}

export async function deleteFile(form: FormData) {
  await requireAdmin();
  const cat = String(form.get('cat') || '');
  const name = cleanName(String(form.get('name') || ''));
  if (!isCat(cat) || !name) return;
  await removeFile(cat, name);
  revalidatePath('/admin');
}
