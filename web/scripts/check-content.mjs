#!/usr/bin/env node
// A surface may only print a number it took from the fact registry. This scans
// JSX text nodes for digits, because that is where prose lives. Expressions and
// attributes are left alone: they are the normal path for a registered fact.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components"];
const TEXT_NODE_WITH_DIGIT = />([^<>{}]*\d[^<>{}]*)</g;
const EXEMPT = /content-literal-ok/;

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = ROOTS.flatMap(walk).filter((file) => file.endsWith(".tsx"));
const offences = [];

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    if (EXEMPT.test(line)) return;
    for (const match of line.matchAll(TEXT_NODE_WITH_DIGIT)) {
      const text = match[1].trim();
      if (!/\d/.test(text)) continue;
      offences.push(`${file}:${index + 1}  ${text.slice(0, 60)}`);
    }
  });
}

if (offences.length > 0) {
  process.stderr.write(
    "check-content: these surfaces print a number outside the fact registry\n" +
      `${offences.map((line) => `  ${line}`).join("\n")}\n` +
      "Render the value from content/facts.ts instead, or annotate the line with content-literal-ok.\n",
  );
  process.exit(1);
}

process.stdout.write(
  `check-content: ${files.length} surfaces, no unregistered numbers\n`,
);
