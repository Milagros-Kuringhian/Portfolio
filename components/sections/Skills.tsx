import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
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
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      <div className="relative mx-auto mb-10 flex w-full max-w-6xl flex-col px-4 md:px-6">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
      </div>

      <div className="relative flex flex-col gap-8">
        {skillCategories.map((category, index) => (
          <div key={category.id} className="flex flex-col gap-4">
            <h3 className="px-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-secondary md:px-6">
              {category.label[locale]}
            </h3>
            <div
              className="relative left-1/2 w-screen -translate-x-1/2"
              aria-label={t("categorySkills", { category: category.label[locale] })}
            >
              <SkillsMarquee
                skills={category.skills}
                direction={index % 2 === 0 ? "left" : "right"}
                accent={
                  index % 3 === 0
                    ? "primary"
                    : index % 3 === 1
                      ? "secondary"
                      : "accent"
                }
              />
            </div>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}
