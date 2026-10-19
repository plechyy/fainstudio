import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Systems from '@/components/Systems';
import WhyAi from '@/components/WhyAi';
import Process from '@/components/Process';
import BeforeAfter from '@/components/BeforeAfter';
import Compare from '@/components/Compare';
import Proof from '@/components/Proof';
import Faq from '@/components/Faq';
import About from '@/components/About';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Enhance from '@/components/Enhance';
import ButtonSmoke from '@/components/ButtonSmoke';

// Sekce „O nás“ (09) je zatím skrytá, komponenta zůstává. Vrátí se přepnutím na true.
const SHOW_ABOUT = false;

export default function Home() {
  return (
    <>
      <Loader />
      <span id="top" />
      <Nav />
      <main id="obsah">
        <Hero />
        <Systems />
        <WhyAi />
        <Process />
        <BeforeAfter />
        <Compare />
        <Proof />
        <Faq />
        {SHOW_ABOUT && <About />}
        <Cta />
      </main>
      <Footer />
      <Enhance />
      <ButtonSmoke />
    </>
  );
}
