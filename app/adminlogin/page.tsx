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
      <section className="adm__hero" aria-hidden="true">
        <p className="adm__logo">
          <span className="adm__word">
            FaiN<span>Studio</span>
          </span>
        </p>
        <div>
          <h2>Všechno na jednom místě.</h2>
          <p>Úkoly, soubory a analytika webu. Jen pro vás.</p>
        </div>
      </section>
      <div className="adm__panel">
        <div className="adm__card">
          <p className="adm__logo" aria-hidden="true">
            <span className="adm__word">
              FaiN<span>Studio</span>
            </span>
          </p>
          <h1 className="adm__h1">Vítejte zpět</h1>
          <p className="adm__lead">Přihlaste se do administrace.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
