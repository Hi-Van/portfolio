// Artifact check: generated inline art, the package icon registry, and the
// favicon. The nav mark and the footer scene are the only hand-inlined SVG on
// the page, so their rect counts are exact and their markup carries no
// sprite, symbol sheet, or remote reference.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const failures = [];

function check(condition, message) {
	if (condition) {
		console.log(`ok   ${message}`);
		return;
	}
	failures.push(message);
	console.error(`fail ${message}`);
}

function read(relativePath) {
	const absolutePath = join(root, relativePath);
	if (!existsSync(absolutePath)) {
		return null;
	}
	return readFileSync(absolutePath, 'utf8');
}

const NAV_MARKUP = 'components/icons/nav-mark-markup.ts';
const FOOTER_MARKUP = 'components/icons/footer-markup.ts';
const ICONS_DIR = 'components/icons';
const REGISTRY = 'components/icons/index.tsx';
const ANIMATED = 'components/icons/animated-icon.tsx';
const ART_WRAPPERS = [
	'components/icons/nav-mark.tsx',
	'components/icons/footer-scene.tsx',
];

const navMarkup = read(NAV_MARKUP);
const footerMarkup = read(FOOTER_MARKUP);

function countRects(source) {
	return (source.match(/<rect\b/g) ?? []).length;
}

check(navMarkup !== null, `${NAV_MARKUP} exists`);
check(footerMarkup !== null, `${FOOTER_MARKUP} exists`);

if (navMarkup !== null) {
	check(
		countRects(navMarkup) === 76,
		`nav mark has exactly 76 rect elements (found ${countRects(navMarkup)})`
	);
	check(!/<svg\b/i.test(navMarkup), 'nav mark holds inner markup only');
}

if (footerMarkup !== null) {
	check(
		countRects(footerMarkup) === 187,
		`footer scene has exactly 187 rect elements (found ${countRects(footerMarkup)})`
	);
	check(
		!/<svg\b/i.test(footerMarkup),
		'footer scene holds inner markup only'
	);
}

const iconFiles = existsSync(join(root, ICONS_DIR))
	? readdirSync(join(root, ICONS_DIR)).filter((file) =>
			/\.(ts|tsx)$/.test(file)
		)
	: [];

check(iconFiles.length > 0, `${ICONS_DIR} holds the icon components`);

for (const file of iconFiles) {
	const source = readFileSync(join(root, ICONS_DIR, file), 'utf8');
	check(!/<symbol\b/i.test(source), `${file} has no symbol element`);
	check(!/sprite/i.test(source), `${file} has no sprite sheet reference`);
}

if (navMarkup !== null && footerMarkup !== null) {
	check(
		!/https?:\/\//i.test(navMarkup) && !/https?:\/\//i.test(footerMarkup),
		'generated art makes no remote reference'
	);
}

const allowedModules = new Set([
	'@pxlkit/core',
	'@pxlkit/core/vanilla',
	'@pxlkit/gamification',
	'@pxlkit/social',
	'@pxlkit/ui',
	'@pxlkit/weather',
	'next/image',
	'pixelarticons/react',
	'react',
]);

function importsIn(source) {
	const modules = [];
	for (const match of source.matchAll(
		/(?:from\s+|import\s+)['"]([^'"]+)['"]/g
	)) {
		modules.push(match[1]);
	}
	return modules;
}

for (const file of [REGISTRY, ANIMATED]) {
	const source = read(file);
	check(source !== null, `${file} exists`);
	if (source === null) {
		continue;
	}

	for (const moduleName of importsIn(source)) {
		if (moduleName.startsWith('.') || moduleName.startsWith('@/')) {
			continue;
		}
		check(
			allowedModules.has(moduleName),
			`${file} imports ${moduleName} from an allowed module`
		);
	}
}

const registry = read(REGISTRY);
check(registry !== null, `${REGISTRY} exists`);
if (registry !== null) {
	check(
		/satisfies\s+Record<\s*IconName\s*,\s*Entry\s*>/.test(registry),
		'icon registry is typed as Record<IconName, Entry>'
	);
}

for (const file of [REGISTRY, ANIMATED, ...ART_WRAPPERS]) {
	const source = read(file);
	if (source === null) {
		continue;
	}
	check(
		!/<(?:rect|path)\b/i.test(source),
		`${file} has no hand-inlined rect or path`
	);
}

const favicon = join(root, 'app/icon.png');
check(
	existsSync(favicon) && statSync(favicon).size > 0,
	'app/icon.png exists and is not empty'
);

if (failures.length > 0) {
	console.error(`\nartifacts: ${failures.length} failed`);
	process.exit(1);
}

console.log('\nartifacts: passed');
