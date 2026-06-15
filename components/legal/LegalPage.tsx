import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { legalGraph } from "@/lib/schema";

const LEGAL_NAV = [
  { label: "Startseite", href: "/" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Allergene", href: "/allergene" },
];

export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  /** URL-Pfad der Seite (für Canonical-/Breadcrumb-Schema), z. B. "/impressum". */
  path: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[var(--color-ink)] text-[var(--color-cream)]">
      <JsonLd data={legalGraph({ path, title })} />
      {/* Kopf */}
      <header className="border-b border-[var(--color-gold)]/15">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
          <Link
            href="/"
            className="font-display text-xl tracking-[0.35em] text-[var(--color-cream)]"
          >
            AUREL<span className="text-[var(--color-gold)]">I</span>O
          </Link>
          <Link
            href="/"
            className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-cream)]/60 transition-colors hover:text-[var(--color-gold)]"
          >
            ← Zurück
          </Link>
        </div>
      </header>

      {/* Inhalt */}
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h1 className="font-display text-3xl font-medium text-[var(--color-cream)] sm:text-5xl">
          {title}
        </h1>
        <span className="mt-7 mb-10 block h-px w-32 bg-gradient-to-r from-[var(--color-gold)] to-transparent" />
        <div className="legal-prose">{children}</div>
        {updated && (
          <p className="mt-12 border-t border-[var(--color-cream)]/10 pt-6 font-body text-xs text-[var(--color-cream)]/40">
            Stand: {updated}
          </p>
        )}
      </article>

      {/* Footer-Leiste */}
      <footer className="border-t border-[var(--color-cream)]/10">
        <nav className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 px-6 py-8">
          {LEGAL_NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-xs tracking-wide text-[var(--color-cream)]/45 transition-colors hover:text-[var(--color-gold)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="pb-8 text-center font-body text-[0.7rem] text-[var(--color-cream)]/30">
          © {new Date().getFullYear()} AURELIO · München
        </p>
      </footer>
    </main>
  );
}
