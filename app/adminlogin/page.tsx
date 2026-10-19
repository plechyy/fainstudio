import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-session';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Přihlášení',
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLogin() {
  if (await isAdmin()) redirect('/admin');
  return (
    <main className="adm adm--login">
      <div className="adm__card">
        <p className="adm__brand" aria-hidden="true">
          <span>FaiN</span> Studio
        </p>
        <h1 className="adm__h1">Administrace</h1>
        <LoginForm />
      </div>
    </main>
  );
}
