import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SkillsMarquee } from "@/components/sections/SkillsMarquee";
import { skillCategories } from "@/data/skills";
import type { Locale } from "@/i18n";

interface SkillsProps {
  locale: Locale;
}

export async function Skills({ locale }: SkillsProps) {
  const t = await getTranslations("skills");

  return (
    <SectionReveal
      id="skills"
      className="border-y border-border py-12 sm:py-16 md:py-20"
    >
      <div className="mx-auto mb-10 flex w-full max-w-6xl flex-col gap-3 px-4 md:px-6">
        <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {skillCategories.map((category, index) => (
          <div key={category.id} className="flex flex-col gap-4">
            <h3 className="px-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-primary md:px-6">
              {category.label[locale]}
            </h3>
            <div
              className="relative left-1/2 w-screen -translate-x-1/2"
              aria-label={t("categorySkills", { category: category.label[locale] })}
            >
              <SkillsMarquee
                skills={category.skills}
                direction={index % 2 === 0 ? "left" : "right"}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}
