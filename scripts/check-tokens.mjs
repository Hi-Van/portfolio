import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const design = readFileSync(join(root, 'DESIGN.md'), 'utf8');
const css = readFileSync(join(root, 'app', 'globals.css'), 'utf8');

// DESIGN.md colours role -> globals.css custom property.
const roles = {
	primary: '--ink',
	secondary: '--data',
	neutral: '--paper',
	text: '--body',
	muted: '--muted',
	surface: '--panel',
};

function fail(message) {
	console.error(message);
	process.exit(1);
}

const colorsBlock = design.match(/^colors:\n((?:[ \t]+.*\n)+)/m);

if (!colorsBlock) {
	fail('app/globals.css: DESIGN.md has no colors block');
}

const spec = new Map();

for (const line of colorsBlock[1].split('\n')) {
	const match = line.match(
		/^\s+(primary|secondary|neutral|text|muted|surface):\s*"?([^"\s]+)"?\s*$/
	);

	if (match) {
		spec.set(match[1], match[2].toLowerCase());
	}
}

const rootBlock = css.match(/:root\s*\{([^}]*)\}/);

if (!rootBlock) {
	fail('app/globals.css: no :root block found');
}

const tokens = new Map();

for (const line of rootBlock[1].split('\n')) {
	const match = line.match(/^\s*(--[a-z-]+):\s*([^;]+);/);

	if (match) {
		tokens.set(match[1], match[2].trim().toLowerCase());
	}
}

const mismatches = [];

for (const [role, token] of Object.entries(roles)) {
	const expected = spec.get(role);
	const actual = tokens.get(token);

	if (!expected || !actual || expected !== actual) {
		mismatches.push(
			`  ${role} (${token}): expected ${expected ?? 'missing'}, found ${
				actual ?? 'missing'
			}`
		);
	}
}

if (mismatches.length > 0) {
	console.error('app/globals.css: role colours do not match');
	console.error(mismatches.join('\n'));
	process.exit(1);
}

console.log('app/globals.css: 6 role colours match');
