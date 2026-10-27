---
title: Evidence and data display
group: Components
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/site.css
  - index.html
  - work.html
  - about.html
  - report.html
  - README.md
---

# Evidence and data display

These are the parts of the site that carry a number. A badge says what the person does now, a result tile puts three measurements on the home page, a system row names the mechanism behind a figure, and the report's panels, captions, chart marks, abstract, and method table say which numbers were counted and which were estimated.

Most of this CSS lives in a page's inline `<style>` block, not in `assets/site.css`. Only `.badge`, `.badgeline`, `.page-head`, and the tokens are shared. `report.html` repeats the whole token set inline because it is a standalone document, so every report component below reads that copy.

One rule holds the group together: indigo is a measurement, clay is an assumption, and everything else is neutral. A number someone counted is indigo, a label is muted, and clay appears only on the abstract label, the inference in Figure 1, the Assumed method row, and the two model controls.

## Anatomy

### Badges and fact rows

```
<p class="badgeline">
  <span class="sr-only">Currently</span>
  <span class="bgroup">
    <span class="badge"><span class="badge__label">Software Engineer II</span></span>
    <span class="conn">at</span>
    <span class="badge"><span class="badge__label">Atlassian</span></span>
  </span>
  <span class="bgroup"><span class="conn conn-in">in</span>
    <span class="badge badge--loc"><svg class="pin">...</svg><span class="badge__label">New York</span></span>
  </span>
</p>
```

`.badgeline` is a wrapping flex row of two `.bgroup` children, each inline-flex with a 9px gap. `.conn` is a bare word with no chrome, "at" between the first two chips and "in" before the location. `.badge` is inline-flex, centered, 6px gap, `padding:5px 10px`, 4px radius, `--badge-bg` fill and a 1px `--badge-border` hairline, holding one `.badge__label` at 14px/1 ink, 13px under 760. `.badge--loc` adds the 12px `.pin` in `--data` and changes padding to 9px left, 11px right. `.sr-only` supplies "Currently" so the line does not open on a job title.

Fact rows are the same idea without chrome: `dl.facts` on the about page, a 110px label column, `dt` muted and `dd` ink, both 13px sans.

### Result tiles

```
<div class="results">
  <a class="result" href="work.html#attire-intake">
    <span class="result__num">450,000</span>
    <span class="result__unit">records per second</span>
    <span class="result__what">The attire intake pipeline. One second of it replaces 104 days of filing.</span>
  </a>
</div>
```

`.results` is `repeat(3,minmax(0,1fr))` with `--line-2` on the top and bottom edges and a 1px `--line` rule between columns. Each `.result` is the link itself, `padding:26px 30px`, with three spans stacked: the number in serif `clamp(36px,4vw,50px)` at `--data`, the unit in 11.5px sans muted 9px below, then a 14.5px Literata sentence at `max-width:30ch`. The sentence names the system and the mechanism, not the benefit. The percentage tile reads "faster queries" and lets the sentence carry the comparison.

### System rows and role rows

```
<article class="role-row" id="walmart">
  <p class="role-meta"><span class="co">Walmart Global Tech</span>Aug 2023 to May 2025<br>Bentonville</p>
  <div class="systems">
    <a class="system" id="catalog-cleanup" href="report.html#sys-cleanup">
      <span class="system__name">Catalog cleanup</span>
      <span class="system__desc">A C# service that finds duplicate records.</span>
      <span class="system__res">30%</span>
    </a>
  </div>
</article>
```

`.role-row` is `210px minmax(0,1fr)` with `gap:clamp(20px,4vw,48px)` and `padding:30px 0` over a 1px `--line` top border; the first row switches that border to `--line-2`. The meta column sets `.co` at 15px/600 ink with 3px below, then dates and city in 12.5px muted, split by `<br>`.

`.systems` opens with a 1px `--line` rule and 18px of air. `.system` is `minmax(0,1fr) auto`, `gap:6px 20px`, `padding:13px 0`, a 1px `--line` bottom border, aligned on baselines. `.system__name` is 14px ink, `.system__desc` 12.5px muted beneath it, `.system__res` in the right column spanning both rows at serif 20px in `--data`, `white-space:nowrap`.

### Figure panels and captions

