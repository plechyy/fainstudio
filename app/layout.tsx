import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE = 'https://fainstudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'FainStudio — automatizace procesů, interní nástroje a sběr dat',
  description:
    'Postavíme systém, který převezme práci, co dnes děláte rukama. Malé studio z Prahy.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: SITE,
    title: 'FainStudio — automatizace procesů, interní nástroje a sběr dat',
    description:
      'Postavíme systém, který převezme práci, co dnes děláte rukama. Malé studio z Prahy.',
    images: ['/media/hero-poster.jpg'],
  },
};

// přesná barva pozadí webu — lišta iOS pak na stránku navazuje bez šedého pruhu
const BG_DARK = '#141217';

export const viewport: Viewport = {
  themeColor: BG_DARK,
  colorScheme: 'dark',
  viewportFit: 'cover', // na ploše uložený web jde až pod stavový řádek
};

// Obnoví uložený motiv před prvním vykreslením → nic neprobliká.
const noFlash = `(function(){try{var d=document.documentElement;d.classList.add('is-loading');var t=localStorage.getItem('theme')==='light'?'light':'dark';d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='light'?'#fcfaf6':'#141217';var g=JSON.parse(localStorage.getItem('brand-vars-v3')||'null');if(g){for(var k in g){d.style.setProperty(k,g[k]);}}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/finger-paint-logo.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cal-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
