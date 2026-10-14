import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE = 'https://fainstudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'FainStudio — automatizace procesů, interní nástroje a AI video',
  description:
    'Postavíme vám systém, který dělá tu práci, co u vás dneska dělá někdo rukou. Do provozu do 10 dní, od 18 000 Kč. Matyáš Plecháč, Praha.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: SITE,
    title: 'FainStudio — automatizace procesů, interní nástroje a AI video',
    description:
      'Postavíme vám systém, který dělá tu práci, co u vás dneska dělá někdo rukou. Do provozu do 10 dní, od 18 000 Kč.',
    images: ['/media/hero-poster.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1917',
  colorScheme: 'dark',
};

// Obnoví uloženou barvu před prvním vykreslením → nic neprobliká.
const noFlash = `(function(){try{var d=document.documentElement;d.classList.add('is-loading');d.dataset.theme=localStorage.getItem('theme')==='light'?'light':'dark';var b=JSON.parse(localStorage.getItem('brand-v6')||'null');if(b&&typeof b.h==='number'){d.style.setProperty('--brand-h',b.h);d.style.setProperty('--brand-c',b.c);d.style.setProperty('--brand-l-adj',b.l||0);}if(b&&typeof b.s==='string'){d.style.setProperty('--sec',b.s);}var g=JSON.parse(localStorage.getItem('brand-bg-v1')||'null');if(g){for(var k in g){d.style.setProperty(k,g[k]);}}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/finger-paint-logo.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cal-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>
        <noscript>
          <style>{'.loader{display:none!important}html.is-loading{overflow:auto!important}'}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
