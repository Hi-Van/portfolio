# AGENTS.md: van-sirisouk

Orientation for coding agents working in this repository. The site is a static-exported Next.js App
Router rebuild of the `van-sirisouk-concept-2` prototype. One route, five anchored regions, no server
runtime. This checkout is on `develop`; `master` is a different application with unrelated history.

## Read order

1. `AGENTS.md` (this file): the layout, the commands, and the rules that must not break.
2. `README.md`: install, build, serve, the static export, and the checks.
3. `DESIGN.md`: the design specification. Colours, type, radii, spacing, components, do's and don'ts.
   Treat it as a hard contract, not a description.
4. `PORTING.md`: the prototype's port contract, then the "Port decisions" section for what this build
   chose. Read it before changing structure, behaviour, or content shapes.
5. `MANIFEST.txt`: the prototype's long-form design record, kept verbatim. It is historical; read the
   paragraph that covers the thing you are changing before assuming a value is arbitrary.
6. The file you are about to edit.

## What this is

- One static route, `app/page.tsx`, rendered inside `app/layout.tsx`.
- Five regions in this order: hero, about, stack, work, footer.
- `next build` with `output: "export"` writes `out/`. Playwright tests that folder through `serve`.
- Content is typed modules in `content/`; markup is server-rendered except the header, theme control,
  clock, and reduced-motion hook.
- Styling is Tailwind v4 utilities over CSS custom properties. `site.css` from the prototype is not
  imported and must not be.
- Icons are package imports from Pixelarticons and Pxlkit. Only the nav mark and the footer scene are
  inline SVG, generated from the prototype by `scripts/sync-art.mjs`.

## Tree

| path | role |
| --- | --- |
| `app/layout.tsx` | document shell, `next/font` faces, pre-paint theme script, metadata, skip link |
| `app/page.tsx` | the page: header, main with hero, about, stack, work, then footer |
| `app/globals.css` | Tailwind import, `@theme inline` bridge, light and dark token ramps, base layer |
| `app/foot-scene.css` | the only component CSS: footer scene geometry, mask, and print rules |
| `app/icon.png` | favicon |
| `components/site-header.tsx` | brand, desktop nav, theme toggle, Popover menu, floating island |
| `components/hero.tsx`, `proof-band.tsx` | hero and the measured band |
| `components/about.tsx`, `stack.tsx`, `work.tsx`, `work-row.tsx` | the content sections |
| `components/footer.tsx` | identity, links, credits, inline scene |
| `components/clock.tsx` | New York time, 15 second tick, no-JS fallback |
| `components/theme-toggle.tsx` | island icon button and phone switch row |
| `components/use-theme.ts` | theme state, storage, OS listener |
| `components/skip-link.tsx` | first focusable element, targets `main#main` |
| `components/ui/` | shadcn on Base UI: `button`, `label`, `popover`, `switch` |
| `components/icons/` | package icon registry, animated wrapper, generated nav mark and footer scene |
| `components/primitives/` | section head and shell |
| `content/` | `site`, `hero`, `about`, `stack`, `work`, `footer`, and `types` |
| `hooks/use-reduced-motion.ts` | media-query hook used by the animated icon |
| `lib/` | `utils.ts` (`cn`), `theme.ts`, `clock.ts` |
| `scripts/check.mjs` | the gate: lint, build, typecheck, tokens, artifacts, chromium |
| `scripts/check-tokens.mjs` | six role colours: `DESIGN.md` against `app/globals.css` |
| `scripts/check-artifacts.mjs` | 76 and 187 rect counts, no sprite, allowed icon imports, favicon |
| `scripts/sync-art.mjs` | regenerates the two inline art modules from the prototype `index.html` |
| `tests/e2e/` | `smoke`, `hero`, `sections`, `footer`, `theme`, `navigation`, `layout`, `network`, `accessibility`, `helpers` |
| `licenses/` | Pixelarticons, Pxlkit, Geist Pixel OFL, Instrument Sans OFL |
| `assets/` | prototype provenance: `scene/foot-decor.svg`, `swords-v-16.svg`, `swords-v-16.png`, `icons/ICONS.txt` |
| `DESIGN.md` | the design specification; the source of the token values and the rules |
| `MANIFEST.txt` | the prototype's design record, kept verbatim; do not rewrite it |
| `PORTING.md` | the port contract plus this port's decisions |
| `next.config.ts` | `output: "export"`, `trailingSlash: true`, strict mode |
| `package.json`, `package-lock.json` | scripts and pinned dependencies; Node 22 is the baseline |
| `.github/workflows/check.yml` | CI: Node 22, `npm ci`, chromium, design lint, the gate |
| `components.json`, `biome.json`, `tsconfig.json`, `postcss.config.mjs`, `playwright.config.ts` | tooling |

## Commands

```sh
npm ci                       # install
npm run dev                  # Next dev server
npm run build                # static export to out/ (needs network for fonts once)
npm run serve                # serve out/ on http://localhost:3100
npm run lint                 # biome check
npm run format               # biome format --write
npm run typecheck            # tsc --noEmit
npm run test:e2e             # build, then Playwright chromium
npm run test:browsers        # build, then Playwright Firefox and WebKit
npm run lint:design          # npx @google/design.md lint DESIGN.md
npm run check                # lint, build, typecheck, tokens, artifacts, chromium
```

`npm run check` is the gate. `npm run serve` and Playwright's `webServer` assume a fresh `out/`. Do not
run a second build or test suite against the same checkout at the same time; `.next`, `out`, and port
3100 are shared.

## Invariants

Break one of these and the change is wrong even if it looks right.

