import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { StickySectionHead } from "@/components/motion/StickySectionHead";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n";

interface ProjectsProps {
  locale: Locale;
}

export async function Projects({ locale }: ProjectsProps) {
  const t = await getTranslations("projects");

  return (
    <SectionReveal id="projects" className="section-padding bg-section-alt">
      <div className="section-inner">
        <StickySectionHead>
          <SectionTitle
            title={t("title")}
            subtitle={t("subtitle")}
            action={
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-accent dark:hover:text-secondary"
              >
                {t("viewAll")}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            }
          />
        </StickySectionHead>

        <StaggerReveal className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <StaggerItem key={project.id} className="h-full">
              <ProjectCard
                project={project}
                locale={locale}
                openProjectLabel={t("openProject")}
                viewCodeLabel={t("viewCode")}
                accentIndex={index}
              />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </SectionReveal>
  );
}
