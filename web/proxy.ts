import { type NextRequest, NextResponse } from "next/server";
import { site } from "./content/site";

const APEX = new URL(site.origin);
const PRODUCTION_HOSTS = new Set([APEX.host, `www.${APEX.host}`]);

/**
 * The first `x-forwarded-proto` value, trimmed and lowercased, so padding,
 * case, and a comma-separated chain do not look like a wrong scheme.
 */
function forwardedProto(request: NextRequest): string {
  const header = request.headers.get("x-forwarded-proto") ?? "https";
  return header.split(",")[0].trim().toLowerCase();
}

/**
 * One canonical host: the apex, over https. Only production hosts are touched,
 * so local previews and development are never redirected to the live site.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (!PRODUCTION_HOSTS.has(host)) return NextResponse.next();

  const wrongHost = host !== APEX.host;
  const wrongProto = forwardedProto(request) !== "https";

  if (wrongHost || wrongProto) {
    // Assign onto the apex so a crafted path cannot change the origin.
    const target = new URL(APEX);
    target.pathname = request.nextUrl.pathname;
    target.search = request.nextUrl.search;

    // A target equal to the request would be a 308 to itself, so serve it.
    if (target.href !== request.nextUrl.href) {
      return NextResponse.redirect(target, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|og.png|robots.txt|sitemap.xml).*)"],
};
