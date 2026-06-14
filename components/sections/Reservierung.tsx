"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";

/* ============================================================
   Reservierung – Konzept E, Variante Hell-3 (Split hell/dunkel)
   Helles Creme-Formular + dunkles Info-Panel als Kontrast.
   Frontend-Mock mit Validierung, Honeypot & DSGVO-Consent.
   ============================================================ */

const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9+ (auf Anfrage)"];
const OCCASIONS = ["Dinner", "Geschäftsessen", "Geburtstag", "Jahrestag", "Private Dining", "Sonstiges"];

// Helles Formular auf Creme
const inputClass =
  "w-full border-b border-[#241f18]/20 bg-transparent py-2.5 font-body text-sm text-[#241f18] outline-none transition-colors placeholder:text-[#241f18]/35 focus:border-[#a8842f]";
const labelClass =
  "mb-1.5 block font-body text-[0.65rem] uppercase tracking-[0.2em] text-[#6b6051]";
const errClass = "mt-1.5 text-xs text-[#b23a2a]";
const optClass = "bg-white text-[#241f18]";

function todayISO() {
  // Lokales Datum (nicht UTC), damit das Min-Datum in DE nachts korrekt ist.
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
}

// Öffnungszeiten: Di–Sa ab 18:00 (bis 23:00), So+Mo Ruhetag.
function computeOpen(now: Date): boolean {
  const day = now.getDay(); // 0 So … 6 Sa
  if (day === 0 || day === 1) return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= 18 * 60 && minutes < 23 * 60;
}

type Errors = Partial<Record<"date" | "time" | "name" | "email" | "phone" | "consent", string>>;

