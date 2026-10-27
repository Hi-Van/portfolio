import Link from "next/link";
import { about } from "../../content/about";
import { site } from "../../content/site";

export function ContactCard() {
  return (
    <section className="mt-block border-t border-line pt-6">
      <p className="font-ui text-label text-muted">{about.contact.label}</p>
      <p className="mt-2">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex min-h-11 items-center border-b border-line-strong font-display text-heading-3 text-ink transition-colors duration-200 hover:border-ink"
        >
          {site.email}
        </a>
      </p>
      <p className="mt-1 font-ui text-label text-muted">{about.contact.note}</p>
      <p className="mt-3">
        <Link
          href="/report"
          className="inline-flex min-h-11 items-center font-ui text-label text-ink underline decoration-line-strong underline-offset-4"
        >
          {about.contact.report}
        </Link>
      </p>
    </section>
  );
}
