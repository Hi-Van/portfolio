import { deepSeek } from "@ai-sdk/deepseek";
import type { LanguageModel } from "ai";

/** One constant for the model, its output ceiling, and the question ceiling. */
export const LIMITS = {
  model: "deepseek-chat",
  maxOutputTokens: 400,
  maxQuestion: 280,
} as const;

export function hasCredential(): boolean {
  return typeof process.env.DEEPSEEK_API_KEY === "string" && process.env.DEEPSEEK_API_KEY.length > 0;
}

/** Read at request time, never at module load, and never sent to the client. */
export function model(): LanguageModel {
  return deepSeek(LIMITS.model);
}
