import { ArrowRight, Heart, Rocket, Sprout, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface AboutProps {
  locale: Locale;
}

const valueIcons = {
  empathy: Heart,
  teamwork: Users,
  commitment: Rocket,
} as const;

const valueToneStyles = {
  primary: "bg-primary/15 text-primary",
  secondary: "bg-secondary/30 text-secondary-foreground",
  accent: "bg-accent/15 text-accent",
} as const;

export async function About({ locale }: AboutProps) {
  const t = await getTranslations("about");

  return (
    <SectionReveal id="about" className="section-padding-about">
      <div className="section-inner gap-5 md:gap-7">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("title")}
          </h2>
          <span className="h-0.5 w-10 rounded-full bg-primary" aria-hidden />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-0">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5 lg:pr-10">
            <div className="flex size-[4.5rem] shrink-0 items-center justify-center rounded-[2rem_1.25rem_2rem_1.5rem] bg-accent sm:size-20">
              <Sprout
                className="size-8 text-primary-foreground sm:size-9"
                aria-hidden
              />
            </div>

            <div className="flex min-w-0 flex-col gap-3">
              <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
                {profile.bio[locale]}
              </p>
              <a
                href="#experience"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("learnMore")}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          <ul className="flex flex-col gap-5 border-border/70 lg:border-l lg:pl-10">
            {profile.values.map((value) => {
              const Icon =
                valueIcons[value.id as keyof typeof valueIcons] ?? Heart;

              return (
                <li key={value.id} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full",
                      valueToneStyles[value.tone],
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {value.label[locale]}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
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
