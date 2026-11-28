import { expect, test } from '@playwright/test';

const CREDIT_LABELS = [
	'DeepSeek',
	'Hermes Agent',
	'OpenCode',
	'Pxlkit',
	'Pixelarticons',
];

test('footer: identity, mail, five nav links, and five credits', async ({
	page,
}) => {
	await page.goto('/');

	await expect(page.locator('footer')).toHaveCount(1);

	const footer = page.locator('footer.foot');
	await expect(footer).toHaveCount(1);

	await expect(footer.locator('.foot__id')).toHaveText(
		`Van Sirisouk, Software Engineer. ${new Date().getFullYear()}.`
	);

	const mail = footer.locator('a.foot__mail');
	await expect(mail).toHaveCount(1);
	await expect(mail).toHaveAttribute('href', 'mailto:contact@vansiriso.uk');
	await expect(mail).toHaveText('contact@vansiriso.uk');

	const nav = footer.locator('nav[aria-label="Footer"]');
	await expect(nav).toHaveCount(1);

	const links = nav.getByRole('link');
	await expect(links).toHaveCount(5);
	await expect(links).toHaveText(['About', 'Stack', 'Work', 'Résumé', 'Top']);

	const resume = nav.getByRole('link', { name: 'Résumé' });
	await expect(resume).toHaveAttribute(
		'href',
		'mailto:contact@vansiriso.uk?subject=R%C3%A9sum%C3%A9'
	);
	expect(
		decodeURIComponent(
			(await resume.getAttribute('href'))?.split('subject=')[1] ?? ''
		)
	).toBe('Résumé');

	await expect(nav.getByRole('link', { name: 'Top' })).toHaveAttribute(
		'href',
		'#top'
	);

	const credits = footer.locator('.foot__credit a');
	await expect(credits).toHaveCount(5);
	await expect(credits).toHaveText(CREDIT_LABELS);
	await expect(credits.first()).toHaveAttribute('rel', 'noopener');
});

test('nav mark: 76 rects', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('svg.brand__mark rect')).toHaveCount(76);
});

test('footer: the scene is 187 rects at 1144 by 128 behind the text', async ({
	page,
}) => {
	await page.goto('/');

	const scene = page.locator('svg.foot__decor');
	await expect(scene).toHaveCount(1);
	await expect(scene.locator('rect')).toHaveCount(187);
	await expect(scene).toHaveAttribute('viewBox', '0 0 1144 128');
	await expect(scene).toHaveAttribute('aria-hidden', 'true');

	const viewBox = (await scene.getAttribute('viewBox')) ?? '';
	const [, , width, height] = viewBox.split(' ').map(Number);
	expect(width).toBe(1144);
	expect(height).toBe(128);
	expect(width / height).toBeCloseTo(1144 / 128, 5);

	const styles = await scene.evaluate((el) => {
		const sceneStyle = getComputedStyle(el);
		const main = document.querySelector('.foot__main');
		const meta = document.querySelector('.foot__meta');
		const read = (node: Element | null) => {
			if (!node) return null;
			const style = getComputedStyle(node);
			return { position: style.position, zIndex: style.zIndex };
		};
		return {
			scene: {
				bottom: sceneStyle.bottom,
				height: sceneStyle.height,
				mask: sceneStyle.maskImage,
				position: sceneStyle.position,
				zIndex: sceneStyle.zIndex,
			},
			main: read(main),
			meta: read(meta),
		};
	});

	expect(styles.scene.position).toBe('absolute');
	expect(styles.scene.bottom).toBe('0px');
	expect(styles.scene.height).toBe('128px');
	expect(styles.scene.zIndex).toBe('0');
	expect(styles.scene.mask).toContain('linear-gradient');
	expect(styles.main).toEqual({ position: 'relative', zIndex: '10' });
	expect(styles.meta).toEqual({ position: 'relative', zIndex: '10' });
});

test('footer: the scene is full bleed below 861', async ({ page }) => {
	await page.setViewportSize({ width: 860, height: 900 });
	await page.goto('/');

	const mask = await page
		.locator('svg.foot__decor')
		.evaluate((el) => getComputedStyle(el).maskImage);

	expect(mask).toBe('none');
});
