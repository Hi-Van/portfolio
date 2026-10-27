import { expect, test } from "vitest";
import { allowedDigits, createStreamGuard, digits } from "../../lib/ask/guard";

const SOURCE = "Files 450,000 records a second and returns 782,925 hours.";

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
  expect(result.violation).toBe("350,000");
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
  expect(end.violation).toBe("782");
});

test("the allowed set comes from the passage", () => {
  const allowed = allowedDigits([SOURCE]);
  expect(allowed.has("450000")).toBe(true);
  expect(allowed.has("782925")).toBe(true);
  expect(allowed.has("350000")).toBe(false);
});
