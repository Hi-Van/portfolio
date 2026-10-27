---
title: Accessibility
group: Foundations
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/site.css
  - assets/tui.css
  - assets/site.js
  - assets/theme.js
  - assets/tui.js
  - index.html
  - work.html
  - about.html
  - report.html
  - ask.html
---

# Accessibility

Five static pages, one shared stylesheet, and three small scripts. The accessibility layer is written by hand and stays thin: a skip link first in the body, one focus ring for `:focus-visible`, four landmarks, state attributes on the controls that change, and two polite live regions. This page states the implemented values, the keyboard paths they produce, and the places where the implementation falls short.

## Rules

- Keyboard reaches every control in reading order. Script moves focus only into the chat input, on load and after a suggestion runs.
- One focus ring: 2px indigo at 3px offset, on `:focus-visible` only.
- Every page opens with `.skip` pointing at `#main`.
- Anything that appears without a page load is announced through a polite live region.
- Colour never carries meaning alone. The method table prints `Measured`, `Derived`, `Assumed` and `Not measured` beside the colour, and the off-site answer prints `Not stated on the site.` in clay.

## Skip link

`.skip` is the first element in `<body>` on all five pages and reads "Skip to content".

```css
.skip{position:absolute;left:12px;top:-60px;z-index:50;background:var(--ink);color:var(--paper);
  font-family:var(--sans);font-size:13px;padding:10px 14px;border-radius:999px;text-decoration:none}
.skip:focus{top:12px}
```

It parks 60px above the viewport and drops to 12px on `:focus`, not `:focus-visible`, so it shows however it was reached. `z-index:50` puts it above the sticky bar at 30. The fill is ink and the text is paper, which inverts with the theme.

The target is `<main id="main">` on every page, including the report, where `main` wraps both the cover and `article.article`. Nothing carries `tabindex="-1"`, so the browser sets its sequential focus start point at `main` instead of moving focus to the element; the next Tab continues inside the main region either way.

## Focus

One global rule, repeated inline in `report.html` because that document does not load `site.css`:

```css
:focus-visible{outline:2px solid var(--data);outline-offset:3px;border-radius:2px}
```

`--data` is `#2b3a8f` in light and `#a9b3ff` in dark, so the ring is indigo on paper and a lifted indigo on the dark ground. Mouse clicks show no ring. The chat page overrides the ring where the 3px offset or the indigo would not read:

| Selector | Ring | Reason |
|---|---|---|
| `.agent :focus-visible` | accent at 2px offset | the log sits on `--tui-bg`, so the offset is tighter |
| `.composer__input` | inset 1px `--tui-accent`, `outline:none` | the field is a borderless pill; the ring is the border |
| `.composer__send span` | 2px `--tui-bg` at -3px | the ring is drawn inside the accent circle |
| `.control input[type=range]` | 2px data at 6px offset | the thumb is 16px inside a 20px box, so the ring has to clear it |
| `.msg__suggest button` | ring plus `--tui-hover` fill and ink text | the row is full width and needs the whole row marked |

`ask.html` keeps the global 3px ring in the top bar, because `.top` sits outside `.agent`.

## Landmarks and headings

Every page has `header.top`, `nav#site-nav` with `aria-label="Site"`, `main#main` and `footer.foot`. The report's nav is labelled "Report sections" and its `article.article` holds the sections. In-page sections are labelled rather than headed on the home page (`aria-label="Results at a glance"`, `aria-label="Contact"`), while the report sections use `aria-labelledby` to their `h2` and every figure uses `aria-labelledby` to its `figcaption`.

Heading order never skips a level. Work is `h1` then one `h2` per role. The report is `h1`, `h2` per section, `h3` for 2.1 to 2.3, then `h2` for "About the author". Section numerals are `<span class="n" aria-hidden="true">`, so a section announces as "The same shirt, six ways" and "Cleaning", not "1 The same shirt" and "2.1 Cleaning".

Two limits. The home and about pages stop at `h1`, so their document outline is a single heading. On about, the contact card is labelled by a paragraph, `<p id="contact-h">`, not a heading, and the `.about-grid h2` rule in that page's inline CSS has no `h2` in the markup.

## Names, labels and screen reader text

`.sr-only` is the 1px clipped recipe: `width:1px;height:1px;margin:-1px;overflow:hidden;clip-path:inset(50%)`.

