'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 38%'],
  });

  const start = Math.min(delay * 0.55, 0.2);
  const end = Math.min(0.76 + start, 1);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [72, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [0.965, 1]);

  useEffect(() => setHydrated(true), []);

  return (
    <motion.div
      ref={ref}
      className={className}
      data-scroll-reveal=""
      style={hydrated && !reducedMotion ? { opacity, y, scale } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <Reveal delay={delay} className={className}>{children}</Reveal>;
}

export function ScrollRevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function ScrollRevealItem({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return <Reveal delay={delay}>{children}</Reveal>;
}
