import { fact } from "./facts";
import type { FactId } from "./ids";

export const home = {
  heading: "Van Sirisouk",
  statement:
    "I build the systems behind product data. Catalogs that file themselves, pipelines that keep up with suppliers, and forms that stop wasting people's time.",
  status: {
    marker: "Currently",
    role: "Software Engineer II",
    at: "at",
    employer: "Atlassian",
    inAt: "in",
    location: "New York",
  },
  actions: {
    work: "See the work",
    report: "Read the report",
  },
  contact: {
    label: "Hiring, referring, or just curious",
    note: "Email is fastest. I read everything, and I answer.",
    more: "More about me",
  },
} as const;

export type BandCell = {
  id: FactId;
  value: string;
  unit: string;
  what: string;
  href: string;
};

/**
 * The band's data path. It reads the registry on every call, so a changed fact
 * changes the band with no other edit. A test mutates a fact to prove it.
 */
export function bandCells(): BandCell[] {
  return [
    {
      id: "intake-per-second",
      value: fact("intake-per-second").display,
      unit: "records per second",
      what: `The attire intake pipeline. One second of it replaces ${fact("filing-person-days").display} days of filing.`,
      href: "/work",
    },
    {
      id: "submissions-per-day",
      value: fact("submissions-per-day").display,
      unit: "submissions a day",
      what: `The seller app, built with two engineers. Sessions got ${fact("session-shorter").display} shorter.`,
      href: "/work",
    },
    {
      id: "queries-faster",
      value: fact("queries-faster").display,
      unit: "faster queries",
      what: "After merging duplicate records across a multi-tenant catalog.",
      href: "/work",
    },
  ];
}