- **Zero external requests at runtime.** No font host, CDN, analytics, remote image, or icon service.
  Fonts are `next/font` woff2 under `_next/static/media`. The only outbound URLs are links a reader
  can click.
- **One route, one document, five regions** in the order hero, about, stack, work, footer. Nav order is
  About, Stack, Work; the footer repeats those plus back to top.
- **Keep the prototype class names** on rendered elements: `hero`, `band__cell`, `row`, `item__metric`,
  `facts`, `stack`, `foot`, `top`, `bar`, `nav`, `menu-btn`, and the rest. They are test and traceability
  hooks and carry no styling.
- **44 by 44 minimum** on every interactive target, including the skip link. The inline credit links in
  `.foot__credit` are prose links and are excluded.
- **Pixel type** is never below 18px, never has negative tracking, and never exceeds weight 400. Keep
  `font-synthesis: none` on pixel text.
- **Indigo `#2b3a8f`** marks measured values, the highlighted initials, and the focus ring. It is not a
  decorative accent.
- **Radii:** controls 8px, chips 7px, the island 10px, the switch track 6px. Controls are never pills.
  The switch thumb stays round because the prototype's thumb is round.
- **Dark mode is a second token ramp**, not an inversion. Keep three declarations: `[data-theme="dark"]`,
  `@media (prefers-color-scheme: dark)` scoped to `:root:not([data-theme="light"])`, and the repeated
  ramp inside that query. An explicit light choice on a dark OS stays light.
- **No sprite.** Do not hand-inline an icon sheet. The nav mark and footer scene are the only inline
  SVG art, and they come from `scripts/sync-art.mjs`.
- **The design values are the product.** Do not tune spacing, type sizes, radii, colours, or copy while
  porting. Change `DESIGN.md` and `app/globals.css` together, then run the checks.

## Where to change what

| task | file |
| --- | --- |
| copy, section order, nav labels | `content/*.ts` |
| section markup | `components/<section>.tsx` |
| spacing, type sizes, breakpoints, motion | Tailwind utilities in the component, or the token layer when shared |
| a token's value | `app/globals.css` `:root` and both dark ramps, then `DESIGN.md` front matter |
| dark theme | `app/globals.css` (both ramps and the media query) |
| theme behaviour | `lib/theme.ts`, `components/use-theme.ts`, and the script in `app/layout.tsx` |
| menu and island behaviour | `components/site-header.tsx` |
| the switch or icon button | `components/theme-toggle.tsx`, `components/ui/switch.tsx`, `components/ui/button.tsx` |
| the nav mark or footer scene | the prototype, then `node scripts/sync-art.mjs`; never edit the generated modules by hand |
| an icon | `components/icons/index.tsx` |
| what the gate checks | `scripts/check.mjs`, `scripts/check-tokens.mjs`, `scripts/check-artifacts.mjs` |
| why something is the way it is | append to `MANIFEST.txt`; do not rewrite the existing record |

## Traps

**Three copies of the theme.** The initial theme is applied before paint by the inline script in
`app/layout.tsx`; the token ramps live in `app/globals.css` in three declarations; the state logic
lives in `lib/theme.ts` plus `components/use-theme.ts`. A new theme-aware value needs the ramps and the
state path considered together, and the pre-paint script must stay blocking and inline.

**`next/font` hashes the family name.** Do not assert a literal `Geist Pixel` family or a fixed woff2
URL. Tests read the `--font-geist-pixel` / `--font-instrument-sans` variables and request paths under
`_next/static/media`. The `@theme inline` mapping is what turns those variables into `font-pixel` and
`font-sans`.

**Tailwind sees static class strings only.** It scans source text, so `text-${size}` or a class built
from a prop produces no CSS. Write full class names, keep the custom `text-*` tokens registered in
`lib/utils.ts` through `createCn` from `cn/config` (they must stay in the `font-size` class group, or
`cn` merges them away as colours), and use `cn()` only to merge, never to compose sizes dynamically.

**Dark mode is token-driven.** Do not add `dark:` utilities for design-critical styling; shadcn
occasionally generates them, and they should be removed when a component is customized. The custom
`dark` variant exists for incidental cases, but the token ramp is the source of truth.

**The two theme controls report state differently on purpose.** The desktop island button keeps
`aria-pressed`. The phone row is a Base UI `Switch`, which reports `role="switch"` and `aria-checked`
and is labelled by the adjacent `Label`. Do not "unify" them: each is the correct primitive for its
shape, and the specs assert both.

**The Popover is portaled.** Base UI renders the menu content outside the header, so a query scoped to
`header` will not find it. Escape closes it and returns focus to the trigger, a link click closes it,
and the island must not hide while it is open, for one second after a nav click, or while focus is
inside the header.

**`DESIGN.md` drifts silently.** The design linter cannot see `app/globals.css`. `scripts/check-tokens.mjs`
is the only thing that catches a colour changed in one place and not the other, and `lint:design` catches
spec-shape errors. Run both through `npm run check`.

**`preview/` is deliberately absent.** The prototype's screenshot folder was not copied. It contains
rejected directions and is never the reference; the reference is the current code rendered in a browser.
`assets/` is provenance, not a second source of truth either: regenerate inline art rather than editing
the generated module or the copied SVG by hand.

**`develop` and `master` are unrelated.** They have no merge base. `develop` is this port; `master` is
the existing production portfolio under `web/`. Never merge, rebase, or cherry-pick between them, and
never commit port work to `master`.

## State

Task 9 recorded the docs and provenance only; it ran no build and no test. Treat `npm run check`
as the verification step, and do not record a pass here until it has actually run on this checkout.
