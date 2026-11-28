# Icon Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Delete the icon registries and the animated wrapper, import Pixelarticons and Pxlkit icons where they render, and keep one base SVG shell for custom art.

**Architecture:** Each section imports its own glyphs from `pixelarticons/react` or the `@pxlkit/*` package that publishes them. Static Pxlkit icons use `PxlKitIcon` (its `useMemo` is supported in Server Components); animated icons use `AnimatedPxlKitIcon` inside the two client modules that already exist or need one. `components/icons/index.tsx` ends as a thin SVG shell used only by the generated nav mark and footer scene.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, Tailwind v4, Pxlkit 1.4, Pixelarticons 2.4, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-27-icon-simplification.md`

## Global Constraints

- No new dependencies. Do not add `lucide-react`, `react-icons`, or any icon package.
- Zero external requests at runtime. Icons are package data or local SVG, never a remote URL.
- Keep the prototype class names on rendered elements (`row`, `item__metric`, `brand__mark`, `foot__decor`, and the rest).
- Every interactive target stays 44 by 44 or larger.
- Pixel type stays at 18px or above, weight 400 or below, and no negative tracking.
- Do not add `dark:` utilities for design-critical styling; the token ramp owns colour.
- Do not edit `MANIFEST.txt`, `DESIGN.md` values, or the generated `nav-mark-markup.ts` / `footer-markup.ts`.
- `npm run check` is the gate. Playwright serves `out/`, so build before a targeted test run.
- Node 22 or newer.

## Review Focus

- A section icon disappears or renders twice after migration. Expected: every section still shows exactly the icons it showed before. Covered by the footer, hero, sections, and layout suites.
- An icon becomes announced to assistive technology. Expected: every icon is `aria-hidden` or has an empty `alt`. Covered by `expectIconsHidden` in `layout.spec.ts`.
- Reduced motion no longer pauses the gear or the sun. Expected: the frame `src` holds for at least 600ms. Covered by the reduced-motion test in `accessibility.spec.ts`.
- A Pxlkit icon becomes a broken or remote image. Expected: a data-URI `<img>` with authored palette. Covered by the artifact check and the build.
- A server component calls an animated Pxlkit hook. Expected: the build fails before ship. Covered by `npm run build` in every targeted test run.

---

### Task 1: Add the base SVG shell and put custom art on it

**Files:**
- Create: `components/icons/base.tsx`
- Modify: `components/icons/nav-mark.tsx`
- Modify: `components/icons/footer-scene.tsx`
- Test: `tests/e2e/footer.spec.ts` (existing 76 and 187 rect assertions), `tests/e2e/accessibility.spec.ts` (print hiding)

**Interfaces:**
- Produces: `BaseIcon(props: SVGProps<SVGSVGElement>): JSX.Element`, which renders an `<svg>` with `shapeRendering="crispEdges"`, `aria-hidden="true"`, `focusable="false"`, and `data-slot="icon"`, then spreads `props`.
- Consumes: the generated `NAV_MARK_MARKUP` and `FOOTER_MARKUP` strings.

- [ ] **Step 1: Confirm the custom art baseline**

Run: `npm run build && npx playwright test tests/e2e/footer.spec.ts tests/e2e/accessibility.spec.ts --project=chromium`

Expected: PASS. The nav mark renders 76 rects and the footer scene 187.

- [ ] **Step 2: Create `components/icons/base.tsx`**

```tsx
import type { SVGProps } from 'react';

