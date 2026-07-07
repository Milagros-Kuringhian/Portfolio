"use client";

import { useReducedMotion } from "framer-motion";

import { getSkillIcon } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

interface SkillsMarqueeProps {
  skills: string[];
  direction?: "left" | "right";
}

export function SkillsMarquee({
  skills,
  direction = "left",
}: SkillsMarqueeProps) {
  const shouldReduceMotion = useReducedMotion();
  const items = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "flex w-max gap-4 py-2",
          !shouldReduceMotion && "animate-marquee",
          !shouldReduceMotion && direction === "right" && "animate-marquee-reverse",
          shouldReduceMotion && "flex-wrap justify-center px-4",
        )}
        style={
          !shouldReduceMotion
            ? { animationDuration: `${Math.max(skills.length * 4, 20)}s` }
            : undefined
        }
      >
        {items.map((skill, index) => {
          const Icon = getSkillIcon(skill);
          const isDuplicate = index >= skills.length;

          return (
            <div
              key={`${skill}-${index}`}
              aria-hidden={isDuplicate || undefined}
              className="flex shrink-0 items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm"
            >
              <Icon className="size-5 text-primary" aria-hidden />
              <span className="text-sm font-medium text-foreground">{skill}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
