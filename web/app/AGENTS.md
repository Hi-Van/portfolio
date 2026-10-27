# app/

The route table and the document shell: five prerendered surfaces, one dynamic answer endpoint, and the theme layer every surface draws its colours from.

## Every file

| File | Kind | Owns |
|---|---|---|
| `web/app/layout.tsx` | shell | The document and the frame's fixed parts: `<html lang="en">` with the three font variable classes and `data-scroll-behavior`, the `metadata` block (`metadataBase`, the title default and template, the default share card, the twitter card), `viewport`, the only import of `globals.css`, `Providers`, `ChatProvider`, the skip link, the bar, `children`, the footer |
| `web/app/providers.tsx` | shell | One wrapper: `ThemeProvider` around children. A server component with no state and no directive |
| `web/app/globals.css` | theme | The theme block (19 role colours, three families, the size steps, tracking, radii, containers, spacing), the three colour scopes and the print override, the base layer, selection, the focus ring, reduced motion, smooth scroll |
| `web/app/page.tsx` | route | The home surface: one h1 at the display step, the status line, the statement, two actions, `ResultsBand`, `ContactStrip`, and the only structured data on the site, a `Person` object built from `content/site.ts` and `content/home.ts` |
| `web/app/work/page.tsx` | route | Work: heading, lede, one `RoleRow` per role, the NDA note |
| `web/app/report/page.tsx` | route | The report: masthead, `SectionNav`, the abstract, sections and subsections, figures 1 to 4 and the model, which is figure 5, the method table, the closing block. Prose goes through `renderProse` so placeholders resolve |
| `web/app/about/page.tsx` | route | About: heading, bio paragraphs on two thirds, the facts definition list, `ContactCard` |
| `web/app/ask/page.tsx` | route | The ask surface: heading, frame copy, `AgentRoom`. The conversation itself lives in the layout, not here |
| `web/app/not-found.tsx` | route | The missing-page surface, rendered inside the frame: a bare title the template completes, one h1, two ways back |
| `web/app/api/ask/route.ts` | endpoint | The POST adapter: validate, retrieve once for the allowed digits, build the guard, write the UI message stream, withdraw on a violation |
| `web/app/robots.ts` | generated route | `/robots.txt`: allow everything, disallow `/api/`, name the sitemap and the host at the production origin |
| `web/app/sitemap.ts` | generated route | `/sitemap.xml`: the five paths, a fixed `lastModified`, monthly, priority 1 for home. Also exports `origin`, which nothing imports |

## Routes

| URL | File | Rendering | Metadata |
|---|---|---|---|
| `/` | `web/app/page.tsx` | prerendered | `pageMetadata` plus the `Person` JSON-LD |
| `/work` | `web/app/work/page.tsx` | prerendered | `pageMetadata` |
| `/report` | `web/app/report/page.tsx` | prerendered | `pageMetadata` |
| `/about` | `web/app/about/page.tsx` | prerendered | `pageMetadata` |
| `/ask` | `web/app/ask/page.tsx` | prerendered HTML; the transcript is a client island | `pageMetadata` |
| `/api/ask` | `web/app/api/ask/route.ts` | dynamic | none; only POST is exported |
| any unknown | `web/app/not-found.tsx` | prerendered 404 | a bare title, completed by the layout template |
| `/robots.txt` | `web/app/robots.ts` | generated at build | n/a |
| `/sitemap.xml` | `web/app/sitemap.ts` | generated at build | n/a |

Nothing in the folder reads a request API on behalf of a page. That is why every surface prerenders: each value is an import from `web/content/`. The one endpoint is dynamic because it reads the request body, not because anything opts it in.

Host canonicalisation is not in this folder. `web/proxy.ts` sends `www` and `http` to the apex; `app/` has no `middleware.ts`.

## Entry points

| You are asked to | Open first | Then |
|---|---|---|
| Change a surface's composition or copy | the matching page under `web/app/` | `web/content/<surface>.ts`, `../../design-system/surfaces/pages.md` |
| Change the report's document furniture | `web/app/report/page.tsx` | `../../design-system/surfaces/report.md` |
| Change the frame, the fonts, the bar's order, the footer, or the skip link | `web/app/layout.tsx` | `web/components/shell/`, `../../design-system/components/navigation.md` |
| Change how a theme is stored, applied, or toggled | `web/app/providers.tsx` | `web/components/theme/theme-provider.tsx`, `../../design-system/foundations/color-and-theme.md` |
| Change a colour, size, radius, or measure | `web/app/globals.css` | `../../DESIGN.md`, `web/scripts/lib/tokens.mjs` |
| Change the endpoint's status, body, or stream parts | `web/app/api/ask/route.ts` | `web/lib/AGENTS.md` |
| Change what a crawler sees | `web/app/sitemap.ts` and `web/app/robots.ts` | `../../openspec/specs/launch-readiness/spec.md` |
| Change the missing-page surface | `web/app/not-found.tsx` | `../../openspec/specs/launch-readiness/spec.md` |
| Make the agent answer from a new section | `web/content/corpus.ts` | the anchors in the page that owns the section |

