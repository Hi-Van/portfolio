import { type NextRequest, NextResponse } from "next/server";
import { site } from "./content/site";

const APEX = new URL(site.origin);
const PRODUCTION_HOSTS = new Set([APEX.host, `www.${APEX.host}`]);

/**
 * One canonical host: the apex, over https. Only production hosts are touched,
 * so local previews and development are never redirected to the live site.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (!PRODUCTION_HOSTS.has(host)) return NextResponse.next();

  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const wrongHost = host !== APEX.host;
  const wrongProto = proto !== "https";

  if (wrongHost || wrongProto) {
    const target = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      APEX,
    );
    return NextResponse.redirect(target, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|og.png|robots.txt|sitemap.xml).*)"],
};
