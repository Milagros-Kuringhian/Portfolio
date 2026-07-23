import { GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { education } from "@/data/education";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface EducationProps {
  locale: Locale;
}

export async function Education({ locale }: EducationProps) {
  const t = await getTranslations("education");

  return (
    <SectionReveal id="education" className="section-padding flex flex-col justify-center">
      <div className="section-inner">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="flex flex-col">
          {education.map((item, index) => (
            <article
              key={item.id}
              className={cn(
                "flex min-w-0 flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
                index > 0 && "border-t border-border/60",
              )}
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="size-4" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {item.degree[locale]}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.institution}
                  </p>
                </div>
              </div>
              <p className="shrink-0 pl-12 text-sm font-medium text-primary sm:pl-0">
                {item.period[locale]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
