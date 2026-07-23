# Gestor de Gastos Project Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar la tarjeta del proyecto Gestor de Gastos (PWA) al portfolio con screenshot recortado 16:10 y solo link a GitHub.

**Architecture:** Reutilizar el patrón existente de `data/projects.ts` + imagen en `public/images/`. Sin cambios de UI: `ProjectCard` ya muestra el primer item de `tech` como badge y omite el botón Live si no hay `liveUrl`.

**Tech Stack:** Next.js 16 App Router, TypeScript, `next/image`, macOS `sips` para recorte.

## Global Constraints

- Sin `liveUrl` / sin botón demo
- Título ES: `Gestor de Gastos`; EN: `Expense Tracker`
- `tech[0]` debe ser `PWA` (badge principal)
- GitHub: `https://github.com/Milagros-Kuringhian/Gestor-de-Gastos`
- Imagen destino: `public/images/gestor-de-gastos.png` (recorte 16:10)
- Orden: tercero, después de Landing Resina
- No tocar `ProjectCard.tsx` ni `Projects.tsx`
- Spec: `docs/superpowers/specs/2026-07-22-gestor-de-gastos-project-design.md`

## File map

| File | Responsibility |
|------|----------------|
| `public/images/gestor-de-gastos.png` | Screenshot landscape para la card |
| `data/projects.ts` | Entrada del proyecto (i18n + tech + urls) |

No hay suite de tests automatizados en el repo (`package.json` solo tiene `dev` / `build` / `lint` / `start`). La verificación es typecheck + inspección de datos + build.

---

### Task 1: Imagen recortada 16:10

**Files:**
- Create: `public/images/gestor-de-gastos.png`
- Source (read-only): `/Users/mili/.cursor/projects/Users-mili-Desktop-Portfolio/assets/image-dd99bdd1-66e5-45c0-8061-fe89797f0f0f.png` (492×1024)

**Interfaces:**
- Consumes: screenshot móvil vertical del usuario
- Produces: PNG landscape ~492×308 (ratio 16:10) usable como `project.image`

- [x] **Step 1: Verificar dimensiones del source**

Run:

```bash
sips -g pixelWidth -g pixelHeight "/Users/mili/.cursor/projects/Users-mili-Desktop-Portfolio/assets/image-dd99bdd1-66e5-45c0-8061-fe89797f0f0f.png"
```

Expected: `pixelWidth: 492`, `pixelHeight: 1024`

- [x] **Step 2: Copiar y recortar a 16:10 desde arriba**

Ancho = 492. Alto 16:10 = `round(492 * 10 / 16)` = **308**. Offset Y = **0** (fecha + saldo Disponible + inicio de Anotar).

Run:

```bash
cp "/Users/mili/.cursor/projects/Users-mili-Desktop-Portfolio/assets/image-dd99bdd1-66e5-45c0-8061-fe89797f0f0f.png" \
  "/Users/mili/Desktop/Portfolio/public/images/gestor-de-gastos.png"

sips --cropToHeightWidth 308 492 --cropOffset 0 0 \
  "/Users/mili/Desktop/Portfolio/public/images/gestor-de-gastos.png"
```

- [x] **Step 3: Verificar dimensiones del resultado**

Run:

```bash
sips -g pixelWidth -g pixelHeight "/Users/mili/Desktop/Portfolio/public/images/gestor-de-gastos.png"
```

Expected: width ≈ 492, height ≈ 308 (ratio 16:10). Abrir el archivo y confirmar que se ve el saldo y parte de las categorías (no solo la barra Android inferior).

Si el recorte corta demasiado el bloque Anotar, reintentar con `--cropOffset 40 0` o `60 0` (mismo alto 308) hasta que el contenido clave quede legible.

- [ ] **Step 4: Commit**

```bash
git add public/images/gestor-de-gastos.png
git commit -m "$(cat <<'EOF'
Add cropped Gestor de Gastos project card image.

EOF
)"
```

---

### Task 2: Entrada en `data/projects.ts`

**Files:**
- Modify: `data/projects.ts` (append third project after `landing-resina`)

**Interfaces:**
- Consumes: `Project` type y `LocalizedString` existentes; imagen `/images/gestor-de-gastos.png` de Task 1
- Produces: `projects[2]` con `id: "gestor-de-gastos"` consumido por `Projects` → `ProjectCard`

- [ ] **Step 1: Confirmar estado actual (2 proyectos)**

Run:

```bash
rg -n "id:" data/projects.ts
```

Expected: solo `app-peliculas` y `landing-resina`.

- [ ] **Step 2: Agregar la entrada del proyecto**

En `data/projects.ts`, después del objeto `landing-resina` (antes del cierre del array), agregar:

```ts
  {
    id: "gestor-de-gastos",
    title: {
      es: "Gestor de Gastos",
      en: "Expense Tracker",
    },
    description: {
      es: "PWA instalable para anotar ingresos, gastos y ahorros en 2 toques. Datos en el celular, con export CSV.",
      en: "Installable PWA to log income, expenses, and savings in 2 taps. Data stays on the phone, with CSV export.",
    },
    image: "/images/gestor-de-gastos.png",
    tech: ["PWA", "HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Milagros-Kuringhian/Gestor-de-Gastos",
  },
```

No agregar `liveUrl`.

- [ ] **Step 3: Verificar datos**

Run:

```bash
rg -n "gestor-de-gastos|PWA|liveUrl" data/projects.ts
```

Expected:
- `id: "gestor-de-gastos"` presente
- `PWA` como primer tech
- sin `liveUrl` en esa entrada

- [ ] **Step 4: Typecheck**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: exit 0, sin errores de tipo.

- [ ] **Step 5: Commit**

```bash
git add data/projects.ts
git commit -m "$(cat <<'EOF'
Add Gestor de Gastos project to portfolio data.

EOF
)"
```

---

### Task 3: Verificación visual y build

**Files:**
- Verify only (no code changes expected): `components/sections/Projects.tsx`, `components/sections/ProjectCard.tsx`, `public/images/gestor-de-gastos.png`, `data/projects.ts`

**Interfaces:**
- Consumes: `projects` array completo (3 items)
- Produces: confirmación de que la tercera card renderiza badge PWA, solo GitHub, e imagen correcta

- [ ] **Step 1: Build de producción**

Run:

```bash
pnpm build
```

Expected: build exitoso (sin errores de imagen faltante ni TypeScript).

- [ ] **Step 2: Smoke visual en dev**

Run:

```bash
pnpm dev
```

Abrir `http://localhost:3000` (y `/en` si aplica). En Projects verificar:

1. Tres cards: App Películas, Landing Resina, Gestor de Gastos
2. Badge principal de la tercera card = **PWA**
3. Solo botón de código/GitHub (sin Live/Demo)
4. Imagen legible (saldo / categorías) en desktop y viewport móvil

- [ ] **Step 3: Checklist del spec**

Marcar en la spec o mentalmente:

- [ ] Tres proyectos visibles
- [ ] Badge PWA
- [ ] Solo GitHub
- [ ] Imagen legible desktop/mobile
- [ ] ES/EN coherentes
- [ ] Build OK

Si algo falla, corregir en el archivo correspondiente (imagen = Task 1; copy/tech = Task 2) y re-correr el build.

---

## Plan self-review

1. **Spec coverage:** Contenido, imagen 16:10, sin liveUrl, badge PWA, orden tercero, sin UI — Tasks 1–3.
2. **Placeholders:** Ninguno.
3. **Consistency:** `id`, paths y copy alineados con el spec `2026-07-22-gestor-de-gastos-project-design.md`.
