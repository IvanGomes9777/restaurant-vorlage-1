/* ============================================================
   Zentrale Geschäfts- & Site-Daten (Single Source of Truth)
   Quelle: SEO-/GEO-Projektrichtlinien – NAP-Konsistenz (Abschnitt 3.5):
   Name, Adresse, Telefon müssen überall EXAKT identisch sein.
   Diese Datei speist Metadaten, JSON-LD-Schema, robots/sitemap & UI.

   HINWEIS: AURELIO ist eine Demo-/Vorlage. Alle Daten unten sind
   Platzhalter und vor dem Go-Live durch die echten Angaben zu ersetzen
   (Domain, Adresse, Telefon, Geo-Koordinaten, Social-Profile).
   ============================================================ */

export const SITE = {
  /** Produktiv-Domain (für Canonical, OG, Sitemap, Schema-@id). */
  url: "https://www.aurelio-restaurant.de",
  name: "AURELIO",
  legalName: "AURELIO Restaurant GmbH",
  description:
    "Saisonale Gourmetküche im Herzen Münchens – seit 2014. Fine Dining mit regionalen Produkten, mehrgängigen Degustationsmenüs und Weinbegleitung. Tisch online reservieren.",
  /** Kurzbeschreibung für GEO/llms.txt (1–2 Sätze, answer-first). */
  tagline:
    "AURELIO ist ein Fine-Dining-Restaurant in München mit saisonaler, regionaler Gourmetküche und Degustationsmenüs.",
  founded: "2014",
  cuisine: ["Saisonale Gourmetküche", "Französisch", "Regional"],
  priceRange: "€€€",
  email: "reservierung@aurelio-restaurant.de",
  /** Telefon in E.164 für tel:-Links & Schema. */
  phone: "+498920012000",
  phoneDisplay: "+49 (0)89 200-1200",
  address: {
    street: "Maximilianstraße 12",
    postalCode: "80539",
    city: "München",
    region: "Bayern",
    country: "DE",
  },
  /** Geo-Koordinaten (Platzhalter Maximilianstraße – vor Go-Live prüfen). */
  geo: { latitude: 48.1397, longitude: 11.582 },
  /** Öffnungszeiten: Di–Sa 18:00–23:00, So+Mo Ruhetag. */
  openingHours: [
    {
      days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "18:00",
      closes: "23:00",
    },
  ],
  /** Vertrauensprofile (sameAs) – vor Go-Live mit echten URLs füllen. */
  sameAs: [] as string[],
} as const;

export const ADDRESS_LINE = `${SITE.address.street} · ${SITE.address.postalCode} ${SITE.address.city}`;
