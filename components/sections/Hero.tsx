import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { HeroDecorations } from "@/components/layout/DecorativeShapes";
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
      className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 overflow-hidden px-4 py-14 sm:gap-12 sm:py-20 md:flex-row md:items-center md:justify-between md:px-6 md:py-28"
    >
      <HeroDecorations />

      <div className="relative z-10 flex w-full min-w-0 max-w-2xl flex-col gap-7">
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
            {t("greeting")}{" "}
            <span className="text-primary">{profile.firstName}.</span>
          </h1>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary sm:text-sm">
            {profile.title[locale]}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.tagline[locale]}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            className="h-11 w-full rounded-full px-6 sm:w-auto"
            render={<a href="#projects" />}
          >
            {t("viewProjects")}
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            className="h-11 w-full rounded-full border-accent bg-card px-6 text-foreground hover:bg-accent/10 sm:w-auto"
            variant="outline"
            render={<a href="#contact" />}
          >
            <Mail data-icon="inline-start" />
            {t("contact")}
          </Button>
        </div>
      </div>

      <div className="relative z-10 size-56 shrink-0 sm:size-64 md:size-80">
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[45%_55%_50%_50%] bg-secondary/30"
        />
        <div
          aria-hidden
          className="absolute -right-2 top-6 size-10 rounded-full bg-accent/80"
        />
        <div
          aria-hidden
          className="absolute -left-1 bottom-10 size-0 border-x-[14px] border-b-[24px] border-x-transparent border-b-primary/80"
        />
        <Image
          src={profile.image}
          alt={t("imageAlt", { name: profile.name })}
          width={320}
          height={320}
          priority
          className="relative size-full rounded-[42%_58%_48%_52%] object-cover shadow-lg ring-4 ring-card"
        />
      </div>
    </SectionReveal>
  );
}
