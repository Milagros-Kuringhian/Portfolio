import { getTranslations } from "next-intl/server";

import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { experiences } from "@/data/experience";
import type { Locale } from "@/i18n";

interface ExperienceProps {
  locale: Locale;
}

export async function Experience({ locale }: ExperienceProps) {
  const t = await getTranslations("experience");

  return (
    <SectionReveal id="experience" className="py-12 sm:py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:gap-10 md:px-6">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="relative flex flex-col gap-10 border-l-2 border-primary/30 pl-5 sm:pl-6">
          {experiences.map((item) => (
            <article key={item.id} className="relative min-w-0">
              <span className="absolute top-2 -left-[calc(1.25rem+1px)] size-3.5 rounded-full bg-primary ring-4 ring-background sm:-left-[1.72rem]" />
              <div className="flex flex-col gap-2 rounded-xl border border-border/70 bg-card/50 p-4 shadow-sm">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <h3 className="font-heading text-lg font-medium text-foreground sm:text-xl">
                    {item.role[locale]}
                  </h3>
                  <p className="shrink-0 text-sm text-muted-foreground">
                    {item.period[locale]}
                  </p>
                </div>
                <p className="text-sm font-medium text-primary">
                  {item.company}
                </p>
                <ul className="mt-2 flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
                  {item.highlights[locale].map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
