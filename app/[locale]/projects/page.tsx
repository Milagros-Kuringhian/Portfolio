import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { SectionTitle } from "@/components/layout/SectionTitle";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n";
import { locales } from "@/i18n";
import { Link } from "@/i18n/navigation";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("allTitle"),
    description: t("allSubtitle"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        es: "/es/projects",
        en: "/en/projects",
      },
    },
    openGraph: {
      title: t("allTitle"),
      description: t("allSubtitle"),
      url: `/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <section className="section-padding bg-section-alt">
      <div className="section-inner flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link
            href={{ pathname: "/", hash: "projects" }}
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-accent dark:hover:text-secondary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("back")}
          </Link>

          <SectionTitle title={t("allTitle")} subtitle={t("allSubtitle")} />
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              openProjectLabel={t("openProject")}
              viewCodeLabel={t("viewCode")}
              accentIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
