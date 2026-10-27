import { expect, test } from "@playwright/test";

test("the home surface states who, what, and three measured results", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Van Sirisouk" })).toBeVisible();
  await expect(page.getByText("Software Engineer II")).toBeVisible();
  await expect(page.getByText("Atlassian")).toBeVisible();
  await expect(page.getByText("New York")).toBeVisible();
  await expect(
    page.getByText(/I build the systems behind product data/),
  ).toBeVisible();
});

test("every band cell shows a registered number and links into the work surface", async ({ page }) => {
  await page.goto("/");
  const band = page.getByRole("list").first();
  const links = band.getByRole("link");
  await expect(links).toHaveCount(3);
  const texts = await links.allInnerTexts();
  expect(texts[0]).toContain("450,000");
  expect(texts[1]).toContain("390,000");
  expect(texts[2]).toContain("30%");
  for (const href of await links.evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("href")),
  )) {
    expect(href).toBe("/work");
  }
});

test("the band points at the report for what the cut is worth", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: /worth at scale/i });
  await expect(link).toHaveAttribute("href", "/report");
});

test("the home surface carries no report furniture", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/^abstract$/i)).toHaveCount(0);
  await expect(page.getByText(/^method$/i)).toHaveCount(0);
  await expect(page.locator("figure")).toHaveCount(0);
  const headings = await page.locator("h1, h2, h3").allInnerTexts();
  expect(headings.filter((text) => /^\d+\./.test(text.trim()))).toEqual([]);
});
