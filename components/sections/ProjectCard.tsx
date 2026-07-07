"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { GitHubIcon } from "@/components/icons/social";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  liveDemoLabel: string;
  viewCodeLabel: string;
}

export function ProjectCard({
  project,
  locale,
  liveDemoLabel,
  viewCodeLabel,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const tA11y = useTranslations("accessibility");
  const externalLabel = tA11y("opensInNewTab");

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
              transition: { duration: 0.2 },
            }
      }
      className="h-full"
    >
      <Card
        className={cn(
          "h-full overflow-hidden transition-[box-shadow,border-color] duration-300",
          "hover:border-primary/30 hover:shadow-lg",
        )}
      >
        <div className="relative aspect-video overflow-hidden border-b border-border">
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className={cn(
              "object-cover",
              !shouldReduceMotion &&
                "transition-transform duration-500 hover:scale-[1.03]",
            )}
          />
        </div>
        <CardHeader>
          <h3 className="font-heading text-xl">{project.title[locale]}</h3>
          <CardDescription>{project.description[locale]}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          {project.liveUrl ? (
            <Button
              variant="default"
              size="sm"
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
        </CardFooter>
      </Card>
    </motion.div>
  );
}
