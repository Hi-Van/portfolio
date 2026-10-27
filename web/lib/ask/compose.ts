import { type Chunk, corpus } from "../../content/corpus";

/** One fixed sentence, compared byte for byte by a test. */
export const REFUSAL = "Not stated on the site.";

const STOP = new Set([
  "what",
  "when",
  "where",
  "why",
  "how",
  "which",
  "does",
  "did",
  "do",
  "is",
  "was",
  "were",
  "are",
  "the",
  "a",
  "an",
  "of",
  "to",
  "in",
  "on",
  "at",
  "for",
  "and",
  "or",
  "he",
  "his",
  "him",
  "she",
  "her",
  "it",
  "its",
  "that",
  "this",
  "there",
  "tell",
  "me",
  "about",
  "many",
  "much",
  "will",
  "would",
  "can",
  "could",
  "should",
  "have",
  "has",
  "had",
  "be",
  "been",
  "not",
  "no",
  "next",
  "year",
  "years",
  "number",
  "numbers",
  "get",
  "got",
  "like",
]);

/** Good enough for a keyword scorer: cleaned, cleaning, cleans all become clean. */
function stem(word: string): string {
  return word.replace(/(ing|ed|es|s)$/u, "");
}

function score(chunk: Chunk, question: string): number {
  const words = question
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 1 && !STOP.has(word));
  if (words.length === 0) return 0;

  const keywords = new Set(chunk.keywords.map(stem));
  let hits = 0;
  for (const word of words) {
    const root = stem(word);
    if (/^\d+$/.test(word)) {
      if (chunk.text.includes(word)) hits += 3;
      continue;
    }
    if (keywords.has(root)) hits += 3;
    else if (keywords.has(word)) hits += 2;
    else if (root.length >= 5 && chunk.text.toLowerCase().includes(root))
      hits += 1;
  }
  return hits;
}

export function retrieve(question: string): Chunk | null {
  let best: Chunk | null = null;
  let bestScore = 0;
  for (const chunk of corpus) {
    const value = score(chunk, question);
    if (value > bestScore) {
      best = chunk;
      bestScore = value;
    }
  }
  return bestScore >= 3 ? best : null;
}

/**
 * Every citation the corpus can produce, as `surface#anchor` for a section
 * and the bare surface for a whole-surface chunk. The guard and the transcript
 * both resolve a marker against this set, so a fabricated anchor cannot become
 * a link.
 */
export function citationTargets(): ReadonlySet<string> {
  return new Set(
    corpus.map((chunk) =>
      chunk.anchor === null
        ? chunk.surface
        : `${chunk.surface}#${chunk.anchor}`,
    ),
  );
}

/**
 * The marker for one chunk. A whole-surface chunk has no fragment, so the
 * marker names the surface alone. Both the responder and the model prompt use
 * this, so the anchor they teach is always one the guard will resolve.
 */
export function citationFor(chunk: Chunk): string {
  const target =
    chunk.anchor === null ? chunk.surface : `${chunk.surface}#${chunk.anchor}`;
  return `[[${target}|${chunk.label}]]`;
}

/**
 * The responder. It answers from the retrieved passage and cites it inline, so
 * the reader can follow the claim.
 */
export function compose(question: string): string {
  const chunk = retrieve(question);
  if (chunk === null) return REFUSAL;
  return `${chunk.text} ${citationFor(chunk)}`;
}

export function isRefusal(text: string): boolean {
  return text.trim() === REFUSAL;
}
