# Repo audit fixes implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix every finding from the 2026-11-27 audit and leave the gate green on Chromium, Firefox, and WebKit.

**Architecture:** Keep the one-page static export. Restore the three red items, repair four client behavior defects, tighten the gate, then delete the content models and dead UI code that the audit flagged. No new runtime dependencies and no new layers.

**Tech Stack:** Next.js 16.4.6 with `output: "export"`, React 19.3.0, Tailwind 4.3.3, Base UI, Playwright 1.64.1, Biome 2.4.2, Node 22.

**Spec:** `docs/superpowers/specs/2026-11-27-repo-audit.md`

## Global constraints

- `DESIGN.md` is a hard contract. Do not change colours, type sizes, radii, spacing, or copy except the `Résumé` restoration and the build-time year. `MANIFEST.txt` is historical and must not be edited.
- Keep zero external requests at runtime. Fonts stay local, icons stay package imports, and the only outbound URLs are links a reader can click.
- Keep one route and five regions in the order hero, about, stack, work, footer. Keep the prototype class names on rendered elements.
- Keep every interactive target at least 44 by 44.
- Keep the three dark theme declarations in `app/globals.css` and the 44 by 44 control sizes.
- Add no runtime dependency. Keep `class-variance-authority` and keep every token that `DESIGN.md` names.
- Repeated structured copy stays in `content/`. Prose rendered once moves into its component. Update `AGENTS.md`, `README.md`, and `PORTING.md` in task 16.
- Every behaviour fix leaves a test. Every deliberate simplification that cuts a real corner gets a `ponytail:` comment naming the ceiling and the upgrade path.
- Do not run two builds or two test suites in this checkout at once. `.next`, `out/`, and port 3100 are shared.
- Node 22 is the floor. Do not use APIs that need a newer Node.

## Before task 1

- [ ] Create a worktree off `develop` with `superpowers:using-git-worktrees`. Do not implement directly on `develop`.
- [ ] Decide the fate of the four uncommitted files in the original checkout. If they are intended work, commit them on the feature branch before task 1. If not, start from `HEAD`. Task 1 restores the same end state either way.
- [ ] Run `git status --short` in the worktree and record the result.

## Review focus

These are the inputs most likely to break and the tests that pin them:

1. A dark OS with no stored theme, with JS on and off. Task 2 pins the neutral control and the dark paint.
2. A menu opened at 390px and then resized past 861px. Task 3 pins that the panel closes and no duplicate landmarks remain.
3. Keyboard focus inside the header while the page scrolls down. Task 3 pins that the island stays visible.
4. A no-JS reader on the day after a build. Task 5 pins that the clock is not a fixed 2026 time and task 9 pins the year.
5. A copy edit to a proof figure or the `Résumé` link. Task 12 pins the figures and task 1 pins the link.

## Task 1: Restore the green baseline

