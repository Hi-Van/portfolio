#!/usr/bin/env node
// Runs every check and reports each one, so a failure in one does not hide the others.
// Exits non-zero if any step fails.

import { spawnSync } from "node:child_process";

const steps = [
  ["tokens", process.execPath, ["scripts/check-tokens.mjs"]],
  ["artifacts", process.execPath, ["scripts/check-artifacts.mjs"]],
  ["content", process.execPath, ["scripts/check-content.mjs"]],
  ["styles", process.execPath, ["scripts/check-styles.mjs"]],
  ["contrast", process.execPath, ["scripts/contrast.mjs"]],
  ["unit", "node_modules/.bin/vitest", ["run"]],
  ["e2e", "node_modules/.bin/playwright", ["test"]],
  ["bundle", process.execPath, ["scripts/check-bundle.mjs"]],
];

let failed = 0;

for (const [name, command, args] of steps) {
  process.stdout.write(`\n== ${name} ==\n`);
  const result = spawnSync(command, args, { stdio: "inherit" });
  const ok = result.status === 0;
  if (!ok) failed += 1;
  process.stdout.write(`== ${name}: ${ok ? "pass" : "FAIL"} ==\n`);
}

process.stdout.write(
  failed === 0
    ? "\nall checks passed\n"
    : `\n${failed} check${failed === 1 ? "" : "s"} failed\n`,
);

process.exit(failed === 0 ? 0 : 1);