- Chat input: `<label class="sr-only" for="tui-input">Ask a question</label>`. The placeholder "ask a question..." repeats it in lowercase and is not used as the name.
- Send button: `aria-label="Send message"`, with the arrow glyph in an `aria-hidden` span.
- Ask switch: a link with `aria-label="Ask the site"`, and both `.ask__track` and `.ask__label` hidden, so the word Ask is not read twice. On the chat page the label becomes "Ask the site: on. Activate to leave."
- Theme toggle: `aria-label` swaps between "Switch to dark theme" and "Switch to light theme". Both icons are `aria-hidden="true" focusable="false"`.
- Message avatars: `.msg__avatar` gets `aria-hidden="true"` in `tui.js`; the speaker reads from `.msg__who` and the bot tag is real text.
- Home badge line: an `sr-only` "Currently" opens the sentence, and the words "at" and "in" are plain text, so it reads as one statement rather than three badges.
- Hidden decoration: the location pin, the chat `#` and rule, section numerals, the figure 5 legend, and the anatomy connector. The connector holds visible text ("the same garment?") and is hidden because the labelled figure already states the relation.

## Live regions

| Region | Markup | What it says |
|---|---|---|
| Chat log | `role="log" aria-live="polite" aria-relevant="additions"` | each appended message, including the reader's own question |
| Range status | `<p class="sr-only" role="status" aria-live="polite">` | hours returned per year at the current assumptions |
| Figures 2 to 4 | none | static pictures, described by `aria-label` |

The log carries an explicit `aria-live` and `aria-relevant` even though `role="log"` implies both. Additions only, so removing the typing row and the example exchange is silent. No `aria-atomic`, so only the new node is read. The typing row is text plus three empty `<i>` dots, and only "searching this site" is announced; the answer replaces it after 620ms and is announced in turn.

There is no separate chat status element. The only progress signal is that typing row, and `busy` silently drops a second send while it is on screen.

The range status is written on every `input` event, so a slow drag queues a polite message per step. Both controls also point `aria-describedby` at `#fig5-cap`, the figure caption that states volume is fixed and the controls are assumptions. Neither input has `aria-valuetext`, so a screen reader says "25" without the percent; the unit lives in the label's `<output>` and in the caption.

Figure 5 is labelled by `aria-labelledby="f5-alt"` pointing at an internal `<title>`, and `draw()` also writes an `aria-label` with the live numbers. `aria-labelledby` wins, so those numbers never reach the chart's name. The status line is what carries the result.

## State attributes

| Attribute | Where | Behaviour |
|---|---|---|
| `aria-current="page"` | Work on `work.html`, About on `about.html` | styled to ink by `.top__nav a[aria-current="page"]` |
| `aria-current="true"` | report section links | set by the scroll spy, cleared from the others |
| `aria-expanded` | `.top__menu` | `false` to `true`, with the visible text swapping Menu to Close |
| `aria-pressed` | `.theme-toggle` | true means dark is on |
| `aria-controls` | `.top__menu` | points at `site-nav` |
| `data-on` | Ask switch on `ask.html` | `"true"`, a styling hook, not a state attribute |

The report spy watches `problem`, `systems`, `scale`, `method` and `contact` with `rootMargin: '-45% 0px -50% 0px'` and sets `aria-current="true"` on the matching `href`. `location` is the accurate token for a section nav; `true` works and is styled, but it does not say what kind of current it is. When no section intersects, the last value stays.

The theme toggle sets `aria-pressed` and changes its own name at the same time, so a screen reader announces "Switch to light theme, pressed". A stable name with the pressed state alone would say the same thing once.

## Graphics

Figures 2, 3 and 4 are `<svg role="img">` with an `aria-label` that names the chart and states the finding, for example "Bar chart. Query latency indexed to the pre-cleanup baseline: 100 before the cleanup, 70 after, a 30 percent reduction." Figure 5 is `role="img"` with a `<title>` and the live label described above. Because `role="img"` hides the `<text>` children, those labels have to carry every number a sighted reader gets, and for figures 2 to 4 they do.

Hidden as decoration: the badge pin, the sun and moon, the chat hash and rule, the section numerals, and `.fig5__legend`, which repeats the band and line meanings that the chart label already gives.

## Keyboard

Tab order, desktop: skip link, name, nav links, Ask, theme toggle, then main content, then footer links. On the four pages with a menu, the button joins after the theme toggle under 760 and the nav links leave the order while closed, because `.top__nav` is `display:none` until `.is-open`. The report has no menu, so its section links stay after the name until the media query hides them.

