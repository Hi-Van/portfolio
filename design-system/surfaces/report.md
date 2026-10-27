---
title: Report page
group: Surfaces
status: current
reviewed: 2026-10-26
sources:
  - report.html
  - assets/tui.css
  - assets/theme.js
  - assets/fonts
  - DESIGN.md
---

# Report page

`report.html` is the one long-form document among the five pages. Work, about, the home page, and the chat page's top bar link to it; the work page links straight to the system subsections and the home band link jumps to section 3. It carries the cover, abstract, four numbered sections, five figures, the model, the method table, and the author block, and it is the only page with charts, its own print rules, and inline fonts.

## Composition

```
header.top                 sticky, 58px, section links
main#main
  .cover                   max 1040, 24px gutters
    header.masthead        title, deck, byline
    section.abstract       max 720, panel
  article.article          1fr / 720 / 1fr, 24px gutters
    section.sec#problem    1
    section.sec#systems    2, with 2.1 to 2.3
    section.sec#scale      3, ends with the model
    section.sec#method     4, the table
    section.contact        author block
footer.foot                720, two credit lines
```

Two frames do the measuring. `.cover` caps at 1040 and centers the masthead. `.article` is a three track grid, `minmax(0,1fr) minmax(0,var(--measure)) minmax(0,1fr)` with `padding:0 24px`; every child sits in track 2 and `.bleed` adds `width:100%` rather than a wider track. The abstract lives in the cover but is capped at `max-width:var(--measure)` with auto margins, so it lands on the same left edge as the body at 1440 without belonging to the article. That shared edge is what makes the handoff from cover to section 1 read as one column.

The page is standalone in the literal sense. It does not load `assets/site.css`. The inline `<style>` block holds the five `@font-face` rules, the light tokens, the dark tokens, and a second dark copy inside `prefers-color-scheme`. The only shared files are `assets/tui.css` for the Ask switch, `assets/theme.js` for the toggle, and the woff2 files in `assets/fonts/`. A token change has to be made three times in this file and three times in `site.css`; the five faces are declared twice in the project. `--measure` is local at `720px` where the shared file declares `--page:1040px`.

Body copy is Literata 19px at 1.66, dropping to 17.5 at 1.62 under 760. At 720 the column runs about 80 characters, the widest reading measure on the site. The values and contrast ratios are in [color and theme](../foundations/color-and-theme.md), the type steps and measures in [typography](../foundations/typography.md).

## Sections and components

### Cover and masthead

`.masthead` is a `header` inside `.cover`, centered, with `padding-top:clamp(52px,7vw,96px)`. The h1 is Instrument Serif `clamp(46px,6.9vw,94px)` at .98 with `-.02em`, capped at 960 and balanced. At a 1440 viewport it renders at the 94px ceiling and is visibly wider than the 720 body below it, 120px overhang on each side. The clamp hits its 46px floor near a 667 viewport.

The deck follows at a 24px margin, `clamp(18px,1.55vw,21px)` at 1.5 in `--muted`, capped at 44ch and balanced. The short measure is what makes a two line subtitle under a one line title; the wrap moves between screenshots because the text balances rather than filling the line. The byline is a centered flex row at 12.5px sans, `gap:8px 26px`, 30px down: four spans for name, city, month, and read time, the first in `--ink` and the rest muted. There are no separators, no icons, and no rules. The cover holds type only, no image, no kicker, no eyebrow, and no share row.

### Abstract

`section.abstract` is a `--panel` block at 12px radius with `padding:clamp(24px,4vw,40px)`, capped at 720 and centered, `clamp(32px,4.5vw,56px)` below the byline. The label is a `p` in Instrument Serif italic 20px `--assume` with 12px under it, followed by two paragraphs at 18.5px/1.62 in `--body`. Under 760 the padding drops to 22, the radius to 10, and the paragraphs to 17px. The block has no collapse, no "read more", and no heading; the section carries `aria-label="Abstract"`. The clay label is the only accent in the cover. Clay appears again only on the Figure 1 inference, the Assumed method row, and the two slider outputs.

### Article frame and numbered sections

