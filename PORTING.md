# Porting this prototype to a framework

This folder is a finished single-page site with no framework. This document is what a port needs: the content model,
the component inventory, the behaviour specs, and the checks that decide whether the result is the same site.

The target framework is deliberately unspecified. Nothing below assumes React, Vue, Svelte, Astro, Rails or a static
site generator. Where a framework has a natural equivalent, it is named.

## The contract

The port is correct when a reader at 1440, at 900 and at 390 cannot tell which build they are looking at, and when
every check in the last section passes. The design rules are in `DESIGN.md` and they do not change in translation.
The token values, radii, type sizes and colours are the same numbers in the same places.

Do not "improve" the design while porting. Spacing, radii, colour roles and the pixel type floor are the product.

## Information architecture

One route. A single document with five anchored regions in this order:

| region | id | nav | notes |
| --- | --- | --- | --- |
| hero | none (`#top` sits on `<body>`) | brand links here | eyebrow stamp, name, deck, action row |
| about | `about` | yes | prose plus a definition list of facts |
| stack | `stack` | yes | a definition list in two groups |
| work | `work` | yes | five rows, each with items |
| footer | none | yes | identity, mail, four links, credits, pixel scene |

Nav order matches page order: About, Stack, Work. The footer repeats those three plus a back-to-top link. There is no
contact route. GitHub, LinkedIn and email live in the hero.

## Content model

All content is hardcoded in `index.html`. A port should lift it into data, one object per region. The shapes below
mirror what is on the page today, including counts, so a port can be diffed against the original.

```ts
type BandCell   = { figure: string; unit: string; say: string }          // 3 on the page
type Fact       = { term: string; detail: string }                       // 5
type StackGroup = { icon: IconName; label: string; items: string[] }      // 2
type WorkItem   = { figure?: string; figureLabel?: string; text: string } // 16 across the rows
type WorkRow    = {
  org: string; city: string; icon: IconName;
  title: string; dates: string; items: WorkItem[]
}                                                                        // 5
```

Current values, so the port can be verified against them:

- Band cells: `832,000` page views added; `28.1%` higher D1 to D6 retention; `450,000` records per second.
- Facts: Currently, Experience, Focus, Based in, Education.
- Stack: Frontend, then Backend and infrastructure.
- Work rows: Software Engineer II Growth at Atlassian (Jun 2025 to now), Software Engineer Merchant Tools at Walmart
  Global Tech (Aug 2023 to May 2025), Software Engineer Account Services at Synchrony (Sep 2022 to May 2023),
  Software Engineer Intern AI T&C at Meta (May 2022 to Aug 2022), System Engineer Intern at Edgewell Personal Care
  (May 2021 to Jul 2021). Three of the five carry figures; two carry none.
- Hero deck names the current role. The email address is `contact@vansiriso.uk`, and the résumé link is a `mailto:`
  with a subject line, not a file.

Two content details that are easy to lose in a port: an item with no figure renders an empty `.item__metric` that is
`aria-hidden`, which keeps the text column aligned; and the hero stamp's weekday is a separate node so a phone can
hide it without dropping the date.

## Component inventory

Each component below is one block of `index.html` and one block of `site.css`. Class names are the source of truth
for the port's component names.

| component | element | key geometry | states |
| --- | --- | --- | --- |
| skip link | `a.skip` | appears on focus | focus |
| nav island | `header.top > .bar` | 60px tall, 1080 max, blurred fill | resting, scrolled, hidden |
| brand | `a.brand` | 24px mark + 18px pixel name | hover, focus |
| nav link | `.nav a` | 44px tall, 14px side padding | resting, active, hover, focus |
| theme toggle, island | `button.icon-btn` | 44 by 44 | pressed |
| menu button | `button.menu-btn` | 44 tall, phone only | open, closed |
| mobile menu | `nav.nav[data-open]` | panel under the island | closed, open |
| badge | `p.eyebrow` | 32px tall, one surface colour | wrapping below 360 |
| name | `h1` | pixel face, 68 down to 38 | none |
| deck | `p.hero__deck` | 19px lead, max 54ch | contains an inline `code` chip |
| action row | `.hero__actions` | row on desktop, wrapping row on phone | wraps at 320 only |
| social group | `.socials--fill` | three 44px square cells in one filled run | hover, focus |
| button, filled | `.btn--fill` | 44 tall, 20px sides | hover, focus |
| button, outline | `.btn--line` | same box, hairline border | hover, focus |
| band cell | `.band__cell` | third of a 1080 row, 40px figure | stacks under 860 |
| section head | `.section__head` | label plus one line note | stacks on phone |
| work row | `article.row` | two columns, items list | stacks on phone |
| fact list | `dl.facts` | term and detail, two columns | one column on phone |
| footer | `footer.foot` | identity, links, meta, inline scene | scene masks at the edges |

