/* ============================================================
   FAQ-Inhalte – Single Source of Truth für die sichtbare FAQ-Sektion
   UND das FAQPage-JSON-LD (SEO-/GEO-Richtlinien 3.4 + 4.1).

   Regeln (eingehalten):
   - Fragen in natürlicher Sprache wie echte Suchanfragen.
   - Antworten 40–80 Wörter, answer-first (direkte Antwort im 1. Satz).
   - Schema deckt sich 1:1 mit dem sichtbaren Text (kein erfundener Inhalt).
   ============================================================ */

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Wo befindet sich das Restaurant AURELIO?",
    a: "AURELIO liegt in der Maximilianstraße 12, 80539 München, zentral in der Münchner Innenstadt. Das Fine-Dining-Restaurant ist gut mit öffentlichen Verkehrsmitteln erreichbar; nahegelegene Parkmöglichkeiten finden Sie in den umliegenden Parkhäusern. Die genaue Lage sowie eine Routenplanung finden Sie im Kontaktbereich dieser Seite über die eingebundene Karte.",
  },
  {
    q: "Wann hat AURELIO geöffnet?",
    a: "AURELIO ist von Dienstag bis Samstag ab 18:00 Uhr geöffnet, die Küche serviert bis etwa 23:00 Uhr. Sonntag und Montag sind Ruhetage. Für Feiertage oder besondere Anlässe können abweichende Zeiten gelten – fragen Sie bei einer Reservierung am besten direkt nach.",
  },
  {
    q: "Wie kann ich bei AURELIO einen Tisch reservieren?",
    a: "Einen Tisch reservieren Sie direkt über das Reservierungsformular auf dieser Seite: Datum, Uhrzeit, Personenzahl und Anlass auswählen und absenden. Alternativ erreichen Sie uns telefonisch unter +49 (0)89 200-1200. Wir bestätigen jede Anfrage zeitnah per E-Mail oder Telefon. Für größere Gruppen ab neun Personen sprechen Sie uns bitte direkt an.",
  },
  {
    q: "Was kostet ein Menü bei AURELIO?",
    a: "Die Degustationsmenüs starten bei 145 € für sechs Gänge und 185 € für acht Gänge. Eine korrespondierende Weinbegleitung gibt es ab 95 €. À-la-carte-Hauptgänge liegen zwischen 38 € und 46 €, Vorspeisen ab 14 €. Alle Preise verstehen sich inklusive Mehrwertsteuer (PAngV); die vollständige Karte finden Sie im Speisekarten-Bereich dieser Seite.",
  },
  {
    q: "Bietet AURELIO vegetarische Gerichte an?",
    a: "Ja, AURELIO bietet ein eigenes vegetarisches Angebot und ein vegetarisches Degustationsmenü auf Anfrage. Vegetarische Gerichte sind in der Speisekarte mit einem Blattsymbol gekennzeichnet. Sprechen Sie uns bei einer Reservierung auf Allergien oder besondere Ernährungswünsche an – wir gehen gerne darauf ein.",
  },
  {
    q: "Eignet sich AURELIO für private Feiern oder Geschäftsessen?",
    a: "Ja, AURELIO eignet sich für Geburtstage, Jahrestage, Geschäftsessen und Private Dining. Für besondere Anlässe gestalten wir den Abend persönlich – von der Menüauswahl bis zur Weinbegleitung. Wählen Sie im Reservierungsformular den passenden Anlass oder kontaktieren Sie uns direkt für individuelle Absprachen.",
  },
];