export function BaseIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			shapeRendering="crispEdges"
			aria-hidden="true"
			focusable="false"
			data-slot="icon"
			{...props}
		/>
	);
}
```

- [ ] **Step 3: Render the nav mark through `BaseIcon`**

Replace the `<svg>` in `nav-mark.tsx` with `<BaseIcon className="brand__mark" width={16} height={16} viewBox="0 0 16 16" dangerouslySetInnerHTML={{ __html: NAV_MARK_MARKUP }} />`. Keep the existing comment.

- [ ] **Step 4: Render the footer scene through `BaseIcon`**

Replace the `<svg>` in `footer-scene.tsx` with `<BaseIcon className="foot__decor print:hidden" width={1144} height={128} viewBox="0 0 1144 128" preserveAspectRatio="xMaxYMax slice" dangerouslySetInnerHTML={{ __html: FOOTER_MARKUP }} />`. Keep the existing comment.

- [ ] **Step 5: Run the tests**

Run: `npm run build && npx playwright test tests/e2e/footer.spec.ts tests/e2e/accessibility.spec.ts --project=chromium`

Expected: PASS. Rendered output is unchanged.

- [ ] **Step 6: Commit**

```bash
git add components/icons/base.tsx components/icons/nav-mark.tsx components/icons/footer-scene.tsx
git commit -m "refactor: give custom icon art a base svg shell"
```

---

### Task 2: Move animated icons to `AnimatedPxlKitIcon` and delete the wrapper

**Files:**
- Modify: `components/theme-toggle.tsx`
- Modify: `components/stack.tsx`
- Modify: `tests/e2e/theme.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts:206-260`
- Delete: `components/icons/animated-icon.tsx`

**Interfaces:**
- Consumes: `AnimatedPxlKitIcon({ icon, size, decorative, playing })` from `@pxlkit/core`; `PulsingSun` from `@pxlkit/weather`; `SpinningGear` from `@pxlkit/ui`; `Moon` from `@pxlkit/weather`; `useReducedMotion(): boolean` from `@/hooks/use-reduced-motion`.
- Produces: `ThemeToggle`, `ThemeSwitch`, and `Stack` call `useReducedMotion` themselves. `components/stack.tsx` is a client module.

- [ ] **Step 1: Update the theme test to the new markup**

In `tests/e2e/theme.spec.ts`, replace the desktop block:

```ts
const animated = toggle.locator('div:has(> img)');
await expect(animated).toHaveCount(0);
await expect(toggle.locator('img')).toHaveCount(1);
```

and after `toggle.click()`:

```ts
await expect(toggle.locator('div:has(> img)')).toHaveCount(1);
await expect(toggle.locator('img')).toHaveCount(1);
await expect(toggle.locator('span[data-slot="icon"]')).toHaveCount(0);
```

In the mobile test, replace the locators with:

```ts
const animated = panel.locator('div:has(> img)');
const icons = panel.locator('img');
```

Assert `icons` has count 1 in both states, `animated` 0 in light and 1 in dark, and
`panel.locator('span[data-slot="icon"]')` has count 0 in both states.

- [ ] **Step 2: Update the reduced-motion test**

In `tests/e2e/accessibility.spec.ts`, replace the wrapper locator and the `data-reduced-motion` assertion with:

```ts
const wrappers = page.locator('div:has(> img)');
const count = await wrappers.count();

expect(count).toBe(2);

for (let index = 0; index < count; index += 1) {
	const wrapper = wrappers.nth(index);
	const image = wrapper.locator('img').first();
	const before = await image.getAttribute('src');

	expect(before).toBeTruthy();

	await page.waitForTimeout(600);

	expect(await image.getAttribute('src')).toBe(before);
}

await expect(page.locator('[data-reduced-motion]')).toHaveCount(0);
```

Keep the transition-duration assertions that follow.

- [ ] **Step 3: Run the tests to see the old wrapper fail**

Run: `npm run build && npx playwright test tests/e2e/theme.spec.ts tests/e2e/accessibility.spec.ts --project=chromium`

Expected: FAIL. The old `AnimatedIcon` renders a `span[data-slot="icon"]` with `data-reduced-motion`, so the new zero-count assertions fail even though `div:has(> img)` already matches its inner Pxlkit wrapper.

- [ ] **Step 4: Implement the theme icons**

In `components/theme-toggle.tsx`, import `AnimatedPxlKitIcon`, `PxlKitIcon` from `@pxlkit/core`, `{ Moon, PulsingSun }` from `@pxlkit/weather`, and `useReducedMotion`. Call `const reduced = useReducedMotion();` in both `ThemeToggle` and `ThemeSwitch`. Replace both branches with:

```tsx
{dark ? (
	<AnimatedPxlKitIcon
		icon={PulsingSun}
		size={24}
		decorative
		playing={!reduced}
	/>
) : (
	<PxlKitIcon icon={Moon} size={24} decorative />
)}
```

Remove the `Icon` and `AnimatedIcon` imports.

- [ ] **Step 5: Implement the stack gear**

Add `'use client';` to the top of `components/stack.tsx`. Import `AnimatedPxlKitIcon` from `@pxlkit/core`, `SpinningGear` from `@pxlkit/ui`, and `useReducedMotion`. Inside `Stack`, call `const reduced = useReducedMotion();` and replace the section-head icon with:

```tsx
icon={
	<AnimatedPxlKitIcon
		icon={SpinningGear}
		size={24}
		decorative
		playing={!reduced}
	/>
}
```

Leave the group icons on the old `Icon` for now; Task 3 replaces them.

- [ ] **Step 6: Delete the animated wrapper and verify no import remains**

```bash
rm components/icons/animated-icon.tsx
grep -rn "animated-icon\|AnimatedIconName" components app tests || true
```

Expected: no output from `grep`.

- [ ] **Step 7: Run the tests**

Run: `npm run lint && npm run typecheck && npm run build && npx playwright test tests/e2e/theme.spec.ts tests/e2e/accessibility.spec.ts --project=chromium`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add components/theme-toggle.tsx components/stack.tsx tests/e2e/theme.spec.ts tests/e2e/accessibility.spec.ts
git rm components/icons/animated-icon.tsx
git commit -m "refactor: drive animated icons from the pxlkit component"
```