```
<figure class="figure bleed" data-reveal aria-labelledby="fig2-cap">
  <div class="figure__panel"><svg class="figure__chart" role="img" aria-label="...">...</svg></div>
  <figcaption class="figure__cap" id="fig2-cap">
    <b>Figure 2</b>
    <span>Query latency indexed to the baseline. The raw milliseconds were not kept, so the index is the measurement.</span>
  </figcaption>
</figure>
```

The panel is `--panel` at 10px radius with `padding:clamp(16px,2.4vw,24px)`. The caption sits outside it, in the reading column, as `auto minmax(0,1fr)` with a 12px gap: `b` holds the number in ink at 600 and `nowrap`, the span holds the claim and then the assumption. `.bleed` is `grid-column:2;width:100%`, so a figure fills the 720px measure while text keeps the same column. Figure 1 is the one HTML diagram, `.anatomy`: a `1fr 150px 1fr` grid of three `.src` cards, a 1px merge line labelled "the same garment?", and one `.anatomy__record` with a 1px ink border.

### Chart primitives

```
<text class="svg-label" x="140" y="74" text-anchor="end">Before</text>
<rect class="bar bar-before" x="160" y="52" width="700" height="44"></rect>
<rect class="bar bar--b bar-after" x="160" y="148" width="490" height="44"></rect>
```

Every mark is a class, never a fill attribute, so charts follow the theme. `.svg-label` is 15px sans in `--muted`, `.svg-value` 17px sans at 600 in `--ink` with `tabular-nums`. `.bar-before` fills `--cell`, `.bar-after` and `.bar-solid` fill `--data`. `.cell` is Figure 3's unit square, `.svg-accent` fills `--data`, `.svg-soft` fills `--body`, `.svg-on-data` fills `--on-data` for a value printed inside a bar. `.line-base` is a 2px `--baseline` stroke, `.line-data` a 2.5px `--data` stroke, both round-capped. `.band` fills `--band`, `.band-accent` fills `--data` at .16. `.chart-grid`, `.chart-axis`, `.chart-end-base`, and `.chart-end-data` exist for the marks Figure 5 builds in JavaScript.

### Abstract

`section.abstract` is a `--panel` block at 12px radius, `padding:clamp(24px,4vw,40px)`, capped at the 720px measure and centered. Inside: `p.abstract__label` in Instrument Serif italic 20px clay, then two paragraphs at 18.5px/1.62 in `--body`. The label is a paragraph, not a heading; the section carries `aria-label="Abstract"`.

### Method rows

```
<dl class="method">
  <div class="method__row" data-kind="measured"><dt>Measured</dt><dd>30% faster queries.</dd></div>
</dl>
```

`dl.method` sits under a 1px `--line-2` rule. Each `.method__row` is `130px minmax(0,1fr)`, 22px gap, `padding:14px 0`, a `--line` bottom border. The `dt` is 13px/500 sans and its color is the whole state system: `data-kind="measured"` takes `--data`, `"derived"` takes `--data-soft`, `"assumed"` takes `--assume`, an unmarked row stays `--muted`. `dd` is 16px Literata at 1.6.

### Section headings and bylines

```
<h2 id="problem-h"><span class="n" aria-hidden="true">1</span>The same shirt, six ways</h2>
<h3 id="sys-cleanup"><span class="h3n" aria-hidden="true">2.1</span>Cleaning</h3>
<div class="byline"><span>Van Sirisouk</span><span>New York</span><span>October 2026</span><span>3 minute read</span></div>
```

`.sec h2` is serif `clamp(30px,3.4vw,40px)` at 1.08, flex-aligned on baselines with a 16px gap to the numeral. `.n` is italic at `.6em` of the heading size in `--data`, `flex:none`, `width:.62em`, shifted up `-.26em`. `.sec h3` is `clamp(22px,2.1vw,26px)` at 1.2 with a `.42em` gap and a `.8em` `.h3n` shifted `-.06em`. Both numerals are `aria-hidden`. The page head h1 is `clamp(38px,4.8vw,60px)` at 1.02 with `-.02em` tracking, capped at 18ch. `.byline` is a centered wrapping row, 12.5px sans, `.01em`, gap `8px 26px`, name in ink. `.deck` is Literata `clamp(18px,1.55vw,21px)` at 1.5 in muted, 44ch, balanced.

### Contact block

The report ends with `section.contact`: a serif h2 at `clamp(30px,3.4vw,40px)`, one paragraph, then `.actions` holding one `.pill` and two `.textlink`s. Home has `.contact-strip` instead, a top rule, an 11.5px label, the `.mail` address in serif `clamp(24px,3vw,30px)` with a 1px bottom border, and a 13px note row of text links. About uses `.contact-card`, the same `.mail` at `clamp(22px,2.4vw,27px)` under a `--line-2` rule, with a 13px paragraph and a `.row` of text links.