**Files:**
- Modify: `content/footer.ts`
- Modify: `components/theme-toggle.tsx`
- Modify: `components/icons/animated-icon.tsx`
- Modify: `content/types.ts`
- Test: `tests/e2e/theme.spec.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: a working tree where `biome check` passes, the footer test passes, and the desktop and phone theme controls show the same icon for the same theme.

- [ ] **Step 1: Restore the footer copy**

In `content/footer.ts`, set the label back to `Résumé` and the encoded subject back to `Résumé`. The two lines must read:

```ts
label: 'Résumé',
href: `mailto:${SITE.email}?subject=${encodeURIComponent('Résumé')}`,
```

- [ ] **Step 2: Remove the dead animated icon**

In `components/icons/animated-icon.tsx`, delete the `PulseHeart` import and the `pulseHeart` entry. In `content/types.ts`, remove `'pulseHeart'` from `AnimatedIconName`. If the entry is not present, skip this step.

- [ ] **Step 3: Restore the icon mapping**

In `components/theme-toggle.tsx`, the desktop button must render the animated sun when dark and the static moon when light:

```tsx
{dark ? (
  <AnimatedIcon name="themeSun" size={24} />
) : (
  <Icon name="themeMoon" size={24} />
)}
```

`ThemeSwitch` already renders dark as the animated sun and light as the static moon. Do not change it.

- [ ] **Step 4: Add icon assertions**

In `tests/e2e/theme.spec.ts`, add to the desktop test:

```ts
const animated = toggle.locator('span[data-slot="icon"]');
await expect(animated).toHaveCount(0);
await toggle.click();
await expect(toggle.locator('span[data-slot="icon"]')).toHaveCount(1);
```

In the mobile test, after switching to dark, assert the panel has one animated icon wrapper:

```ts
await expect(panel.locator('span[data-slot="icon"]')).toHaveCount(1);
```

- [ ] **Step 5: Verify and commit**

Run:

```sh
node_modules/.bin/biome check
node_modules/.bin/tsc --noEmit --incremental false
npm run build
npx playwright test tests/e2e/footer.spec.ts tests/e2e/theme.spec.ts --project=chromium
```

Expected: all pass. Commit with `fix: restore the green baseline`.

## Task 2: Fix the first-paint theme control and the label target

**Files:**
- Modify: `components/use-theme.ts`
- Modify: `components/theme-toggle.tsx`
- Modify: `components/ui/label.tsx`
- Test: `tests/e2e/theme.spec.ts`
- Test: `tests/e2e/layout.spec.ts`

**Interfaces:**
- Consumes: the icon mapping from task 1.
- Produces: `useTheme()` still returns `{ theme, toggle }`, where `theme` is `Theme | null`. A control rendered with `theme === null` has no `aria-pressed` and the name "Toggle color theme".

- [ ] **Step 1: Resolve the theme before paint**

In `components/use-theme.ts`, add `useLayoutEffect` and keep `useEffect`. Define one isomorphic hook at module scope:

```ts
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;
```

Use it for the first read of `data-theme` and `matchMedia`. Keep the media listener in `useEffect`. The first read must still use `resolveTheme(root.getAttribute('data-theme'), media.matches)`.

- [ ] **Step 2: Render a neutral state until the theme is known**

In `components/theme-toggle.tsx`, compute `const known = theme !== null;` and `const dark = theme === 'dark';`.

For the desktop button:

```tsx
aria-label={
  known
    ? dark
      ? 'Switch to light theme'
      : 'Switch to dark theme'
    : 'Toggle color theme'
}
aria-pressed={known ? dark : undefined}
```

The icon keeps the `dark ? sun : moon` mapping. The moon is decorative while the theme is unknown, so it is acceptable.

For `ThemeSwitch`, keep `checked={dark}`. The phone row is only reachable after JS opens the menu, so the unresolved state is not a permanent state there.

- [ ] **Step 3: Fix the label target**

In `components/ui/label.tsx`, add `min-h-11` to the base classes. Do not change the row height.

- [ ] **Step 4: Add tests**

In `tests/e2e/theme.spec.ts`, add a no-JS block:

```ts
test.describe('theme without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('a dark OS gets a neutral control', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const toggle = page.locator('button[data-theme-toggle]');
    await expect(toggle).not.toHaveAttribute('aria-pressed');
    await expect(toggle).toHaveAccessibleName('Toggle color theme');

    const paper = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor
    );
    expect(paper).toBe('rgb(16, 17, 20)');
  });
});
```

In `tests/e2e/layout.spec.ts`, in the phone controls test, measure the label:

```ts
const label = page.locator('#site-nav label');
const box = await label.boundingBox();
expect(box).not.toBeNull();
if (box) expect(box.height).toBeGreaterThanOrEqual(43.99);
```

- [ ] **Step 5: Verify and commit**

Run:

```sh
npm run build
npx playwright test tests/e2e/theme.spec.ts tests/e2e/layout.spec.ts --project=chromium
```

Expected: all pass. Commit with `fix: keep the theme control honest before paint`.

## Task 3: Fix header focus, shadow timing, and the resize leak

**Files:**
- Modify: `components/site-header.tsx`
- Test: `tests/e2e/navigation.spec.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: the header never hides while `document.activeElement` is inside it, closes the menu at the desktop breakpoint, and only sets `aria-controls` while the panel is open. The scrolled shadow updates before the pinned return.

- [ ] **Step 1: Guard hiding with focus**

In `onScroll`, before the `openRef` check, add:

```ts
if (header.contains(document.activeElement)) {
  header.removeAttribute('data-hidden');
  lastYRef.current = y;
  return;
}
```

Keep the existing `openRef` branch.

- [ ] **Step 2: Update the shadow before the pin returns**

Move the `data-scrolled` set and remove block above the `pinnedUntilRef` check so a nav click that scrolls updates the shadow. Do not change the pin duration.

- [ ] **Step 3: Close the menu at the desktop breakpoint**

Add an effect that listens to `window.matchMedia('(min-width: 861px)')` and calls `setMenuOpen(false)` when it matches. Clean up the listener.

- [ ] **Step 4: Fix `aria-controls`**

Set `aria-controls={open ? 'site-nav' : undefined}` on the menu button.

- [ ] **Step 5: Add tests**

In `tests/e2e/navigation.spec.ts`:

```ts
test('the island stays visible when focus is inside and the page scrolls', async ({
  page,
}) => {
  await page.goto('/');
  const header = page.locator('header.top');
  await page.locator('a.brand').focus();
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(header).not.toHaveAttribute('data-hidden', '');
  await expect(page.locator('a.brand')).toBeFocused();
});

test('the menu closes when the viewport reaches the desktop layout', async ({
  page,
}) => {
  await page.goto('/');
  await openMenu(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('#site-nav')).toHaveCount(0);
  await expect(page.locator('button.menu-btn')).toBeHidden();
});

test('aria-controls only names an element that exists', async ({ page }) => {
  await page.goto('/');
  const trigger = page.locator('button.menu-btn');
  await expect(trigger).not.toHaveAttribute('aria-controls');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-controls', 'site-nav');
});
```

