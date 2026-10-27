import Link from "next/link";
import { site } from "../../content/site";

export function SiteFooter() {
  return (
    <footer className="mt-section border-t border-line print:hidden">
      <div className="mx-auto flex max-w-frame flex-col gap-6 px-gutter py-block sm:flex-row sm:items-center sm:justify-between">
        <p className="font-ui text-label text-muted">{site.name}</p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {site.surfaces.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 font-ui text-label text-muted transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center px-2 font-ui text-label text-ink"
          >
            {site.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
