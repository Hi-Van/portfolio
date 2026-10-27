import { expect, test } from "@playwright/test";
import { site } from "../../content/site";

test("the about surface carries the bio, the facts, and the contact card", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { level: 1, name: "About" }),
  ).toBeVisible();
  await expect(page.getByText(/Software engineer in New York/)).toBeVisible();
  for (const label of ["Currently", "Based in", "Experience", "Focus"]) {
    await expect(page.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(
    page.locator("#main").getByRole("link", { name: site.email }),
  ).toBeVisible();
});

test("the about surface reflows at the narrowest viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about");
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
  await expect(page.getByText(/Software engineer in New York/)).toBeVisible();
});

test("every mail to link on every surface is the one constant", async ({
  page,
}) => {
  let total = 0;
  for (const route of ["/", "/work", "/about", "/report", "/ask"]) {
    await page.goto(route);
    const hrefs = await page
      .locator('a[href^="mailto:"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
    for (const href of hrefs) {
      expect(href).toBe(`mailto:${site.email}`);
      total += 1;
    }
  }
  expect(total).toBeGreaterThanOrEqual(8);
});
