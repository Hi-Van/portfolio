import type { SurfaceId } from "./ids";

/** One entry per anchorable section, which is also the agent's reach. */
export type Chunk = {
  surface: SurfaceId;
  anchor: string | null;
  label: string;
  href: string;
  heading: string;
  text: string;
  keywords: string[];
};

export const corpus: Chunk[] = [
  {
    surface: "work",
    anchor: "walmart",
    label: "work, Walmart",
    href: "/work#walmart",
    heading: "Walmart Global Tech",
    text: "Two years of making supplier data agree with itself at catalog scale. Catalog cleanup merged duplicate records, which made queries 30% faster. Attire intake files 450,000 records a second. The seller submissions app handles 390,000 a day and cut sessions by 22%.",
    keywords: ["walmart", "catalog", "cleanup", "duplicate", "intake", "submission", "submissions", "seller", "ship", "shipped", "built", "system", "systems"],
  },
  {
    surface: "work",
    anchor: "atlassian",
    label: "work, Atlassian",
    href: "/work#atlassian",
    heading: "Atlassian",
    text: "Growth engineering on Atlassian's cloud products: experiments, and the services underneath them. Most of the detail is under NDA, and the entry stays short.",
    keywords: ["atlassian", "current", "now", "growth", "job", "role", "working"],
  },
  {
    surface: "work",
    anchor: "meta",
    label: "work, Meta",
    href: "/work#meta",
    heading: "Meta",
    text: "A summer on FAIR AI's Transparency and Control team: validating model correctness, and making model data observable. API pipelines served 600,000 queries a second, batching events improved platform performance by 350%, and moving model packages made the build 67% smaller.",
    keywords: ["meta", "intern", "internship", "fair", "ai", "facebook", "instagram"],
  },
  {
    surface: "work",
    anchor: "before",
    label: "work, before 2023",
    href: "/work#before",
    heading: "Before 2023",
    text: "Backend intern at Synchrony Financial, systems engineer intern at Edgewell Personal Care, and a lecturer for UConn's Google Developer Student Club. Computer science at UConn, class of 2023.",
    keywords: ["before", "synchrony", "edgewell", "uconn", "school", "college", "background", "career", "education"],
  },
  {
    surface: "report",
    anchor: "problem",
    label: "report, the problem",
    href: "/report#problem",
    heading: "The same shirt, six ways",
    text: "A catalog is an agreement about what each thing is. Clothing breaks it first: one style becomes two products by color and six SKUs by size, and every supplier names them differently. The catalog needs one record before it can file any of them.",
    keywords: ["catalog", "problem", "shirt", "sku", "skus", "supplier", "suppliers", "duplicate", "agreement", "color", "size"],
  },
  {
    surface: "report",
    anchor: "systems",
    label: "report, three systems",
    href: "/report#systems",
    heading: "Three systems",
    text: "Three systems carry the work: a cleanup service that merges duplicate records, an intake pipeline that files layouts on arrival, and a seller app that validates a submission before it lands.",
    keywords: ["systems", "three", "overview", "architecture", "what", "built", "shipped"],
  },
  {
    surface: "report",
    anchor: "scale",
    label: "report, what it adds up to",
    href: "/report#scale",
    heading: "What it adds up to",
    text: "At 390,000 submissions a day the app handles 142,350,000 a year. A quarter of that traffic at six minutes a session returns 782,925 seller-hours a year at the measured 22% cut. The two assumptions are controls in the model.",
    keywords: ["22", "hours", "model", "seller", "scale", "worth", "assumption", "assumptions", "estimate", "calculator"],
  },
  {
    surface: "report",
    anchor: "method",
    label: "report, method",
    href: "/report#method",
    heading: "Method",
    text: "Measured: query speed, storage, intake rate, submissions a day, session length. Derived: annual submissions, filing time, hours returned. Assumed: 20 seconds per record, 25% human traffic, six minutes a session. Revenue is not measured.",
    keywords: ["method", "measured", "derived", "assumed", "revenue", "evidence", "source"],
  },
  {
    surface: "report",
    anchor: "sys-cleanup",
    label: "report, cleaning",
    href: "/report#sys-cleanup",
    heading: "Cleaning",
    text: "The service merges duplicate records in place, per tenant, and writes an audit trail, so queries stop scanning rows that say the same thing twice.",
    keywords: ["cleaning", "cleanup", "merge", "merges", "audit", "duplicate", "dedupe"],
  },
  {
    surface: "report",
    anchor: "sys-intake",
    label: "report, intake",
    href: "/report#sys-intake",
    heading: "Intake",
    text: "Layouts arrived as files and were filed by hand. The pipeline validates and publishes one on arrival, at 450,000 records a second.",
    keywords: ["intake", "pipeline", "file", "files", "layout", "layouts"],
  },
  {
    surface: "report",
    anchor: "sys-seller",
    label: "report, submissions",
    href: "/report#sys-seller",
    heading: "Submissions",
    text: "External sellers had no clean way in, so edge cases became tickets. The app validates and previews before it writes, and the average session got 22% shorter.",
    keywords: ["seller", "submission", "submissions", "form", "session", "sessions", "app"],
  },
  {
    surface: "about",
    anchor: null,
    label: "about",
    href: "/about",
    heading: "About",
    text: "A software engineer in New York, working on growth at Atlassian, and before that on Walmart's product catalog. The through line is product data: catalogs that agree with themselves, and pipelines that keep up.",
    keywords: ["about", "who", "values", "focus", "cares", "background", "you", "person", "him"],
  },
  {
    surface: "home",
    anchor: null,
    label: "home",
    href: "/",
    heading: "Home",
    text: "The site's front page, with the current role, three measured results, and a way to get in touch.",
    keywords: ["contact", "email", "hire", "hiring", "reach", "site", "home", "start"],
  },
];
