#!/usr/bin/env node
// Every source file must be named in a context document, so the next agent can
// find it. Context includes every AGENTS.md in the tree, so a folder's
// navigation file can name its own files. Dependency folders, build output, and
// generated artefacts are excluded; the test tree is named as a directory.

import { readdirSync, readFileSync, statSync } from "node:fs";
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

const text = docs();
const files = [
  ...SOURCE_DIRS.flatMap((dir) => {
    try {
      return walk(join(web, dir));
    } catch {
      return [];
    }
  }),
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

if (missing.length > 0) {
  process.stderr.write(
    `check-artifacts: ${missing.length} source file(s) named nowhere\n` +
      `${missing.map((file) => `  ${file}`).join("\n")}\n` +
      "Name each one in an AGENTS.md, README.md, DESIGN.md, or the design-system tree.\n",
  );
  process.exit(1);
}

process.stdout.write(`check-artifacts: ${counted} source files, all named\n`);
