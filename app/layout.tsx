import type { Metadata, Viewport } from 'next';
import './globals.css';
import { NAME } from '@/lib/config';
import { BRAND, SITE, seo } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: seo.title, template: `%s | ${BRAND}` },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: BRAND,
  authors: [{ name: NAME, url: SITE }],
  creator: NAME,
  publisher: BRAND,
  category: 'technology',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: SITE,
    siteName: BRAND,
    title: seo.ogTitle,
    description: seo.ogDescription,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'FaiN Studio: Digitalizujeme firmy pomocí AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.ogTitle,
    description: seo.ogDescription,
    images: ['/og.png'],
  },
  formatDetection: { telephone: false, address: false, email: false },
};

// přesná barva pozadí webu — lišta iOS pak na stránku navazuje bez šedého pruhu
const BG_DARK = '#222222';

export const viewport: Viewport = {
  themeColor: BG_DARK,
  colorScheme: 'dark',
  viewportFit: 'cover', // na ploše uložený web jde až pod stavový řádek
};

// Obnoví uložený motiv před prvním vykreslením → nic neprobliká.
const noFlash = `(function(){try{var d=document.documentElement;if(location.pathname==='/')d.classList.add('is-loading');var t=localStorage.getItem('theme')==='light'?'light':'dark';d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='light'?'#fcfaf6':'#222222';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/finger-paint-logo.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cal-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/figtree-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
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
