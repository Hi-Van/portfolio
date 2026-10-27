---
title: Color and theme
group: Foundations
status: current
reviewed: 2026-10-27
sources:
  - DESIGN.md
  - web/app/globals.css
  - web/components/theme/theme-provider.tsx
  - web/scripts/check-tokens.mjs
  - web/scripts/contrast.mjs
---

# Color and theme

Four materials: white paper, ink-blue text, indigo for measurement, clay for assumption. Every colour the site can express is a role in the contract, and the Tailwind colour namespace is cleared so an off-contract colour cannot be written as a utility at all.

## The roles

| Role | Light | Dark | Utility | Means |
| --- | --- | --- | --- | --- |
| paper | `#FFFFFF` | `#0C1018` | `bg-paper` | The page |
| ink | `#131A2B` | `#EEF1F7` | `text-ink` | Text and the filled invitation |
| indigo | `#2B3A8F` | `#A9B3FF` | `text-indigo` | Measurement |
| clay | `#95522C` | `#D8A06E` | `text-clay` | Assumption |
| panel | `#F6F6F3` | `#131824` | `bg-panel` | Figure and surface fill |
| body | `#303645` | `#C2C8D4` | `text-body` | Reading text |
| muted | `#5F6673` | `#9299A8` | `text-muted` | Captions, metadata, idle navigation |
| badge | `#EEEEE8` | `#1A1F2B` | `bg-badge` | Fact badges |

Supporting roles carry the hairlines and the chart marks: `line`, `line-strong`, `badge-line`, `hover`, `selection`, `on-data`, `chart-grid`, `chart-axis`, `chart-cell`, `chart-baseline`, `band`.

## Two accents, each with a job

- **Indigo** means measurement: result numbers, section numerals, chart marks, links that lead to data. Nothing decorative is indigo.
- **Clay** means assumption, in five places and no others: the abstract label, the inference in figure 1, the assumed row of the method, the two model inputs, and the note on an answer the site cannot give.

A third accent does not exist. Badges, navigation, captions, and role metadata stay neutral.

## How a colour reaches an element

Three layers, and only the middle one is a utility.

```
DESIGN.md front matter        the contract's eight role colours
        |
web/app/globals.css  :root    raw values, and the dark scopes redefine the same names
        |
@theme inline                 --color-paper: var(--paper)  ->  bg-paper
```

`@theme inline` is load-bearing. Without it a utility resolves `var(--paper)` at the root, where the dark override has not applied, and dark mode half-works.

The colour namespace starts with `--color-*: initial`, so the default palette is deleted. Tailwind does not error on an unknown utility, so `web/scripts/check-styles.mjs` bans arbitrary values and raw colour literals as the other half of the rule.

## Two themes, one set of names

```
:root                                  light values
[data-theme="dark"]                    dark values, same names
@media (prefers-color-scheme: dark)     the same dark values for a reader with no choice
  :root:not([data-theme="light"])
```

Because the dark scope redefines the same variables, a component writes `bg-paper text-ink` once and both themes follow. There is no `dark:` utility anywhere in the codebase, and none should be added.

The theme is applied after hydration: the document paints from the system preference through the media query, then a client effect applies the stored choice and writes `data-theme` on the root element. A reader who chose a theme that differs from their system sees the system theme for the hydration interval. That is the accepted trade recorded in `design.md` D6.

The stored key is `vs-theme`, kept from the previous build so a saved choice survives the migration. A reader with scripting off stays on the system preference and the page is fully readable.

## Measured contrast

Measured in the built theme by `web/scripts/contrast.mjs`. The gate is AA: 4.5:1 for text, 3:1 for a non-text indicator.

| Pairing | Light | Dark |
| --- | --- | --- |
| body on paper | 12.1:1 | 11.3:1 |
| body on panel | 11.2:1 | 10.6:1 |
| ink on paper | 17.4:1 | 16.8:1 |
| muted on paper | 5.8:1 | 6.7:1 |
| muted on panel | 5.3:1 | 6.2:1 |
| indigo on paper | 10:1 | 9.6:1 |
| indigo on panel | 9.2:1 | 8.9:1 |
| clay on paper | 6:1 | 8.3:1 |
| clay on panel | 5.5:1 | 7.7:1 |
| paper on ink | 17.4:1 | 16.8:1 |

The focus ring is indigo on paper, at 10:1 in light and 9.6:1 in dark, drawn outside the fill so it never sits on its own colour.

Do not lighten muted below `#5F6673` on white.

## Chart marks

Charts never carry a colour of their own. A mark takes a role: `chart-grid`, `chart-axis`, `chart-cell`, `chart-baseline`, `band`, `indigo` for measured data, `clay` for an assumed value. Because visx writes our SVG, the mark's colour is an attribute on a class, not a palette entry.

## Print

Print overrides every role to black on white regardless of the screen theme, drops the hairlines to greys, and sets the reading size in points. The report is the surface it exists for.

## Do and don't

- Do add a role to the contract before adding a colour to a component.
- Do keep one accent per meaning.
- Don't add a gradient, a shadow, or a third accent for hierarchy.
- Don't write a hex value in a component, a class string, or an SVG attribute.
- Don't colour badges, navigation, captions, or role metadata.

## Source

- `DESIGN.md` for the contract and its measured floors.
- `web/app/globals.css` for the three scopes and the theme block.
- `web/components/theme/theme-provider.tsx` for applying a stored choice after hydration.
- `web/scripts/check-tokens.mjs` for contract drift, in both directions.
- `web/scripts/check-styles.mjs` for the ban on arbitrary values and raw colours.
- `web/scripts/contrast.mjs` for the measured table above.
- `web/tests/e2e/theme.spec.ts` and `web/tests/e2e/print.spec.ts` for the behaviour.
