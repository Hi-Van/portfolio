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

function blockAfter(source, pattern) {
	const match = source.match(pattern);
	return match ? match[1] : null;
}

function tokensFrom(block) {
	const tokens = new Map();

	for (const [declaration] of (block ?? '').matchAll(
		/--[a-z0-9-]+\s*:[^;]+;/g
	)) {
		const separator = declaration.indexOf(':');

		if (separator === -1) continue;

		const name = declaration.slice(0, separator).trim();
		const value = declaration
			.slice(separator + 1, -1)
			.replace(/\s+/g, ' ')
			.trim()
			.toLowerCase();

		tokens.set(name, value);
	}

	return tokens;
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

const light = blockAfter(css, /:root\s*\{([^}]*)\}/);
const explicitDark = blockAfter(css, /\[data-theme="dark"\]\s*\{([^}]*)\}/);
const mediaDark = blockAfter(
	css,
	/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{[\s\S]*?:root:not\(\[data-theme="light"\]\)\s*\{([^}]*)\}/
);

if (!light) {
	fail('app/globals.css: no :root block found');
}

if (!explicitDark) {
	fail('app/globals.css: no [data-theme="dark"] block found');
}

if (!mediaDark) {
	fail(
		'app/globals.css: no prefers-color-scheme dark block scoped to :root:not([data-theme="light"]) found'
	);
}

const tokens = tokensFrom(light);
const explicitDarkTokens = tokensFrom(explicitDark);
const mediaDarkTokens = tokensFrom(mediaDark);

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

const darkProblems = [];

for (const [role, token] of Object.entries(roles)) {
	if (!explicitDarkTokens.has(token) && !mediaDarkTokens.has(token)) {
		darkProblems.push(`  ${role} (${token}): missing from both dark ramps`);
	}
}

const darkTokens = new Set([
	...explicitDarkTokens.keys(),
	...mediaDarkTokens.keys(),
]);

for (const token of darkTokens) {
	const explicit = explicitDarkTokens.get(token);
	const media = mediaDarkTokens.get(token);

	if (explicit !== media) {
		darkProblems.push(
			`  ${token}: [data-theme="dark"] has ${
				explicit ?? 'missing'
			}, prefers-color-scheme dark has ${media ?? 'missing'}`
		);
	}
}

if (darkProblems.length > 0) {
	console.error('app/globals.css: dark ramps disagree');
	console.error(darkProblems.join('\n'));
	process.exit(1);
}

console.log('app/globals.css: 6 role colours match');
console.log('app/globals.css: both dark ramps agree');
