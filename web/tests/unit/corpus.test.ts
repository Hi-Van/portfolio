import { expect, test } from "vitest";
import { corpus } from "../../content/corpus";
import { report } from "../../content/report";
import { work } from "../../content/work";

test("every anchor a reader could ask about has a chunk", () => {
  const anchors = new Set(
    corpus.map((chunk) => `${chunk.surface}#${chunk.anchor ?? ""}`),
  );
  for (const section of report.sections) {
    expect(anchors.has(`report#${section.id}`), section.id).toBe(true);
    for (const sub of section.subsections ?? []) {
      expect(anchors.has(`report#${sub.id}`), sub.id).toBe(true);
    }
  }
  for (const role of work.roles) {
    expect(anchors.has(`work#${role.anchor}`), role.anchor).toBe(true);
  }
});

test("no two chunks share an anchor", () => {
  const keys = corpus.map((chunk) => `${chunk.surface}#${chunk.anchor ?? ""}`);
  expect(new Set(keys).size).toBe(keys.length);
});

test("every chunk cites itself and has keywords", () => {
  for (const chunk of corpus) {
    const expected = chunk.surface === "home" ? "/" : `/${chunk.surface}`;
    expect(chunk.href.startsWith(expected), chunk.href).toBe(true);
    expect(chunk.keywords.length, chunk.heading).toBeGreaterThan(2);
  }
});
