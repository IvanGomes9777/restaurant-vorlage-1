import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Impressum · AURELIO",
  description: "Impressum und Anbieterkennzeichnung des Restaurants AURELIO.",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

export default function Impressum() {
  return (
    <LegalPage title="Impressum" path="/impressum" updated="Juni 2026">
      <p className="text-xs text-[var(--color-cream)]/40">
        Hinweis: Dies ist eine Demo-/Vorlagenseite. Sämtliche Unternehmens- und
        Kontaktdaten sind Platzhalter und vor Veröffentlichung durch die echten
        Angaben zu ersetzen.
      </p>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        AURELIO Restaurant GmbH<br />
        Maximilianstraße 12<br />
        80539 München<br />
        Deutschland
      </p>

      <h3>Vertreten durch</h3>
      <p>Geschäftsführer: Lorenzo Aurelio</p>

      <h3>Kontakt</h3>
      <p>
        Telefon: <a href="tel:+49892001200">+49 (0)89 200-1200</a><br />
        E-Mail: <a href="mailto:info@aurelio-restaurant.de">info@aurelio-restaurant.de</a>
      </p>

      <h3>Registereintrag</h3>
      <p>
        Eintragung im Handelsregister<br />
        Registergericht: Amtsgericht München<br />
        Registernummer: HRB 000000 (Platzhalter)
      </p>

      <h3>Umsatzsteuer-ID</h3>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        DE 000000000 (Platzhalter)
      </p>

      <h3>Gaststättenrechtliche Erlaubnis</h3>
      <p>
        Erlaubnis zum Betrieb eines Gaststättengewerbes (inkl. Ausschank
        alkoholischer Getränke) gemäß Gaststättengesetz.<br />
        Erteilt durch: Kreisverwaltungsreferat München (Platzhalter).
      </p>

      <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
      <p>
        Lorenzo Aurelio<br />
        Maximilianstraße 12, 80539 München
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
        10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als
        solche gekennzeichnet. Jede Verwertung außerhalb der Grenzen des
        Urheberrechtes bedarf der schriftlichen Zustimmung des jeweiligen Autors.
      </p>
    </LegalPage>
  );
}
