/** Site-level facts that are not numbers: the name, the address, and the routes. */

export type NavItem = { href: string; label: string };

export const site = {
  name: "Van Sirisouk",
  /** Placeholder. Task 11.1 replaces it and a test proves the old one is gone. */
  email: "hello@vansirisouk.com",
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

export function isCurrent(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
