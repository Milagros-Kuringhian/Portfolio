import { getTranslations } from "next-intl/server";

import { SkillsDecorations } from "@/components/layout/DecorativeShapes";
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
      className="relative section-padding-tight-top overflow-hidden"
    >
      <SkillsDecorations />

      <div className="section-inner relative z-10">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="flex flex-col gap-5 md:gap-6">
          {skillCategories.map((category, index) => (
            <div key={category.id} className="flex flex-col gap-2.5">
              <h3 className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {category.label[locale]}
              </h3>
              <div
                className="relative left-1/2 w-screen -translate-x-1/2"
                aria-label={t("categorySkills", {
                  category: category.label[locale],
                })}
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
      </div>
    </SectionReveal>
  );
}