The article opens at section 1 with no extra title. `.sec` carries `margin-top:clamp(52px,6.5vw,88px)` and `scroll-margin-top:84px`, so the rhythm comes from the margin between siblings and each jump clears the 58px bar. Section headings are Instrument Serif `clamp(30px,3.4vw,40px)` with a flex numeral: `.n` is italic at 60 percent of the heading size in `--data`, 16px clear of the first word and raised `-.26em`. `.h3n` does the same at 80 percent for the one sublevel. Both numerals are `aria-hidden`. Measurements are in [evidence](../components/evidence.md).

The four sections do four different jobs. Section 1 is one paragraph and Figure 1, the problem stated once. Section 2 opens three h3s, 2.1 Cleaning, 2.2 Intake, 2.3 Submissions; the first two carry a figure and the third does not, because the 22 percent is argued in section 3 instead. Section 3 is one paragraph, Figure 4, a one sentence lead-in, and the model. Section 4 is two sentences and the table. The order is claim, evidence, arithmetic, provenance, with no sidebar, no table of contents in the body, and no footnotes. The top bar is the only outline.

### Figures

All five figures are `.figure.bleed`, so they fill the 720 track and never the viewport. Each panel is `--panel` at 10px radius with `clamp(16px,2.4vw,24px)` of padding, and each caption sits outside it in the reading column as `auto minmax(0,1fr)`: "Figure 1" in ink at 600, then the claim and its assumption at 13px sans muted. The grid makes a long caption hang under its text rather than under the label, which is visible in `report-figure1.png` where the second line starts inside the column. Every caption names an assumption in its second half.

The five marks are different mechanisms. Figure 1 is HTML, a `1fr 150px 1fr` grid of three supplier cards against one catalog record, with a 1px merge line and a clay "the same garment?" label; it has no `data-reveal`. Figure 2 is a two bar SVG. Figure 3 is a unit chart whose 104 squares are created by script in a 13 column grid. Figure 4 is a line under a clip path. Figure 5 is drawn and redrawn by script and carries the controls.

Only Figures 2, 3, and 4 carry `data-reveal`. An IntersectionObserver at threshold .25 adds `.in` once and unobserves: bars scale from 0 over .9s, cells fade and lift over .5s at 4ms per index, and the clip widens from 0 to 900 units over 1.15s. Figure 5 is not observed because it is drawn at load. The primitives, classes, and chart type sizes are in [evidence](../components/evidence.md) and the motion values in [space, shape, and motion](../foundations/space-shape-motion.md); nothing about them is redefined here.

### The model

Figure 5 closes section 3. The panel stacks five parts: the output, a legend, the chart, the controls, and an sr-only status line, with the caption below the panel. The output is the largest indigo number on the page, `clamp(40px,5.4vw,62px)` serif, with the unit "seller-hours returned in a year" at 13px muted beside it. The legend is three swatches with 12px labels and is `aria-hidden`, because the chart's own label and the caption state the same distinction. The chart is a 900 by 380 viewBox on desktop, 900 by 520 under 760, with four value steps on desktop and two on mobile.

The default is 25 percent human traffic and a 6 minute session, which reads 782,925 hours. The script fixes volume at 390,000 a day, 365 days, and a 22 percent cut. The share range steps 5 to 100 by 5, the session range 2 to 12 by 1, and both call `draw()` on `input`. `draw()` rewrites the output, both path sets, the end labels, the SVG `aria-label`, and `#f5-status`, and runs once at load with the same values already in the markup. The third column of `.controls` is `Reset assumptions`, which writes 25 and 6 back and redraws. The two ranges and the reset are documented in [inputs](../components/inputs.md); the reset renders about 18px high, six under the 24px minimum target and well under 44.

### Method

`dl.method` sits under a 1px `--line-2` rule at an 8px top margin. Four `.method__row` entries at `130px minmax(0,1fr)`, 14px vertical padding, and a `--line` bottom border: Measured, Derived, Assumed, and an unmarked Not measured. The `dt` is 13px/500 and is the whole state system: `data-kind="measured"` takes `--data`, `"derived"` `--data-soft`, `"assumed"` `--assume`, and the fourth row has none, so it stays `--muted`. The `dd` is 16px Literata. Under 760 the rows stack at a 4px gap.

The table is where the page admits what it does not know. Measured lists five numbers and their source, Derived shows the arithmetic, Assumed lists the 20 seconds, the 25 percent, and the 6 minutes and points at the model, and the last row says revenue was not measured rather than estimated. It is also the only place on the page where all four color states appear together.

### Contact and footer

