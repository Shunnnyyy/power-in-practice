# Urban Field Instrument Design System

## 01. Reference Direction

This project uses a practical field-instrument style inspired by IBM Carbon Design System, Figma dashboard templates, and monochrome grid editorial layouts. The goal is not to look like a generic portfolio page. It should feel like a research synthesis surface: measured, visual, and grounded in field evidence.

Reference links:

- IBM Carbon Design System Figma kits: https://carbondesignsystem.com/designing/kits/figma/
- Figma dashboard templates: https://www.figma.com/templates/dashboard-designs/
- Maps UI kits reference: https://figmaelements.com/ui-kits/maps/

## 02. Palette

- Night: `#090806`
- Ink: `#f5f1e8`
- Muted ink: `#a8a29e`
- Rule line: `rgba(41, 37, 36, 0.9)`
- Evidence accent: `#f6dca6`
- Secondary signal: `#8da8bd`

Use warm near-black and amber as a research-note palette. Accent colors should mark evidence, links, and current flow.

## 03. Typography

- Primary: IBM Plex Sans
- Technical labels: IBM Plex Mono
- Headings: heavy, compact, left-aligned
- Body: 1.55 to 1.75 line-height
- Labels: small uppercase mono, but only for short metadata

Avoid centered paragraphs and generic portfolio copy.

## 04. Components

- Navigation: compact, text-first, no oversized header.
- Cards: only for evidence, charts, sources, or linked projects.
- Data rows: left-aligned, hover can reveal decision state.
- Buttons: clear primary/secondary contrast, visible focus ring.

## 05. Motion

Motion should explain synthesis:

- Synthesis current: line movement connecting observations to decisions.
- Hero current: slow evidence scan over the field image.

Do not animate every object. Respect `prefers-reduced-motion`.

## 06. UX Rule

Each page should answer one practical question:

- Home: What is the whole study about?
- Data: What evidence supports it?
- Playbook: What can someone do with the observations?
- Links: How do the four tools connect?
