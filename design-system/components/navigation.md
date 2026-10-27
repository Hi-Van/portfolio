---
title: Navigation
group: Components
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/site.css
  - assets/tui.css
  - assets/site.js
  - assets/theme.js
  - report.html
---

# Navigation

The sticky bar that runs on all five pages: brand, page links, the Contact pill, the Ask switch, the theme toggle, and a mobile menu. The report page swaps the page links for section jumps driven by a scroll spy. The skip link, the footer, and the menu panel belong to the same group because they share the same bar and the same small type.

## Anatomy

```html
<a class="skip" href="#main">Skip to content</a>

<header class="top">
  <div class="top__in">
    <a class="top__name" href="index.html">Van Sirisouk</a>
    <nav class="top__nav" id="site-nav" aria-label="Site">
      <a href="work.html" aria-current="page">Work</a>
      <a href="report.html">Report</a>
      <a href="about.html">About</a>
      <a class="top__cta" href="mailto:hello@vansirisouk.com">Contact</a>
    </nav>
    <div class="top__actions">
      <a class="ask" href="ask.html?from=work" aria-label="Ask the site">
        <span class="ask__track" aria-hidden="true"><span class="ask__knob"></span></span>
        <span class="ask__label" aria-hidden="true">Ask</span>
      </a>
      <button class="theme-toggle" type="button" aria-label="Switch to dark theme" aria-pressed="false">...</button>
      <button class="top__menu" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    </div>
  </div>
</header>
```

1. `.top` is `position:sticky` at `top:0`, `z-index:30`, filled with `--top-bg`, has `backdrop-filter:saturate(180%) blur(18px)`, and a 1px `--line` bottom border.
2. `.top__in` is the 58px row: max width `--page` (1040px), 32px side padding, flex with `justify-content:space-between` and `gap:24px`.
3. `.top__name` is the brand link. 14px, weight 600, Instrument Sans, letter spacing -.01em, white space nowrap.
4. `.top__nav` holds the page links plus the Contact pill. 13.5px, `gap:26px`, `margin-left:auto`, so it sits against `.top__actions`.
5. `.top__actions` holds the Ask switch, the theme toggle, and the menu button. `gap:10px`.
6. `.top__cta` is a compact `.pill`: 7px 15px, radius 999, weight 500, paper text on ink.
7. `.ask` is a link dressed as a switch: 44px minimum height, 12px label, 30x16 track, 10px knob.
8. `.theme-toggle` is a 34x34 icon button with two SVGs, moon and sun.
9. `.top__menu` is the mobile-only button, hidden above 760px.
10. `.skip` sits offscreen until focused. `.foot` closes the page with a 12px line and a link row.

## Variants

| Variant | Where | Differences |
| --- | --- | --- |
| Site bar | `index.html`, `work.html`, `about.html`, `ask.html` | Links Work, Report, About, Contact. `id="site-nav"`, `aria-label="Site"`. Menu button present. |
| Report bar | `report.html` | Links Problem, Systems, Scale, Method then Contact to `#contact`. `aria-label="Report sections"`, no `id`, no menu button. `.top__in` padding is 24px, not 32px. |
| Ask, off | All pages except the chat page | Track 1px `--line-2` with muted knob at 2px, 2px. Label muted. `href="ask.html?from=<page>"`. |
| Ask, on | `ask.html` | `data-on="true"`: ink track, paper knob at `translateX(14px)`, ink label. `aria-label` becomes "Ask the site: on. Activate to leave." `href` is rewritten by `tui.js` to the page named in `?from`. |
| Menu, closed | Under 760px | Panel `display:none`, button reads "Menu", `aria-expanded="false"`. |
| Menu, open | Under 760px | Panel `display:flex` with `is-open`, button reads "Close", `aria-expanded="true"`. |
| Footer, site | `index.html`, `work.html`, `about.html` | One line of credit plus `.foot__links`: Work, Report, About, Email. |
| Footer, report | `report.html` | Two credit paragraphs, no links. `max-width:var(--measure)` (720px), paragraphs capped at 70ch. |

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Default | Rest | Muted links, transparent bar over the translucent fill, 1px hairline. |
| Hover | Pointer over a link | `color:var(--ink)` over .2s `--ease`. CTA also darkens to `--ink-hover` and lifts `translateY(-1px)`. Toggle takes `--hover` fill. |
| Focus visible | Keyboard focus | Global `:focus-visible`: 2px `--data` outline at 3px offset, radius 2px. No underline added. |
| Current, page | `aria-current="page"` on a site link | Same ink color as hover. No underline, no weight change. |
| Current, section | `aria-current="true"` from the report spy | Ink color in the report bar. Set only while a section crosses the middle band. |
| On | `data-on="true"` on `.ask` | Ink track, paper knob, ink label. |
| Open | `.top__nav.is-open` | Full width paper panel under the bar, stacked links, 1px separators. |
| Dark | `[data-theme="dark"]` or OS dark | Bar fill `rgba(12,16,24,.88)`, hairline `#232a38`, muted `#9299a8`, ink `#eef1f7`, paper `#0c1018`. The CTA inverts to a near white pill. |
| Mobile | Viewport 760px or less | Bar wraps, menu appears, links stack, Contact goes full width. |
| Print | `@media print` | Site bar and footer links are `display:none`. Report bar is hidden. |
| Reduced motion | `prefers-reduced-motion:reduce` | All transitions drop to .001ms. Hover still changes color and fill, with no travel. |

