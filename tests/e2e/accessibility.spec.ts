import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';
import { openAt, openWithTheme, pressTab } from './helpers';

const HEIGHT = 900;

const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

// @axe-core/playwright 4.14 pulls its own playwright-core copy for types while
// the runner is pinned to 1.64. The runtime object is the same page; only the
// nominal type differs, so bridge it once here.
type AxePage = ConstructorParameters<typeof AxeBuilder>[0]['page'];

/** Fail on the violations that make the page unusable, not on polish. */
async function expectNoSeriousViolations(page: Page) {
	const results = await new AxeBuilder({
		page: page as unknown as AxePage,
	})
		.withTags(AXE_TAGS)
		// Base UI's popover renders an empty focus sentinel with tabindex="0" and
		// aria-hidden="true" so a screen reader's virtual cursor can be caught.
		// It is library plumbing, not page content, and axe's known false positive
		// on focus guards would otherwise mask the menu's real audit.
		.exclude('[data-base-ui-focus-guard]')
		.analyze();
	const blocking = results.violations.filter(
		(violation) =>
			violation.impact === 'serious' || violation.impact === 'critical'
	);
	const report = blocking
		.map(
			(violation) =>
				`${violation.id} [${violation.impact}] ${violation.help}\n${violation.nodes
					.map((node) => `  ${node.target.join(' ')}`)
					.join('\n')}`
		)
		.join('\n\n');

	expect(blocking, report).toEqual([]);
}

test('axe: no serious or critical WCAG A/AA violations in light', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);
	await expectNoSeriousViolations(page);
});

test('axe: no serious or critical WCAG A/AA violations in dark', async ({
	page,
}) => {
	await openWithTheme(page, 'dark', 1440, HEIGHT);
	await expectNoSeriousViolations(page);
});

test('axe: no serious or critical violations with the menu open', async ({
	page,
}) => {
	await openAt(page, 390, 844);
	await page.locator('button.menu-btn').click();
	await expect(page.locator('#site-nav')).toBeVisible();
	await expectNoSeriousViolations(page);
});

test('skip link: first focusable, Tab reaches it, Enter focuses main', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);

	const first = await page.evaluate(() => {
		const focusable = Array.from(
			document.querySelectorAll<HTMLElement>(
				'a[href], button, [tabindex]'
			)
		).filter(
			(element) =>
				element.tabIndex >= 0 &&
				getComputedStyle(element).display !== 'none'
		);

		return focusable[0]?.matches('a.skip') ?? false;
	});

	expect(first).toBe(true);

	await pressTab(page);
	await expect(page.locator('a.skip')).toBeFocused();

	await page.keyboard.press('Enter');
	await expect(page.locator('main#main')).toBeFocused();
});

test('headings: one h1, the section h2s, the work h3s and the labels', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);

	await expect(page.locator('h1')).toHaveCount(1);
	await expect(page.locator('h1')).toHaveText('Vanouphon Sirisouk.');
	await expect(page.locator('h2')).toHaveText([
		'Cooler parts of my experience',
		'About',
		'Stack',
		'Work',
	]);
	await expect(page.locator('#work h3')).toHaveText([
		'Software Engineer II, Growth',
		'Software Engineer, Merchant Tools',
		'Software Engineer, Account Services',
		'Software Engineer Intern, AI T&C',
		'System Engineer Intern',
	]);

	const labels = await page
		.locator('section[aria-labelledby]')
		.evaluateAll((sections) =>
			sections.map((section) => {
				const id = section.getAttribute('aria-labelledby') ?? '';
				const heading = document.getElementById(id);

				return {
					section: section.id,
					labelledby: id,
					heading: heading?.textContent?.trim() ?? null,
				};
			})
		);

	expect(labels).toEqual([
		{
			section: '',
			labelledby: 'hero-title',
			heading: 'Vanouphon Sirisouk.',
		},
		{ section: 'about', labelledby: 'about-title', heading: 'About' },
		{ section: 'stack', labelledby: 'stack-title', heading: 'Stack' },
		{ section: 'work', labelledby: 'work-title', heading: 'Work' },
	]);
});

test('landmarks: one header, one main, one footer, and the Elsewhere group', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);

	await expect(page.locator('header')).toHaveCount(1);
	await expect(page.locator('main')).toHaveCount(1);
	await expect(page.locator('footer')).toHaveCount(1);

	const group = page.getByRole('group', { name: 'Elsewhere' });

	await expect(group).toHaveCount(1);
	await expect(group.getByRole('link')).toHaveCount(3);

	for (const name of ['GitHub', 'LinkedIn', 'Email']) {
		await expect(group.getByRole('link', { name })).toHaveCount(1);
	}
});

test('state: the theme button, the mobile switch and the menu trigger', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);

	const toggle = page.locator(
		'button[data-theme-toggle][aria-pressed]:visible'
	);

	await expect(toggle).toHaveAttribute('aria-pressed', 'false');
	await expect(toggle).toHaveAccessibleName('Switch to dark theme');

	await page.setViewportSize({ width: 390, height: 844 });

	const trigger = page.locator('button.menu-btn');

	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	await expect(trigger).toHaveAccessibleName('Open menu');

	await trigger.click();
	await expect(trigger).toHaveAttribute('aria-expanded', 'true');
	await expect(trigger).toHaveAccessibleName('Close menu');

	const switchControl = page.locator('#site-nav [role="switch"]');

	await expect(switchControl).toHaveAttribute('aria-checked', 'false');
	await expect(switchControl).toHaveAccessibleName('Dark mode');

	await switchControl.click();
	await expect(switchControl).toHaveAttribute('aria-checked', 'true');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('print: the island, hero actions and scene are dropped, text kept', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);

	await page.emulateMedia({ media: 'print' });

	await expect(page.locator('header.top')).toBeHidden();
	await expect(page.locator('.hero__actions')).toBeHidden();
	await expect(page.locator('svg.foot__decor')).toBeHidden();
	await expect(page.locator('main#main')).toBeVisible();
});

test('reduced motion: the animated icon holds its first frame and durations collapse', async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	// Dark mode renders both animated wrappers: the stack gear and the sun.
	await openWithTheme(page, 'dark', 1440, HEIGHT);

	const wrappers = page.locator('[data-slot="icon"][data-reduced-motion]');
	const count = await wrappers.count();

	expect(count).toBeGreaterThan(0);

	for (let index = 0; index < count; index += 1) {
		const wrapper = wrappers.nth(index);
		await expect(wrapper).toHaveAttribute('data-reduced-motion', 'true');

		const image = wrapper.locator('img').first();
		const before = await image.getAttribute('src');

		expect(before).toBeTruthy();

		await page.evaluate(
			() =>
				new Promise((resolve) =>
					requestAnimationFrame(() => requestAnimationFrame(resolve))
				)
		);
		await page.waitForTimeout(600);

		expect(await image.getAttribute('src')).toBe(before);
	}

	const durations = await page.evaluate(() => {
		const button = document.querySelector('.btn');
		const bar = document.querySelector('.bar');
		if (!(button instanceof HTMLElement) || !(bar instanceof HTMLElement)) {
			throw new Error(
				'reduced motion: expected .btn and .bar in the document'
			);
		}

		return {
			button: getComputedStyle(button).transitionDuration,
			bar: getComputedStyle(bar).transitionDuration,
		};
	});

	for (const value of Object.values(durations)) {
		const parts = value.split(',').map((part) => parseFloat(part));
		expect(parts.every((part) => part < 0.001)).toBe(true);
	}
});
