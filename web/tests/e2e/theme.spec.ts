import { expect, test } from "@playwright/test";

const PAPER = "rgb(255, 255, 255)";
const GROUND = "rgb(12, 16, 24)";

async function htmlBackground(page: import("@playwright/test").Page) {
  return page.evaluate(() =>
    getComputedStyle(document.documentElement).backgroundColor,
  );
}

test("a reader with no stored choice paints from the system preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  expect(await htmlBackground(page)).toBe(GROUND);
});

test("a stored choice applies once interactive and wins over the system", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => window.localStorage.setItem("vs-theme", "light"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await htmlBackground(page)).toBe(PAPER);
});

test("the control writes the choice and announces the state it is showing", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /switch to dark theme/i });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await htmlBackground(page)).toBe(GROUND);
  await expect(page.getByRole("button", { name: /switch to light theme/i })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test.describe("with scripting unavailable", () => {
  test.use({ javaScriptEnabled: false });

  test("the system preference stands and the page stays readable", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    expect(await htmlBackground(page)).toBe(GROUND);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
