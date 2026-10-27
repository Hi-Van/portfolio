import { expect, test } from "@playwright/test";

test("print puts black on white regardless of the screen theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", media: "print" });
  await page.goto("/");
  const styles = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    return { background: root.backgroundColor, colour: root.color };
  });
  expect(styles.background).toBe("rgb(255, 255, 255)");
  expect(styles.colour).toBe("rgb(0, 0, 0)");
});
