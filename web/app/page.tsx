import Link from "next/link";
import { Badge, LocationPin } from "../components/evidence/badge";
import { ContactStrip } from "../components/home/contact-strip";
import { ResultsBand } from "../components/home/results-band";
import { PageMain } from "../components/shell/page-main";
import { home } from "../content/home";
import { site, urlFor } from "../content/site";
import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Van Sirisouk, software engineer",
  description:
    "Who this is, three measured results, and one way to get in touch.",
  path: "/",
});

type PersonSchema = {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url: string;
  jobTitle: string;
  worksFor: { "@type": "Organization"; name: string };
  address: { "@type": "PostalAddress"; addressLocality: string };
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: urlFor("/"),
  jobTitle: home.status.role,
  worksFor: { "@type": "Organization", name: home.status.employer },
  address: { "@type": "PostalAddress", addressLocality: home.status.location },
} satisfies PersonSchema;

export default function Home() {
  const { status } = home;

  return (
    <PageMain className="mx-auto max-w-frame px-gutter">
      {/* Structured data must be a JSON string. The rule is off for this file in biome.json because it is built from constants. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <section className="pt-block pb-block">
        <h1 className="font-display text-display-home tracking-display text-ink">
          {home.heading}
        </h1>

        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="block size-2 rounded-pill bg-ink"
            />
            <span className="sr-only">{status.marker}</span>
            <Badge>{status.role}</Badge>
          </span>
          <span className="font-ui text-label text-muted">{status.at}</span>
          <Badge>{status.employer}</Badge>
          <span className="font-ui text-label text-muted">{status.inAt}</span>
          <Badge icon={<LocationPin />}>{status.location}</Badge>
        </p>

        <p className="mt-6 max-w-statement text-reading text-body">
          {home.statement}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center rounded-action border border-ink px-5 font-ui text-label font-medium text-ink transition-colors duration-200 hover:bg-hover"
          >
            {home.actions.work}
          </Link>
          <Link
            href="/report"
            className="inline-flex min-h-11 items-center font-ui text-label text-muted underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-ink"
          >
            {home.actions.report}
          </Link>
        </div>
      </section>

      <ResultsBand />
      <ContactStrip />
    </PageMain>
  );
}
