"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import HTMLFlipBook from "react-pageflip";

/* ============================================================
   Speisekarte als ECHT umblätterbares Buch (react-pageflip) – Konzept A
   Platzhalter-Inhalte (Fine Dining). Preise inkl. MwSt. (PAngV).
   ============================================================ */

type Item = {
  name: string;
  desc?: string;
  price: string;
  veg?: boolean;
};

type Page =
  | { kind: "cover"; title: string; lines: string[] }
  | {
      kind: "category";
      title: string;
      priceHeader?: string;
      items: Item[];
      note?: string;
    };

const PAGES: Page[] = [
  {
    kind: "cover",
    title: "AURELIO",
    lines: ["— Speisekarte —", "Saisonal · Regional", "seit 2014"],
  },
  {
    kind: "category",
    title: "Degustation",
    items: [
      { name: "Menü · 6 Gänge", desc: "Eine Reise des Küchenchefs", price: "145 €" },
      { name: "Menü · 8 Gänge", desc: "Die große Auswahl", price: "185 €" },
      { name: "Begleitende Weinreise", desc: "Korrespondierende Weine", price: "ab 95 €" },
      { name: "Vegetarisches Menü", desc: "Auf Anfrage", price: "auf Anfrage", veg: true },
    ],
  },
  {
    kind: "category",
    title: "Vorspeisen",
    items: [
      { name: "Bretonische Auster", desc: "Gurke · Holunder · Buttermilch", price: "14 €" },
      { name: "Rinder-Tatar", desc: "Wachtelei · Kapern · Sauerteig", price: "18 €" },
      { name: "Gänseleber", desc: "Brioche · Feige · Portwein", price: "24 €" },
      { name: "Jakobsmuschel", desc: "Blumenkohl · Vadouvan", price: "22 €" },
    ],
  },
  {
    kind: "category",
    title: "Suppen & Zwischengänge",
    items: [
      { name: "Kürbis-Velouté", desc: "Geröstete Kerne · Trüffelöl", price: "12 €", veg: true },
      { name: "Consommé vom Bauernhuhn", desc: "Maultasche · Estragon", price: "13 €" },
      { name: "Risotto Acquerello", desc: "Steinpilz · Parmesan 36 M.", price: "19 €", veg: true },
      { name: "Hummer-Bisque", desc: "Cognac · Crème fraîche", price: "16 €" },
    ],
  },
  {
    kind: "category",
    title: "Hauptgänge",
    items: [
      { name: "Gebratener Steinbutt", desc: "Lauch · Beurre blanc · Kaviar", price: "38 €" },
      { name: "Reh aus heimischer Jagd", desc: "Sellerie · Wacholder · Quitte", price: "42 €" },
      { name: "Dry-Aged Rinderfilet", desc: "Trüffel-Jus · Kartoffel · Mark", price: "46 €" },
      { name: "Bretonischer Wolfsbarsch", desc: "Fenchel · Safran · Muscheln", price: "39 €" },
    ],
  },
  {
    kind: "category",
    title: "Vegetarisch",
    items: [
      { name: "Geschmorte Sellerieknolle", desc: "Haselnuss · Apfel · Salbei", price: "26 €", veg: true },
      { name: "Wildkräuter-Ravioli", desc: "Brown Butter · Bergkäse", price: "24 €", veg: true },
      { name: "Glasierte Pastinake", desc: "Linsen · Granatapfel · Tahin", price: "23 €", veg: true },
      { name: "Trüffel-Risotto", desc: "Périgord-Trüffel · Parmesan", price: "29 €", veg: true },
    ],
  },
  {
    kind: "category",
    title: "Desserts",
    items: [
      { name: "Valrhona-Schokolade", desc: "Haselnuss · Tonka", price: "14 €", veg: true },
      { name: "Tarte au Citron", desc: "Baiser · Basilikum", price: "12 €", veg: true },
      { name: "Reife Quitte", desc: "Vanille-Eis · Mandel", price: "12 €", veg: true },
      { name: "Café Gourmand", desc: "Auswahl kleiner Süßspeisen", price: "15 €", veg: true },
    ],
  },
  {
    kind: "category",
    title: "Käse",
    items: [
      { name: "Affinierte Käseauswahl", desc: "Chutney · Walnussbrot", price: "18 €", veg: true },
      { name: "Comté 36 Monate", desc: "Feigensenf", price: "12 €", veg: true },
      { name: "Reblochon de Savoie", desc: "Birne · Honig", price: "11 €", veg: true },
    ],
    note: "Allergene & Zusatzstoffe auf Anfrage (LMIV).",
  },
  {
    kind: "category",
    title: "Weine · Weiß",
    priceHeader: "Glas / Flasche",
    items: [
      { name: "Grüner Veltliner", desc: "Wachau, Österreich", price: "8 / 38 €" },
      { name: "Chablis 1er Cru", desc: "Burgund, Frankreich", price: "14 / 72 €" },
      { name: "Riesling GG", desc: "Mosel, Deutschland", price: "12 / 64 €" },
      { name: "Sancerre", desc: "Loire, Frankreich", price: "11 / 58 €" },
    ],
  },
  {
    kind: "category",
    title: "Weine · Rot & Champagner",
    priceHeader: "Glas / Flasche",
    items: [
      { name: "Spätburgunder", desc: "Baden, Deutschland", price: "10 / 52 €" },
      { name: "Barolo", desc: "Nebbiolo, Piemont", price: "16 / 84 €" },
      { name: "Châteauneuf-du-Pape", desc: "Rhône, Frankreich", price: "15 / 78 €" },
      { name: "Champagner Brut", desc: "Reims, Frankreich", price: "15 / 95 €" },
    ],
  },
  {
    kind: "category",
    title: "Aperitif & Bar",
    items: [
      { name: "Aurelio Spritz", desc: "Champagner · Holunder", price: "14 €" },
      { name: "Negroni", desc: "Gin · Campari · Vermouth", price: "13 €" },
      { name: "Dry Martini", desc: "Gin oder Wodka · Wermut", price: "14 €" },
      { name: "Gin & Tonic", desc: "Botanicals · Limette", price: "12 €" },
    ],
  },
  {
    kind: "category",
    title: "Digestif & Spirituosen",
    items: [
      { name: "Grappa Riserva", desc: "Barrique-gereift", price: "9 €" },
      { name: "Cognac VSOP", desc: "Frankreich", price: "12 €" },
      { name: "Single Malt Whisky", desc: "12 Jahre", price: "14 €" },
      { name: "Amaro Montenegro", desc: "Kräuterlikör, Italien", price: "8 €" },
    ],
    note: "Abgabe von Alkohol nur an Personen ab 18 Jahren (JuSchG).",
  },
  {
    kind: "category",
    title: "Kaffee & Tee",
    items: [
      { name: "Espresso / Doppio", desc: "Hausröstung", price: "3,5 / 5 €", veg: true },
      { name: "Cappuccino", desc: "Barista-Qualität", price: "4,5 €", veg: true },
      { name: "Café Crème", price: "4 €", veg: true },
      { name: "Tee-Auswahl", desc: "Lose Blätter", price: "5 €", veg: true },
    ],
  },
  {
    kind: "category",
    title: "Softdrinks & Wasser",
    items: [
      { name: "Mineralwasser", desc: "still / spritzig · 0,75 l", price: "7,5 €", veg: true },
      { name: "Hausgemachte Limonade", desc: "Wechselnde Sorte", price: "6 €", veg: true },
      { name: "Säfte", desc: "Apfel · Orange · Traube", price: "5,5 €", veg: true },
      { name: "Espresso Tonic", desc: "Erfrischend", price: "6,5 €", veg: true },
    ],
  },
];

