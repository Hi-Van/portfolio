import { expect, test } from "vitest";
import { REFUSAL } from "../../lib/ask/compose";
import { visibleAnswer } from "../../lib/agent/parts";

test("an answer is the text it streamed", () => {
  const result = visibleAnswer([
    { type: "text", text: "Queries ran 30% faster. " },
    { type: "text", text: "[[work#walmart|work, Walmart]]" },
  ]);
  expect(result.withdrawn).toBe(false);
  expect(result.text).toContain("30% faster");
});

test("a withdrawal replaces the answer with the refusal", () => {
  const result = visibleAnswer([
    { type: "text", text: "Queries ran 30% faster. " },
    { type: "data-withdraw", data: { reason: "untraced number" } },
    { type: "text", text: "and more text that must not survive" },
  ]);
  expect(result.withdrawn).toBe(true);
  expect(result.text).toBe(REFUSAL);
  expect(result.text).not.toContain("faster");
});

test("a refusal with no withdrawal still reads as the refusal", () => {
  const result = visibleAnswer([{ type: "text", text: REFUSAL }]);
  expect(result.withdrawn).toBe(false);
  expect(result.text).toBe(REFUSAL);
});
