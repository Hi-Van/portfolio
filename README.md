# Van Sirisouk, portfolio

A single-page portfolio for a software engineer, rebuilt from the `van-sirisouk-concept-2` static
prototype. One route, five anchored regions (hero, about, stack, work, footer), and a fully static
export. The prototype, not this README, is the design source: `DESIGN.md` is its hard specification
and `PORTING.md` is its port contract.

## Stack

| layer | choice |
| --- | --- |
| framework | Next.js 16.4.6 (App Router, `output: "export"`) |
| UI | React 19.3.0, TypeScript 5 |
| styling | Tailwind CSS 4.3.3 via `@tailwindcss/postcss` |
| components | shadcn/ui on Base UI (`@base-ui/react` 1.9.0): `button`, `label`, `popover`, `switch` |
| icons | `pixelarticons` 2.4.2 and `@pxlkit/*` (core 1.4.0, ui 1.2.6, weather/social/gamification 1.2.5); `lucide-react` remains as the shadcn default and is unused |
| class names | `cn` 0.5.2 with a custom type scale via `cn/config` in `lib/utils.ts` |
| fonts | `next/font/google`: Geist Pixel and Instrument Sans, self-hosted at build time |
| lint / format | Biome 2.4.2 |
| tests | Playwright 1.64.1 (chromium, plus a Firefox and WebKit pass) |
| static server | `serve` 14.2.4 |

`cn` is shadcn's `cn` package, configured in `lib/utils.ts` with `createCn` from `cn/config` so
the custom `text-*` size tokens are registered as font sizes instead of being merged away as colours.

## Install

Node 22 (the CI baseline) or newer, and npm.

```sh
npm ci
```

`npm ci` installs Playwright's test runner but not a browser. Install chromium before the end-to-end
suite:

```sh
npx playwright install chromium
```

The Firefox and WebKit projects (`npm run test:browsers`, and CI after the gate) need those engines
too. One command installs all three:

```sh
npx playwright install --with-deps chromium firefox webkit
```

The first `npm run build` downloads the Google Fonts files (`next/font/google`). **The build needs
network access.** Runtime does not: the fonts are emitted as self-hosted woff2 under
`_next/static/media`.

## Development

```sh
npm run dev
```

Then open the URL Next.js prints, usually <http://localhost:3000>. The dev server renders the same
route as the export; it is not the thing that ships.

## Build and serve

```sh
npm run build
npm run serve
```

`next build` writes `out/`. `npm run serve` serves that folder on <http://localhost:3100>, the origin
the Playwright config expects. Playwright does not use `npm run serve`; it starts
`serve out -l $PORT` itself, with `PORT` defaulting to 3100, so `PORT=3200 npx playwright test` runs
the suite on port 3200. There is no Node server, no API route, and no dynamic rendering in
production.

## Static deployment

`out/` is the artifact. Upload it to any static host; nothing else is required. `trailingSlash: true`
is set in `next.config.ts`, so the entry document is `out/index.html` and the page is served at `/`.
`out/`, `.next/`, `node_modules/`, and the test reports are gitignored; commit source, not the export.

The build assumes the origin root. A deployment under a subpath (for example
`https://example.com/portfolio/`) is not configured by default: set `basePath` and `assetPrefix` in
`next.config.ts`, rebuild, and confirm the emitted font URLs follow the prefix. `next/font` emits its
files under `_next/static/media`, so those URLs must resolve beneath the same prefix. The Playwright
suite and the request assertions assume the root deployment.

## Checks

| command | what it does |
| --- | --- |
| `npm run lint` | Biome check over the repo |
| `npm run format` | Biome format, writing changes |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | build, then Playwright chromium |
| `npm run test:browsers` | build, then Playwright Firefox and WebKit |
| `npm run lint:design` | lint `DESIGN.md` with `@google/design.md` |
| `npm run check` | lint, build, typecheck, token check, artifact check, chromium suite |

`npm run check` is the gate. It runs, in order:

1. `biome check`
2. `next build`
3. `tsc --noEmit`
4. `node scripts/check-tokens.mjs` — the six light role colours in `DESIGN.md` and
   `app/globals.css` match, and the two dark ramps agree
