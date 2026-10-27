# AGENTS.md: van-sirisouk

A measurement-first personal portfolio. The site is a Next.js application in `web/`, the design
contract is `DESIGN.md`, the component reference is `design-system/`, and the change that built the
application is `openspec/changes/replatform-site/`. It is a git repository with a `baseline-static`
tag holding the site's previous static form.

## Read first

| Task | Read |
|---|---|
| Any visual change | `design-system/README.md`, the named component doc, then `DESIGN.md` |
| Any number, caption, or claim | `design-system/foundations/content-and-provenance.md`, then `web/content/facts.ts` |
| A token or theme change | `DESIGN.md` Colors, then `web/scripts/check-tokens.mjs` |
| Component or layout work | `design-system/components/` and `design-system/surfaces/` |
| The agent, its answers, or its citations | `design-system/surfaces/chat.md`, `design-system/components/messaging.md`, `web/lib/ask/` |
| What the change intended | `openspec/changes/replatform-site/design.md` |
| Copy that ships | `README.md`: "The numbers, and where they come from" |

## Layout

| Path | What it is |
|---|---|
| `DESIGN.md` | The token contract: eight role colours, thirteen type steps, shapes, rules. Lints clean |
| `design-system/` | The component reference: narrative, five foundations, five component groups, three surfaces |
| `web/app/` | Routes. `layout.tsx` holds the frame, fonts, and providers; `page.tsx` home, `work/`, `about/`, `report/`, `ask/`, and `api/ask/route.ts` the answer endpoint |
| `web/app/globals.css` | The theme block, three colour scopes, base layer, focus ring, print |
| `web/app/providers.tsx` | The theme provider wrapper |
| `web/app/not-found.tsx` | The missing-page surface, inside the frame |
| `web/app/robots.ts` | Crawler rules, naming the production origin |
| `web/app/sitemap.ts` | The five surfaces, absolute, at the production origin |
| `web/lib/seo.ts` | Per-surface metadata, including the share image |
| `web/proxy.ts` | One canonical host: www and http redirect to the apex; local and preview hosts are left alone |
| `web/public/og.png` | The share image, rendered from the home surface at 1200 by 630 |
| `web/scripts/make-og.mjs` | Regenerates the share image from a running server |
| `web/scripts/capture.mjs` | Regenerates the review screenshots |
| `web/scripts/measure.mjs` | Reports transferred script per surface |
| `web/components/shell/` | `site-header.tsx`, `menu.tsx`, `ask-switch.tsx`, `contact-pill.tsx`, `site-footer.tsx`, `skip-link.tsx`, `page-main.tsx` |
| `web/components/theme/` | `theme-provider.tsx`, `theme-toggle.tsx` |
| `web/components/home/` | `results-band.tsx`, `contact-strip.tsx` |
| `web/components/work/` | `role-row.tsx` |
| `web/components/about/` | `contact-card.tsx` |
| `web/components/evidence/` | `badge.tsx` |
| `web/components/figures/` | `figure.tsx`, `submissions-diagram.tsx`, `latency-bars.tsx`, `unit-grid.tsx`, `annual-volume.tsx` |
| `web/components/report/` | `model.tsx` (figure 5 and its two sliders), `section-nav.tsx` |
| `web/components/agent/` | `chat-provider.tsx` (the conversation above the route), `agent-room.tsx` |
| `web/content/facts.ts` | The registry. Every number the site states |
| `web/content/ids.ts` | The id vocabulary: surfaces, facts, controls |
| `web/content/types.ts` | The provenance union |
| `web/content/model.ts` | The report's arithmetic, shared by the render and the controls |
| `web/content/accent.ts` | The only place a provenance becomes a colour role |
| `web/content/corpus.ts` | The agent's reach: one chunk per anchorable section |
| `web/content/report.ts` | The report's copy, captions, placeholder resolution, word count |
| `web/content/home.ts` | The home copy and the band's data path |
| `web/content/work.ts` | Roles and systems |
| `web/content/about.ts` | The bio and the facts list |
| `web/content/site.ts` | The name, the address, the routes |
| `web/content/format.ts` | Compact and grouped number formatting for figures |
| `web/content/index.ts` | The content barrel |
| `web/lib/ask/compose.ts` | Retrieval and the fixed refusal |
| `web/lib/ask/answer.ts` | The answer source: the model when configured, the passage when not |
| `web/lib/ask/guard.ts` | The stream guard: numerals held until traced, anchors until closed |
| `web/lib/ask/guards.ts` | The request predicate |
| `web/lib/ask/provider.ts` | The model, its output ceiling, the question ceiling |
| `web/lib/agent/` | `parts.ts`, which reads a message and its withdrawal |
| `web/scripts/check.mjs` | The runner: every step, reported separately |
| `web/scripts/check-tokens.mjs` | Contract drift, in both directions |
| `web/scripts/check-artifacts.mjs` | Every source file named in a context doc |
| `web/scripts/check-content.mjs` | No number printed outside the registry |
| `web/scripts/check-styles.mjs` | No arbitrary value, raw colour, or `dark:` variant |
| `web/scripts/check-bundle.mjs` | The build, the client chunks, the forbidden packages |
| `web/scripts/contrast.mjs` | Every text pairing in both themes |
| `web/scripts/lib/tokens.mjs` | Shared parsing for the token checks |
| `web/tests/` | `unit/` for logic, `e2e/` for behaviour in a browser, `types/` for compile-time assertions |
| `web/next.config.ts` | Turbopack with the Tailwind loader; cache components and partial prefetching |
| `web/vitest.config.mts`, `web/playwright.config.ts` | The two test runners |
| `web/biome.json`, `web/package.json`, `web/tsconfig.json` | Format and lint, dependencies, compiler settings |
| `openspec/` | The change that built this, and the specs it will archive into |
| `preview/` | 14 captures of the current build, in both themes and at two widths. Evidence, not source. Regenerate with `web/scripts/capture.mjs` |

