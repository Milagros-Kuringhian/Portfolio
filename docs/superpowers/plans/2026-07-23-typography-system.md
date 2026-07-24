# Typography System Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Wire Bebas Neue / Barlow Condensed / Inter and apply the approved hierarchy across the portfolio.

**Architecture:** Load three Google fonts via `next/font` in root layout; expose CSS variables; map Tailwind `font-sans`, `font-heading`, `font-label`; update heading/label components.

**Tech Stack:** Next.js App Router, `next/font/google`, Tailwind v4 `@theme inline`

## Global Constraints

- Bebas Neue titles: uppercase, line-height 0.9–1, slight letter-spacing
- Barlow Condensed only for short labels/subtitles/card titles — never long paragraphs
- Inter for body, nav, buttons
- No layout/color refactors

---

### Task 1: Font loading + theme tokens

**Files:** `app/layout.tsx`, `app/globals.css`

- [x] Replace DM_Sans / Plus_Jakarta_Sans with Inter, Bebas_Neue, Barlow_Condensed
- [x] Variables: `--font-sans`, `--font-display`, `--font-label`
- [x] `@theme`: `font-heading`, `font-label`; keep `font-sans`
- [x] Base `h1,h2` → display; do not force display on all `h3,h4`

### Task 2: Shared title components

**Files:** `components/layout/SectionTitle.tsx`, `components/layout/SectionHeader.tsx`

- [x] Apply Bebas styles to h2 (uppercase, leading ~0.95, slight tracking)
- [x] Subtitles → keep Inter for longer descriptive copy

### Task 3: Sections + cards + chrome

**Files:** Hero, About, Contact, Experience, Education, Skills, ProjectCard, Header, not-found, card Title, projects page labels

- [x] Hero/section display titles → `font-heading` + display rules
- [x] Card/job h3 → `font-label` uppercase
- [x] Eyebrows/badges/uppercase labels → `font-label`
- [x] Header brand → `font-heading`; nav links stay Inter
- [x] Buttons/paragraphs unchanged (inherit Inter)

### Task 4: Verify

- [x] Visual check on `/` and `/projects` light/dark
- [x] Confirm no Barlow on long paragraphs
