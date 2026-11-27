import { expect, test } from '@playwright/test';

const DESKTOP_TOGGLE = 'button[data-theme-toggle][aria-pressed]:visible';

test.describe('theme', () => {
	test('desktop toggle starts light and persists dark across a reload', async ({
		page,
	}) => {
		await page.goto('/');

		const toggle = page.locator(DESKTOP_TOGGLE);

		await expect(toggle).toHaveCount(1);
		await expect(toggle).toHaveAttribute('aria-pressed', 'false');
		await expect(toggle).toHaveAttribute(
			'aria-label',
			'Switch to dark theme'
		);
		await expect(page.locator('html')).not.toHaveAttribute(
			'data-theme',
			'dark'
		);

		await toggle.click();

		await expect(page.locator('html')).toHaveAttribute(
			'data-theme',
			'dark'
		);
		await expect(toggle).toHaveAttribute('aria-pressed', 'true');
		await expect(toggle).toHaveAttribute(
			'aria-label',
			'Switch to light theme'
		);

		const stored = await page.evaluate(() =>
			localStorage.getItem('vs-theme')
		);
		expect(stored).toBe('dark');

		await page.reload();

		await expect(page.locator('html')).toHaveAttribute(
			'data-theme',
			'dark'
		);
		await expect(page.locator(DESKTOP_TOGGLE)).toHaveAttribute(
			'aria-pressed',
			'true'
		);
	});

	test('mobile switch reports role switch and aria-checked', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/');

		await page.locator('button.menu-btn').click();

		const panel = page.locator('#site-nav');
		await expect(panel).toBeVisible();

		const control = panel.locator('[role="switch"]:visible');
		await expect(control).toHaveCount(1);
		await expect(control).toHaveAttribute('aria-checked', 'false');

		await control.click();

		await expect(page.locator('html')).toHaveAttribute(
			'data-theme',
			'dark'
		);
		await expect(control).toHaveAttribute('aria-checked', 'true');

		const stored = await page.evaluate(() =>
			localStorage.getItem('vs-theme')
		);
		expect(stored).toBe('dark');
	});

	test('a dark OS with an explicit light choice stays light', async ({
		page,
	}) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.addInitScript(() => {
			localStorage.setItem('vs-theme', 'light');
		});

		await page.goto('/');

		await expect(page.locator('html')).toHaveAttribute(
			'data-theme',
			'light'
		);

		const toggle = page.locator(DESKTOP_TOGGLE);
		await expect(toggle).toHaveAttribute('aria-pressed', 'false');
		await expect(toggle).toHaveAttribute(
			'aria-label',
			'Switch to dark theme'
		);

		const paper = await page.evaluate(
			() => getComputedStyle(document.body).backgroundColor
		);
		expect(paper).toBe('rgb(255, 255, 255)');
	});

	test('an OS change applies while no explicit choice exists', async ({
		page,
	}) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto('/');

		const toggle = page.locator(DESKTOP_TOGGLE);
		await expect(toggle).toHaveAttribute('aria-pressed', 'false');

		await page.emulateMedia({ colorScheme: 'dark' });

		await expect(toggle).toHaveAttribute('aria-pressed', 'true');
		await expect(toggle).toHaveAttribute(
			'aria-label',
			'Switch to light theme'
		);

		const paper = await page.evaluate(
			() => getComputedStyle(document.body).backgroundColor
		);
		expect(paper).toBe('rgb(16, 17, 20)');
		await expect(page.locator('html')).not.toHaveAttribute(
			'data-theme',
			'dark'
		);
	});

	test('storage that throws raises no page error', async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));

		await page.addInitScript(() => {
			const proto = Object.getPrototypeOf(window.localStorage);
			proto.getItem = () => {
				throw new Error('storage is blocked');
			};
			proto.setItem = () => {
				throw new Error('storage is blocked');
			};
		});

		await page.goto('/');
		await expect(page.locator('header.top')).toBeVisible();

		const toggle = page.locator(DESKTOP_TOGGLE);
		await expect(toggle).toHaveAttribute('aria-pressed', 'false');

		await toggle.click();
		await expect(page.locator('html')).toHaveAttribute(
			'data-theme',
			'dark'
		);

		expect(errors).toEqual([]);
	});
});