The mobile menu changes visual order without changing DOM order. `.top__actions` is `order:2` and `.top__nav` is `order:4`, but in the markup the nav comes before the actions. With the menu open, Tab from "Van Sirisouk" enters the links that sit below the header, then returns up to Ask and the toggle. Opening the menu leaves focus on the button, and Tab from there goes into main content, past the links it just revealed. They are only reachable with Shift+Tab. Closing it with Escape keeps focus on the button, and no handler moves focus into the panel.

Menu keys: Enter or Space opens and closes through the button, Escape closes from anywhere via a document listener, a click on any link inside closes it, and a resize past 760 closes it. The button and the panel are one control pair, so there is no focus trap and none is needed.

Chat keys: Enter submits the form, ArrowUp walks back through sent questions and ArrowDown forward, and both call `preventDefault` so the caret does not move. Escape anywhere in the document navigates to `backHref()`, which reads `?from=` and falls back to `index.html`; it leaves the page from the input, from the send button, and from the transcript.

Ranges: native behaviour holds, so arrows step by 5 and 1, Home and End jump to the ends, and the `input` event drives the output, the chart, and the status line.

## Contrast

| Text | Background | Ratio | Used for |
|---|---|---|---|
| body `#303645` | paper `#ffffff` | 12:1 | paragraphs |
| muted `#5f6673` | paper `#ffffff` | 5.8:1 | captions, meta, idle nav |
| indigo `#2b3a8f` | paper `#ffffff` | 10:1 | measured numbers, data links, focus ring |
| clay `#95522c` | panel `#f6f6f3` | 5.5:1 | abstract label, model outputs, notes on the panel |

These are the floors `DESIGN.md` records; the same pairings measure 12.07, 5.78, 9.98 and 5.51. `DESIGN.md` forbids lightening muted below `#5f6673` on white, which makes 5.8:1 the floor for interface text. The focus ring is indigo on paper at 10:1, well past the 3:1 a non-text indicator needs, and it is drawn outside the ink-filled pill so the ring never sits on its own fill colour.

Dark mode is a second token set, `#9299a8` muted and `#a9b3ff` indigo on `#0c1018`, and `DESIGN.md` records no measured floor for it. That means this page cannot certify dark mode, only the four light pairings above.

## Target sizes

| Control | Size | 44px |
|---|---|---|
| `.ask` | `min-height:44px`, 12px label | pass |
| `.composer__input` | 44 high at both widths | pass |
| `.composer__send` | 44 by 44 circle | pass |
| `.msg__suggest button` | `min-height:44px`, full width | pass |
| `.theme-toggle` | 34 by 34, 18px icon | fail |
| `.top__menu` | 58.6 by 30 measured at 400px | fail |
| range input | 20 high, 16px thumb | fail |
| `.reset` | 12px text, 18.0 high measured | fail |
| `.textlink`, footer links | inline text, no padding | fail |

The four passes come from the box, not the glyph: the send arrow is 16px inside a 44px circle, and the suggestion row is a full-width 44px target. The range thumb is 16px with a 20px input box, so the pointer target is the track height, not the thumb.

## Reduced motion

`site.css` removes motion globally and drops smooth scrolling:

```css
@media (prefers-reduced-motion:reduce){
  *{transition-duration:.001ms !important;animation-duration:.001ms !important}
  html{scroll-behavior:auto}
}
```

Smooth scrolling is only declared under `prefers-reduced-motion:no-preference`, so it is never applied on top of the override. `tui.css` narrows the same treatment to the switch, knob, message, suggestion, composer and send, and stops the typing keyframes with `opacity:.6`, leaving a static row. `report.html` repeats the global rule and its reveal script checks the query directly: when reduce matches, every `figure[data-reveal]` gets `.in` at once and no `IntersectionObserver` runs. The durations are `.001ms` rather than `none`, so the transitions still resolve; only the travel disappears, and hover lifts and bar reveals land in their end state.

## Zoom and reflow

The viewport meta on all five pages carries no `maximum-scale` and no `user-scalable=no`, and `html{-webkit-text-size-adjust:100%}` stops iOS from inflating text after rotation. At 320px every page measures `scrollWidth` 320 against `clientWidth` 320, with no element past the right edge.