Add a shadow assertion after clicking a nav link if the current test does not already cover it.

- [ ] **Step 6: Verify and commit**

Run:

```sh
npm run build
npx playwright test tests/e2e/navigation.spec.ts --project=chromium
```

Expected: all pass. Commit with `fix: keep the island honest around focus and resize`.

## Task 4: Make the gate stop on failure and check both dark ramps

**Files:**
- Modify: `scripts/check.mjs`
- Modify: `scripts/check-tokens.mjs`
- Modify: `scripts/sync-art.mjs`
- Modify: `README.md`
- Test: none. The scripts are the check.

**Interfaces:**
- Consumes: nothing.
- Produces: `npm run check` exits on the first failing step. `check-tokens.mjs` validates the light role map and asserts the two dark ramps agree. `sync-art.mjs` fails with a clear message when the prototype path is missing.

- [ ] **Step 1: Stop the gate on the first failure**

Replace the loop body in `scripts/check.mjs` with:

```js
for (const [name, command, args] of steps) {
  console.log(`\n== ${name} ==`);
  const result = spawnSync(command, args, { stdio: 'inherit' });

  if (result.error) {
    console.error(`${name}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`${name}: failed with exit code ${result.status}`);
    process.exit(1);
  }
}

console.log('\ncheck: passed');
```

Delete the `failed` variable and the final failure block.

- [ ] **Step 2: Parse all three colour blocks**

In `scripts/check-tokens.mjs`, add both helpers and read three blocks:

```js
function blockAfter(source, pattern) {
  const match = source.match(pattern);
  return match ? match[1] : null;
}

function tokensFrom(block) {
  const tokens = new Map();
  for (const line of (block ?? '').split('\n')) {
    const match = line.match(/^\s*(--[a-z-]+):\s*([^;]+);/);
    if (match) tokens.set(match[1], match[2].trim().toLowerCase());
  }
  return tokens;
}

const light = blockAfter(css, /:root\s*\{([^}]*)\}/);
const explicitDark = blockAfter(
  css,
  /\[data-theme="dark"\]\s*\{([^}]*)\}/
);
const mediaDark = blockAfter(
  css,
  /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{[\s\S]*?:root:not\(\[data-theme="light"\]\)\s*\{([^}]*)\}/
);
```

Keep the six role checks against the light block. Add a check that every role token exists in both dark blocks and that the two dark maps are equal. Fail with a list of missing or mismatched tokens.

- [ ] **Step 3: Guard the prototype path**

In `scripts/sync-art.mjs`, before `readFileSync`, add:

```js
if (!existsSync(sourcePath)) {
  console.error(
    `Missing prototype: ${sourcePath}\nPass the index.html path: node scripts/sync-art.mjs ../van-sirisouk-concept-2/index.html`
  );
  process.exit(1);
}
```

Import `existsSync` from `node:fs`.

- [ ] **Step 4: Fix the README per-file command**

Change the single-file test example to:

```sh
npm run build && npx playwright test tests/e2e/<name>.spec.ts --project=chromium
```

- [ ] **Step 5: Verify and commit**

Run:

```sh
node scripts/check-tokens.mjs
node scripts/sync-art.mjs /missing/index.html
```

Expected: the first passes. The second exits 1 with the missing prototype message. Then back up `app/globals.css`, change one dark `--muted` value, run `node scripts/check-tokens.mjs`, confirm it fails, and restore the backup. Commit with `fix: stop the gate on failure and check the dark ramps`.

## Task 5: Replace the frozen clock fallback

**Files:**
- Modify: `components/clock.tsx`
- Modify: `components/hero.tsx`
- Test: `tests/e2e/hero.spec.ts`

**Interfaces:**
- Consumes: `formatNow(date: Date): ClockReading` from `lib/clock.ts`.
- Produces: `Clock` takes `{ initial: ClockReading }`. The server render passes the build-time reading. The client effect still updates every 15 seconds.

- [ ] **Step 1: Pass the build-time reading from the server**

In `components/hero.tsx`, import `formatNow` and compute `const initial = formatNow(new Date());` inside `Hero`. Render `<Clock initial={initial} />`.

Add:

```tsx
// ponytail: the static export bakes the build time. No-JS readers see that
// time until the next build. Upgrade: render the clock only after hydration
// if exact time without JS ever matters.
```

- [ ] **Step 2: Accept the reading as the initial state**

In `components/clock.tsx`, remove `FALLBACK`. Change the signature to:

```ts
export function Clock({ initial }: { initial: ClockReading }) {
  const [reading, setReading] = useState(initial);
```

Keep the effect, the 15 second interval, and the markup.

- [ ] **Step 3: Update the no-JS test**

Replace the fixed fallback assertions with a freshness check:

```ts
const value = await page.locator('time[data-clock]').getAttribute('datetime');
expect(value).toBeTruthy();
const age = Date.now() - Date.parse(value ?? '');
expect(age).toBeGreaterThanOrEqual(0);
expect(age).toBeLessThan(24 * 60 * 60 * 1000);
```

Keep the frozen-time test with JS unchanged. It overrides the build-time value in the effect.

- [ ] **Step 4: Verify and commit**

Run:

```sh
npm run build
npx playwright test tests/e2e/hero.spec.ts --project=chromium
```

Expected: all pass. Commit with `fix: stop shipping a frozen clock fallback`.

## Task 6: Add the reduced-motion CSS block

**Files:**
- Modify: `app/globals.css`
- Test: `tests/e2e/accessibility.spec.ts`

**Interfaces:**
- Consumes: the existing `useReducedMotion` hook.
- Produces: every CSS transition and animation has a near-zero duration under `prefers-reduced-motion: reduce`. The hook still pauses Pxlkit frames.

- [ ] **Step 1: Add the media block**

At the end of `app/globals.css`, add:

```css
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}
```

- [ ] **Step 2: Extend the reduced-motion test**

In `tests/e2e/accessibility.spec.ts`, in the reduced-motion test, add:

```ts
const durations = await page.evaluate(() => ({
  button: getComputedStyle(document.querySelector('.btn')).transitionDuration,
  bar: getComputedStyle(document.querySelector('.bar')).transitionDuration,
}));

