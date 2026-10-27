---
title: Color and theme
group: Foundations
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/site.css
  - assets/theme.js
  - report.html
  - assets/tui.css
---

# Color and theme

Every page is built from four materials: white paper, ink blue, one indigo for measured data, and one clay for assumptions. The tokens sit on `:root` in `assets/site.css`, with a second set under `[data-theme="dark"]` and a third copy inside `prefers-color-scheme`. The report repeats the values inline in `report.html`, and the chat repeats them as `--tui-*`. A new element gets color only by joining one of the four materials.

## The four materials

| Material | Light | Dark | Job |
| --- | --- | --- | --- |
| Paper | `#ffffff` | `#0c1018` | Page ground. `--paper` |
| Ink | `#131a2b` | `#eef1f7` | Type, filled pill, chart values, thumb edge. `--ink` |
| Indigo | `#2b3a8f` | `#a9b3ff` | Measurement. `--data` |
| Clay | `#95522c` | `#d8a06e` | Assumption. `--assume` |

Ink is a very dark navy, not a neutral black, so large serif type reads as ink rather than soot. Indigo covers result numbers (`.result__num`), section numerals (`.n`, `.h3n`), the model total (`.fig5__num`), bars and lines (`.bar-after`, `.bar-solid`, `.svg-accent`, `.line-data`), the measured method row, the badge pin, the focus ring, and chat links. Clay covers the italic Abstract label, the inference note in figure 1 (`.anatomy__merge span`), the Assumed method row, the two model readouts (`.control output`), and the chat note "Not stated on the site." There is no third accent, no gradient, and no shadow except the range thumb; badges, navigation, captions, and role metadata stay neutral even beside a number.

## Light tokens

| Token | Value | Used for |
| --- | --- | --- |
| `--paper` | `#ffffff` | Body ground |
| `--surface` | `#ffffff` | `.src` callout, range thumb |
| `--panel` | `#f6f6f3` | Figure panels, abstract, chat ground |
| `--ink` | `#131a2b` | Headings, badge text, pill fill |
| `--ink-hover` | `#0b1120` | Pill and Contact hover |
| `--body` | `#303645` | Body copy |
| `--muted` | `#5f6673` | Captions, labels, nav, footer |
| `--line` | `#e6e6e2` | Row dividers, top bar border |
| `--line-2` | `#d3d3cc` | Heavier rules, outlines, underlines |
| `--data` | `#2b3a8f` | Measured values, data marks, focus |
| `--data-soft` | `#5f69a3` | Derived method rows only |
| `--assume` | `#95522c` | Assumed values, model readouts |
| `--assume-tint` | `#f3e9dc` | Declared, never referenced |
| `--baseline` | `#b6b9be` | Chart baseline, before line |
| `--chart-grid` | `#e2e2dc` | `.svg-grid` |
| `--chart-axis` | `#d3d3cc` | `.svg-axis` |
| `--cell` | `#c9cbcf` | `.bar-before`, `.cell` |
| `--band` | `#e3e4f0` | Figure 5 uncertainty band |
| `--band-key` | `#d9dbea` | Legend swatch for the band |
| `--on-data` | `#ffffff` | Text and marks on indigo |
| `--hover` | `rgba(19,26,43,.04)` | Row, tile, toggle hover |
| `--selection` | `#e3e6f4` | `::selection` |
| `--badge-bg` | `#eeeee8` | Badge fill |
| `--badge-border` | `#d8d8d0` | Badge 1px border |
| `--top-bg` | `rgba(255,255,255,.86)` | Sticky top bar |

## Dark tokens

Same names, re-valued. Dark is a second token set, not a filter or an overlay. `--surface` is lighter than paper in dark and identical to it in light, so `.src` only looks raised after dark.

| Token | Value |
| --- | --- |
| `--paper` | `#0c1018` |
| `--surface` | `#1a1f2b` |
| `--panel` | `#131824` |
| `--ink` | `#eef1f7` |
| `--ink-hover` | `#ffffff` |
| `--body` | `#c2c8d4` |
| `--muted` | `#9299a8` |
| `--line` | `#232a38` |
| `--line-2` | `#343c4c` |
| `--data` | `#a9b3ff` |
| `--data-soft` | `#7f88c4` |
| `--assume` | `#d8a06e` |
| `--assume-tint` | `rgba(216,160,110,.12)` |
| `--baseline` | `#5a6170` |
| `--chart-grid` | `#212836` |
| `--chart-axis` | `#333a48` |
| `--cell` | `#333a48` |
| `--band` | `rgba(169,179,255,.16)` |
| `--band-key` | `rgba(169,179,255,.38)` |
| `--on-data` | `#0c1018` |
| `--hover` | `rgba(238,241,247,.06)` |
| `--selection` | `#2b3346` |
| `--badge-bg` | `#171d28` |
| `--badge-border` | `#2e3644` |
| `--top-bg` | `rgba(12,16,24,.88)` |

