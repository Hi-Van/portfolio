import { beforeEach, expect, test, vi } from "vitest";

vi.mock("../../lib/ask/answer", () => ({ answerChunks: vi.fn() }));

import { POST } from "../../app/api/ask/route";
import { type Part, visibleAnswer, WITHDRAW_PART } from "../../lib/agent/parts";
import { answerChunks } from "../../lib/ask/answer";
import { REFUSAL } from "../../lib/ask/compose";

const mocked = vi.mocked(answerChunks);

function ask(body: unknown): Promise<Response> {
  return POST(
    new Request("http://localhost/api/ask", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    }),
  );
}

async function* yields(...parts: string[]) {
  for (const part of parts) yield part;
}

type StreamChunk = { type: string; delta?: string; data?: unknown };

/**
 * The wire is SSE. Turn each `text-delta` into the `text` part the transcript
 * sees, and keep every other part as it is, so `visibleAnswer` reads the same
 * shape here that it reads in the client.
 */
function streamParts(raw: string): Part[] {
  const parts: Part[] = [];
  for (const line of raw.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice("data:".length).trim();
    if (payload.length === 0 || payload === "[DONE]") continue;
    const chunk = JSON.parse(payload) as StreamChunk;
    if (chunk.type === "text-delta" && typeof chunk.delta === "string") {
      parts.push({ type: "text", text: chunk.delta });
    } else {
      parts.push({ type: chunk.type, data: chunk.data });
    }
  }
  return parts;
}

function withdrew(parts: Part[]): boolean {
  return parts.some((part) => part.type === WITHDRAW_PART);
}

beforeEach(() => {
  mocked.mockReset();
});

test("an invalid request never opens a stream", async () => {
  for (const body of [
    {},
    { question: "" },
    { question: "x".repeat(281) },
    { question: 7 },
  ]) {
    const response = await ask(body);
    expect(response.status).toBe(400);
    expect(response.headers.get("content-type")).not.toContain(
      "text/event-stream",
    );
  }
});

test("a refusal streams the fixed sentence with no withdrawal", async () => {
  mocked.mockImplementation(() => yields(REFUSAL));
  const response = await ask({ question: "What is the capital of France?" });
  const parts = streamParts(await response.text());
  expect(withdrew(parts)).toBe(false);
  expect(visibleAnswer(parts)).toEqual({ text: REFUSAL, withdrawn: false });
});

test("an untraced number withdraws the answer and leaves the refusal", async () => {
  mocked.mockImplementation(() => yields("It files 350,000 records a second."));
  const response = await ask({ question: "What did the intake pipeline do?" });
  const parts = streamParts(await response.text());
  expect(withdrew(parts)).toBe(true);
  expect(visibleAnswer(parts)).toEqual({ text: REFUSAL, withdrawn: true });
});

test("a withdrawal round-trips from the route's part name to the transcript", async () => {
  // The source yields one complete delta carrying a number the passage lacks.
  mocked.mockImplementation(() => yields("It files 350,000 records a second."));
  const response = await ask({ question: "What did the intake pipeline do?" });
  const parts = streamParts(await response.text());

  // A rename on either side of the seam stops this being exactly one part.
  expect(parts.filter((part) => part.type === WITHDRAW_PART)).toHaveLength(1);
  expect(visibleAnswer(parts)).toEqual({ text: REFUSAL, withdrawn: true });
});

test("a number the passage supports is streamed through", async () => {
  mocked.mockImplementation(() => yields("It files 450,000 records a second."));
  const response = await ask({ question: "How fast is the pipeline?" });
  const parts = streamParts(await response.text());
  expect(withdrew(parts)).toBe(false);
  expect(visibleAnswer(parts)).toEqual({
    text: "It files 450,000 records a second.",
    withdrawn: false,
  });
});

test("history never becomes evidence", async () => {
  // The number exists only in the earlier turn, never in the passage the
  // question retrieves, so the guard must treat it as untraced.
  mocked.mockImplementation(() => yields("It files 999,111 records a second."));
  const response = await ask({
    question: "How fast is the pipeline?",
    history: [
      { role: "user", text: "What is his favourite colour?" },
      { role: "assistant", text: "It files 999,111 records a second." },
    ],
  });
  const parts = streamParts(await response.text());
  expect(withdrew(parts)).toBe(true);
  expect(visibleAnswer(parts)).toEqual({ text: REFUSAL, withdrawn: true });
});

test("a number in the passage is evidence even when history carries another", async () => {
  mocked.mockImplementation(() => yields("It files 450,000 records a second."));
  const response = await ask({
    question: "How fast is the pipeline?",
    history: [
      { role: "assistant", text: "It files 999,111 records a second." },
    ],
  });
  const parts = streamParts(await response.text());
  expect(withdrew(parts)).toBe(false);
  expect(visibleAnswer(parts)).toEqual({
    text: "It files 450,000 records a second.",
    withdrawn: false,
  });
});

test("a fabricated citation withdraws the answer", async () => {
  mocked.mockImplementation(() =>
    yields("Files records. [[work#not-real|work, somewhere]]"),
  );
  const response = await ask({ question: "What did he ship at Walmart?" });
  const parts = streamParts(await response.text());
  expect(withdrew(parts)).toBe(true);
  expect(visibleAnswer(parts)).toEqual({ text: REFUSAL, withdrawn: true });
});

test("a number split across deltas is not released early", async () => {
  mocked.mockImplementation(() => yields("It files 45", "0,000 records"));
  const response = await ask({ question: "How fast is the pipeline?" });
  const parts = streamParts(await response.text());
  expect(withdrew(parts)).toBe(false);
  expect(visibleAnswer(parts)).toEqual({
    text: "It files 450,000 records",
    withdrawn: false,
  });
});
