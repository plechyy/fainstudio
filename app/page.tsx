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
import { homeJsonLd, ld } from '@/lib/seo';

export default function Home() {
  return (
    <>
      {/* strukturovaná data: firma, služby, autor, FAQ (pro Google, Seznam i AI asistenty) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(homeJsonLd()) }} />
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
        <About />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <Enhance />
      <ButtonSmoke />
    </>
  );
}
