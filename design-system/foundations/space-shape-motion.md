---
title: Space, shape, and motion
group: Foundations
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/site.css
  - assets/tui.css
  - report.html
  - index.html
  - work.html
  - about.html
---

# Space, shape, and motion

One frame, hairlines, and five radii. Nothing floats: depth is a panel fill or a border, and the only shadow on the site separates the report's range thumb from its track. Motion is one easing curve at seven durations from .16s to 1.2s. Related: [typography](typography.md), [color and theme](color-and-theme.md), [accessibility](accessibility.md), and the compositions in `../surfaces/`.

## The frame

`--page: 1040px` is declared in `assets/site.css` and applied through `.wrap`, which sets max width, centered margins, and `padding: 0 32px`. The universal `box-sizing: border-box` means the text column inside is 976px, not 1040. The two gutters divide by role: the report runs at 24 because a document wants more measure, the marketing and reading pages run at 32 because the hero type does not need the width. Under 760 the page gutters drop to 20 and the chat's inner padding drops to 14.

| Surface | Frame | Gutter |
| --- | --- | --- |
| Main pages, body content | `.wrap`, max `--page` | 32 |
| Top bar and footer, main pages | `.top__in`, `.foot__in`, max `--page` | 32 |
| Top bar and cover, report | `.top__in`, `.cover`, max 1040 | 24 |
| Report article | `.article`, no max width | 24 |
| Report footer | `.foot__in`, max `--measure` 720 | 0 |
| Chat page | `.agent__in`, max 860 | 24, then 14 under 760 |

The top bar is 58px on every page: `.top__in { height: 58px }`, sticky at `top: 0`, `z-index: 30`, one 1px `--line` border underneath. The chat page is the only place the number is arithmetic, `height: calc(100dvh - 59px)`, the bar plus its border. Change the bar and the chat height has to change with it.

The report article is `grid-template-columns: minmax(0,1fr) minmax(0,var(--measure)) minmax(0,1fr)` with `padding: 0 24px`, and `.article > * { grid-column: 2; min-width: 0 }`. `--measure: 720px` is the middle column; the sides take the remainder, so the article is not capped at 1040 on a wide screen, only its middle is fixed. `.bleed` sets `grid-column: 2; width: 100%`, so a figure tagged `.bleed` fills the 720 and does not widen past it.

## Section rhythm

Vertical space is margin on the section, never a wrapper between sections; report sections are direct children of `.article`. Two gaps are fixed rather than fluid: `.badgeline { margin: 26px 0 0 }` under the hero h1, and `.actions { margin-top: 30px }` on the home hero.

| Selector | Spacing |
| --- | --- |
| `.page-head` | `clamp(46px,6.5vw,84px) 0 clamp(24px,3vw,40px)` |
| `.hero` (home) | `clamp(52px,8vw,104px)` start, `clamp(36px,4.5vw,56px)` end; 40px top under 760 |
| `.masthead` (report) | `padding-top: clamp(52px,7vw,96px)`; 44px under 760 |
| `.abstract` | `margin-top: clamp(32px,4.5vw,56px)`, `padding: clamp(24px,4vw,40px)`; 22px under 760 |
| `.sec` | `margin-top: clamp(52px,6.5vw,88px)` |
| `.figure` | `margin: clamp(26px,3.4vw,40px) 0` |
| `.panel`, `.figure__panel` | `padding: clamp(16px,3vw,30px)`, `clamp(16px,2.4vw,24px)` |
| `.contact`, report `.foot` | `margin-top: clamp(52px,6.5vw,88px)`; `.contact` adds `padding-top: clamp(28px,3.5vw,40px)` |
| `.contact-strip` (home) | `margin-top: clamp(52px,7vw,84px)`, `padding-top: 28px`, 1px `--line` top border |
| `.foot` | `margin-top: clamp(56px,7vw,96px)`, `padding: 24px 0 52px` |
| `.about-grid` | `gap: clamp(32px,5vw,72px)`; 36px under 900 |
| Anchor targets | `scroll-margin-top: 84px` on `section[id]`, `article[id]`, `aside[id]`, `.sec` |

