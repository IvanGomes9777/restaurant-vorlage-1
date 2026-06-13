"use client";

import { motion, type Variants } from "framer-motion";

// Wort-für-Wort-Reveal (konsistent zur Hero-Headline)
const HEADLINE = ["Saisonal.", "Regional.", "Kompromisslos."];

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

// Geschmackvolle, saisonal-regionale Zutaten (Platzhalter)
const INGREDIENTS = [
  "Périgord-Trüffel",
  "Safran",
  "Heimische Kräuter",
  "Wild aus der Region",
  "Natives Olivenöl",
  "Steinpilze",
  "Wildfang-Zander",
  "Grüner Spargel",
  "Jakobsmuscheln",
  "Reife Quitte",
];

function MarqueeItems() {
  return (
    <>
      {INGREDIENTS.map((item) => (
        <span key={item} className="flex shrink-0 items-center">
          <span className="font-serif text-2xl font-light tracking-wide text-[var(--color-cream)]/85 sm:text-4xl">
            {item}
          </span>
          <span
            aria-hidden
            className="mx-7 inline-block h-1.5 w-1.5 rotate-45 bg-[var(--color-gold)] sm:mx-10"
          />
        </span>
      ))}
    </>
  );
}

export function Kueche() {
  return (
    <section
      id="kueche"
      className="relative isolate overflow-hidden bg-[var(--color-ink)] py-28 sm:py-40"
    >
      {/* dezenter Gold-Schimmer im Hintergrund */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, var(--color-gold) 0%, transparent 70%)",
        }}
      />

      {/* Kopf: Kicker + Headline + Gold-Linie */}
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="mb-8 font-body text-[0.7rem] uppercase tracking-[0.5em] text-[var(--color-gold)]"
        >
          — Unsere Küche —
        </motion.p>

        <motion.h2
          variants={wordContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="font-display text-4xl font-medium leading-[1.1] text-[var(--color-cream)] sm:text-6xl"
        >
          {HEADLINE.map((w, i) => (
            <span key={i} className="mx-2 inline-block overflow-hidden align-bottom">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto my-10 block h-px w-40 origin-center bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent sm:w-56"
        />
      </div>

      {/* Zutaten-Marquee (endlos, pausiert on hover, Rand-Fade) */}
      <div
        className="group relative my-4 flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        aria-label="Ausgewählte Zutaten"
      >
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          <MarqueeItems />
          <MarqueeItems />
        </div>
      </div>

      {/* Philosophie-Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="mx-auto mt-16 max-w-2xl px-6 text-center sm:mt-20"
      >
        <p className="font-serif text-xl font-light leading-relaxed text-[var(--color-cream)]/80 sm:text-2xl">
          AURELIO steht für eine Küche, die Produkt und Handwerk in den
          Mittelpunkt stellt. Wir kochen saisonal, regional und mit
          kompromissloser Hingabe zum Detail – ein Erlebnis für alle Sinne.
        </p>
        <a
          href="#menue"
          className="group mt-10 inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]"
        >
          Menü entdecken
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </a>
      </motion.div>
    </section>
  );
}
