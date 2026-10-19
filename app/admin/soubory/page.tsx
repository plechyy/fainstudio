import type { Metadata } from 'next';
import AdminFiles from '../AdminFiles';

export const metadata: Metadata = { title: 'Soubory' };

export default function Page() {
  return <AdminFiles />;
}