## Grids

| Grid | Columns | Detail |
| --- | --- | --- |
| `.results` (home) | `repeat(3, minmax(0,1fr))` | 1px `--line-2` top and bottom; `.result` at `padding: 26px 30px` with a 1px `--line` right border, dropped on `:last-child`. Under 760: one column, `padding: 22px 0`, divider moves to the bottom |
| `.role-row` (work) | `210px minmax(0,1fr)` | `gap: clamp(20px,4vw,48px)`, `padding: 30px 0`, 1px `--line` top border, `--line-2` on the first row. Under 900: `1fr` at `gap: 8px`, meta becomes a flex row |
| `.about-grid` | `minmax(0,1fr) minmax(280px,.72fr)` | 280px floor on the contact column, .72 of the prose column. Under 900: `1fr` |
| `.facts` | `110px minmax(0,1fr)` | `gap: 10px 18px`, `margin: 32px 0 0`, `padding-top: 22px` under a 1px `--line` rule. Under 600: `1fr` at `gap: 2px`, 8px above each term |
| `.method__row` | `130px minmax(0,1fr)` | `gap: 22px`, `padding: 14px 0`. Under 760: stacks at `gap: 4px` |
| `.system` | `minmax(0,1fr) auto` | `gap: 6px 20px`, `padding: 13px 0`; result in `grid-row: 1 / span 2`. Under 760: description spans both columns |
| `.controls` (model) | `1fr 1fr auto` | `gap: 22px`, 1px `--line-2` rule with `padding-top: 16px`, `margin-top: 16px`. Under 760: `1fr` at `gap: 18px` |
| `.anatomy` (figure 1) | `1fr 150px 1fr` | `gap: 16px`. Under 760: connector becomes a 46px vertical rule, blocks stack |

## Spacing values in use

`DESIGN.md` names a five step scale: 4, 8, 14, 24, 40. The stylesheets never read those as tokens. There is no `--space-*` property in the project; every value below is written literally in its rule. The scale describes intent, not implementation.

| Value | Where | Value | Where |
| --- | --- | --- | --- |
| 2 | `.textlink`, `.reset` bottom padding; knob inset | 3 | `.role-meta .co`, `.src__k` label margin |
| 4 | `.msg__src` row gap; `.facts` gap under 600 | 5 | `.badge` block padding; `.msg__meta` margin |
| 6 | `.system` gap; `.fig5__legend` gap | 7 | `.top__cta` block padding |
| 9 | `.badge--loc` left padding; `.result__unit` margin | 10 | `.top__actions` gap; `.facts` column gap; `.msg` padding |
| 11 | `.btn-rect` block padding; `.top__menu` padding | 12 | `.pill` block padding; `.composer` gap; `.foot__in` row gap |
| 13 | `.figure__cap` top margin; `.system` row padding | 16 | `.sec h2` numeral gap; controls top rule |
| 18 | `.page-head .lede` margin; `.systems` margin | 20 | Composer input padding; role gap floor; gutters under 760 |
| 22 | `.pill` inline padding; `.reset` margin; method gap | 26 | `.result` block padding; `.badgeline` margin |
| 28 | `.contact-strip` padding top | 30 | `.role-row` padding; home `.actions` margin |
| 32 | Gutter on main pages; `.facts` margin top | 34 | `.work-foot` margin top |
| 44 | `.ask`, composer input, send, suggestion buttons | 46 | `.page-head` top floor |
| 52 | Section clamp floors; `.foot` bottom padding | 56 | `.agent__head` height; hero end ceiling |
| 58 | Top bar height | 84 | Scroll margin; `.page-head` top ceiling |
| 104 | Hero padding ceiling | 110, 130, 150 | Facts, method, and anatomy label columns |

Four structural values sit outside the scale: 58 for the bar, 56 for the chat header, 44 for every control, 84 for the scroll margin. The label columns add 110, 130, and 150. Everything else is a clamp or a local margin that can move.

