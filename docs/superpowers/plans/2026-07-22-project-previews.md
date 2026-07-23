# Project Previews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unificar el escenario visual de previews en ProjectCard y mostrar Gestor de Gastos como preview tipo teléfono.

**Architecture:** Extender `Project` con `preview?: "window" | "phone"`. `ProjectCard` renderiza un contenedor con fondo tintado + padding; window usa object-cover en marco interno; phone usa object-contain en columna estrecha centrada. Reemplazar asset de Gestor por captura vertical completa.

**Tech Stack:** Next.js Image, Tailwind, TypeScript, tokens CSS existentes (`muted`, `primary`, `--shadow-primary`).

## Global Constraints

- Sin frames realistas de iPhone/Mac
- Gestor: imagen vertical completa + `preview: "phone"`
- Películas/Resina: modo window (default)
- Spec: `docs/superpowers/specs/2026-07-22-project-previews-design.md`
- No cambiar copy/tech/URLs de proyectos

## File map

| File | Responsibility |
|------|----------------|
| `data/projects.ts` | Tipo `preview` + flag en Gestor |
| `public/images/gestor-de-gastos.png` | Screenshot vertical completo |
| `components/sections/ProjectCard.tsx` | Escenario + ramas window/phone |

---

### Task 1: Asset vertical de Gestor + dato `preview`

**Files:**
- Modify: `public/images/gestor-de-gastos.png`
- Modify: `data/projects.ts`

- [ ] **Step 1: Copiar captura completa**

```bash
cp "/Users/mili/.cursor/projects/Users-mili-Desktop-Portfolio/assets/image-dd99bdd1-66e5-45c0-8061-fe89797f0f0f.png" \
  "/Users/mili/Desktop/Portfolio/public/images/gestor-de-gastos.png"
sips -g pixelWidth -g pixelHeight public/images/gestor-de-gastos.png
```

Expected: ~492×1024 (portrait).

- [ ] **Step 2: Extender tipo y setear phone en Gestor**

En `data/projects.ts`:

```ts
export type Project = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  preview?: "window" | "phone";
};
```

En `gestor-de-gastos` agregar: `preview: "phone",`

- [ ] **Step 3: Typecheck**

```bash
pnpm exec tsc --noEmit
```

Expected: exit 0.

---

### Task 2: Escenario en `ProjectCard`

**Files:**
- Modify: `components/sections/ProjectCard.tsx`

- [ ] **Step 1: Reemplazar el bloque de imagen**

Sustituir el `div.aspect-[16/10]` actual por escenario con ramas `window` / `phone` según `project.preview ?? "window"`:

- Contenedor: `aspect-[16/10]`, fondo `bg-muted/60` + tinte primary suave, `p-3 sm:p-4`, flex center
- Window: marco `relative h-full w-full overflow-hidden rounded-lg shadow-md`; Image `fill object-cover`
- Phone: marco `relative h-full w-[42%] max-w-[11rem] overflow-hidden rounded-[1.25rem] shadow-md ring-1 ring-black/5`; Image `fill object-contain object-top` (o `object-cover` si el asset ya es portrait y el marco es portrait)

Hover scale: aplicar al marco interno, no al full-bleed.

- [ ] **Step 2: Build**

```bash
pnpm build
```

Expected: OK.

- [ ] **Step 3: Smoke visual**

En `/es` Projects: tres escenarios coherentes; Gestor como teléfono legible; Resina con separación del card.

---

## Plan self-review

1. Spec coverage: escenario, phone/window, asset vertical, sin frames hardware — Tasks 1–2.
2. Placeholders: ninguno.
3. Consistency: `preview` opcional con default window.
