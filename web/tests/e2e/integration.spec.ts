import { expect, test } from "@playwright/test";

const SURFACES = ["/", "/work", "/report", "/about", "/ask"];
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 900 },
  { width: 1440, height: 1000 },
];
const PAPER = "rgb(255, 255, 255)";
const GROUND = "rgb(12, 16, 24)";

function background(page: import("@playwright/test").Page) {
  return page.evaluate(
    () => getComputedStyle(document.documentElement).backgroundColor,
  );
}

test("every surface, at every width, in both themes, without horizontal overflow", async ({
  page,
}) => {
  for (const viewport of VIEWPORTS) {
    await page.setViewportSize(viewport);
    for (const theme of ["light", "dark"] as const) {
      await page.addInitScript(
        (value) => window.localStorage.setItem("vs-theme", value),
        theme,
      );
      for (const route of SURFACES) {
        await page.goto(route);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        expect(
          await background(page),
          `${route} ${theme} ${viewport.width}`,
        ).toBe(theme === "light" ? PAPER : GROUND);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(
          overflow,
          `${route} ${theme} ${viewport.width}`,
        ).toBeLessThanOrEqual(0);
      }
    }
  }
});

test.describe("without scripting", () => {
  test.use({ javaScriptEnabled: false });

  test("every surface is readable and the theme follows the system", async ({
    page,
  }) => {
    for (const route of SURFACES) {
      await page.goto(route);
      await expect(
        page.getByRole("heading", { level: 1 }),
        route,
      ).toBeVisible();
      await expect(page.locator("footer"), route).toBeVisible();
    }
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    expect(await background(page)).toBe(GROUND);
  });

  test("the report is complete: five figures and the default output", async ({
    page,
  }) => {
    await page.goto("/report");
    await expect(page.locator("figure")).toHaveCount(5);
    await expect(page.getByText("782,925")).toBeVisible();
    await expect(page.getByText("Not measured")).toBeVisible();
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("no surface runs a transition", async ({ page }) => {
    for (const route of SURFACES) {
      await page.goto(route);
      const longest = await page.evaluate(() => {
        let worst = 0;
        for (const element of document.querySelectorAll("*")) {
          const duration = getComputedStyle(element).transitionDuration;
          for (const part of duration.split(",")) {
            const seconds = part.trim().endsWith("ms")
              ? Number.parseFloat(part) / 1000
              : Number.parseFloat(part);
            if (Number.isFinite(seconds)) worst = Math.max(worst, seconds);
          }
        }
        return worst;
      });
      expect(longest, route).toBeLessThanOrEqual(0.001);
    }
  });
});

test("the skip link is first in the document on every surface", async ({
  page,
  browserName,
}) => {
  for (const route of SURFACES) {
    await page.goto(route);
    // DOM order is the platform-independent claim.
    const first = await page.evaluate(() => {
      const focusable = document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      return focusable[0]?.textContent?.trim() ?? "";
    });
    expect(first, route).toMatch(/skip to content/i);

    // WebKit on macOS does not tab to links unless the reader enables it, so
    // the keyboard path is asserted where the platform provides it.
    if (browserName === "webkit") continue;
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus"), route).toHaveText(/skip to content/i);
    await page.keyboard.press("Enter");
    await expect(page.locator("#main"), route).toBeFocused();
  }
});
