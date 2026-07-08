import { GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { education } from "@/data/education";
import type { Locale } from "@/i18n";

interface EducationProps {
  locale: Locale;
}

export async function Education({ locale }: EducationProps) {
  const t = await getTranslations("education");

  return (
    <SectionReveal
      id="education"
      className="bg-section py-12 sm:py-16 md:py-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-6">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="flex flex-col gap-4">
          {education.map((item) => (
            <article
              key={item.id}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-border/60 border-l-4 border-l-primary bg-card p-5 shadow-[0_8px_30px_-12px_rgba(20,43,69,0.12)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <GraduationCap className="size-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                    {item.degree[locale]}
                  </h3>
                  <p className="text-sm font-medium text-secondary">
                    {item.institution}
                  </p>
                </div>
              </div>
              <p className="shrink-0 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                {item.period}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