## What the layout owns

`web/app/layout.tsx` is the only file that touches the document, and it owns exactly these:

- `lang="en"`, `data-scroll-behavior="smooth"`, and the three font classes. The fonts come from `next/font`, are self-hosted at build, and are the three variables the theme block reads.
- `metadata`: `metadataBase` from `site.origin`, `title.default` and `title.template`, the site description, the default `openGraph` (type, site name, url, `/og.png` at 1200 by 630), and the twitter card. It is the only `metadataBase` in the codebase.
- `viewport`: device width, initial scale 1.
- `Providers` then `ChatProvider`, the skip link, `SiteHeader`, `children`, `SiteFooter`, in that order. The conversation sits above the route so moving between surfaces keeps the transcript and any answer still arriving.

It does not own the frame, the `<main>`, the h1, or any page metadata. Each page supplies its own.

## The theme layer

`web/app/globals.css` is the only place a colour, size, radius, or measure is defined. A colour role has four copies:

| Block | Holds |
|---|---|
| `:root` | the light values |
| `[data-theme="dark"]` | the dark values, the same names |
| `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` | the same dark values for a reader with no stored choice |
| `@media print` | black on white, screen theme ignored |

`@theme inline` above them maps each role to a utility and clears the default palette with `--color-*: initial`; it holds no values of its own.

The `inline` keyword is load-bearing: without it a utility resolves `var(--paper)` where the theme variable is declared, which is the root, and the dark override never reaches it.

`web/scripts/check-tokens.mjs` parses the first three blocks and requires identical variable name sets, and checks the eight contract roles in `@theme inline`. The print block is the fourth copy and no token check reads it.

Adding a colour role means touching these together:

| Place | What to add | What notices |
|---|---|---|
| `@theme inline` | `--color-<role>: var(--<role>)` | without it no utility exists; `check-tokens` requires it for the eight contract roles |
| `:root` | the light value | `check-tokens` compares the eight contract roles against `../../DESIGN.md` |
| `[data-theme="dark"]` | the dark value | `check-tokens` compares name sets |
| the system-preference block | the same dark value | `check-tokens` compares name sets |
| `@media print` | a deliberate paper value | no token check; the print test only asserts black on white |
| `../../DESIGN.md` front matter and `ROLE_MAP` in `web/scripts/lib/tokens.mjs` | a contract key mapped to the raw variable | only for the eight contract colours; the two lists must match exactly |
| `web/scripts/contrast.mjs` and the measured table in `../../DESIGN.md` | the pairing and its ratio | only if the role carries text |
| `../../design-system/foundations/color-and-theme.md` | the role, its meaning, both values | the reference, not a check |

Sizes, radii, containers, and tracking have one copy, in `@theme inline`. `--spacing: 4px` is the numeric base, so `min-h-11` is the 44px floor without an arbitrary value.

## The answer endpoint

`web/app/api/ask/route.ts` is a thin adapter. Everything it calls is below `web/lib/ask/`:

| Concern | Lives in |
|---|---|
| Request shape: question, history, limits | `web/lib/ask/guards.ts` |
| Retrieval, the fixed refusal, the passage-only answer | `web/lib/ask/compose.ts` |
| Which source answers, and the prompt | `web/lib/ask/answer.ts` |
| Holding numerals until traced, anchors until closed | `web/lib/ask/guard.ts` |
| Model id, output ceiling, question ceiling, credential | `web/lib/ask/provider.ts` |
| Status codes, stream parts, withdrawal | `web/app/api/ask/route.ts` |

