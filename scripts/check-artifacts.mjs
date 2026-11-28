// Artifact check: generated inline art, the icon shell, and the favicon.
// The nav mark and the footer scene are the only hand-inlined SVG on
// the page, their markup carries no sprite, symbol sheet, or remote reference,
// and their rendered rect counts are asserted in the browser suite.
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
const ART_WRAPPERS = [
	'components/icons/nav-mark.tsx',
	'components/icons/footer-scene.tsx',
];

const navMarkup = read(NAV_MARKUP);
const footerMarkup = read(FOOTER_MARKUP);

check(navMarkup !== null, `${NAV_MARKUP} exists`);
check(footerMarkup !== null, `${FOOTER_MARKUP} exists`);

if (navMarkup !== null) {
	check(!/<svg\b/i.test(navMarkup), 'nav mark holds inner markup only');
}

if (footerMarkup !== null) {
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

function importsIn(source) {
	const modules = [];
	for (const match of source.matchAll(
		/(?:from\s+|import\s+)['"]([^'"]+)['"]/g
	)) {
		modules.push(match[1]);
	}
	return modules;
}

const DISALLOWED_ICON_MODULES =
	/^(?:lucide-react|react-icons(?:\/.*)?|@heroicons\/.*|@tabler\/icons.*|@phosphor-icons\/.*|@radix-ui\/react-icons)$/;

function sourceFiles(dir) {
	const absolute = join(root, dir);
	if (!existsSync(absolute)) {
		return [];
	}

	return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
		const relative = join(dir, entry.name);

		if (entry.isDirectory()) {
			return sourceFiles(relative);
		}

		return /\.(ts|tsx)$/.test(entry.name) ? [relative] : [];
	});
}

for (const file of [...sourceFiles('components'), ...sourceFiles('content')]) {
	const source = read(file);

	if (source === null) {
		continue;
	}

	for (const moduleName of importsIn(source)) {
		check(
			!DISALLOWED_ICON_MODULES.test(moduleName),
			`${file} does not import ${moduleName}`
		);
	}
}

for (const file of [REGISTRY, ...ART_WRAPPERS]) {
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

// The built document. These are the runtime half of the port contract: the
// theme is chosen before paint, the language and colour-scheme are declared,
// the metadata is exact, and no font host is named anywhere.
const BUILT_HTML = 'out/index.html';
const BUILT_TITLE = 'Van Sirisouk, software engineer';
const BUILT_DESCRIPTION =
	'Van Sirisouk is a software engineer in New York. Product data, catalogs, pipelines, and the forms that keep supplier data usable at scale.';
const builtHtml = read(BUILT_HTML);

check(builtHtml !== null, `${BUILT_HTML} exists (run npm run build)`);

if (builtHtml !== null) {
	check(builtHtml.includes('vs-theme'), `${BUILT_HTML} names the theme key`);
	check(
		/<html\b[^>]*\blang="en"/.test(builtHtml),
		`${BUILT_HTML} sets html lang to en`
	);
	check(
		/<meta name="color-scheme" content="light dark"/.test(builtHtml),
		`${BUILT_HTML} declares color-scheme light dark`
	);
	check(
		builtHtml.includes(`<title>${BUILT_TITLE}</title>`),
		`${BUILT_HTML} has the exact title`
	);
	check(
		builtHtml.includes(`content="${BUILT_DESCRIPTION}"`),
		`${BUILT_HTML} has the exact description`
	);

	const themeScript = builtHtml.match(
		/<script\b([^>]*)>([^<]*vs-theme[^<]*)<\/script>/
	);

	check(themeScript !== null, `${BUILT_HTML} has an inline theme script`);

	if (themeScript) {
		const attributes = themeScript[1];
		const scriptIndex = themeScript.index ?? -1;
		const headOpen = builtHtml.indexOf('<head');
		const headClose = builtHtml.indexOf('</head>');
		const bodyOpen = builtHtml.indexOf('<body');

		check(
			!/\bsrc\s*=/.test(attributes),
			'theme script has no src attribute'
		);
		check(!/\bdefer\b/.test(attributes), 'theme script is not deferred');
		check(!/\basync\b/.test(attributes), 'theme script is not async');
		check(
			scriptIndex > headOpen && headOpen !== -1,
			'theme script sits inside head'
		);
		check(
			scriptIndex < headClose && headClose !== -1,
			'theme script sits before head closes'
		);
		check(
			scriptIndex < bodyOpen && bodyOpen !== -1,
			'theme script sits before body opens'
		);
	}

	check(
		!/fonts\.(googleapis|gstatic)\.com/.test(builtHtml),
		`${BUILT_HTML} names no Google Fonts host`
	);
}

if (failures.length > 0) {
	console.error(`\nartifacts: ${failures.length} failed`);
	process.exit(1);
}

console.log('\nartifacts: passed');
