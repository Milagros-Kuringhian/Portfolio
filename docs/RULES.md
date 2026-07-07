# RULES — Convenciones del proyecto

Reglas de código y estructura que deben mantenerse durante todo el desarrollo del portfolio. Si algo no está cubierto aquí, seguir las convenciones existentes en el código más cercano.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Next.js 15 (App Router) | Framework principal |
| TypeScript | Tipado en todo el proyecto |
| Tailwind CSS | Estilos |
| shadcn/ui | Componentes de UI reutilizables |
| next-intl | Internacionalización (ES/EN) |
| next-themes | Modo claro / oscuro |
| Framer Motion | Animaciones sutiles |

No agregar librerías nuevas sin justificación. Preferir soluciones nativas o las ya incluidas en el stack.

---

## Estructura de carpetas

```
Portfolio/
├── app/                    # Rutas y layouts de Next.js
│   ├── [locale]/           # Páginas por idioma
│   ├── globals.css         # Variables CSS y estilos globales
│   └── layout.tsx
├── components/
│   ├── layout/             # Header, Footer, toggles
│   ├── providers/          # ThemeProvider, etc.
│   ├── sections/           # Una sección = un archivo
│   └── ui/                 # Componentes shadcn (no editar a mano salvo personalización)
├── data/                   # Contenido editable (proyectos, experiencia, etc.)
├── messages/               # Textos de UI por idioma (es.json, en.json)
├── lib/                    # Utilidades y helpers
├── public/                 # Assets estáticos (imágenes, cv.pdf)
├── i18n.ts
└── middleware.ts
```

### Reglas de ubicación

- **Una sección = un componente** en `components/sections/`.
- **Todo contenido traducible** va en `data/` con campos `es` y `en`.
- **Textos de interfaz** (botones, labels, títulos de nav) van en `messages/`.
- **No mezclar** contenido editable dentro de componentes JSX.
- **No crear** carpetas nuevas sin necesidad; mantener la estructura plana y predecible.

---

## Convenciones de nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes React | PascalCase | `Hero.tsx`, `ThemeToggle.tsx` |
| Archivos de utilidades | kebab-case o camelCase | `utils.ts`, `get-locale.ts` |
| Funciones y variables | camelCase | `getProfile`, `activeLocale` |
| Tipos e interfaces | PascalCase | `Project`, `LocalizedString` |
| Constantes de datos | camelCase en el export | `projects`, `profile` |
| Clases CSS | Tailwind utilities | No crear clases custom salvo en `globals.css` |
| IDs de sección (anclas) | kebab-case en inglés | `id="about"`, `id="projects"` |

---

## Imports

- **Siempre al inicio del archivo.** Sin imports inline en cuerpos de funciones, tipos o campos de interfaces.
- Orden sugerido: React/Next → librerías externas → componentes internos → data/lib → tipos.
- Usar paths absolutos con alias `@/` cuando esté configurado.

```typescript
// Correcto
import { Hero } from "@/components/sections/Hero";
import { projects } from "@/data/projects";

// Incorrecto
function loadData() {
  const { projects } = require("@/data/projects"); // no
}
```

---

## Internacionalización (i18n)

### Principio fundamental

**Un solo idioma activo por vista.** Nunca mostrar español e inglés mezclados en la misma pantalla.

### Configuración

- Idioma por defecto: `es`
- Rutas: `/es` (o `/`) y `/en`
- Persistencia del idioma elegido vía cookie de next-intl

### Dónde va cada texto

| Tipo de texto | Ubicación | Ejemplo |
|---|---|---|
| Labels de UI, nav, botones | `messages/es.json`, `messages/en.json` | `"nav.projects": "Proyectos"` |
| Contenido dinámico (bio, proyectos) | `data/*.ts` con campos `es`/`en` | `title: { es: "...", en: "..." }` |
| Nombre propio, URLs, email | Sin traducir | `name: "Tu Nombre"` |

### En componentes

```typescript
// Correcto — leer locale activo y mostrar solo ese idioma
const t = useTranslations("hero");
const title = project.title[locale];

// Incorrecto — mezclar idiomas
<p>{profile.bio.es} / {profile.bio.en}</p>
```

### Al agregar contenido nuevo

1. Agregar la clave en `messages/es.json` y `messages/en.json`.
2. Si es contenido de data, agregar campos `es` y `en` en el archivo correspondiente.
3. Verificar ambos idiomas antes de dar por terminada la tarea.

---

## Temas (claro / oscuro)

- Usar **variables CSS** definidas en `globals.css`. No hardcodear colores hex en componentes.
- Usar clases de Tailwind con prefijo semántico: `bg-background`, `text-foreground`, `text-accent`, etc.
- El toggle usa `next-themes`; no implementar lógica de tema manual.
- Transición entre temas: `transition-colors duration-300`.
- Probar cada componente nuevo en **ambos modos** antes de cerrar la tarea.

