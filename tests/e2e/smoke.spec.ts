import { expect, test } from '@playwright/test';

test('smoke: one main landmark with the document title', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle('Van Sirisouk, software engineer');
	await expect(page.locator('main#main')).toHaveCount(1);
});
