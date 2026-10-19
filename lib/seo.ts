/*
 * SEO a podklady pro AI vyhledávače (ChatGPT, Claude, Perplexity, Gemini, Copilot).
 * Jedno místo pro titulky, popisy a strukturovaná data (JSON-LD), ať se nerozjedou.
 *
 * Klíčová slova, na která web míří (pořadí = priorita):
 *   AI automatizace · AI agentura · automatizace firemních procesů · umělá inteligence pro firmy
 *   AI asistent pro firmu · automatizace administrativy · zpracování faktur a dokumentů pomocí AI
 *   automatizace e-mailů a poptávek · CRM a interní nástroje na míru · AI agentura
 * Pravidlo: slova musí stát i ve viditelném textu, ne jen v metadatech.
 */
import { about, faq, systems } from './content';
import { EMAIL, ICO, NAME } from './config';

export const SITE = 'https://fainstudio.com';
export const BRAND = 'FaiN Studio';

export const seo = {
  title: 'AI automatizace pro firmy | AI agentura FaiN Studio',
  description:
    'AI agentura. Automatizujeme firemní procesy pomocí umělé inteligence: e-maily, faktury, poptávky, dokumenty, CRM i AI asistenty na míru.',
  ogTitle: 'AI automatizace, která maká za vás | FaiN Studio',
  ogDescription:
    'Postavíme systém s umělou inteligencí, který převezme opakovanou práci ve vaší firmě. E-maily, faktury, poptávky, dokumenty i interní nástroje. Data zůstávají vaše.',
  keywords: [
    'AI automatizace',
    'AI agentura',
    'automatizace firemních procesů',
    'automatizace procesů',
    'umělá inteligence pro firmy',
    'AI pro firmy',
    'AI asistent pro firmu',
    'automatizace administrativy',
    'zpracování faktur AI',
    'zpracování dokumentů',
    'automatizace e-mailů',
    'zpracování poptávek',
    'CRM na míru',
    'interní nástroje na míru',
    'digitalizace firmy',
  ],
};

/** Témata, kterým rozumíme (schema.org knowsAbout): pro vyhledávače i AI asistenty. */
const KNOWS = [
  'AI automatizace',
  'Automatizace firemních procesů',
  'Umělá inteligence pro firmy',
  'AI asistenti a chatboti nad firemními daty',
  'Zpracování faktur a dokumentů pomocí AI',
  'Automatizace e-mailů a poptávek',
  'CRM a interní nástroje na míru',
  'Sběr a monitoring dat z webu',
  'Webové aplikace a rezervační systémy',
  'Integrace nástrojů a API',
];

const ORG_ID = `${SITE}/#organizace`;
const PERSON_ID = `${SITE}/#matyas-plechac`;

/** Strukturovaná data pro hlavní stránku (jeden @graph, provázaný přes @id). */
export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORG_ID,
        name: BRAND,
        alternateName: ['FainStudio', 'FaiN'],
        description:
          'AI agentura. Navrhujeme a stavíme systémy s umělou inteligencí, které ve firmách převezmou opakovanou práci: zpracování e-mailů, poptávek, faktur a dokumentů, CRM a interní nástroje, AI asistenty nad firemními daty a hlídání trhu.',
        slogan: 'Umělá inteligence, která maká za vás.',
        url: SITE,
        logo: `${SITE}/icon.png`,
        image: `${SITE}/icon.png`,
        email: EMAIL,
        founder: { '@id': PERSON_ID },
        identifier: { '@type': 'PropertyValue', propertyID: 'IČO', value: ICO },
        areaServed: { '@type': 'Country', name: 'Česko' },
        availableLanguage: ['cs', 'en'],
        knowsAbout: KNOWS,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Poptávky a obchod',
          email: EMAIL,
          availableLanguage: ['cs', 'en'],
          url: `${SITE}/#rezervace`,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI automatizace a systémy na míru',
          itemListElement: systems.items.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.name,
              description: s.text,
              serviceType: 'AI automatizace',
              provider: { '@id': ORG_ID },
              areaServed: { '@type': 'Country', name: 'Česko' },
            },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: NAME,
        jobTitle: 'Zakladatel, AI automatizace',
        worksFor: { '@id': ORG_ID },
        email: EMAIL,
        knowsAbout: KNOWS,
        description: about.text,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#web`,
        url: SITE,
        name: BRAND,
        inLanguage: 'cs-CZ',
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE}/#stranka`,
        url: SITE,
        name: seo.title,
        description: seo.description,
        inLanguage: 'cs-CZ',
        isPartOf: { '@id': `${SITE}/#web` },
        about: { '@id': ORG_ID },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE}/#faq`,
        inLanguage: 'cs-CZ',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

/** JSON pro <script type="application/ld+json">: `<` se escapuje kvůli XSS (doporučení Next.js). */
export const ld = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
