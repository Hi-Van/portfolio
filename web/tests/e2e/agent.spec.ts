import { expect, test } from "@playwright/test";

const WALMART = "What did he ship at Walmart?";

async function ask(page: import("@playwright/test").Page, question: string) {
  await page
    .getByRole("textbox", { name: "Ask about this site" })
    .fill(question);
  await page.keyboard.press("Enter");
}

test("the agent is its own surface with a composer, a transcript, and a way back", async ({
  page,
}) => {
  await page.goto("/ask");
  await expect(
    page.getByRole("heading", { level: 1, name: "Ask" }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Ask about this site" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
  await expect(
    page.locator("header").getByRole("link", { name: /^Ask$/ }),
  ).toHaveAttribute("aria-current", "page");
});

test("an answer streams in and cites the page it came from", async ({
  page,
}) => {
  await page.goto("/ask");
  await ask(page, WALMART);
  await expect(page.getByRole("article").last()).toContainText("30% faster");
  const citation = page.getByRole("link", { name: "work, Walmart" });
  await expect(citation).toHaveAttribute("href", "/work#walmart");
  await expect(page.getByText("Site agent")).toBeVisible();
  await expect(page.getByText("You", { exact: true })).toBeVisible();
});

test("every citation resolves to an anchor that exists", async ({ page }) => {
  await page.goto("/ask");
  await ask(page, "What is the 22% number?");
  const link = page.locator("article").last().getByRole("link").first();
  const href = await link.getAttribute("href");
  expect(href).toContain("#");
  const [path, anchor] = href!.split("#");
  await page.goto(path);
  await expect(page.locator(`#${anchor}`)).toHaveCount(1);
});

test("an answer outside the site is refused and says so in clay", async ({
  page,
}) => {
  await page.goto("/ask");
  await ask(page, "What is his favourite colour?");
  const answer = page.getByRole("article").last();
  await expect(answer).toContainText("Not stated on the site.");
  await expect(answer.getByText(/does not guess/)).toBeVisible();
});

test("the answer is announced once, not fragment by fragment", async ({
  page,
}) => {
  await page.goto("/ask");
  await ask(page, WALMART);
  const status = page.getByRole("status");
  await expect(status).toHaveText(/^Answer: /);
  const text = await status.textContent();
  expect(text).toContain("30% faster");
});

test("the conversation survives navigation and clears on a reload", async ({
  page,
}) => {
  await page.goto("/ask");
  await ask(page, WALMART);
  await expect(page.getByRole("article").last()).toContainText("30% faster");

  await page.getByRole("link", { name: "Work", exact: true }).first().click();
  await expect(page).toHaveURL(/\/work/);
  await page.locator("header").getByRole("link", { name: /^Ask$/ }).click();
  await expect(page.getByRole("article").first()).toContainText(WALMART);

  await page.reload();
  await expect(page.getByRole("article")).toHaveCount(0);
  await expect(page.getByRole("button", { name: WALMART })).toBeVisible();
});

test("the composer keeps a second question out while one is arriving", async ({
  page,
}) => {
  await page.route("**/api/ask", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    await route.continue();
  });
  await page.goto("/ask");
  await ask(page, WALMART);
  await expect(
    page.getByRole("button", { name: /stop the answer/i }),
  ).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: /stop the answer/i }),
  ).toBeVisible();
});

test("a failure offers a retry that works", async ({ page }) => {
  let first = true;
  await page.route("**/api/ask", async (route) => {
    if (first) {
      first = false;
      await route.abort();
      return;
    }
    await route.continue();
  });
  await page.goto("/ask");
  await ask(page, WALMART);
  await expect(page.getByText(/did not arrive/)).toBeVisible();
  await page.getByRole("button", { name: /try again/i }).click();
  await expect(page.getByRole("article").last()).toContainText("30% faster");
});

test("the return control and Escape both go back to the surface of origin", async ({
  page,
}) => {
  await page.goto("/work");
  await page.locator("header").getByRole("link", { name: /^Ask$/ }).click();
  await expect(page.getByRole("link", { name: /back to work/i })).toBeVisible();
  await page.getByRole("link", { name: /back to work/i }).click();
  await expect(page).toHaveURL(/\/work$/);

  await page.locator("header").getByRole("link", { name: /^Ask$/ }).click();
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/\/work$/);
});

test("suggested questions are real questions and meet the target floor", async ({
  page,
}) => {
  await page.goto("/ask");
  const suggestions = page.locator("button", { hasText: "?" });
  const count = await suggestions.count();
  expect(count).toBeGreaterThanOrEqual(3);
  for (let index = 0; index < count; index += 1) {
    const box = await suggestions.nth(index).boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }

  await suggestions.first().click();
  await expect(page.getByRole("article").last()).not.toContainText(
    "Not stated on the site.",
  );
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("a new row lands in its end state with no travel", async ({ page }) => {
    await page.goto("/ask");
    await ask(page, WALMART);
    const row = page.getByRole("article").last();
    await expect(row).toBeVisible();
    const transform = await row.evaluate(
      (node) => getComputedStyle(node).transform,
    );
    expect(transform).toBe("none");
  });
});

test("a foreign return parameter lands on home", async ({ page }) => {
  await page.goto("/ask?from=https://evil.example/steal");
  await expect(
    page.getByRole("link", { name: /back to home/i }),
  ).toHaveAttribute("href", "/");
});
