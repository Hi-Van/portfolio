import { expect, type Page, test } from '@playwright/test';
import {
	focusRing,
	openAt,
	openWithTheme,
	THEMES,
	tabTo,
	visibleBoxes,
	WIDTHS,
} from './helpers';

const HEIGHT = 900;

const DESKTOP_CONTROLS = [
	'.skip',
	'.brand',
	'.nav a',
	'.theme-toggle',
	'.socials--fill a',
	'.btn',
	'.foot nav a',
	'.foot__mail',
];

const MOBILE_CONTROLS = [
	'.brand',
	'.nav a',
	'.theme-toggle',
	'.menu-btn',
	'.socials--fill a',
	'.btn',
	'.foot nav a',
	'.foot__mail',
];

/** Every rendered match measures at least a 44px square. */
async function expectTargets(page: Page, selector: string) {
	const boxes = await visibleBoxes(page, selector);

	expect(boxes.length, `${selector} is rendered`).toBeGreaterThan(0);

	for (const box of boxes) {
		expect(box.width, `${selector} width`).toBeGreaterThanOrEqual(43.99);
		expect(box.height, `${selector} height`).toBeGreaterThanOrEqual(43.99);
	}
}

async function radii(
	page: Page,
	selector: string,
	pseudo?: string
): Promise<string[]> {
	return page
		.locator(selector)
		.first()
		.evaluate((element, pseudoElement) => {
			const style = getComputedStyle(element, pseudoElement ?? undefined);

			return [
				style.borderTopLeftRadius,
				style.borderTopRightRadius,
				style.borderBottomRightRadius,
				style.borderBottomLeftRadius,
			];
		}, pseudo);
}

function alphaOf(color: string): number {
	const value = color.trim().toLowerCase();

	if (value === 'transparent') {
		return 0;
	}

	const legacy = value.match(/^rgba?\(([^)]+)\)$/);

	if (legacy) {
		const parts = legacy[1].split(',').map((part) => part.trim());
		const alpha = parts.length === 4 ? Number(parts[3]) : 1;
		return Number.isNaN(alpha) ? 1 : alpha;
	}

	const modern = value.match(/\/\s*([0-9.]+)(%)?\s*\)$/);

	if (modern) {
		const alpha = Number(modern[1]);
		if (Number.isNaN(alpha)) {
			return 1;
		}
		return modern[2] === '%' ? alpha / 100 : alpha;
	}

	return 1;
}

async function expectIconsHidden(page: Page) {
	const icons = await page
		.locator('[data-slot="icon"]')
		.evaluateAll((nodes) =>
			nodes.map((node) => ({
				tag: node.tagName.toLowerCase(),
				hidden: node.getAttribute('aria-hidden'),
			}))
		);

	expect(icons.length).toBeGreaterThan(0);
	expect(icons.filter((icon) => icon.hidden !== 'true')).toEqual([]);
}

for (const width of WIDTHS) {
	for (const theme of THEMES) {
		test(`layout: no horizontal overflow at ${width} in ${theme}`, async ({
			page,
		}) => {
			await openWithTheme(page, theme, width, HEIGHT);

			const widths = await page.evaluate(() => ({
				rootScroll: document.documentElement.scrollWidth,
				rootClient: document.documentElement.clientWidth,
				bodyScroll: document.body.scrollWidth,
			}));

			expect(
				widths.rootScroll,
				`documentElement.scrollWidth ${widths.rootScroll} vs ${widths.rootClient}`
			).toBeLessThanOrEqual(widths.rootClient);
			expect(
				widths.bodyScroll,
				`body.scrollWidth ${widths.bodyScroll} vs ${widths.rootClient}`
			).toBeLessThanOrEqual(widths.rootClient);
		});
	}
}

test('controls: desktop targets clear 44 by 44', async ({ page }) => {
	await openAt(page, 1440, HEIGHT);

	// The skip link is parked off screen until it has focus.
	await tabTo(page, 'a.skip');
	await expect(page.locator('a.skip')).toBeFocused();
	await expect
		.poll(
			async () => (await page.locator('a.skip').boundingBox())?.y ?? -64
		)
		.toBeGreaterThanOrEqual(0);

	for (const selector of DESKTOP_CONTROLS) {
		await expectTargets(page, selector);
	}
});

test('controls: phone targets clear 44 by 44, including the 50 by 44 switch', async ({
	page,
}) => {
	await openAt(page, 390, 844);
	await page.locator('button.menu-btn').click();
	await expect(page.locator('#site-nav')).toBeVisible();

	for (const selector of MOBILE_CONTROLS) {
		await expectTargets(page, selector);
	}

	const switches = await visibleBoxes(page, '#site-nav [data-slot="switch"]');

	expect(switches).toHaveLength(1);
	expect(Math.round(switches[0].width)).toBe(50);
	expect(Math.round(switches[0].height)).toBe(44);

	const label = page.locator('#site-nav label');
	const box = await label.boundingBox();
	expect(box).not.toBeNull();
	if (box) expect(box.height).toBeGreaterThanOrEqual(43.99);
});

