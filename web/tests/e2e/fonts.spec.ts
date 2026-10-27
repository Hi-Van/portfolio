import { expect, test } from "@playwright/test";

test("fonts are self-hosted: no third-party font request at runtime", async ({
  page,
}) => {
  const foreign: string[] = [];
  page.on("request", (request) => {
    const host = new URL(request.url()).host;
    if (
      host.includes("fonts.googleapis.com") ||
      host.includes("fonts.gstatic.com")
    ) {
      foreign.push(request.url());
    }
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(foreign).toEqual([]);
});