5. `node scripts/check-artifacts.mjs` — the nav mark has 76 rects, the footer scene has 187, there is no
   symbol sprite, only package icons are imported, and the favicon exists
6. `playwright test --project=chromium`

`lint:design` fetches the linter through `npx`, so it also needs network access the first time.

The suite is `tests/e2e/`: `smoke`, `hero`, `sections`, `footer`, `theme`, `navigation`, `layout`,
`network`, and `accessibility`, with shared setup in `helpers`. Run one file directly with
`npm run build && npx playwright test tests/e2e/<name>.spec.ts --project=chromium`. The Firefox and
WebKit pass needs those engines too: `npx playwright install firefox webkit`.

`PORT` sets the port for both the Playwright static server and the base URL, defaulting to 3100:
`PORT=3200 npx playwright test tests/e2e/smoke.spec.ts --project=chromium`. The port and `out/` are
shared by every run in a checkout, so do not start a second build or test suite at the same time.

### Accepted viewports

The page must not overflow horizontally, in light or dark, at:

`1440, 1280, 1080, 900, 861, 860, 700, 600, 520, 430, 390, 375, 360, 320`

The layout spec sweeps that list and asserts
`document.documentElement.scrollWidth > document.documentElement.clientWidth` is false at each width.

## Rules the build holds

**Zero external requests at runtime.** Fonts are served from this origin out of `_next/static/media`,
icons are bundled package imports, and the favicon is local. There is no analytics, CDN, remote image,
or font host. The only outbound URLs in the document are links a reader can click. The network spec
fails on any request to another origin.

**The design spec is hard.** `DESIGN.md` is not a description. Token values, radii, type sizes,
breakpoints, copy, and motion are the product; do not improve them while changing code. If a token
changes, `DESIGN.md` and `app/globals.css` change in the same pass and `npm run check` proves it.

**One document, five regions.** Hero, about, stack, work, footer, in that order, with the prototype's
class names kept on rendered elements as test and traceability hooks.

**Accessibility is part of the contract.** A 44 by 44 minimum on every interactive target, one `h1`,
`aria-labelledby` sections, decorative icons `aria-hidden`, and a visible indigo focus ring.

## Layout

| path | what it is |
| --- | --- |
| `app/` | the route: `layout.tsx` (fonts, theme script, metadata), `page.tsx`, `globals.css`, `foot-scene.css`, `icon.png` |
| `components/` | sections plus `ui/` primitives, `icons/` registry and inline art, and `primitives/` |
| `content/` | typed copy and data, one module per region, plus `site.ts` |
| `hooks/`, `lib/` | reduced motion, theme, clock, and `cn` |
| `scripts/` | the gate and the two checks, plus `sync-art.mjs` |
| `tests/e2e/` | the acceptance specs |
| `licenses/` | Pixelarticons, Pxlkit, and the two OFL font licences |
| `assets/` | prototype art provenance: footer scene, nav mark SVG and PNG, icon notes |
| `DESIGN.md` | the design specification |
| `MANIFEST.txt` | the prototype's long-form design record, kept verbatim as provenance |
| `PORTING.md` | the prototype's port contract, plus the decisions this port made |
| `.github/workflows/check.yml` | the CI gate |

## Provenance

`MANIFEST.txt` is historical: it describes the prototype build (`index.html`, `site.css`, `app.js`) and
is not edited to match the port. `PORTING.md` keeps the prototype contract and appends a "Port
decisions" section covering the framework, styling, icons, fonts, control semantics, and font tests.
`assets/` holds the source shapes and the icon notes; the rendered mark and scene are generated from
the prototype by `scripts/sync-art.mjs`. `assets/icons/ICONS.txt` describes the prototype's sprite and
icon choices and is likewise a record, not the port's implementation.

Work lives on `develop`. `master` is a different, unrelated application with its own history; do not
merge the branches or commit port work to `master`.

## CI

`.github/workflows/check.yml` runs on pushes and pull requests: Node 22, `npm ci`, Playwright
chromium, Firefox, and WebKit with system dependencies, `npm run lint:design`, `npm run check` (which
runs the chromium suite), then `npx playwright test --project=firefox --project=webkit`. The job needs
network access for the font download and for the `npx` design linter.
