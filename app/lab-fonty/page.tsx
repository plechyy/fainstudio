import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Systems from '@/components/Systems';
import WhyAi from '@/components/WhyAi';
import Process from '@/components/Process';
import Cases from '@/components/Cases';
import Compare from '@/components/Compare';
import Proof from '@/components/Proof';
import Faq from '@/components/Faq';
import About from '@/components/About';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Enhance from '@/components/Enhance';
import ButtonSmoke from '@/components/ButtonSmoke';
import FontLab from './FontLab';
import './lab.css';

export const metadata: Metadata = {
  title: 'Lab: písma',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
};

/* Dočasná stránka: celý web s přepínačem písma nadpisů. Po výběru se smaže. */
export default function LabFonty() {
  return (
    <>
      <span id="top" />
      <Nav />
      <main id="obsah">
        <Hero />
        <Systems />
        <WhyAi />
        <Process />
        <Cases />
        <Compare />
        <Proof />
        <About />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <Enhance />
      <ButtonSmoke />
      <FontLab />
    </>
  );
}
