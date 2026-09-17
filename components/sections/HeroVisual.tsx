"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 160]);
  const y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 40]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const spin = shouldReduceMotion ? undefined : { rotate: 360 };

  return (
    <div ref={ref} className="relative flex h-full flex-col items-center justify-center">
      {/* Soft decorative glow behind the composition */}
      <div className="bg-glow absolute h-[420px] w-[420px] rounded-full" />

      <motion.div style={{ rotate, y, opacity }} className="relative h-[320px] w-[320px]">
        <svg
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          role="img"
          aria-label="NEIVCE Trading PLT orbital brand mark"
        >
          <circle cx="160" cy="160" r="140" stroke="var(--color-line)" strokeWidth="1" />
          <circle cx="160" cy="160" r="95" stroke="var(--color-accent)" strokeWidth="1.5" />

          {/* Orbit 1 — spins clockwise; carries one black and one gold dot */}
          <motion.g
            style={{ transformOrigin: "160px 160px" }}
            animate={spin}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          >
            <ellipse
              cx="160"
              cy="160"
              rx="82"
              ry="28"
              stroke="var(--color-ink)"
              strokeWidth="1.2"
              transform="rotate(-25 160 160)"
            />
            <circle cx="225" cy="144" r="4" fill="var(--color-ink)" />
            <circle cx="95" cy="176" r="3.5" fill="var(--color-accent)" />
          </motion.g>

          {/* Orbit 2 — tilted the other way, spins clockwise at a
              different speed so the two rings move independently,
              giving the composition a layered, sphere-like feel. */}
          <motion.g
            style={{ transformOrigin: "160px 160px" }}
            animate={spin}
            transition={{ repeat: Infinity, duration: 33, ease: "linear" }}
          >
            <ellipse
              cx="160"
              cy="160"
              rx="82"
              ry="28"
              stroke="var(--color-ink)"
              strokeWidth="1"
              opacity="0.6"
              transform="rotate(25 160 160)"
            />
            <circle cx="225" cy="176" r="3.5" fill="var(--color-accent)" />
            <circle cx="95" cy="144" r="4" fill="var(--color-ink)" />
          </motion.g>

          <circle cx="245" cy="95" r="34" fill="var(--color-ink)" />

          {/* Small decorative ring, bottom-left — echoes the brand mark */}
          <circle cx="95" cy="235" r="20" stroke="var(--color-ink)" strokeWidth="1.5" />
          <circle cx="95" cy="235" r="2.5" fill="var(--color-ink)" />

          {/* Cardinal tick marks — blueprint / technical-drawing detail */}
          <line x1="160" y1="20" x2="160" y2="60" stroke="var(--color-line)" strokeWidth="1" />
          <line x1="160" y1="260" x2="160" y2="300" stroke="var(--color-line)" strokeWidth="1" />
          <line x1="20" y1="160" x2="60" y2="160" stroke="var(--color-line)" strokeWidth="1" />
          <line x1="260" y1="160" x2="300" y2="160" stroke="var(--color-line)" strokeWidth="1" />
        </svg>

        {/* "NT" monogram inside the badge — matches the brand mark */}
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-xs tracking-wide text-paper"
          style={{ left: 245, top: 95 }}
        >
          NT
        </span>
      </motion.div>

      {/* Wordmark lockup below the ring — stays still so it always
          reads clearly. */}
      <div className="mt-6 text-center">
        <p className="font-display text-lg tracking-wide">NEIVCE</p>
        <p className="text-eyebrow mt-1 text-muted">— Trading PLT —</p>
      </div>
    </div>
  );
}