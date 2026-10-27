# Proposal

## Why

The site's design is documented far better than its content is. Every headline number is
hand-written into three to five files at once: `390,000`, `450,000`, and `22%` each appear in
`index.html`, `report.html`, the agent's keyword index, and the README, and `30%` appears in five.
Nothing decides which copy is authoritative, so they can drift apart silently, and one already has:
the report prints `782,925` while the agent says "about 783,000".

At the same time the specs describe one delivery medium rather than the product. All fifteen
design-system docs carry selectors, custom properties, file paths, and line-number citations, so a
reader cannot tell which rules are the design and which are artifacts of static HTML. That is why
thirteen disagreements sit in a "contract debt" table: a doc and a stylesheet fell out of step and
nobody arbitrated, because the doc's job was to describe the stylesheet.

The agent on `ask.html` shows the cost. It answers from thirteen hand-written topics, because there
is no content model to answer from and no server to answer with, so every question outside those
thirteen gets the same fixed refusal.

This change separates the product from its medium, then builds a new medium that the specs make no
assumptions about.

## What Changes

- Six capabilities are specified as observable behaviour, with no framework, build step, file
  layout, selector, or storage key named in any of them.
- **BREAKING** The delivered medium is replaced. The five static documents, the two shared
  stylesheets, the classic scripts, and the print-tuned standalone report are retired.
- **BREAKING** Five documented rules stop being requirements, because they describe the old medium
  and not the product: `file://` delivery, no build step, no framework, classic IIFE scripts only,
  and class names or line numbers as the unit of specification.
- Content gains one source of truth. A number is defined once, carries a provenance tag and a
  mechanism, and every surface renders from it.
- The thirteen rows of contract debt are resolved by decision, in one pass, instead of being
  recorded as standing disagreements.
- The agent gains a server-side answer path: answers grounded in site content, citations that are
  validated against the content model, one fixed refusal, and no number that is not in the source.
- Accessibility stops being a table of known failures. The target-size floor, the focus ring, the
  skip link, the landmarks, and reduced motion become requirements with scenarios.
- Launch blockers become requirements: a real address, an origin with canonical URLs, a not-found
  surface, a share image, and a résumé path.

## Capabilities

### New Capabilities

- `site-content`: the five surfaces and their jobs, the prose, the number registry with provenance
  and mechanism, and the copy rules that keep every figure honest.
- `design-contract`: the materials, the two accents and their fixed meanings, the three voices and
  the scale between them, the shape language, the reading measure, and the contrast floors in both
  themes.
- `site-shell`: the top bar, navigation, the one invitation, the agent switch, the theme choice and
  its persistence, the narrow-viewport menu, the footer, and the keyboard path through all of them.
- `report-document`: the report as its own document type, including the reading column, five
  figures with assumption-stating captions, the three-input model whose outputs follow its inputs,
  and the method note.
- `site-agent`: grounded answers over site content, citations to a surface and anchor, a single
  fixed refusal, the prohibition on unstated numbers, and the return path to where the reader came
  from.
- `launch-readiness`: the address, the origin and canonical URLs, the not-found surface, the share
  image, and the résumé path.

### Modified Capabilities

None. `openspec/specs/` is empty, so every capability above is new.

## Impact

- **Retired code**: `index.html`, `work.html`, `about.html`, `report.html`, `ask.html` as documents;
  `assets/site.css`, `assets/tui.css`, `assets/site.js`, `assets/theme.js`, `assets/tui.js`;
  `assets/fonts/` with its five font files, which move to a build-time font import;
  `scripts/check-design-tokens.py`, `scripts/check-artifact-coverage.py`.
- **Retired evidence**: `preview/`, thirty screenshots that predate this change.
- **Docs rewritten**: `AGENTS.md`, `README.md`, `DESIGN.md`, and the fifteen design-system docs lose
  their implementation stratum and keep their design stratum. `DESIGN.md` stays the token contract
  and must still lint clean.
- **New surface**: one server endpoint for the agent, plus a server-side secret it must never
  expose to the client.
- **New checks**: the two retired scripts are replaced by checks against the new medium, one for the
  token contract and one for content coverage.
- **Version control**: this folder is not a repository and has no history and no revert. A
  repository must exist before the first file moves, or the old medium cannot be recovered.
- **Launch blockers**: a real address, an origin, a not-found surface, a share image, a résumé path.