## Variants

| Group | Variant | Selector | What changes |
|---|---|---|---|
| Badges | location chip | `.badge--loc` | 12px indigo pin, 9/11 padding |
| Result tile | only form | `.result` | anchor, hover fill; stacks to `22px 0` under 760 |
| Fact rows | about facts | `.facts` | 110px `dt` column, 13px |
| System row | link | `a.system` | hover fill and name underline |
| System row | fact | `.systems--facts .system` | no hover, default cursor, `div` |
| Role row | first | `.role-row:first-of-type` | top border `--line-2` |
| Role row | stacked | media 900 | one column, meta wraps inline |
| Figure | bleeding | `.bleed` | full 720px measure |
| Figure | revealed | `figure[data-reveal]` | bars, cells, clip animate in |
| Chart mark | before / after | `.bar-before`, `.bar-after` | `--cell` against `--data` |
| Method row | measured, derived, assumed, none | `[data-kind]` | `dt` color only |
| Heading | section, subsection | `.sec h2` + `.n`, `.sec h3` + `.h3n` | numeral at .6em, .8em |
| Contact | report, home strip | `.contact` + `.pill`, `.contact-strip` | filled pill against a mail display link and note row |

## States

| State | Where | Behavior |
|---|---|---|
| Hover | `.result` | background `--hover` over .18s, sentence turns ink |
| Hover | `a.system` | background `--hover` over .16s, name underlines at 3px offset |
| Hover | `.pill`, `.mail`, `.textlink` | ink fill or border, see `../components/actions.md` |
| Focus visible | every link and control | 2px `--data` outline at 3px offset, 2px radius |
| Reveal | `figure[data-reveal]` | `.in` added once by an IntersectionObserver at 0.25 |

What does not exist: no disabled, loading, empty, error, or success state on any component on this page. Badges are not links and have no hover. Role rows are not links. Chart marks do not respond to pointer or keyboard; there is no tooltip, no crosshair, and no data table fallback. Nothing here sorts or filters. No visited or active state is styled, so a followed result tile looks like an unfollowed one.

Reveals: bars go from `scaleX(0)` to `scaleX(1)` over .9s from a left origin, the second bar delayed .12s. Figure 3's 104 cells fade in and lift 4px over .5s with `calc(var(--i) * 4ms)`, so the last square starts at 412ms. Figure 4's line is revealed by a clip rect animating 0 to 900 user units over 1.15s. With `prefers-reduced-motion: reduce` or no IntersectionObserver, the script adds `in` at once. With JavaScript off, neither happens: bars stay at `scaleX(0)`, cells at `opacity:0`, and Figure 3's squares are never created. The SVG labels and values still render, so the numbers survive and the marks do not. There is no `noscript` fallback.

## Measurements and tokens

