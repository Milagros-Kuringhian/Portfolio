import Image from "next/image";
import { getTranslations } from "next-intl/server";

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
      className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-8 overflow-hidden px-4 py-12 sm:gap-10 sm:py-16 md:flex-row md:items-center md:justify-between md:px-6 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--primary),transparent_82%)_0%,transparent_58%)]"
      />
      <div className="flex w-full min-w-0 max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            {profile.title[locale]}
          </p>
          <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg md:text-xl">
            {profile.tagline[locale]}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button className="w-full sm:w-auto" render={<a href="#projects" />}>
            {t("viewProjects")}
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            render={<a href="/cv.pdf" download="cv.pdf" />}
          >
            {t("downloadCv")}
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant="secondary"
            render={<a href="#contact" />}
          >
            {t("contact")}
          </Button>
        </div>
      </div>

      <div className="relative size-48 shrink-0 sm:size-56 md:size-72">
        <div
          aria-hidden
          className="absolute -inset-3 rounded-[3.5rem_2rem_3.5rem_2rem] bg-secondary/20 blur-xl"
        />
        <Image
          src={profile.image}
          alt={t("imageAlt", { name: profile.name })}
          width={288}
          height={288}
          priority
          className="size-full rounded-[3rem_1.5rem_3rem_1.5rem] object-cover shadow-md ring-2 ring-border"
        />
      </div>
    </SectionReveal>
  );
}
