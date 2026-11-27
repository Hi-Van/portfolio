import { expect, test } from '@playwright/test';

const DECK =
	"Human visualizing 1&0 for other humans. Right now I'm a software engineer on the growth team at Atlassian.";

test.describe('hero', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('renders the name with the three initial marks', async ({ page }) => {
		await expect(page.locator('#hero-title')).toHaveText(
			'Vanouphon Sirisouk.'
		);

		const marks = page.locator('#hero-title .hero__mark');
		await expect(marks).toHaveCount(3);
		await expect(marks).toHaveText(['Van', 'S', '.']);
	});

	test('renders the deck with the code chip and the bold employer', async ({
		page,
	}) => {
		await expect(page.locator('.hero__deck')).toHaveText(DECK);
		await expect(page.locator('.hero__deck code')).toHaveText('1&0');
		await expect(page.locator('.hero__deck b')).toHaveText('Atlassian');
	});

	test('renders the Elsewhere group and the work action', async ({
		page,
	}) => {
		const group = page.getByRole('group', { name: 'Elsewhere' });
		await expect(group).toHaveCount(1);

		const links = group.getByRole('link');
		await expect(links).toHaveCount(3);

		await expect(
			group.getByRole('link', { name: 'GitHub' })
		).toHaveAttribute('href', 'https://github.com/Hi-Van');
		await expect(
			group.getByRole('link', { name: 'GitHub' })
		).toHaveAttribute('rel', 'me');
		await expect(
			group.getByRole('link', { name: 'LinkedIn' })
		).toHaveAttribute('href', 'https://www.linkedin.com/in/van-s/');
		await expect(
			group.getByRole('link', { name: 'LinkedIn' })
		).toHaveAttribute('rel', 'me');
		await expect(
			group.getByRole('link', { name: 'Email' })
		).toHaveAttribute('href', 'mailto:contact@vansiriso.uk');

		const action = page.getByRole('link', { name: 'See the work' });
		await expect(action).toHaveAttribute('href', '#work');
		await expect(action.locator('[data-slot="icon"]')).toHaveCount(1);
	});

	test('renders the New York eyebrow and the clock nodes', async ({
		page,
	}) => {
		const eyebrow = page.locator('.eyebrow');
		await expect(eyebrow).toHaveCount(1);
		await expect(eyebrow).toContainText('New York');
		await expect(eyebrow.locator('time[data-clock]')).toHaveCount(1);
		await expect(eyebrow.locator('[data-clock-weekday]')).toHaveCount(1);
		await expect(eyebrow.locator('[data-clock-date]')).toHaveCount(1);
		await expect(eyebrow.locator('[data-clock-time]')).toHaveCount(1);
	});

	test('renders the proof band with three figures', async ({ page }) => {
		await expect(
			page.locator('.proof .label', {
				hasText: 'Cooler parts of my experience',
			})
		).toHaveCount(1);

		const cells = page.locator('.band .band__cell');
		await expect(cells).toHaveCount(3);
		await expect(cells.locator('.band__num')).toHaveText([
			'832,000',
			'28.1%',
			'450,000',
		]);
		await expect(cells.locator('.band__unit')).toHaveText([
			'page views added',
			'higher D1 to D6 retention',
			'records per second',
		]);
		await expect(cells.locator('.band__say')).toHaveText([
			"I built the logged-in hero and landing page for our Team '26 Rovo tour. It's 3% of Atlassian.com traffic now.",
			'JIRA Service Management used to be hard-coded React. I moved it onto a drag-and-drop authoring platform and sign-ups went up 10%.',
			'At Walmart, event-driven pipelines file clothing layouts on their own, at 450,000 records a second.',
		]);
	});

	test('applies the hero type scale and the band figure colour', async ({
		page,
	}) => {
		const scale = await page.evaluate(() => {
			const heading = document.querySelector('#hero-title');
			const deck = document.querySelector('.hero__deck');
			const actions = document.querySelector('.hero__actions');
			const figure = document.querySelector('.band__num');

			if (!heading || !deck || !actions || !figure) {
				return null;
			}

			const probe = document.createElement('span');
			probe.style.color = 'var(--data)';
			document.body.appendChild(probe);
			const dataColor = getComputedStyle(probe).color;
			probe.remove();

			const headingStyle = getComputedStyle(heading);
			const deckStyle = getComputedStyle(deck);
			const actionStyle = getComputedStyle(actions);
			const figureStyle = getComputedStyle(figure);

			return {
				display: Number.parseFloat(headingStyle.fontSize),
				displayLine: Number.parseFloat(headingStyle.lineHeight),
				deck: Number.parseFloat(deckStyle.fontSize),
				deckLine: Number.parseFloat(deckStyle.lineHeight),
				deckMax: deckStyle.maxWidth,
				gapRow: Number.parseFloat(actionStyle.rowGap),
				gapColumn: Number.parseFloat(actionStyle.columnGap),
				figure: Number.parseFloat(figureStyle.fontSize),
				figureColor: figureStyle.color,
				dataColor,
			};
		});

		expect(scale).not.toBeNull();
		if (!scale) {
			return;
		}

		expect(scale.display).toBe(68);
		expect(scale.displayLine / scale.display).toBeCloseTo(1.06, 2);
		expect(scale.deck).toBe(19);
		expect(scale.deckLine / scale.deck).toBeCloseTo(1.56, 2);
		expect(scale.deckMax).not.toBe('none');
		expect(scale.gapRow).toBe(12);
		expect(scale.gapColumn).toBe(14);
		expect(scale.figure).toBe(40);
		expect(scale.figureColor).toBe(scale.dataColor);
	});
});

test.describe('clock', () => {
	test('reads New York time and ticks every 15 seconds', async ({ page }) => {
		await page.clock.install({ time: new Date('2026-01-15T15:00:55Z') });
		await page.goto('/');

		const clock = page.locator('time[data-clock]');
		await expect(clock).toHaveCount(1);
		await expect(page.locator('[data-clock-weekday]')).toHaveText(
			'Thursday, '
		);
		await expect(page.locator('[data-clock-date]')).toHaveText(
			'January 15, 2026'
		);
		await expect(page.locator('[data-clock-time]')).toHaveText(
			'10:00 AM EST'
		);
		await expect(clock).toHaveAttribute(
			'datetime',
			/^2026-01-15T15:00:\d{2}\.\d{3}Z$/
		);

		await page.clock.fastForward(15_000);

		await expect(page.locator('[data-clock-time]')).toHaveText(
			'10:01 AM EST'
		);
		await expect(clock).toHaveAttribute(
			'datetime',
			/^2026-01-15T15:01:\d{2}\.\d{3}Z$/
		);
	});
});

test.describe('clock without JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('renders the static New York fallback', async ({ page }) => {
		await page.goto('/');

		await expect(page.locator('#hero-title')).toHaveText(
			'Vanouphon Sirisouk.'
		);
		await expect(page.locator('[data-clock-weekday]')).toHaveText(
			'Friday, '
		);
		await expect(page.locator('[data-clock-date]')).toHaveText(
			'November 27, 2026'
		);
		await expect(page.locator('[data-clock-time]')).toHaveText(
			'4:43 AM EST'
		);
		await expect(page.locator('time[data-clock]')).toHaveAttribute(
			'datetime',
			'2026-11-27T09:43:00Z'
		);
	});
});
