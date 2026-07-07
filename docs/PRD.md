# PRD — Portfolio Personal Frontend

**Product Requirements Document**  
Versión: 1.0  
Estado: Aprobado para implementación

---

## 1. Resumen

Portfolio personal de una sola página para un desarrollador/a frontend con experiencia básica. Debe verse profesional, tener estética cálida y personal, soportar modo claro/oscuro, y estar disponible en español (por defecto) e inglés con un switch que traduzca el sitio completo.

### Objetivo

Presentar habilidades, proyectos y trayectoria de forma clara y memorable para reclutadores, clientes potenciales y la comunidad dev.

### Usuarios objetivo

| Usuario | Necesidad |
|---|---|
| Reclutador/a | Evaluar skills y proyectos en < 2 minutos |
| Cliente potencial | Ver trabajos previos y forma de contacto |
| Otro/a desarrollador/a | Explorar código en GitHub, ver stack técnico |
| El propio autor | Actualizar contenido fácilmente sin tocar lógica |

---

## 2. Alcance

### Dentro del alcance (v1)

- Página única con scroll suave entre secciones
- 7 secciones: Hero, Sobre mí, Proyectos, Habilidades, Experiencia, Educación, Contacto
- Descarga de CV en PDF
- Toggle idioma ES ↔ EN (un idioma activo a la vez)
- Toggle tema claro ↔ oscuro
- Diseño responsive (mobile-first)
- Contenido placeholder bilingüe editable
- SEO básico y accesibilidad AA
- Animaciones sutiles al scroll

### Fuera del alcance (v1)

- Blog o artículos
- Panel de administración / CMS
- Backend propio o base de datos
- Autenticación de usuarios
- Formulario de contacto con envío real (v1: visual o mailto; v2: Formspree/Resend)
- Analytics (se puede agregar en v2)
- Deploy automático (fase posterior manual)

---

## 3. Requisitos globales

### RG-01 — Idioma

| ID | Requisito |
|---|---|
| RG-01.1 | Idioma por defecto: español |
| RG-01.2 | Botón visible para cambiar a inglés |
| RG-01.3 | Al cambiar idioma, **todo** el contenido visible se traduce |
| RG-01.4 | Nunca mostrar ES y EN mezclados en la misma vista |
| RG-01.5 | Persistir idioma elegido entre visitas |

### RG-02 — Tema

| ID | Requisito |
|---|---|
| RG-02.1 | Toggle claro/oscuro en el header |
| RG-02.2 | Por defecto, respetar preferencia del sistema operativo |
| RG-02.3 | Persistir elección del usuario en localStorage |
| RG-02.4 | Transición suave entre temas (~300ms) |
| RG-02.5 | Contraste legible en ambos modos |

### RG-03 — Diseño

| ID | Requisito |
|---|---|
| RG-03.1 | Estética cálida: crema, terracota, verde salvia |
| RG-03.2 | Tipografía con carácter (Fraunces + DM Sans) |
| RG-03.3 | Layout de página única con header fijo |
| RG-03.4 | Mobile-first, usable en 320px+ |
| RG-03.5 | Animaciones sutiles, no distractoras |

### RG-04 — Contenido editable

| ID | Requisito |
|---|---|
| RG-04.1 | Contenido dinámico en archivos `data/` |
| RG-04.2 | Textos de UI en `messages/es.json` y `messages/en.json` |
| RG-04.3 | Actualizar portfolio sin modificar componentes React |

### RG-05 — Rendimiento y calidad

| ID | Requisito |
|---|---|
| RG-05.1 | Build de producción sin errores TypeScript |
| RG-05.2 | Lighthouse Performance > 85 (objetivo) |
| RG-05.3 | Lighthouse Accessibility > 90 (objetivo) |
| RG-05.4 | Imágenes optimizadas con `next/image` |

---

## 4. Secciones — Requisitos detallados

### 4.1 Header (navegación global)

**Propósito:** Navegación persistente, cambio de idioma y tema.

| Elemento | Requisito |
|---|---|
| Logo / nombre | Link a inicio (scroll a Hero) |
| Nav links | Anclas a cada sección con scroll suave |
| Language toggle | Botón ES / EN, estado activo visible |
| Theme toggle | Icono sol (claro) / luna (oscuro) |
| Comportamiento | Fijo al scroll; fondo con blur o sólido según tema |
| Mobile | Menú hamburguesa o nav compacto |

