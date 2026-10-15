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
import ColorStudio from '@/components/ColorStudio';
import ButtonVariants from '@/components/ButtonVariants';
import ButtonSmoke from '@/components/ButtonSmoke';

export default function Home() {
  return (
    <>
      <Loader />
      <span id="top" />
      <Nav />
      <main id="obsah">
        <Hero />
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
      <ColorStudio />
      <ButtonVariants />
      <Enhance />
      <ButtonSmoke />
    </>
  );
}
