# Design: Mejorar previews de proyectos (escenario unificado)

**Fecha:** 2026-07-22  
**Estado:** Aprobado en conversación — pendiente review del archivo  
**Enfoque:** Escenario unificado + preview `phone` para Gestor de Gastos

## Objetivo

Hacer que las fotos de Projects se luzcan mejor: menos planas, más coherentes entre sí, y especialmente que **Gestor de Gastos** se lea como app móvil (hoy se ve mal por el crop forzado 16:10).

## Problema

- Capturas a sangre (`object-cover` full-bleed) → aspecto plano y “cortado”
- Landing Resina (muy clara) se funde con el fondo de la card
- Estilos de captura inconsistentes (web oscura / web clara / móvil)
- Gestor: screenshot vertical metido en marco horizontal → peor preview

## Decisiones acordadas

| Tema | Decisión |
|------|----------|
| Enfoque | Escenario unificado en `ProjectCard` |
| Gestor | `preview: "phone"` + imagen vertical completa |
| Otros | `preview: "window"` (default) |
| Frames realistas | Fuera de alcance (no iPhone/Mac chrome) |
| Assets Resina/Películas | Mantener; solo benefician del escenario |

## Alcance

### Obligatorios

1. `data/projects.ts` — tipo `preview?: "window" | "phone"`; Gestor con `preview: "phone"`
2. `public/images/gestor-de-gastos.png` — reemplazar crop 16:10 por captura vertical completa (source del usuario)
3. `components/sections/ProjectCard.tsx` — contenedor de preview con escenario; ramas window vs phone

### Fuera de alcance

- Mockups de dispositivo realistas
- Regenerar fotos de Películas / Resina
- Rediseño de layout de la sección Projects
- Cambiar textos / tech / URLs

## Diseño visual

### Contenedor común (todas las cards)

- Mantener `aspect-[16/10]` en el área de media
- Fondo: tinte suave a partir de tokens existentes (`muted` / `primary` con baja opacidad), no blanco puro
- Padding interno (~12–16px) para que la captura no toque los bordes de la card
- La captura flota con `rounded-lg` (o similar) + sombra ligera

### Modo `window` (Películas, Resina)

- Imagen horizontal con `object-cover` dentro del marco interno
- Sombra + radio para separar del escenario (ayuda a Resina clara)

### Modo `phone` (Gestor)

- Columna centrada estrecha (~40–48% del ancho del área, max-height ~100% del padding box)
- `object-contain` mostrando la UI completa (saldo + categorías)
- Radio tipo pantalla + sombra; laterales = color del escenario
- Sin crop 16:10 destructivo del asset

## Datos

```ts
// Project type addition
preview?: "window" | "phone"; // default "window" when omitted

// gestor-de-gastos
{
  id: "gestor-de-gastos",
  // ...existing fields...
  image: "/images/gestor-de-gastos.png", // full portrait screenshot
  preview: "phone",
}
```

Películas y Resina: omitir `preview` o setear `"window"`.

## Verificación

- [ ] Tres cards con el mismo lenguaje visual de escenario
- [ ] Gestor se entiende como teléfono; UI legible (Disponible + Anotar)
- [ ] Resina no se pierde tanto contra el card blanco
- [ ] Hover scale / lift actuales siguen funcionando
- [ ] Desktop + mobile OK
- [ ] `pnpm build` OK

## No hacer

- No inventar frames de hardware
- No volver a forzar crop landscape en Gestor
- No tocar otras secciones del sitio
