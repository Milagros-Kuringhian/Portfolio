# Design: Completar portfolio con datos reales del CV

**Fecha:** 2026-07-22  
**Estado:** Aprobado en conversación — pendiente review del archivo  
**Enfoque:** Foco tech (Enfoque 3) + Encargada en Delfino Dulce

## Objetivo

Reemplazar placeholders del portfolio con datos reales de Milagros Sol Kuringhian (CV PDF), manteniendo la estructura actual (`data/` + `messages/`) y sin rediseñar el sitio.

## Decisiones acordadas

| Tema | Decisión |
|------|----------|
| Enfoque | Tech-focused: no incluir Nani Cocina Armenia |
| Experiencia | Casa Okis + Pastelería Delfino Dulce (Encargada) |
| Proyectos | Solo App Películas + este Portfolio |
| GitHub | `https://github.com/Milagros-Kuringhian` |
| LinkedIn | Sin URL → mostrar como “Próximamente” |
| Teléfono | No en la web pública |
| CV PDF | Sustituir `public/cv.pdf` con el PDF real del usuario |

## Alcance (archivos)

### Obligatorios

1. `data/profile.ts` — identidad, bio, contacto, LinkedIn vacío/próximamente
2. `data/experience.ts` — 2 roles reales
3. `data/education.ts` — Da Vinci + Marie Manoogian
4. `data/skills.ts` — categorías alineadas al CV (+ stack del portfolio)
5. `data/projects.ts` — 2 proyectos reales
6. `messages/es.json` + `messages/en.json` — hero/contacto/ubicación; labels LinkedIn “Próximamente”
7. `public/cv.pdf` — copiar desde `~/Downloads/CV-Milagros.pdf`
8. `components/sections/Contact.tsx` + `components/layout/Footer.tsx` — LinkedIn no clickeable o con estado “próximamente” cuando no hay URL

### Fuera de alcance

- Nuevas secciones (idiomas, soft skills como bloques propios)
- Experiencia en Nani Cocina Armenia / producción-camarera en Delfino (salvo rol Encargada)
- Teléfono en Contact
- Proyectos placeholder (Weather App, Task Manager)
- Rediseño visual / nuevas animaciones

## Contenido a cargar

### Perfil

- **name:** Milagros Sol Kuringhian  
- **firstName:** Milagros (o “Milagros Kuringhian” según uso actual en nav — preferir short brand: Milagros)  
- **title:** Desarrolladora Frontend Junior / Junior Frontend Developer  
- **bio:** Basada en el CV: estudiante de Programación y Diseño Web; experiencia en e-commerce y gestión comercial; interés en roles junior de frontend, e-commerce o soporte digital. ES + EN.  
- **email:** milikuri2003@gmail.com  
- **github:** https://github.com/Milagros-Kuringhian  
- **linkedin:** vacío o sentinel (ej. `""`) — UI muestra “Próximamente”  
- **availability:** Disponible para oportunidades junior  
- **location (messages):** CABA, Argentina  

### Experiencia

1. **Casa Okis** — Asistente comercial y de e-commerce — 2024 – Actualidad  
   - Gestión y actualización de productos en Mercado Libre, Tiendanube y sitio web  
   - Control de stock, facturación y tareas administrativas  
   - Atención al cliente y apoyo operativo  

2. **Pastelería Delfino Dulce** — Encargada — Abr 2023 – Nov 2023  
   - Highlights alineados a rol de encargada (organización, coordinación, atención al cliente / operación). ES + EN.  
   - Nota: el CV PDF listaba producción/camarera; la usuaria pidió explícitamente el cargo **Encargada**.

### Educación

1. Escuela Da Vinci — Programación y Diseño Web — En curso  
2. Instituto Marie Manoogian — Bachiller en Economía y Administración — Finalizado  

### Skills

- **Frontend:** HTML, CSS, JavaScript, Vue, TypeScript, React, Next.js  
- **CMS / E-commerce:** WordPress, Elementor, WooCommerce, Tiendanube  
- **Diseño:** Figma, Illustrator, Photoshop  
- Actualizar `lib/skill-icons.ts` solo si faltan iconos para skills nuevas (Vue, Tiendanube, etc.) — fallback genérico OK.

### Proyectos

1. **App Películas** — repo `Milagros-Kuringhian/App-Peliculas` (mantener imagen existente)  
2. **Portfolio** — repo `Milagros-Kuringhian/Portfolio`  

Eliminar Weather App y Task Manager.

## LinkedIn “Próximamente”

- Si `profile.linkedin` está vacío: no renderizar `<a href>`, mostrar texto/badge “Próximamente” / “Coming soon”  
- Footer: ocultar icono LinkedIn o mostrarlo deshabilitado con aria adecuado  
- Preferencia: Contact muestra “LinkedIn — Próximamente”; Footer solo GitHub si no hay LinkedIn  

## i18n / SEO

- Actualizar `hero.description` para reflejar perfil junior + e-commerce (sin inventar skills)  
- `contact.locationValue`: CABA, Argentina  
- Metadata usa `profile.name` → corregir `name` de “Portfolio” al nombre real  

## Verificación

- [ ] Secciones Hero, About, Experience, Education, Skills, Projects, Contact muestran datos reales  
- [ ] No hay links a `https://github.com` genérico ni `linkedin.com` genérico  
- [ ] CV descargable es el PDF del usuario  
- [ ] Build / typecheck OK  
- [ ] ES y EN coherentes  

## No hacer

- No inventar URLs live de demos sin confirmación  
- No publicar teléfono  
- No incluir Nani  
- No ampliar scope a rediseño
