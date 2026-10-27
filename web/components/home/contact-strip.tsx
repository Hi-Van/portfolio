import Link from "next/link";
import { home } from "../../content/home";
import { site } from "../../content/site";

export function ContactStrip() {
  return (
    <section className="mt-block border-t border-line pt-6">
      <p className="font-ui text-label text-muted">{home.contact.label}</p>
      <p className="mt-2">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex min-h-11 items-center border-b border-line-strong font-display text-heading-3 text-ink transition-colors duration-200 hover:border-ink"
        >
          {site.email}
        </a>
      </p>
      <p className="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-1 font-ui text-label text-muted">
        <span>{home.contact.note}</span>
        <Link
          href="/about"
          className="inline-flex min-h-11 items-center text-ink underline decoration-line-strong underline-offset-4"
        >
          {home.contact.more}
        </Link>
      </p>
    </section>
  );
}
