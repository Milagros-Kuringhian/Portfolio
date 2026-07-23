# Design: Carrusel horizontal de proyectos + página “todos”

**Fecha:** 2026-07-23  
**Estado:** Aprobado en conversación — pendiente review del archivo  
**Enfoque:** Scroll nativo + flechas (sin librería de carrusel)

## Objetivo

En la home, mostrar proyectos en fila horizontal (no apilados) con pista clara de que hay más al costado. El link “Ver todos los proyectos” abre una página dedicada con el listado completo.

## Problema

- La sección `#projects` usa un grid vertical/multi-columna: todo queda uno debajo del otro o en filas estáticas.
- “Ver todos los proyectos” apunta a `#projects` y no abre una vista distinta.

## Decisiones acordadas

| Tema | Decisión |
|------|----------|
| Vista completa | Página nueva `/[locale]/projects` |
| Contenido del carrusel (hoy) | Todos los proyectos de `data/projects.ts` |
| Más adelante | Posible filtro “destacados” cuando haya muchos más |
| Interacción | Flechas clickeables **y** scroll manual (trackpad/dedo/rueda) |
| Implementación carrusel | Overflow-x nativo + `scrollBy` / snap; sin Embla/Swiper |
| Peek | Desktop: 3 cards completas + recorte del 4º con fade en el borde |
| Rutas i18n | Misma pathname `/projects` en `es` y `en` (por ahora) |

## Alcance

### Obligatorios

1. `ProjectsCarousel` (client) — fila scrollable, snap, flechas prev/next, fade de borde cuando hay overflow
2. Actualizar `components/sections/Projects.tsx` — usar carrusel; link “Ver todos” → página `/projects`
3. Página `app/[locale]/projects/page.tsx` — grid con todos los proyectos; título + volver a home
4. Strings i18n (`messages/es.json`, `messages/en.json`) — labels de flechas, página, volver
5. Sitemap / metadata básica de la nueva ruta (coherente con el resto del sitio)

### Fuera de alcance

- Filtrar “featured” vs resto (se pospone)
- Librería de carrusel
- Pathnames localizados (`/proyectos` vs `/projects`)
- Cambiar datos de proyectos (títulos, URLs, imágenes)
- Rediseñar `ProjectCard`

## Diseño visual — Home (carrusel)

### Layout

- Mantener `StickySectionHead` + `SectionTitle` + acción “Ver todos los proyectos”.
- Debajo: track horizontal con `overflow-x-auto` y `scroll-snap-type: x proximity` (snap suave sin pelear con el trackpad).
- Cada item: `scroll-snap-align: start`, ancho calculado para:
  - **Desktop:** ~3 cards visibles + peek del 4º (~15% de una card).
  - **Tablet:** ~2 + peek.
  - **Móvil:** ~1 + peek.
- Gap consistente con el design system actual (`gap-6` o equivalente).

### Pista de “hay más”

- **Fade** en el borde derecho del viewport del carrusel cuando hay contenido a la derecha. **Fade izquierdo** cuando `scrollLeft > 0`.
- **Flechas:** botón derecha visible si hay más a la derecha; izquierda solo si `scrollLeft > 0`. Clic = `scrollBy` aproximadamente el ancho de una card (+ gap).
- Estilo de flechas alineado a botones existentes (outline / icon button), no pills genéricos con glow.

### Cards

- Reutilizar `ProjectCard` sin cambios de API salvo clases de ancho del wrapper del carrusel (`shrink-0`, `h-full`).

## Diseño visual — Página `/[locale]/projects`

- Fondo / tipografía / spacing coherentes con secciones existentes (`section-padding`, `section-inner`).
- Título + subtítulo (pueden reutilizar o extender keys de `projects`).
- Control “Volver” → `/{locale}#projects` (vuelve a la sección Proyectos de la home).
- Grid responsive: `1` / `2` / `3` columnas, mismas cards que la home.
- Header/footer del layout `[locale]` se mantienen.

## Arquitectura de componentes

```
Projects (server)
  StickySectionHead + SectionTitle (Link → /projects)
  ProjectsCarousel (client)
    track (ref) + fade overlays
    prev/next buttons
    ProjectCard[] 

ProjectsPage (server)
  SectionTitle + back link
  grid → ProjectCard[]
```

### Datos

- Fuente única: `projects` en `data/projects.ts`.
- Sin campo `featured` por ahora.

### Accesibilidad

- Región del carrusel con nombre accesible (p. ej. `aria-label` desde i18n).
- Botones prev/next con `aria-label` y `disabled` (o `aria-disabled`) en extremos.
- Scroll nativo: teclado/trackpad siguen funcionando; no atrapar foco.
- Respetar `prefers-reduced-motion` en animaciones de scroll suave si se usan.

### i18n (keys nuevas sugeridas)

```json
"projects": {
  "carouselLabel": "...",
  "prev": "...",
  "next": "...",
  "allTitle": "...",
  "allSubtitle": "...",
  "back": "..."
}
```

(ajustar wording al tono actual del sitio)

## Testing manual

1. Home desktop: 3 cards + peek del 4º + fade derecho.
2. Flecha derecha avanza ~1 card; izquierda aparece tras scrollear.
3. Scroll manual (trackpad) funciona; flechas se sincronizan con posición.
4. “Ver todos” navega a `/es/projects` (y `/en/projects`).
5. Página lista todos los proyectos del data file.
6. Móvil: 1 + peek; flechas usables al tap.
7. `prefers-reduced-motion`: sin saltos molestos.

## Notas futuras

Cuando haya muchos proyectos: agregar `featured?: boolean` (o lista corta en home) y dejar la página `/projects` como catálogo completo.
