import type { Provenance } from "./types";

/**
 * The only place a provenance class becomes a colour role. Two accents, each
 * with a job: indigo is measured, clay is assumed, and nothing else is coloured.
 */
export type Accent = "data" | "assume" | "neutral";

export function accentFor(provenance: Provenance): Accent {
  switch (provenance.kind) {
    case "measured":
    case "derived":
      return "data";
    case "assumed":
      return "assume";
    case "not-measured":
      return "neutral";
  }
}
