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

/** Soft decelerate — matches site motion language (ease-out). */
function easeOutQuint(t: number) {
  return 1 - (1 - t) ** 5;
}

const SCROLL_DURATION_MS = 900;

export function ProjectsCarousel({
  projects,
  locale,
  openProjectLabel,
  viewCodeLabel,
}: ProjectsCarouselProps) {
  const t = useTranslations("projects");
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRafRef = useRef<number | null>(null);
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
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [updateScrollState, projects.length]);

  const animateScrollTo = useCallback((targetLeft: number) => {
    const el = trackRef.current;
    if (!el) return;

    if (scrollRafRef.current !== null) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const end = Math.min(Math.max(0, targetLeft), maxScroll);
    const start = el.scrollLeft;
    const distance = end - start;

    if (Math.abs(distance) < 1) return;

    // Avoid snap fighting the ease (double-jump at the end)
    const prevSnap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / SCROLL_DURATION_MS);
      el.scrollLeft = start + distance * easeOutQuint(t);

      if (t < 1) {
        scrollRafRef.current = requestAnimationFrame(step);
        return;
      }

      scrollRafRef.current = null;
      el.style.scrollSnapType = prevSnap;
      updateScrollState();
    };

    scrollRafRef.current = requestAnimationFrame(step);
  }, [updateScrollState]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-carousel-item]");
    const delta = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      el.scrollBy({ left: direction * delta, behavior: "instant" });
      return;
    }

    animateScrollTo(el.scrollLeft + direction * delta);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label={t("carouselLabel")}
        tabIndex={0}
        className={cn(
          "flex items-stretch gap-6 overflow-x-auto py-1",
          // Soft snap for touch/trackpad; arrows use custom eased scroll
          "snap-x snap-proximity scroll-pl-1 scroll-pr-1",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-carousel-item
            className={cn(
              // Inset keeps ring inside the item; first/last margin survives snap via scroll-padding
              "flex snap-start shrink-0 self-stretch p-0.5",
              index === 0 && "ml-1",
              index === projects.length - 1 && "mr-1",
              // 1 + peek | 2 + peek | 3 + peek (~1.5rem)
              "w-[calc(100%-1.5rem)]",
              "sm:w-[calc((100%-1.5rem-1.5rem)/2)]",
              "lg:w-[calc((100%-3rem-1.5rem)/3)]",
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
          "pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-section-alt to-transparent transition-opacity duration-200",
          canPrev ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-section-alt to-transparent transition-opacity duration-200",
          canNext ? "opacity-100" : "opacity-0",
        )}
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "absolute top-1/2 left-1 z-10 -translate-y-1/2 rounded-full border-border bg-card/95 shadow-sm backdrop-blur-sm",
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
          "absolute top-1/2 right-1 z-10 -translate-y-1/2 rounded-full border-border bg-card/95 shadow-sm backdrop-blur-sm",
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
