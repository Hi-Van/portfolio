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

/** The key the agent surface reads to send the reader back. */
export function fromKey(pathname: string): string {
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/report")) return "report";
  if (pathname.startsWith("/about")) return "about";
  return "index";
}

/** An absolute address for a surface or an asset. */
export function urlFor(path: string): string {
  return new URL(path, site.origin).toString();
}

export function isCurrent(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
