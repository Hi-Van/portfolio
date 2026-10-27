import { LIMITS } from "./provider";

export type Turn = { role: "user" | "assistant"; text: string };
export type AskRequest = { question: string; history: Turn[] };

function isTurn(value: unknown): value is Turn {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    (record.role === "user" || record.role === "assistant") &&
    typeof record.text === "string" &&
    record.text.length <= 2000
  );
}

/** The request guard, declared as a type predicate so parser and type cannot drift. */
export function isAskRequest(value: unknown): value is AskRequest {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  if (typeof record.question !== "string") return false;
  const question = record.question.trim();
  if (question.length < 1 || question.length > LIMITS.maxQuestion) return false;
  if (record.history === undefined) return true;
  return (
    Array.isArray(record.history) &&
    record.history.length <= 12 &&
    record.history.every(isTurn)
  );
}
