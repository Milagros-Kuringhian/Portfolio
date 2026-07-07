import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { education } from "@/data/education";
import type { Locale } from "@/i18n";

interface EducationProps {
  locale: Locale;
}

export async function Education({ locale }: EducationProps) {
  const t = await getTranslations("education");

  return (
    <SectionReveal id="education" className="bg-muted/40 py-12 sm:py-16 md:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:gap-10 md:px-6">
        <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
          {t("title")}
        </h2>

        <div className="flex flex-col gap-6">
          {education.map((item) => (
            <article
              key={item.id}
              className="flex min-w-0 flex-col gap-2 border-b border-border pb-6 last:border-b-0 last:pb-0 md:flex-row md:items-baseline md:justify-between"
            >
              <div className="min-w-0">
                <h3 className="font-heading text-lg font-medium text-foreground sm:text-xl">
                  {item.degree[locale]}
                </h3>
                <p className="text-primary">{item.institution}</p>
              </div>
              <p className="shrink-0 text-sm font-medium text-muted-foreground">
                {item.period}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