There is no active, disabled, loading, or error state on any navigation element. Links cannot be disabled and nothing in the bar fetches. The brand link has no hover rule and no current marker; it stays ink on every page.

## Measurements and tokens

| Token | Light | Dark |
| --- | --- | --- |
| `--top-bg` | `rgba(255,255,255,.86)` | `rgba(12,16,24,.88)` |
| `--line` | `#e6e6e2` | `#232a38` |
| `--line-2` | `#d3d3cc` | `#343c4c` |
| `--muted` | `#5f6673` | `#9299a8` |
| `--hover` | `rgba(19,26,43,.04)` | `rgba(238,241,247,.06)` |
| `--ink` / `--ink-hover` | `#131a2b` / `#0b1120` | `#eef1f7` / `#ffffff` |
| `--paper` | `#ffffff` | `#0c1018` |

| Element | Value |
| --- | --- |
| Bar height | 58px, `min-height:58px` when wrapped under 760px |
| Bar blur | `saturate(180%) blur(18px)`, `z-index:30` |
| Bar padding | 32px sides, 24px in the report, 20px under 760px |
| Brand | 14px / 600 / -.01em |
| Nav links | 13.5px, 26px gap, 24px from the actions group |
| Contact CTA | 7px 15px, radius 999, weight 500, type inherits 13.5px |
| Ask switch | `min-height:44px`, 8px gap, 12px label |
| Ask track | 30x16, 1px `--line-2`, radius 999 |
| Ask knob | 10px circle, inset 2px, travel 14px |
| Theme toggle | 34x34, radius 6px, icon 18x18, stroke 1.6 |
| Menu button | 13px, 1px `--line-2`, radius 6px, padding 6px 11px (about 30px tall) |
| Mobile links | `padding:11px 0`, 14px type, 1px bottom rule, no rule on the last |
| Mobile Contact | `margin-top:10px`, centered, full width, 11px 0 padding from `.top__nav a` |
| Mobile panel | `padding:4px 0 14px`, paper fill, 1px top rule |
| Skip link | 13px, `padding:10px 14px`, radius 999, ink fill, paper text, `left:12px`, `top:-60px`, `z-index:50`, `top:12px` on focus |
| Footer | top margin `clamp(56px,7vw,96px)`, `padding:24px 0 52px`, 12px / 1.7, 18px link gap |
| Footer, report | top margin `clamp(52px,6.5vw,88px)`, `padding:0`, 70ch paragraph cap |
| Section jump offset | `scroll-margin-top:84px` on `section[id]` |

### Divergences

- `DESIGN.md` says the theme choice is stored under `vs-theme`. `theme.js` writes that key and never reads it, but the inline head script reads it before paint and sets `data-theme`, so the choice does survive a reload. The script is the reader, not `theme.js`.
- The brief calls the skip link fixed. It is `position:absolute`, so it only returns to the top of the document, not the viewport.
- The brief describes mobile links as 11px. The implemented type is 14px with 11px vertical padding.
- `ask.html` ships `href="index.html"` on the on-state switch. The real target comes from `tui.js`, which reads `?from` and rewrites the href, so the markup alone is not the behavior.

## Usage

