#!/usr/bin/env node
// Renders the share image from the site itself, so the card uses the same
// tokens as the page. Requires a running server: set BASE_URL if it is not
// http://localhost:3000.

import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(base, { waitUntil: "networkidle" });
await page.screenshot({ path: "public/og.png" });
await browser.close();
process.stdout.write("wrote public/og.png at 1200 by 630\n");
