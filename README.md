# Portfolio Personal

Portfolio de una sola página para desarrollador/a frontend. Incluye secciones de presentación, proyectos, habilidades, experiencia, educación y contacto, con soporte bilingüe (ES/EN) y modo claro/oscuro.

## Stack tecnológico

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **next-intl** — internacionalización
- **next-themes** — tema claro/oscuro
- **Framer Motion** — animaciones sutiles

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El sitio redirige a `/es` por defecto.

### Estado local

El portfolio está **terminado para uso local** (fases 0–4). Incluye todas las secciones, i18n, temas, SEO, accesibilidad, 404, sitemap y robots.

**Pendiente cuando quieras:**
1. Personalizar contenido en `data/` y `public/cv.pdf`
2. Deploy en Vercel (fase 5)

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir build de producción |
| `npm run lint` | ESLint |

## Editar contenido

### Datos del portfolio (`data/`)

El contenido principal vive en archivos TypeScript tipados:

| Archivo | Contenido |
|---|---|
| `data/profile.ts` | Nombre, bio, email, redes, foto |
| `data/projects.ts` | Proyectos con título, descripción, tech stack |
| `data/skills.ts` | Categorías de habilidades |
| `data/experience.ts` | Experiencia laboral |
| `data/education.ts` | Formación académica |

Los campos traducibles usan el formato `{ es: "...", en: "..." }`.

### Textos de interfaz (`messages/`)

Labels de navegación, botones y metadata SEO:

- `messages/es.json`
- `messages/en.json`

### Assets estáticos (`public/`)

- `public/images/` — imágenes de proyectos y foto de perfil
- `public/cv.pdf` — currículum descargable
- `public/favicon.svg` — icono del sitio

## Cómo agregar un proyecto nuevo

1. **Agrega la imagen** en `public/images/` (ej. `project-mi-app.png`).

2. **Edita `data/projects.ts`** y añade una entrada al array:

```typescript
{
  id: "mi-app",
  title: { es: "Mi App", en: "My App" },
  description: {
    es: "Descripción breve del proyecto.",
    en: "Brief project description.",
  },
  image: "/images/project-mi-app.png",
  tech: ["Next.js", "TypeScript"],
  liveUrl: "https://mi-app.vercel.app", // opcional
  githubUrl: "https://github.com/usuario/mi-app",
},
```

3. **Verifica** en `/es` y `/en` que el proyecto aparece correctamente en la sección Proyectos.

## Variables de entorno

Para SEO y Open Graph en producción, define la URL pública del sitio:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Si no se define, se usa `http://localhost:3000` como fallback.

## Estructura del proyecto

```
app/[locale]/     → Rutas por idioma (/es, /en)
components/       → Layout, secciones y UI
data/             → Contenido editable
messages/         → Traducciones de interfaz
public/           → Assets estáticos
docs/             → PRD, RULES y plan de fases
```

## Documentación adicional

- [PRD](docs/PRD.md) — requisitos de producto
- [RULES](docs/RULES.md) — convenciones de código
- [PHASES](docs/PHASES.md) — plan de implementación por fases

## Deploy en Vercel

### Opción A — GitHub + Vercel (recomendada)

1. Crea un repositorio en GitHub y sube el código:

```bash
git add .
git commit -m "feat: portfolio completo con i18n, temas y secciones"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/portfolio.git
git push -u origin main
```

2. Entra en [vercel.com/new](https://vercel.com/new) e importa el repositorio.
3. En **Environment Variables**, agrega:
   - `NEXT_PUBLIC_SITE_URL` = URL de producción (ej. `https://portfolio.vercel.app`)
4. Deploy. Cada push a `main` generará un deploy de producción; otras ramas generan previews.

### Opción B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel link
vercel --prod
```

Configura `NEXT_PUBLIC_SITE_URL` en el dashboard de Vercel o con `vercel env add`.

### Checklist post-deploy

- [ ] `/es` y `/en` cargan correctamente
- [ ] Toggle de tema persiste
- [ ] Links externos (GitHub, LinkedIn) funcionan
- [ ] Descarga de `/cv.pdf` funciona
- [ ] Open Graph muestra título e imagen (probar con [opengraph.xyz](https://www.opengraph.xyz/))
