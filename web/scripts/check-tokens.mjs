#!/usr/bin/env node
// DESIGN.md is the contract for colour. This fails when the stylesheet and the
// contract disagree in either direction, when a contract role is missing from
// the Tailwind theme block, or when a raw variable is defined in one theme and
// not the other.

import { readFileSync } from "node:fs";
import {
  CSS,
  ROLE_MAP,
  readBlock,
  readContract,
  readThemeNames,
} from "./lib/tokens.mjs";

const contract = readContract();
const css = readFileSync(CSS, "utf8");
const light = readBlock(css, ":root {");
const dark = readBlock(css, '[data-theme="dark"] {');
const media = readBlock(css, ':root:not([data-theme="light"]) {');
const themeNames = readThemeNames(css);

const problems = [];

const contractKeys = Object.keys(contract).sort();
const mapped = Object.keys(ROLE_MAP).sort();
if (contractKeys.join() !== mapped.join()) {
  problems.push(
    `DESIGN.md colours changed shape. The contract has ${contractKeys.join(", ")}; the check maps ${mapped.join(", ")}.`,
  );
}

for (const [key, role] of Object.entries(ROLE_MAP)) {
  const expected = contract[key];
  if (!expected) continue;
  const actual = light[`--${role}`];
  if (!actual) {
    problems.push(
      `--${role} is missing from the light scope (DESIGN.md colors.${key})`,
    );
  } else if (actual.toLowerCase() !== expected) {
    problems.push(
      `--${role} is ${actual}, DESIGN.md colors.${key} is ${expected}`,
    );
  }
  if (!themeNames.includes(`--color-${role}`)) {
    problems.push(
      `--color-${role} is not in the Tailwind theme block, so no utility can use it`,
    );
  }
}

// The eight contract roles are compared by hex above. Every other colour
// variable in the stylesheet needs a theme entry too, or the utility that reads
// it disappears with no error: an axis line, a band, a border. Reading :root
// keeps this in step with the stylesheet without a second hard-coded list.
const roleVars = new Set(Object.values(ROLE_MAP));
for (const name of Object.keys(light)) {
  const role = name.replace(/^--/, "");
  if (roleVars.has(role)) continue;
  const utility = `--color-${role}`;
  if (!themeNames.includes(utility)) {
    problems.push(
      `${utility} is not in the Tailwind theme block, so ${name} has no utility`,
    );
  }
}

const lightNames = Object.keys(light).sort();

for (const [label, vars] of [
  ["[data-theme=dark]", dark],
  ["the system-preference scope", media],
]) {
  for (const name of lightNames) {
    if (!(name in vars))
      problems.push(`${name} is in :root but not in ${label}`);
  }
  for (const name of Object.keys(vars)) {
    if (!(name in light))
      problems.push(`${name} is in ${label} but not in :root`);
  }
}

if (problems.length > 0) {
  process.stderr.write(
    `check-tokens: ${problems.length} problem(s)\n${problems.map((p) => `  ${p}`).join("\n")}\n`,
  );
  process.exit(1);
}

process.stdout.write(
  `check-tokens: ${Object.keys(contract).length} role colours agree with DESIGN.md, ` +
    `${lightNames.length} raw variables complete across three scopes\n`,
);
