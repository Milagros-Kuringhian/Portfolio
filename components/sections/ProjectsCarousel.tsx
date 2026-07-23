"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

type ProjectsCarouselProps = {
  projects: Project[];
  locale: Locale;
  openProjectLabel: string;
  viewCodeLabel: string;
};

export function ProjectsCarousel({
  projects,
  locale,
  openProjectLabel,
  viewCodeLabel,
}: ProjectsCarouselProps) {
  const t = useTranslations("projects");
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setCanPrev(left > 4);
    setCanNext(left < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, projects.length]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-carousel-item]");
    const delta = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: direction * delta,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label={t("carouselLabel")}
        tabIndex={0}
        className={cn(
          "flex gap-6 overflow-x-auto pb-2",
          "scroll-smooth snap-x snap-proximity",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-carousel-item
            className={cn(
              "h-full snap-start shrink-0",
              // 1 + peek | 2 + peek | 3 + peek (~1.25rem)
              "w-[calc(100%-1.25rem)]",
              "sm:w-[calc((100%-1.5rem-1.25rem)/2)]",
              "lg:w-[calc((100%-3rem-1.25rem)/3)]",
            )}
          >
            <ProjectCard
              project={project}
              locale={locale}
              openProjectLabel={openProjectLabel}
              viewCodeLabel={viewCodeLabel}
              accentIndex={index}
            />
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-section-alt to-transparent transition-opacity duration-200",
          canPrev ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-section-alt to-transparent transition-opacity duration-200",
          canNext ? "opacity-100" : "opacity-0",
        )}
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full border-border bg-card/95 shadow-sm backdrop-blur-sm",
          !canPrev && "invisible pointer-events-none",
        )}
        aria-label={t("prev")}
        disabled={!canPrev}
        onClick={() => scrollByCard(-1)}
      >
        <ChevronLeft className="size-4" aria-hidden />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full border-border bg-card/95 shadow-sm backdrop-blur-sm",
          !canNext && "invisible pointer-events-none",
        )}
        aria-label={t("next")}
        disabled={!canNext}
        onClick={() => scrollByCard(1)}
      >
        <ChevronRight className="size-4" aria-hidden />
      </Button>
    </div>
  );
}
