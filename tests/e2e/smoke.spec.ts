import { expect, test } from '@playwright/test';

test('smoke: one main landmark with the document title', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle('Van Sirisouk, software engineer');
	await expect(page.locator('main#main')).toHaveCount(1);
});

test('tokens: the light and dark paper ramps resolve', async ({ page }) => {
	await page.goto('/');

	const light = await page.evaluate(() => ({
		paper: getComputedStyle(document.body).backgroundColor,
		data: getComputedStyle(document.documentElement)
			.getPropertyValue('--data')
			.trim(),
	}));

	expect(light.paper).toBe('rgb(255, 255, 255)');
	expect(light.data).toBe('#2b3a8f');

	const dark = await page.evaluate(() => {
		document.documentElement.setAttribute('data-theme', 'dark');
		return getComputedStyle(document.body).backgroundColor;
	});

	expect(dark).toBe('rgb(16, 17, 20)');
});

test('fonts: the pixel family is set and loads', async ({ page }) => {
	await page.goto('/');

	const pixel = await page.evaluate(async () => {
		await document.fonts.ready;

		const family = getComputedStyle(document.documentElement)
			.getPropertyValue('--font-geist-pixel')
			.trim();

		if (!family) return { family, loaded: false };

		await document.fonts.load(`18px ${family}`);

		return { family, loaded: document.fonts.check(`18px ${family}`) };
	});

	expect(pixel.family).not.toBe('');
	expect(pixel.loaded).toBe(true);
});
