#!/usr/bin/env node
// Measures every text pairing in both themes. The hard gate is AA: 4.5:1 for
// text, 3:1 for a non-text indicator. The measured values it prints are what
// DESIGN.md records, so the doc cannot drift from the colours.

import { readFileSync } from "node:fs";
import { CSS, readBlock } from "./lib/tokens.mjs";

function channels(hex) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
}

function luminance(hex) {
  const [r, g, b] = channels(hex).map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

const css = readFileSync(CSS, "utf8");
const scopes = {
  light: readBlock(css, ":root {"),
  dark: readBlock(css, '[data-theme="dark"] {'),
};

// [foreground, background, kind]
const pairings = [
  ["body", "paper", "text"],
  ["body", "panel", "text"],
  ["ink", "paper", "text"],
  ["muted", "paper", "text"],
  ["muted", "panel", "text"],
  ["indigo", "paper", "text"],
  ["indigo", "panel", "text"],
  ["clay", "paper", "text"],
  ["clay", "panel", "text"],
  ["paper", "ink", "text"],
  ["indigo", "paper", "indicator"],
];

const floor = { text: 4.5, indicator: 3 };
let failed = 0;

for (const [theme, vars] of Object.entries(scopes)) {
  for (const [fg, bg, kind] of pairings) {
    const value = ratio(vars[`--${fg}`], vars[`--${bg}`]);
    const shown = Math.round(value * 10) / 10;
    const ok = value >= floor[kind];
    if (!ok) failed += 1;
    process.stdout.write(
      `${theme.padEnd(5)} ${`${fg} on ${bg}`.padEnd(16)} ${String(shown).padStart(5)}:1  ${kind.padEnd(9)} ${ok ? "pass" : "FAIL"}\n`,
    );
  }
}

process.exit(failed === 0 ? 0 : 1);
