import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { HeroScroll } from "@/components/motion/HeroScroll";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n";

interface HeroProps {
  locale: Locale;
}

function DotGrid({
  className,
  rows = 4,
  cols = 4,
}: {
  className?: string;
  rows?: number;
  cols?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${cols * 10} ${rows * 10}`}
      className={className}
    >
      {Array.from({ length: rows * cols }).map((_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;

        return (
          <circle
            key={index}
            cx={col * 10 + 5}
            cy={row * 10 + 5}
            r="1.6"
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}

function HeroAvatarDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Accent circle — peeks above the top-right rim */}
      <div className="absolute -right-[6%] -top-[4%] size-[28%] rounded-full bg-accent sm:-right-[8%] sm:-top-[6%] sm:size-[26%]" />

      {/* Soft dots — top left */}
      <DotGrid className="absolute -left-[2%] top-[2%] size-[20%] text-accent sm:-left-[4%] sm:size-[18%]" />

      {/* Caramel wave — bottom left, outside the circle rim */}
      <svg
        className="absolute -left-[8%] bottom-[6%] w-[48%] text-secondary sm:-left-[10%] sm:bottom-[4%] sm:w-[44%]"
        viewBox="0 0 120 28"
        fill="none"
      >
        <path
          d="M2 16C14 8 26 22 40 14C54 6 66 20 80 12C94 4 106 16 118 10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Slate dots — bottom right */}
      <DotGrid className="absolute -bottom-[2%] -right-[2%] size-[16%] text-muted-foreground sm:-right-[4%] sm:size-[14%]" />
    </div>
  );
}

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations("hero");

  return (
    <HeroScroll
      id="hero"
      className="section-padding-hero relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 overflow-visible px-4 sm:gap-12 md:flex-row md:items-center md:justify-between md:gap-8 md:px-6 lg:gap-12"
    >
      <div className="relative z-10 flex w-full min-w-0 flex-[1_1_52%] flex-col gap-6 md:max-w-[52%] md:gap-7">
        <div className="flex flex-col gap-4 md:gap-5">
          <p className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
            {profile.title[locale]}
          </p>

          <h1 className="font-heading text-4xl leading-[0.95] tracking-[0.015em] text-foreground uppercase sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]">
            {t.rich("headline", {
              highlight: (chunks) => (
                <span className="text-secondary dark:text-accent">{chunks}</span>
              ),
              accent: (chunks) => (
                <span className="text-secondary dark:text-accent">{chunks}</span>
              ),
            })}
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base md:max-w-lg">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            className="h-11 w-full rounded-md px-7 text-sm shadow-[0_4px_18px_-6px_rgba(var(--shadow-primary),0.35)] has-data-[icon=inline-end]:pr-7 sm:w-auto"
            render={<a href="#projects" />}
          >
            {t("viewProjects")}
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            className="h-11 w-full rounded-md px-7 text-sm has-data-[icon=inline-start]:pl-7 sm:w-auto"
            variant="outline"
            render={<a href="/cv.pdf" download="CV-Milagros.pdf" />}
          >
            <Download data-icon="inline-start" />
            {t("downloadCv")}
          </Button>
        </div>

        <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <span
            aria-hidden
            className="size-2 shrink-0 rounded-full bg-accent"
          />
          {profile.availability[locale]}
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-[1_1_48%] items-center justify-center md:max-w-[48%] md:justify-end">
        <div className="relative flex size-56 items-center justify-center sm:size-64 md:size-72 lg:size-80">
          <HeroAvatarDecor />
          <div className="relative z-10 size-full overflow-hidden rounded-full">
            <Image
              src={profile.image}
              alt={t("imageAlt", { name: profile.name })}
              width={320}
              height={320}
              priority
              className="size-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </HeroScroll>
  );
}
