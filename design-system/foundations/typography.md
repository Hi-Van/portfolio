---
title: Typography
group: Foundations
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/site.css
  - assets/tui.css
  - report.html
---

# Typography

Three families, five local woff2 files, and one scale from a 10px caps key to a 104px hero. Instrument Serif carries display lines and the large measured figures, Literata carries reading text, Instrument Sans carries anything that behaves like interface. The report repeats the same five faces inline because it is a separate document type, and the chat page changes size through two custom properties rather than a second scale.

## The three families

| Family | Role | Where it appears |
| --- | --- | --- |
| Instrument Serif | Display voice, measured figures, italic section numerals | h1, h2, h3, result numbers, system results, model output, abstract label, chat avatar |
| Literata | Reading face | Body copy, lede, deck, abstract paragraphs, chat messages, composer input |
| Instrument Sans | Interface face | Navigation, buttons, badges, captions, labels, chart text, method rows, footers |

The stacks are declared once in `:root` and reused:

```css
--serif:"Instrument Serif",Georgia,"Times New Roman",serif;
--text:"Literata",Georgia,"Times New Roman",serif;
--sans:"Instrument Sans","Helvetica Neue",Arial,sans-serif;
```

## Local faces

All five files sit in `assets/fonts/`. `site.css` points at `fonts/...`, `report.html` at `assets/fonts/...`, and every face declares `font-display:swap`.

| File | Family | Weight | Style | Extra |
| --- | --- | --- | --- | --- |
| `instrument-serif.woff2` | Instrument Serif | 400 | normal | none |
| `instrument-serif-italic.woff2` | Instrument Serif | 400 | italic | none |
| `literata.woff2` | Literata | 200 to 900 | normal | `font-optical-sizing:auto` in the face |
| `literata-italic.woff2` | Literata | 200 to 900 | italic | optical sizing comes from `body` |
| `instrument-sans.woff2` | Instrument Sans | 400 to 700 | normal | `font-stretch:75% 100%` |

There is no preload hint on any page, so first paint uses Georgia, Times New Roman, or Helvetica Neue and swaps when the file arrives. None of the fallback faces carry `size-adjust` or ascent overrides, so the swap can move a line.

## Weights and styles

Only 400, 500, and 600 render.

- 400 is the default for all display type, all reading type, navigation, badges, captions, and chart labels.
- 500 goes to `.pill`, `.btn-rect`, `.top__cta`, `.method__row dt`, `.src__k`, `.rec__k`, and caps keys. 600 goes to `.top__name`, `.role-meta .co`, `.figure__cap b`, `.control output`, `.svg-value`, `.msg__who`, `.agent__title`, and the "you" avatar.

The Sans variable range reaches 700 and no rule uses it. Literata's 200 to 900 is used only at 400. No italic sans face exists and no rule asks for one. Serif italic is real and is used for the report section numerals (`.sec h2 .n`, `.sec h3 .h3n`) and the abstract label. `font-synthesis` is not disabled, so a future bold serif or italic sans would be synthesized by the browser rather than fail.

Optical sizing is on for the page. `font-optical-sizing:auto` sits on `body` in `site.css` and again in `report.html`, and Literata is the only family with an optical size axis. Instrument Serif is a single 400 outline pair and Instrument Sans is a weight and width variable with no optical axis, so their drawing does not change with size. The Sans width axis is declared but never addressed with `font-stretch`, so every sans run uses 100%.

## The scale, by token

These are the 13 typography entries in `DESIGN.md`, verbatim.

| Token | Family | Size | Weight | Leading | Tracking |
| --- | --- | --- | --- | --- | --- |
| `display-home` | Instrument Serif | 104px | 400 | 0.94 | -0.02em |
| `display-report` | Instrument Serif | 94px | 400 | 0.98 | -0.02em |
| `display-page` | Instrument Serif | 60px | 400 | 1.02 | -0.02em |
| `heading-2` | Instrument Serif | 40px | 400 | 1.08 | -0.012em |
| `heading-3` | Instrument Serif | 26px | 400 | 1.2 | -0.008em |
| `lede` | Literata | 18.5px | 400 | 1.6 | not set |
| `body` | Literata | 19px | 400 | 1.66 | not set |
| `body-small` | Instrument Sans | 16px | 400 | 1.6 | not set |
| `caption` | Instrument Sans | 13px | 400 | 1.55 | not set |
| `label` | Instrument Sans | 12.5px | 400 | 1.66 | 0.01em |
| `caps-key` | Instrument Sans | 10px | 500 | 1.62 | 0.1em |
| `chart-label` | Instrument Sans | 15px | 400 | 1 | not set |
| `chart-value` | Instrument Sans | 17px | 600 | 1 | not set |

