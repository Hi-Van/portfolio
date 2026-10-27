/**
 * The stream guard. Two rules, applied to text on its way to the reader:
 *
 * 1. A numeral is not released until it is complete and traceable to the
 *    passage the answer came from.
 * 2. An anchor is not released until it is closed, because a half-written
 *    marker would render as literal brackets.
 *
 * A violation ends the answer. The endpoint then withdraws it, so the reader
 * never sees an untraceable number.
 */

const ANCHOR_OPEN = "[[";
const ANCHOR_CLOSE = "]]";

/** Digits only, so 390,000 and 390.000 compare equal. */
export function digits(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

export function allowedDigits(sources: string[]): Set<string> {
  const allowed = new Set<string>();
  for (const source of sources) {
    for (const match of source.matchAll(/[0-9][0-9,.]*/g)) {
      const normalised = digits(match[0]);
      if (normalised.length > 0) allowed.add(normalised);
    }
  }
  return allowed;
}

function firstUntraced(text: string, allowed: Set<string>): string | null {
  for (const match of text.matchAll(/[0-9][0-9,.]*/g)) {
    const normalised = digits(match[0]);
    if (normalised.length === 0) continue;
    if (!allowed.has(normalised)) return match[0];
  }
  return null;
}

export type GuardResult = { text: string; violation: string | null };

export function createStreamGuard(allowed: Set<string>) {
  let held = "";

  function release(upTo: number): GuardResult {
    const text = held.slice(0, upTo);
    held = held.slice(upTo);
    const violation = firstUntraced(text, allowed);
    if (violation !== null) return { text: "", violation };
    return { text, violation: null };
  }

  return {
    push(delta: string): GuardResult {
      held += delta;

      let holdFrom = held.length;
      const open = held.lastIndexOf(ANCHOR_OPEN);
      if (open !== -1 && held.indexOf(ANCHOR_CLOSE, open) === -1) holdFrom = open;

      const trailing = held.slice(0, holdFrom).match(/[0-9][0-9,.]*$/);
      if (trailing) holdFrom -= trailing[0].length;

      return release(holdFrom);
    },

    flush(): GuardResult {
      return release(held.length);
    },
  };
}
