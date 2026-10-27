import { REFUSAL } from "../ask/compose";

/**
 * The one part name a withdrawal travels under. The route writes it and the
 * transcript looks for it, so both sides name the same thing in one place.
 */
export const WITHDRAW_PART = "data-withdraw" as const;

export type Part = { type: string; text?: string; data?: unknown };

/**
 * What the transcript shows for one message. A withdrawal part replaces the
 * answer with the refusal, because streamed text cannot be un-said on the wire:
 * the client has to drop it deliberately.
 */
export function visibleAnswer(parts: Part[]): {
  text: string;
  withdrawn: boolean;
} {
  const withdrawn = parts.some((part) => part.type === WITHDRAW_PART);
  if (withdrawn) return { text: REFUSAL, withdrawn: true };
  const text = parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
  return { text, withdrawn: false };
}