## Breakpoints

Four widths, all `max-width`. No container queries. One `min-width` switch: `.composer { max-width: 680px }` at `min-width: 761px`.

| Width | What changes |
| --- | --- |
| 900 | `.role-row` stacks at `gap: 8px`, `.role-meta` becomes a flex row, `.about-grid` stacks at 36px |
| 760 | Gutters 20, body 17px, top bar wraps to `min-height: 58px`, the menu button appears on the four main pages, `.top__nav` becomes a full width dropdown, badges drop to 13px, `.conn-in` hides, results go single column, report body 17.5/1.62 and section links hide, chat padding 14 and chat type 16 |
| 600 | `.facts` stacks to one column |
| 380 | `.agent__rule` and `.agent__topic` hide in the chat header |

The report's chart geometry switches at the same 760 in script, `var mobile = window.innerWidth < 760`, changing viewBox height, margins, and tick count. It is read at draw time, so a resize recalculates after a 150ms debounce.

## Radii

| Radius | Applied to |
| --- | --- |
| 4px | `.badge`, `.src`, `.anatomy__record`, `.msg`, `.msg__avatar`, `.msg__tag` |
| 6px | `.btn-rect`, `.theme-toggle`, `.top__menu` |
| 10px | `.panel`, `.figure__panel`, `.abstract` under 760 |
| 12px | `.abstract` |
| 999px | `.pill`, `.top__cta`, `.skip`, `.composer__input`, `.ask__track` |

Circles at 50 percent: `.ask__knob`, `.composer__send`, the range thumbs, the typing dots, the topic dot. Focus outlines take a 2px radius so the ring follows a corner instead of a square. The rectangles state facts and the pills state invitations: a badge at 4px is a label, a panel at 10px is a surface, the 999px pill is the one filled action per page. The chat input is 999px but outlined, and the send is a 44px circle, so the chat page has no filled pill.

## Borders and hairlines

Two line colors, both 1px, no other widths on the page furniture.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--line` | `#e6e6e2` | `#232a38` | Top bar bottom, footer top, result dividers, system and method rows, facts rule, chat header |
| `--line-2` | `#d3d3cc` | `#343c4c` | Results top and bottom, first role row, method and controls top, badge borders, `.textlink` and `.mail` underlines, range track |
| `--tui-line` | `#dedcd5` | `rgba(238,241,247,.16)` | Chat rules, composer ring, avatar and tag borders, suggestion dividers |
| `--badge-border` | `#d8d8d0` | `#2e3644` | Badge outline |

`--line` separates items inside a group, `--line-2` marks the edge of a block. Chart strokes carry their own values at 1px, `--chart-grid` and `--chart-axis`; data lines are 2px (`.line-base`) and 2.5px (`.line-data`) with round caps.

## Elevation

No drop shadows. Depth is `--panel` fill plus a hairline, and the sticky bar reads as raised only through `backdrop-filter: saturate(180%) blur(18px)` over `--top-bg` at 86 percent opacity in light, 88 in dark.

Three exceptions, all functional. The WebKit range thumb carries `box-shadow: 0 1px 3px rgba(0,0,0,.12)`, the only drop shadow on the site; the Firefox thumb is 14px, white, with no shadow. `.composer__input` uses `inset 0 0 0 1px var(--tui-line)` as a ring, not a border, moving to `--tui-accent` on focus. `.composer__send:focus-visible span` uses `outline: 2px solid var(--tui-bg)` with `outline-offset: -3px`, again a ring.

## Motion

Every transition uses one token, `--ease: cubic-bezier(.16,1,.3,1)`, declared in `assets/site.css` and again in the report's inline `:root`. The chat has no easing of its own and inherits it.

