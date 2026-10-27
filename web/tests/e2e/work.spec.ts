import { expect, test } from "@playwright/test";

test("the work surface shows roles, systems, and the figures behind them", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(
    page.getByRole("heading", { level: 1, name: "Work" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /FAIR AI/ })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Catalog cleanup/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Catalog cleanup" }),
  ).toBeVisible();
  await expect(page.getByText("450,000")).toBeVisible();
  await expect(page.getByText("390,000")).toBeVisible();
  await expect(page.getByText("30%")).toBeVisible();
});

test("Meta figures stay on the work surface and render from the registry", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page.getByText("600,000")).toBeVisible();
  await expect(page.getByText("350%")).toBeVisible();
  await expect(page.getByText("67%")).toBeVisible();

  await page.goto("/");
  await expect(page.getByText("600,000")).toHaveCount(0);
  await page.goto("/report");
  await expect(page.getByText("600,000")).toHaveCount(0);
});

test("every deep link into the report lands on a section that exists", async ({
  page,
}) => {
  await page.goto("/work");
  const hrefs = await page
    .locator('a[href^="/report#"]')
    .evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("href") ?? ""),
    );
  expect(hrefs.length).toBeGreaterThanOrEqual(3);

  await page.goto("/report");
  for (const href of new Set(hrefs)) {
    const id = href.split("#")[1];
    await expect(page.locator(`#${id}`), `anchor ${id}`).toHaveCount(1);
  }
});
