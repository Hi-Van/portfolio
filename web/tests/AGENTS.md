# tests/

`web/tests/` is the executable half of the design contract: `unit/` decides logic in Node, `e2e/` proves what a reader can do in a browser, and `types/` holds rules the compiler enforces. As counted on 2026-10-27 that is 23 files that a runner runs, holding 65 unit tests and 65 browser tests, plus one compile-time file. Recount when you add one.

## Where a test goes

| Directory | Runner | Picked up by | Holds |
|---|---|---|---|
| `web/tests/unit/` | Vitest in Node | `web/vitest.config.mts`, include `tests/unit/**/*.test.ts` | Logic: the registry, the arithmetic, the guard, the request predicate, the route, the proxy, the corpus, the question suite |
| `web/tests/e2e/` | Playwright in a real browser | `web/playwright.config.ts`, `testDir` `./tests/e2e` | Behaviour: one file per surface, plus the shell, theme, print, fonts, launch, and the integration matrix |
| `web/tests/types/` | TypeScript inside `next build` | `web/tsconfig.json`, include `**/*.ts` | Assertions that fail the build when a rule weakens. No runner reads them |

A unit test owns data; an e2e test owns what a reader can do. If a behaviour needs hydration, storage, scrolling, or a pointer, it is e2e. If it can be decided from values, it is unit. If the rule must hold for every call site and not just for one example, it is a type assertion.

## Every test file, and what it protects