function VegLeaf() {
  return (
    <span
      title="vegetarisch"
      aria-label="vegetarisch"
      className="ml-1.5 inline-block text-[#5c7a3a]"
    >
      🌱
    </span>
  );
}

function PageContent({ page }: { page: Page }) {
  if (page.kind === "cover") {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="mb-6 text-3xl text-[#a8842f]">❦</span>
        <h3 className="font-display text-5xl tracking-[0.2em] text-[#1c1813] sm:text-6xl">
          {page.title}
        </h3>
        <div className="my-6 h-px w-24 bg-[#a8842f]/50" />
        {page.lines.map((l) => (
          <p key={l} className="font-serif text-lg italic text-[#4a4036]">
            {l}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="mb-5 text-center">
        <h3 className="font-display text-2xl tracking-wide text-[#1c1813] sm:text-[1.7rem]">
          {page.title}
        </h3>
        <div className="mx-auto mt-3 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[#a8842f]/50" />
          <span className="text-xs text-[#a8842f]">❖</span>
          <span className="h-px w-8 bg-[#a8842f]/50" />
        </div>
        {page.priceHeader && (
          <p className="mt-2 font-body text-[0.6rem] uppercase tracking-[0.25em] text-[#8a7a5f]">
            {page.priceHeader}
          </p>
        )}
      </header>

      <ul className="flex-1 space-y-4">
        {page.items.map((item) => (
          <li key={item.name}>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base font-medium text-[#241f18] sm:text-lg">
                {item.name}
                {item.veg && <VegLeaf />}
              </span>
              <span className="mb-1 flex-1 border-b border-dotted border-[#241f18]/25" />
              <span className="whitespace-nowrap font-body text-sm tabular-nums tracking-wide text-[#5a4a2a]">
                {item.price}
              </span>
            </div>
            {item.desc && (
              <p className="mt-0.5 font-serif text-[0.8rem] italic text-[#6b6051] sm:text-sm">
                {item.desc}
              </p>
            )}
          </li>
        ))}
      </ul>

      {page.note && (
        <p className="mt-4 border-t border-[#241f18]/10 pt-3 font-body text-[0.65rem] leading-relaxed text-[#8a7a5f]">
          {page.note}
        </p>
      )}
    </div>
  );
}

// Eine Buchseite (Papier-Optik). react-pageflip benötigt ref-fähige Kinder.
const Leaf = forwardRef<
  HTMLDivElement,
  { children: ReactNode; density?: "hard" | "soft" }
>(function Leaf({ children, density = "soft" }, ref) {
  return (
    <div
      ref={ref}
      data-density={density}
      className="h-full w-full bg-[linear-gradient(135deg,#f3ecdc_0%,#ece3cf_100%)]"
    >
      <div className="relative h-full overflow-hidden px-6 py-7 sm:px-9 sm:py-9">
        {/* feine Papier-Maserung */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(120,90,40,0.035) 0px, rgba(120,90,40,0.035) 1px, transparent 1px, transparent 4px)",
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
});

export function Menu() {
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void } } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => setMounted(true), []);

  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();
  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") flipNext();
      if (e.key === "ArrowLeft") flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="menue"
      className="relative isolate overflow-hidden bg-[var(--color-anthracite)] py-24 sm:py-32"
    >
      {/* Kopf */}
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-8 font-body text-[0.7rem] uppercase tracking-[0.5em] text-[var(--color-gold)]">
          — Die Karte —
        </p>
        <h2 className="font-display text-4xl font-medium text-[var(--color-cream)] sm:text-6xl">
          Speisekarte
        </h2>
        <span className="mx-auto my-9 block h-px w-40 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent sm:w-56" />
        <p className="mx-auto max-w-md font-serif text-base italic text-[var(--color-cream)]/70">
          Blättern Sie durch unsere Karte — ziehen Sie an der Seitenecke oder
          nutzen Sie die Pfeile.
        </p>
      </div>

      {/* Buch */}
      <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center px-4 sm:px-6">
        <div className="aurelio-book w-full">
          {mounted && (
            // @ts-expect-error – react-pageflip Typdefinitionen sind unvollständig
            <HTMLFlipBook
              ref={bookRef}
              width={460}
              height={620}
              size="stretch"
              minWidth={300}
              maxWidth={560}
              minHeight={460}
              maxHeight={680}
              drawShadow
              flippingTime={750}
              maxShadowOpacity={0.5}
              showCover
              usePortrait
              mobileScrollSupport
              className="mx-auto"
              onFlip={(e: { data: number }) => setPage(e.data)}
            >
              {PAGES.map((p, i) => (
                <Leaf key={i} density={p.kind === "cover" ? "hard" : "soft"}>
                  <PageContent page={p} />
                </Leaf>
              ))}
            </HTMLFlipBook>
          )}
        </div>

        {/* Steuerung */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={flipPrev}
            disabled={page <= 0}
            aria-label="Vorherige Seite"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)]/50 text-[var(--color-gold)] transition-all hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ←
          </button>
          <span className="min-w-[7rem] text-center font-body text-xs uppercase tracking-[0.25em] text-[var(--color-cream)]/60">
            Seite {page + 1} / {PAGES.length}
          </span>
          <button
            type="button"
            onClick={flipNext}
            disabled={page >= PAGES.length - 1}
            aria-label="Nächste Seite"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)]/50 text-[var(--color-gold)] transition-all hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            →
          </button>
        </div>

        {/* LMIV / PAngV Pflichthinweis */}
        <p className="mx-auto mt-10 max-w-2xl text-center font-body text-[0.7rem] leading-relaxed text-[var(--color-cream)]/45">
          Alle Preise inkl. MwSt. 🌱 = vegetarisch. Informationen zu Allergenen
          und Zusatzstoffen (gem. LMIV / VO (EU) 1169/2011) erhalten Sie bei
          unserem Service-Team.
        </p>
      </div>
    </section>
  );
}
