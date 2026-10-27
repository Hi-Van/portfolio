#!/usr/bin/env node
// Reports transferred client script per surface, from the running site.

import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const routes = ["/", "/work", "/report", "/about", "/ask"];
const browser = await chromium.launch();

for (const route of routes) {
  const page = await browser.newPage();
  await page.goto(base + route, { waitUntil: "networkidle" });
  const { js, css, total } = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource");
    const sum = (list) =>
      list.reduce(
        (acc, entry) =>
          acc + (entry.transferSize || entry.encodedBodySize || 0),
        0,
      );
    const isJs = (entry) => entry.name.endsWith(".js");
    const isCss = (entry) => entry.name.endsWith(".css");
    return {
      js: sum(resources.filter(isJs)),
      css: sum(resources.filter(isCss)),
      total: sum(resources),
    };
  });
  process.stdout.write(
    `${route.padEnd(8)} js ${(js / 1024).toFixed(0).padStart(4)} KiB   css ${(css / 1024).toFixed(0).padStart(3)} KiB   total ${(total / 1024).toFixed(0).padStart(4)} KiB\n`,
  );
  await page.close();
}

await browser.close();