| File | Tests | Protects |
|---|---|---|
| `web/tests/unit/facts.test.ts` | 13 | One registry: every declared id present once, the provenance mix is 8 measured, 4 derived, 3 assumed and 1 not-measured, each figure carries a mechanism or a stated reason, `display` agrees with `value`, a derived figure recomputes from its inputs, indigo maps to measured and clay to assumed, a surface only receives its own figures, and the home band changes when one fact changes |
| `web/tests/unit/model.test.ts` | 8 | The report's arithmetic: annual submissions, filing hours per second, the default seller hours, both sliders moving the result proportionally, `clamp`, and the defaults matching what the prose prints |
| `web/tests/unit/guard.test.ts` | 7 | No unstated number and no half-written anchor reaches a reader: a traced number releases, a numeral split across chunks is held, an untraced number ends the answer, an anchor is held until it closes, `flush` traces a trailing numeral |
| `web/tests/unit/guards.test.ts` | 3 | The request predicate: one to 280 characters, at most 12 history turns, only `user` and `assistant` roles, malformed input rejected before a stream opens |
| `web/tests/unit/route.test.ts` | 6 | The endpoint: 400 with no stream for an invalid body, the fixed refusal streamed with no withdrawal, an untraced number withdrawn and replaced by the refusal, a supported number passing through, history not answering on its own, a split delta not released early |
| `web/tests/unit/suite.test.ts` | 3 | The question suite as a release gate: every question answers with an anchor or refuses, no answer contains an untraced number, false refusals and false answers are zero and the refusal rate stays under 40 percent. It prints the suite's rates, which the README's agent section quotes |
| `web/tests/unit/corpus.test.ts` | 3 | Every section and role anchor a reader can ask about has a chunk, no two chunks share an anchor, every chunk cites its own surface and carries keywords |
| `web/tests/unit/contact.test.ts` | 2 | The address is written only in `web/content/site.ts`, and no employer-scoped figure reaches the home or report surfaces |
| `web/tests/unit/parts.test.ts` | 3 | A withdrawal replaces everything the answer streamed, including text that arrived after the withdrawal, with the one refusal sentence |
| `web/tests/unit/proxy.test.ts` | 7 | One canonical host: www to apex with the query kept, http to https, a normalised or spoofed proto header, a request that is already canonical, local and preview hosts untouched |
| `web/tests/unit/placeholder.test.ts` | 1 | The Vitest runner is wired. It asserts arithmetic and nothing about the site |
| `web/tests/e2e/home.spec.ts` | 4 | The home surface states who, what and three measured results, every band cell shows a registered number and links to `/work`, the worth-at-scale link goes to `/report`, and home carries no report furniture |
| `web/tests/e2e/work.spec.ts` | 3 | Roles and systems render with their figures, employer-scoped figures appear on work only, every deep link into the report lands on an element that exists |
| `web/tests/e2e/about.spec.ts` | 3 | The bio, the facts list and the contact card, the surface reflows at 390, and every `mailto:` on every surface is the one constant |
| `web/tests/e2e/report.spec.ts` | 12 | The report as a document, the stated reading time against the real word count, prose and figures sharing one column, five figures with captions that state an assumption, the model's default output and two sliders, the sliders meeting the target floor, an assumption change recomputing the output, the section navigation stating position at 390, the report complete with scripting off, no hydration mismatch, and chart label size at two widths |
| `web/tests/e2e/agent.spec.ts` | 12 | The agent surface: a composer and a way back, an answer streamed with a citation that resolves, an outside question refused, one announcement rather than one per fragment, the conversation surviving navigation and clearing on reload, a second question held out while one arrives, an aborted request offering a retry that works, the return control and Escape going back to the surface of origin, suggested questions that are real and meet the floor, reduced motion landing in the end state, and a foreign `from` parameter landing on home |
| `web/tests/e2e/shell.spec.ts` | 11 | The bar is identical and in order on all five surfaces, the current surface is announced with `aria-current`, header and footer controls meet 44 by 44, the skip link comes first and its ring is 2px at 3px, the menu meets the floor at 390 and opens, moves focus, closes on Escape or on a link or on widening, the panel has no travel under reduced motion, every focusable element shows the ring, and no surface scrolls sideways at 390 |
| `web/tests/e2e/theme.spec.ts` | 4 | The system preference paints the first visit, a stored choice wins once interactive, the control writes the choice and announces the state it is showing, and the system preference stands with scripting off |
| `web/tests/e2e/integration.spec.ts` | 5 | The matrix: five surfaces at 390, 768 and 1440, in both themes, with the right ground colour and no horizontal overflow; every surface readable with scripting off; the report complete with scripting off; no transition lasting over a millisecond under reduced motion; the skip link first in the document on every surface |
| `web/tests/e2e/launch.spec.ts` | 8 | An absolute canonical per surface, no duplicate, per-surface title and description and share image, the share image served as a 1200 by 630 PNG, crawler files naming the production origin only, a designed 404 inside the frame, no third-party request, the `Person` schema, and no surface implying a résumé exists |
| `web/tests/e2e/fonts.spec.ts` | 1 | No request leaves for Google Fonts, so the three voices are self-hosted |
| `web/tests/e2e/print.spec.ts` | 1 | Print is black on white regardless of the screen theme |
| `web/tests/e2e/placeholder.spec.ts` | 1 | The application serves a page with a body. Scaffolding for the Playwright runner |
| `web/tests/types/fact-types.ts` | compile time | Three `@ts-expect-error` lines: a raw number and a display string are not a `Fact`, and an accent comes from a provenance object rather than a string. If any of the three lines stops erroring, `tsc` reports an unused directive and `next build` fails |

## Running one

Every command runs from `web/`.

```bash
npx vitest run tests/unit/guard.test.ts                          # one unit file
npx vitest run tests/unit/guard.test.ts -t "split across chunks"  # one unit test
npx playwright test tests/e2e/report.spec.ts                     # one spec file, Chromium
npx playwright test tests/e2e/agent.spec.ts -g "announced once"  # one browser test
npx playwright test tests/e2e/integration.spec.ts --project=webkit  # one project
npx playwright test --list                                       # every test that would run
npm run test:unit                                                # all unit tests
npm run test:e2e                                                 # all specs, Chromium
npm run test:browsers                                            # integration only, Firefox and WebKit
```

Vitest filters by test name with `-t`; Playwright filters with `-g` and selects an engine with `--project`. A Playwright run starts `npm run dev` from `web/playwright.config.ts` unless a server already answers on port 3000.

## The gate, and the browsers it leaves out

`npm run check` runs eight steps in order: tokens, artifacts, content, styles, contrast, unit, e2e, bundle. The unit step is `vitest run` over `tests/unit/**/*.test.ts`. The e2e step is `playwright test --project=chromium`. The bundle step is the only one that produces a build, and it typechecks the project on the way.

