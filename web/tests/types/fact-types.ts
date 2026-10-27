import type { Fact } from "../../content/types";

/**
 * Type-level assertions. These are checked by `tsc` during the build: a
 * `@ts-expect-error` that stops erroring fails the build, so the rule cannot
 * quietly weaken.
 */

declare function renderNumber(fact: Fact): string;

const thirtyPercent: Fact = {
  id: "queries-faster",
  value: 30,
  unit: "percent",
  display: "30%",
  label: "query time",
  provenance: { kind: "measured", where: "walmart", mechanism: "merged duplicates" },
  sources: ["home"],
};

export const rendered = renderNumber(thirtyPercent);

// @ts-expect-error a raw number is not a fact, so a surface cannot print one unlabelled
export const rawNumber = renderNumber(30);

// @ts-expect-error a display string is not a fact either
export const rawString = renderNumber("30%");

import { accentFor } from "../../content/accent";
import type { Accent } from "../../content/accent";

// @ts-expect-error an accent comes from a provenance object, never from a string
export const fromString: Accent = accentFor("measured");
