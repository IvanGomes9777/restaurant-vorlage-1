"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   AURELIO – Cookie-Consent-Banner
   DSGVO-/TTDSG-konformer Opt-in für künftiges Analytics/Tracking.
   Notwendige Cookies sind immer aktiv; Analyse-Cookies erst nach
   ausdrücklicher Einwilligung. Die Auswahl wird in localStorage
   gespeichert und kann von Tracking-Skripten ausgewertet werden.
   ============================================================ */

export const CONSENT_STORAGE_KEY = "aurelio-cookie-consent";
export const CONSENT_EVENT = "aurelio-consent-change";

export type ConsentValue = "accepted" | "rejected";

export type CookieConsent = {
  /** Notwendige Cookies – technisch erforderlich, immer true. */
  necessary: true;
  /** Analyse-/Tracking-Cookies – nur nach Einwilligung. */
  analytics: boolean;
  /** Zeitpunkt der Einwilligung (ISO-String). */
  timestamp: string;
};

/** Liest die gespeicherte Einwilligung (z. B. um Analytics zu laden). */
export function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}

function persistConsent(analytics: boolean) {
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    // Eigenes Event, damit Tracking-Skripte sofort reagieren können.
    window.dispatchEvent(
      new CustomEvent<CookieConsent>(CONSENT_EVENT, { detail: consent }),
    );
  } catch {
    /* localStorage nicht verfügbar – Banner wird in dieser Session erneut gezeigt. */
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  // Banner nur zeigen, wenn noch keine Entscheidung getroffen wurde.
  useEffect(() => {
    if (!getStoredConsent()) {
      // Kleiner Versatz, damit der Hero zuerst ankommt.
      const t = window.setTimeout(() => setVisible(true), 900);
      return () => window.clearTimeout(t);
    }
  }, []);

  const decide = (analytics: boolean) => {
    persistConsent(analytics);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-Einstellungen"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-5 rounded-md border border-[var(--color-gold)]/25 bg-[var(--color-anthracite)]/95 p-6 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-8 sm:p-7">
            <div className="flex-1">
              <h2 className="font-display text-lg text-[var(--color-cream)]">
                Wir respektieren Ihre Privatsphäre
              </h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-[var(--color-cream)]/60">
                Notwendige Cookies sorgen für den Betrieb dieser Website. Mit
                Ihrer Einwilligung nutzen wir zusätzlich Analyse-Cookies, um das
                Erlebnis stetig zu verbessern. Mehr dazu in unserer{" "}
                <Link
                  href="/datenschutz"
                  className="text-[var(--color-gold)] underline-offset-4 hover:underline"
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:w-44">
              <button
                type="button"
                onClick={() => decide(true)}
                className="rounded-sm bg-[var(--color-gold)] px-5 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
              >
                Alle akzeptieren
              </button>
              <button
                type="button"
                onClick={() => decide(false)}
                className="rounded-sm border border-[var(--color-cream)]/25 px-5 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-[var(--color-cream)]/70 transition-colors hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)]"
              >
                Nur notwendige
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
