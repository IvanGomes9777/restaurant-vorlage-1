"use client";

import { motion } from "framer-motion";
import { FAQS } from "@/lib/faq";

/* ============================================================
   FAQ – GEO-hebelstärkste Sektion (SEO-/GEO-Richtlinien 3.4 + 4.1)
   Frage-Antwort-Format, answer-first. Inhalt deckt sich 1:1 mit dem
   FAQPage-JSON-LD (lib/faq.ts → lib/schema.ts).
   Natives <details>/<summary> = zugänglich, ohne JS bedienbar, und der
   Antworttext steht direkt im initialen HTML (für Crawler lesbar).
   ============================================================ */

export function FAQ() {
  return (
    <section
      id="fragen"
      aria-labelledby="faq-heading"
      className="relative isolate overflow-hidden bg-[var(--color-anthracite)] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, var(--color-gold) 0%, transparent 70%)",
        }}
      />

      {/* Kopf */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-7 font-body text-[0.7rem] uppercase tracking-[0.5em] text-[var(--color-gold)]">
          — Häufige Fragen —
        </p>
        <h2
          id="faq-heading"
          className="t-h2 font-display font-medium leading-[1.1] text-[var(--color-cream)]"
        >
          Gut zu wissen
        </h2>
        <span className="mx-auto my-9 block h-px w-40 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent sm:w-56" />
      </div>

      {/* Liste */}
      <div className="mx-auto mt-4 max-w-3xl px-6">
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="divide-y divide-[var(--color-cream)]/10 border-y border-[var(--color-cream)]/10"
        >
          {FAQS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <dt className="font-serif text-lg font-light leading-snug text-[var(--color-cream)] sm:text-xl">
                  {item.q}
                </dt>
                <span
                  aria-hidden
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-gold)] transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <dd className="max-w-[65ch] pb-6 pr-12 font-body text-[0.95rem] leading-relaxed text-[var(--color-cream)]/70">
                {item.a}
              </dd>
            </details>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
