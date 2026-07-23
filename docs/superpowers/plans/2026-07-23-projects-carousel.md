# Projects Carousel + All Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** En la home, mostrar proyectos en carrusel horizontal (3 visibles + peek del 4º con fade y flechas) y abrir una página `/[locale]/projects` con el listado completo.

**Architecture:** Scroll nativo (`overflow-x-auto` + snap) en un client component `ProjectsCarousel` con flechas que llaman `scrollBy` y fades en los bordes según posición. La home reutiliza `ProjectCard`; la página nueva renderiza el mismo data source en grid. Sin librerías de carrusel.

**Tech Stack:** Next.js App Router, next-intl (`Link`, `useTranslations` / `getTranslations`), Framer Motion solo donde ya exista en cards, Tailwind, Lucide icons, TypeScript.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-23-projects-carousel-design.md`
- Sin Embla/Swiper u otra lib de carrusel
- Todos los proyectos de `data/projects.ts` en carrusel y en la página (sin `featured` por ahora)
- Pathname `/projects` en ambos locales
- Reutilizar `ProjectCard` sin cambiar su API pública
- Este repo no tiene suite de tests automatizados: verificar con `pnpm exec tsc --noEmit`, `pnpm build` y smoke visual

## File map

| File | Responsibility |
|------|----------------|
| `messages/es.json`, `messages/en.json` | Keys de carrusel, página all, volver |
| `components/sections/ProjectsCarousel.tsx` | Track scroll + flechas + fades (client) |
| `components/sections/Projects.tsx` | Home: título + Link a `/projects` + carrusel |
| `app/[locale]/projects/page.tsx` | Página listado completo + metadata |
| `app/sitemap.ts` | Incluir URLs `/[locale]/projects` |

---

### Task 1: Strings i18n

**Files:**
- Modify: `messages/es.json`
- Modify: `messages/en.json`

**Interfaces:**
- Produces: keys bajo `projects`: `carouselLabel`, `prev`, `next`, `allTitle`, `allSubtitle`, `back`

- [ ] **Step 1: Extender namespace `projects` en ES**

En `messages/es.json`, dentro de `"projects"`, agregar (mantener keys existentes):

```json
"carouselLabel": "Carrusel de proyectos",
"prev": "Proyectos anteriores",
"next": "Más proyectos",
"allTitle": "Todos los proyectos",
"allSubtitle": "Listado completo de trabajos de mi portfolio.",
"back": "Volver a proyectos"
```

- [ ] **Step 2: Extender namespace `projects` en EN**

En `messages/en.json`:

```json
"carouselLabel": "Projects carousel",
"prev": "Previous projects",
"next": "More projects",
"allTitle": "All projects",
"allSubtitle": "Full list of work from my portfolio.",
"back": "Back to projects"
```

- [ ] **Step 3: Commit**

```bash
git add messages/es.json messages/en.json
git commit -m "$(cat <<'EOF'
Agregar strings i18n para carrusel y página de proyectos.

EOF
)"
```

---

### Task 2: `ProjectsCarousel` (client)

**Files:**
- Create: `components/sections/ProjectsCarousel.tsx`

**Interfaces:**
- Consumes: `Project` from `@/data/projects`, `Locale` from `@/i18n`, `ProjectCard`, `Button`, Lucide `ChevronLeft`/`ChevronRight`, `useTranslations("projects")`, `cn`
- Produces: `ProjectsCarousel({ projects, locale, openProjectLabel, viewCodeLabel })`

- [ ] **Step 1: Crear el componente**

Crear `components/sections/ProjectsCarousel.tsx` con este contenido (ajustar imports solo si el path de Button/cn difiere; deben coincidir con el repo):

```tsx
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
      behavior: reduceMotion ? "auto" : "smooth",
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
              "snap-start shrink-0",
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
          "absolute top-1/2 left-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-border bg-card/95 shadow-sm backdrop-blur-sm",
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
          "absolute top-1/2 right-0 z-10 translate-x-1/2 -translate-y-1/2 rounded-full border-border bg-card/95 shadow-sm backdrop-blur-sm",
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
```

Notas de implementación:
- El fade usa `from-section-alt` porque la sección home tiene `bg-section-alt`. Si el token no existe como utility, usar `from-[var(--section-alt)]` o la clase de fondo real de la sección.
- Las flechas se centran en el borde del track; si salen del `section-inner`, envolver el carrusel en `relative` con padding horizontal mínimo o usar `left-2` / `right-2` en lugar de ±50% translate-x.

- [ ] **Step 2: Typecheck**

```bash
pnpm exec tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ProjectsCarousel.tsx
git commit -m "$(cat <<'EOF'
Agregar carrusel horizontal de proyectos con flechas y fade.

EOF
)"
```

---

### Task 3: Cablear home `Projects`

**Files:**
- Modify: `components/sections/Projects.tsx`

**Interfaces:**
- Consumes: `ProjectsCarousel`, `Link` from `@/i18n/navigation`
- Produces: sección home con link a `/projects` y carrusel en lugar del grid

- [ ] **Step 1: Reemplazar grid + link**

Actualizar `components/sections/Projects.tsx` a:

```tsx
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/SectionReveal";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { StickySectionHead } from "@/components/motion/StickySectionHead";
import { ProjectsCarousel } from "@/components/sections/ProjectsCarousel";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n";

