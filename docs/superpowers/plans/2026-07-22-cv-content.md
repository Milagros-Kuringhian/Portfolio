# CV Content Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar placeholders del portfolio con datos reales del CV (foco tech + Encargada Delfino).

**Architecture:** Contenido en `data/` y `messages/`; UI de LinkedIn condicional cuando no hay URL.

**Tech Stack:** Next.js App Router, TypeScript, next-intl.

## Global Constraints

- Sin teléfono en la web
- LinkedIn = “Próximamente” (sin URL)
- Experiencia: Casa Okis + Encargada Delfino Dulce únicamente
- Proyectos: App Películas + Portfolio
- Spec: `docs/superpowers/specs/2026-07-22-cv-content-design.md`

---

### Task 1: Datos en `data/`

- [x] Actualizar `profile.ts`, `experience.ts`, `education.ts`, `skills.ts`, `projects.ts`
- [x] Copiar CV a `public/cv.pdf`

### Task 2: i18n + LinkedIn UI

- [x] Actualizar `messages/es.json` y `en.json` (hero, location, linkedinComingSoon)
- [x] Contact + Footer: LinkedIn no clickeable si vacío

### Task 3: Skill icons + verify

- [x] Ampliar `lib/skill-icons.ts` si hace falta
- [x] Typecheck / build OK
