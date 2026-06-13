"use client";

import { useEffect, useState, useCallback } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* ============================================================
   Speisekarte als aufgeschlagene Karte (Book-Flip) – Konzept A
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

const flipVariants: Variants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 32 : -32,
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { rotateY: 0, x: 0, opacity: 1 },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -32 : 32,
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

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
      <header className="mb-6 text-center">
        <h3 className="font-display text-2xl tracking-wide text-[#1c1813] sm:text-3xl">
          {page.title}
        </h3>
        <div className="mx-auto mt-3 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[#a8842f]/50" />
          <span className="text-xs text-[#a8842f]">❖</span>
          <span className="h-px w-8 bg-[#a8842f]/50" />
        </div>
        {page.priceHeader && (
          <p className="mt-2 font-body text-[0.65rem] uppercase tracking-[0.25em] text-[#8a7a5f]">
            {page.priceHeader}
          </p>
        )}
      </header>

      <ul className="flex-1 space-y-5">
        {page.items.map((item) => (
          <li key={item.name}>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-medium text-[#241f18]">
                {item.name}
                {item.veg && <VegLeaf />}
              </span>
              <span className="mb-1 flex-1 border-b border-dotted border-[#241f18]/25" />
              <span className="whitespace-nowrap font-body text-sm tabular-nums tracking-wide text-[#5a4a2a]">
                {item.price}
              </span>
            </div>
            {item.desc && (
              <p className="mt-0.5 font-serif text-sm italic text-[#6b6051]">
                {item.desc}
              </p>
            )}
          </li>
        ))}
      </ul>

      {page.note && (
        <p className="mt-5 border-t border-[#241f18]/10 pt-3 font-body text-[0.7rem] leading-relaxed text-[#8a7a5f]">
          {page.note}
        </p>
      )}
    </div>
  );
}

function PaperPage({
  page,
  side,
}: {
  page?: Page;
  side: "left" | "right" | "single";
}) {
  const spine =
    side === "left"
      ? "shadow-[inset_-22px_0_36px_-26px_rgba(60,40,10,0.55)] sm:rounded-l-[3px]"
      : side === "right"
        ? "shadow-[inset_22px_0_36px_-26px_rgba(60,40,10,0.55)] sm:rounded-r-[3px]"
        : "rounded-[3px]";

  return (
    <div
      className={`relative h-full overflow-hidden bg-[linear-gradient(135deg,#f3ecdc_0%,#ece3cf_100%)] px-7 py-8 sm:px-10 sm:py-10 ${spine}`}
    >
      {/* feine Papier-Maserung */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(120,90,40,0.035) 0px, rgba(120,90,40,0.035) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <div className="relative h-full">{page ? <PageContent page={page} /> : null}</div>
    </div>
  );
}

export function Menu() {
  const reduce = useReducedMotion();
  const [perView, setPerView] = useState(2);
  const [[view, direction], setView] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setPerView(mq.matches ? 1 : 2);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const totalViews = Math.ceil(PAGES.length / perView);

  // bei Viewport-Wechsel View clampen
  useEffect(() => {
    setView(([v]) => [clamp(v, 0, totalViews - 1), 0]);
  }, [totalViews]);

  const paginate = useCallback(
    (dir: number) => {
      setView(([v]) => {
        const next = clamp(v + dir, 0, totalViews - 1);
        return next === v ? [v, 0] : [next, dir];
      });
    },
    [totalViews],
  );

  // Tastatur-Navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const start = view * perView;
  const visible = PAGES.slice(start, start + perView);
  const leftPage = visible[0];
  const rightPage = perView === 2 ? visible[1] : undefined;

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
          Blättern Sie durch unsere Karte — von Vorspeisen bis zur Bar.
        </p>
      </div>

      {/* Buch */}
      <div className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
        <div
          className="relative mx-auto"
          style={{ perspective: 2000 }}
        >
          {/* feste Höhe, damit der Flip nicht springt */}
          <div className="relative h-[560px] sm:h-[600px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={view}
                custom={direction}
                variants={reduce ? undefined : flipVariants}
                initial={reduce ? { opacity: 0 } : "enter"}
                animate={reduce ? { opacity: 1 } : "center"}
                exit={reduce ? { opacity: 0 } : "exit"}
                transition={{
                  rotateY: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  x: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.35 },
                }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80 || info.velocity.x < -400) paginate(1);
                  else if (info.offset.x > 80 || info.velocity.x > 400) paginate(-1);
                }}
                className="absolute inset-0 grid cursor-grab grid-cols-1 overflow-hidden rounded-[5px] border border-[var(--color-gold)]/40 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)] active:cursor-grabbing md:grid-cols-2"
                style={{ transformStyle: "preserve-3d" }}
              >
                <PaperPage page={leftPage} side={perView === 1 ? "single" : "left"} />
                {perView === 2 && <PaperPage page={rightPage} side="right" />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Steuerung */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={view === 0}
              aria-label="Vorherige Seite"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)]/50 text-[var(--color-gold)] transition-all hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalViews }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Zu Seite ${i + 1}`}
                  onClick={() => setView([i, i > view ? 1 : -1])}
                  className={`h-1.5 rounded-full transition-all ${
                    i === view
                      ? "w-6 bg-[var(--color-gold)]"
                      : "w-1.5 bg-[var(--color-cream)]/30 hover:bg-[var(--color-cream)]/60"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={view === totalViews - 1}
              aria-label="Nächste Seite"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)]/50 text-[var(--color-gold)] transition-all hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              →
            </button>
          </div>
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
