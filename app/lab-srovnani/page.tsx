import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CompareLab from './CompareLab';
import './lab.css';

export const metadata: Metadata = {
  title: 'Lab: srovnání',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
};

/* Dočasná stránka: tři varianty sekce 6 (Proč FaiN?). Po výběru se smaže. */
export default function LabSrovnani() {
  return (
    <>
      <span id="top" />
      <Nav />
      <main id="obsah">
        <section className="section" id="srovnani" aria-labelledby="srovnani-title">
          <div className="wrap">
            <header className="hd">
              <p className="label shead__index" aria-hidden="true">
                <b>06</b>
                Proč FaiN?
              </p>
              <h2 className="h2 hd__title" id="srovnani-title">
                <span className="silver silver--block">Jiné cesty to taky umí.</span>
                <span className="hd__accent">Jen jinak.</span>
              </h2>
            </header>
            <CompareLab />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
