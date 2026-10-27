import type { ControlId, FactId, SurfaceId } from "./ids";

/**
 * A measured figure, attributable to a named employer and a mechanism.
 * Nothing on the site is measured without saying where and how.
 */
export type Measured = {
  kind: "measured";
  where: "walmart" | "meta";
  mechanism: string;
};

/**
 * A figure produced by arithmetic on other facts. The inputs are ids, not
 * numbers, so a derived figure cannot be computed from a copy.
 */
export type DerivedFig = {
  kind: "derived";
  inputs: readonly FactId[];
  mechanism: string;
};

/** An assumption the reader controls. It is never presented as a measurement. */
export type Assumed = {
  kind: "assumed";
  control: ControlId;
};

/** A claim the site names and refuses to quantify. */
export type NotMeasured = {
  kind: "not-measured";
  note: string;
};

export type Provenance = Measured | DerivedFig | Assumed | NotMeasured;

export type Unit =
  | "percent"
  | "usd-per-year"
  | "records-per-second"
  | "count"
  | "hours"
  | "hours-per-year"
  | "seconds-per-record"
  | "minutes";

type FactBase = {
  id: FactId;
  /** The authored form, exactly as it is written on the site. */
  display: string;
  /** What the number is about, used in accessible value text and in captions. */
  label: string;
  /** Surfaces this figure may appear on. Employer-scoped figures stay scoped. */
  sources: readonly SurfaceId[];
};

/**
 * A figure the site states, so it carries a machine value and a unit. The
 * value and the authored display move together; a test keeps them in step.
 */
export type StatedFact = FactBase & {
  value: number;
  unit: Unit;
  provenance: Measured | DerivedFig | Assumed;
};

/**
 * A claim the site names and refuses to quantify. There is no number, so
 * neither a value nor a unit exists to read by accident.
 */
export type UnstatedFact = FactBase & {
  value?: never;
  unit?: never;
  provenance: NotMeasured;
};

/**
 * One number, defined once. The union is discriminated on `provenance.kind`,
 * so a caller cannot read a value a claim does not have; `valueOf` in
 * `web/content/facts.ts` is the checked way to ask for the machine form.
 */
export type Fact = StatedFact | UnstatedFact;

/** Narrows a fact to the ones that carry a value, without a cast. */
export function isStated(fact: Fact): fact is StatedFact {
  return fact.provenance.kind !== "not-measured";
}