for (const value of Object.values(durations)) {
  const parts = value.split(',').map((part) => parseFloat(part));
  expect(parts.every((part) => part < 0.001)).toBe(true);
}
```

- [ ] **Step 3: Verify and commit**

Run:

```sh
npm run build
npx playwright test tests/e2e/accessibility.spec.ts --project=chromium
```

Expected: all pass. Commit with `fix: honour reduced motion in CSS`.

## Task 7: Remove unused dependencies and pin the design linter

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `app/globals.css`
- Modify: `components.json`

**Interfaces:**
- Consumes: nothing.
- Produces: no `lucide-react`, no `tw-animate-css`, `shadcn` in `devDependencies`, `@google/design.md` pinned at 0.4.0, and `"engines": { "node": ">=22" }`.

- [ ] **Step 1: Remove the unused dependencies**

Run:

```sh
npm uninstall lucide-react tw-animate-css
npm install --save-dev shadcn@4.23.1 @google/design.md@0.4.0
```

- [ ] **Step 2: Remove the dead CSS import**

In `app/globals.css`, delete `@import "tw-animate-css";`. Keep `@import "shadcn/tailwind.css";`.

- [ ] **Step 3: Fix the package metadata**

In `package.json`, add:

```json
"engines": {
  "node": ">=22"
}
```

Change the design lint script to use the local binary:

```json
"lint:design": "designmd lint DESIGN.md"
```

In `components.json`, remove the `"iconLibrary": "lucide"` line so a future `shadcn add` does not reinstate Lucide.

- [ ] **Step 4: Verify and commit**

Run:

```sh
npm run lint:design
npm run build
npm ls lucide-react tw-animate-css
```

Expected: the design lint and build pass. `npm ls` reports neither package. Commit with `chore: drop unused dependencies and pin the design linter`.

## Task 8: Test Firefox and WebKit in CI and allow a different port

**Files:**
- Modify: `.github/workflows/check.yml`
- Modify: `playwright.config.ts`
- Modify: `tests/e2e/helpers.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: the build from `npm run check`.
- Produces: `PORT` overrides the static server and the base URL. CI installs and runs both extra browsers after the gate.

- [ ] **Step 1: Read the port from the environment**

In `playwright.config.ts`:

```ts
const PORT = Number(process.env.PORT ?? 3100);
const ORIGIN = `http://localhost:${PORT}`;
```

Use `baseURL: ORIGIN` and `webServer.command: `node_modules/.bin/serve out -l ${PORT}``. Keep `reuseExistingServer: false`.

In `tests/e2e/helpers.ts`, replace the hardcoded origin with the same expression.

- [ ] **Step 2: Install and run the extra browsers**

In `.github/workflows/check.yml`, change the Chromium install step to install all three:

```yaml
- name: Install browsers
  run: npx playwright install --with-deps chromium firefox webkit
```

After the gate step, add:

```yaml
- name: Run Firefox and WebKit
  run: npx playwright test --project=firefox --project=webkit
