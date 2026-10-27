#!/usr/bin/env node
// Captures the review screenshots from the running site, so every image shows
// the medium that exists. Requires a server: set BASE_URL if not localhost:3000.

import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = "../preview";
mkdirSync(out, { recursive: true });

const wide = [
  ["home", "/"],
  ["work", "/work"],
  ["report", "/report"],
  ["about", "/about"],
  ["ask", "/ask"],
];
const narrow = [
  ["home-mobile", "/"],
  ["report-mobile", "/report"],
  ["ask-mobile", "/ask"],
];

const browser = await chromium.launch();

async function shoot(name, path, viewport, dark, openMenu = false) {
  const page = await browser.newPage({ viewport });
  if (dark) {
    await page.addInitScript(() =>
      window.localStorage.setItem("vs-theme", "dark"),
    );
  }
  await page.goto(base + path, { waitUntil: "networkidle" });
  if (openMenu) {
    await page.getByRole("button", { name: "Menu" }).click();
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  await page.close();
}

for (const [name, path] of wide) {
  await shoot(name, path, { width: 1440, height: 1000 }, false);
  await shoot(`${name}-dark`, path, { width: 1440, height: 1000 }, true);
}
for (const [name, path] of narrow) {
  await shoot(name, path, { width: 390, height: 844 }, false);
}
await shoot("menu-mobile", "/work", { width: 390, height: 844 }, false, true);

await browser.close();
process.stdout.write(`wrote preview screenshots to ${out}\n`);
