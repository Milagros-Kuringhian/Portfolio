"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { GitHubIcon } from "@/components/icons/social";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  liveDemoLabel: string;
  viewCodeLabel: string;
  accentIndex?: number;
}

const tagVariants = ["secondary", "default", "outline"] as const;

export function ProjectCard({
  project,
  locale,
  liveDemoLabel,
  viewCodeLabel,
  accentIndex = 0,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const tA11y = useTranslations("accessibility");
  const externalLabel = tA11y("opensInNewTab");
  const primaryTag = project.tech[0];

  return (
    <motion.article
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              transition: { duration: 0.2 },
            }
      }
      className="h-full"
    >
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_8px_30px_-12px_rgba(20,43,69,0.12)] transition-[box-shadow,border-color] duration-300",
          "hover:border-primary/25 hover:shadow-[0_16px_40px_-14px_rgba(20,43,69,0.2)]",
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className={cn(
              "object-cover",
              !shouldReduceMotion &&
                "transition-transform duration-500 hover:scale-[1.04]",
            )}
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {project.title[locale]}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description[locale]}
            </p>
          </div>

          {primaryTag ? (
            <Badge
              variant={tagVariants[accentIndex % tagVariants.length]}
              className="w-fit rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-wider"
            >
              {primaryTag}
            </Badge>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.liveUrl ? (
              <Button
                variant="default"
                size="sm"
                className="rounded-full"
                render={
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${liveDemoLabel} ${externalLabel}`}
                  />
                }
              >
                <ExternalLink data-icon="inline-start" />
                {liveDemoLabel}
              </Button>
            ) : null}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-accent/40"
              render={
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${viewCodeLabel} ${externalLabel}`}
                />
              }
            >
              <GitHubIcon className="size-4" data-icon="inline-start" />
              {viewCodeLabel}
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
