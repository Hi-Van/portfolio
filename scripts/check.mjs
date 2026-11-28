import { spawnSync } from 'node:child_process';

const steps = [
	['lint', 'node_modules/.bin/biome', ['check']],
	['build', 'node_modules/.bin/next', ['build']],
	[
		'typecheck',
		'node_modules/.bin/tsc',
		['--noEmit', '--incremental', 'false'],
	],
	['tokens', process.execPath, ['scripts/check-tokens.mjs']],
	['artifacts', process.execPath, ['scripts/check-artifacts.mjs']],
	['e2e', 'node_modules/.bin/playwright', ['test', '--project=chromium']],
];

for (const [name, command, args] of steps) {
	console.log(`\n== ${name} ==`);
	const result = spawnSync(command, args, { stdio: 'inherit' });

	if (result.error) {
		console.error(`${name}: ${result.error.message}`);
		process.exit(1);
	}

	if (result.status !== 0) {
		console.error(`${name}: failed with exit code ${result.status}`);
		process.exit(1);
	}
}

console.log('\ncheck: passed');
