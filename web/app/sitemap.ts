import type { MetadataRoute } from "next";
import { site, urlFor } from "../content/site";

const PATHS = ["/", "/work", "/report", "/about", "/ask"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-27");
  return PATHS.map((path) => ({
    url: urlFor(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}

export const origin = site.origin;
