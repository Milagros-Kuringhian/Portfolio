import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CoralWave, HeroDecorations } from "@/components/layout/DecorativeShapes";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n";

interface HeroProps {
  locale: Locale;
}

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations("hero");

  return (
    <SectionReveal
      id="hero"
      className="section-padding-hero relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 overflow-hidden px-4 sm:gap-12 md:max-h-[720px] md:min-h-[580px] md:flex-row md:items-center md:justify-between md:gap-8 md:px-6 lg:gap-10"
    >
      <HeroDecorations />

      <div className="relative z-10 flex w-full min-w-0 flex-[1_1_45%] flex-col gap-5 md:max-w-[45%] md:gap-6">
        <div className="flex flex-col gap-3 md:gap-4">
          <h1 className="font-heading leading-[1.05] tracking-tight">
            <span className="block text-3xl font-bold text-foreground sm:text-4xl md:text-[2.75rem] lg:text-5xl">
              {t("greeting")}
            </span>
            <span className="mt-1 block text-4xl font-bold text-primary sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem]">
              {profile.firstName}
              <span className="text-accent">.</span>
            </span>
          </h1>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-secondary sm:text-xs">
            {profile.title[locale]}
          </p>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base md:max-w-lg">
            {profile.tagline[locale]}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            className="h-11 w-full rounded-full px-7 text-sm shadow-[0_4px_18px_-6px_rgba(var(--shadow-primary),0.35)] sm:w-auto"
            render={<a href="#projects" />}
          >
            {t("viewProjects")}
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            className="h-11 w-full rounded-full border-accent bg-background px-7 text-sm text-accent shadow-[0_2px_12px_-4px_rgba(var(--shadow-accent),0.2)] hover:bg-accent/5 sm:w-auto"
            variant="outline"
            render={<a href="#contact" />}
          >
            <Mail data-icon="inline-start" />
            {t("contact")}
          </Button>
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-[1_1_55%] items-center justify-center md:max-w-[55%] md:justify-end">
        <div className="relative size-52 sm:size-60 md:size-64 lg:size-72">
          <div
            aria-hidden
            className="absolute -inset-10 rounded-[48%_52%_50%_50%] bg-secondary/45 max-sm:-inset-6"
          />
          <div
            aria-hidden
            className="absolute -right-5 top-6 size-14 rounded-full bg-accent/85 sm:size-16"
          />
          <div
            aria-hidden
            className="absolute -left-3 bottom-14 size-0 border-x-[12px] border-b-[20px] border-x-transparent border-b-primary/75 max-sm:bottom-10"
          />
          <div
            aria-hidden
            className="absolute -bottom-1 left-1/2 h-14 w-36 -translate-x-1/2 rounded-t-full bg-[var(--soft-sky)]/55 sm:h-16 sm:w-40"
          />
          <CoralWave className="absolute -bottom-7 -left-6 w-24 opacity-90 sm:w-28 max-sm:hidden" />
          <div
            aria-hidden
            className="absolute -top-2 right-6 size-3 rounded-full bg-primary/50"
          />
          <div
            aria-hidden
            className="absolute bottom-20 -right-2 size-2 rounded-full bg-accent/70 max-sm:hidden"
          />
          <Image
            src={profile.image}
            alt={t("imageAlt", { name: profile.name })}
            width={288}
            height={288}
            priority
            className="relative size-full rounded-[44%_56%_48%_52%] object-cover shadow-[0_18px_44px_-18px_rgba(var(--shadow-primary),0.28)]"
          />
        </div>
      </div>
    </SectionReveal>
  );
}
