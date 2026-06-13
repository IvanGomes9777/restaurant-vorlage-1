"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

// Magnetic-Button: folgt sanft dem Cursor (gedämpft via Spring).
export function MagneticButton({ href, children, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center justify-center overflow-hidden border border-[var(--color-gold)] px-10 py-4 font-body text-xs uppercase tracking-[0.3em] text-[var(--color-gold)] transition-colors duration-500 hover:text-[var(--color-ink)] ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {/* Gold-Fill von unten beim Hover */}
      <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-[var(--color-gold)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
    </motion.a>
  );
}