| Duration | Where |
| --- | --- |
| .16s | `.system` background, `.msg__suggest button`, `.composer__send span` opacity |
| .18s | `.result` background, `.result__what` color |
| .2s | Links, nav color, theme toggle, `.top__cta`, `.pill`, `.btn-rect`, `.textlink`, `.mail`, `.ask` track and knob, composer ring, range thumb |
| .5s | Figure cells: opacity and 4px lift |
| .9s | Figure bars: `scaleX(0)` to `scaleX(1)` |
| 1.15s | Figure lines: `width: 0` to `900px` |
| 1.2s | Typing dots, infinite loop |

Nothing animates layout on the marketing pages: color, background, opacity, text decoration, and small transforms only. Two exceptions are not layout: the composer ring is a box shadow, and the figure line width sits inside a fixed viewBox.

`translateY(-1px)` appears on exactly two elements, both filled pills, `.pill:hover` and `.top__cta:hover`, each with a background change to `--ink-hover` (`#0b1120`, `#ffffff` in dark). No card, tile, row, or figure lifts. `.result` and `.system` change background to `--hover` at .18s and .16s instead. The WebKit range thumb scales to 1.08 on `:active`; the send drops to .88 opacity on hover and .76 on active.

### Figure reveals and typing

Bars, cells, and lines start hidden and reveal once. The script observes `figure[data-reveal]` at `threshold: 0.25`, adds `.in`, and unobserves, so nothing replays.

```css
figure[data-reveal] .bar{transform:scaleX(0);transform-origin:left center;transform-box:fill-box;transition:transform .9s var(--ease)}
figure[data-reveal] .bar--b{transition-delay:.12s}
figure[data-reveal] .cell{opacity:0;transform:translateY(4px);transition-delay:calc(var(--i) * 4ms)}
figure[data-reveal] .reveal{width:0;transition:width 1.15s var(--ease)}
figure[data-reveal].in .reveal{width:900px}
```

The cell stagger uses an inline `--i` written by the figure 3 script, so 104 squares ripple at 4ms each. The line reveal animates to a fixed 900px, the viewBox width, not a percentage. The typing marks are the only loop: `.msg__typing i` is a 4px accent dot at `animation: agent-typing 1.2s infinite`, the second and third delayed .15s and .3s, with keyframes that fade between .25 and 1 opacity and lift 2px at the 30 percent mark.

### Theme and menu

The theme swap is not animated. `assets/theme.js` sets `data-theme` on the root, and no rule transitions background or color on `body` or `:root`, so the page repaints in one frame. What animates is the control: `.theme-toggle` transitions color and background at .2s and swaps sun and moon through `.is-dark` by `display`. The mobile menu snaps too. `.top__nav` is `display: none` and becomes `flex` through `.is-open`, with no transition, height animation, or fade. The button text swaps between Menu and Close through `textContent`, and `aria-expanded` follows.

## Reduced motion

`assets/site.css` kills everything: `* { transition-duration: .001ms !important; animation-duration: .001ms !important }` plus `html { scroll-behavior: auto }`. The report repeats the block inline. Smooth scrolling is enabled only under `prefers-reduced-motion: no-preference`. The report also handles motion in script: when `matchMedia('(prefers-reduced-motion: reduce)')` matches, or `IntersectionObserver` is missing, every `figure[data-reveal]` gets `.in` on load and appears in its final state.

`assets/tui.css` is narrower. It sets `.001ms` on a named list (`.ask__track`, `.ask__knob`, `.msg`, `.msg__suggest button`, `.composer`, `.composer__send`) and gives `.msg__typing i` `animation: none !important` at `opacity: .6`, so the dots become a static mark rather than a frozen one.

## Print

| Rule | `site.css` | `report.html` |
| --- | --- | --- |
| Hidden | `.top`, `.actions`, `.controls`, `.reset`, `.foot__links` | `.top`, `.actions`, `.controls`, `.reset` |
| Body | 10.5pt, `color: #000` | 10.5pt, `color: #000` |
| Surfaces | `.panel` white with `1px solid #ddd` | `.abstract` and `.figure__panel` white with `1px solid #ddd` |
| Breaks | none | `.figure { break-inside: avoid }` |