```

- [ ] **Step 3: Update the README**

Document that CI now runs all three browsers and that `PORT` changes the test port. Keep the warning that the port and `out/` are shared.

- [ ] **Step 4: Verify and commit**

Run:

```sh
npm run build
PORT=3200 npx playwright test tests/e2e/smoke.spec.ts --project=chromium
```

Expected: one passing test on port 3200. Commit with `test: run the browser suites in CI`.

## Task 9: Move footer prose into the footer component

**Files:**
- Modify: `components/footer.tsx`
- Delete: `content/footer.ts`
- Test: `tests/e2e/footer.spec.ts`

**Interfaces:**
- Consumes: `SITE` from `content/site.ts`, `Icon`, `FooterScene`, `Shell`.
- Produces: `Footer` has no `FOOTER` import. The year is `new Date().getFullYear()`. The nav is `SITE.nav` plus `Résumé` and `Top`. The prose lines are JSX.

- [ ] **Step 1: Inline the identity, mail, and nav**

In `components/footer.tsx`, define:

```tsx
const year = new Date().getFullYear();
const nav = [
  ...SITE.nav,
  {
    label: 'Résumé',
    href: `mailto:${SITE.email}?subject=${encodeURIComponent('Résumé')}`,
  },
  { label: 'Top', href: '#top' },
];
```

Render the identity with `{year}` and the mail link from `SITE.email`.

Add:

```tsx
// ponytail: the static export freezes the footer year at build time.
// Upgrade: render the year on the client if a stale year matters.
```

- [ ] **Step 2: Inline the made-with line**

Replace `FooterRuns runs={FOOTER.made}` with JSX that keeps the same words and order:

```tsx
<span className="foot__lead italic">Made with</span>{' '}
<Icon name="heart" size={16} className={INLINE_ICON} /> by{' '}
<Icon name="footerUser" size={16} className={INLINE_ICON} /> and{' '}
<Icon name="footerRobot" size={16} className={INLINE_ICON} /> in {SITE.location}
```

- [ ] **Step 3: Inline the two credit lines**

Replace `FOOTER.credits.map` with two hardcoded spans. Keep the five labels, the `rel="noopener"` attributes, and `CREDIT_LINK`.

- [ ] **Step 4: Delete the content module and old helpers**

Delete `content/footer.ts`. Remove `FooterRun`, `FooterLink`, `FooterRunNode`, `FooterRuns`, and the `FOOTER` import. Keep `INLINE_ICON` and `CREDIT_LINK`.

- [ ] **Step 5: Update the footer test year**

Change the identity assertion to use the current year:

```ts
await expect(footer.locator('.foot__id')).toHaveText(
  `Van Sirisouk, Software Engineer. ${new Date().getFullYear()}.`
);
```

Keep the `Résumé` assertions.

- [ ] **Step 6: Verify and commit**

Run:

```sh
npm run build
npx playwright test tests/e2e/footer.spec.ts --project=chromium
```

Expected: all pass. Commit with `refactor: render footer prose in the footer`.

## Task 10: Move hero, proof band, and about prose into components

**Files:**
- Modify: `components/hero.tsx`
- Modify: `components/proof-band.tsx`
- Modify: `components/about.tsx`
- Modify: `content/about.ts`
- Delete: `content/hero.ts`
- Test: `tests/e2e/hero.spec.ts`
- Test: `tests/e2e/sections.spec.ts`

**Interfaces:**
- Consumes: `SITE`, `ABOUT_NOTE`, `ABOUT_LABEL`, `ABOUT_FACTS`, `Clock`, `ProofBand`.
- Produces: no `HERO_DECK`, `PROOF_BAND`, `PROOF_LABEL`, or `ABOUT_PARAGRAPHS` imports. `content/hero.ts` is gone. `content/about.ts` keeps only the note, label, and facts.

- [ ] **Step 1: Inline the hero deck**

In `components/hero.tsx`, replace the `HERO_DECK.map` with exact text nodes:

```tsx
<p className="hero__deck mx-auto mt-6 max-w-[54ch] text-lead text-copy max-[861px]:max-w-[46ch]">
  {'Human visualizing '}
  <code className="rounded-secondary border border-line-strong bg-panel px-1.5 py-px font-pixel text-ink max-[861px]:text-[18px] max-[861px]:leading-[26.5px]">
    1&amp;0
  </code>
  {' for other humans. Right now I\'m a software engineer on the growth team at '}
  <b className="font-medium text-ink">Atlassian</b>
  {'.'}
</p>
```

Add:

```tsx
// ponytail: "Right now" is editorial. Edit it when the role changes.
```

- [ ] **Step 2: Inline the proof band**

In `components/proof-band.tsx`, remove the `PROOF_BAND` and `PROOF_LABEL` imports. Keep the heading and replace the map with three fixed cells. Preserve the figure, unit, and say text exactly, and keep the existing classes. Do not change the three values.

- [ ] **Step 3: Inline the about paragraphs**

In `components/about.tsx`, replace `ABOUT_PARAGRAPHS.map` with two paragraphs. The first is one text node. The second is:

```tsx
<p>
  {'At Atlassian I work on the authoring and publishing side of the same problem. I like '}
  <span className="em font-medium text-ink">
    the parts nobody notices when they work
  </span>
  {': the mapping that keeps a generated recommendation pointed at the right paragraph, the form that stops you before you submit the wrong thing.'}
