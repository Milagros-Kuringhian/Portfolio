import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { experiences } from "@/data/experience";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  locale: Locale;
}

const timelineDotColors = [
  "bg-secondary",
  "bg-primary",
  "bg-accent",
] as const;

export async function Experience({ locale }: ExperienceProps) {
  const t = await getTranslations("experience");

  return (
    <SectionReveal id="experience" className="py-12 sm:py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-6">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="relative flex flex-col gap-10 border-l-2 border-primary/25 pl-6 sm:pl-8">
          {experiences.map((item, index) => (
            <article key={item.id} className="relative min-w-0">
              <span
                className={cn(
                  "absolute top-3 -left-[calc(1.5rem+1px)] size-4 rounded-full ring-4 ring-background sm:-left-[2.06rem]",
                  timelineDotColors[index % timelineDotColors.length],
                )}
              />
              <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-[0_8px_30px_-12px_rgba(145,175,196,0.25)]">
                <p className="text-sm font-semibold text-primary">
                  {item.period[locale]}
                </p>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {item.role[locale]}
                </h3>
                <p className="text-sm font-medium text-secondary">
                  {item.company}
                </p>
                <ul className="mt-1 flex list-none flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
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
