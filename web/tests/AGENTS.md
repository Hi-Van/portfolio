# tests/

Three runners, three jobs. None of them test the framework; all of them test a requirement.

## Where a test goes

| Directory | Runs on | Holds |
|---|---|---|
| `unit/` | Vitest, Node | Logic: the registry, the arithmetic, the guard, the request predicate, the proxy, the route, the corpus, the question suite |
| `e2e/` | Playwright, a real browser | Behaviour: one file per surface, plus the shell, the theme, print, fonts, launch, and the integration matrix |
| `types/` | `tsc`, during the build | Compile-time assertions. A `@ts-expect-error` that stops erroring fails the build |

## Running one

```bash
npx vitest run tests/unit/guard.test.ts
npx playwright test tests/e2e/report.spec.ts
npx playwright test tests/e2e/agent.spec.ts -g "refused"
npm run test:browsers    # the integration pass in Firefox and WebKit
```

The gate (`npm run check`) runs Vitest over everything and Playwright over Chromium only. The other two
engines are a separate command so the gate stays portable.

## Which test protects which rule

| Rule | Test |
|---|---|
| A number exists once and the band follows it | `unit/facts.test.ts` |
| Derived figures recompute | `unit/model.test.ts`, `unit/facts.test.ts` |
| No number is released before it is traced | `unit/guard.test.ts`, `unit/route.test.ts`, `unit/suite.test.ts` |
| The refusal is byte identical | `unit/route.test.ts` |
| The corpus covers every anchorable section | `unit/corpus.test.ts` |
| The address is written once | `unit/contact.test.ts`, `e2e/about.spec.ts` |
| The proxy redirects only production hosts | `unit/proxy.test.ts` |
| The theme is applied after hydration | `e2e/theme.spec.ts` |
| Targets, focus, and the disclosure | `e2e/shell.spec.ts` |
| The report is complete without scripting | `e2e/report.spec.ts`, `e2e/integration.spec.ts` |
| Announcement happens once, not per fragment | `e2e/agent.spec.ts` |
| Every surface, width, and theme | `e2e/integration.spec.ts` |
| Metadata, share image, crawler files | `e2e/launch.spec.ts` |
| A raw number cannot be passed where a fact is required | `types/fact-types.ts` |

## Conventions

- **Scope a locator to the region you mean.** The transcript, the footer, and a card all contain "Ask"
  or an email; unscoped role locators fail in strict mode. Prefer `page.locator("#main")`,
  `page.locator("header")`, or `getByRole("article").last()`.
- **Assert the requirement, not the implementation.** A test that names a class breaks when the design
  changes; a test that names what the reader sees survives.
- **Measure, do not judge.** Targets, overflow, contrast, and label size are numbers. Assert the number.
- **Prove a guard bites.** When you add a check or a rule, plant a violation, watch it fail, then revert.
- **Do not depend on the dev overlay.** Capture and assert against a production build when the output
  is an artefact.

## Unit tests and the browser

A unit test owns logic; an e2e test owns what a reader can do. If a behaviour needs hydration, storage,
scrolling, or a pointer, it is e2e. If it can be decided from data, it is unit.

`unit/placeholder.test.ts`, `e2e/placeholder.spec.ts`, and `unit/route.test.ts`'s mocks are scaffolding:
the first two prove the runners are wired, the third replaces the answer source so the route's guard can
be tested without a model.

## Don't

- Don't write a test that sleeps. Wait for the condition with `expect(locator)`.
- Don't assert on a screenshot diff. The captures in `../preview/` are for review, not regression.
- Don't skip a test to make the gate green. If a platform does not support a behaviour, assert the part
  it does and say so in a comment, the way `integration.spec.ts` handles WebKit's Tab.
