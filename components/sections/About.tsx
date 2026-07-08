import { ArrowRight, Heart, Rocket, Sparkles, Sprout } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface AboutProps {
  locale: Locale;
}

const valueIcons = {
  empathy: Heart,
  creativity: Sparkles,
  commitment: Rocket,
} as const;

const valueToneStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
} as const;

export async function About({ locale }: AboutProps) {
  const t = await getTranslations("about");

  return (
    <SectionReveal id="about" className="py-12 sm:py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-6">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex size-28 shrink-0 items-center justify-center rounded-3xl bg-accent shadow-[0_8px_30px_-8px_rgba(217,111,75,0.4)] sm:size-32">
              <Sprout className="size-12 text-primary-foreground" aria-hidden />
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {profile.bio[locale]}
              </p>
              <a
                href="#contact"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("learnMore")}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          <ul className="flex flex-col gap-5">
            {profile.values.map((value) => {
              const Icon =
                valueIcons[value.id as keyof typeof valueIcons] ?? Heart;

              return (
                <li key={value.id} className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full",
                      valueToneStyles[value.tone],
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {value.label[locale]}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description[locale]}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionReveal>
  );
}
