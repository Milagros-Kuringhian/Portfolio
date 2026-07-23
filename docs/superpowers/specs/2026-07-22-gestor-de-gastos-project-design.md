# Design: Agregar proyecto Gestor de Gastos al portfolio

**Fecha:** 2026-07-22  
**Estado:** Aprobado en conversación — pendiente review del archivo  
**Enfoque:** Datos + badge PWA (Enfoque 2)

## Objetivo

Sumar el repositorio [Gestor-de-Gastos](https://github.com/Milagros-Kuringhian/Gestor-de-Gastos) como tercera tarjeta en la sección Projects, con énfasis en que es una PWA, sin URL de demo y con screenshot recortado para la card.

## Decisiones acordadas

| Tema | Decisión |
|------|----------|
| Repo | `https://github.com/Milagros-Kuringhian/Gestor-de-Gastos` |
| Título | Gestor de Gastos / Expense Tracker |
| Demo / liveUrl | No — solo GitHub |
| Imagen | Screenshot del usuario, recortado a 16:10 |
| Badge / tech | `PWA` primero, luego HTML, CSS, JavaScript |
| Orden | Tercero (después de Landing Resina) |
| UI | Sin cambios en `ProjectCard` / `Projects` |

## Alcance

### Obligatorios

1. `data/projects.ts` — nueva entrada `gestor-de-gastos`
2. `public/images/gestor-de-gastos.png` — screenshot recortado desde el asset enviado por la usuaria

### Fuera de alcance

- Botón demo / `liveUrl`
- Cambios de layout o estilos de cards
- Actualización de skills, perfil u otras secciones
- Publicar la PWA en Vercel

## Contenido a cargar

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
}
```

## Imagen

- **Origen:** screenshot móvil de la PWA (saldo Disponible + categorías Anotar).
- **Destino:** `public/images/gestor-de-gastos.png`.
- **Formato de card:** `aspect-[16/10]` + `object-cover` (ya existente en `ProjectCard`).
- **Recorte:** landscape 16:10 enfocado en la parte superior (fecha, card de saldo, bloque Anotar con categorías visibles). Evitar barra de navegación Android si distrae.

## Verificación

- [ ] Tres proyectos visibles: App Películas, Landing Resina, Gestor de Gastos
- [ ] Badge principal muestra **PWA**
- [ ] Solo botón GitHub (sin Live/Demo)
- [ ] Imagen legible en desktop y mobile
- [ ] ES y EN coherentes
- [ ] Build / typecheck OK

## No hacer

- No inventar URL live
- No rediseñar la sección Projects
- No cambiar el orden de los dos proyectos existentes salvo acuerdo nuevo