`section.contact` is the fifth jump target. It has a `clamp(52px,6.5vw,88px)` top margin and `clamp(28px,3.5vw,40px)` of padding, then an "About the author" h2 at `clamp(30px,3.4vw,40px)`, one short paragraph, and `.actions` with a full size `.pill` reading "Email me" that opens a `mailto:`, plus two `.textlink`s, LinkedIn and "The site". The block is not a card. There is no panel, border, or radius; the heading and the space do the separating, and the pill is the only shape. This is the second filled pill on the page, after the Contact CTA in the bar.

The footer sits outside `main` and outside the article grid. `.foot` carries a 1px `--line` top border and `margin-top:clamp(52px,6.5vw,88px)`, with `padding:24px 0 52px`; `.foot__in` caps at 720 with no side padding, 20px under 760. Two 12px paragraphs at 1.7 in `--muted`, each capped at 70ch and 3px apart: the credit and revision date, then the type list and the build note, "One HTML file, no framework, no trackers." There is no link row, unlike the home, work, and about footers, and no copyright line. The report's last route out is the contact block above.

### Section navigation

The bar is the same 58px sticky header as the other pages, with the same brand, Ask switch, and theme toggle. Its nav is the difference: five anchors and no menu button. Problem, Systems, Scale, and Method point at `#problem`, `#systems`, `#scale`, and `#method`; Contact is the compact `.top__cta` at 7px 15px and points at `#contact`, so the top bar invitation leads to the author block instead of opening mail. The nav is labelled `"Report sections"` and has no `id`, because there is no panel for a button to control. `.top__in` uses 24px padding here, not the 32px of the main pages. The Ask switch points at `ask.html?from=report`, so the chat returns here.

The spy observes all five targets with `rootMargin:'-45% 0px -50% 0px'`, a 5 percent band around the middle of the viewport. On each intersecting entry it sets `aria-current="true"` on the matching link and removes the attribute from the other four. No section crosses the band at the top, so no link is marked until one does; `report.png` and `report-top.png` both show four muted links and the pill. The Contact link can take the attribute at the end but does not change appearance, because `.top__cta` sets its color with `!important`. The marker is not cleared when a section leaves either, so Contact stays marked while the reader is in the footer.

Jump offsets are not uniform. `.sec` carries `scroll-margin-top:84px`; `.contact` has no scroll margin, so the Contact jump can land with "About the author" under the sticky bar. Under 760, `.top__nav a:not(.top__cta){display:none}` removes the four section jumps and leaves the pill. There is no `.top__menu` rule or markup on this page, so a phone reader has no way to reach a section from the bar.

## Responsive behavior

There is one CSS breakpoint, 760, and one script value that reads the same width. The article's grid declaration is repeated in the media block without a change; the padding drops to 20, so the middle track stays 720 at most and shrinks once 720 plus 40px of gutters no longer fits. At 390 the measure is 350. The cover, article, and top bar drop to 20px gutters, and the footer adds 20px of inner padding.

| Area | Under 760 |
| --- | --- |
| Body | 17.5px at 1.62 |
| Masthead | top padding 44, h1 max width removed |
| Byline | 12px, `gap:6px 12px`, 24px down |
| Abstract | 22px padding, 10px radius, 17px paragraphs |
| Section h2 | numeral gap 12 |
| Figure caption | one column, 4px gap |
| Figure 1 | one column, 12px gap, connector becomes a 46px vertical rule |
| Model controls | one column, `gap:18px`, reset margin 4 |
| Method | one column, 4px gap |
| Model unit | no 30ch cap, no bottom padding |
| Chart text | labels 26, values 28 user units, axis notes hidden |
| Nav | four section links hidden, Contact remains |
| Footer | 20px inner padding |

The model is the only part that changes shape in script. `draw()` reads `window.innerWidth < 760` for the viewBox height, the four margins, and the tick count, and the resize handler debounces 150ms before redrawing. A window drag or a rotation therefore redraws the chart at the other geometry rather than scaling the old one. No other layout is measured in script.

## States

| State | Trigger | What changes |
| --- | --- | --- |
| Default, light | Load | Paper ground, ink title, panel abstract, four muted section links, filled Contact pill |
| Scrolled | Any scroll | Bar stays over the text with the blur and hairline; the spy marks one link once a section crosses the middle band |
| Dark | `data-theme="dark"` or an OS dark preference | Token swap, pill inverts, every chart mark follows |
| Print | Print dialog | Bar, actions, controls, and reset removed; panels flattened; body 10.5pt |
| No JavaScript | Script blocked | Figures 2 to 5 lose their marks, the spy never marks a link, the controls go inert |
| Reduced motion | `prefers-reduced-motion:reduce` | Reveals appear at once, transitions at .001ms, smooth scrolling off |

