import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { StickySectionHead } from "@/components/motion/StickySectionHead";
import { ProjectsCarousel } from "@/components/sections/ProjectsCarousel";
import { Link } from "@/i18n/navigation";
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
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-accent dark:hover:text-secondary"
              >
                {t("viewAll")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            }
          />
        </StickySectionHead>

        <ProjectsCarousel
          projects={projects}
          locale={locale}
          openProjectLabel={t("openProject")}
          viewCodeLabel={t("viewCode")}
        />
      </div>
    </SectionReveal>
  );
}
