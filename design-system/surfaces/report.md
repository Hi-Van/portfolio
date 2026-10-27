---
title: Report
group: Surfaces
status: current
reviewed: 2026-10-27
sources:
  - web/app/report/page.tsx
  - web/components/report/model.tsx
  - web/components/report/section-nav.tsx
  - web/components/figures/figure.tsx
  - web/components/figures/submissions-diagram.tsx
  - web/components/figures/latency-bars.tsx
  - web/components/figures/unit-grid.tsx
  - web/components/figures/annual-volume.tsx
  - web/content/report.ts
---

# Report

The report is the only surface with its own document type. It has a masthead on the site frame, then everything from the abstract down shares one 720px reading column, figures included. Prose and figures are the same width by construction, and a test asserts it.

## Composition

```
Report                                            kicker
How a catalog learns to file itself               display-report, 94px
Four years of product data work…                  deck, serif label
Van Sirisouk · New York · October 2026 · 3 minute read
─────────────────────────────────────────────────
Abstract 1 Problem 2 Systems 3 Scale 4 Method Contact    section navigation
─────────────────────────────────────────────────
┌ Abstract ─────────────────────────────────────┐
│ Two paragraphs on the panel, label in clay    │   12px radius, panel fill
└───────────────────────────────────────────────┘
1  The same shirt, six ways                       numeral indigo
figure 1  submissions diagram
2  Three systems
   2.1 Cleaning
   figure 2  latency bars
   2.2 Intake
   figure 3  unit grid
   2.3 Submissions
3  What it adds up to
   figure 4  annual volume
   the model  (figure 5)
4  Method
   measured / derived / assumed / not measured
Contact
```

## The masthead

The kicker is an uppercase caps key. The title uses the 94px display step, the deck sits at the 20px serif label step with a 544px measure, and the byline carries the reading time computed from the word count at 200 words a minute. The masthead may use the full frame; the document beneath it may not.

## The section navigation

A sticky bar under the top bar, listing six targets: Abstract, 1 Problem, 2 Systems, 3 Scale, 4 Method, Contact. The current section carries `aria-current="location"`, tracked by an intersection observer rather than a scroll handler. At every width the links wrap rather than scroll, every link is a 44px target, and the bar stays reachable on a phone.

## The five figures

| Figure | Kind | Source of its values |
| --- | --- | --- |
| 1 | Diagram of three submissions resolving to one record | Markup, no data |
| 2 | Two-bar index, 100 before and 70 after | Indexed measurement |
| 3 | Unit chart, 104 cells against one second of pipeline | The registry's derived person-days |
| 4 | Cumulative line over twelve months | Daily rate from the registry |
| 5 | Two cumulative series with a band, and two controls | The model's arithmetic |

Figures 1, 2, and 3 are authored by hand. Figures 4 and 5 use visx for scales and paths, and every mark and label takes a contract role, so no library default reaches the drawing. Figure 3's cells are generated during the prerender, which is why the figure is complete with scripting disabled.

Every caption states the assumption the figure rests on. Figure 1's caption says the submissions are illustrative.

## The model

The model is figure 5. Two assumption controls, one fixed assumption stated beside them, a derived output, and a chart whose band is the time returned.

- The output is computed through `content/model.ts`, the same module the prerender uses, so the printed default and the interactive value cannot disagree.
- The controls are Base UI sliders. The thumb is a 44 by 44 target around a 20px knob, the indicator and knob are clay because they are assumptions, and each carries an accessible name and a value text in words.
- Reset returns both controls to the defaults.
- At the default assumptions the output is 782,925 hours, which is the registry's `seller-hours-returned`. A test asserts it.

The chart's band ends at that same figure, because the band is the difference between today's session length and a shorter one over the year.

## The method note

Four rows, in the order that matters: measured, derived, assumed, not measured. Every row states its own mechanism, and the last row states that revenue is not measured at all. The assumed row names the controls that expose its values.

## Print

The report prints black on white regardless of the screen theme, with the bar and footer hidden and the reading size in points. A browser test asserts the override.

## Completeness without scripting

Every figure, the method note, and the model's default outputs are in the delivered document. The interactive controls are inert without scripting, which is the honest behaviour: nothing moves and nothing claims to have changed.

## Measurements and tokens

| Property | Value | Utility |
| --- | --- | --- |
| Frame | 1040px | `max-w-frame` |
| Reading column | 720px | `max-w-measure` |
| Deck measure | 544px | `max-w-statement` |
| Abstract radius | 12px | `rounded-abstract` |
| Figure panel radius | 10px | `rounded-panel` |
| Chart label, wide | 15 units | `text-chart` |
| Chart label, narrow | 26 units | `text-chart-narrow` |
| Anchor offset | 160px | `scroll-mt-40` |

## Source

- `web/app/report/page.tsx` for the composition.
- `web/components/report/model.tsx` for the model and figure 5.
- `web/components/report/section-nav.tsx` for the tracked navigation.
- `web/components/figures/` for the five figures.
- `web/content/report.ts` for the copy, the captions, and the reading time.
- `web/tests/e2e/report.spec.ts` for the assertions, including the no-script pass.
