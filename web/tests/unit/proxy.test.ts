import { NextRequest } from "next/server";
import { expect, test } from "vitest";
import { proxy } from "../../proxy";

function request(url: string, headers: Record<string, string> = {}) {
  const { host } = new URL(url);
  return new NextRequest(url, { headers: { host, ...headers } });
}

test("a www host redirects to the apex, permanently", () => {
  const response = proxy(request("https://www.vansiriso.uk/work?from=ask"));
  expect(response.status).toBe(308);
  expect(response.headers.get("location")).toBe(
    "https://vansiriso.uk/work?from=ask",
  );
});

test("a plain http request on the apex redirects to https", () => {
  const response = proxy(
    request("http://vansiriso.uk/report", { "x-forwarded-proto": "http" }),
  );
  expect(response.status).toBe(308);
  expect(response.headers.get("location")).toBe("https://vansiriso.uk/report");
});

test("the apex over https is served", () => {
  const response = proxy(
    request("https://vansiriso.uk/", { "x-forwarded-proto": "https" }),
  );
  expect(response.headers.get("location")).toBeNull();
});

test("the scheme header is normalised before it is compared", () => {
  for (const proto of ["HTTPS", " https ", "https, http"]) {
    const response = proxy(
      request("https://vansiriso.uk/work", { "x-forwarded-proto": proto }),
    );
    expect(response.headers.get("location"), proto).toBeNull();
  }
});

test("a canonical request is served instead of a redirect to itself", () => {
  const response = proxy(
    request("https://vansiriso.uk/work?from=ask", {
      "x-forwarded-proto": "http",
    }),
  );
  expect(response.headers.get("location")).toBeNull();
});

test("local development is never redirected to production", () => {
  for (const url of ["http://localhost:3000/", "http://127.0.0.1:3000/work"]) {
    const response = proxy(request(url));
    expect(response.headers.get("location"), url).toBeNull();
  }
});

test("a preview host is never redirected to production", () => {
  const response = proxy(request("https://van-sirisouk-git-main.vercel.app/"));
  expect(response.headers.get("location")).toBeNull();
});
