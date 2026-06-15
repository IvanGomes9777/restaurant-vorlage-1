"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

const LINKS = [
  { label: "Restaurant", href: "#restaurant" },
  { label: "Küche", href: "#kueche" },
  { label: "Menü", href: "#menue" },
  { label: "Reservierung", href: "#reservierung" },
  { label: "Events", href: "#events" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Sobald über die Hero hinausgescrollt wird: Navbar ist weggescrollt,
  // der schwebende CTA-Button blendet ein.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 120));

  return (
    <>
      {/* === Navbar – NICHT sticky: liegt über der Hero und scrollt mit weg === */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-0 z-50 bg-transparent"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          {/* Logo / Monogramm */}
          <a
            href="#"
            className="font-display text-2xl tracking-[0.35em] text-[var(--color-cream)]"
            aria-label="AURELIO – Startseite"
          >
            AUREL<span className="text-[var(--color-gold)]">I</span>O
          </a>

          {/* Desktop-Links */}
          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative font-body text-sm uppercase tracking-[0.18em] text-[var(--color-cream)]/80 transition-colors hover:text-[var(--color-cream)]"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA (in der Navbar – verschwindet beim Wegscrollen mit der Navbar) */}
          <a
            href="#reservierung"
            className="hidden border border-[var(--color-gold)] px-6 py-2.5 font-body text-xs uppercase tracking-[0.22em] text-[var(--color-gold)] transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] lg:inline-block"
          >
            Tisch reservieren
          </a>

          {/* Mobile-Toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-7 bg-[var(--color-cream)] transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-7 bg-[var(--color-cream)] transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-7 bg-[var(--color-cream)] transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile-Menü */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-[var(--color-gold)]/10 bg-[var(--color-ink)]/95 backdrop-blur-md lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-body text-sm uppercase tracking-[0.18em] text-[var(--color-cream)]/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#reservierung"
                onClick={() => setOpen(false)}
                className="mt-3 block border border-[var(--color-gold)] px-6 py-3 text-center font-body text-xs uppercase tracking-[0.22em] text-[var(--color-gold)]"
              >
                Tisch reservieren
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.header>

      {/* === Schwebende CTAs – bleiben fixiert & gut positioniert (unten rechts) === */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 sm:bottom-8 sm:right-8"
          >
            {/* Direkt anrufen */}
            <a
              href="tel:+49892001200"
              aria-label="Direkt anrufen"
              className="flex items-center gap-2 border border-[var(--color-gold)] bg-[var(--color-ink)]/85 px-5 py-3 font-body text-xs uppercase tracking-[0.22em] text-[var(--color-gold)] shadow-lg shadow-black/30 backdrop-blur-md transition-colors duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="hidden sm:inline">Anrufen</span>
            </a>

            {/* Tisch reservieren */}
            <a
              href="#reservierung"
              className="border border-[var(--color-gold)] bg-[var(--color-ink)]/85 px-6 py-3 font-body text-xs uppercase tracking-[0.22em] text-[var(--color-gold)] shadow-lg shadow-black/30 backdrop-blur-md transition-colors duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)]"
            >
              Tisch reservieren
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