Four things this does not do. `.foot` survives in both, so the footer prints, minus its link row on the main pages. The chat page has no print styles, so `ask.html` can print as one viewport height of clipped panel. Colors other than body text stay as tokens, so indigo and clay print in color. `.skip` is not hidden either, though it sits offscreen at `top: -60px` and stays out of the printed flow.

## Do and don't

- Do reuse the 58px bar height in viewport arithmetic. The chat's 59 is that number plus the border.
- Do keep the 720 measure and the chart type sizes coupled. The viewBox is 900 wide and scales into 720, so a narrower measure shrinks the labels.
- Do use `--line` inside a group and `--line-2` at the edge of a block.
- Do use margin for rhythm. A wrapper added to get spacing is how the rhythm breaks.
- Don't add a shadow to a card, popover, or sticky bar. The bar's separation is the border and the blur.
- Don't go past 12px radius except for a pill. 999 is an invitation; 4 to 12 are facts and surfaces.
- Don't animate height, width, or position on the main pages. The one width animation sits inside a fixed viewBox.
- Don't add a second easing curve, or look up spacing in `DESIGN.md` instead of the rule you are editing.

## Accessibility

- Reduced motion is honored in all three stylesheets and in the report script; the reveals and the typing loop both have a static fallback.
- Focus rings are 2px `--data` at 3px offset on the site, 2px `--tui-accent` at 2px offset in the chat, and 2px `--data` at 6px offset on the range inputs, clear of the thumb.
- `.ask` is 44px min height and the composer controls are 44px, but `.theme-toggle` is 34px and `.top__menu` is about 30px, both under the 44px target.
- The frame is fluid and the measure has no fixed width, so zoom reflows rather than clips, except in the chat, where `calc(100dvh - 59px)` and `overflow: hidden` make zoom shrink the visible transcript instead of growing the panel.
- The reveal is decorative, and figure values sit in SVG `aria-label` text in the markup, so nothing is announced late by the animation. The menu is a `display` swap, so its links leave the accessibility tree when closed and return when open, with `aria-expanded` as the only state signal.

## Divergences

- `DESIGN.md` gives spacing as 4, 8, 14, 24, 40. The CSS uses literal values from 2 to 150 and declares no spacing tokens. The scale describes intent; the table above is the implementation.
- `DESIGN.md` says the frame is 1040 with 24px gutters and the report body is a 720 column. The main pages use 32px gutters; the cover and top bar are 1040; the report article is a full width grid whose middle is 720.
- `DESIGN.md` says mobile collapses to one 350px column and the report title drops to 46px. The CSS sets no 350px width; the column is fluid between 20px gutters, and the masthead title only reaches its 46px floor near a 667px viewport.

## Source

- `DESIGN.md` lines 87 to 98 (radii and spacing), 179 to 193 (layout, elevation, shapes).
- `assets/site.css` lines 30 to 71 (root tokens), 165 to 169 (`.skip`, `.wrap`), 172 to 207 (top bar), 210 to 228 (actions), 248 (`.panel`), 251 to 259 (page head, prose), 262 to 271 (footer), 274 to 295 (760 block), 296 to 299 (reduced motion), 300 to 304 (print).
- `assets/tui.css` lines 4 to 20 (`.ask`), 23 to 33 (`.agent`, `.agent__in`), 36 to 50 (header), 53 to 61 (log), 63 to 120 (messages, typing), 122 to 152 (composer), 154 to 175 (breakpoints), 177 to 180 (reduced motion).
- `report.html` line 74 (`--measure`), 156 to 187 (top bar), 189 to 199 (`.cover`, `.article`), 202 to 230 (masthead, abstract), 233 to 288 (sections, figures, chart primitives, reveals), 311 to 347 (figure 5, controls, reset), 349 to 379 (method, contact, footer), 381 to 415 (760 block, reduced motion, print), 716 to 726 (reveal observer).
- `index.html` lines 17 to 69 (hero, results, contact strip, 760 block), `work.html` lines 14 to 57 (role row, systems), `about.html` lines 14 to 47 (about grid, facts, contact card).
