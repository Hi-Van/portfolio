import { expect, type Page, test } from '@playwright/test';
import { tabTo } from './helpers';

test.use({ viewport: { width: 390, height: 844 } });

async function openMenu(page: Page) {
	const trigger = page.locator('button.menu-btn');
	await trigger.click();
	await expect(page.locator('#site-nav')).toBeVisible();
	return trigger;
}

test.describe('navigation', () => {
	test('the trigger opens the panel and Escape closes it', async ({
		page,
	}) => {
		await page.goto('/');

		const trigger = page.locator('button.menu-btn');
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expect(page.locator('#site-nav')).toHaveCount(0);

		await trigger.click();

		const panel = page.locator('#site-nav');
		await expect(panel).toBeVisible();
		await expect(panel).toHaveAttribute('data-open', '');
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');

		await page.keyboard.press('Escape');

		await expect(page.locator('#site-nav')).toHaveCount(0);
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expect(trigger).toBeFocused();
	});

	test('a link click closes the menu', async ({ page }) => {
		await page.goto('/');
		const trigger = await openMenu(page);

		await page
			.locator('#site-nav')
			.getByRole('link', { name: 'About' })
			.click();

		await expect(page.locator('#site-nav')).toHaveCount(0);
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	test('the panel background matches the page paper', async ({ page }) => {
		await page.goto('/');
		await openMenu(page);

		const backgrounds = await page.evaluate(() => {
			const panel = document.querySelector('#site-nav');

			if (!(panel instanceof Element)) {
				throw new Error('The menu panel is missing');
			}

			return {
				panel: getComputedStyle(panel).backgroundColor,
				paper: getComputedStyle(document.body).backgroundColor,
			};
		});
		expect(backgrounds.panel).toBe(backgrounds.paper);
	});

	test('the switch box is 50 by 44 with a 6px track', async ({ page }) => {
		await page.goto('/');
		await openMenu(page);

		const control = page.locator('#site-nav [data-slot="switch"]');
		const box = await control.boundingBox();

		expect(box).not.toBeNull();
		if (!box) return;

		expect(Math.round(box.width)).toBe(50);
		expect(Math.round(box.height)).toBe(44);

		const radius = await control.evaluate(
			(el) => getComputedStyle(el, '::before').borderTopLeftRadius
		);
		expect(radius).toBe('6px');
	});

	test('the island gains a scrolled shadow above 8px', async ({ page }) => {
		await page.goto('/');

		const header = page.locator('header.top');
		const bar = page.locator('.bar');
		await expect(header).not.toHaveAttribute('data-scrolled', '');

		const before = await bar.evaluate(
			(el) => getComputedStyle(el).boxShadow
		);

		await page.evaluate(() => window.scrollTo(0, 20));
		await expect(header).toHaveAttribute('data-scrolled', '');

		await expect
			.poll(() => bar.evaluate((el) => getComputedStyle(el).boxShadow))
			.not.toBe(before);
	});

	test('the island hides scrolling down and returns scrolling up', async ({
		page,
	}) => {
		await page.goto('/');

		const header = page.locator('header.top');
		await expect(header).not.toHaveAttribute('data-hidden', '');

		await page.evaluate(() => window.scrollTo(0, 400));
		await expect(header).toHaveAttribute('data-hidden', '');

		await page.evaluate(() => window.scrollTo(0, 300));
		await expect(header).not.toHaveAttribute('data-hidden', '');
	});

	test('the island never hides while the menu is open', async ({ page }) => {
		await page.goto('/');
		await openMenu(page);

		const header = page.locator('header.top');
		await page.evaluate(() => window.scrollTo(0, 500));

		await expect(header).not.toHaveAttribute('data-hidden', '');
	});

	test('a nav click pins the island for a second', async ({ page }) => {
		await page.goto('/');
		await openMenu(page);

		const header = page.locator('header.top');

		await page
			.locator('#site-nav')
			.getByRole('link', { name: 'Stack' })
			.click();
		await page.evaluate(() => window.scrollTo(0, 2400));

		await expect(header).not.toHaveAttribute('data-hidden', '');

		// The pin must not hold the shadow back: the page has moved, so the
		// island reads as lifted even while it stays visible.
		await expect(header).toHaveAttribute('data-scrolled', '');
	});

	test('keyboard focus inside the island brings it back', async ({
		page,
	}) => {
		await page.goto('/');

		const header = page.locator('header.top');

		// Let the mount effect attach its scroll listener before the big
		// scroll: only the handler sets data-scrolled.
		await page.evaluate(() => window.scrollTo(0, 20));
		await expect(header).toHaveAttribute('data-scrolled', '');

		await page.evaluate(() => window.scrollTo(0, 400));
		await expect(header).toHaveAttribute('data-hidden', '');

		// Tab, not .focus(): only a keyboard-reached target matches
		// :focus-visible, which is what the guard keys on.
		await tabTo(page, 'a.brand');

		await expect(header).not.toHaveAttribute('data-hidden', '');
	});

	test('the island stays visible when keyboard focus is inside and the page scrolls', async ({
		page,
	}) => {
		await page.goto('/');
		const header = page.locator('header.top');
		await tabTo(page, 'a.brand');
		await page.evaluate(() => window.scrollTo(0, 500));

		await expect(header).toHaveAttribute('data-scrolled', '');
		await expect(header).not.toHaveAttribute('data-hidden', '');
		await expect(page.locator('a.brand')).toBeFocused();
	});

	test('a pointer nav click does not keep the island up on later scrolls', async ({
		page,
	}) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');

		await page
			.locator('.bar nav')
			.getByRole('link', { name: 'Work' })
			.click();

		// Let the one second pin after the nav click expire.
		await page.waitForTimeout(1100);
		await page.evaluate(() => window.scrollTo(0, window.scrollY + 600));

		await expect(page.locator('header.top')).toHaveAttribute(
			'data-hidden',
			''
		);
	});

	test('the menu closes when the viewport reaches the desktop layout', async ({
		page,
	}) => {
		await page.goto('/');
		const trigger = await openMenu(page);
		await page.setViewportSize({ width: 1440, height: 900 });
		await expect(page.locator('#site-nav')).toHaveCount(0);
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	test('aria-controls only names an element that exists', async ({
		page,
	}) => {
		await page.goto('/');
		const trigger = page.locator('button.menu-btn');
		await expect(trigger).not.toHaveAttribute('aria-controls');
		await trigger.click();
		await expect(trigger).toHaveAttribute('aria-controls', 'site-nav');

		await trigger.click();
		await expect(page.locator('#site-nav')).toHaveCount(0);
		await expect(trigger).not.toHaveAttribute('aria-controls');
	});
});
