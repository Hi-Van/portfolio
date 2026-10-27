import { expect, test } from "@playwright/test";
import { readingMinutes, wordCount } from "../../content/report";

test("the report is a document: masthead, abstract, numbered sections, method, contact", async ({ page }) => {
  await page.goto("/report");
  await expect(page.getByRole("heading", { level: 1, name: /catalog learns to file itself/i })).toBeVisible();
  await expect(page.locator("#abstract").getByText("Abstract", { exact: true })).toBeVisible();
  for (const title of ["The same shirt, six ways", "Three systems", "What it adds up to", "Method"]) {
    await expect(page.getByRole("heading", { name: new RegExp(title, "i") })).toBeVisible();
  }
  await expect(page.getByText(/About the author/)).toBeVisible();
});

test("the stated reading time matches the word count", async ({ page }) => {
  const expected = new RegExp(`${readingMinutes()} minute read`);
  expect(wordCount()).toBeGreaterThan(200);
  await page.goto("/report");
  await expect(page.getByText(expected)).toBeVisible();
});

test("prose and figures share one column", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/report");
  const paragraph = page.locator("#problem p").first();
  const figure = page.locator("figure").first();
  const [p, f] = [await paragraph.boundingBox(), await figure.boundingBox()];
  expect(p).not.toBeNull();
  expect(f).not.toBeNull();
  expect(Math.abs(p!.width - f!.width)).toBeLessThanOrEqual(1);
});

test("five figures with captions that state an assumption", async ({ page }) => {
  await page.goto("/report");
  await expect(page.locator("figure")).toHaveCount(5);
  const captions = await page.locator("figcaption").allInnerTexts();
  expect(captions).toHaveLength(5);
  expect(captions[0]).toMatch(/Illustrative/);
  expect(captions[1]).toMatch(/index is the measurement/);
  expect(captions[2]).toMatch(/estimate/);
  expect(captions[3]).toMatch(/projection/);
  expect(captions[4]).toMatch(/assumptions/);
});

test("the model's default state matches the registry", async ({ page }) => {
  await page.goto("/report");
  await expect(page.getByText("782,925")).toBeVisible();
  await expect(page.getByRole("slider")).toHaveCount(2);
});

test("both sliders meet the target floor", async ({ page }) => {
  await page.goto("/report");
  const sliders = page.getByRole("slider");
  for (let index = 0; index < 2; index += 1) {
    const box = await sliders.nth(index).boundingBox();
    expect(box, `slider ${index}`).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  }
});

test("changing an assumption recomputes the output and the chart", async ({ page }) => {
  await page.goto("/report");
  const before = await page.getByText("seller-hours returned in a year").locator("..").innerText();
  const share = page.getByRole("slider").first();
  await share.focus();
  for (let step = 0; step < 3; step += 1) await page.keyboard.press("ArrowRight");
  const after = await page.getByText("seller-hours returned in a year").locator("..").innerText();
  expect(after).not.toBe(before);
});

test("the section navigation states position and stays reachable at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/report");
  const nav = page.getByRole("navigation", { name: "Report sections" });
  const links = nav.getByRole("link");
  await expect(links).toHaveCount(6);
  for (const link of await links.all()) {
    await expect(link).toBeVisible();
  }
  await page.locator("#scale").scrollIntoViewIfNeeded();
  await expect(nav.getByRole("link", { name: "3 Scale" })).toHaveAttribute("aria-current", "location");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test.describe("without scripting", () => {
  test.use({ javaScriptEnabled: false });

  test("all five figures and the default outputs are present", async ({ page }) => {
    await page.goto("/report");
    await expect(page.locator("figure")).toHaveCount(5);
    await expect(page.getByText("782,925")).toBeVisible();
    await expect(page.getByRole("slider")).toHaveCount(2);
    const cells = await page.locator("figure").nth(2).locator(".fill-chart-cell").count();
    expect(cells).toBe(104);
    const paths = await page.locator("svg path").count();
    expect(paths).toBeGreaterThanOrEqual(3);
  });

  test("the reading column reflows at 390", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/report");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.locator("#abstract").getByText("Abstract", { exact: true })).toBeVisible();
  });
});

test("mounting the model produces no hydration warning", async ({ page }) => {
  const problems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      const text = message.text();
      if (/hydrat|did not match/i.test(text)) problems.push(text);
    }
  });
  await page.goto("/report");
  await expect(page.getByText("782,925")).toBeVisible();
  expect(problems).toEqual([]);
});

test("chart labels stay legible at the reading measure and on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 960, height: 900 });
  await page.goto("/report");
  const wide = await page.locator("figure").nth(3).locator("text").first().evaluate(
    (node) => node.getBoundingClientRect().height,
  );
  expect(wide).toBeGreaterThanOrEqual(10);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/report");
  const narrow = await page.locator("figure").nth(3).locator("text").first().evaluate(
    (node) => node.getBoundingClientRect().height,
  );
  expect(narrow).toBeGreaterThanOrEqual(9);
});
