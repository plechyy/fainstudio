import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Systems from '@/components/Systems';
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

/** Celá stránka. /hero2 je stejná, jen hero má místo kouře 3D stroj. */
export default function HomePage({ heroBg = 'smoke' }: { heroBg?: 'smoke' | 'machine' }) {
  return (
    <>
      <Loader />
      <span id="top" />
      <Nav />
      <main id="obsah">
        <Hero bg={heroBg} />
        <Systems />
        <Process />
        <BeforeAfter />
        <Compare />
        <Proof />
        <Faq />
        <About />
        <Cta />
      </main>
      <Footer />
      <Enhance />
      <ButtonSmoke />
    </>
  );
}