</p>
```

Keep the classes on `.about__copy`.

- [ ] **Step 4: Trim and delete content modules**

In `content/about.ts`, delete `ABOUT_PARAGRAPHS` and the `Paragraph` import. Delete `content/hero.ts`.

- [ ] **Step 5: Verify and commit**

Run:

```sh
npm run build
npx playwright test tests/e2e/hero.spec.ts tests/e2e/sections.spec.ts --project=chromium
```

Expected: all pass with the same rendered text. Commit with `refactor: render one-off prose in its component`.

## Task 11: Delete the content type hub and derive icon types

**Files:**
- Delete: `content/types.ts`
- Modify: `content/site.ts`
- Modify: `content/stack.ts`
- Modify: `content/about.ts`
- Modify: `content/work.ts`
- Modify: `components/icons/index.tsx`
- Modify: `components/icons/animated-icon.tsx`
- Modify: `components/work-row.tsx`
- Modify: `scripts/check-artifacts.mjs`

**Interfaces:**
- Consumes: the content shapes after tasks 9 and 10.
- Produces: `IconName = keyof typeof ICONS` and `AnimatedIconName = keyof typeof ANIMATED_ICONS`, both exported from their registries. `content/work.ts` exports `WorkRowData`. No file imports `content/types`.

- [ ] **Step 1: Export derived icon types**

In `components/icons/index.tsx`, after `ICONS`, add:

```ts
export type IconName = keyof typeof ICONS;
```

Change the registry constraint to:

```ts
} satisfies Record<string, Entry>;
```

Remove the `IconName` import. In `components/icons/animated-icon.tsx`, add:

```ts
export type AnimatedIconName = keyof typeof ANIMATED_ICONS;
```

Change the constraint to `satisfies Record<string, AnimatedEntry>`. Remove the old import.

- [ ] **Step 2: Infer the simple content shapes**

In `content/site.ts`, remove the explicit object type and add `as const`. Add `mark: false` to the unmarked name segments and `rel: undefined` to socials without a rel, so every object has the property.

In `content/stack.ts` and `content/about.ts`, remove the type imports and add `as const` to the exported arrays.

- [ ] **Step 3: Keep one local work type**

In `content/work.ts`, add:

```ts
import type { IconName } from '@/components/icons';

export type WorkRowData = {
  org: string;
  city: string;
  icon: IconName;
  title: string;
  dates: string;
  items: { figure?: string; figureLabel?: string; text: string }[];
};

