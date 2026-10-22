import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-session';
import LoginForm from './LoginForm';
import '../admin/admin.css';

export const metadata: Metadata = {
  title: 'Přihlášení',
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLogin() {
  if (await isAdmin()) redirect('/admin');
  return (
    <main className="adm adm--login">
      <div className="adm__panel">
        <div className="adm__card">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
