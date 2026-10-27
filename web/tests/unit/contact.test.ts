import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import { fact, factsFor } from "../../content/facts";
import { site } from "../../content/site";

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

test("the address is written once and read everywhere", () => {
  const files = [
    ...walk("app"),
    ...walk("components"),
    ...walk("content"),
  ].filter((file) => /\.(ts|tsx)$/.test(file));
  const holders = files.filter((file) =>
    readFileSync(file, "utf8").includes(site.email),
  );
  expect(holders).toEqual(["content/site.ts"]);
});

test("no Meta figure can be reached from the home or report surfaces", () => {
  for (const surface of ["home", "report"] as const) {
    for (const entry of factsFor(surface)) {
      if (entry.provenance.kind === "measured") {
        expect(entry.provenance.where, entry.id).not.toBe("meta");
      }
    }
  }
  expect(fact("meta-queries-per-second").sources).toEqual(["work"]);
});