`--chart-axis` and `--cell` collapse onto `#333a48` in dark, so axes and before bars carry equal weight.

## Surfaces and hairlines

Three fills do the work shadows do elsewhere. `--paper` is the ground. `--panel` is an inset surface for figure panels, the abstract, and the chat page. `--surface` is a raised surface for `.src` and the range thumb. Separation comes from `--line` and `--line-2`, not from elevation. `--line` is the 1px row divider and top bar border; `--line-2` is the heavier rule for section tops, button outlines, range tracks, link underlines, and badge borders. Against white they measure 1.25:1 and 1.50:1, against the dark ground 1.32:1 and 1.72:1. Both are structure, not content, and neither is meant to pass a text threshold.

## Measured and assumed

Indigo means measured, clay means assumed, and everything else is ink, body, muted, or a surface.

- Measured is `--data`: `.result__num`, `.fig5__num`, `[data-kind="measured"] dt`.
- Derived is `--data-soft`, a muted indigo, and appears only on `[data-kind="derived"] dt`. It stays in the data family so the reader reads it as calculated, not assumed.
- Assumed is `--assume`: `[data-kind="assumed"] dt`, `.abstract__label`, `.control output`, `.anatomy__merge span`.

Badge text is `var(--ink)` on `--badge-bg`, never an accent. The one indigo inside a badge is `.badge .pin`, a 12px location icon. Navigation is `--muted` and goes `--ink` on hover and on `aria-current`, with no accent state.

## Chart colors

Charts are SVG with class based fills, so the same marks resolve in both themes. `.svg-grid` takes `--chart-grid`, `.svg-axis` takes `--chart-axis`, `.bar-before` and `.cell` take `--cell`, `.band` takes `--band` and the legend swatch `.fig5__legend i.is-band` takes `--band-key`, `.line-base` and `.chart-end-base` take `--baseline`, and `.bar-after`, `.bar-solid`, `.svg-accent`, and `.line-data` take `--data`. `.svg-on-data` takes `--on-data`; `.svg-soft`, `.svg-label`, and `.svg-value` take `--body`, `--muted`, and `--ink`.

`.band-accent` does not use `--band`. It fills with `var(--data)` at `opacity:.16`, and it is the figure 4 wedge. `--band` fills the figure 5 path only; `--band-key` exists for the legend swatch. Value text sits on the bar it describes, so `--on-data` flips to `#0c1018` in dark. The reveal animations change opacity and transform, never fill.

## Badge, hover, selection

`.badge` is `--badge-bg` fill, 1px `--badge-border`, 4px radius, `var(--ink)` text at 14px and line-height 1. It has no accent state and no hover state.

Hover is one token, `--hover`: `rgba(19,26,43,.04)` light, `rgba(238,241,247,.06)` dark. It appears on `.result`, `.system`, `.theme-toggle`, and `.msg__suggest button`. Links use decoration color instead, `--line-2` to `--ink`. Filled controls invert: `.pill` and `.top__cta` go `--ink` to `--ink-hover` (`#0b1120` light, `#ffffff` dark), and `.btn-rect` fills with `--ink` and takes `--paper` text.

`::selection` is `--selection` with `--ink` text: `#e3e6f4` with `#131a2b` light, `#2b3346` with `#eef1f7` dark. Focus is `2px solid var(--data)` at 3px offset; the chat page overrides it to `--tui-accent` at 2px.

## Contrast

Measured with WCAG relative luminance. The base is stated because indigo and clay sit on two surfaces.

