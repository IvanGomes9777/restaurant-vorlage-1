import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung · AURELIO",
  description: "Informationen zum Datenschutz gemäß Art. 13 DSGVO beim Restaurant AURELIO.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung" path="/datenschutz" updated="Juni 2026">
      <p className="text-xs text-[var(--color-cream)]/40">
        Hinweis: Demo-/Vorlagentext. Bitte vor Veröffentlichung an die
        tatsächlichen Verarbeitungen und Verantwortlichen anpassen und ggf.
        rechtlich prüfen lassen.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
        AURELIO Restaurant GmbH, Maximilianstraße 12, 80539 München<br />
        E-Mail: <a href="mailto:datenschutz@aurelio-restaurant.de">datenschutz@aurelio-restaurant.de</a>
      </p>

      <h2>2. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung („Recht auf Vergessenwerden", Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
      </ul>

      <h2>3. Reservierungsanfragen</h2>
      <p>
        Wenn Sie über das Reservierungsformular eine Anfrage stellen, verarbeiten
        wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, Telefonnummer,
        Datum, Uhrzeit, Personenzahl, Anlass) ausschließlich zur Bearbeitung
        Ihrer Reservierung.
      </p>
      <ul>
        <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahme) sowie Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</li>
        <li><strong>Speicherdauer:</strong> bis zur Abwicklung des Besuchs zzgl. gesetzlicher Aufbewahrungsfristen; darüber hinaus nur, soweit erforderlich.</li>
        <li><strong>Empfänger:</strong> ausschließlich das Restaurant AURELIO; keine Weitergabe an Dritte zu Werbezwecken.</li>
      </ul>

      <h2>4. Server-Logfiles</h2>
      <p>
        Beim Aufruf der Website werden durch den Hosting-Provider automatisch
        Informationen erhoben (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Seite,
        Browsertyp). Dies dient dem sicheren und stabilen Betrieb.
      </p>
      <ul>
        <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</li>
      </ul>

      <h2>5. Hosting (Vercel)</h2>
      <p>
        Diese Website wird bei der Vercel Inc. gehostet. Mit dem Anbieter besteht
        ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO); für Übermittlungen in
        Drittländer gelten die EU-Standardvertragsklauseln.
      </p>

      <h2 id="maps">6. Google Maps</h2>
      <p>
        Wir binden Kartenmaterial von Google Maps (Anbieter: Google Ireland
        Limited) ein. Die Karte wird <strong>nicht automatisch geladen</strong>:
        Erst wenn Sie aktiv auf „Karte laden" klicken, werden Daten (u. a. Ihre
        IP-Adresse) an Google übertragen. Dabei kann eine Übermittlung in die USA
        erfolgen.
      </p>
      <ul>
        <li><strong>Rechtsgrundlage:</strong> Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO).</li>
        <li>Weitere Informationen: Datenschutzerklärung von Google unter <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</li>
      </ul>

      <h2 id="cookies">7. Cookies</h2>
      <p>
        Diese Website setzt grundsätzlich nur technisch notwendige Cookies bzw.
        Speichermechanismen, die für den Betrieb erforderlich sind. Nicht
        notwendige (z. B. Tracking-/Marketing-)Cookies werden nur mit Ihrer
        ausdrücklichen Einwilligung gesetzt. Externe Dienste wie Google Maps
        werden – wie oben beschrieben – erst nach aktiver Zustimmung geladen.
      </p>
      <p>
        Beim ersten Besuch erscheint hierzu ein Cookie-Banner, über das Sie der
        Verwendung von Analyse-Cookies zustimmen oder ausschließlich notwendige
        Cookies zulassen können. Ihre Auswahl wird lokal in Ihrem Browser
        gespeichert. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung
        für die Zukunft widerrufen, indem Sie die gespeicherten Website-Daten in
        Ihrem Browser löschen; das Banner wird Ihnen dann erneut angezeigt.
      </p>

      <h2>8. Beschwerderecht</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
        beschweren. Zuständig ist u. a. das Bayerische Landesamt für
        Datenschutzaufsicht (BayLDA).
      </p>

      <h2>9. Kontakt</h2>
      <p>
        Für Fragen zum Datenschutz erreichen Sie uns unter{" "}
        <a href="mailto:datenschutz@aurelio-restaurant.de">datenschutz@aurelio-restaurant.de</a>.
      </p>
    </LegalPage>
  );
}
