/* ============================================================
   JSON-LD-Schema-Baukasten (SEO-/GEO-Richtlinien Abschnitt 3)
   - Immer JSON-LD, mehrere Typen über @graph gebündelt & via @id verknüpft.
   - Nur Markup, das zum sichtbaren Inhalt passt (keine erfundenen Daten).
   ============================================================ */

import { SITE } from "./site";
import { FAQS } from "./faq";

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const RESTAURANT_ID = `${SITE.url}/#restaurant`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

const openingHoursSpecification = SITE.openingHours.map((slot) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: slot.days,
  opens: slot.opens,
  closes: slot.closes,
}));

/** Tier-1-Entitäten: Organization + WebSite + Restaurant (LocalBusiness). */
function coreEntities() {
  return [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.legalName,
      alternateName: SITE.name,
      url: `${SITE.url}/`,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` },
      ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "reservations",
        areaServed: "DE",
        availableLanguage: ["de"],
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: "de",
      publisher: { "@id": ORG_ID },
    },
    {
      // Restaurant ist eine Spezialisierung von LocalBusiness/FoodEstablishment
      // → stärkstes Signal für lokale + KI-Suche ("bestes Restaurant in München").
      "@type": "Restaurant",
      "@id": RESTAURANT_ID,
      name: SITE.name,
      legalName: SITE.legalName,
      url: `${SITE.url}/`,
      image: `${SITE.url}/opengraph-image`,
      description: SITE.description,
      foundingDate: SITE.founded,
      servesCuisine: [...SITE.cuisine],
      priceRange: SITE.priceRange,
      currenciesAccepted: "EUR",
      acceptsReservations: "True",
      telephone: SITE.phone,
      email: SITE.email,
      address: postalAddress,
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE.geo.latitude,
        longitude: SITE.geo.longitude,
      },
      hasMenu: `${SITE.url}/#menue`,
      openingHoursSpecification,
      parentOrganization: { "@id": ORG_ID },
      ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
    },
  ];
}

function faqEntity() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Vollständiger @graph für die Startseite. */
export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...coreEntities(),
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: `${SITE.url}/`,
        name: `${SITE.name} – Fine-Dining-Restaurant in München`,
        description: SITE.description,
        inLanguage: "de",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": RESTAURANT_ID },
        primaryImageOfPage: `${SITE.url}/opengraph-image`,
      },
      faqEntity(),
    ],
  };
}

/** @graph für Rechtstexte: WebPage + BreadcrumbList, verknüpft mit der Org. */
export function legalGraph(opts: { path: string; title: string }) {
  const pageUrl = `${SITE.url}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: opts.title,
        inLanguage: "de",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: `${SITE.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: opts.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
