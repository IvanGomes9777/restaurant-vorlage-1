"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { MagneticButton } from "./MagneticButton";

// Unsplash-Platzhalter (Fine-Dining-Ambiente / Plating).
// Wird als Poster genutzt; reales Hero-Video später einfach als <source> ergänzen.
const POSTER =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=80";

const HEADLINE = ["Kulinarik", "als", "Erlebnis."];

const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.6 },
  },
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Parallax: Video-Layer bewegt sich langsamer als der Scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="restaurant"
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-ink)]"
    >
      {/* === Hintergrund: Cinematic-Video-Layer (mit Parallax) === */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 -z-20 h-[118%]">
        <video
          className="h-full w-full object-cover"
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          {/* Reales Ambient-Video hier ablegen (Plating / Gastraum, gedämpft, langsam).
              Poster sorgt für vollständiges Bild, falls Video (noch) fehlt. */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-cooking-a-meal-in-a-restaurant-kitchen-44642-large.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* === Cinematic-Overlays: dunkle Gradients + Vignette === */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-ink)]/70 via-[var(--color-ink)]/40 to-[var(--color-ink)]/95" />
      <div className="cinematic-vignette absolute inset-0 -z-10" />

      {/* === Inhalt === */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-7 font-body text-[0.7rem] uppercase tracking-[0.5em] text-[var(--color-gold)]"
        >
          Fine Dining · München
        </motion.p>

        {/* Headline – Wort für Wort (Maskierter Reveal) */}
        <motion.h1
          variants={wordContainer}
          initial="hidden"
          animate="show"
          className="font-display text-5xl font-medium leading-[1.05] text-[var(--color-cream)] sm:text-7xl lg:text-8xl"
        >
          {HEADLINE.map((w, i) => (
            <span key={i} className="mx-2 inline-block overflow-hidden align-bottom">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Gold-Line-Draw */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="my-9 block h-px w-40 origin-center bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent sm:w-56"
        />

        {/* Sub-Headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="mb-11 max-w-xl font-serif text-lg font-light leading-relaxed text-[var(--color-cream)]/85 sm:text-2xl"
        >
          Saisonale Gourmetküche im Herzen der Stadt – seit 2014.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.95 }}
        >
          <MagneticButton href="#reservierung">Tisch reservieren</MagneticButton>
        </motion.div>
      </motion.div>

      {/* === Scroll-Indikator === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-[var(--color-cream)]/30 p-1.5">
          <motion.span
            animate={reduce ? {} : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-[var(--color-gold)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
