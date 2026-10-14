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
const noFlash = `(function(){try{var d=document.documentElement;d.classList.add('is-loading');d.dataset.theme=localStorage.getItem('theme')==='light'?'light':'dark';}catch(e){}})();`;

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