Icon usage is a rule, not decoration. Section labels, row titles, org names and dates each carry a 16px icon, and
every one of them is `aria-hidden` with the text beside it doing the naming. A port that drops the icons changes the
look; a port that adds labels to them breaks the accessibility contract.

## Behaviour specs

Four behaviours, all in `app.js`, none of them framework-specific. Reimplement each in the target's idiom and keep
the exact state names where you can, because the CSS keys off them.

### Theme

State lives on the document element as `data-theme="light|dark"`. Absent means follow the OS.

- An inline script in `<head>` reads `localStorage["vs-theme"]` and sets the attribute before first paint. Keep this
  blocking and inline, or the page flashes the wrong theme.
- Clicking either toggle flips the value, writes it to `localStorage`, and repaints both toggles.
- Both toggles carry `aria-pressed` and an `aria-label` that names the theme you would switch to.
- A `prefers-color-scheme` change repaints the toggles when no explicit choice has been made.
- Storage access is wrapped in `try`. Private mode must not throw.

### Mobile menu

- `<button class="menu-btn">` toggles `data-open` on `#site-nav`, plus `aria-expanded` and the button's label.
- It closes when a link inside is clicked, on `Escape` (focus returns to the button), and whenever the island hides.
- The panel is only rendered on the phone breakpoint. It is opaque, because the page must never show through it.

### Clock

- Three nodes: `[data-clock-weekday]`, `[data-clock-date]`, `[data-clock-time]`, plus `<time>` whose `datetime`
  becomes the ISO string.
- All three format in `America/New_York` with `Intl.DateTimeFormat("en-US")`, so EST and EDT switch themselves.
  Do not hardcode a zone label.
- Ticks every 15 seconds, immediately on load.
- The static text in the HTML is a fallback for a failed script, not the source of truth.

### Floating island

- Above 8px of scroll, `data-scrolled` is set, which deepens the shadow.
- Scrolling down more than 6px past 180px sets `data-hidden` and closes the menu. Scrolling up more than 6px, or back
  above 180px, clears it.
- It never hides while the menu is open, for one second after a nav click, or while focus is inside it.
- The scroll listener is passive.

## Styling

Custom properties are the whole token layer, and every framework can carry them unchanged. Copy the `:root` block and
the dark block verbatim, then bind your styling layer to the same names. `DESIGN.md` front matter is the same values
in spec form; if you prefer generating CSS from the spec, export once and check the output against the `:root` block.

Dark mode is three declarations, not a build step: `[data-theme="dark"]`, `@media (prefers-color-scheme: dark)` scoped
to `:root:not([data-theme="light"])`, and the same ramp again inside the media query. Keep all three in a port that
respects an explicit light choice on a dark OS.

Breakpoints are max-width 1080, 860, 520 and 380, plus a `min-width: 861` block for the footer scene and a print
stylesheet. The 380 rule only tightens the brand gap; the others change layout.

Two techniques have no portable equivalent and must be re-created, not dropped: `backdrop-filter: blur(8px)` on the
island with a 28.5% paper fill, and the mask that fades the footer scene at its left and right edges.

Motion is limited to colour, border, shadow and a 160ms ease-out. There is a `prefers-reduced-motion` block; keep it.

## Assets

Fonts are self-hosted woff2, three faces, SIL OFL 1.1. `assets/fonts/FONTS.txt` records the request URL and sha256 of
each file. Port them as local files with `font-display: swap` and the same `@font-face` weights. Do not switch to a
CDN link: the zero-request rule exists so the page renders the same offline.

