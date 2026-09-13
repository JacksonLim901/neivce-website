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

  return (
    <div ref={ref} className="relative flex h-full items-center justify-center">
      {/* Soft decorative glow behind the composition */}
      <div className="bg-glow absolute h-[420px] w-[420px] rounded-full" />

      <motion.div style={{ rotate, y, opacity }} className="relative h-[320px] w-[320px]">
        <svg
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          role="img"
          aria-label="Abstract geometric illustration representing NEIVCE's three business areas"
        >
          <circle cx="160" cy="160" r="140" stroke="var(--color-line)" strokeWidth="1" />
          <circle cx="160" cy="160" r="95" stroke="var(--color-accent)" strokeWidth="1.5" />
          <circle cx="245" cy="95" r="34" fill="var(--color-ink)" />
          <circle cx="95" cy="235" r="20" stroke="var(--color-ink)" strokeWidth="1.5" />
          <line x1="160" y1="20" x2="160" y2="60" stroke="var(--color-line)" strokeWidth="1" />
          <line x1="160" y1="260" x2="160" y2="300" stroke="var(--color-line)" strokeWidth="1" />
        </svg>

        {/* Numbered labels — positioned to sit exactly on their circle
            (container is 320px, matching the SVG viewBox 1:1). */}
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 font-display text-sm text-paper"
          style={{ left: 245, top: 95 }}
        >
          01
        </span>
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 text-sm text-ink"
          style={{ left: 95, top: 235 }}
        >
          02
        </span>
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 text-sm text-muted"
          style={{ left: 160, top: 160 }}
        >
          03
        </span>
      </motion.div>
    </div>
  );
}
