import { expect, test } from "@playwright/test";
import { site } from "../../content/site";

const SURFACES = ["/", "/work", "/report", "/about", "/ask"];
const LOCAL_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  new URL(site.origin).hostname,
]);

test("every surface declares its own absolute canonical address", async ({
  page,
}) => {
  const seen = new Set<string>();
  for (const route of SURFACES) {
    await page.goto(route);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical, route).toBeTruthy();
    const atOrigin =
      canonical === site.origin || canonical!.startsWith(`${site.origin}/`);
    expect(atOrigin, `${route}: ${canonical}`).toBe(true);
    expect(canonical!.startsWith("http"), `${route}: relative canonical`).toBe(
      true,
    );
    expect(seen.has(canonical!), `${route}: duplicate canonical`).toBe(false);
    seen.add(canonical!);
  }
  expect(seen.size).toBe(SURFACES.length);
});

test("every surface carries its own title, description, and share metadata", async ({
  page,
}) => {
  for (const route of SURFACES) {
    await page.goto(route);
    const title = await page.title();
    expect(title.length, route).toBeGreaterThan(4);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description, route).toBeTruthy();
    const ogUrl = await page
      .locator('meta[property="og:url"]')
      .getAttribute("content");
    expect(ogUrl, route).toBeTruthy();
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage, route).toMatch(new RegExp(`^${site.origin}/`));
  }
});

test("the share image is the site's own and is the right size", async ({
  request,
}) => {
  const response = await request.get("/og.png");
  expect(response.status()).toBe(200);
  const body = await response.body();
  expect(body.subarray(1, 4).toString()).toBe("PNG");
  const width = body.readUInt32BE(16);
  const height = body.readUInt32BE(20);
  expect([width, height]).toEqual([1200, 630]);
});

test("crawler rules and the sitemap name the production origin only", async ({
  page,
}) => {
  await page.goto("/robots.txt");
  const robots = await page.locator("body").innerText();
  expect(robots).toContain(`${site.origin}/sitemap.xml`);

  await page.goto("/sitemap.xml");
  const sitemap = await page.locator("body").innerText();
  for (const route of SURFACES) {
    const expected = new URL(route, site.origin).toString();
    expect(sitemap, route).toContain(expected);
  }
  expect(sitemap).not.toMatch(
    /localhost|127\.0\.0\.1|vercel\.app|netlify\.app/,
  );
});

test("a missing address renders a designed surface inside the frame", async ({
  page,
}) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /does not exist/i,
  );
  await expect(page.locator("header")).toBeVisible();
  await expect(
    page.locator("#main").getByRole("link", { name: "Home" }),
  ).toBeVisible();
});

test("no surface makes a third-party request", async ({ page }) => {
  const foreign: string[] = [];
  page.on("request", (request) => {
    const host = new URL(request.url()).hostname;
    if (!LOCAL_HOSTS.has(host)) {
      foreign.push(request.url());
    }
  });
  for (const route of SURFACES) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
  }
  expect(foreign, foreign.join("\n")).toEqual([]);
});

test("the person schema names the site and the role", async ({ page }) => {
  await page.goto("/");
  const json = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .innerText();
  const data: unknown = JSON.parse(json);
  expect(data).toMatchObject({
    "@type": "Person",
    name: expect.stringContaining("Van Sirisouk"),
    url: `${site.origin}/`,
  });
});

test("nothing on any surface implies a résumé exists", async ({ page }) => {
  for (const route of SURFACES) {
    await page.goto(route);
    const text = await page.locator("body").innerText();
    expect(text, route).not.toMatch(/r[eé]sum[eé]|\bCV\b/i);
    const hrefs = await page
      .locator("a")
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("href") ?? ""),
      );
    expect(
      hrefs.filter((href) => /resume|curriculum|\/cv\b|cv\.pdf/i.test(href)),
      route,
    ).toEqual([]);
  }
});
