import { expect, test } from "vitest";
import { isAskRequest } from "../../lib/ask/guards";

test("a well formed request is accepted", () => {
  expect(isAskRequest({ question: "What did he ship?" })).toBe(true);
  expect(
    isAskRequest({
      question: "And before that?",
      history: [
        { role: "user", text: "What did he ship?" },
        { role: "assistant", text: "Three systems." },
      ],
    }),
  ).toBe(true);
});

test("an empty, missing, or over-long question is rejected", () => {
  expect(isAskRequest({})).toBe(false);
  expect(isAskRequest({ question: "" })).toBe(false);
  expect(isAskRequest({ question: "   " })).toBe(false);
  expect(isAskRequest({ question: "x".repeat(281) })).toBe(false);
  expect(isAskRequest({ question: 42 })).toBe(false);
});

test("a malformed history is rejected", () => {
  expect(isAskRequest({ question: "Hi", history: "nope" })).toBe(false);
  expect(
    isAskRequest({ question: "Hi", history: [{ role: "system", text: "x" }] }),
  ).toBe(false);
  expect(
    isAskRequest({
      question: "Hi",
      history: Array.from({ length: 13 }, () => ({ role: "user", text: "x" })),
    }),
  ).toBe(false);
});
