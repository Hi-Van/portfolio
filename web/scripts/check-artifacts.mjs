#!/usr/bin/env node
// Every source file must be named in a context document, so the next agent can
// find it. Context includes every AGENTS.md in the tree, so a folder's
// navigation file can name its own files. Dependency folders, build output, and
// generated artefacts are excluded; the test tree is named as a directory.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..", "..");
const web = join(repo, "web");

const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "test-results",
  "playwright-report",
  "coverage",
  ".opencode",
  "preview",
  "assets",
  "openspec",
]);

const SOURCE_DIRS = ["app", "components", "content", "lib", "scripts", "tests"];
const ROOT_SOURCE = [
  "next.config.ts",
  "vitest.config.mts",
  "playwright.config.ts",
  "biome.json",
  "package.json",
  "tsconfig.json",
  "proxy.ts",
  "public/og.png",
];
const GROUPED = { "web/tests": "web/tests/" };

/** Documents that carry context. Every AGENTS.md counts, plus the four root docs. */
const ROOT_DOCS = [
  join(repo, "AGENTS.md"),
  join(repo, "README.md"),
  join(repo, "DESIGN.md"),
  join(repo, "design-system", "README.md"),
];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory())
      return EXCLUDED_DIRS.has(entry) ? [] : walk(path);
    return [path];
  });
}

function docs() {
  const read = (path) => {
    try {
      return readFileSync(path, "utf8");
    } catch {
      return "";
    }
  };
  const parts = ROOT_DOCS.map(read);
  // The design-system tree and every AGENTS.md are context.
  parts.push(...walk(join(repo, "design-system")).map(read));
  parts.push(
    ...walk(web)
      .filter((path) => /(^|\/)AGENTS\.md$/.test(path))
      .map(read),
  );
  return parts.join("\n");
}

// A source directory that is missing or renamed yields no files, so the
// coverage loop would report nothing and the check would pass while covering
// nothing. A root config that is gone is the same failure from the other side.
const scanned = SOURCE_DIRS.map((dir) => {
  try {
    return [dir, walk(join(web, dir))];
  } catch {
    return [dir, []];
  }
});
const silent = scanned
  .filter(([, found]) => found.length === 0)
  .map(([dir]) => `web/${dir}`);
const absent = ROOT_SOURCE.filter((file) => !existsSync(join(web, file)));

const problems = [];
if (silent.length > 0) {
  problems.push(`nothing to scan under ${silent.join(", ")}`);
}
if (absent.length > 0) {
  const names = absent.map((file) => `web/${file}`).join(", ");
  problems.push(`listed in ROOT_SOURCE but missing: ${names}`);
}
if (problems.length > 0) {
  process.stderr.write(
    `check-artifacts: ${problems.length} scan problem(s)\n` +
      `${problems.map((line) => `  ${line}`).join("\n")}\n` +
      "Restore the tree, or change the list of roots.\n",
  );
  process.exit(1);
}

const text = docs();
const files = [
  ...scanned.flatMap(([, found]) => found),
  ...ROOT_SOURCE.map((file) => join(web, file)),
];
const missing = [];
let counted = 0;

for (const file of files) {
  // A navigation file is context, not source.
  if (/(^|\/)AGENTS\.md$/.test(file)) continue;
  counted += 1;
  const rel = relative(repo, file).split("\\").join("/");
  if (text.includes(rel)) continue;
  const grouped = Object.entries(GROUPED).find(([prefix]) =>
    rel.startsWith(prefix),
  );
  if (grouped && text.includes(grouped[1])) continue;
  missing.push(rel);
}

// The coverage loop is only evidence if it counted something.
if (counted === 0) {
  process.stderr.write(
    "check-artifacts: 0 source files counted, so the coverage loop proved nothing\n" +
      "Check that the source roots hold files and that ROOT_SOURCE names real paths.\n",
  );
  process.exit(1);
}

if (missing.length > 0) {
  process.stderr.write(
    `check-artifacts: ${missing.length} source file(s) named nowhere\n` +
      `${missing.map((file) => `  ${file}`).join("\n")}\n` +
      "Name each one in an AGENTS.md, README.md, DESIGN.md, or the design-system tree.\n",
  );
  process.exit(1);
}

process.stdout.write(`check-artifacts: ${counted} source files, all named\n`);
