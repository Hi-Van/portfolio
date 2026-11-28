# Repo audit spec, 2026-11-27

## Purpose

Fix every finding from the audit session on `develop`. The audit found three red items in the working tree, four accessibility defects, three gate weaknesses, six over-engineering or maintenance problems, and four test or copy weaknesses. This spec records the decisions so the implementation plan does not reopen them.

## Load

The site is a static export served from a CDN. One reader visits at a time, many anonymous readers total. There is no server runtime, no auth, no money, no data write, no background job, and no shared state. The only storage is `localStorage["vs-theme"]`. The only network surface is clickable links and `mailto:`.

## Findings and owners

| Finding | Plan task |
| --- | --- |
| Biome failure and dead `pulseHeart` | 1 |
| `Résumé` copy breaks the footer test | 1 |
| Theme icon inverted | 1 |
| Theme control wrong before hydration and without JS | 2 |
| Mobile label below 44px | 2 |
| Island hides while focus is inside | 3 |
| Menu survives resize to desktop, dangling `aria-controls` | 3 |
| Gate continues after failure and uses stale `out/` | 4 |
| Design token check skips both dark ramps | 4 |
| `sync-art.mjs` assumes a sibling checkout | 4 |
| Clock fallback is a frozen timestamp | 5 |
| Reduced motion has no CSS block | 6 |
| Unused `lucide-react`, `tw-animate-css`, misplaced `shadcn` | 7 |
| Unpinned design linter, no Node floor | 7 |
| CI tests one browser | 8 |
| Content layer models prose once | 9, 10, 11 |
| Proof figures authored twice | 12 |
| Dead UI exports, props, variants, tokens | 13 |
| Weak and duplicated tests | 14 |
| Duplicate rect counts | 15 |
| Static copy ages | 9, 12 |
| `readStoredTheme` is unused | 13 |

## Decisions

- Keep `class-variance-authority`. It is one small dependency and gives typed variants. Replacing it with a plain object would add hand-written variant typing for a four-variant button. The audit called this optional.
- Keep every token that `DESIGN.md` names, including `--r-surface`, `--row`, and `--text-num-inline`. Delete only CSS aliases that no utility uses and that the design spec does not name: `--container-frame`, `--spacing-frame`, and `--spacing-row`. Use `text-num-inline` in `work-row.tsx`.
- The footer year is computed at build time with `new Date().getFullYear()`. A static export freezes it until the next build. Mark this ceiling with a `ponytail:` comment.
- The clock keeps a server-rendered value, but the value now comes from the build render and is passed into the client component as the initial reading. Replace the fixed fallback with that prop. Mark the build-time ceiling with a `ponytail:` comment.
- Keep the editorial copy "to now", "Right now", and "since June 2025". They are part of the product voice. Add `ponytail:` comments that name the need to edit them when the role changes. Do not rewrite them.
- Restore `Résumé` exactly. It is the prototype value and the acceptance test value.
- Change the content rule. Repeated structured copy stays in `content/`. Prose rendered once moves into its component. Update `AGENTS.md`, `README.md`, and `PORTING.md` to match. This is a deliberate exception to the old "all copy in content" rule.
- Keep the generator guard in `sync-art.mjs` and one runtime rect count in the browser suite. Remove the duplicate count from `check-artifacts.mjs`.
- Add a Firefox and WebKit job to CI instead of dropping the claim. Pin `@google/design.md` at 0.4.0 as a devDependency.
- Add a neutral theme control state for readers before hydration and without JS. The control has no `aria-pressed` and uses the accessible name "Toggle color theme". The icon is decorative, so it may show the moon until the theme resolves.
- Keep the port at 3100 by default and allow `PORT` to override it in both `playwright.config.ts` and `tests/e2e/helpers.ts`. Do not reuse an existing server.

## Out of scope

- Rewriting `MANIFEST.txt`. It is a historical record.
- Editing `DESIGN.md` values. The design contract does not change.
- Adding runtime dependencies, analytics, a CMS, a test framework, or a schema layer.
- SEO metadata. The audit did not find it.

## Verification

Run `npm run check` and `npm run test:browsers`. Confirm `node scripts/check-tokens.mjs` fails when a dark token changes and passes when it is restored. Confirm `node scripts/sync-art.mjs /missing` exits with a clear message. Confirm the no-JS theme and clock tests, the focus and resize tests, and the reduced-motion CSS test.