There is no loading, error, empty, or success state. The report has no form, no fetch, and no user data beyond the two range values, which reset on reload.

### Theme

The report applies dark twice: `[data-theme="dark"]` for an explicit choice, then `:root:not([data-theme="light"])` inside `prefers-color-scheme`. The inline head script reads `vs-theme` before paint, and `assets/theme.js` writes it and repaints the 34px toggle, whose sun and moon are swapped by `.is-dark`. The masthead turns `#eef1f7` on `#0c1018`, the abstract and figure panels become `#131824` against the `#0c1018` ground, the section numerals and model total become `#a9b3ff`, and the abstract label and slider outputs become `#d8a06e`. The Contact pill inverts to a light fill with a dark label.

Charts need no second set of marks. Every fill and stroke is a class that resolves a token, so bars, lines, grids, and the band invert together; the reveal animations change only transform and opacity. The Firefox range thumb is the one hard coded value, `background:#fff` in both themes. The dark cover screenshot shows the same layout as light, with the panel as the only raised surface. The token tables and ratios are in [color and theme](../foundations/color-and-theme.md).

### Print

`@media print` hides `.top`, `.actions`, `.controls`, and `.reset`, sets body to 10.5pt black, gives `.abstract` and `.figure__panel` a white fill with a 1px `#ddd` border, and applies `break-inside:avoid` to `.figure`. The abstract, captions, method table, contact paragraph, and footer all print. Four consequences follow from what the block does not do.

The closing `.actions` holds the only `mailto:`, and the footer has no links, so a printed copy carries no email address. The four section jumps leave with the bar. Figures 2, 3, and 4 print in whatever reveal state they reached, so a copy printed before scrolling can show empty bars, invisible cells, and axes without a line. And only the two panel fills and the body color are reset, so printing from dark theme leaves headings at `#eef1f7` and the Figure 1 cards on dark fills. There is no `@page` rule, no page numbers, and no URL expansion.

### No JavaScript

The text is complete without script. Masthead, deck, byline, abstract, all body copy, captions, method, contact, and footer are markup. What fails is every mark the script owns. Figure 2's bars stay at `scaleX(0)` because `.in` never arrives. Figure 3 shows its single bar and labels but none of the 104 squares, because the rects are created in script. Figure 4's line and band stay clipped at zero width. Figure 5 shows its number, legend, controls, and an empty chart frame, and the sliders do nothing because no listener exists. The five links still jump, but no link is ever marked current. The theme toggle is a button without a listener; the OS dark block still applies, but a stored choice does not, because the head script does not run. There is no `noscript` message and no fallback table.

### Motion

Reveals run once and stop. Under reduced motion, or when `IntersectionObserver` is missing, the script adds `.in` to every observed figure at load, so bars, cells, and lines appear in final position. The CSS block shortens every transition and animation to .001ms and sets `scroll-behavior:auto`; smooth scrolling is declared only under `prefers-reduced-motion:no-preference`. The model still draws and redraws under reduced motion, with no transition on the paths.

## Do and don't

- Do keep the 720 middle track and the 19px body. The page's authority comes from the measure, not from a wider canvas.
- Do keep the abstract outside the article grid and capped at the same 720, so it aligns with the body without becoming a section.
- Do keep captions outside the panel and let the second half state the assumption.
- Do keep the model inside section 3, after the arithmetic that introduces it. It is not an appendix.
- Do keep the contact block unpanelled. The heading, the space, and the one pill are enough.
- Don't add a sidebar table of contents, a progress bar, a share row, or a second sticky element. The bar is the outline.
- Don't add a fourth heading level. 2.1 to 2.3 is the only sublevel on the page.
- Don't let a figure exceed the 720. `.bleed` means the measure here, not the viewport.
- Don't renumber the contact block. It is an h2 with no numeral, and that is how it stays out of the 1 to 4 sequence.

## Accessibility

