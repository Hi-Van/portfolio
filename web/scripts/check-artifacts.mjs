#!/usr/bin/env node
// Every source file must be named in a context document, so the next agent can
// find it. Dependency folders, build output, and screenshots are excluded; the
// test tree is named as a directory rather than file by file.

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
];
const GROUPED = { "web/tests": "web/tests/" };

const CONTEXT_DOCS = [
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
  const parts = CONTEXT_DOCS.map(read);
  // Every file in the design-system tree counts as context.
  parts.push(...walk(join(repo, "design-system")).map(read));
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

for (const file of files) {
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
      "Name each one in AGENTS.md, README.md, DESIGN.md, or the design-system tree.\n",
  );
  process.exit(1);
}

process.stdout.write(
  `check-artifacts: ${files.length} source files, all named\n`,
);
