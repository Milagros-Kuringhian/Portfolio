import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n";

interface AboutProps {
  locale: Locale;
}

export async function About({ locale }: AboutProps) {
  const t = await getTranslations("about");

  return (
    <SectionReveal id="about" className="py-12 sm:py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 sm:gap-10 md:grid-cols-[1fr_1.4fr] md:items-start md:px-6">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>
        </div>
        <div className="flex min-w-0 flex-col gap-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{profile.bio[locale]}</p>
          <p className="border-l-4 border-secondary pl-4 font-medium text-foreground">
            {profile.availability[locale]}
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
