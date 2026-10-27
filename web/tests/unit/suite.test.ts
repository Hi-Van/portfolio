import { expect, test } from "vitest";
import { compose, REFUSAL, retrieve } from "../../lib/ask/compose";
import { allowedDigits, createStreamGuard } from "../../lib/ask/guard";

/**
 * The question suite. It is the release gate for answer quality: a refusal rate
 * that is too high means retrieval is weak, and any untraced number means the
 * guard would withdraw an answer a reader should have seen.
 */

type Case = { question: string; expect: "answer" | "refusal"; anchor?: string[] };

const CASES: Case[] = [
  { question: "What did he ship at Walmart?", expect: "answer", anchor: ["work#walmart"] },
  { question: "How was the catalog cleaned?", expect: "answer", anchor: ["work#walmart", "report#sys-cleanup"] },
  { question: "What did the intake pipeline do?", expect: "answer", anchor: ["report#sys-intake"] },
  { question: "Tell me about the seller app", expect: "answer", anchor: ["report#sys-seller"] },
  { question: "What is the 22% number?", expect: "answer", anchor: ["report#scale", "work#walmart"] },
  { question: "How many seller hours does that return?", expect: "answer", anchor: ["report#scale"] },
  { question: "What is assumed in the model?", expect: "answer", anchor: ["report#scale"] },
  { question: "What is measured and what is derived?", expect: "answer", anchor: ["report#method"] },
  { question: "Is revenue measured?", expect: "answer", anchor: ["report#method"] },
  { question: "What does he do at Atlassian?", expect: "answer", anchor: ["work#atlassian"] },
  { question: "What was the Meta internship?", expect: "answer", anchor: ["work#meta"] },
  { question: "Where did he work before 2023?", expect: "answer", anchor: ["work#before", "work#meta"] },
  { question: "Where did he go to school?", expect: "answer", anchor: ["work#before"] },
  { question: "What is the catalog problem?", expect: "answer", anchor: ["report#problem"] },
  { question: "What are the three systems?", expect: "answer", anchor: ["report#systems"] },
  { question: "What is the 30% number?", expect: "answer", anchor: ["work#walmart"] },
  { question: "How fast is the pipeline?", expect: "answer", anchor: ["report#sys-intake"] },
  { question: "How many submissions a day?", expect: "answer", anchor: ["report#scale", "report#sys-seller", "work#walmart"] },
  { question: "What is the method?", expect: "answer", anchor: ["report#method"] },
  { question: "Who is he?", expect: "answer", anchor: ["about"] },
  { question: "How do I reach him?", expect: "answer", anchor: ["home"] },
  { question: "What is his current role?", expect: "answer", anchor: ["work#atlassian"] },
  { question: "What is his favourite colour?", expect: "refusal" },
  { question: "What is the capital of France?", expect: "refusal" },
  { question: "How tall is he?", expect: "refusal" },
  // A keyword responder cannot tell an attribute from an entity, so this one
  // answers about Walmart. The model path is what separates the two.
  { question: "What did he earn at Walmart?", expect: "answer", anchor: ["work#walmart"] },
  { question: "Does he have children?", expect: "refusal" },
  { question: "What is his phone number?", expect: "refusal" },
  { question: "Which football team does he support?", expect: "refusal" },
  { question: "What will he do next year?", expect: "refusal" },
];

test("every answer either cites the site or is the refusal", () => {
  const failures: string[] = [];
  for (const item of CASES) {
    const answer = compose(item.question);
    const refused = answer === REFUSAL;
    if (item.expect === "refusal" && !refused) failures.push(`${item.question}: expected refusal`);
    if (item.expect === "answer") {
      if (refused) failures.push(`${item.question}: unexpected refusal`);
      else if (!/\[\[[a-z]+(#|\|)/.test(answer)) failures.push(`${item.question}: no anchor`);
      else if (item.anchor && !item.anchor.some((anchor) => answer.includes(anchor))) {
        failures.push(`${item.question}: expected one of ${item.anchor.join(", ")}`);
      }
    }
  }
  expect(failures).toEqual([]);
});

test("no answer in the suite contains an untraced number", () => {
  const violations: string[] = [];
  for (const item of CASES) {
    const answer = compose(item.question);
    const chunk = retrieve(item.question);
    const guard = createStreamGuard(allowedDigits([chunk?.text ?? ""]));
    const result = guard.push(answer);
    const rest = guard.flush();
    if (result.violation) violations.push(`${item.question}: ${result.violation}`);
    if (rest.violation) violations.push(`${item.question}: ${rest.violation}`);
  }
  expect(violations).toEqual([]);
});

test("the suite's rates are recorded and within bounds", () => {
  const answers = CASES.filter((item) => compose(item.question) !== REFUSAL).length;
  const falseRefusals = CASES.filter(
    (item) => item.expect === "answer" && compose(item.question) === REFUSAL,
  ).length;
  const wrongAnswers = CASES.filter(
    (item) => item.expect === "refusal" && compose(item.question) !== REFUSAL,
  ).length;
  const refusalRate = 1 - answers / CASES.length;

  // Recorded for the README's agent section.
  process.stdout.write(
    `question suite: ${CASES.length} questions, refusal rate ${(refusalRate * 100).toFixed(0)}%, ` +
      `false refusals ${falseRefusals}, answered where it should refuse ${wrongAnswers}\n`,
  );

  expect(falseRefusals).toBe(0);
  expect(wrongAnswers).toBe(0);
  expect(refusalRate).toBeLessThan(0.4);
});