- Landmarks: a skip link, `header.top`, `main#main`, `footer.foot`, and a `nav` labelled "Report sections". The skip target has no `tabindex`, so focus can remain on the link after activation.
- Outline: one h1, five h2 (the four numbered sections plus "About the author"), and three h3 under Systems. Numerals are `aria-hidden`, so each name starts at the first word. The abstract label is a `p` and its section has `aria-label`, so the abstract is not in the outline; every other section is labelled by its h2.
- Figures: 2, 3, and 4 are `role="img"` SVGs whose labels state the series, values, and direction. Figure 5 points `aria-labelledby` at a `<title>` and the script rewrites its label on every draw with both control values and the returned hours. Figure 1 has no `role="img"` and no chart label, so the three supplier cards and the record read as text in order and the connector is `aria-hidden`. Captions state the assumption in words, not color.
- Model: each range is 20px high with a 16px thumb, and the reset renders about 18px high, so all three sit under the 44px target. Each label wraps the name and the output, so the accessible name carries the live value; both ranges point `aria-describedby` at the caption. `draw()` rewrites `#f5-status` on every input and on reset, so the new total is announced. [Actions](../components/actions.md) records the reset as a real button; the handler calls `draw()`, which writes the new total into the status region.
- Focus: 2px `--data` at 3px offset on links, the pill, and the CTA; the ranges use 6px so the ring clears the thumb.
- Contrast: body 12.1:1, muted 5.8:1, clay on the panel 5.5:1, indigo on the panel 9.2:1 in light. The weak point is chart type: a 26 unit label at a 390 viewport renders near 9px, under the 13px caption floor. Tables are in [color and theme](../foundations/color-and-theme.md) and [typography](../foundations/typography.md).
- Mobile: four of five jumps are hidden with no replacement menu, so the only bar action is Contact. The headings are the outline.
- Print: the email address disappears with `.actions`, so a printed copy has no contact route.
- Sticky bar: the 84px scroll margin covers the four `.sec` targets. The contact block has none, so its heading can sit under the bar.

## Divergences

- `DESIGN.md` allows one filled pill per page. The report has two: `.top__cta` in the bar at 7px 15px and `.pill` in the contact block at 12px 22px, both ink at 999px. The second is the closing action and the only full size pill in the project.
- The token set and the five `@font-face` rules are copied into `report.html` rather than loaded from `assets/site.css`, and the dark set appears twice in the same file. `--measure` replaces `--page`, and `.pill`, `.textlink`, `.skip`, `.sr-only`, and the top bar are local copies rather than shared components.

## Source

- `report.html` 15 to 40, the five faces; 42 to 136, light tokens, dark tokens, and the OS dark copy; 137 to 154, base, links, focus, skip, sr-only.
- `report.html` 156 to 187, top bar, CTA, theme toggle; 189 to 199, cover and article grid; 202 to 216, masthead, deck, byline; 219 to 230, abstract.
- `report.html` 233 to 250, section headings and numerals; 252 to 288, figure panels, captions, chart classes, reveals; 290 to 309, Figure 1 anatomy.
- `report.html` 311 to 347, model output, legend, controls, range thumb, reset; 349 to 356, method; 358 to 379, contact and footer.
- `report.html` 381 to 415, 760 block, reduced motion, print; 420 to 443, top bar markup; 445 to 464, cover and abstract markup; 466 to 681, article markup; 684 to 689, footer.
- `report.html` 691 to 851, script: Figure 3 grid 695 to 713, reveal observer 715 to 726, model and controls 728 to 833, scroll spy 835 to 849.
- `assets/tui.css` 4 to 20, the Ask switch the report borrows; `assets/theme.js`, whole file, the toggle; `assets/fonts/`, the five woff2 files.
- `DESIGN.md`, Layout, Typography, and Components.
- Screenshots: `../../preview/report.png`, `../../preview/report-top.png`, `../../preview/report-figure1.png`, `../../preview/report-dark.png`, `../../preview/report-dark-figures.png`. All five are 1440 wide captures; `report-figure1.png` is scrolled to Figure 1; only `report-top.png` shows the Ask switch, because the others predate it. No screenshot shows the mobile bar, print, or the no-JS state.

Related: [evidence](../components/evidence.md), [inputs](../components/inputs.md), [actions](../components/actions.md), [navigation](../components/navigation.md), [typography](../foundations/typography.md), [color and theme](../foundations/color-and-theme.md), [space, shape, and motion](../foundations/space-shape-motion.md), [accessibility](../foundations/accessibility.md).
