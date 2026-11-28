import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { ORIGIN } from './helpers';

test('network: a cold load touches only this origin and loads local woff2', async ({
	page,
}) => {
	const external: string[] = [];
	const failures: string[] = [];
	const fonts: string[] = [];

	page.on('request', (request) => {
		const url = request.url();

		if (!url.startsWith('http')) {
			return;
		}

		const parsed = new URL(url);

		if (parsed.origin !== ORIGIN) {
			external.push(url);
		}

		if (
			parsed.pathname.startsWith('/_next/static/media/') &&
			parsed.pathname.endsWith('.woff2')
		) {
			fonts.push(parsed.pathname);
		}
	});

	page.on('response', (response) => {
		const url = new URL(response.url());

		if (response.status() >= 400) {
			failures.push(`${response.status()} ${url.pathname}`);
		}
	});

	page.on('requestfailed', (request) => {
		const url = request.url();

		if (!url.startsWith('http')) {
			return;
		}

		const parsed = new URL(url);

		failures.push(`${request.failure()?.errorText} ${parsed.pathname}`);
	});

	await page.goto('/', { waitUntil: 'load' });
	await page.evaluate(() => document.fonts.ready);

	expect(
		external,
		`requests to other origins:\n${external.join('\n')}`
	).toEqual([]);
	expect(failures, `failed responses:\n${failures.join('\n')}`).toEqual([]);
	expect(fonts.length).toBeGreaterThan(0);
});

test('network: the built document names no font host', () => {
	const html = readFileSync(join(process.cwd(), 'out', 'index.html'), 'utf8');

	expect(html).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
	expect(html).not.toMatch(/https?:\/\/[^"']*\.woff2/);
});
