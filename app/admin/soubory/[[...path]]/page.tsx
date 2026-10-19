import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cleanDir } from '@/lib/admin-files';
import AdminFiles from '../../AdminFiles';

export const metadata: Metadata = { title: 'Soubory' };

export default async function Page({ params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  const dir = cleanDir(path.map((s) => decodeURIComponent(s)).join('/'));
  if (dir === null) notFound();
  return <AdminFiles dir={dir} />;
}