Only the interface tokens below 16px render at their stated value everywhere. Every token at 16px and above is the maximum of a clamp, and the chat sizes sit outside the scale.

## Implemented sizes by surface

| Surface | Selector | Size | Leading | Tracking |
| --- | --- | --- | --- | --- |
| Home | `.hero h1` | clamp(50px, 7.6vw, 104px) | 0.94 | -0.02em |
| Home | `.statement` | clamp(19px, 1.7vw, 22px) | 1.5 | none |
| Home | `.result__num` | clamp(36px, 4vw, 50px) | 1 | -0.01em |
| Home | `.result__unit` / `.result__what` | 11.5px / 14.5px | inherit / 1.5 | none |
| Work, about | `.page-head h1` | clamp(38px, 4.8vw, 60px) | 1.02 | -0.02em |
| Work, about | `.page-head .lede` | 18.5px | 1.6 | none |
| Work | `.role-row h2` | clamp(24px, 2.8vw, 32px) | 1.08 | -0.015em |
| Work | `.role-row p` | 16px | 1.6 | none |
| Work | `.role-meta` / `.role-meta .co` | 12.5px / 15px | 1.7 / 1.7 | none / -0.01em |
| Work | `.system__name` / `.system__desc` | 14px / 12.5px | inherit / 1.5 | none |
| Work | `.system__res` | 20px, 18px under 760 | inherit | none |
| About | `.about-grid h2` | clamp(26px, 3vw, 34px), no markup uses it | 1.1 | -0.014em |
| About | `.facts` / `.contact-card p` | 13px / 13px | inherit / 1.6 | none |
| Report | `.masthead h1` | clamp(46px, 6.9vw, 94px) | 0.98 | -0.02em |
| Report | `.deck` | clamp(18px, 1.55vw, 21px) | 1.5 | none |
| Report | `.byline` | 12.5px, 12px under 760 | inherit | 0.01em |
| Report | `.abstract__label` | 20px italic | normal | none |
| Report | `.abstract p` | 18.5px, 17px under 760 | 1.62 | none |
| Report | `.sec h2` / `.contact h2` | clamp(30px, 3.4vw, 40px) | 1.08 / 1.1 | -0.012em |
| Report | `.sec h2 .n` / `.sec h3 .h3n` | 0.6em / 0.8em italic | inherit | 0 |
| Report | `.sec h3` | clamp(22px, 2.1vw, 26px) | 1.2 | -0.008em |
| Report | `body` | 19px, 17.5px under 760 | 1.66, 1.62 under 760 | none |
| Report | `.figure__cap` | 13px | 1.55 | none |
| Report | `.svg-label` / `.svg-value` | 15px / 17px | 1 | 0.01em / none |
| Report | `.svg-label` / `.svg-value` mobile | 26px / 28px | 1 | 0.01em / none |
| Report | `.src__k`, `.rec__k` | 10px, 500, uppercase | inherit | 0.1em |
| Report | `.rec__name` / `.fig5__num` | 25px / clamp(40px, 5.4vw, 62px) | 1.05 / 0.95 | none / -0.01em |
| Report | `.method__row dt` / `dd` | 13px, 500 / 16px | inherit / 1.6 | none |
| Chat | `.agent__title` / `.agent__hash` / `.agent__topic` | 15px, 600 / 15px / 10.5px | inherit | -0.01em / none / 0.02em |
| Chat | `.msg__who` / `.msg__time` | 13px, 600 / 10.5px | inherit | -0.005em / 0.01em |
| Chat | `.msg__tag` | 9.5px, uppercase | 1.5 | 0.1em |
| Chat | `.msg__text`, `.composer__input` | 16.5px, 16px under 760 | 1.62 | none |
| Chat | `.msg__note` / `.msg__src` / `.msg__src span` | 10px / 10.5px / 9.5px | inherit | 0.1em / 0.01em / 0.14em |
| Chat | `.msg__suggest button` / `.msg__typing` | 13.5px / 12px | 1.45 / inherit | none |
| Chat | `.msg__system` / `.agent__hint` | 10.5px / 10.5px | inherit | 0.02em / 0.01em |
| All | `.top__name` / `.top__nav` / `.top__cta` | 14px, 600 / 13.5px / 13.5px, 500 | inherit | -0.01em / none / none |
| All | `.badge` / `.badgeline` | 14px, 13px under 760 | 1 / inherit | none |
| All | `.pill` / `.btn-rect` / `.textlink` | 14px, 500 / 14px, 500 / 14px | inherit | none |
| All | `.foot__in` | 12px | 1.7 | none |

`.top__cta` has no size of its own. It inherits 13.5px from `.top__nav` and becomes 14px under 760, where `.top__nav a` sets the size.

## Leading and tracking

