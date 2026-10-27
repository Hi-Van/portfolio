import { expect, test } from "vitest";
import { allowedDigits, createStreamGuard, digits } from "../../lib/ask/guard";

const SOURCE = "Files 450,000 records a second and returns 782,925 hours.";
const ANCHORS = new Set(["work#walmart", "work", "about"]);

test("digits compares 390,000 and 390.000 as equal", () => {
  expect(digits("390,000")).toBe(digits("390.000"));
});

test("a traced number is released", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]));
  const result = guard.push("It files 450,000 records a second. ");
  expect(result.violation).toBeNull();
  expect(result.text).toContain("450,000");
});

test("a number split across chunks is not released early", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]));
  const first = guard.push("It files 45");
  expect(first.text).toBe("It files ");
  const second = guard.push("0,000 records");
  expect(second.violation).toBeNull();
  expect(second.text).toBe("450,000 records");
});

test("an untraced number ends the answer", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]));
  const result = guard.push("It files 350,000 records a second.");
  expect(result.violation).toContain("350,000");
  expect(result.text).toBe("");
});

test("an anchor split across chunks is held until it closes", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]));
  const first = guard.push("Files records. [[work#wa");
  expect(first.text).not.toContain("[[");
  const second = guard.push("lmart|work, Walmart]]");
  expect(second.text).toContain("[[work#walmart|work, Walmart]]");
});

test("flush releases a trailing number and still traces it", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]));
  guard.push("It returns 782");
  const end = guard.flush();
  expect(end.violation).toContain("782");
});

test("the allowed set comes from the passage", () => {
  const allowed = allowedDigits([SOURCE]);
  expect(allowed.has("450000")).toBe(true);
  expect(allowed.has("782925")).toBe(true);
  expect(allowed.has("350000")).toBe(false);
});

test("a citation that resolves is released as written", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]), ANCHORS);
  const result = guard.push("Files records. [[work#walmart|work, Walmart]]");
  expect(result.violation).toBeNull();
  expect(result.text).toContain("[[work#walmart|work, Walmart]]");
});

test("a bare surface citation resolves", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]), ANCHORS);
  const result = guard.push("A person. [[about|about]]");
  expect(result.violation).toBeNull();
  expect(result.text).toContain("[[about|about]]");
});

test("a fabricated anchor ends the answer", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]), ANCHORS);
  const result = guard.push("Files records. [[work#not-real|work, somewhere]]");
  expect(result.violation).toContain("work#not-real");
  expect(result.text).toBe("");
});

test("an anchor split across chunks resolves once it closes", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]), ANCHORS);
  const first = guard.push("Files records. [[work#wa");
  expect(first.violation).toBeNull();
  expect(first.text).not.toContain("[[");
  const second = guard.push("lmart|work, Walmart]]");
  expect(second.violation).toBeNull();
  expect(second.text).toContain("[[work#walmart|work, Walmart]]");
});

test("an anchor is not checked when no allowed set is supplied", () => {
  const guard = createStreamGuard(allowedDigits([SOURCE]));
  const result = guard.push("Files records. [[work#not-real|work, somewhere]]");
  expect(result.violation).toBeNull();
});
