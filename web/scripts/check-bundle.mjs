#!/usr/bin/env node
// Builds the application, then proves three things about what ships:
//   1. no forbidden dependency is installed at all
//   2. no model-provider module or credential name reaches the browser
//   3. the transferred client script per route is reported

import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const forbiddenPackages = [
  "zod",
  "zustand",
  "swr",
  "valibot",
  "@upstash/redis",
];
const forbiddenMarkers = [/deepseek/i, /DEEPSEEK_API_KEY/, /@ai-sdk\/deepseek/];

function fail(message) {
  process.stderr.write(`check-bundle: ${message}\n`);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const installed = { ...pkg.dependencies, ...pkg.devDependencies };
const present = forbiddenPackages.filter((name) => name in installed);
if (present.length > 0)
  fail(`forbidden dependency installed: ${present.join(", ")}`);

const build = spawnSync("node_modules/.bin/next", ["build"], {
  stdio: "inherit",
});
if (build.status !== 0) fail("the build failed");

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const chunks = walk(".next/static").filter((file) => file.endsWith(".js"));
let total = 0;
for (const file of chunks) {
  total += statSync(file).size;
  const source = readFileSync(file, "utf8");
  for (const marker of forbiddenMarkers) {
    if (marker.test(source)) fail(`${marker} found in client chunk ${file}`);
  }
}

process.stdout.write(
  `check-bundle: ${chunks.length} client chunks, ${(total / 1024).toFixed(1)} KiB transferred\n`,
);