test('radii: controls 8, chip 7, island 10, switch track 6', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);

	expect(await radii(page, '.btn')).toEqual(['8px', '8px', '8px', '8px']);
	expect(await radii(page, '.theme-toggle')).toEqual([
		'8px',
		'8px',
		'8px',
		'8px',
	]);
	expect(await radii(page, '.eyebrow')).toEqual(['7px', '7px', '7px', '7px']);
	expect(await radii(page, '.bar')).toEqual(['10px', '10px', '10px', '10px']);

	const socials = page.locator('.socials--fill a');

	expect(
		await socials.first().evaluate((element) => {
			const style = getComputedStyle(element);
			return [style.borderTopLeftRadius, style.borderBottomLeftRadius];
		})
	).toEqual(['8px', '8px']);
	expect(
		await socials.last().evaluate((element) => {
			const style = getComputedStyle(element);
			return [style.borderTopRightRadius, style.borderBottomRightRadius];
		})
	).toEqual(['8px', '8px']);

	await page.setViewportSize({ width: 390, height: 844 });
	await page.locator('button.menu-btn').click();
	await expect(page.locator('#site-nav')).toBeVisible();

	expect(await radii(page, '#site-nav')).toEqual([
		'10px',
		'10px',
		'10px',
		'10px',
	]);
	expect(
		await page
			.locator('#site-nav [data-slot="switch"]')
			.evaluate(
				(element) =>
					getComputedStyle(element, '::before').borderTopLeftRadius
			)
	).toBe('6px');
});

test('pixel type: 18 nodes share the next/font Geist Pixel family', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);

	const result = await page.evaluate(() => {
		const firstFamily = (value: string) =>
			(value.split(',')[0] ?? '').trim().replace(/^['"]|['"]$/g, '');
		const variable = getComputedStyle(
			document.documentElement
		).getPropertyValue('--font-geist-pixel');
		const nodes = Array.from(
			document.querySelectorAll(
				'.band__num, .item__metric b, .brand__name'
			)
		);

		return {
			expected: firstFamily(variable),
			families: nodes.map((node) =>
				firstFamily(getComputedStyle(node).fontFamily)
			),
		};
	});

	expect(result.expected).not.toBe('');
	expect(result.families).toHaveLength(18);
	expect(result.families).toEqual(Array(18).fill(result.expected));
});

test('fonts: both next/font faces pass document.fonts.check', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);

	const fonts = await page.evaluate(async () => {
		await document.fonts.ready;

		const root = getComputedStyle(document.documentElement);
		const pixel = root.getPropertyValue('--font-geist-pixel').trim();
		const sans = root.getPropertyValue('--font-instrument-sans').trim();

		await document.fonts.load(`18px ${pixel}`);
		await document.fonts.load(`17px ${sans}`);

		return {
			pixel: document.fonts.check(`18px ${pixel}`),
			sans: document.fonts.check(`17px ${sans}`),
		};
	});

	expect(fonts.pixel).toBe(true);
	expect(fonts.sans).toBe(true);
});

test('counts: the content model matches the prototype', async ({ page }) => {
	await openAt(page, 1440, HEIGHT);

	const counts = await page.evaluate(() => ({
		bandCells: document.querySelectorAll('.band__cell').length,
		items: document.querySelectorAll('.item').length,
		figures: document.querySelectorAll('.item__metric b').length,
		emptyMetrics: document.querySelectorAll(
			'.item__metric[aria-hidden="true"]'
		).length,
		facts: document.querySelectorAll('.facts > div').length,
		stackGroups: document.querySelectorAll('.stack__group').length,
		rows: document.querySelectorAll('.row').length,
	}));

	expect(counts).toEqual({
		bandCells: 3,
		items: 16,
		figures: 14,
		emptyMetrics: 2,
		facts: 5,
		stackGroups: 2,
		rows: 5,
	});
});

for (const theme of THEMES) {
	test(`island: 8px blur over a translucent fill in ${theme}`, async ({
		page,
	}) => {
		await openWithTheme(page, theme, 1440, HEIGHT);

		const glass = await page.evaluate(() => {
			const bar = document.querySelector('.bar');

			if (!(bar instanceof Element)) {
				throw new Error('The island bar is missing');
			}

			const style = getComputedStyle(bar);

			return {
				backdrop:
					style.backdropFilter ||
					style.getPropertyValue('-webkit-backdrop-filter'),
				background: style.backgroundColor,
			};
		});

		expect(glass.backdrop).toContain('blur(8px)');

		const alpha = alphaOf(glass.background);

		expect(alpha, `island fill ${glass.background}`).toBeGreaterThan(0);
		expect(alpha, `island fill ${glass.background}`).toBeLessThan(1);
	});
}

test('footer: the scene masks at 900 and goes full bleed at 860', async ({
	page,
}) => {
	await openAt(page, 900, HEIGHT);

	const mask = await page.locator('svg.foot__decor').evaluate((element) => {
		const style = getComputedStyle(element);
		return `${style.maskImage} ${style.getPropertyValue('-webkit-mask-image')}`;
	});

	expect(mask).toContain('linear-gradient');

	await page.setViewportSize({ width: 860, height: HEIGHT });

	expect(
		await page
			.locator('svg.foot__decor')
			.evaluate((element) => getComputedStyle(element).maskImage)
	).toBe('none');
});

