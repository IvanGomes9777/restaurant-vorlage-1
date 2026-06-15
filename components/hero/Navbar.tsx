"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

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
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Navbar wird ab ~80px Scroll solide (transparent über Hero → solid)
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 80));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-[var(--color-gold)]/15 bg-[var(--color-ink)]/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
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

        {/* CTA */}
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
  );
}
