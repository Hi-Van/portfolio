---
title: Evidence and data display
group: Components
status: current
reviewed: 2026-10-27
sources:
  - web/components/evidence/badge.tsx
  - web/components/figures/figure.tsx
  - web/components/home/results-band.tsx
  - web/components/work/role-row.tsx
  - web/components/about/contact-card.tsx
  - web/content/facts.ts
  - web/content/accent.ts
---

# Evidence and data display

Every number on the site comes from the fact registry, and the shape and colour it takes follow from its provenance. This doc covers the containers: badges, result cells, role and system rows, figures, captions, method rows, headings, and the byline.

## Badges

A badge states a fact about the person: role, employer, location. Neutral fill (`bg-badge`), a hairline border, the small radius, and the 12.5px label step. A badge never takes an accent, because colour would claim one of the two meanings.

The location badge carries a 12px pin as an icon with `aria-hidden`. The current role is marked with an 8px ink dot beside it and a visually hidden word, so the dot is not the only signal.

## Result cells

The home band is three cells separated by hairlines, on a filled baseline above and below.

| Part | Treatment |
| --- | --- |
| Number | Display serif at the 40px step, indigo, because it is a measurement |
| Unit | Interface face at the 12.5px label step, muted |
| Sentence | Interface face at the 16px step, body colour, one or two lines |
| Whole cell | A link into the work surface, hover fill `bg-hover` |

The cell's number is read from the registry at render, so a changed fact changes the band with no other edit. A unit test mutates a fact to prove it.

## Role and system rows

A role row is a three-column grid: employer, period, and place in the first column, title and description in the other two. It stacks below the medium breakpoint.

A system row sits inside a role, separated by hairlines. The system name is a link into the report section that explains it, the description is one line at the 16px step, and the figure sits to the right in the display serif at indigo. Every figure is a registry fact.

Employer scoping holds here: the three Meta figures appear on the work surface and nowhere else.

## Figures

A figure is a panel at the small-large radius filled with `bg-panel`, then a caption outside it in the reading column. The caption begins with a bold `Figure n` and then a sentence that states the assumption.

| Figure | Built with | Colour |
| --- | --- | --- |
| 1 | Markup | Roles only |
| 2 | Hand-written SVG | `chart-cell` for the baseline bar, indigo for the measured bar |
| 3 | Hand-written SVG, cells generated at prerender | `chart-cell` cells, one indigo reference bar |
| 4 | visx scales and path | Indigo line, chart roles for axes |
| 5 | visx scales, path, and area | Indigo line, chart axis for today's sessions, `band` for the time returned |

No figure carries a colour literal. A chart that introduces its own colour fails review, and the style check fails if a hex appears in a component.

## Method rows

A definition list, three columns at wide and stacked at narrow. The key is an uppercase 10px caps key, muted. The value is the 16px interface step in body colour. The assumed row names the model controls that expose its values.

## Section headings

A section number is indigo and sits in the margin of the heading: measurement and structure, not decoration. A section heading uses the 40px step; a subsection uses 26px. Both carry their recorded tracking.

## The byline

Name, place, date, and reading time at the 12.5px label step in muted. The reading time is computed from the word count at 200 words a minute, so it cannot drift from the copy.

## Do and don't

- Do render a number from the registry, never from a literal.
- Do let provenance choose the accent through `accentFor`.
- Don't put a figure in a card inside a card. One panel, one caption.
- Don't add a tooltip or a legend a reader has to hover to understand.
- Don't colour a caption, a badge, a byline, or a heading's furniture.

## Accessibility

Every figure has a role of `img`, an accessible name that describes what it shows, and a caption in text. A chart is never the only place a number appears: the prose states it too. Section numerals are text, not decoration, so a screen reader names the section as "1, The same shirt, six ways".

## Source

- `web/components/evidence/badge.tsx` for badges.
- `web/components/home/results-band.tsx` for result cells.
- `web/components/work/role-row.tsx` for role and system rows.
- `web/components/figures/` for the figure panel and the five figures.
- `web/app/report/page.tsx` for method rows and section headings.
- `web/content/facts.ts` and `web/content/accent.ts` for the registry and the accent rule.
