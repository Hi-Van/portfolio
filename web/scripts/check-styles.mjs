#!/usr/bin/env node
// Tailwind fails silently on an unknown utility, so this is the other half of the
// cleared palette: no arbitrary value and no raw colour may appear in a class
// string or an inline style.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components"];
const RAW_COLOUR = /#[0-9a-fA-F]{3,8}\b/;
// An arbitrary value carries a digit or a colour. `data-[selected]` does not,
// so state variants from the primitives pass.
const ARBITRARY = /[a-z-]+-\[[^\]]*[0-9#][^\]]*\]/g;
// One token set serves both themes, so a dark: variant means a second copy.
const DARK_VARIANT = /\bdark:/;

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
    if (RAW_COLOUR.test(line)) {
      offences.push(
        `${file}:${index + 1} raw colour  ${line.trim().slice(0, 70)}`,
      );
    }
    if (DARK_VARIANT.test(line)) {
      offences.push(
        `${file}:${index + 1} dark: variant  ${line.trim().slice(0, 70)}`,
      );
    }
    for (const hit of line.matchAll(ARBITRARY)) {
      offences.push(`${file}:${index + 1} arbitrary value  ${hit[0]}`);
    }
  });
}

if (offences.length > 0) {
  process.stderr.write(
    `check-styles: these bypass the token set\n${offences.map((o) => `  ${o}`).join("\n")}\n` +
      "Use a contract token, or add the value to the theme block in app/globals.css.\n",
  );
  process.exit(1);
}

process.stdout.write(
  `check-styles: ${files.length} components, no arbitrary values or raw colours\n`,
);