---

### Task 3: Import static icons directly in the server sections

**Files:**
- Modify: `content/site.ts`
- Modify: `content/stack.ts`
- Modify: `components/hero.tsx`
- Modify: `components/proof-band.tsx`
- Modify: `components/about.tsx`
- Modify: `components/footer.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/stack.tsx`
- Modify: `tests/e2e/hero.spec.ts:68`
- Modify: `tests/e2e/layout.spec.ts:77-89`

**Interfaces:**
- Consumes: `PxlKitIcon` from `@pxlkit/core`; `Compass` from `@pxlkit/weather`; `Arrow`, `Heart`, `XpBar` from `@pxlkit/gamification`; `Friends` from `@pxlkit/social`; `Robot`, `Grid`, `CloudSync` from `@pxlkit/ui`; `Close`, `GithubSolid`, `Linkedin`, `MailSharp`, `Menu` from `pixelarticons/react`; `PxlKitData` type from `@pxlkit/core`.
- Produces: `SITE.socials[].icon` and `STACK_GROUPS[].icon` are icon references, not strings.

- [ ] **Step 1: Update the hero and layout selectors**

In `tests/e2e/hero.spec.ts` line 68, replace the `[data-slot="icon"]` assertion with:

```ts
await expect(action.locator('img')).toHaveCount(1);
```

In `tests/e2e/layout.spec.ts`, replace `expectIconsHidden` with:

```ts
async function expectIconsHidden(page: Page) {
	const icons = await page
		.locator('svg, img')
		.evaluateAll((nodes) =>
			nodes.map((node) =>
				node.tagName === 'IMG'
					? {
							hidden:
								node.getAttribute('alt') === ''
									? 'true'
									: 'false',
						}
					: { hidden: node.getAttribute('aria-hidden') }
			)
		);

	expect(icons.length).toBeGreaterThan(0);
	expect(icons.filter((icon) => icon.hidden !== 'true')).toEqual([]);
}
```

- [ ] **Step 2: Confirm the selectors survive the current markup**

Run: `npm run build && npx playwright test tests/e2e/hero.spec.ts tests/e2e/layout.spec.ts --project=chromium`

Expected: PASS. These are compatibility assertions, not new behaviour.

- [ ] **Step 3: Put the component references in the content modules**

In `content/site.ts`, import `{ GithubSolid, Linkedin, MailSharp } from 'pixelarticons/react'` and replace each `icon: 'github' | 'linkedin' | 'mail'` with `icon: GithubSolid`, `icon: Linkedin`, `icon: MailSharp`.

In `content/stack.ts`, import `{ CloudSync, Grid } from '@pxlkit/ui'`, then replace `icon: 'frontend'` with `icon: Grid` and `icon: 'backend'` with `icon: CloudSync`. No annotation is needed; both values are already `PxlKitData`.

- [ ] **Step 4: Replace the server-section icons**

Use these call shapes. Define a local `ICON_PROPS` object in files with more than one Pixelarticons glyph:

```tsx
const ICON_PROPS = {
	width: 24,
	height: 24,
	shapeRendering: 'crispEdges',
	'aria-hidden': 'true',
	focusable: 'false',
	'data-slot': 'icon',
} as const;
```

