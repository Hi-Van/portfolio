import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { compose } from "../../../lib/ask/compose";

const MAX_QUESTION = 280;

function isAskRequest(value: unknown): value is { question: string } {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  if (typeof record.question !== "string") return false;
  const question = record.question.trim();
  return question.length >= 1 && question.length <= MAX_QUESTION;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isAskRequest(body)) {
    return new Response("A question of one to two hundred and eighty characters is required.", {
      status: 400,
    });
  }

  const answer = compose(body.question.trim());
  const id = "answer";

  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      writer.write({ type: "text-start", id });
      for (let index = 0; index < answer.length; index += 24) {
        writer.write({ type: "text-delta", id, delta: answer.slice(index, index + 24) });
      }
      writer.write({ type: "text-end", id });
    },
  });

  return createUIMessageStreamResponse({ stream });
}