- The site bar is identical on home, work, about, and ask. Only the `aria-current` marker and the `?from` value change.
- The report bar replaces page links with section links because the report is a single long document. It has no menu button, and under 760px every link except Contact is hidden. The spy queries every `.top__nav a` with an `href` starting `#`, so the Contact CTA also takes `aria-current="true"` when the contact section is in the band.
- The Contact pill is the only filled pill in the bar. The report adds a second filled pill in its closing contact block, which is recorded under [actions](actions.md). The Ask switch and the theme toggle are muted controls, not invitations.
- Set `aria-current="page"` on the one nav link that matches the document. The home page marks nothing, because the brand already points there.
- Send readers into the chat with `ask.html?from=index`, `from=work`, `from=report`, or `from=about`. The chat rewrites `.ask` back to that page, so the switch exits where the reader entered.
- Do not add a second row of links, a dropdown, a breadcrumb, or a search field. None of those exist in this system.
- Most preview files predate the Ask switch. `preview/menu-mobile.png` shows the open panel layout but an older link set and no Ask control. `preview/report-top.png` does show the report bar with the switch off.

## Do and don't

- Do keep the bar at 58px and let the page scroll under the blur.
- Do let the current page read at full ink and every other link stay muted.
- Do keep the brand as plain 14px sans. It is a signpost, not a logo.
- Don't bold, underline, or color a nav link beyond ink and muted.
- Don't add a second filled pill, a border under the bar beyond the hairline, or a shadow.
- Don't put the section links from the report on any other page.

## Accessibility

- The skip link is the first focusable element on every page and lands on `#main`. It reveals on `:focus`, not `:focus-visible`, so a pointer click shows it too. That target has no `tabindex`, so focus may stay on the link after activation.
- `aria-current` marks the current page (`page`) and the current report section (`true`). Color alone carries the visual difference, so the attribute is the only non visual cue.
- The theme toggle sets `aria-pressed` and swaps `aria-label` between "Switch to dark theme" and "Switch to light theme". The icon swap is decorative and both SVGs are `aria-hidden`.
- The menu button carries `aria-expanded` and `aria-controls="site-nav"`. Escape closes the panel, a link click closes it, and a resize above 760px closes it. There is no focus trap and no click outside handler.
- Closed menu links are inside `display:none`, so they leave the tab order. Open links are reachable in document order.
- The Ask switch is an anchor, not a `role="switch"`, so assistive tech reads a link with a state sentence in its label. The visible track and the `data-on` attribute do not announce anything on their own.
- The theme toggle is 34x34 and the menu button is about 30px tall, both under the 44px target. The Ask switch meets it at `min-height:44px`.
- On the report below 760px the section links are hidden with no replacement menu, so a phone reader can only use the Contact jump and the document's own headings.
- Global focus is a 2px indigo outline at 3px offset. It is visible on the translucent bar in both themes.

## Source

| What | File | Lines or selectors |
| --- | --- | --- |
| Bar, row, brand, links, CTA, menu | `assets/site.css` | `.top` 172, `.top__in` 179, `.top__name` 183, `.top__nav` 184, `.top__actions` 185, `.top__nav a` 196, `.top__cta` 198, `.top__menu` 203 |
| Theme toggle | `assets/site.css` | `.theme-toggle` 186 to 195 |
| Skip link and focus | `assets/site.css` | `.skip` 165, `.skip:focus` 166, `:focus-visible` 164, `scroll-margin-top` 168 |
| Footer | `assets/site.css` | `.foot` 262, `.foot__in` 263, `.foot__links` 269 |
| Tokens, light and dark | `assets/site.css` | `:root` 30 to 71, `[data-theme="dark"]` 73 to 109, OS dark 110 to 147 |
| Breakpoint and print | `assets/site.css` | `max-width:760px` 274 to 295, `print` 300 to 304 |
| Ask switch | `assets/tui.css` | `.ask` 4 to 20, reduced motion 178 |
| Menu behavior | `assets/site.js` | whole file, 1 to 28 |
| Theme behavior | `assets/theme.js` | whole file, 1 to 33 |
| Report bar and footer styles | `report.html` | top 156 to 187, footer 372 to 379, mobile 381 to 405 |
| Report markup | `report.html` | 420 to 444, footer 684 to 691 |
| Report scroll spy | `report.html` | 835 to 849, `rootMargin:'-45% 0px -50% 0px'` |
| Chat switch markup | `ask.html` | 26 to 30, `data-on="true"` and `id="ask-back"` |

Related: [actions](actions.md) for the pill and text link, [color and theme](../foundations/color-and-theme.md) for the token sets, [accessibility](../foundations/accessibility.md) for the focus standard, [report](../surfaces/report.md) for the section order the spy follows.