- `hero.tsx`: `<PxlKitIcon icon={Compass} size={24} decorative />` for the eyebrow; `<PxlKitIcon icon={Arrow} size={24} decorative />` for the work link; in the socials loop, `const Glyph = social.icon;` and `<Glyph {...ICON_PROPS} />`.
- `proof-band.tsx`: `<PxlKitIcon icon={XpBar} size={24} decorative />`.
- `about.tsx`: `<PxlKitIcon icon={Friends} size={24} decorative />`.
- `footer.tsx`: `<PxlKitIcon icon={Heart} size={16} decorative className={INLINE_ICON} />`, the same shape with `icon={User}` from `@pxlkit/social` and `icon={Robot}` from `@pxlkit/ui`.
- `site-header.tsx`: `<Close {...ICON_PROPS} />` and `<Menu {...ICON_PROPS} />`.
- `stack.tsx`: `<PxlKitIcon icon={group.icon} size={24} decorative />` and the animated gear from Task 2.

Remove every `import { Icon } from '@/components/icons'` in these files and every `name=` prop.

- [ ] **Step 5: Run the tests**

Run: `npm run lint && npm run typecheck && npm run build && npx playwright test tests/e2e/hero.spec.ts tests/e2e/layout.spec.ts tests/e2e/sections.spec.ts tests/e2e/footer.spec.ts --project=chromium`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add content/site.ts content/stack.ts components/hero.tsx components/proof-band.tsx components/about.tsx components/footer.tsx components/site-header.tsx components/stack.tsx tests/e2e/hero.spec.ts tests/e2e/layout.spec.ts
git commit -m "refactor: import static icons where they render"
```

---

### Task 4: Store work icons as components

**Files:**
- Modify: `content/work.ts`
- Modify: `components/work-row.tsx`
- Modify: `components/work.tsx`
- Test: `tests/e2e/sections.spec.ts` (existing row and item assertions)

**Interfaces:**
- Produces: `WorkRowData.icon: ComponentType<SVGProps<SVGSVGElement>>`.
- Consumes: `Blocks`, `Building`, `CreditCard`, `Globe`, `ShoppingCart` from `pixelarticons/react`; `Briefcase` for the section head.

- [ ] **Step 1: Confirm the work baseline**

Run: `npm run build && npx playwright test tests/e2e/sections.spec.ts --project=chromium`

Expected: PASS. Five rows, sixteen items.

- [ ] **Step 2: Change the work data type and values**

In `content/work.ts`, remove the `IconName` import. Import `type { ComponentType, SVGProps } from 'react'` and the five Pixelarticons components. Change `icon: IconName` to `icon: ComponentType<SVGProps<SVGSVGElement>>`. Set `icon: Blocks` (Atlassian), `icon: ShoppingCart` (Walmart), `icon: CreditCard` (Synchrony), `icon: Globe` (Meta), `icon: Building` (Edgewell).

- [ ] **Step 3: Render the row glyph directly**

In `components/work-row.tsx`, define the same local constant as Task 3:

```tsx
const ICON_PROPS = {
	width: 24,
	height: 24,
	shapeRendering: 'crispEdges',
	'aria-hidden': 'true',
	focusable: 'false',
	'data-slot': 'icon',
} as const;
```

Inside `WorkRow`, add `const Glyph = row.icon;` and replace the title `<Icon name={row.icon} ... />` with `<Glyph {...ICON_PROPS} className="mt-px shrink-0 text-copy" />`. Remove the `Icon` import.

- [ ] **Step 4: Render the work section head directly**

In `components/work.tsx`, import `Briefcase` from `pixelarticons/react`, define the same local `ICON_PROPS` constant, and replace the section-head icon with `<Briefcase {...ICON_PROPS} className="text-subtle" />`. Remove the `Icon` import.

- [ ] **Step 5: Run the tests**

Run: `npm run lint && npm run typecheck && npm run build && npx playwright test tests/e2e/sections.spec.ts --project=chromium`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add content/work.ts components/work-row.tsx components/work.tsx
git commit -m "refactor: carry work icons as components"
```

---

### Task 5: Remove the registry and update the artifact gate

**Files:**
- Modify: `components/icons/index.tsx` (replace the registry with the base shell)
- Delete: `components/icons/base.tsx`
- Modify: `components/icons/nav-mark.tsx`
- Modify: `components/icons/footer-scene.tsx`
- Modify: `scripts/check-artifacts.mjs`
- Test: `scripts/check-artifacts.mjs` via `npm run check`

**Interfaces:**
- Produces: `Icon(props: SVGProps<SVGSVGElement>): JSX.Element` from `@/components/icons`, the same shell Task 1 created as `BaseIcon`.
- Consumes: nothing.

- [ ] **Step 1: Replace the registry with the shell**

Overwrite `components/icons/index.tsx` with:

