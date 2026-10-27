import { PageMain } from "../../components/shell/page-main";

/**
 * Placeholder while group 7 builds the document. The anchors exist now so the
 * work surface's deep links resolve to something real.
 */
const sections = [
  { id: "problem", title: "The problem" },
  { id: "scale", title: "What it adds up to" },
  { id: "sys-cleanup", title: "Cleaning the catalog" },
  { id: "sys-intake", title: "Filing at intake" },
  { id: "sys-seller", title: "The seller app" },
  { id: "method", title: "Method" },
];

export default function Report() {
  return (
    <PageMain className="mx-auto max-w-frame px-gutter py-block">
      <h1 className="font-display text-display-page tracking-display text-ink">
        Report
      </h1>
      <p className="mt-6 max-w-statement text-reading text-body">
        The full document arrives with the report group. These sections exist so
        the work surface can link into them.
      </p>
      <div className="mt-block flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-display text-heading-2 tracking-heading-2 text-ink">
              {section.title}
            </h2>
          </section>
        ))}
      </div>
    </PageMain>
  );
}
