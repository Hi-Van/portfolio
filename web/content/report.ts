/**
 * The report's copy. A number appears as a `{fact-id}` placeholder and is
 * resolved from the registry at render, so the document cannot carry a copy of
 * a figure that disagrees with the rest of the site.
 */

import { fact } from "./facts";
import type { FactId } from "./ids";

const PLACEHOLDER = /\{([a-z0-9-]+)\}/g;

export function renderProse(text: string): string {
  return text.replace(
    PLACEHOLDER,
    (_match, id: string) => fact(id as FactId).display,
  );
}

export function placeholdersIn(text: string): string[] {
  return [...text.matchAll(PLACEHOLDER)].map((match) => match[1]);
}

export type ReportSection = {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  subsections?: {
    id: string;
    number: string;
    title: string;
    paragraphs: string[];
  }[];
};

export const report = {
  kicker: "Report",
  title: "How a catalog learns to file itself",
  deck: "Four years of product data work, and the arithmetic that makes small improvements matter.",
  byline: { name: "Van Sirisouk", place: "New York", date: "October 2026" },
  /** Words per minute used to state the reading time. */
  wordsPerMinute: 200,

  abstract: {
    label: "Abstract",
    paragraphs: [
      "Between 2023 and 2025 I worked on the product catalog behind Walmart's e-commerce site: reconciling supplier data, removing duplicate records, and automating a submission process that people had been doing by hand.",
      "The results read like small numbers. Queries ran {queries-faster} faster. Sessions got {session-shorter} shorter. A pipeline filed {intake-per-second} records a second. The figures below show why they matter at catalog scale, and each one states the assumption it rests on.",
    ],
  },

  sections: [
    {
      id: "problem",
      number: "1",
      title: "The same shirt, six ways",
      paragraphs: [
        "A catalog is not a list. It is an agreement about what each thing is. Clothing breaks that agreement first: one style becomes two products by color and six SKUs by size, and every supplier names them differently.",
      ],
    },
    {
      id: "systems",
      number: "2",
      title: "Three systems",
      paragraphs: [],
      subsections: [
        {
          id: "sys-cleanup",
          number: "2.1",
          title: "Cleaning",
          paragraphs: [
            "Years of failed submissions leave duplicates. The service merges them in place, per tenant, and writes an audit trail, so queries stop scanning rows that say the same thing twice.",
          ],
        },
        {
          id: "sys-intake",
          number: "2.2",
          title: "Intake",
          paragraphs: [
            "Layouts arrived as files and were filed by hand. The pipeline validates and publishes one on arrival, at {intake-per-second} records a second.",
          ],
        },
        {
          id: "sys-seller",
          number: "2.3",
          title: "Submissions",
          paragraphs: [
            "External sellers had no clean way in, so edge cases became tickets. The app validates and previews before it writes, and the average session got {session-shorter} shorter. On a form, shorter means fewer dead ends.",
          ],
        },
      ],
    },
    {
      id: "scale",
      number: "3",
      title: "What it adds up to",
      paragraphs: [
        "At {submissions-per-day} submissions a day, the app handles {submissions-per-year} a year. That is the multiplier. A quarter of that traffic, six minutes a session, and the measured cut is worth the hours below.",
        "The model makes the last two numbers yours to change.",
      ],
    },
  ] satisfies ReportSection[],

  figures: {
    fig1: "Three submissions for one garment, and the single record the catalog needs before it can file any of them. Illustrative of the mechanism, not an actual submission.",
    fig2: "Query latency indexed to the pre-cleanup baseline. The raw milliseconds were not kept, so the index is the measurement.",
    fig3: "One second of pipeline against one person filing at 20 seconds per record. The 20 seconds is my estimate.",
    fig4: "Annual volume at the measured daily rate. A projection, not a count.",
    fig5: "Cumulative seller hours at two session lengths. The shaded band is the time the cut returns. Volume is fixed at the measured daily rate; the two controls are assumptions.",
  },

  method: {
    number: "4",
    title: "Method",
    lede: "Measurement and projection are different things. So are estimates.",
    rows: [
      {
        key: "Measured",
        body: "{queries-faster} faster queries, {storage-saved} a year in storage, {intake-per-second} records a second, {submissions-per-day} submissions a day, and {session-shorter} shorter sessions. Source: internal dashboards at the time, and my notes.",
      },
      {
        key: "Derived",
        body: "Annual submissions (daily times 365). Filing time (records times 20 seconds). Hours returned (volume times human share times session times the cut). Arithmetic on measured inputs, not new measurements.",
      },
      {
        key: "Assumed",
        body: "20 seconds per record. 25% human traffic. Six minutes per session. The model exposes the last two as controls.",
      },
      {
        key: "Not measured",
        body: "Revenue. Attribution was not mine to claim, and a dollar figure would have been invented.",
      },
    ],
  },

  author: {
    label: "About the author",
    body: "I am a software engineer in New York. I work on growth at Atlassian now, and before that on Walmart's product catalog. I like problems where the data exists but nobody can use it yet.",
  },

  contact: {
    label: "The site",
    body: "The systems are on the work page, and the short version is on the home page.",
  },
} as const;

/** Every string a reader reads, for the word count. */
export function reportProse(): string {
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
  return renderProse(parts.join(" "));
}

export function wordCount(): number {
  return reportProse().trim().split(/\s+/).length;
}

export function readingMinutes(): number {
  return Math.max(1, Math.round(wordCount() / report.wordsPerMinute));
}