## Commands

```bash
cd web
npm run dev                # the site at localhost:3000
npm run build              # prerenders every surface
npm run check              # the gate: tokens, artifacts, content, styles, contrast, unit, e2e, bundle
npm run test:browsers      # the integration pass in Firefox and WebKit
npm run lint               # biome
node scripts/capture.mjs   # review screenshots, needs a running server
node scripts/measure.mjs   # transferred script per surface, needs a running server
```

`npm run check` runs every step and reports each one, then exits non-zero if any failed. It builds the
application twice, once for the bundle scan and once inside Playwright's server, so it takes about a
minute.

`npx -y @google/design.md lint DESIGN.md` must report 0 errors and 0 warnings.

## Hard rules

- **A number comes from the registry.** `web/content/facts.ts` is the only place a number is defined.
  `check-content.mjs` fails when a JSX text node contains a digit. A derived figure names its inputs by
  id and is computed in `web/content/model.ts`.
- **Colour comes from a role.** The Tailwind colour namespace is cleared, so an off-contract colour has
  no utility. `check-styles.mjs` fails on an arbitrary value, a raw hex, or a `dark:` variant.
  `check-tokens.mjs` fails when the stylesheet and `DESIGN.md` disagree in either direction.
- **Two accents, each with a job.** Indigo is measurement. Clay is assumption, in five places: the
  abstract label, figure 1's inference, the assumed method row, the two model sliders, and the note on
  an unstated answer. Nothing else is coloured.
- **Three voices.** Instrument Serif for statements at 26px and above (20px for a serif label),
  Literata for reading, Instrument Sans for interface. The reading size is 19px everywhere.
- **One reading column.** The report's prose and its figures share 720px. Shortening it means
  re-checking chart label size in the same change.
- **Shapes carry meaning.** 4px facts, 6px secondary actions, 10px panels, 12px abstract, 999px pill.
  One filled invitation per page; a document may repeat it in its closing block. No drop shadows.
- **The floor is not advisory.** 44px targets, a 2px focus ring at 3px offset, a skip link, landmarks,
  reduced motion, measured contrast. A browser test measures the targets; do not lower them to fit a
  layout.
- **Content is visible before scripting.** Nothing may start at zero opacity or zero scale and wait for
  an animation. The agent's withdrawal is the one exception, and it is deliberate.
- **Copy rules.** First person, no em dashes, every number carries a mechanism, every figure caption
  states its assumption, no invented data.

## Gotchas

- `web/AGENTS.md` is written by `next dev`. Leave it. The version in use differs from older Next
  releases: route segment config is limited, `cacheComponents` is on, and Tailwind runs through a
  Turbopack loader rather than PostCSS.
- Vitest 5 declares Node `^22.12 || ^24 || >=26`. This machine runs 25, which prints an engine warning
  and works. Pin a supported line before CI.
- The theme is applied after hydration by design (`design.md` D6). A reader whose stored choice differs
  from their system sees one frame of the system theme. Do not "fix" that with an inline script without
  changing the decision first.
- `preview/` is current evidence, not source. Read the tokens, never a screenshot.
- The report's copy states numbers through `{fact-id}` placeholders resolved at render. A literal digit
  in a report paragraph is a bug.
- Without `DEEPSEEK_API_KEY` the endpoint answers from the retrieved passage instead of the model. Both
  paths go through the same guard.

## Launch blockers

- The figure set still wants a check against your own records.
- There is no résumé, by decision. Nothing on the site promises one.
- The previous site is live at the origin until cutover, which is a traffic switch rather than a
  first deploy. The `baseline-static` tag is the way back.

## Verified

As of 2026-10-27, group 9 of the change: 48 unit tests, 52 browser tests, the token, content, style,
contrast and bundle checks, and `DESIGN.md` linting clean. The artifact check across every source file
passes as of this file.