| Theme | Pair | Base | Ratio |
| --- | --- | --- | --- |
| light | body `#303645` | paper `#ffffff` | 12.1:1 |
| light | muted `#5f6673` | paper `#ffffff` | 5.8:1 |
| light | muted `#5f6673` | panel `#f6f6f3` | 5.3:1 |
| light | indigo `#2b3a8f` | paper `#ffffff` | 10.0:1 |
| light | indigo `#2b3a8f` | panel `#f6f6f3` | 9.2:1 |
| light | data-soft `#5f69a3` | paper `#ffffff` | 5.2:1 |
| light | clay `#95522c` | paper `#ffffff` | 6.0:1 |
| light | clay `#95522c` | panel `#f6f6f3` | 5.5:1 |
| light | `--on-data` `#ffffff` | indigo `#2b3a8f` | 10.0:1 |
| dark | body `#c2c8d4` | ground `#0c1018` | 11.3:1 |
| dark | muted `#9299a8` | ground `#0c1018` | 6.7:1 |
| dark | muted `#9299a8` | panel `#131824` | 6.2:1 |
| dark | muted `#9299a8` | surface `#1a1f2b` | 5.8:1 |
| dark | indigo `#a9b3ff` | ground `#0c1018` | 9.6:1 |
| dark | indigo `#a9b3ff` | panel `#131824` | 8.9:1 |
| dark | clay `#d8a06e` | ground `#0c1018` | 8.3:1 |
| dark | clay `#d8a06e` | panel `#131824` | 7.7:1 |
| dark | `--on-data` `#0c1018` | indigo `#a9b3ff` | 9.6:1 |

Muted is the tightest text pair: 5.8:1 on white, 5.3:1 on the panel, 5.8:1 on the dark surface. Do not lighten `#5f6673` on white or darken `#9299a8` on the dark ground. `--data-soft` measures 5.2:1 on white and 5.6:1 on the dark ground, and badge text 14.9:1 both ways.

Chart marks are not text. `--chart-grid` on the panel is 1.2:1, `--cell` 1.5:1, `--baseline` 1.8:1. The before bar is a low contrast shape and its value is carried by the `.svg-label` beside it. Indigo against the before fill is 6.1:1, which is what separates the two bars.

## Theme switching

Every page carries the same script in `<head>`, before any stylesheet: `try{var t=localStorage.getItem('vs-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`. It runs before first paint, so a stored choice never flashes the other theme. With no stored value no attribute is set and the `prefers-color-scheme` block decides. That block is scoped `:root:not([data-theme="light"])`, so an explicit light choice beats the OS while an explicit dark choice is applied twice.

`assets/theme.js` reads `data-theme` first and falls back to `matchMedia('(prefers-color-scheme: dark)')`. A click flips the effective value, writes `vs-theme` to localStorage inside a `try`, sets `data-theme` on `<html>`, and repaints the button. The media query listener only repaints the button, which is enough because the tokens are CSS.

The button is 34 by 34 with an 18px icon. `paintButton()` toggles `.is-dark`, sets `aria-pressed` to `"true"` or `"false"`, and swaps the label between "Switch to light theme" and "Switch to dark theme". `.is-dark .icon-moon` is hidden and `.is-dark .icon-sun` is shown, so the icon states the destination, not the current theme. There are two theme states, not three: once a reader clicks, that choice is stored and the OS preference is ignored until localStorage is cleared.

## The duplicated copies

`report.html` repeats the light set at lines 42 to 75, the dark set at 77 to 105, and the media query set at 106 to 136. The values match `site.css` token for token, minus `--tui-*`, plus `--measure:720px`. It has to: the report is a standalone document type with its own inline styles. The cost is three copies in one file, and the report links `assets/tui.css` while defining no `--tui-*` of its own. The chat does the opposite: `--tui-*` is declared in `site.css` `:root`, re-declared in both dark blocks, and consumed only by `assets/tui.css`.

| Token | Light | Dark | Maps to |
| --- | --- | --- | --- |
| `--tui-bg` | `#f6f6f3` | `#1a1f2b` | `--panel` light, `--surface` dark |
| `--tui-fg` | `#131a2b` | `#eef1f7` | `--ink` |
| `--tui-muted` | `#5f6673` | `#98a0b3` | `--muted` light only |
| `--tui-line` | `#dedcd5` | `rgba(238,241,247,.16)` | no direct match |
| `--tui-accent` | `#2b3a8f` | `#a9b3ff` | `--data` |
| `--tui-hover` | `rgba(19,26,43,.045)` | `rgba(238,241,247,.07)` | `--hover`, close but not equal |
| `--tui-note` | `#95522c` | `#d8a06e` | `--assume` |

