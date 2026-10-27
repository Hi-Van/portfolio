/** Site-level facts that are not numbers: the name, the address, and the routes. */

export type NavItem = { href: string; label: string };

export const site = {
  name: "Van Sirisouk",
  /** The production origin. Every absolute address derives from this one value. */
  origin: "https://vansiriso.uk",
  /** The one contact address. Every occurrence renders from here. */
  email: "contact@vansiriso.uk",
  nav: [
    { href: "/work", label: "Work" },
    { href: "/report", label: "Report" },
    { href: "/about", label: "About" },
  ] satisfies NavItem[],
  surfaces: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/report", label: "Report" },
    { href: "/about", label: "About" },
    { href: "/ask", label: "Ask" },
  ] satisfies NavItem[],
};

/**
 * The `?from=` allowlist. A key that is not an own property of this table is
 * not a target, so `constructor` and `__proto__` cannot reach a link.
 */
export const RETURN_TARGETS = {
  index: { href: "/", label: "home" },
  home: { href: "/", label: "home" },
  work: { href: "/work", label: "work" },
  report: { href: "/report", label: "the report" },
  about: { href: "/about", label: "about" },
} as const satisfies Record<string, { href: string; label: string }>;

export type ReturnKey = keyof typeof RETURN_TARGETS;
export type ReturnTarget = (typeof RETURN_TARGETS)[ReturnKey];

/** The key the agent surface reads to send the reader back. */
export function fromKey(pathname: string): ReturnKey {
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/report")) return "report";
  if (pathname.startsWith("/about")) return "about";
  return "index";
}

/**
 * Verifies a raw `?from=` value before it is read from the table. `in` and a
 * bare index would walk `Object.prototype`; `Object.hasOwn` does not.
 */
export function isReturnKey(value: string): value is ReturnKey {
  return Object.hasOwn(RETURN_TARGETS, value);
}

/** The one read of the table, with a home fallback for every foreign value. */
export function returnTarget(value: string | null | undefined): ReturnTarget {
  const key = value ?? "";
  return isReturnKey(key) ? RETURN_TARGETS[key] : RETURN_TARGETS.index;
}

/** An absolute address for a surface or an asset. */
export function urlFor(path: string): string {
  return new URL(path, site.origin).toString();
}

export function isCurrent(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
