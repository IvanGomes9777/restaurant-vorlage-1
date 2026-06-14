"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ============================================================
   Abschluss-Sektion – Konzept E (immersiver Foto-Footer)
   Events/Private Dining + Kontakt + DSGVO-konforme Google-Map
   (Click-to-Load) + Footer mit Pflicht-Links.
   ============================================================ */

const AMBIENCE =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=80";

// Adresse für die Google-Maps-Einbettung (ohne API-Key via output=embed)
const MAPS_QUERY = "Maximilianstraße 12, 80539 München";
const MAPS_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Standort AURELIO auf Google Maps"
        src={MAPS_SRC}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[260px] w-full border-0"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-4 bg-[var(--color-anthracite)] px-6 text-center">
      <span aria-hidden className="text-2xl text-[var(--color-gold)]">📍</span>
      <p className="font-body text-sm text-[var(--color-cream)]/70">
        {MAPS_QUERY}
      </p>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="border border-[var(--color-gold)] px-6 py-2.5 font-body text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)]"
      >
        Karte laden
      </button>
      <p className="max-w-xs font-body text-[0.65rem] leading-relaxed text-[var(--color-cream)]/40">
        Mit dem Laden der Karte akzeptieren Sie die Datenschutzerklärung von
        Google. Es werden Daten an Google übertragen.
      </p>
    </div>
  );
}

const NAV = [
  { label: "Restaurant", href: "#restaurant" },
  { label: "Küche", href: "#kueche" },
  { label: "Menü", href: "#menue" },
  { label: "Reservierung", href: "#reservierung" },
];

const LEGAL = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Allergene & Zusatzstoffe", href: "/allergene" },
  { label: "Cookies", href: "/datenschutz#cookies" },
];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

export function Kontakt() {
  return (
    <footer
      id="kontakt"
      className="relative isolate overflow-hidden bg-[var(--color-ink)] text-[var(--color-cream)]"
    >
      {/* Immersives Ambiente-Foto + Overlays */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${AMBIENCE})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-ink)]/85 via-[var(--color-ink)]/80 to-[var(--color-ink)]/95" />
      <div className="cinematic-vignette absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        {/* Events / Private Dining */}
        <motion.div {...fade} transition={{ duration: 0.8 }} id="events" className="mb-20 text-center">
          <p className="mb-7 font-body text-[0.7rem] uppercase tracking-[0.5em] text-[var(--color-gold)]">
            — Events & Private Dining —
          </p>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-medium leading-snug text-[var(--color-cream)] sm:text-5xl">
            Ihr besonderer Anlass, perfekt inszeniert.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic text-[var(--color-cream)]/70">
            Private Dining, Firmenevents & Weinabende – wir gestalten Ihren
            Abend ganz persönlich.
          </p>
          <a
            href="#reservierung"
            className="group mt-9 inline-flex items-center gap-3 border border-[var(--color-gold)] px-8 py-3.5 font-body text-xs uppercase tracking-[0.3em] text-[var(--color-gold)] transition-colors duration-500 hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)]"
          >
            Anlass anfragen
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </a>
        </motion.div>

        {/* Kontakt + Map */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div {...fade} transition={{ duration: 0.8 }} className="flex flex-col justify-center">
            <h3 className="font-display text-2xl tracking-[0.25em] text-[var(--color-cream)]">
              AUREL<span className="text-[var(--color-gold)]">I</span>O
            </h3>
            <div className="mt-6 space-y-3 font-body text-sm text-[var(--color-cream)]/75">
              <p>Maximilianstraße 12 · 80539 München</p>
              <p>
                <a href="tel:+49892001200" className="transition-colors hover:text-[var(--color-gold)]">+49 (0)89 200-1200</a>
              </p>
              <p>
                <a href="mailto:reservierung@aurelio-restaurant.de" className="transition-colors hover:text-[var(--color-gold)]">reservierung@aurelio-restaurant.de</a>
              </p>
              <div className="pt-3">
                <p className="text-[var(--color-cream)]/55">Dienstag – Samstag · ab 18:00 Uhr</p>
                <p className="text-[var(--color-cream)]/55">Sonntag & Montag · Ruhetag</p>
              </div>
              <p className="pt-3">
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] underline-offset-4 hover:underline">
                  Route planen ↗
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div {...fade} transition={{ duration: 0.8, delay: 0.15 }} className="overflow-hidden border border-[var(--color-gold)]/25">
            <MapEmbed />
          </motion.div>
        </div>

        {/* Footer-Leiste */}
        <div className="mt-20 border-t border-[var(--color-cream)]/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV.map((l) => (
                <a key={l.href} href={l.href} className="font-body text-xs uppercase tracking-[0.18em] text-[var(--color-cream)]/60 transition-colors hover:text-[var(--color-cream)]">
                  {l.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {LEGAL.map((l) => (
                <a key={l.label} href={l.href} className="font-body text-xs tracking-wide text-[var(--color-cream)]/45 transition-colors hover:text-[var(--color-gold)]">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <p className="mt-8 text-center font-body text-[0.7rem] tracking-wide text-[var(--color-cream)]/35">
            © {new Date().getFullYear()} AURELIO · Saisonale Gourmetküche · München
          </p>
        </div>
      </div>
    </footer>
  );
}
