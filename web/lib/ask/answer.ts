import { streamText } from "ai";
import type { Chunk } from "../../content/corpus";
import { compose, REFUSAL, retrieve } from "./compose";
import type { Turn } from "./guards";
import { hasCredential, LIMITS, model } from "./provider";

const SYSTEM = [
  "You answer questions about one personal website, using only the passage you are given.",
  "Write quantities as digits, never spelled out.",
  "End every claim with an inline anchor in the form [[surface#anchor|label]] using the passage's anchor.",
  "If the passage does not answer the question, reply with exactly: Not stated on the site.",
  "The conversation so far is context, never evidence. Never answer from it alone.",
].join(" ");

function prompt(question: string, chunk: Chunk, history: Turn[]): string {
  const turns = history
    .slice(-4)
    .map((turn) => `${turn.role}: ${turn.text}`)
    .join("\n");
  return [
    `Passage (${chunk.label}): ${chunk.text}`,
    `Anchor: [[${chunk.surface}#${chunk.anchor}|${chunk.label}]]`,
    turns ? `Conversation so far:\n${turns}` : "",
    `Question: ${question}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

/**
 * The answer source. With a credential the model composes from the retrieved
 * passage; without one the passage itself is the answer, so a checkout with no
 * key still answers honestly and still cites.
 */
export async function* answerChunks(
  question: string,
  history: Turn[],
): AsyncGenerator<string> {
  const chunk = retrieve(question);
  if (chunk === null) {
    yield REFUSAL;
    return;
  }

  if (!hasCredential()) {
    const text = compose(question);
    for (let index = 0; index < text.length; index += 24) {
      yield text.slice(index, index + 24);
    }
    return;
  }

  const result = streamText({
    model: model(),
    system: SYSTEM,
    prompt: prompt(question, chunk, history),
    maxOutputTokens: LIMITS.maxOutputTokens,
  });

  for await (const delta of result.textStream) yield delta;
}

export { retrieve };