**Criterios de aceptación:**
- [ ] Todos los links de nav llevan a la sección correcta
- [ ] Toggle de idioma cambia ruta y todo el contenido
- [ ] Toggle de tema funciona y persiste
- [ ] Header usable en móvil sin overflow

---

### 4.2 Hero

**Propósito:** Primera impresión. Quién soy, qué hago, qué acción tomar.

| Elemento | Requisito |
|---|---|
| Nombre | Texto prominente (h1) |
| Título profesional | Ej. "Desarrollador/a Frontend" |
| Tagline | Frase breve de valor (1 línea) |
| Foto / ilustración | Imagen con forma orgánica (no círculo genérico) |
| CTA primario | "Ver proyectos" → scroll a Projects |
| CTA secundario | "Descargar CV" → descarga `cv.pdf` |
| CTA terciario | "Contactar" → scroll a Contact |

**Contenido (data/profile.ts):**
- `name` (sin traducir)
- `title: { es, en }`
- `tagline: { es, en }`
- `image: string` (ruta a foto)

**Criterios de aceptación:**
- [ ] h1 único en la página
- [ ] Los 3 CTAs funcionan correctamente
- [ ] CV se descarga al hacer clic
- [ ] Textos cambian al switch de idioma
- [ ] Se ve bien en móvil y desktop

---

### 4.3 Sobre mí (About)

**Propósito:** Humanizar el portfolio. Motivación, personalidad, qué busco.

| Elemento | Requisito |
|---|---|
| Título de sección | Traducido vía messages |
| Bio | 2–3 oraciones en idioma activo |
| Foto | Opcional si no está en Hero; placeholder aceptable |
| Info adicional | Qué busco: empleo, freelance, aprendizaje |

**Contenido (data/profile.ts):**
- `bio: { es, en }`
- `availability: { es, en }` (ej. "Disponible para proyectos freelance")

**Criterios de aceptación:**
- [ ] Bio legible y no más de 4 oraciones
- [ ] Traducción completa al cambiar idioma
- [ ] Layout de dos columnas en desktop, una en móvil

---

### 4.4 Proyectos (Projects)

**Propósito:** Mostrar trabajo concreto y stack técnico.

| Elemento | Requisito |
|---|---|
| Grid de cards | Mínimo 3 proyectos placeholder |
| Por card | Imagen, título, descripción, badges de tech, links |
| Links | Demo en vivo (si existe) + GitHub |
| Hover | Efecto sutil (elevación o borde accent) |

**Contenido (data/projects.ts):**
```typescript
{
  id: string;
  title: { es, en };
  description: { es, en };
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
}
```

**Criterios de aceptación:**
- [ ] Mínimo 3 cards visibles
- [ ] Cada card tiene imagen, título, descripción y al menos 1 link
- [ ] Badges de tecnología visibles
- [ ] Links abren en nueva pestaña (`target="_blank"`)
- [ ] Grid responsive: 1 col móvil, 2 tablet, 3 desktop

---

### 4.5 Habilidades (Skills)

**Propósito:** Resumen rápido del stack y nivel de aprendizaje.

| Categoría | Ejemplos |
|---|---|
| Frontend | HTML, CSS, JavaScript, React, TypeScript |
| Herramientas | Git, Figma, VS Code |
| Aprendiendo | Next.js, Tailwind CSS |

| Elemento | Requisito |
|---|---|
| Agrupación | Por categoría con título traducido |
| Visualización | Badges, chips o lista con iconos |
| Honestidad | Categoría "Aprendiendo" visible |

**Contenido (data/skills.ts):**
- Categorías con `label: { es, en }` y array de skills (nombres técnicos sin traducir)

**Criterios de aceptación:**
- [ ] Mínimo 3 categorías
- [ ] Títulos de categoría traducidos
- [ ] Nombres de tecnologías consistentes (ej. "TypeScript", no "Typescript")

---

### 4.6 Experiencia (Experience)

**Propósito:** Trayectoria laboral o proyectos relevantes.

| Elemento | Requisito |
|---|---|
| Layout | Timeline vertical |
| Por entrada | Rol, empresa, período, 2–3 bullets de logros |
| Mínimo | 2 entradas placeholder |

