# Paletas de colores

El proyecto tiene dos paletas guardadas. Para cambiar entre ellas, edita `app/globals.css` y comenta/descomenta el `@import` correspondiente.

```css
/* Activa una sola paleta: */
@import "./palettes/warm.css";
/* @import "./palettes/original.css"; */
```

---

## Warm (activa por defecto)

Archivo: `app/palettes/warm.css`

| Token | Color | Uso |
|---|---|---|
| Fondo principal | `#FBF7F1` | `--background` |
| Textos y botones | `#142B45` | `--foreground`, `--primary` |
| CTAs / acentos | `#D96F4B` | `--accent` |
| Decorativos | `#91AFC4` | `--secondary` |
| Secciones / footer | `#F7DCC8` | `--muted`, `--section` |

Tono general: cálido, editorial, navy + terracota.

---

## Original

Archivo: `app/palettes/original.css`

| Token | Color | Uso |
|---|---|---|
| Fondo principal | `#FFFFFF` | `--background` |
| Textos | `#2D3436` | `--foreground` |
| Botones / enlaces | `#2EC4B6` | `--primary` |
| Decorativos | `#9B8FD9` | `--secondary` |
| CTAs / acentos | `#FF7F6E` | `--accent` |
| Secciones / footer | `#EEF1F6` (20–30% opacidad) | `--muted`, `--section` |

Tono general: fresco, tech, teal + coral + lavanda.

---

## Variables de sección

Las secciones alternas (Educación, Proyectos) y el footer usan `bg-section` y `bg-section-footer`, que se adaptan automáticamente a cada paleta:

- **Warm:** fondo sólido melocotón (`#F7DCC8`)
- **Original:** mezcla suave del muted con el fondo (20% / 30%)

No hace falta tocar los componentes al cambiar de paleta.