No browser test runs against a production build: `web/playwright.config.ts` starts `npm run dev` and points at `http://localhost:3000`. The gate therefore says nothing about Firefox, WebKit, a warmed build, or production caching. It runs one engine so a clean checkout needs one browser download and one server start. `npm run test:browsers` is the only cross-engine command, and it runs `tests/e2e/integration.spec.ts` alone in two projects, ten executions. The matrix is what makes a cross-engine claim: layout at three widths in two themes, the no-scripting path, reduced motion, and the skip link. Everything else is a Chromium claim, including every keyboard and focus assertion in `web/tests/e2e/shell.spec.ts`.

## The two seams that are faked, and how

| Seam | File | Mechanism |
|---|---|---|
| The answer source | `web/tests/unit/route.test.ts` | `vi.mock("../../lib/ask/answer", () => ({ answerChunks: vi.fn() }))`, which Vitest hoists above the route import, so the route binds the mock. Each test sets a generator with `mockImplementation` and `beforeEach` resets it |
| The network transport | `web/tests/e2e/agent.spec.ts` | `page.route("**/api/ask", handler)` delays the request by 900ms once, or aborts the first request. No test fulfils a fabricated body, so the answer text always comes from the real source behind the dev server |

The route test replaces only `answerChunks`. Retrieval, the guard, the refusal and the stream stay real, which is why it can assert a withdrawal. The browser tests intercept the transport without inventing a response, so they exercise the endpoint, the client transport in `web/components/agent/chat-provider.tsx`, and the transcript together.

## Conventions that keep the suite honest

- **Scope a locator to the region you mean.** The same words appear in the header, the footer, and a card. `web/tests/e2e/agent.spec.ts` uses `page.locator("header").getByRole("link", { name: /^Ask$/ })` because "Ask" also names the heading, the composer and the switch. `web/tests/e2e/about.spec.ts` scopes the address link to `#main` because the footer repeats it. `web/tests/e2e/home.spec.ts` takes `getByRole("list").first()` because the band is not the only list on the surface. The transcript uses `getByRole("article").last()` because rows accumulate.
- **Assert what a reader sees.** Roles, accessible names, `aria-current`, `aria-pressed`, visible text, and computed values a reader can perceive: outline width, `transform: none`, the background colour, the measured size of a target. A class name is not a reader experience. `web/tests/e2e/report.spec.ts` counts `.fill-chart-cell` once, because those cells carry no text; do not add a second class-based locator.
- **Measure, do not judge.** A target is a box of at least 44 by 44. Overflow is `scrollWidth - clientWidth` at or below zero. The ring is `2px` at `3px`. A chart label is at least 10px at 960 and 9px at 390. The reading column is two boxes within a pixel. Contrast is measured from the token pairs by `web/scripts/contrast.mjs` in both themes; a new pairing goes there, not into a test with a ratio typed into it.
- **Wait for a condition, never sleep.** `await expect(locator)` retries until the page settles. The one timer in the suite sits inside a route handler in `web/tests/e2e/agent.spec.ts` to hold a request open, not between a test and its assertion.
- **Never skip to green.** If a platform lacks a behaviour, assert the claim the platform does support and narrow the rest, with a comment saying why. `web/tests/e2e/integration.spec.ts` does exactly this for WebKit's Tab order: DOM order for every engine, the keyboard half only where the platform provides it.
- **Literals in a test are allowed.** The registry rule binds surfaces; `web/scripts/check-content.mjs` scans `app/` and `components/`. When the value is arithmetic or an address, import it, as `web/tests/e2e/report.spec.ts` imports `wordCount` and `readingMinutes`, and `web/tests/e2e/about.spec.ts` imports `site.email`.
- **A unit test holds the logic, an e2e test holds the experience.** Do not reimplement the model in a browser test to check a sum. Do not assert a focus ring in Node.
- **No screenshot comparison.** `preview/` is review evidence. Nothing diffs it.
- **Name every new file here.** `web/scripts/check-artifacts.mjs` fails until a source file is named in a context document.

## The specs behind the assertions

