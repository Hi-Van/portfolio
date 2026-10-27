import Link from "next/link";
import { fact } from "../../content/facts";
import { bandCells } from "../../content/home";

/**
 * Three measured results, each rendered from the registry and each a link into
 * the work surface. The numbers are indigo because they are measurements.
 */
export function ResultsBand() {
  const cells = bandCells();
  const worth = fact("session-shorter").display;

  return (
    <section aria-labelledby="results-heading" className="mt-block">
      <h2 id="results-heading" className="sr-only">
        Results
      </h2>
      <ul className="grid grid-cols-1 border-y border-line sm:grid-cols-3">
        {cells.map((cell, index) => (
          <li
            key={cell.id}
            className={`border-b border-line sm:border-b-0 ${
              index < cells.length - 1 ? "sm:border-r" : ""
            }`}
          >
            <Link
              href={cell.href}
              className="group flex h-full flex-col gap-2 py-6 transition-colors duration-200 hover:bg-hover sm:px-6"
            >
              <span className="font-display text-heading-2 tracking-display text-indigo">
                {cell.value}
              </span>
              <span className="font-ui text-label text-muted">{cell.unit}</span>
              <span className="text-body-small text-body group-hover:text-ink">
                {cell.what}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-ui text-label">
        <Link
          href="/report"
          className="inline-flex min-h-11 items-center text-indigo underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink"
        >
          What {worth} is worth at scale
        </Link>
      </p>
    </section>
  );
}