Leading tightens as type grows. Display sits at 0.94 to 0.98, page h1 at 1.02, section headings at 1.08 to 1.2, reading text 1.6 to 1.66, deck and statement 1.5, interface 1.45 to 1.7, and single-line numbers at 0.95 to 1. Nothing below 1.45 except display and figures. The report body drops from 1.66 to 1.62 under 760 while the size drops from 19 to 17.5, so the line box shrinks faster than the type.

Display tracking is `-0.02em` on every h1. Report h2 takes `-0.012em`, report h3 `-0.008em`. The other headings sit between: work h2 `-0.015em`, about h2 `-0.014em`. Numerals and large figures take `-0.01em` (`.result__num`, `.fig5__num`), and the same value serves `.top__name`, `.agent__title`, and `.role-meta .co`. Italic section numerals reset to 0 because the italic already leans. Uppercase runs take `0.1em` (caps keys, `.msg__tag`, `.msg__note`) or `0.14em` (`.msg__src span`). Meta text takes `0.01em` or `0.02em`. Nothing is tracked looser than `0.14em`.

## Measures

| Measure | Where |
| --- | --- |
| 960px | `.masthead h1` max width on report |
| 720px (`--measure`) | report article column and abstract, figures included; about 80ch at 19px Literata, no ch cap |
| 70ch | `.foot__in p` on report |
| 62ch | `.prose p`, `.work-foot` |
| 60ch | `.role-row p` |
| 54ch | `.page-head .lede` |
| 44ch | `.statement`, `.deck` |
| 30ch | `.result__what`, `.fig5__unit` |
| 18ch | `.page-head h1` |

The 80 character figure is measured, not declared: the report sets a 720px column and lets Literata fill it, while the site pages cap prose at 62ch and the lede at 54ch. `DESIGN.md` states 80 without naming a surface, which reads as a site rule but is only true of the report.

## Wrapping

`p,figcaption{text-wrap:pretty}` is global. Balance is added on `.page-head h1`, `.masthead h1`, `.deck`, and `.figure__cap span`. `.statement` gets `pretty` only. There is no `text-align:justify` anywhere in the five pages, and no `hyphens` declaration, so long words do not break.

## Responsive clamps

Every display size is a viewport clamp, so it keeps growing after the 1040px frame stops.

| Selector | Clamp | Reaches max at | Stops shrinking at |
| --- | --- | --- | --- |
| `.hero h1` | 50 to 104, 7.6vw | 1368px viewport | 658px |
| `.masthead h1` | 46 to 94, 6.9vw | 1362px | 667px |
| `.page-head h1` | 38 to 60, 4.8vw | 1250px | 792px |
| `.sec h2`, `.contact h2` | 30 to 40, 3.4vw | 1176px | 882px |
| `.sec h3` | 22 to 26, 2.1vw | 1238px | 1048px |
| `.role-row h2` | 24 to 32, 2.8vw | 1143px | 857px |
| `.deck` | 18 to 21, 1.55vw | 1355px | 1161px |
| `.statement` | 19 to 22, 1.7vw | 1294px | 1118px |
| `.result__num` | 36 to 50, 4vw | 1250px | 900px |

At 760 the site body drops to 17px, badges and the badge line to 13px, the byline and report body to 12px and 17.5px, `.system__res` to 18px, the report abstract to 17px, and chat text to 16px. The nav menu appears at the same breakpoint with 14px links. Under 380 the chat hides the header rule and topic.

## Chart type

Chart type is set in SVG user units on a 900 wide viewBox, so rendered size is the unit size times the panel inner width divided by 900.

- Desktop: `.svg-label` 15 units, `.svg-value` 17 units at 600 with `tabular-nums`. In the 720 column with 24px panel padding, the inner width is 672, so labels render near 11.2px and values near 12.7px.
- Mobile: labels 26 units, values 28 units. At a 350px viewport the panel inner width is about 278px, so those units render near 8.0px and 8.6px, smaller than the desktop rendering.

Values are ink, labels muted, and `.fig5__num` adds `lining-nums`. `DESIGN.md` calls 15 units "about 11px rendered", which matches desktop and does not describe mobile.

## The chat exception

`.agent` sets `--chat-size:16.5px` and `--chat-leading:1.62`, the message and input rules read them, and the 760 block sets `--chat-size:16px`. Chat text is Literata 16.5 at 1.62, and 16 at 1.62 on mobile, against 17.5 site body and 19 report body. Interface sizes step down with it: header 15, author 13 at 600, timestamp 10.5, suggestion 13.5 at 1.45, system line 10.5, typing 12, hint 10.5, source line 10.5 with a 9.5 uppercase label, note and tag 10 and 9.5 uppercase. The avatar is a 26px box, Instrument Serif 16 for the agent and Instrument Sans 13 at 600 for the reader, 24px with 10.5 type on mobile. The send arrow is 16px and the hint is hidden under 760.