| Component | Property | Value |
|---|---|---|
| `.badgeline` | gap, type | `8px 9px`, sans 14, margin-top 26 |
| `.badge` | box, type | `padding:5px 10px`, radius 4, 14px/1 ink |
| `.badge--loc` | padding | 9 left, 11 right, 12px pin |
| `.badgeline` mobile | gap, type | `7px 8px`, 13px, margin-top 20 |
| `.results` | grid | `repeat(3,minmax(0,1fr))`, `--line-2` edges |
| `.result__num` | type | serif `clamp(36px,4vw,50px)`, 1, `-.01em` |
| `.result__unit` | type | sans 11.5, margin-top 9 |
| `.result__what` | type | 14.5/1.5, margin-top 14, `max-width:30ch` |
| `.system` | grid | `1fr auto`, gap `6px 20px`, `13px 0` |
| `.system` type | name, desc, res | 14 ink, 12.5/1.5 muted, serif 20 `--data` |
| `.system` mobile | grid, res | desc spans `1 / -1`, res 18px |
| `.role-row` | grid | `210px 1fr`, gap `clamp(20px,4vw,48px)`, `30px 0` |
| `.role-row h2` | type | serif `clamp(24px,2.8vw,32px)`, 1.08, `-.015em` |
| `.role-row p` | type | 16/1.6, `max-width:60ch` |
| `.role-meta` | type | 12.5/1.7 muted, company 15/600 ink |
| `.figure__panel` | box | radius 10, `padding:clamp(16px,2.4vw,24px)` |
| `.figure__cap` | grid, type | `auto minmax(0,1fr)`, gap 12, 13/1.55 |
| `.figure__cap` mobile | grid | one column, gap 4 |
| `.svg-label` | type | sans 15, `.01em`, `--muted` |
| `.svg-value` | type | sans 17/600, `tabular-nums`, `--ink` |
| SVG under 760 | label, value | 26 and 28 user units |
| `.abstract` | box | radius 12, `clamp(24px,4vw,40px)`, max 720 |
| `.abstract__label` | type | serif italic 20, `--assume` |
| `.abstract p` | type | 18.5/1.62; mobile 17px, 22 padding, radius 10 |
| `.method__row` | grid | `130px 1fr`, gap 22, `14px 0` |
| `.method__row dt` | type | 13/500, `padding-top:2px` |
| `.method__row dd` | type | 16/1.6 |
| `.sec h2` | type | `clamp(30px,3.4vw,40px)`, 1.08, `-.012em` |
| `.sec h2 .n` | numeral | `.6em` italic `--data`, width `.62em`, `-.26em` |
| `.sec h3` | type | `clamp(22px,2.1vw,26px)`, 1.2, `-.008em` |
| `.sec h3 .h3n` | numeral | `.8em` italic `--data`, `-.06em` |
| `.page-head h1` | type | `clamp(38px,4.8vw,60px)`, 1.02, `-.02em`, 18ch |
| `.hero h1` | type | serif `clamp(50px,7.6vw,104px)`, .94, `-.02em` |
| `.masthead h1` | type | serif `clamp(46px,6.9vw,94px)`, .98, max 960, centered |
| `.byline` | type | 12.5, gap `8px 26px`, `.01em`, 12 on mobile |
| `.deck` | type | `clamp(18px,1.55vw,21px)`, 1.5, 44ch |
| `.fig5__num` | type | serif `clamp(40px,5.4vw,62px)`, .95, `--data` |
| `.fig5__unit` | type | sans 13 muted, 30ch, `padding-bottom:8px` |
| `.contact` | box | `padding-top:clamp(28px,3.5vw,40px)`, h2 at 1.1 |

Tokens this group reads: `--badge-bg`, `--badge-border`, `--panel`, `--ink`, `--ink-hover`, `--body`, `--muted`, `--line`, `--line-2`, `--data`, `--data-soft`, `--assume`, `--hover`, `--cell`, `--baseline`, `--band`, `--band-key`, `--chart-grid`, `--chart-axis`, `--on-data`. All have dark values, and no component here hard-codes a hex.

Rendered chart type is smaller than the number suggests, because the SVG viewBox is 900 wide and scales to the panel. At the 720px measure with 24px padding a 15-unit label renders at about 11px. At a 390px viewport the panel holds about 318px, so a 26-unit mobile label renders near 9px, under the 13px caption floor. That is the one place in this group where the small-type floor is not met.

### Divergences

- `DESIGN.md` gives `badge` a `textColor` of `{colors.body}` and `padding:4px`. The CSS uses `color:var(--ink)` and `padding:5px 10px` with a 4px radius, so the spec's 4px matches the radius, not the padding.
- `.about-grid h2` runs `clamp(26px,3vw,34px)`, between the 26px h3 step and the 40px h2 step. `DESIGN.md` says nothing sits between steps.
- `.role-row h2` at `clamp(24px,2.8vw,32px)` with `-.015em` is a local heading size, not a documented step.
- `report.html` carries a full second copy of the tokens and the five `@font-face` rules, plus its own `.pill`, `.textlink`, `.skip`, and `.sr-only`. It defines `--measure:720px` where the shared file has `--page:1040px`. A token change has to be made twice.

## Usage

Badges appear once, on the home page under the h1, and state role, employer, and city. They are not tags or filters and never take an accent; the pin is the only colored detail and it means place. Result tiles appear once, under the home statement, and each links to the system on the work page that produced the number. Work page system rows link into the report section that explains the measurement; the fact variant on the Meta role is not a link because the report does not cover those numbers.

A figure panel holds one chart or diagram, never a title, and the caption does the naming. Every caption states its assumption in its second half: the index stands in for milliseconds that were not kept, 20 seconds is an estimate, the annual number is a projection, the two model inputs are assumptions. Figure 1's caption also says it is illustrative, because the three supplier submissions are an invented example of the mechanism.

