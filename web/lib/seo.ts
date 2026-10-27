import type { Metadata } from "next";
import { site, urlFor } from "../content/site";

/**
 * Per-surface metadata. The share image lives here rather than in each page,
 * because a page-level openGraph object replaces the layout's wholesale.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.path,
      images: [
        { url: urlFor("/og.png"), width: 1200, height: 630, alt: site.name },
      ],
    },
  };
}
