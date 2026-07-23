"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface HeroScrollProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function HeroScroll({ id, className, children }: HeroScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 56]);

  if (shouldReduceMotion) {
    return (
      <section id={id} className={cn("section-scene", className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn("section-scene", className)}
      style={{ opacity, scale, y }}
    >
      {children}
    </motion.section>
  );
}
