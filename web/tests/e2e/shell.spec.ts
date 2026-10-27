import { expect, type Page, test } from "@playwright/test";

const ROUTES = ["/", "/work", "/about", "/report", "/ask"];

async function headerOrder(page: Page) {
  return page.locator("header a, header button").evaluateAll((nodes) =>
    nodes.map((node) => ({
      text: (node.textContent ?? "").trim(),
      label: node.getAttribute("aria-label") ?? "",
      hidden: (node as HTMLElement).offsetParent === null,
    })),
  );
}

test("every surface carries the same bar in the same order", async ({
  page,
}) => {
  const seen: string[] = [];
  for (const route of ROUTES) {
    await page.goto(route);
    const controls = await headerOrder(page);
    const sequence = controls
      .filter((control) => !control.hidden)
      .map((control) => control.label || control.text)
      .join("|");
    seen.push(sequence);
  }
  expect(new Set(seen).size).toBe(1);
  expect(seen[0]).toContain("Van Sirisouk");
  expect(seen[0]).toMatch(/Work.*Report.*About/);
  expect(seen[0]).toContain("Contact");
  expect(seen[0]).toContain("Ask");
});

test("the current surface is stated in a way assistive technology announces", async ({
  page,
}) => {
  await page.goto("/work");
  const primary = page.getByRole("navigation", { name: "Primary" }).first();
  await expect(
    primary.getByRole("link", { name: "Work", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.goto("/ask");
  await expect(
    page.locator("header").getByRole("link", { name: /^Ask$/ }),
  ).toHaveAttribute("aria-current", "page");
});

test("every header and footer control meets the target floor", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/work");
  const controls = page.locator("header a, header button, footer a");
  const count = await controls.count();
  expect(count).toBeGreaterThan(6);
  for (let index = 0; index < count; index += 1) {
    const control = controls.nth(index);
    if (!(await control.isVisible())) continue;
    const box = await control.boundingBox();
    expect(box, `control ${index}`).not.toBeNull();
    expect(
      box!.height,
      `height of ${await control.innerText()}`,
    ).toBeGreaterThanOrEqual(44);
    expect(
      box!.width,
      `width of ${await control.innerText()}`,
    ).toBeGreaterThanOrEqual(44);
  }
});

test("the skip link comes first and focus is visible", async ({ page }) => {
  await page.goto("/work");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toHaveText(/skip to content/i);
  const ring = await focused.evaluate((node) => {
    const style = getComputedStyle(node);
    return { width: style.outlineWidth, offset: style.outlineOffset };
  });
  expect(ring.width).toBe("2px");
  expect(ring.offset).toBe("3px");
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test.describe("narrow viewport", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("the menu control meets the target floor at this width", async ({
    page,
  }) => {
    await page.goto("/work");
    const box = await page.getByRole("button", { name: "Menu" }).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  });

  test("the disclosure opens, moves focus in, and returns it on Escape", async ({
    page,
  }) => {
    await page.goto("/work");
    const control = page.getByRole("button", { name: "Menu" });
    await control.click();
    await expect(page.locator("#menu-panel")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Work", exact: true }).first(),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.locator("#menu-panel")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  });

  test("choosing a link closes the disclosure", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("button", { name: "Menu" }).click();
    await page
      .locator("#menu-panel")
      .getByRole("link", { name: "Work" })
      .click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.locator("#menu-panel")).toHaveCount(0);
  });

  test("widening the viewport closes the disclosure", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.locator("#menu-panel")).toBeVisible();
    await page.setViewportSize({ width: 1100, height: 844 });
    await expect(page.locator("#menu-panel")).toHaveCount(0);
  });
});

test.describe("reduced motion", () => {
  test.use({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });

  test("the disclosure appears in its end state with no travel", async ({
    page,
  }) => {
    await page.goto("/about");
    await page.getByRole("button", { name: "Menu" }).click();
    const panel = page.locator("#menu-panel");
    await expect(panel).toBeVisible();
    const transform = await panel.evaluate(
      (node) => getComputedStyle(node).transform,
    );
    expect(transform).toBe("none");
    await expect(panel).toHaveCSS("opacity", "1");
  });
});

test("no focusable element on any surface is missing a visible indicator", async ({
  page,
}) => {
  for (const route of ROUTES) {
    await page.goto(route);
    for (let step = 0; step < 12; step += 1) {
      await page.keyboard.press("Tab");
      const result = await page.evaluate(() => {
        const node = document.activeElement as HTMLElement | null;
        if (!node || node === document.body) return null;
        const style = getComputedStyle(node);
        return {
          tag: node.tagName,
          label:
            node.getAttribute("aria-label") ??
            node.textContent?.trim().slice(0, 24) ??
            "",
          width: style.outlineWidth,
          offset: style.outlineOffset,
        };
      });
      if (result === null) break;
      expect(result.width, `${route} ${result.tag} ${result.label}`).toBe(
        "2px",
      );
      expect(result.offset, `${route} ${result.tag} ${result.label}`).toBe(
        "3px",
      );
    }
  }
});

test("no surface scrolls horizontally at the narrowest viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ROUTES) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, route).toBeLessThanOrEqual(0);
  }
});
