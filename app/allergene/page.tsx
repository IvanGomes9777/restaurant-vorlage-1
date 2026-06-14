import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Allergene & Zusatzstoffe · AURELIO",
  description:
    "Kennzeichnung der 14 Hauptallergene (LMIV) und Zusatzstoffe im Restaurant AURELIO.",
  robots: { index: false, follow: true },
};

const ALLERGENE = [
  "Glutenhaltiges Getreide (z. B. Weizen, Roggen, Gerste, Hafer)",
  "Krebstiere",
  "Eier",
  "Fische",
  "Erdnüsse",
  "Sojabohnen",
  "Milch (einschließlich Laktose)",
  "Schalenfrüchte (Nüsse)",
  "Sellerie",
  "Senf",
  "Sesamsamen",
  "Schwefeldioxid und Sulfite (> 10 mg/kg bzw. l)",
  "Lupinen",
  "Weichtiere",
];

const ZUSATZSTOFFE = [
  "mit Farbstoff",
  "mit Konservierungsstoff",
  "mit Antioxidationsmittel",
  "mit Geschmacksverstärker",
  "geschwefelt",
  "geschwärzt",
  "gewachst",
  "mit Phosphat",
  "mit Süßungsmittel(n)",
  "enthält eine Phenylalaninquelle",
  "koffeinhaltig",
  "chininhaltig",
];

export default function Allergene() {
  return (
    <LegalPage title="Allergene & Zusatzstoffe" updated="Juni 2026">
      <p>
        Gemäß der Lebensmittelinformationsverordnung (LMIV – VO (EU) Nr.
        1169/2011) informieren wir Sie über kennzeichnungspflichtige Allergene
        und Zusatzstoffe in unseren Speisen und Getränken.
      </p>
      <p>
        Detaillierte Angaben zu den einzelnen Gerichten erhalten Sie jederzeit
        bei unserem Service-Team. Sprechen Sie uns bei Unverträglichkeiten oder
        Allergien gern direkt an – wir beraten Sie persönlich.
      </p>

      <h2>Die 14 Hauptallergene</h2>
      <ul>
        {ALLERGENE.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>

      <h2>Kennzeichnungspflichtige Zusatzstoffe</h2>
      <ul>
        {ZUSATZSTOFFE.map((z) => (
          <li key={z}>{z}</li>
        ))}
      </ul>

      <h2>Hinweis zu Kreuzkontaminationen</h2>
      <p>
        Trotz sorgfältiger Zubereitung können wir in unserer Küche das Vorkommen
        von Spuren weiterer Allergene nicht vollständig ausschließen. Bei
        schweren Allergien informieren Sie uns bitte unbedingt vor Ihrer
        Bestellung.
      </p>
    </LegalPage>
  );
}
