import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT || 3100);
const ORIGIN = `http://localhost:${PORT}`;

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: 'list',
	use: {
		baseURL: ORIGIN,
		trace: 'on-first-retry',
	},
	webServer: {
		command: `node_modules/.bin/serve out -l ${PORT}`,
		url: ORIGIN,
		reuseExistingServer: false,
		timeout: 120_000,
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
	],
});