interface ProjectsProps {
  locale: Locale;
}

export async function Projects({ locale }: ProjectsProps) {
  const t = await getTranslations("projects");

  return (
    <SectionReveal id="projects" className="section-padding bg-section-alt">
      <div className="section-inner">
        <StickySectionHead>
          <SectionTitle
            title={t("title")}
            subtitle={t("subtitle")}
            action={
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-accent dark:hover:text-secondary"
              >
                {t("viewAll")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            }
          />
        </StickySectionHead>

        <ProjectsCarousel
          projects={projects}
          locale={locale}
          openProjectLabel={t("openProject")}
          viewCodeLabel={t("viewCode")}
        />
      </div>
    </SectionReveal>
  );
}
```

Quitar imports de `StaggerReveal` / `StaggerItem` / `ProjectCard` si ya no se usan en este archivo.

- [ ] **Step 2: Typecheck**

```bash
pnpm exec tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 3: Smoke visual rápido**

Con `pnpm dev` en `/es`:
- 3 cards + peek del 4º en desktop
- Fade derecho visible
- Flecha derecha avanza; izquierda aparece tras scrollear
- “Ver todos” apunta a `/es/projects` (404 esperado hasta Task 4)

- [ ] **Step 4: Commit**

```bash
git add components/sections/Projects.tsx
git commit -m "$(cat <<'EOF'
Usar carrusel en la sección Proyectos de la home.

EOF
)"
```

---

### Task 4: Página `/[locale]/projects` + sitemap

**Files:**
- Create: `app/[locale]/projects/page.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `projects`, `ProjectCard`, `SectionTitle`, `Link`, `getTranslations`, `setRequestLocale`, `locales`
- Produces: página listado + entradas sitemap

- [ ] **Step 1: Crear la página**

Crear `app/[locale]/projects/page.tsx`:

```tsx
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { SectionTitle } from "@/components/layout/SectionTitle";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n";
import { locales } from "@/i18n";
import { Link } from "@/i18n/navigation";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("allTitle"),
    description: t("allSubtitle"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        es: "/es/projects",
        en: "/en/projects",
      },
    },
    openGraph: {
      title: t("allTitle"),
      description: t("allSubtitle"),
      url: `/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <section className="section-padding bg-section-alt">
      <div className="section-inner flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link
            href={{ pathname: "/", hash: "projects" }}
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-accent dark:hover:text-secondary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("back")}
          </Link>

          <SectionTitle title={t("allTitle")} subtitle={t("allSubtitle")} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              openProjectLabel={t("openProject")}
              viewCodeLabel={t("viewCode")}
              accentIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

Si `Link` de next-intl no acepta `href={{ pathname: "/", hash: "projects" }}` en esta versión, usar `href="/#projects"` o `href="/"` y documentar el fallback en el commit. Verificar contra el tipado de `createNavigation`.

- [ ] **Step 2: Actualizar sitemap**

Reemplazar el cuerpo de `app/sitemap.ts` para incluir home + projects:

```ts
import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) => [
    {
      url: `${siteConfig.url}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/${locale}/projects`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);
}
```

- [ ] **Step 3: Typecheck + build**

```bash
pnpm exec tsc --noEmit && pnpm build
```

Expected: exit 0; rutas `/es/projects` y `/en/projects` generadas.

- [ ] **Step 4: Smoke**

1. `/es/projects` muestra todos los proyectos del data file.
2. “Volver a proyectos” lleva a `/es#projects` (o home con ancla).
3. Desde home, “Ver todos” abre la página sin 404.

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/projects/page.tsx app/sitemap.ts
git commit -m "$(cat <<'EOF'
Agregar página de todos los proyectos y actualizar sitemap.

EOF
)"
```

---

### Task 5: Verificación final

**Files:** ninguno nuevo (solo checklist)

- [ ] **Step 1: Checklist visual (desktop ≥1024px)**

- [ ] 3 cards completas + peek del 4º
- [ ] Fade derecho al inicio; fade izquierdo tras scrollear
- [ ] Flechas sincronizadas con overflow
- [ ] Scroll trackpad/rueda funciona

- [ ] **Step 2: Checklist móvil (~375px)**

- [ ] ~1 card + peek
- [ ] Flechas usables al tap
- [ ] Cards no rompen el layout ni generan scroll horizontal de la página (solo del track)

- [ ] **Step 3: `prefers-reduced-motion`**

En DevTools → emulate reduced motion: el `scrollBy` no debe usar smooth (ya cubierto en el componente).

- [ ] **Step 4: Build final**

```bash
pnpm build
```

Expected: OK.

Si hubo fixes visuales menores (posición de flechas / token del fade), commit:

```bash
git add -u
git commit -m "$(cat <<'EOF'
Ajustar detalles visuales del carrusel de proyectos.

EOF
)"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Carrusel horizontal home | 2, 3 |
| 3 + peek + fade | 2 |
| Flechas + scroll manual | 2 |
| Link “Ver todos” → página | 3, 4 |
| Página todos los proyectos | 4 |
| Volver a `#projects` | 4 |
| i18n labels | 1 |
| Sitemap | 4 |
| a11y region + labels + reduced motion | 2 |
| Sin featured / sin lib carrusel | Global Constraints |
| Reutilizar ProjectCard | 2, 3, 4 |