## Dark mode

Type does not change in dark mode. Neither dark block contains a font family, size, weight, style, tracking, or line height declaration. Families, scale, measures, wrapping, and leading are identical; only `--ink`, `--body`, `--muted`, `--data`, `--assume`, and the surface tokens change. The report carries its own copy of both token sets inline and behaves the same way. Contrast belongs to [color and theme](./color-and-theme.md).

## Accessibility

- Every screen size is in px, and print swaps body to 10.5pt. There is no rem type and no root font size setting, so a reader's browser font size preference does not change the page; only page zoom does.
- The stated floor is 10px, and two rules sit under it: `.msg__tag` and `.msg__src span` at 9.5px. Both are uppercase with wide tracking.
- Chart labels at 8px rendered on mobile are the smallest text on the site, below every other limit.
- `.badge` and `.badgeline` drop to 13px on mobile without a leading change.
- Focus rings are 2px `--data` at 3px offset; the chat overrides to `--tui-accent` at 2px. No text is justified and no hyphenation is enabled, so rag is uneven by design and long tokens push the measure rather than break.
- The five faces load with `swap` and metric-different fallbacks, and no `size-adjust`, so text can reflow once after first paint.

## Divergences

| Item | `DESIGN.md` | Implemented | Source |
| --- | --- | --- | --- |
| Body size | 19px Literata, and prose says "body copy at 19px" | 17.5px on the site pages, 17px under 760; 19px only on the report | `site.css` 156, `report.html` 143 |
| `body-small` family | Instrument Sans 16/1.6 | Literata 16/1.6 in `.role-row p` and `.method__row dd` | `work.html` 25, `report.html` 356 |
| Serif minimum | Instrument Serif "appears only at 26px and above" | 20px `.system__res`, 25px `.rec__name`, 20px `.abstract__label`, 16px `.msg__avatar` | `work.html` 37, `report.html` 225, 307, `tui.css` 70 |
| Scale steps | "Nothing sits between two steps" | `.statement` clamp 19 to 22, `.lede` 18.5, `.deck` 18 to 21, chat 16.5 | `index.html` 23, `site.css` 257 |
| h2 tracking | `-0.012em` | `-0.015em` on work, `-0.014em` on about, `-0.012em` only on report | `work.html` 23, `about.html` 20 |
| Caps floor | 10px at 500 | 9.5px `.msg__tag` and `.msg__src span` | `tui.css` 76, 94 |
| Contact pill | `typography.label`, 12.5px | `.top__cta` 13.5px, 14px under 760; `.pill` 14px | `site.css` 184, 198, 211 |
| Label leading | `label` 1.66 | 1.7 on `.role-meta`, 1.5 on `.system__desc`, 1.45 on suggestions | `work.html` 19, 36 |
| About h2 | No token covers an about heading; `heading-3` is a fixed 26px | Rule at clamp 26 to 34, and no about markup contains an h2 | `about.html` 18, 82 |
| Measure | "about 80 characters per line" | 720px uncapped on report only; site prose 62ch, lede 54ch | `site.css` 258, `report.html` 74 |

## Source

- `DESIGN.md` 14 to 86 typography tokens, 165 to 177 type rules, 207 to 218 do and don't.
- `assets/site.css` 3 to 28 faces, 65 to 67 stacks, 153 to 159 base, 183 to 245 top bar and interface, 252 to 258 heads, lede, prose, 266 footer, 274 to 295 mobile, 300 to 304 print.
- `assets/tui.css` 4 to 8 Ask label, 23 to 24 chat properties, 40 to 49 header, 67 to 97 message meta and text, 100 to 116 suggestions and system lines, 128 to 152 composer and hint, 158 to 175 mobile.
- `report.html` 15 to 40 faces, 74 measure token, 141 to 146 body, 202 to 216 masthead, deck, byline, 219 to 230 abstract, 233 to 248 section headings, 252 to 263 figures and chart type, 293 to 309 diagram type, 311 to 319 model, 327 to 329 controls, 350 to 356 method, 372 to 378 footer, 381 to 405 mobile, 410 to 414 print.
- `index.html` 17 to 25 hero and statement, 39 to 44 results, 46 band link, 50 to 61 contact strip. `work.html` 19 to 25 role row, 35 to 37 systems, 43 to 45 work foot, 48 to 57 mobile. `about.html` 18 to 38 grid, facts, contact card.

Related: [color and theme](./color-and-theme.md), [space, shape, motion](./space-shape-motion.md), [accessibility](./accessibility.md), [evidence](../components/evidence.md), [messaging](../components/messaging.md).
