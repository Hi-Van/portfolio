import { beforeEach, expect, test, vi } from "vitest";

vi.mock("../../lib/ask/answer", () => ({ answerChunks: vi.fn() }));

import { POST } from "../../app/api/ask/route";
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

beforeEach(() => {
  mocked.mockReset();
});

test("an invalid request never opens a stream", async () => {
  for (const body of [{}, { question: "" }, { question: "x".repeat(281) }, { question: 7 }]) {
    const response = await ask(body);
    expect(response.status).toBe(400);
    expect(response.headers.get("content-type")).not.toContain("text/event-stream");
  }
});

test("a refusal streams the fixed sentence with no withdrawal", async () => {
  mocked.mockImplementation(() => yields(REFUSAL));
  const response = await ask({ question: "What is the capital of France?" });
  const text = await response.text();
  expect(text).toContain(REFUSAL);
  expect(text).not.toContain("data-withdraw");
});

test("an untraced number withdraws the answer and leaves the refusal", async () => {
  mocked.mockImplementation(() => yields("It files 350,000 records a second."));
  const response = await ask({ question: "What did the intake pipeline do?" });
  const text = await response.text();
  expect(text).toContain("data-withdraw");
  expect(text).toContain(REFUSAL);
});

test("a number the passage supports is streamed through", async () => {
  mocked.mockImplementation(() => yields("It files 450,000 records a second."));
  const response = await ask({ question: "How fast is the pipeline?" });
  const text = await response.text();
  expect(text).toContain("450,000");
  expect(text).not.toContain("data-withdraw");
});

test("history never becomes evidence", async () => {
  const response = await ask({
    question: "And what about that other thing?",
    history: [
      { role: "user", text: "What is his favourite colour?" },
      { role: "assistant", text: "Not stated on the site." },
    ],
  });
  const text = await response.text();
  expect(text).toContain(REFUSAL);
});

test("a number split across deltas is not released early", async () => {
  mocked.mockImplementation(() => yields("It files 45", "0,000 records"));
  const response = await ask({ question: "How fast is the pipeline?" });
  const text = await response.text();
  expect(text).toContain("450,000");
  expect(text).not.toContain("data-withdraw");
});
