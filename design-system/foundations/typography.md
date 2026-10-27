---
title: Typography
group: Foundations
status: current
reviewed: 2026-10-27
sources:
  - DESIGN.md
  - web/app/globals.css
  - web/app/layout.tsx
---

# Typography

Three families, thirteen contract steps, and one reading size. Instrument Serif carries statements, Literata carries reading text, Instrument Sans carries anything that behaves like interface. Every size a class can express is a step in the contract; there is no size between two steps, and the theme block is the only place a size is written.

## The families

| Family | Role | Utility | Variable |
| --- | --- | --- | --- |
| Instrument Serif | Statements and display numbers, never below 20px | `font-display` | `--font-instrument-serif` |
| Literata | Reading text | `font-reading` | `--font-literata` |
| Instrument Sans | Labels, captions, navigation, figure text | `font-ui` | `--font-instrument-sans` |

All three are declared once through the framework's font loader in `web/app/layout.tsx`, which fetches at build time and self-hosts the result. There is no `@font-face` in the codebase and no third-party font request at runtime.

Declared styles: Instrument Serif 400 normal and 400 italic, Literata normal and italic, Instrument Sans 400, 500, and 600. Instrument Sans has no italic on Google Fonts and the site does not use one.

The open font licence travels with the files, so one licence file per family lives in the repository.

## The steps

Thirteen steps in `DESIGN.md`. Each `text-*` utility carries its line height, so a size and its leading are never chosen separately.

| Step | Size | Leading | Utility | Used for |
| --- | --- | --- | --- | --- |
| display-home | 104 | 0.94 | `text-display-home` | The home statement |
| display-report | 94 | 0.98 | `text-display-report` | The report cover |
| display-page | 60 | 1.02 | `text-display-page` | Page and cover titles on narrow viewports |
| heading-2 | 40 | 1.08 | `text-heading-2` | Section headings |
| heading-3 | 26 | 1.2 | `text-heading-3` | Sub-sections, statements that are not the hero |
| serif-label | 20 | 1.35 | `text-serif-label` | The abstract label and the report deck |
| reading | 19 | 1.66 | `text-reading` | All prose, every surface, every width |
| body-small | 16 | 1.6 | `text-body-small` | Interface paragraphs, system descriptions |
| caption | 13 | 1.55 | `text-caption` | Figure captions and metadata |
| label | 12.5 | 1.66 | `text-label` | The invitation and compact actions |
| caps | 10 | 1.62 | `text-caps` | Uppercase keys, at weight 500 and 0.1em tracking |
| chart | 15 | 1 | `text-chart` | SVG label text |
| chart-value | 17 | 1 | `text-chart-value` | SVG value text |

The reading size is one value. It does not shrink below 760px and it does not grow in the report; the column changes, the type does not.

`text-reading` is deliberately not named `text-body`: `--color-body` already owns the `text-body` utility, and the two would collide.

## Floors

- **Serif:** 20px. Below that the display face reads as a mistake, so a label that needs to stay serif uses `text-serif-label` rather than a smaller size.
- **Uppercase:** 10px at weight 500 with 0.1em tracking. The chat tag and the source label are the two places this change leaves at 9.5px; the accessibility change closes them.
- **Chart text:** 15 units with values at 17, which is legible at the reading measure and above the floor on the narrowest viewport.

## Tracking

Four values, all in the theme block.

| Utility | Value | Where |
| --- | --- | --- |
| `tracking-display` | -0.02em | Every display heading |
| `tracking-heading-2` | -0.012em | Section headings |
| `tracking-heading-3` | -0.008em | Sub-sections |
| `tracking-caps` | 0.1em | Uppercase keys |

Uppercase without open tracking reads as a lump, which is why the caps step carries tracking as part of the step itself.

## The conversational exception

The agent surface runs one step smaller than the scale: 16.5px for messages and the input, 13.5px for suggested questions, and 10.5px for metadata. This is the only documented exception, it applies to that surface only, and it is recorded rather than derived.

## Measures

- The reading measure is 720px, shared by prose and figures so their edges align.
- The frame is 1040px.
- The agent surface is 860px.
- Paragraphs use `text-wrap: pretty`; captions and the report deck use `balance`.

Shortening the measure requires re-checking chart label size in the same change, because the two are sized against each other.

## Do and don't

- Do pick a step, then let the layout adapt.
- Do keep display type at weight 400. The serif carries the voice without bold.
- Don't invent a size to make a line fit. If it does not fit, the line or the layout changes.
- Don't set a family outside its role. Navigation and captions are never Literata.
- Don't justify text. Ragged right with a wrapped measure.

## Accessibility

Text meets its contrast floor in both themes (see [Color and theme](color-and-theme.md)). Type is set in rem-independent pixels, so the browser's text-only zoom applies without a layout trap. No text is clipped by a fixed height.

## Source

- `DESIGN.md` for the contract values.
- `web/app/globals.css` for the steps, tracking, and families in the theme block.
- `web/app/layout.tsx` for the font loader declarations.
- `web/scripts/check-tokens.mjs` for the checks that keep the two in step.