### Paleta de referencia

| Token | Modo claro | Modo oscuro |
|---|---|---|
| Background | `#FAF7F2` | `#1C1917` |
| Foreground | `#2C2825` | `#F5F0EB` |
| Accent | `#C4714A` | `#D4845F` |
| Secondary | `#7A9E7E` | `#8FB393` |

---

## TypeScript

- Tipar explícitamente los archivos en `data/`.
- Exportar tipos junto a los datos: `export type Project = ...`.
- En `switch` sobre unions o enums, usar caso `default` con `never` para exhaustividad:

```typescript
switch (locale) {
  case "es":
  case "en":
    return messages[locale];
  default: {
    const _exhaustive: never = locale;
    return _exhaustive;
  }
}
```

- Evitar `any`. Usar `unknown` si el tipo es incierto y narrowing después.
- Preferir `interface` para objetos de datos, `type` para unions y utilidades.

---

## Componentes React

- Componentes de sección: **Server Components** por defecto. Usar `"use client"` solo cuando haya interactividad (toggles, formularios, animaciones).
- Props tipadas con interface.
- Sin lógica de negocio pesada en JSX; extraer a funciones en `lib/` si crece.
- Máximo ~150 líneas por componente; si supera, dividir.

```typescript
// Estructura sugerida de una sección
interface AboutProps {
  locale: Locale;
}

export function About({ locale }: AboutProps) {
  const content = profile.bio[locale];
  // ...
}
```

---

## Estilos y diseño

- **Mobile-first:** diseñar para móvil, luego `md:` y `lg:`.
- **Tipografías:** Fraunces (display) + DM Sans (cuerpo). No usar Inter, Roboto ni Arial.
- **Espaciado:** consistente con escala de Tailwind (`4`, `6`, `8`, `12`, `16`, `24`).
- **Bordes:** `rounded-xl` o `rounded-2xl` para cards.
- **Sombras:** suaves (`shadow-sm`, `shadow-md`), nunca dramáticas.
- **Animaciones:** sutiles con Framer Motion; no abusar. Una animación de entrada por sección es suficiente.

---

## Datos (`data/`)

### Formato estándar para contenido traducible

```typescript
export type LocalizedString = {
  es: string;
  en: string;
};

export type Project = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
};
```

### Reglas

- Cada entidad tiene un `id` único y estable (no usar índices de array).
- Imágenes en `public/images/` con nombres descriptivos: `project-weather-app.png`.
- URLs absolutas para links externos; rutas relativas para assets locales.

---

## Accesibilidad

- Toda imagen tiene `alt` descriptivo.
- Botones e iconos interactivos tienen `aria-label` si no tienen texto visible.
- Contraste mínimo WCAG AA en ambos temas.
- Navegación por teclado funcional (focus visible con `focus-visible:ring`).
- Respetar `prefers-reduced-motion`: desactivar animaciones si está activo.
- Landmarks semánticos: `<header>`, `<main>`, `<section>`, `<footer>`.

---

## SEO

- Metadata en `app/[locale]/layout.tsx` o `page.tsx` por idioma.
- `title`, `description` y Open Graph traducidos.
- Un solo `<h1>` por página (en Hero).
- Jerarquía de headings correcta: `h1` → `h2` por sección → `h3` si aplica.

---

## Git y commits

- No commitear: `.env`, `.env.local`, credenciales, `node_modules/`, `.next/`.
- Mensajes de commit en español o inglés, pero consistentes dentro del repo.
- Formato sugerido: `tipo: descripción breve` — ej. `feat: agregar sección Projects`, `fix: contraste en modo oscuro`.
- Un commit por tarea lógica; no mezclar refactors grandes con features.

---

## Qué evitar

- Colores hardcodeados en componentes (`text-[#C4714A]` → usar token `text-accent`).
- Texto visible hardcodeado en JSX (usar `messages/` o `data/`).
- Imports inline o dinámicos innecesarios.
- Componentes monolíticos de 300+ líneas.
- Librerías duplicadas para lo mismo (ej. dos libs de animación).
- Mezclar idiomas en la misma vista.
- Estilos inline (`style={{}}`) salvo casos excepcionales (ej. Framer Motion).
- Comentarios obvios; solo comentar lógica no evidente.

---

## Checklist antes de cerrar una tarea

- [ ] Funciona en modo claro y oscuro
- [ ] Funciona en español e inglés (sin mezcla)
- [ ] Responsive en móvil, tablet y desktop
- [ ] Sin errores de TypeScript (`npm run build` pasa)
- [ ] Sin warnings de ESLint relevantes
- [ ] Accesibilidad básica verificada
- [ ] Contenido editable desde `data/` o `messages/`, no hardcodeado
