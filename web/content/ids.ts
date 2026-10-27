/**
 * The single vocabulary of the content model. Ids are declared here once so the
 * registry, the arithmetic, and the agent corpus all refer to the same names.
 */

export const surfaceIds = ["home", "work", "about", "report"] as const;
export type SurfaceId = (typeof surfaceIds)[number];

export const controlIds = [
  "seconds-per-record",
  "human-share",
  "session-minutes",
] as const;
export type ControlId = (typeof controlIds)[number];

export const factIds = [
  // measured at Walmart
  "queries-faster",
  "storage-saved",
  "intake-per-second",
  "submissions-per-day",
  "session-shorter",
  // measured at Meta
  "meta-queries-per-second",
  "meta-platform-performance",
  "meta-build-smaller",
  // derived by arithmetic
  "submissions-per-year",
  "filing-hours-per-second",
  "seller-hours-returned",
  // assumptions the reader can change
  "seconds-per-record",
  "human-share",
  "session-minutes",
  // stated as not measured
  "revenue",
] as const;
export type FactId = (typeof factIds)[number];
