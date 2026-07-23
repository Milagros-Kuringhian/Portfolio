"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface StickySectionHeadProps {
  className?: string;
  children: ReactNode;
}

/** Short sticky header — sticks only while its parent section is in view. */
export function StickySectionHead({
  className,
  children,
}: StickySectionHeadProps) {
  return (
    <div
      className={cn(
        "sticky top-[4.5rem] z-10 -mx-4 border-b border-border/40 bg-section-alt/90 px-4 py-4 backdrop-blur-md sm:py-5 md:-mx-6 md:px-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