export const WORK_ROWS: WorkRowData[] = [
```

In `components/work-row.tsx`, import `WorkRowData` from `content/work`.

- [ ] **Step 4: Delete the type hub**

Delete `content/types.ts`.

- [ ] **Step 5: Update the artifact gate**

In `scripts/check-artifacts.mjs`, replace the old regex with:

```js
/satisfies\s+Record<\s*string\s*,\s*Entry\s*>/
```

Keep the rest of the icon checks.

- [ ] **Step 6: Verify and commit**

Run:

```sh
node_modules/.bin/tsc --noEmit --incremental false
npm run build
npx playwright test tests/e2e/hero.spec.ts tests/e2e/sections.spec.ts tests/e2e/footer.spec.ts --project=chromium
```

Expected: all pass. Commit with `refactor: delete the content type hub`.

## Task 12: Pin the shared figures and mark the aging copy

**Files:**
- Modify: `tests/e2e/hero.spec.ts`
- Modify: `content/work.ts`
- Modify: `components/hero.tsx`
- Modify: `content/about.ts`

**Interfaces:**
- Consumes: the rendered band and work figures.
- Produces: a test that fails when a band figure no longer appears in the work rows.

- [ ] **Step 1: Add the figure test**

In `tests/e2e/hero.spec.ts`, add:

```ts
function figureValue(figure: string): number {
  const cleaned = figure.replace(/[$,%]/g, '');
  const last = cleaned.at(-1)?.toLowerCase();
  if (last === 'k') return Number(cleaned.slice(0, -1)) * 1_000;
  if (last === 'm') return Number(cleaned.slice(0, -1)) * 1_000_000;
  return Number(cleaned);
}

test('proof figures also appear in the work rows', async ({ page }) => {
  await page.goto('/');
  const band = await page.locator('.band__num').allTextContents();
  const work = await page
    .locator('#work .item__metric b')
    .allTextContents();
  const workValues = work.map(figureValue);

  for (const figure of band) {
    expect(workValues).toContain(figureValue(figure));
  }
});
```

- [ ] **Step 2: Mark the editorial dates**

Add to `content/work.ts` above `WORK_ROWS`:

```ts
// ponytail: "to now" is copy, not a computed date. Edit it when the role
// changes. Upgrade: derive the end date from a start date and a current flag.
```

Add to `content/about.ts` above `ABOUT_FACTS`:

```ts
// ponytail: "since June 2025" is copy. Edit it when the role changes.
```

- [ ] **Step 3: Verify and commit**

Run:

```sh
npm run build
npx playwright test tests/e2e/hero.spec.ts --project=chromium
```

Expected: all pass. Commit with `test: pin the shared proof figures`.

## Task 13: Delete dead UI exports, props, variants, and tokens

**Files:**
- Modify: `components/ui/popover.tsx`
- Modify: `components/primitives/section-head.tsx`
- Modify: `components/skip-link.tsx`
- Modify: `components/ui/button.tsx`
- Modify: `components/icons/index.tsx`
- Modify: `components/icons/animated-icon.tsx`
- Modify: `lib/theme.ts`
- Modify: `components/work-row.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nothing.
- Produces: `Popover` exports only its three used parts. `Button` requires `variant` and `size`. `Icon` and `AnimatedIcon` require `size`. `THEME_KEY` is private. `readStoredTheme` is gone. The unused CSS aliases are gone.

- [ ] **Step 1: Trim the popover**

Delete `PopoverHeader`, `PopoverTitle`, `PopoverDescription`, their type imports, their export lines, and the `alignOffset` prop plumbing. Keep `Popover`, `PopoverTrigger`, and `PopoverContent`.

- [ ] **Step 2: Remove unused props**

In `components/primitives/section-head.tsx`, remove `className` from the props and use the class string directly. Remove the `cn` import. In `components/skip-link.tsx`, remove the props and the `cn` import.

- [ ] **Step 3: Remove the unused button variant and defaults**

In `components/ui/button.tsx`, delete the `fill` variant and `defaultVariants`. Type the component so both props are required:

```ts
type ButtonProps = ButtonPrimitive.Props &
  Required<Pick<VariantProps<typeof buttonVariants>, 'variant' | 'size'>>;
```

Keep the `ghost`, `line`, and `icon` variants and both sizes.

- [ ] **Step 4: Make size required**

In `components/icons/index.tsx` and `components/icons/animated-icon.tsx`, remove the `= 24` default from the `size` prop. Every caller already passes it. If a caller does not, add the size rather than restoring the default.

- [ ] **Step 5: Delete the unused theme helper**

In `lib/theme.ts`, delete `readStoredTheme`. Make `THEME_KEY` a module-local `const` and remove the `export`.

- [ ] **Step 6: Use the existing type token and drop unused aliases**

In `components/work-row.tsx`, replace `text-[22px] leading-[1.25] tracking-normal` with `text-num-inline`. Keep `max-[861px]:text-[20px]`.

In `app/globals.css`, delete `--container-frame`, `--spacing-frame`, and `--spacing-row`. Keep `--frame`, `--row`, `--radius-surface`, and `--text-num-inline`.

- [ ] **Step 7: Verify and commit**

Run:

```sh
node_modules/.bin/tsc --noEmit --incremental false
npm run build
npx playwright test tests/e2e/layout.spec.ts tests/e2e/navigation.spec.ts --project=chromium
```

Expected: all pass. Commit with `refactor: remove unused UI and token aliases`.

## Task 14: Harden the tests

**Files:**
- Modify: `tests/e2e/navigation.spec.ts`
- Modify: `tests/e2e/layout.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/network.spec.ts`

**Interfaces:**
- Consumes: the app after tasks 1 to 13.
- Produces: a menu opacity test that checks the real colour, an overflow suite that also checks content, one copy of each duplicated count, a reduced-motion test over every icon, and no unused favicon exemption.

- [ ] **Step 1: Check the real menu colour**

In `tests/e2e/navigation.spec.ts`, replace the regex assertion with:

```ts
const backgrounds = await page.evaluate(() => {
  const panel = document.querySelector('#site-nav');
  return {
    panel: getComputedStyle(panel).backgroundColor,
    paper: getComputedStyle(document.body).backgroundColor,
  };
});
expect(backgrounds.panel).toBe(backgrounds.paper);
```

- [ ] **Step 2: Make the overflow tests prove content**

In each `layout.spec.ts` overflow test, after `openWithTheme`, add:

```ts
await expect(page.locator('main#main h1')).toBeVisible();
```

- [ ] **Step 3: Delete the duplicated blocks**

Delete the counts test in `layout.spec.ts` (around lines 275 to 299), the footer mask test (around 333 to 352), and the switch size block in the phone test (around 163 to 167). Keep `sections.spec.ts`, `footer.spec.ts`, and `navigation.spec.ts` copies.

- [ ] **Step 4: Cover every animated icon under reduced motion**

Open the page in dark mode so both the stack gear and the theme sun render:

```ts
await openWithTheme(page, 'dark', 1440, HEIGHT);
```

Replace the `.first()` wrapper with all wrappers:

```ts
const wrappers = page.locator('[data-slot="icon"][data-reduced-motion]');
const count = await wrappers.count();
expect(count).toBeGreaterThan(0);

for (let index = 0; index < count; index += 1) {
  const wrapper = wrappers.nth(index);
  await expect(wrapper).toHaveAttribute('data-reduced-motion', 'true');
  const image = wrapper.locator('img').first();
  const before = await image.getAttribute('src');
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
  await page.waitForTimeout(600);
  expect(await image.getAttribute('src')).toBe(before);
}
```

- [ ] **Step 5: Remove the favicon exemption**

In `tests/e2e/network.spec.ts`, delete the `FAVICON` constant and both exemptions. Run the test. If Chromium requests `/favicon.ico` and gets a 404, add `app/favicon.ico` and keep the test strict. Do not restore the exemption.

- [ ] **Step 6: Shrink the alpha parser**

In `tests/e2e/layout.spec.ts`, replace the 27 line `alphaOf` with:

```ts
function alphaOf(color: string): number {
  const value = color.trim().toLowerCase();
  if (value === 'transparent') return 0;
  const modern = value.match(/\/\s*([0-9.]+)(%)?\s*\)$/);
  if (modern) return modern[2] ? Number(modern[1]) / 100 : Number(modern[1]);
  const parts = value.match(/^rgba?\(([^)]+)\)$/)?.[1].split(',');
  return parts?.length === 4 ? Number(parts[3]) : 1;
}
```

- [ ] **Step 7: Verify and commit**

Run:

```sh
npm run build
npx playwright test tests/e2e/navigation.spec.ts tests/e2e/layout.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/network.spec.ts --project=chromium
```

Expected: all pass. Commit with `test: make the acceptance suite prove the UI`.

## Task 15: Keep one runtime rect count

**Files:**
- Modify: `scripts/check-artifacts.mjs`
- Modify: `tests/e2e/footer.spec.ts`
- Modify: `README.md`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: the generated art.
- Produces: `sync-art.mjs` keeps the generation guard, the browser suite checks 76 and 187 rendered rects, and `check-artifacts.mjs` no longer duplicates the counts.

- [ ] **Step 1: Remove the duplicate count from the artifact check**

In `scripts/check-artifacts.mjs`, delete `countRects`, the 76 check, and the 187 check. Keep the file existence, no `<svg>`, no remote reference, no sprite, allowed import, and favicon checks.

- [ ] **Step 2: Add the nav mark count to the browser suite**

In `tests/e2e/footer.spec.ts`, add:

```ts
test('nav mark: 76 rects', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('svg.brand__mark rect')).toHaveCount(76);
});
```

Keep the footer scene count at 187.

- [ ] **Step 3: Update the docs**

Change the README and AGENTS descriptions of the artifact check so they no longer claim 76 and 187 are checked there.

- [ ] **Step 4: Verify and commit**

Run:

```sh
node scripts/check-artifacts.mjs
npm run build
npx playwright test tests/e2e/footer.spec.ts --project=chromium
```

Expected: all pass. Commit with `test: keep one runtime rect count`.

## Task 16: Record the decisions in the docs

**Files:**
- Modify: `AGENTS.md`
- Modify: `README.md`
- Modify: `PORTING.md`

**Interfaces:**
- Consumes: all earlier tasks.
- Produces: docs that match the code.

- [ ] **Step 1: Update the content rule in AGENTS**

Change the "Where to change what" row for copy. State that repeated structured copy lives in `content/`, and prose rendered once lives in the component. Update the tree row for `content/` and the note that content is always typed modules.

- [ ] **Step 2: Update the gate description**

Remove the 76 and 187 claims from the `check-artifacts` description. State that the dark ramps are checked and that `check` stops at the first failure. Update the single-file test command.

- [ ] **Step 3: Update the README**

Remove `lucide-react` from the stack table and the note that it is unused. Remove `tw-animate-css` if listed. Add the Node 22 engine floor, the three browser suites in CI, the `PORT` override, the build-time clock and year ceilings, and the content split.

- [ ] **Step 4: Update PORTING**

Record the new decisions: the neutral theme control before paint, the reduced-motion CSS block, the build-time clock and footer year, the content split, and the derived icon types. Keep the existing port contract sections.

- [ ] **Step 5: Verify and commit**

Run:

```sh
npm run lint:design
node_modules/.bin/biome check
```

Expected: both pass. Commit with `docs: record the audit decisions`.

## Task 17: Run the full gate

**Files:** none. Do not change code in this task.

- [ ] **Step 1: Run the gate**

```sh
npm run check
```

Expected: lint, build, typecheck, tokens, artifacts, and Chromium all pass.

- [ ] **Step 2: Run the extra browsers**

```sh
npm run test:browsers
```

Expected: Firefox and WebKit pass.

- [ ] **Step 3: Confirm the working tree**

```sh
git status --short
```

Expected: only intended files are modified, and `out/`, `.next/`, and test reports are not tracked.

- [ ] **Step 4: Commit any final fixes**

If a task left a small failure, fix it in the owning task and re-run both commands. Do not commit a red tree.