What reflows: `.wrap` and `.top__in` go to 20px gutters, `.results` becomes one column, `.role-row` stacks at 900 and `.system` regrids at 760, `.about-grid` stacks at 900 and `.facts` at 600, `.controls` and `.anatomy` become one column, and `.method__row` stacks. The report keeps its three-track grid, but the middle track is `minmax(0,var(--measure))`, so it shrinks instead of overflowing.

What does not reflow is the charts. Each is a 900 unit `viewBox` with `width:100%`, so the whole picture scales. Labels step to 26 units and values to 28 under 760, which is still a division by the column width: near 10px at 375 and near 8px at 320. Page zoom enlarges the chart with the text; text-only zoom does not touch SVG text at all.

## No JavaScript

- Theme: with the head script and `theme.js` gone, no `data-theme` is written and the `prefers-color-scheme` block in `site.css` decides. The toggle is inert and still claims "Switch to dark theme" at `aria-pressed="false"`, so on a dark OS the control contradicts the page it sits on.
- Menu: the button does nothing and `.top__nav` is `display:none` under 760 until `.is-open` is added, so the four pages that use the menu have no site navigation on a phone. Desktop is unaffected because the media query never applies there.
- Chat: `#tui-log` is empty in the markup and filled by `intro()`, so the page is a header, an empty panel, and an input whose form submits a GET back to itself with `q`. Nothing answers.
- Report: the figure 3 grid and the figure 5 chart are built by script, so both render incomplete, and the two ranges do nothing. The printed value `782,925` stays at its written number, which is the value for the default assumptions.
- Static: skip link, landmarks, heading order, labels and contrast are all in markup or CSS and survive.

## Known gaps

| Component | Gap | Impact | Where |
|---|---|---|---|
| Mobile menu | focus stays on the button on open, and the nav precedes the button in the DOM, so Tab from the button goes to main content | the open links can only be reached with Shift+Tab | `index.html` 78-95, `site.js` 7-11, `site.css` 281-287 |
| Report top bar | section links are `display:none` under 760 and the markup has no menu button | a phone gets no in-page navigation, only the Contact pill | `report.html` 403, 425-431 |
| Chat transcript | no focus management when an answer arrives; focus stays in the input and the new message is announced only | a keyboard user exploring the log later has no route to the newest answer | `tui.js` 289-303, `ask.html` 48 |
| Chat | no error, retry or interrupted state; `busy` drops a second send during the 620ms wait | a slow or failed answer leaves the typing row and no control | `tui.js` 112, 280-281, 296-303 |
| Small caps | 9.5 to 10px uppercase at 0.1em tracking on the bot tag, the note, the source label and the figure keys | hard to read at default zoom, and worse on dark | `tui.css` 75-94, `report.html` 294-310 |
| Forms | no generic field, select, checkbox or radio, so no disabled, error or validation state exists to document | a future form has no pattern; the only input is the chat composer, which has no invalid state | `site.css`, `ask.html` 50-54 |
| Page position | `index.html` marks no nav link current, and `ask.html` uses a label instead of `aria-current` | the nav never says which page is home, and the chat page says it in prose | `index.html` 78-83, `ask.html` 27 |

## Source

- `assets/site.css` 152, 164 for smooth scroll and the focus ring; 165 to 167 for `.skip` and `.sr-only`; 274 to 295 for the mobile nav rules; 296 to 299 for reduced motion; 110 to 148 for the OS dark block.
- `assets/tui.css` 29 for the chat ring, 108 for the suggestion focus fill, 135 to 151 for composer focus, 177 to 180 for reduced motion.
- `assets/site.js` 7 to 27 for `aria-expanded`, the click, Escape, link and resize handlers.
- `assets/theme.js` 12 to 18 for `aria-pressed` and the label swap, 20 to 27 for the click and storage write.
- `assets/tui.js` 181 to 199 for avatars and message structure, 279 to 303 for send, typing and the answer, 311 to 327 for history and Escape.
- `report.html` 151 to 154 for focus, skip and `sr-only`; 328 to 341 for the range and its focus ring; 630 to 639 for labels, outputs, `aria-describedby` and the status paragraph; 815 to 819 for the chart label rewrite; 836 to 849 for the scroll spy; 403 for the hidden mobile nav.
- `index.html` 78 to 95 and `ask.html` 20 to 35 for the shared top bar; `ask.html` 41 to 56 for the chat heading, log, label and hint; `work.html` 67 and `about.html` 59 for `aria-current`.
