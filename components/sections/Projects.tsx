import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n";

interface ProjectsProps {
  locale: Locale;
}

export async function Projects({ locale }: ProjectsProps) {
  const t = await getTranslations("projects");

  return (
    <SectionReveal id="projects" className="bg-section py-12 sm:py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-6">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
          action={
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("viewAll")}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              liveDemoLabel={t("liveDemo")}
              viewCodeLabel={t("viewCode")}
              accentIndex={index}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
