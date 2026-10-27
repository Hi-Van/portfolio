"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrent, site } from "../../content/site";
import { ThemeToggle } from "../theme/theme-toggle";
import { AskSwitch } from "./ask-switch";
import { ContactPill } from "./contact-pill";
import { Menu } from "./menu";

/**
 * One bar, in one order, on every surface: name, navigation, invitation, agent
 * switch, menu, theme control. The theme control is always last.
 */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper print:hidden">
      <div className="relative mx-auto flex h-16 max-w-frame items-center justify-between gap-4 px-gutter">
        <Link
          href="/"
          aria-current={isCurrent(pathname, "/") ? "page" : undefined}
          className="inline-flex min-h-11 items-center font-ui text-body-small font-semibold tracking-tight text-ink"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className="inline-flex min-h-11 items-center px-2 font-ui text-label text-muted transition-colors duration-200 hover:text-ink aria-[current=page]:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ContactPill compact />
          <AskSwitch current={pathname.startsWith("/ask")} />
          <Menu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
