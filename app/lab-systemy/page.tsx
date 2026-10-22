import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SysHead from '@/components/systems/SysHead';
import SystemyLab from './SystemyLab';
import './lab.css';

export const metadata: Metadata = {
  title: 'Lab: systémy',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
};

/* Dočasná stránka: tři varianty seznamu v sekci 2. Po výběru se smaže. */
export default function LabSystemy() {
  return (
    <>
      <span id="top" />
      <Nav />
      <main id="obsah">
        <section className="section section--tight" id="systemy" aria-labelledby="systemy-title">
          <div className="wrap" style={{ paddingTop: 96 }}>
            <SysHead />
            <SystemyLab />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
