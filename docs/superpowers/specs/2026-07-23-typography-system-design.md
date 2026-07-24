# Typography System Design

**Date:** 2026-07-23  
**Status:** Approved

## Goal

Replace DM Sans + Plus Jakarta Sans with a three-tier type system that feels professional and distinctive for a personal portfolio.

## Type Roles

| Role | Font | Usage |
|------|------|--------|
| Display | Bebas Neue | Hero h1, section h2 titles, large decorative text |
| Label | Barlow Condensed (600–700) | Card/job titles (h3), eyebrows, badges, uppercase labels |
| Body | Inter | Paragraphs, nav, buttons, links, general UI |

## Display rules (Bebas Neue)

- `text-transform: uppercase`
- `line-height: 0.9–1`
- Very slight letter-spacing (~0.01–0.02em)
- Not used for long paragraphs

## Label rules (Barlow Condensed)

- Weights 600 or 700
- Prefer uppercase + moderate tracking for short labels
- Never for long body copy

## Body rules (Inter)

- Default site font (`font-sans`)
- Nav, buttons, paragraphs, form content

## Tailwind tokens

- `font-sans` → Inter (`--font-sans`)
- `font-heading` → Bebas Neue (`--font-display`)
- `font-label` → Barlow Condensed (`--font-label`) — new

## Out of scope

Layout, color palettes, component structure (except typography class updates).
