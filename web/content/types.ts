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

/**
 * One number, defined once. `display` is the authored form and `value` is the
 * machine form; a test asserts they agree, so neither can drift from the other.
 */
export type Fact = {
  id: FactId;
  /** The machine value. Absent only for a claim that is not measured. */
  value?: number;
  unit?: Unit;
  /** The authored form, exactly as it is written on the site. */
  display: string;
  /** What the number is about, used in accessible value text and in captions. */
  label: string;
  provenance: Provenance;
  /** Surfaces this figure may appear on. Employer-scoped figures stay scoped. */
  sources: readonly SurfaceId[];
};
