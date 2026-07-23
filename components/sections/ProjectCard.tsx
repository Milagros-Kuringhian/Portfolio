"use client";

import type { ReactNode } from "react";
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

const tagVariants = ["secondary", "default"] as const;

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
  const preview = project.preview ?? "window";

  const imageMotionClass = cn(
    !shouldReduceMotion &&
      "transition-transform duration-500 group-hover:scale-[1.03]",
  );

  let previewFrame: ReactNode;
  switch (preview) {
    case "phone":
      previewFrame = (
        <div
          className={cn(
            "relative h-full w-[42%] max-w-[11rem] overflow-hidden rounded-[1.25rem] bg-background shadow-[0_8px_24px_-8px_rgba(var(--shadow-primary),0.35)] ring-1 ring-black/8",
            imageMotionClass,
          )}
        >
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            sizes="(max-width: 768px) 40vw, 180px"
            className="object-cover object-top"
          />
        </div>
      );
      break;
    case "window":
      previewFrame = (
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-lg bg-background shadow-[0_8px_24px_-8px_rgba(var(--shadow-primary),0.28)] ring-1 ring-black/5",
            imageMotionClass,
          )}
        >
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      );
      break;
    default: {
      const _exhaustive: never = preview;
      throw new Error(`Unhandled project preview: ${_exhaustive}`);
    }
  }

  return (
    <motion.article
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
              transition: { duration: 0.2 },
            }
      }
      className="group h-full"
    >
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_4px_24px_-8px_rgba(var(--shadow-primary),0.1)] transition-[box-shadow,transform] duration-300",
          "hover:shadow-[0_12px_32px_-10px_rgba(var(--shadow-primary),0.15)]",
        )}
      >
        <div
          className={cn(
            "relative flex aspect-[16/10] items-center justify-center overflow-hidden p-3 sm:p-4",
            "bg-[color-mix(in_srgb,var(--muted)_70%,var(--primary)_8%)]",
          )}
        >
          {previewFrame}
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
              {project.title[locale]}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description[locale]}
            </p>
          </div>

          {primaryTag ? (
            <Badge
              variant={tagVariants[accentIndex % tagVariants.length]}
              className="w-fit rounded-full px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider"
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
              className="rounded-full border-border/80"
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
