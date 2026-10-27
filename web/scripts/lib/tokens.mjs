// Shared parsing for the token checks: the contract, the raw scopes, the theme block.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const web = join(here, "..", "..");

export const DESIGN = join(web, "..", "DESIGN.md");
export const CSS = join(web, "app", "globals.css");

/** DESIGN.md key -> the raw variable the stylesheet uses. */
export const ROLE_MAP = {
  primary: "ink",
  secondary: "indigo",
  tertiary: "clay",
  neutral: "paper",
  panel: "panel",
  body: "body",
  muted: "muted",
  badge: "badge",
};

export function readContract(path = DESIGN) {
  const text = readFileSync(path, "utf8");
  const front = text.match(/^---\n([\s\S]*?)\n---/);
  if (!front) throw new Error(`${path}: no front matter`);
  const colours = {};
  for (const line of front[1].split("\n")) {
    const hit = line.match(/^ {2}([a-z]+):\s*"(#[0-9a-fA-F]{3,8})"\s*$/);
    if (hit) colours[hit[1]] = hit[2].toLowerCase();
  }
  return colours;
}

function matchingBrace(text, openIndex) {
  let depth = 0;
  for (let i = openIndex; i < text.length; i += 1) {
    if (text[i] === "{") depth += 1;
    if (text[i] === "}") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  throw new Error("unbalanced braces");
}

/** Returns { "--name": "value" } for the first block matching a selector. */
export function readBlock(text, selector) {
  const at = text.indexOf(selector);
  if (at === -1) throw new Error(`missing block: ${selector}`);
  const open = text.indexOf("{", at);
  const close = matchingBrace(text, open);
  const body = text.slice(open + 1, close);
  const vars = {};
  for (const hit of body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    vars[hit[1]] = hit[2].trim();
  }
  return vars;
}

/** The names declared inside `@theme inline { ... }`. */
export function readThemeNames(text) {
  const at = text.indexOf("@theme inline");
  const open = text.indexOf("{", at);
  const close = matchingBrace(text, open);
  return [...text.slice(open + 1, close).matchAll(/(--[a-z0-9*-]+)\s*:/g)].map(
    (match) => match[1],
  );
}