test('stamp: the weekday hides at 520 and the clock stays on one line', async ({
	page,
}) => {
	await openAt(page, 521, HEIGHT);

	const weekday = page.locator('[data-clock-weekday]');

	expect(
		await weekday.evaluate((element) => getComputedStyle(element).display)
	).not.toBe('none');

	await page.setViewportSize({ width: 520, height: HEIGHT });

	expect(
		await weekday.evaluate((element) => getComputedStyle(element).display)
	).toBe('none');

	await page.setViewportSize({ width: 320, height: HEIGHT });

	const stamp = await page.evaluate(() => {
		const time = document.querySelector('time[data-clock]');

		if (!(time instanceof Element)) {
			throw new Error('The clock is missing');
		}

		return {
			whiteSpace: getComputedStyle(time).whiteSpace,
			lines: time.getClientRects().length,
		};
	});

	expect(stamp.whiteSpace).toBe('nowrap');
	expect(stamp.lines).toBe(1);
});

test('focus: a 2px data ring at 3px, inset on the filled social run', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);

	await tabTo(page, '.btn');
	const ring = await focusRing(page);

	expect(ring.focusVisible).toBe(true);
	expect(ring.style).toBe('solid');
	expect(ring.width).toBe('2px');
	expect(ring.offset).toBe('3px');
	expect(ring.color).toBe('rgb(43, 58, 143)');

	await tabTo(page, '.socials--fill a');
	const social = await focusRing(page);

	expect(social.focusVisible).toBe(true);
	expect(social.width).toBe('2px');
	expect(social.offset).toBe('-3px');
	expect(social.color).toBe('rgb(255, 255, 255)');
});

test('focus: the ring follows the data token in dark mode', async ({
	page,
}) => {
	await openWithTheme(page, 'dark', 1440, HEIGHT);

	await tabTo(page, '.btn');
	const ring = await focusRing(page);

	expect(ring.color).toBe('rgb(169, 179, 255)');
});

test('icons: every icon slot is hidden from assistive technology', async ({
	page,
}) => {
	await openAt(page, 1440, HEIGHT);
	await expectIconsHidden(page);

	await openWithTheme(page, 'dark', 390, 844);
	await page.locator('button.menu-btn').click();
	await expect(page.locator('#site-nav')).toBeVisible();
	await expectIconsHidden(page);
});

test('breakpoints: 1080, 860, 520 and 380 are the last mobile widths', async ({
	page,
}) => {
	await openAt(page, 1081, HEIGHT);

	const factsOffset = () =>
		page.evaluate(() => {
			const copy = document.querySelector('.about__copy');
			const facts = document.querySelector('.facts');

			if (!copy || !facts) {
				throw new Error('About grid is missing');
			}

			return Math.round(
				facts.getBoundingClientRect().top -
					copy.getBoundingClientRect().top
			);
		});

	const headerMode = () =>
		page.evaluate(() => {
			const nav = document.querySelector('header nav.nav');
			const menu = document.querySelector('button.menu-btn');

			return {
				nav: nav ? getComputedStyle(nav).display : null,
				menu: menu ? getComputedStyle(menu).display : null,
			};
		});

	const bandColumns = () =>
		page.evaluate(() => {
			const band = document.querySelector('.band');
			const cell = document.querySelector('.band__cell');

			if (!band || !cell) {
				throw new Error('Proof band is missing');
			}

			const bandWidth = band.getBoundingClientRect().width;
			const cellWidth = cell.getBoundingClientRect().width;

			return bandWidth === 0 ? 0 : Math.round(bandWidth / cellWidth);
		});

	const weekdayDisplay = () =>
		page
			.locator('[data-clock-weekday]')
			.evaluate((element) => getComputedStyle(element).display);
	const brandGap = () =>
		page
			.locator('.brand')
			.evaluate((element) => getComputedStyle(element).columnGap);

	expect(await factsOffset()).toBe(0);

	await page.setViewportSize({ width: 1080, height: HEIGHT });
	expect(await factsOffset()).toBeGreaterThan(20);

	await page.setViewportSize({ width: 861, height: HEIGHT });
	expect(await headerMode()).toEqual({ nav: 'flex', menu: 'none' });
	expect(await bandColumns()).toBe(3);

	await page.setViewportSize({ width: 860, height: HEIGHT });
	const mobile = await headerMode();
	expect(mobile.nav).toBe('none');
	expect(mobile.menu).not.toBe('none');
	expect(await bandColumns()).toBe(1);

	await page.setViewportSize({ width: 521, height: HEIGHT });
	expect(await weekdayDisplay()).not.toBe('none');

	await page.setViewportSize({ width: 520, height: HEIGHT });
	expect(await weekdayDisplay()).toBe('none');

	await page.setViewportSize({ width: 381, height: HEIGHT });
	expect(await brandGap()).toBe('12px');

	await page.setViewportSize({ width: 380, height: HEIGHT });
	expect(await brandGap()).toBe('8px');
});
