/**
 * The stream guard. Three rules, applied to text on its way to the reader:
 *
 * 1. A numeral is not released until it is complete and traceable to the
 *    passage the answer came from.
 * 2. An anchor is not released until it is closed, because a half-written
 *    marker would render as literal brackets.
 * 3. When an allowed set of citation targets is supplied, a closed anchor
 *    must name one of them, so a fabricated citation never becomes a link.
 *
 * A violation ends the answer. The endpoint then withdraws it, so the reader
 * never sees an untraceable number or a citation that goes nowhere.
 */

const ANCHOR_OPEN = "[[";
const ANCHOR_CLOSE = "]]";
const CLOSED_ANCHOR = /\[\[([^[\]]*)\]\]/g;
const CITATION = /^([a-z]+)(?:#([a-z0-9-]+))?\|[^[\]]+$/;

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

function firstUntraced(
  text: string,
  allowed: ReadonlySet<string>,
): string | null {
  for (const match of text.matchAll(/[0-9][0-9,.]*/g)) {
    const normalised = digits(match[0]);
    if (normalised.length === 0) continue;
    if (!allowed.has(normalised)) return `untraced number: ${match[0]}`;
  }
  return null;
}

/**
 * Every closed marker in the released text must parse and resolve. The whole
 * marker is accepted: `[[surface#anchor|label]]` or `[[surface|label]]`.
 */
function firstUnresolvedAnchor(
  text: string,
  anchors: ReadonlySet<string>,
): string | null {
  for (const match of text.matchAll(CLOSED_ANCHOR)) {
    const citation = CITATION.exec(match[1]);
    if (citation === null) return `malformed anchor: ${match[0]}`;
    const [, surface, anchor] = citation;
    const target = anchor ? `${surface}#${anchor}` : surface;
    if (!anchors.has(target)) return `unresolved anchor: ${target}`;
  }
  return null;
}

export type GuardResult = { text: string; violation: string | null };

export function createStreamGuard(
  allowed: ReadonlySet<string>,
  anchors?: ReadonlySet<string>,
) {
  let held = "";

  function release(upTo: number): GuardResult {
    const text = held.slice(0, upTo);
    held = held.slice(upTo);
    const violation =
      firstUntraced(text, allowed) ??
      (anchors ? firstUnresolvedAnchor(text, anchors) : null);
    if (violation !== null) return { text: "", violation };
    return { text, violation: null };
  }

  return {
    push(delta: string): GuardResult {
      held += delta;

      let holdFrom = held.length;
      const open = held.lastIndexOf(ANCHOR_OPEN);
      if (open !== -1 && held.indexOf(ANCHOR_CLOSE, open) === -1)
        holdFrom = open;

      const trailing = held.slice(0, holdFrom).match(/[0-9][0-9,.]*$/);
      if (trailing) holdFrom -= trailing[0].length;

      return release(holdFrom);
    },

    flush(): GuardResult {
      return release(held.length);
    },
  };
}
