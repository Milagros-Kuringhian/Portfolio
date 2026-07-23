"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

interface StaggerRevealProps {
  className?: string;
  children: ReactNode;
  as?: "div" | "ul";
}

export function StaggerReveal({
  className,
  children,
  as = "div",
}: StaggerRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = as === "ul" ? motion.ul : motion.div;

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  className?: string;
  children: ReactNode;
  as?: "div" | "li" | "article";
}

export function StaggerItem({
  className,
  children,
  as = "div",
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag =
    as === "li" ? motion.li : as === "article" ? motion.article : motion.div;

  return (
    <MotionTag className={cn(className)} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