Three of these drift from their site twins. `--tui-line` `#dedcd5` is neither `--line` nor `--line-2`. Dark `--tui-muted` `#98a0b3` is lighter than `--muted` `#9299a8`. The hover values sit .005 and .01 alpha away from `--hover`. Close enough to look identical, different enough to be a second palette.

## Print

Print never switches to dark tokens and never remaps the palette. `site.css` hides `.top`, `.actions`, `.controls`, `.reset`, and `.foot__links`, sets body text to `#000` at 10.5pt, and turns `.panel` into white fill with a `1px solid #ddd` border. The report's print block does the same for `.abstract` and `.figure__panel` and adds `.figure{break-inside:avoid}`. Indigo and clay print at their screen values. There is no print accent, no grey ramp, and no print rule for the badge or the chart marks.

## Choosing a color for a new element

1. Is it a number or a mark that came from measurement? Use `--data`.
2. Is it an assumption, a model input, or a stated inference? Use `--assume`.
3. Is it a calculated value between the two? Use `--data-soft`.
4. Is it a surface that must separate from the page? Use `--panel` or `--surface` with a `--line` or `--line-2` edge.
5. Is it a label, caption, category, or nav item? Use `--muted` or `--ink`. No accent.
6. If none of these fit, the element probably should not carry color. Use weight, size, or space.

## Do and don't

- Do keep indigo for measured and clay for assumed, one meaning per accent.
- Do state the base when quoting a ratio: indigo is 10.0:1 on white and 9.2:1 on the panel.
- Do separate surfaces with `--panel` and a hairline, never a shadow.
- Don't color a badge, a nav link, a caption, or role metadata.
- Don't add a third accent, a decorative tint of indigo, or a warm neutral.
- Don't use `--assume` for emphasis on a measured number.
- Don't hardcode a hex in a component. The Firefox thumb in `report.html` still does, at `#fff`.

## Accessibility

Body text measures 12.1:1 light and 11.3:1 dark. Muted measures 5.8:1 on white, 5.3:1 on the panel, and 5.8:1 on the dark surface. Clay on the panel is 5.5:1 light and 7.7:1 dark, data-soft 5.2:1 light and 5.6:1 dark, and badge text 14.9:1 both ways.

Two gaps are structural. The low contrast chart fills mean the before bar cannot be read without its label, so labels stay beside the bars. The theme toggle is 34px and the menu button about 30px, both under the 44px target. Color is never the only carrier, either: measured, derived, and assumed method rows also carry `data-kind`, and the before and after bars carry position and labels, so a reader who cannot separate indigo from clay still gets the distinction from the row label and the figure caption.

## Divergences

- `DESIGN.md` gives the badge `textColor` as `{colors.body}` `#303645`; the CSS is `color:var(--ink)` `#131a2b`, measured 14.9:1 on the badge fill.
- `DESIGN.md` says clay appears in four places. The chat's `.msg__note` adds a fifth through `--tui-note`, which is `--assume`.
- `DESIGN.md` says nothing decorative is indigo. Four things are: `.badge .pin`, `.agent__topic::before`, `.msg__typing i`, and the arrow in `.msg__suggest button::before`.
- `--assume-tint` is declared in all three token blocks and never referenced.
- `DESIGN.md` lists muted at 5.8:1 and indigo at 10:1. Those hold on white only; on the panel they are 5.3:1 and 9.2:1, and the panel is where most indigo figures sit.
- The report's Firefox range thumb is `background:#fff` in both themes, the one element that does not follow `--surface` into dark.

## Source

- `assets/site.css` 30 to 71 light tokens, 73 to 109 dark, 110 to 148 media query copy; 154 to 164 body, selection, links, focus; 231 to 245 badge; 300 to 304 print.
- `assets/theme.js` 1 to 33 toggle behavior.
- `report.html` 9 head script; 42 to 136 inline tokens; 262 to 279 chart classes; 293 to 301 callout and clay inference; 313 to 335 model values and thumb.
- `assets/tui.css` 23 to 29 `.agent` ground and focus.
- `ask.html` 9 head script, 61 `theme.js`.

Related: [typography](typography.md), [space shape motion](space-shape-motion.md), [accessibility](accessibility.md), [evidence](../components/evidence.md), [messaging](../components/messaging.md).
