import { expect, type Page } from '@playwright/test';

/** The static export served by Playwright's webServer. */
export const ORIGIN = `http://localhost:${Number(process.env.PORT ?? 3100)}`;

/** The fourteen acceptance widths from PORTING.md. */
export const WIDTHS = [
	1440, 1280, 1080, 900, 861, 860, 700, 600, 520, 430, 390, 375, 360, 320,
] as const;

export const THEMES = ['light', 'dark'] as const;

export type Theme = (typeof THEMES)[number];

export type Box = {
	selector: string;
	display: string;
	width: number;
	height: number;
	x: number;
	y: number;
};

/** Open the page at a viewport with no explicit theme choice. */
export async function openAt(
	page: Page,
	width: number,
	height = 900
): Promise<void> {
	await page.setViewportSize({ width, height });
	await page.goto('/');
}

/**
 * Seed `localStorage["vs-theme"]` before the document parses, then open the
 * page. The inline head script reads it, so the requested ramp is the first
 * paint, not an after-mount correction.
 */
export async function openWithTheme(
	page: Page,
	theme: Theme,
	width: number,
	height = 900
): Promise<void> {
	await page.setViewportSize({ width, height });
	await page.addInitScript((value) => {
		try {
			window.localStorage.setItem('vs-theme', value);
		} catch {
			// Storage may be blocked; the page still has to render.
		}
	}, theme);
	await page.goto('/');
	await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
}

/**
 * Boxes for every matching element that is actually rendered. Off-screen
 * fixed elements still count: the skip link is measured once it is focused.
 */
export async function visibleBoxes(
	page: Page,
	selector: string
): Promise<Box[]> {
	return page.locator(selector).evaluateAll((nodes, sel) => {
		const boxes: Box[] = [];

		for (const node of nodes) {
			const rect = node.getBoundingClientRect();
			const style = getComputedStyle(node);

			if (
				style.display === 'none' ||
				style.visibility === 'hidden' ||
				rect.width === 0 ||
				rect.height === 0
			) {
				continue;
			}

			boxes.push({
				selector: sel,
				display: style.display,
				width: rect.width,
				height: rect.height,
				x: rect.x,
				y: rect.y,
			});
		}

		return boxes;
	}, selector);
}

export type FocusRing = {
	width: string;
	style: string;
	color: string;
	offset: string;
	focusVisible: boolean;
};

/**
 * The key that walks every focusable element. WebKit mirrors Safari's default
 * keyboard navigation, where plain Tab only visits controls; Option+Tab walks
 * links as well, so the focus ring on an anchor can be measured there too.
 */
function tabKey(page: Page): string {
	const name = page.context().browser()?.browserType().name();
	return name === 'webkit' ? 'Alt+Tab' : 'Tab';
}

/** Move focus to the next element with the engine's full-navigation Tab. */
export async function pressTab(page: Page): Promise<void> {
	await page.keyboard.press(tabKey(page));
}

/**
 * Move keyboard focus to the first element matching `selector`. Tabbing from
 * the document start is what makes `:focus-visible` match, so the ring can be
 * read from computed style.
 */
export async function tabTo(
	page: Page,
	selector: string,
	limit = 48
): Promise<void> {
	// A focused body with tabindex -1 resets the sequential focus navigation
	// starting point, so a second call starts at the top of the document rather
	// than continuing from wherever the last call left off.
	await page.evaluate(() => {
		document.body.setAttribute('tabindex', '-1');
		document.body.focus();
	});

	try {
		for (let index = 0; index < limit; index += 1) {
			await pressTab(page);
			const reached = await page.evaluate(
				(sel) => document.activeElement?.matches(sel) ?? false,
				selector
			);

			if (reached) {
				return;
			}
		}
	} finally {
		await page.evaluate(() => {
			document.body.removeAttribute('tabindex');
		});
	}

	throw new Error(`Tab never reached ${selector}`);
}

export async function focusRing(page: Page): Promise<FocusRing> {
	return page.evaluate(() => {
		const element = document.activeElement;

		if (!(element instanceof Element)) {
			throw new Error('Nothing is focused');
		}

		const style = getComputedStyle(element);

		return {
			width: style.outlineWidth,
			style: style.outlineStyle,
			color: style.outlineColor,
			offset: style.outlineOffset,
			focusVisible: element.matches(':focus-visible'),
		};
	});
}