- 400: malformed JSON or an invalid question. The body is plain text naming the ceiling, and no stream opens.
- 200: a UI message stream. Parts are `text-start`, `text-delta` with id `answer`, and `text-end`.
- There is no 502. Headers are already sent when the model fails, so a failure writes `data-withdraw` with reason `the model was unreachable`, then the refusal, then ends.
- A traced violation writes `data-withdraw` with the offending number and the refusal, then ends. The client replaces the answer.
- Allowed digits come from the retrieved passage only. History is context, never evidence, and the route enforces it by leaving history out of the trace set.
- The client posts `{ question, history: [{ role, text }] }`, composed in `web/components/agent/chat-provider.tsx`. The request guard allows up to 12 turns of up to 2000 characters.
- Retrieval runs twice per request: once here for the allowed digits and the citation targets, once inside `answerChunks`. Keep `retrieve` pure.

If you are changing answer behaviour rather than wiring, read `web/lib/AGENTS.md` instead.

## Invariants

Routes:

- **Five surfaces prerender.** No page reads `cookies`, `headers`, `searchParams`, or the clock. A page that starts reading one needs a `<Suspense>` boundary under `cacheComponents`; there is no data fetching to opt out of.
- **One `<main id="main">` per surface**, always through `PageMain` in `web/components/shell/page-main.tsx`, so the skip link has a target. One `<h1>` per surface, never a second.
- **Every public surface exports `metadata` from `pageMetadata`** in `web/lib/seo.ts`, with a unique `path`. The path becomes the canonical, resolved against the layout's `metadataBase`. `web/tests/e2e/launch.spec.ts` asserts an absolute, unique canonical and a share image on all five surfaces.
- **No page-level `openGraph` object.** Metadata merges shallowly, so a page's `openGraph` replaces the layout's wholesale and the share image disappears. `pageMetadata` exists to be the one place that object is written.
- **The layout does not draw the frame.** Each page carries its own `mx-auto max-w-frame px-gutter` (the report nests that frame inside `px-gutter`; ask uses `max-w-chat`). The report's reading column stays 720px.
- **No route segment config.** See gotchas.
- **The footer, the sitemap, and the shell spec agree on five routes.** `site.surfaces` in `web/content/site.ts` is the footer's list; `PATHS` in `web/app/sitemap.ts` is the crawler's.

Theme:

- **One class string serves both themes.** A `dark:` variant is a second copy of a decision that already exists; `check-styles.mjs` fails on it.
- **Colour comes from a role.** `check-styles.mjs` also fails on a raw hex or an arbitrary value anywhere in a `.tsx` file, comments included.
- **The theme applies after hydration, by decision.** The document paints from the media query, then `ThemeProvider` writes `data-theme` from storage. A stored choice that differs from the system shows one frame of the system theme. Do not add a pre-paint inline script without changing decision D6 in `openspec/changes/archive/2026-10-27-replatform-site/design.md` first.
- **The system-preference block is a full copy of the dark scope**, not a subset, because a reader with scripting off gets nothing else. `web/tests/e2e/theme.spec.ts` checks that case.
- **Page surfaces never set their own ground.** `html` gets its background and colour from `globals.css`, and `body` gets the reading face and size. A page sets layout, not theme.

## Adding a route

1. Decide whether it is a surface. The footer repeats five routes, the sitemap lists five, and `../../openspec/specs/site-shell/spec.md` states it. A sixth surface changes the shell and content specs before it changes a file.
2. Create `web/app/<name>/page.tsx` as a server component. Do not put `"use client"` on a page; state belongs in an island the page imports.
3. Wrap the body in `PageMain` from `web/components/shell/page-main.tsx` and copy the frame classes from a sibling, usually `mx-auto max-w-frame px-gutter py-block`.
4. Write one `<h1>`. Take the copy from `web/content/`, not from a literal: a digit in a JSX text node fails `check-content.mjs`.
5. Export `metadata` from `pageMetadata` in `web/lib/seo.ts`: the bare title, a description, and the real path. The layout's template appends the site name to child segments. Never set `openGraph` by hand.
6. If it is public, add the path to `PATHS` in `web/app/sitemap.ts` and to `site.surfaces` in `web/content/site.ts`. Add it to `site.nav` only if the primary navigation should carry it; that list is three items by design.
7. If the agent should answer from it, add the surface id to `surfaceIds` in `web/content/ids.ts` and one chunk per anchorable section to `web/content/corpus.ts`. `web/tests/unit/corpus.test.ts` checks coverage and duplicate anchors.
8. Add the path to the surface lists in `web/tests/e2e/launch.spec.ts`, `integration.spec.ts`, and `shell.spec.ts`, so metadata, widths, themes, and targets cover it.
9. Name the new file in this document, and in the matching `design-system/` doc, or `web/scripts/check-artifacts.mjs` fails.
10. Run `npm run check`. Fix the code, not the segment config.

## Gotchas

