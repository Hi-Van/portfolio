import { describe, expect, test } from "vitest";
import { accentFor } from "../../content/accent";
import { facts, factsFor, factValue, isFactId } from "../../content/facts";
import { factIds } from "../../content/ids";
import {
  annualSubmissions,
  DEFAULT_ASSUMPTIONS,
  sellerHoursReturned,
} from "../../content/model";
import { placeholdersIn, report } from "../../content/report";
import { isStated } from "../../content/types";

const entries = Object.values(facts);

describe("the fact registry", () => {
  test("holds every declared id exactly once", () => {
    expect(entries).toHaveLength(factIds.length);
    expect(new Set(entries.map((entry) => entry.id)).size).toBe(factIds.length);
  });

  test("holds the README's figures plus the one derived display the home band states", () => {
    const byKind = (kind: string) =>
      entries.filter((entry) => entry.provenance.kind === kind).length;
    expect(byKind("measured")).toBe(8);
    expect(byKind("derived")).toBe(4);
    expect(byKind("assumed")).toBe(3);
    expect(byKind("not-measured")).toBe(1);
    expect(entries).toHaveLength(16);
  });

  test("gives every figure a mechanism or a stated reason", () => {
    for (const entry of entries) {
      switch (entry.provenance.kind) {
        case "measured":
          expect(entry.provenance.mechanism.length, entry.id).toBeGreaterThan(
            10,
          );
          break;
        case "derived":
          expect(entry.provenance.mechanism.length, entry.id).toBeGreaterThan(
            10,
          );
          expect(entry.provenance.inputs.length, entry.id).toBeGreaterThan(0);
          break;
        case "assumed":
          expect(entry.provenance.control, entry.id).toBeTruthy();
          break;
        case "not-measured":
          expect(entry.provenance.note.length, entry.id).toBeGreaterThan(10);
          break;
      }
    }
  });

  test("keeps the authored form and the machine value in agreement", () => {
    for (const entry of entries) {
      if (!isStated(entry)) continue;
      const digits = entry.display.replace(/[^0-9.]/g, "");
      expect(
        digits,
        `${entry.id}: display ${entry.display} vs value ${entry.value}`,
      ).toBe(String(entry.value));
    }
  });

  test("keeps employer-scoped figures on the surface that discusses them", () => {
    for (const entry of entries) {
      if (
        entry.provenance.kind === "measured" &&
        entry.provenance.where === "meta"
      ) {
        expect(entry.sources, entry.id).toEqual(["work"]);
      }
    }
  });
});

describe("derived figures follow their inputs", () => {
  test("annual submissions is the daily rate times 365", () => {
    expect(annualSubmissions(factValue("submissions-per-day"))).toBe(
      factValue("submissions-per-year"),
    );
  });

  test("person-days is the filing hours divided by 24", () => {
    expect(Math.round(factValue("filing-hours-per-second") / 24)).toBe(
      factValue("filing-person-days"),
    );
  });

  test("the default assumptions produce the printed seller hours", () => {
    const computed = sellerHoursReturned({
      submissionsPerDay: factValue("submissions-per-day"),
      humanShare: DEFAULT_ASSUMPTIONS.humanShare,
      sessionMinutes: DEFAULT_ASSUMPTIONS.sessionMinutes,
      sessionReduction: factValue("session-shorter") / 100,
    });
    expect(Math.round(computed)).toBe(factValue("seller-hours-returned"));
  });
});

describe("the report's placeholders", () => {
  test("every placeholder in the copy names a registry fact", () => {
    const parts: string[] = [report.deck, ...report.abstract.paragraphs];
    for (const section of report.sections) {
      parts.push(section.title, ...section.paragraphs);
      for (const sub of section.subsections ?? []) {
        parts.push(sub.title, ...sub.paragraphs);
      }
    }
    parts.push(
      report.method.lede,
      ...report.method.rows.map((row) => row.body),
      report.author.body,
      report.contact.body,
      ...Object.values(report.figures),
    );

    const ids = parts.flatMap(placeholdersIn);
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) {
      expect(isFactId(id), id).toBe(true);
    }
  });
});

describe("the accent mapping", () => {
  test("indigo is measured, clay is assumed, and nothing else is coloured", () => {
    expect(
      accentFor({ kind: "measured", where: "walmart", mechanism: "x" }),
    ).toBe("data");
    expect(accentFor({ kind: "derived", inputs: [], mechanism: "x" })).toBe(
      "data",
    );
    expect(accentFor({ kind: "assumed", control: "human-share" })).toBe(
      "assume",
    );
    expect(accentFor({ kind: "not-measured", note: "x" })).toBe("neutral");
  });

  test("surfaces only receive figures scoped to them", () => {
    expect(factsFor("about")).toHaveLength(0);
    expect(
      factsFor("work").every((entry) => entry.sources.includes("work")),
    ).toBe(true);
  });
});

import { bandCells } from "../../content/home";

describe("the home band reads the registry", () => {
  test("changing one fact changes the band with no other edit", () => {
    const before = bandCells().map((cell) => cell.value);
    const original = facts["intake-per-second"].display;
    (facts["intake-per-second"] as { display: string }).display = "999,999";
    expect(bandCells()[0].value).toBe("999,999");
    (facts["intake-per-second"] as { display: string }).display = original;
    expect(bandCells().map((cell) => cell.value)).toEqual(before);
  });

  test("every band cell links into the work surface", () => {
    for (const cell of bandCells()) {
      expect(cell.href).toBe("/work");
    }
  });
});