Icons are 26 `<symbol>` definitions in the sprite at the top of `index.html`, referenced with `<use href="#id">`.
In a component framework, the clean translation is one icon component that renders an inline `<svg>` per use, or a
sprite mounted once and referenced the same way. Keep `aria-hidden` and `focusable="false"` on decorative icons.

Two shapes are inlined rather than linked: the 16x16 nav mark (76 rects) and the footer scene (187 rects). They are
inlined because the page must not make requests and because they are styled by page CSS. The files in `assets/` are
the sources. In a port, either inline the same rects from the files at build time, or load them as `<img>` and accept
that they stop responding to the theme.

## Accessibility contract

- Skip link first in the DOM, targeting `main`, which is focusable.
- One `h1`, then `h2` per section, `h3` per work row. Sections are labelled by their heading via `aria-labelledby`.
- The social group is `role="group"` with `aria-label="Elsewhere"`; each link names its destination.
- The theme toggle reports state through `aria-pressed`; the menu button through `aria-expanded`.
- The focus ring is 2px indigo at 3px offset, and inset where a control has a filled background.
- Icons beside text are `aria-hidden`. Nothing depends on colour alone.
- Print drops the island, the action row and the scene, and keeps the text.

## Accepting the port

Run these against the new build. They are the same checks the original was held to.

1. No horizontal overflow at 1440, 1280, 1080, 900, 861, 860, 700, 600, 520, 430, 390, 375, 360 and 320, in light and
   dark. In a browser: `document.documentElement.scrollWidth > document.documentElement.clientWidth` returns false.
2. Every figure renders in the pixel face: three band figures plus fourteen inline figures in the work rows, 17 in
   total, and the nav name as the eighteenth pixel element. Select `.band__num, .item__metric b, .brand__name` and
   confirm 18 nodes report a Geist Pixel family.
3. Every interactive element measures at least 44px on both axes.
4. Control radii are 8px, chips 7px, the island 10px, and nothing is a pill.
5. Zero requests to any origin other than your own. Check the network panel with a cold cache.
6. The theme toggle survives a reload, and a dark OS with an explicit light choice stays light.
7. The menu opens, closes on Escape, closes on link click, and never shows the page through the panel.
8. The clock reads New York time and the weekday disappears below 520 without the stamp wrapping to two lines above
   360.
9. The island hides on scroll down, returns on scroll up, and never hides with the menu open.
10. `DESIGN.md` still lints clean and `scripts/check-design-tokens.py` still matches, if you keep the tokens file.

## Known gaps

There is no data layer, no routing beyond anchors, no tests, no build and no git history in this folder. The content
is in the markup. A port that wants a CMS, MDX or JSON source has to extract it; the shapes above are the suggested
target.

The `<time>` element carries a hardcoded stamp that the script overwrites. If the script fails, the stamp shows
2026-11-27. Keep the fallback or remove it deliberately, but do not leave a stale date in a live build.

The nav name is 18px because that is the smallest size where Geist Pixel still draws its grid. If a port's nav has
room for 20px, use 20px rather than a heavier weight; the face has no bold.

## Port decisions

The port lives in this repository at the root, on the `develop` branch. The sections above remain the
contract; this section records where the framework rebuild had a choice to make and what it chose.

- **Next.js App Router with static export.** One route, `app/page.tsx`, with the five regions in the
  prototype's order. `next.config.ts` sets `output: "export"` and `trailingSlash: true`, so `next build`
  writes a static `out/` that any static host serves. There is no server runtime, API route, or dynamic
  rendering.
- **Tailwind v4 and shadcn on Base UI instead of importing `site.css`.** The prototype's custom properties
  are copied into `app/globals.css` and mapped through `@theme inline`; components are Tailwind utilities
  plus four shadcn primitives on Base UI (`button`, `label`, `popover`, `switch`). `site.css` is not
  imported. `app/foot-scene.css` is the only component CSS layer, because the scene mask and geometry have
  no utility equivalent. `cn` is shadcn's `cn` package, configured in `lib/utils.ts` with `createCn` from
  `cn/config` so the custom `text-*` size tokens stay in the font-size class group.