```tsx
import type { SVGProps } from 'react';

export function Icon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			shapeRendering="crispEdges"
			aria-hidden="true"
			focusable="false"
			data-slot="icon"
			{...props}
		/>
	);
}
```

- [ ] **Step 2: Point the custom art at the shell and delete the temporary module**

In `nav-mark.tsx` and `footer-scene.tsx`, change `import { BaseIcon } from '@/components/icons/base'` to `import { Icon } from '@/components/icons'` and rename the JSX element. Then:

```bash
rm components/icons/base.tsx
grep -rnE "BaseIcon|IconName|ICONS" components content app tests || true
```

Expected: no output.

- [ ] **Step 3: Update the artifact gate**

In `scripts/check-artifacts.mjs`:

- Remove the `ANIMATED` constant and every `ANIMATED` reference.
- Remove the `allowedModules` set and the loop that checks imports in `[REGISTRY, ANIMATED]`.
- Add a recursive source scan and a disallowed-package check:

```js
const DISALLOWED_ICON_MODULES =
	/^(?:lucide-react|react-icons(?:\/.*)?|@heroicons\/.*|@tabler\/icons.*|@phosphor-icons\/.*|@radix-ui\/react-icons)$/;

function sourceFiles(dir) {
	const absolute = join(root, dir);
	if (!existsSync(absolute)) {
		return [];
	}

	return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
		const relative = join(dir, entry.name);

		if (entry.isDirectory()) {
			return sourceFiles(relative);
		}

		return /\.(ts|tsx)$/.test(entry.name) ? [relative] : [];
	});
}

for (const file of [...sourceFiles('components'), ...sourceFiles('content')]) {
	const source = read(file);

	if (source === null) {
		continue;
	}

	for (const moduleName of importsIn(source)) {
		check(
			!DISALLOWED_ICON_MODULES.test(moduleName),
			`${file} does not import ${moduleName}`
		);
	}
}
```

- Keep the `[REGISTRY, ...ART_WRAPPERS]` no-`rect`/no-`path` check, now without `ANIMATED`.

- [ ] **Step 4: Run the full gate**

Run: `npm run check`

Expected: PASS. Lint, build, typecheck, tokens, artifacts, and Chromium all succeed.

- [ ] **Step 5: Commit**

```bash
git add components/icons/index.tsx components/icons/nav-mark.tsx components/icons/footer-scene.tsx scripts/check-artifacts.mjs
git rm components/icons/base.tsx
git commit -m "refactor: collapse the icon registry into the base shell"
```

---

### Task 6: Update the documentation to match

**Files:**
- Modify: `AGENTS.md`
- Modify: `PORTING.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: the final code shape from Tasks 1-5.
- Produces: documentation only.

- [ ] **Step 1: Update `AGENTS.md`**

- Line 25: change "except the header, theme control, clock, and reduced-motion hook" to "except the header, theme control, stack, clock, and reduced-motion hook".
- Line 50: change the `components/icons/` row to "base icon shell, generated nav mark and footer scene, and the library glyphs imported at their call sites".
- Line 139: change the icon row to "import it from `pixelarticons/react` or the `@pxlkit/*` package in the component that renders it; `components/icons/index.tsx` is only the shell for custom SVG".
- Line 184: change "Replace any Lucide import with `components/icons`" to "Replace any Lucide import with a glyph from `pixelarticons/react` or `@pxlkit/*`".

- [ ] **Step 2: Update `PORTING.md`**

Replace the "Icon names derive from the registries" bullet with a direct-import rule: each section imports its glyphs from the publishing package, `PxlKitIcon` handles static Pxlkit data, `AnimatedPxlKitIcon` plus `useReducedMotion` handles animation, and `components/icons/index.tsx` is the shell for custom SVG.

Replace the reduced-motion bullet's "`useReducedMotion` also holds the animated icon on its first frame" with "The theme control and the stack section call `useReducedMotion` and pass `playing={!reduced}` to `AnimatedPxlKitIcon`, so the gear and sun hold their first frame."

- [ ] **Step 3: Update `README.md`**

- Line 31: change "replace its imports with `components/icons`" to "replace its imports with glyphs from `pixelarticons/react` or `@pxlkit/*`".
- Line 170: change the `components/` row to "sections plus `ui/` primitives, the `icons/` base shell and inline art, and `primitives/`".

- [ ] **Step 4: Run the gate one last time**

Run: `npm run check`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md PORTING.md README.md
git commit -m "docs: describe the direct icon imports"
```
