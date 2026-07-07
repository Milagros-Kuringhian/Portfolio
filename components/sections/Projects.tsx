import { getTranslations } from "next-intl/server";

import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n";

interface ProjectsProps {
  locale: Locale;
}

export async function Projects({ locale }: ProjectsProps) {
  const t = await getTranslations("projects");

  return (
    <SectionReveal id="projects" className="py-12 sm:py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:gap-10 md:px-6">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              liveDemoLabel={t("liveDemo")}
              viewCodeLabel={t("viewCode")}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