- **`export const dynamic` is rejected.** With `cacheComponents` on, caching is declared where data is read (`use cache`, `cacheLife`), not on the route, so `dynamic`, `revalidate`, and `fetchCache` error, `runtime` must be removed, and `dynamicParams` fails the build with "not compatible with `nextConfig.cacheComponents`". A handler is dynamic because it reads the request; a page prerenders because nothing in it is request-dependent.
- **The title template applies to `not-found`.** `app/not-found.tsx` is resolved as a child page, so a title that already contains the site name renders the suffix twice. Pass the bare title; `app/page.tsx` is the only page that carries a full one.
- **A page-level `openGraph` loses the image.** This has the shape of a local override and behaves like a replacement. `web/tests/e2e/launch.spec.ts` catches it on the five surfaces, not on a new page until that page is added to the list.
- **The endpoint has no failure status.** Adding a 502 path for an unreachable model would produce a response the client never reads, because the stream has already opened. Failure is a withdrawal part.
- **The theme scopes are found by their literal selectors.** `check-tokens` locates the three scopes, and `contrast` the first two, by the strings `:root {`, `[data-theme="dark"] {`, and `:root:not([data-theme="light"]) {`. Reformat one onto two lines and the check throws "missing block" instead of reporting a token problem.
- **The print block is unchecked by the token gate.** It is the fourth copy of the colour names. A new role inherits its screen value on paper unless it is added there deliberately. `web/tests/e2e/print.spec.ts` only asserts black on white.
- **`--text-reading` cannot be renamed `--text-body`.** `text-body` is already the colour utility, and the two would collide. The CSS comment records this.
- **`data-scroll-behavior="smooth"` is what keeps client navigation instant.** `globals.css` sets `scroll-behavior: smooth`; without the attribute Next 16 stops overriding it, and every route change animates the scroll to the top.
- **`globals.css` is imported only by the layout.** A second import duplicates the token blocks and the scopes.
- **The home JSON-LD is the only `dangerouslySetInnerHTML`.** `biome.json` turns that rule off for `app/page.tsx` by name, and the object is built from constants. Moving the script to another file fails lint, and taking any part of it from a request would be an injection.
- **`?from=` is read in the client island, not by the page.** `AgentRoom` reads `window.location.search` and checks an allowlist. Reading it as a server `searchParams` prop would make `/ask` request-dependent, which is the one thing that page must not become.
- **`sitemap.ts` has a dead export and a literal date.** `origin` is imported nowhere, and `lastModified` is the fixed `2026-10-27`. A surface change is also a sitemap change.
- **`/ask` is prerendered, and its transcript starts empty.** The conversation lives in the layout's `ChatProvider`. Moving that provider into `web/app/ask/page.tsx` would empty the conversation on navigation, which `../../openspec/specs/site-agent/spec.md` forbids.

## Where to read next

| Topic | Doc |
|---|---|
| The token contract: colours, type, layout, shapes | `../../DESIGN.md` |
| The frame, the bar, the invitation, the agent switch | `../../design-system/components/navigation.md` |
| Colours, the scopes, contrast, the theme choice | `../../design-system/foundations/color-and-theme.md` |
| Type steps, the three voices, the reading size | `../../design-system/foundations/typography.md` |
| Landmarks, targets, focus, the skip link, without scripting | `../../design-system/foundations/accessibility.md` |
| The frame, the gutter, the measure, motion | `../../design-system/foundations/space-shape-motion.md` |
| Home, work, and about as surfaces | `../../design-system/surfaces/pages.md` |
| The report as a document | `../../design-system/surfaces/report.md` |
| The agent surface and its transcript | `../../design-system/surfaces/chat.md` |
| The shell and the theme choice | `../../openspec/specs/site-shell/spec.md` |
| Five surfaces, their jobs, the copy rules | `../../openspec/specs/site-content/spec.md` |
| Colour meanings, the accents, type, shape, motion | `../../openspec/specs/design-contract/spec.md` |
| The report's document requirements | `../../openspec/specs/report-document/spec.md` |
| The agent's answers, citations, and refusal | `../../openspec/specs/site-agent/spec.md` |
| Metadata, the missing page, the share image, crawler files | `../../openspec/specs/launch-readiness/spec.md` |
| The answer path in detail | `web/lib/AGENTS.md` |
| The registry, the corpus, the copy | `web/content/AGENTS.md` |
| Which test protects which rule | `web/tests/AGENTS.md` |
| Which check forbids what | `web/scripts/AGENTS.md` |