export function Reservierung() {
  const [open, setOpen] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setOpen(computeOpen(new Date()));
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: von Menschen unsichtbar, Bots füllen es aus.
    if ((data.get("website") as string)?.length) return;

    const date = (data.get("date") as string) || "";
    const time = (data.get("time") as string) || "";
    const name = ((data.get("name") as string) || "").trim();
    const email = ((data.get("email") as string) || "").trim();
    const phone = ((data.get("phone") as string) || "").trim();
    const consent = data.get("consent") === "on";

    const next: Errors = {};
    if (!date) next.date = "Bitte ein Datum wählen.";
    if (!time) next.time = "Bitte eine Uhrzeit wählen.";
    if (name.length < 2) next.name = "Bitte Ihren Namen angeben.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Bitte eine gültige E-Mail angeben.";
    if (phone.replace(/\D/g, "").length < 6) next.phone = "Bitte eine gültige Telefonnummer angeben.";
    if (!consent) next.consent = "Bitte stimmen Sie der Datenverarbeitung zu.";

    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  return (
    <section
      id="reservierung"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#f4eddd_0%,#ece2cd_100%)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Kopf */}
        <div className="mb-14 text-center">
          <p className="mb-7 font-body text-[0.7rem] uppercase tracking-[0.5em] text-[#a8842f]">
            — Reservierung —
          </p>
          <h2 className="font-display text-4xl font-medium text-[#241f18] sm:text-6xl">
            Tisch reservieren
          </h2>
          <span className="mx-auto mt-9 block h-px w-40 bg-gradient-to-r from-transparent via-[#a8842f] to-transparent sm:w-56" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Formular (hell) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center border border-[#a8842f]/30 px-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#a8842f] text-2xl text-[#a8842f]"
                >
                  ✓
                </motion.div>
                <h3 className="font-display text-2xl text-[#241f18]">
                  Vielen Dank für Ihre Anfrage
                </h3>
                <p className="mt-3 max-w-sm font-serif text-base italic text-[#4a4036]">
                  Wir bestätigen Ihre Reservierung in Kürze per E-Mail oder
                  Telefon. Wir freuen uns auf Ihren Besuch im AURELIO.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                {/* Honeypot (visuell versteckt) */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="r-date" className={labelClass}>Datum</label>
                    <input id="r-date" name="date" type="date" min={todayISO()} className={inputClass} aria-invalid={!!errors.date} aria-describedby={errors.date ? "r-date-err" : undefined} />
                    {errors.date && <p id="r-date-err" className={errClass}>{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="r-time" className={labelClass}>Uhrzeit</label>
                    <select id="r-time" name="time" defaultValue="" className={`${inputClass} appearance-none`} aria-invalid={!!errors.time} aria-describedby={errors.time ? "r-time-err" : undefined}>
                      <option value="" disabled className={optClass}>Bitte wählen</option>
                      {TIMES.map((t) => (
                        <option key={t} value={t} className={optClass}>{t} Uhr</option>
                      ))}
                    </select>
                    {errors.time && <p id="r-time-err" className={errClass}>{errors.time}</p>}
                  </div>
                  <div>
                    <label htmlFor="r-guests" className={labelClass}>Personen</label>
                    <select id="r-guests" name="guests" defaultValue="2" className={`${inputClass} appearance-none`}>
                      {GUESTS.map((g) => (
                        <option key={g} value={g} className={optClass}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="r-occasion" className={labelClass}>Anlass</label>
                    <select id="r-occasion" name="occasion" defaultValue="Dinner" className={`${inputClass} appearance-none`}>
                      {OCCASIONS.map((o) => (
                        <option key={o} value={o} className={optClass}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="r-name" className={labelClass}>Name</label>
                  <input id="r-name" name="name" type="text" autoComplete="name" placeholder="Ihr vollständiger Name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "r-name-err" : undefined} />
                  {errors.name && <p id="r-name-err" className={errClass}>{errors.name}</p>}
                </div>

                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="r-email" className={labelClass}>E-Mail</label>
                    <input id="r-email" name="email" type="email" autoComplete="email" placeholder="ihre@email.de" className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? "r-email-err" : undefined} />
                    {errors.email && <p id="r-email-err" className={errClass}>{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="r-phone" className={labelClass}>Telefon</label>
                    <input id="r-phone" name="phone" type="tel" autoComplete="tel" placeholder="+49 …" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "r-phone-err" : undefined} />
                    {errors.phone && <p id="r-phone-err" className={errClass}>{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-[#a8842f]" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "r-consent-err" : undefined} />
                    <span className="font-body text-xs leading-relaxed text-[#6b6051]">
                      Ich willige ein, dass meine Angaben zur Bearbeitung der
                      Reservierungsanfrage verarbeitet werden. Hinweise &
                      Widerruf in der{" "}
                      <a href="#datenschutz" className="text-[#a8842f] underline">Datenschutzerklärung</a>.
                    </span>
                  </label>
                  {errors.consent && <p id="r-consent-err" className={errClass}>{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden border border-[#a8842f] px-10 py-4 font-body text-xs uppercase tracking-[0.3em] text-[#a8842f] transition-colors duration-500 hover:text-white sm:w-auto"
                >
                  <span className="relative z-10">Anfrage senden</span>
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#a8842f] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Info-Panel (dunkel – Kontrast) */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-8 bg-[var(--color-ink)] p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-10"
          >
            {/* Live-Status */}
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  {open && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6fae5f] opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                      open === null ? "bg-[var(--color-cream)]/30" : open ? "bg-[#6fae5f]" : "bg-[var(--color-cream)]/30"
                    }`}
                  />
                </span>
                <span className="font-body text-sm tracking-wide text-[var(--color-cream)]">
                  {open === null ? "Öffnungszeiten" : open ? "Jetzt geöffnet" : "Aktuell geschlossen"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.25em] text-[var(--color-gold)]">Öffnungszeiten</h3>
              <dl className="space-y-1.5 font-body text-sm text-[var(--color-cream)]/75">
                <div className="flex justify-between gap-4"><dt>Dienstag – Samstag</dt><dd>ab 18:00 Uhr</dd></div>
                <div className="flex justify-between gap-4"><dt>Sonntag & Montag</dt><dd>Ruhetag</dd></div>
              </dl>
            </div>

            <div className="h-px bg-[var(--color-cream)]/10" />

            <div>
              <h3 className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.25em] text-[var(--color-gold)]">Kontakt</h3>
              <div className="space-y-2 font-body text-sm text-[var(--color-cream)]/75">
                <p><a href="tel:+49892001200" className="transition-colors hover:text-[var(--color-gold)]">+49 (0)89 200-1200</a></p>
                <p><a href="mailto:reservierung@aurelio-restaurant.de" className="transition-colors hover:text-[var(--color-gold)]">reservierung@aurelio-restaurant.de</a></p>
                <p>Maximilianstraße 12 · 80539 München</p>
              </div>
            </div>

            <div className="h-px bg-[var(--color-cream)]/10" />

            <p className="font-serif text-base italic leading-relaxed text-[var(--color-cream)]/65">
              Für besondere Anlässe & private Dinner sprechen Sie uns gern direkt
              an — wir gestalten Ihren Abend persönlich.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
