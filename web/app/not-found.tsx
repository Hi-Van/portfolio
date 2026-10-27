import type { Metadata } from "next";
import Link from "next/link";
import { PageMain } from "../components/shell/page-main";

/** The bare title: the layout's template appends the site name once. */
export const metadata = { title: "Not found" } satisfies Metadata;

export default function NotFound() {
  return (
    <PageMain className="mx-auto max-w-frame px-gutter py-section">
      <p className="font-ui text-caps tracking-caps text-muted uppercase">
        Not found
      </p>
      <h1 className="mt-4 font-display text-display-page tracking-display text-ink">
        That address does not exist.
      </h1>
      <p className="mt-6 max-w-statement text-reading text-body">
        The link may be old, or the page may have moved. Every surface is one
        step from here.
      </p>
      <p className="mt-8 flex flex-wrap gap-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-pill bg-ink px-5 font-ui text-label font-medium text-paper"
        >
          Home
        </Link>
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center font-ui text-label text-ink underline decoration-line-strong underline-offset-4"
        >
          The work
        </Link>
      </p>
    </PageMain>
  );
}
