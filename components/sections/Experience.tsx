import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { experiences } from "@/data/experience";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  locale: Locale;
}

const timelineDotColors = [
  "bg-accent",
  "bg-secondary",
  "bg-[var(--primary-hover)]",
] as const;

export async function Experience({ locale }: ExperienceProps) {
  const t = await getTranslations("experience");

  return (
    <SectionReveal id="experience" className="section-padding bg-section-alt">
      <div className="section-inner">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <StaggerReveal className="relative ml-2 flex flex-col gap-6 border-l border-secondary/30 pl-7 sm:ml-0 sm:pl-9 md:gap-7">
          {experiences.map((item, index) => (
            <StaggerItem
              key={item.id}
              as="article"
              className="relative min-w-0"
            >
              <span
                className={cn(
                  "absolute top-1 -left-[calc(1.75rem+0.5px)] size-3 rounded-full ring-[3px] ring-section-alt sm:-left-[2.375rem]",
                  timelineDotColors[index % timelineDotColors.length],
                )}
              />
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-secondary dark:text-accent">
                  {item.period[locale]}
                </p>
                <h3 className="font-label text-lg font-semibold uppercase tracking-[0.06em] text-foreground sm:text-xl">
                  {item.role[locale]}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.company}
                </p>
                <ul className="mt-1 flex list-none flex-col gap-1 text-sm leading-relaxed text-muted-foreground">
                  {item.highlights[locale].map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </SectionReveal>
  );
}
