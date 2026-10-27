import type { FactId } from "./ids";

export type SystemRow = {
  name: string;
  description: string;
  fact: FactId;
  unit: string;
  href: string;
};

export type RoleRow = {
  employer: string;
  anchor: string;
  period: string;
  place: string;
  title: string;
  description: string;
  systems?: SystemRow[];
};

export const work = {
  heading: "Work",
  lede: "Four years of moving product data between systems that disagree. The numbers below open the report at the system they came from.",
  roles: [
    {
      employer: "Atlassian",
      anchor: "atlassian",
      period: "Jun 2025 to now",
      place: "New York",
      title: "Software Engineer II, Growth",
      description:
        "Growth engineering on Atlassian's cloud products: experiments, and the services underneath them. Most of the detail is under NDA, so this entry stays short. I am glad to walk through it in a conversation.",
    },
    {
      employer: "Walmart Global Tech",
      anchor: "walmart",
      period: "Aug 2023 to May 2025",
      place: "Bentonville",
      title: "Software Engineer, Product Categorization and Placements",
      description:
        "Two years of making supplier data agree with itself at catalog scale. A shirt is a product, each color is another product, each size is a SKU, and every supplier files it differently.",
      systems: [
        {
          name: "Catalog cleanup",
          description:
            "A C# service that finds duplicate records, merges them, and leaves an audit trail.",
          fact: "queries-faster",
          unit: "faster queries",
          href: "/report#sys-cleanup",
        },
        {
          name: "Attire intake",
          description:
            "Event-driven pipelines that file clothing layouts without a human in the loop.",
          fact: "intake-per-second",
          unit: "records a second",
          href: "/report#sys-intake",
        },
        {
          name: "Seller submissions",
          description:
            "A TypeScript app that validates and previews a submission before it lands.",
          fact: "submissions-per-day",
          unit: "a day",
          href: "/report#sys-seller",
        },
      ],
    },
    {
      employer: "Meta",
      anchor: "meta",
      period: "May to Aug 2022",
      place: "New York",
      title: "Software Engineer Intern, FAIR AI",
      description:
        "A summer on FAIR AI's Transparency and Control team, where the focus was validating model correctness and making model data and results observable to users. My part ran through content categorization on Facebook and Instagram, mostly removing bottlenecks in the data path.",
      systems: [
        {
          name: "Model input",
          description:
            "API pipelines serving PyTorch models for content categorization on Facebook and Instagram.",
          fact: "meta-queries-per-second",
          unit: "queries a second",
          href: "/report#sys-cleanup",
        },
        {
          name: "Scoring path",
          description:
            "Batched subscription events in the Python API to speed up the real-time confusion matrices.",
          fact: "meta-platform-performance",
          unit: "platform performance",
          href: "/report#sys-cleanup",
        },
        {
          name: "Model build",
          description:
            "Moved model packages onto platform infrastructure to shrink the build.",
          fact: "meta-build-smaller",
          unit: "smaller build",
          href: "/report#sys-cleanup",
        },
      ],
    },
    {
      employer: "Before 2023",
      anchor: "before",
      period: "Internships",
      place: "",
      title: "Where I started",
      description:
        "Backend software engineer intern at Synchrony Financial. Systems engineer intern at Edgewell Personal Care. I also lectured for UConn's Google Developer Student Club, which taught me more about my own gaps than any course did.",
    },
  ] satisfies RoleRow[],
  note: "The Walmart systems link to the passage in the report that explains what each did and how the number was measured. The annualized view, with the assumptions exposed, is in section 3.",
} as const;
