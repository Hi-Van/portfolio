import Link from "next/link";
import { AnnualVolume } from "../../components/figures/annual-volume";
import { Figure } from "../../components/figures/figure";
import { LatencyBars } from "../../components/figures/latency-bars";
import { SubmissionsDiagram } from "../../components/figures/submissions-diagram";
import { UnitGrid } from "../../components/figures/unit-grid";
import { Model } from "../../components/report/model";
import { SectionNav } from "../../components/report/section-nav";
import { PageMain } from "../../components/shell/page-main";
import { readingMinutes, renderProse, report } from "../../content/report";
import { site } from "../../content/site";
import { pageMetadata } from "../../lib/seo";

function Paragraphs({ children }: { children: string[] }) {
  return (
    <>
      {children.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="mt-4 text-reading text-body">
          {renderProse(paragraph)}
        </p>
      ))}
    </>
  );
}

export const metadata = pageMetadata({
  title: "How a catalog learns to file itself",
  description: "Five figures, the model, and the method note.",
  path: "/report",
});

export default function Report() {
  const minutes = readingMinutes();

  return (
    <PageMain className="px-gutter pt-block pb-block">
      <div className="mx-auto max-w-frame">
        <header>
          <p className="font-ui text-caps tracking-caps text-muted uppercase">
            {report.kicker}
          </p>
          <h1 className="mt-4 font-display text-display-report tracking-display text-ink">
            {report.title}
          </h1>
          <p className="mt-6 max-w-statement font-display text-serif-label text-body">
            {report.deck}
          </p>
          <p className="mt-4 font-ui text-label text-muted">
            {report.byline.name} &middot; {report.byline.place} &middot;{" "}
            {report.byline.date} &middot; {minutes} minute read
          </p>
        </header>

        <SectionNav />

        <article className="mx-auto mt-block max-w-measure">
          <section id="abstract" className="scroll-mt-40">
            <div className="rounded-abstract bg-panel p-6">
              <p className="font-display text-serif-label text-clay italic">
                {report.abstract.label}
              </p>
              <Paragraphs>{[...report.abstract.paragraphs]}</Paragraphs>
            </div>
          </section>

          {report.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-40">
              <h2 className="mt-block font-display text-heading-2 tracking-heading-2 text-ink">
                <span className="mr-3 text-indigo">{section.number}</span>
                {section.title}
              </h2>
              <Paragraphs>{[...section.paragraphs]}</Paragraphs>

              {section.id === "problem" ? (
                <Figure number={1} caption={renderProse(report.figures.fig1)}>
                  <SubmissionsDiagram />
                </Figure>
              ) : null}

              {section.subsections?.map((sub) => (
                <div key={sub.id} id={sub.id} className="scroll-mt-40">
                  <h3 className="mt-block font-display text-heading-3 tracking-heading-3 text-ink">
                    <span className="mr-2 text-indigo">{sub.number}</span>
                    {sub.title}
                  </h3>
                  <Paragraphs>{[...sub.paragraphs]}</Paragraphs>

                  {sub.id === "sys-cleanup" ? (
                    <Figure
                      number={2}
                      caption={renderProse(report.figures.fig2)}
                    >
                      <LatencyBars />
                    </Figure>
                  ) : null}
                  {sub.id === "sys-intake" ? (
                    <Figure
                      number={3}
                      caption={renderProse(report.figures.fig3)}
                    >
                      <UnitGrid />
                    </Figure>
                  ) : null}
                </div>
              ))}

              {section.id === "scale" ? (
                <>
                  <Figure number={4} caption={renderProse(report.figures.fig4)}>
                    <AnnualVolume />
                  </Figure>
                  <Model />
                </>
              ) : null}
            </section>
          ))}

          <section id="method" className="scroll-mt-40">
            <h2 className="mt-block font-display text-heading-2 tracking-heading-2 text-ink">
              <span className="mr-3 text-indigo">{report.method.number}</span>
              {report.method.title}
            </h2>
            <p className="mt-4 text-reading text-body">{report.method.lede}</p>
            <dl className="mt-4 border-t border-line">
              {report.method.rows.map((row) => (
                <div
                  key={row.key}
                  className="grid gap-1 border-b border-line py-4 sm:grid-cols-3"
                >
                  <dt className="font-ui text-caps tracking-caps text-muted uppercase">
                    {row.key}
                  </dt>
                  <dd className="text-body-small text-body sm:col-span-2">
                    {renderProse(row.body)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            id="contact"
            className="mt-block scroll-mt-40 border-t border-line pt-6"
          >
            <p className="font-ui text-label text-muted">
              {report.author.label}
            </p>
            <p className="mt-2 max-w-measure text-reading text-body">
              {report.author.body}
            </p>
            <p className="mt-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center rounded-pill bg-ink px-5 font-ui text-label font-medium text-paper"
              >
                Email me
              </a>
            </p>
            <p className="mt-4 font-ui text-label text-muted">
              {report.contact.label}: {report.contact.body}{" "}
              <Link
                href="/work"
                className="inline-flex min-h-11 items-center text-ink underline decoration-line-strong underline-offset-4"
              >
                Work
              </Link>
            </p>
          </section>
        </article>
      </div>
    </PageMain>
  );
}