The abstract is report only. `DESIGN.md` keeps report furniture off the home page, and that includes the abstract, the numbered sections, and the method table.

No invented numbers: every figure on these components traces to a measurement recorded in `README.md`, or to arithmetic on one, and the method table is where that classification is written down. A layout that wants a fourth tile gets three. Revenue is listed as not measured rather than estimated, and the Meta numbers stay on the work page because the report does not carry them.

## Do and don't

- Do put the mechanism next to the number. A tile without a sentence is decoration.
- Do keep the assumption in the caption, in the same sentence as the claim.
- Do let `data-kind` carry the method color and the `dt` word carry the same meaning in text.
- Do use class names for chart fills so both themes work.
- Don't color a badge, a caption, a byline, a role meta line, or a chart label.
- Don't add hover to a fact row or a role row. Neither is interactive.
- Don't add a third accent, a shadow, or a border to make a tile stand out.

## Accessibility

- Focus: the global `:focus-visible` rule draws a 2px `--data` outline at 3px offset. On a result tile or system row it wraps the whole target, so the whole tile is one focus stop.
- Result tiles: one anchor holds number, unit, and sentence, so the name reads "450,000 records per second The attire intake pipeline..." with no label invented separately.
- System rows: the link variant is an `a` around three spans; the fact variant is a `div`, so it is not focusable. `.system__res` comes last, so a screen reader hears the result after the description.
- Badges: `.sr-only` adds "Currently". The pin is `aria-hidden`. The row reads "Software Engineer II at Atlassian in New York". Under 760px `.conn-in` is `display:none`, so it reads "at Atlassian New York" and the preposition is gone, with no replacement text. Badges and captions are not interactive, so the 44px floor does not apply to them.
- Figures: each SVG carries `role="img"` and an `aria-label` stating the series, values, direction, and percentage, so it is not read as loose text nodes. Figure 5 points `aria-labelledby` at a `<title>` and the script rewrites `aria-label` on every draw. Its `.fig5__legend` is `aria-hidden` because it is swatches only; meaning lives in the label and caption.
- Figure 5 controls: each range has a label wrapping the name and an `<output for>`, and a `role="status" aria-live="polite"` line announces new hours on change. The ranges themselves are in `../components/inputs.md`.
- Method: `data-kind` is not exposed to assistive technology and does not need to be. The `dt` words carry the classification, which is why color can be the only visual signal.
- Headings: numerals are `aria-hidden`, so a heading name starts at the first word and the outline reads "The same shirt, six ways". The abstract label is a `p`, so the abstract is not in the heading outline; the section has `aria-label="Abstract"`.
- Byline: four spans with no punctuation and no separators, only a gap. A screen reader reads them as adjacent strings with no pause cue.
- Contrast: indigo on the panel is 9.2:1 light and 8.9:1 dark, muted labels 5.8:1 and 6.7:1, clay 5.5:1 on the panel. Chart labels are the weak point at narrow widths, as noted above.

## Source

- `assets/site.css`: `.badgeline` to `.bgroup` 230 to 246, `.panel` 247 to 248, `.page-head` to `.prose` 250 to 259, reduced motion 296 to 299, print 300 to 304, tokens 30 to 109.
- `index.html`: result tile, band link, and contact strip styles 28 to 69; badge line 101 to 114, results 122 to 141, contact strip 143 to 151.
- `work.html`: role and system styles 13 to 58, markup 92 to 158.
- `about.html`: facts and contact card styles 22 to 48, markup 88 to 104.
- `report.html`: inline token copy 42 to 136; masthead, deck, byline, abstract 202 to 250; figures and chart classes 252 to 289; anatomy 290 to 309; model output and legend 311 to 322; method 349 to 356; contact 358 to 370; responsive 381 to 405; print 410 to 415; markup 445 to 689; figure script 691 to 851.
- `DESIGN.md`: Colors, Typography, Layout, Shapes, Components, Do's and Don'ts.
- `README.md`: "The numbers, and where they come from", "Design notes".
- Screenshots: `../../preview/badges.png`, `../../preview/home.png`, `../../preview/work.png`, `../../preview/report-figure1.png`, `../../preview/report-dark-figures.png`. Related: `../foundations/typography.md`, `../foundations/color-and-theme.md`, `../components/actions.md`, `../components/inputs.md`, `../surfaces/report.md`.