- **Package icons, no sprite.** Pixelarticons and the `@pxlkit/*` packages supply every interface icon
  through `components/icons`. The prototype's 26-symbol sprite was not extracted. The nav mark (76 rects)
  and the footer scene (187 rects) stay inline because they are themeable page art, and are regenerated
  from the prototype by `scripts/sync-art.mjs`.
- **`next/font/google` for the two faces, Fraunces retired.** `app/layout.tsx` loads Geist Pixel at weight
  400 and Instrument Sans variable with normal and italic styles, both latin and `display: "swap"`. It
  exposes `--font-geist-pixel` and `--font-instrument-sans`; `@theme inline` maps them to `--font-pixel` and
  `--font-sans`. The build downloads the files once and the app serves hashed woff2 from
  `_next/static/media`. Fraunces was declared and unused in the prototype and is not installed.
- **The mobile switch and the desktop button report state differently.** The island keeps the prototype's
  44 by 44 icon button with `aria-pressed` once the theme is known. The phone row is a Base UI `Switch`,
  the correct primitive for a two-state control, so it reports `role="switch"` and `aria-checked` and
  takes its name from the adjacent `Label`. Both controls drive the same `data-theme` attribute and
  `vs-theme` storage key.
- **Tests read the port's font plumbing.** Font assertions read the `--font-geist-pixel` variable and the
  computed family, not a literal family name, because `next/font` hashes it. Request assertions expect font
  files under `_next/static/media` on this origin, and fail on any request to another origin.
- **Repeated copy lives in `content/`; one-off prose lives in its component.** The content model above
  lifts the page into data, and that remains the rule for content with more than one reader: navigation,
  socials, facts, the about label, stack groups, work rows, and notes. Prose that renders once does not
  become a data object: the hero deck, the about paragraphs, the proof band sentences, and the footer
  lines sit in their components. This is a deliberate exception to "lift all content into data", because
  a single-use string in a module adds indirection without a second consumer, and the tests assert the
  rendered text instead.
- **Icon names derive from the registries.** `IconName` is `keyof typeof ICONS` and `AnimatedIconName` is
  `keyof typeof ANIMATED_ICONS`. There is no hand-maintained union to update, so adding an entry to a
  registry is the whole change. `WorkRowData`, the only exported type, lives in `content/work.ts`; the
  deleted `content/types.ts` hub is not replaced.
- **The theme control is neutral before the theme resolves.** `useTheme` reports `theme: null` until a
  layout effect reads the `data-theme` attribute the pre-paint script applied. Until then, and for
  readers without JavaScript, the island button has no `aria-pressed`, its accessible name is "Toggle
  color theme", and it shows the static moon; the phone switch renders unchecked. The island reports
  `aria-pressed` and names the target theme only after resolution. The icon is decorative, so showing
  the moon in the neutral state is acceptable.
- **Reduced motion is a CSS block, not only a hook.** `app/globals.css` keeps the prototype's
  `prefers-reduced-motion: reduce` block, which collapses animation and transition durations and disables
  smooth scrolling. `useReducedMotion` also holds the animated icon on its first frame. The CSS block is
  what covers transitions and any animation the hook does not own, so keep both paths.
- **The clock and the footer year are build-time values.** The hero clock's first reading is computed in
  the server render (`formatNow(new Date())`) and passed into `Clock` as `initial`; the client updates it
  every 15 seconds. Without JavaScript that reading stays, so a stale export shows a stale time. The
  footer year is `new Date().getFullYear()` at render time. A static export freezes both until the next
  build; each place has a `ponytail:` comment naming the ceiling and the upgrade.
- **One rect count.** The nav mark and the footer scene are still 76 and 187 rects, but those numbers are
  asserted once, in `tests/e2e/footer.spec.ts`. `scripts/check-artifacts.mjs` checks structure and the
  built document, not counts: no `<symbol>` or sprite, no remote reference, allowed icon imports, the
  favicon, and the expected metadata. `scripts/sync-art.mjs` keeps its generator guard. Do not copy the
  counts back into the build check.
