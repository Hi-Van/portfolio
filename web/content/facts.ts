import type { FactId } from "./ids";
import type { Fact } from "./types";

/**
 * Every number the site states, defined once. The README's provenance list is
 * the source; a test asserts this registry holds all of it.
 */
export const facts: Record<FactId, Fact> = {
  "queries-faster": {
    id: "queries-faster",
    value: 30,
    unit: "percent",
    display: "30%",
    label: "query time after the catalog cleanup",
    provenance: {
      kind: "measured",
      where: "walmart",
      mechanism:
        "Duplicate catalog records were matched on supplier attributes and merged into one record.",
    },
    sources: ["home", "work", "report"],
  },

  "storage-saved": {
    id: "storage-saved",
    value: 1200,
    unit: "usd-per-year",
    display: "$1,200",
    label: "storage cost removed per year",
    provenance: {
      kind: "measured",
      where: "walmart",
      mechanism: "Merged duplicate records stopped being stored more than once.",
    },
    sources: ["work", "report"],
  },

  "intake-per-second": {
    id: "intake-per-second",
    value: 450000,
    unit: "records-per-second",
    display: "450,000",
    label: "records filed per second by the intake pipeline",
    provenance: {
      kind: "measured",
      where: "walmart",
      mechanism:
        "An event-driven pipeline filed clothing layouts as suppliers submitted them.",
    },
    sources: ["home", "work", "report"],
  },

  "submissions-per-day": {
    id: "submissions-per-day",
    value: 390000,
    unit: "count",
    display: "390,000",
    label: "submissions a day through the seller app",
    provenance: {
      kind: "measured",
      where: "walmart",
      mechanism:
        "A TypeScript submissions app, built with two other engineers, handled supplier submissions.",
    },
    sources: ["home", "work", "report"],
  },

  "session-shorter": {
    id: "session-shorter",
    value: 22,
    unit: "percent",
    display: "22%",
    label: "shorter average seller session after launch",
    provenance: {
      kind: "measured",
      where: "walmart",
      mechanism:
        "The submissions app replaced the form a seller had to complete for each submission.",
    },
    sources: ["home", "work", "report"],
  },

  "meta-queries-per-second": {
    id: "meta-queries-per-second",
    value: 600000,
    unit: "count",
    display: "600,000",
    label: "queries per second through the API data pipelines",
    provenance: {
      kind: "measured",
      where: "meta",
      mechanism: "API data pipelines served subscription and platform reads.",
    },
    sources: ["work"],
  },

  "meta-platform-performance": {
    id: "meta-platform-performance",
    value: 350,
    unit: "percent",
    display: "350%",
    label: "platform performance after batching subscription events",
    provenance: {
      kind: "measured",
      where: "meta",
      mechanism:
        "Subscription events were batched in the Python API instead of dispatched one at a time.",
    },
    sources: ["work"],
  },

  "meta-build-smaller": {
    id: "meta-build-smaller",
    value: 67,
    unit: "percent",
    display: "67%",
    label: "smaller build after moving model packages",
    provenance: {
      kind: "measured",
      where: "meta",
      mechanism:
        "Model packages moved onto platform infrastructure instead of being bundled into every build.",
    },
    sources: ["work"],
  },

  "submissions-per-year": {
    id: "submissions-per-year",
    value: 142350000,
    unit: "count",
    display: "142,350,000",
    label: "annual submissions at the measured daily rate",
    provenance: {
      kind: "derived",
      inputs: ["submissions-per-day"],
      mechanism: "The measured daily rate times 365.",
    },
    sources: ["report"],
  },

  "filing-hours-per-second": {
    id: "filing-hours-per-second",
    value: 2500,
    unit: "hours",
    display: "2,500",
    label: "hours a person would need to file one second of pipeline output",
    provenance: {
      kind: "derived",
      inputs: ["intake-per-second", "seconds-per-record"],
      mechanism:
        "Records per second times 20 seconds each, converted to hours. About 104 person-days.",
    },
    sources: ["report"],
  },

  "filing-person-days": {
    id: "filing-person-days",
    value: 104,
    unit: "count",
    display: "104",
    label: "person-days of manual filing in one second of pipeline output",
    provenance: {
      kind: "derived",
      inputs: ["filing-hours-per-second"],
      mechanism: "Filing hours divided by 24 hours in a day.",
    },
    sources: ["home", "report"],
  },

  "seller-hours-returned": {
    id: "seller-hours-returned",
    value: 782925,
    unit: "hours-per-year",
    display: "782,925",
    label: "seller hours returned a year",
    provenance: {
      kind: "derived",
      inputs: [
        "submissions-per-year",
        "human-share",
        "session-minutes",
        "session-shorter",
      ],
      mechanism:
        "Annual submissions times the human share times the session length times the 22% cut.",
    },
    sources: ["report"],
  },

  "seconds-per-record": {
    id: "seconds-per-record",
    value: 20,
    unit: "seconds-per-record",
    display: "20 seconds",
    label: "time to file one record by hand",
    provenance: { kind: "assumed", control: "seconds-per-record" },
    sources: ["report"],
  },

  "human-share": {
    id: "human-share",
    value: 25,
    unit: "percent",
    display: "25%",
    label: "share of submissions that are human sessions",
    provenance: { kind: "assumed", control: "human-share" },
    sources: ["report"],
  },

  "session-minutes": {
    id: "session-minutes",
    value: 6,
    unit: "minutes",
    display: "6 minutes",
    label: "baseline session length",
    provenance: { kind: "assumed", control: "session-minutes" },
    sources: ["report"],
  },

  revenue: {
    id: "revenue",
    display: "not measured",
    label: "revenue",
    provenance: {
      kind: "not-measured",
      note: "Revenue is not stated anywhere on the site.",
    },
    sources: ["report"],
  },
};

export function fact(id: FactId): Fact {
  return facts[id];
}

export function factsFor(surface: Fact["sources"][number]): Fact[] {
  return Object.values(facts).filter((entry) => entry.sources.includes(surface));
}
