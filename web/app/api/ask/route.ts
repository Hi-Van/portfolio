import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessageStreamWriter,
} from "ai";
import { WITHDRAW_PART } from "../../../lib/agent/parts";
import { answerChunks } from "../../../lib/ask/answer";
import { citationTargets, REFUSAL, retrieve } from "../../../lib/ask/compose";
import { allowedDigits, createStreamGuard } from "../../../lib/ask/guard";
import { isAskRequest } from "../../../lib/ask/guards";
import { LIMITS } from "../../../lib/ask/provider";

/** Every citation the corpus can produce, built once for the whole process. */
const CITATIONS = citationTargets();

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!isAskRequest(body)) {
    return new Response(
      `A question of one to ${LIMITS.maxQuestion} characters is required.`,
      { status: 400 },
    );
  }

  const question = body.question.trim();
  const history = body.history ?? [];
  const chunk = retrieve(question);

  // Everything the answer may state a number about: the retrieved passage.
  // History is context, never evidence, so its digits are not allowed.
  const allowed = allowedDigits([chunk?.text ?? ""]);
  const guard = createStreamGuard(allowed, CITATIONS);
  const id = "answer";

  function withdraw(writer: UIMessageStreamWriter, reason: string) {
    writer.write({ type: WITHDRAW_PART, data: { reason } });
    writer.write({ type: "text-delta", id, delta: REFUSAL });
    writer.write({ type: "text-end", id });
  }

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      writer.write({ type: "text-start", id });
      try {
        for await (const delta of answerChunks(question, history)) {
          const result = guard.push(delta);
          if (result.violation !== null) {
            withdraw(writer, result.violation);
            return;
          }
          if (result.text.length > 0) {
            writer.write({ type: "text-delta", id, delta: result.text });
          }
        }

        const rest = guard.flush();
        if (rest.violation !== null) {
          withdraw(writer, rest.violation);
          return;
        }
        if (rest.text.length > 0) {
          writer.write({ type: "text-delta", id, delta: rest.text });
        }
        writer.write({ type: "text-end", id });
      } catch {
        withdraw(writer, "the model was unreachable");
      }
    },
  });

  return createUIMessageStreamResponse({ stream });
}
