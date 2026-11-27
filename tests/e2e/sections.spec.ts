import { expect, test } from '@playwright/test';

test.describe('sections', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('order: about, stack and work follow one another', async ({
		page,
	}) => {
		const ids = await page
			.locator('#about, #stack, #work')
			.evaluateAll((nodes) => nodes.map((node) => node.id));

		expect(ids).toEqual(['about', 'stack', 'work']);
	});

	test('about: note, short label, emphasis, and five facts', async ({
		page,
	}) => {
		const about = page.locator('#about');

		await expect(about.locator('.section__note')).toHaveText(
			'New York, NY'
		);
		await expect(about.locator('.about__short')).toHaveText(
			'The short version'
		);
		await expect(about.locator('.about__copy p')).toHaveCount(2);
		await expect(about.locator('.em')).toHaveText(
			'the parts nobody notices when they work'
		);

		await expect(about.locator('.facts dt')).toHaveText([
			'Currently',
			'Experience',
			'Focus',
			'Based in',
			'Education',
		]);
		await expect(about.locator('.facts div')).toHaveCount(5);
		await expect(about.locator('.facts dd').first()).toHaveText(
			'Software Engineer II, Growth at Atlassian, since June 2025'
		);
	});

	test('stack: two groups with comma joined items', async ({ page }) => {
		const stack = page.locator('#stack');

		await expect(stack.locator('.section__note')).toHaveText(
			'What I actually use.'
		);
		await expect(stack.locator('.stack__group')).toHaveCount(2);
		await expect(stack.locator('dt')).toHaveText([
			'Frontend',
			'Backend and infrastructure',
		]);
		await expect(stack.locator('dd').first()).toHaveText(
			'React, TypeScript, JavaScript, NodeJS, Express, HTML/CSS'
		);
		await expect(stack.locator('dd').nth(1)).toHaveText(
			'Java, Spring Boot, Python, C#, SQL, Kafka, GCP Pub/Sub, gRPC, AWS, GCP, Kubernetes, Docker, Postgres, Redis, MongoDB'
		);
	});

	test('work: note, five rows, titles and dates', async ({ page }) => {
		const work = page.locator('#work');

		await expect(work.locator('.section__note')).toHaveText(
			'Three roles and two internships, 2021 to now.'
		);
		await expect(work.locator('.row')).toHaveCount(5);
		await expect(work.locator('.row__title')).toHaveText([
			'Software Engineer II, Growth',
			'Software Engineer, Merchant Tools',
			'Software Engineer, Account Services',
			'Software Engineer Intern, AI T&C',
			'System Engineer Intern',
		]);
		await expect(work.locator('.row__when')).toHaveText([
			'Jun 2025 to now',
			'Aug 2023 to May 2025',
			'Sep 2022 to May 2023',
			'May 2022 to Aug 2022',
			'May 2021 to Jul 2021',
		]);
	});

	test('work: sixteen items, fourteen figures and two empty metrics', async ({
		page,
	}) => {
		const work = page.locator('#work');

		await expect(work.locator('.item')).toHaveCount(16);
		await expect(work.locator('.item__metric b')).toHaveCount(14);

		const empty = work.locator('.item__metric[aria-hidden="true"]');
		await expect(empty).toHaveCount(2);
		for (const metric of await empty.all()) {
			await expect(metric).toBeEmpty();
		}

		const itemsPerRow = await work
			.locator('.row')
			.evaluateAll((rows) =>
				rows.map((row) => row.querySelectorAll('.item').length)
			);
		const figuresPerRow = await work
			.locator('.row')
			.evaluateAll((rows) =>
				rows.map(
					(row) => row.querySelectorAll('.item__metric b').length
				)
			);
		const emptyPerRow = await work
			.locator('.row')
			.evaluateAll((rows) =>
				rows.map(
					(row) =>
						row.querySelectorAll(
							'.item__metric[aria-hidden="true"]'
						).length
				)
			);

		expect(itemsPerRow).toEqual([4, 3, 3, 3, 3]);
		expect(figuresPerRow).toEqual([3, 3, 2, 3, 3]);
		expect(emptyPerRow).toEqual([1, 0, 1, 0, 0]);
	});
});