| Spec | Requirements the suite decides | Files |
|---|---|---|
| `openspec/specs/site-agent/spec.md` | One fixed refusal, no unstated numbers, every answer cited, history is context, announced once, a visit keeps its conversation, the reader returns where they came from, composing a question, failure visible and recoverable, the answer path safe to expose, suggested questions are real | `web/tests/unit/guard.test.ts`, `web/tests/unit/route.test.ts`, `web/tests/unit/suite.test.ts`, `web/tests/unit/parts.test.ts`, `web/tests/unit/guards.test.ts`, `web/tests/e2e/agent.spec.ts` |
| `openspec/specs/site-content/spec.md` | One number registry, provenance classes, derived numbers show their arithmetic, assumptions controlled by the reader, captions state their assumption, employer-scoped numbers stay scoped, five surfaces with distinct jobs | `web/tests/unit/facts.test.ts`, `web/tests/unit/model.test.ts`, `web/tests/unit/contact.test.ts`, `web/tests/unit/corpus.test.ts`, `web/tests/e2e/home.spec.ts`, `web/tests/e2e/work.spec.ts`, `web/tests/e2e/report.spec.ts` |
| `openspec/specs/report-document/spec.md` | The report is a document, the reading column, five figures, the model follows its inputs, complete without scripting, section navigation states position, the stated reading time is true | `web/tests/e2e/report.spec.ts`, `web/tests/e2e/integration.spec.ts`, `web/tests/e2e/work.spec.ts` |
| `openspec/specs/site-shell/spec.md` | A shared top bar, the current surface is stated, the theme choice, the narrow-viewport menu, the keyboard path, interactive targets meet the size floor, the footer | `web/tests/e2e/shell.spec.ts`, `web/tests/e2e/theme.spec.ts`, `web/tests/e2e/integration.spec.ts` |
| `openspec/specs/launch-readiness/spec.md` | A real contact address, an origin and canonical addresses, per-surface metadata, a missing-page surface, a share image, the résumé path, no tracking | `web/tests/e2e/launch.spec.ts`, `web/tests/e2e/about.spec.ts`, `web/tests/e2e/fonts.spec.ts` |
| `openspec/specs/design-contract/spec.md` | Motion is reader-initiated, the reading measure, small-type floors, contrast floors, both themes carrying the same meanings | `web/tests/e2e/integration.spec.ts`, `web/tests/e2e/report.spec.ts`, `web/tests/e2e/theme.spec.ts`, and `web/scripts/contrast.mjs` for the ratios |

## What the suite does not decide

| Requirement | Where it is decided instead |
|---|---|
| Exactly one filled invitation per surface | Nothing asserts a count. The captures in `preview/` and review against `openspec/specs/site-shell/spec.md` |
| Three voices, each with its job | `web/tests/e2e/fonts.spec.ts` proves the fonts are self-hosted, not that Instrument Serif is a statement, Literata is reading and Instrument Sans is interface |
| The 1040px frame and the 720px measure | `web/tests/e2e/report.spec.ts` proves prose and a figure agree, not that either is 720 |
| No number printed outside the registry | `web/scripts/check-content.mjs` |
| Contrast floors | `web/scripts/contrast.mjs` |
| What ships to the browser | `web/scripts/check-bundle.mjs` |

## Adding a test

1. Decide the layer. Data goes in `web/tests/unit/`, a reader's behaviour in `web/tests/e2e/`, a rule that must hold at every call site in `web/tests/types/`.
2. Find the requirement in `openspec/specs/<capability>/spec.md` and take its scenario as the test name, so a failure reads as the requirement rather than as a line of code.
3. Create the file. Unit: `web/tests/unit/<name>.test.ts`, importing from `../../content/` or `../../lib/`. Browser: `web/tests/e2e/<name>.spec.ts`, one file per concern, named for the requirement rather than the component.
4. Write the locator before the assertion, and scope it to the region. Check whether the same words appear in the header, the footer, the transcript or a card.
5. If the requirement is a number, measure it. Do not describe it in a comment and assert a string.
6. Plant the violation and watch the test fail for the right reason, then revert. A test that has never failed is not evidence.
7. Run the file alone, then `npm run test:unit` or `npm run test:e2e`, then `npm run check`.
8. Name the file here with its `web/tests/...` path. `web/scripts/check-artifacts.mjs` fails otherwise.
9. If the claim is about layout, theme, scripting or the skip link, put it in `web/tests/e2e/integration.spec.ts` as well, because that is the only file `npm run test:browsers` runs.
10. If the rule is about what may be passed to a function, extend `web/tests/types/fact-types.ts` instead of adding a runner. The compiler is the test.

