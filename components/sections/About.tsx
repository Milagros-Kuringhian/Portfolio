import { getTranslations } from "next-intl/server";

import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n";

interface AboutProps {
  locale: Locale;
}

export async function About({ locale }: AboutProps) {
  const t = await getTranslations("about");

  return (
    <SectionReveal id="about" className="bg-muted/20 py-12 sm:py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:items-start md:px-6">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="flex min-w-0 flex-col gap-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{profile.bio[locale]}</p>
          <p className="rounded-xl border border-border/80 border-l-4 border-l-secondary bg-card/70 p-4 font-medium text-foreground shadow-sm">
            {profile.availability[locale]}
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
