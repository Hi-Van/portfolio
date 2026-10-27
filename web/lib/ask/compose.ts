import { corpus, type Chunk } from "../../content/corpus";

/** One fixed sentence, compared byte for byte by a test. */
export const REFUSAL = "Not stated on the site.";

function score(chunk: Chunk, question: string): number {
  const words = question.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  let hits = 0;
  for (const word of words) {
    if (chunk.keywords.some((keyword) => keyword === word)) hits += 2;
    else if (chunk.keywords.some((keyword) => keyword.includes(word) && word.length > 3)) hits += 1;
    else if (chunk.text.toLowerCase().includes(word) && word.length > 4) hits += 1;
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
  return bestScore > 0 ? best : null;
}

/**
 * The responder. It answers from the retrieved passage and cites it inline, so
 * the reader can follow the claim. Group 9 replaces this with the model call
 * behind the same stream guard.
 */
export function compose(question: string): string {
  const chunk = retrieve(question);
  if (chunk === null) return REFUSAL;
  return `${chunk.text} [[${chunk.surface}#${chunk.anchor}|${chunk.label}]]`;
}

export function isRefusal(text: string): boolean {
  return text.trim() === REFUSAL;
}
