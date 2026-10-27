import { ContactCard } from "../../components/about/contact-card";
import { PageMain } from "../../components/shell/page-main";
import { about } from "../../content/about";

export default function About() {
  return (
    <PageMain className="mx-auto max-w-frame px-gutter py-block">
      <h1 className="font-display text-display-page tracking-display text-ink">
        {about.heading}
      </h1>

      <div className="mt-block grid gap-block md:grid-cols-3">
        <div className="max-w-measure md:col-span-2">
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-4 text-reading text-body"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <dl className="border-t border-line">
            {about.facts.map((entry) => (
              <div
                key={entry.label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3"
              >
                <dt className="font-ui text-caps tracking-caps text-muted uppercase">
                  {entry.label}
                </dt>
                <dd className="font-ui text-label text-ink">{entry.value}</dd>
              </div>
            ))}
          </dl>
          <ContactCard />
        </div>
      </div>
    </PageMain>
  );
}