## Gotchas

- **A reset mock returns `undefined`, and the route catches it.** `web/tests/unit/route.test.ts` clears `answerChunks` in `beforeEach`, so a test that sets no implementation gets `undefined`, the `for await` throws, and the route's catch writes the withdrawal and the refusal. The test named "history never becomes evidence" asserts only that the refusal appears, so it passes on that failure path rather than because history was excluded. If you change it, make the mock yield a number that exists only in history and assert `data-withdraw`.
- **The mock replaces the whole module, not one function.** The factory in `web/tests/unit/route.test.ts` returns `{ answerChunks }` only, and Vitest hoists the call above the imports, so the route binds the mock. If the route ever imports a second name from `web/lib/ask/answer.ts`, that name is `undefined` in this test and the seam breaks in a way that looks like a route bug.
- **The agent specs assume the credential-free path.** There is no `.env.local` in `web/`, so `answerChunks` yields the retrieved passage, and "30% faster" for the Walmart question is stable and deterministic. Export `DEEPSEEK_API_KEY` or add `web/.env.local` and the same question goes to the model instead, and `web/tests/e2e/agent.spec.ts` becomes flaky. Run that spec with the variable unset.
- **Playwright reuses a server on port 3000 outside CI.** `reuseExistingServer` is `!process.env.CI`, so a forgotten dev server from another checkout serves the tests with stale code. Stop it, or run with `CI=1` to force a fresh one.
- **`127.0.0.1` never hydrates in dev.** `web/AGENTS.md` records it: Next blocks cross-origin dev requests from that host, so the client never starts and every client assertion fails for no visible reason. The config and the generators use `localhost`.
- **WebKit on macOS leaves links out of the Tab order.** Safari only tabs to links when the reader enables it in settings, so `web/tests/e2e/integration.spec.ts` asserts DOM order first for every engine and then skips the keyboard half for `browserName === "webkit"`. The skip is inside one test, not a `test.skip`.
- **A passing gate does not cover Firefox or WebKit.** `npm run check` is Chromium only. Cross-engine behaviour needs `npm run test:browsers`, and that command runs one file, so `web/tests/e2e/shell.spec.ts` keyboard assertions are a Chromium claim even after it passes.
- **Chart label size has two thresholds.** `web/tests/e2e/report.spec.ts` requires at least 10px at 960 and 9px at 390, because the chart narrows. Narrowing the reading column means re-checking both numbers in the same change, and `openspec/specs/design-contract/spec.md` says why.
- **A repeated figure makes an unscoped text locator ambiguous.** When a new band cell, work row or caption repeats a value that already appears on the surface, an unscoped `getByText` gains a second match and strict mode fails on the locator, not on the copy. Scope to the region, or use `.first()` only when the ordering is the point.
- **The hydration test is narrower than it looks.** `web/tests/e2e/report.spec.ts` listens for console errors and warnings but only records messages matching `/hydrat|did not match/`. Other console errors do not fail it.
- **The band test mutates the registry and restores it.** `web/tests/unit/facts.test.ts` writes `999,999` into `intake-per-second` to prove the band reads the registry, then restores it inside a `finally`. Read the first failure, not the cascade.
- **The type file protects a rule only while it exists.** Deleting `web/tests/types/fact-types.ts` fails nothing: the artifact check names files, it does not require them. Its assertions fail when a `@ts-expect-error` stops erroring, which TypeScript reports as an unused directive inside `next build`, and that build runs in the bundle step, last.
- **Playwright output is not ignored by git.** A run writes `web/test-results/`, and `web/playwright-report/` on a failure. `web/scripts/check-artifacts.mjs` excludes both, `.gitignore` does not, so check `git status` before committing.
- **Vitest 5 wants Node `^22.12 || ^24 || >=26`.** This machine runs 25 and prints an engine warning. The warning is not a test failure.