**Contenido (data/experience.ts):**
```typescript
{
  id: string;
  role: { es, en };
  company: string;
  period: { es, en };  // ej. "2024 — Presente"
  highlights: { es: string[]; en: string[] };
}
```

**Criterios de aceptación:**
- [ ] Timeline visual clara con línea o marcadores
- [ ] Fechas y logros traducidos
- [ ] Orden cronológico descendente (más reciente primero)

---

### 4.7 Educación (Education)

**Propósito:** Formación académica y cursos relevantes.

| Elemento | Requisito |
|---|---|
| Layout | Cards o timeline compacto |
| Por entrada | Institución, título/carrera, año o período |
| Mínimo | 1 entrada placeholder |

**Contenido (data/education.ts):**
```typescript
{
  id: string;
  institution: string;
  degree: { es, en };
  period: string;
}
```

**Criterios de aceptación:**
- [ ] Al menos 1 entrada visible
- [ ] Título de carrera traducido
- [ ] Consistente visualmente con sección Experiencia

---

### 4.8 Contacto (Contact)

**Propósito:** Facilitar que me contacten.

| Elemento | Requisito |
|---|---|
| Email | Visible con botón "Copiar email" |
| Redes | Links a GitHub y LinkedIn con iconos |
| Formulario | Campos: nombre, email, mensaje (v1: visual o mailto) |
| CV | Botón repetido para descargar CV |

**Contenido (data/profile.ts):**
- `email: string`
- `github: string`
- `linkedin: string`

**Criterios de aceptación:**
- [ ] Email copiable al portapapeles con feedback visual
- [ ] Links a redes abren correctamente
- [ ] Formulario accesible por teclado
- [ ] Botón de CV funcional

---

### 4.9 Footer

**Propósito:** Cierre de página con info mínima.

| Elemento | Requisito |
|---|---|
| Copyright | Año actual + nombre |
| Links opcionales | Repetir GitHub / LinkedIn |

**Criterios de aceptación:**
- [ ] Año se actualiza automáticamente
- [ ] Consistente con tema claro/oscuro

---

## 5. Contenido placeholder (v1)

Hasta que el autor provea datos reales, usar contenido de ejemplo profesional:

| Dato | Placeholder |
|---|---|
| Nombre | "Tu Nombre" |
| Título | "Desarrollador/a Frontend" / "Frontend Developer" |
| Bio | 2–3 oraciones genéricas sobre pasión por el frontend |
| Proyectos | 3 proyectos ficticios con screenshots placeholder |
| Experiencia | 2 entradas (bootcamp, freelance o prácticas) |
| Educación | 1 entrada (carrera o bootcamp) |
| Email | placeholder@email.com |
| CV | PDF placeholder en `public/cv.pdf` |

---

## 6. Datos que el autor debe proveer (post-v1)

| Dato | Formato | Destino |
|---|---|---|
| Nombre completo | Texto | `data/profile.ts` |
| Foto de perfil | JPG/PNG | `public/images/` |
| Bio personal | Texto ES + EN | `data/profile.ts` |
| GitHub / LinkedIn / Email | URLs | `data/profile.ts` |
| Proyectos (mín. 2) | Datos + screenshot | `data/projects.ts` + `public/images/` |
| Experiencia | Rol, empresa, fechas, logros | `data/experience.ts` |
| Educación | Institución, título, año | `data/education.ts` |
| CV | PDF | `public/cv.pdf` |

---

## 7. Métricas de éxito

| Métrica | Objetivo |
|---|---|
| Tiempo de carga (LCP) | < 2.5s |
| Lighthouse Performance | > 85 |
| Lighthouse Accessibility | > 90 |
| Funciona en móvil | Sin scroll horizontal, nav usable |
| Cambio de idioma | 100% del contenido traducido |
| Cambio de tema | Sin elementos ilegibles |
| Actualizar un proyecto | Solo editar `data/projects.ts` |

---

## 8. Referencias de diseño

- **Paleta clara:** fondo `#FAF7F2`, texto `#2C2825`, acento `#C4714A`, secundario `#7A9E7E`
- **Paleta oscura:** fondo `#1C1917`, texto `#F5F0EB`, acentos más luminosos
- **Tipografía:** Fraunces (títulos) + DM Sans (cuerpo)
- **Tono:** cálido, humano, profesional sin ser corporativo frío
- **Evitar:** gradientes morados, Inter/Roboto, layout genérico de template
