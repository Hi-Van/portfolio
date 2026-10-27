---
title: Content and provenance
group: Foundations
status: current
reviewed: 2026-10-26
sources:
  - web/content/ids.ts
  - web/content/types.ts
  - web/content/facts.ts
  - web/content/model.ts
  - web/content/accent.ts
  - scripts/check-content.mjs
---

# Content and provenance

Every number the site states is defined once, in `web/content/facts.ts`, and every surface renders it from there. A number carries its own provenance, so the reader can tell a measurement from an arithmetic result from an assumption without reading the surrounding prose.

## The registry

One entry per number, keyed by an id declared in `web/content/ids.ts`.

| Field | Holds |
| --- | --- |
| `id` | The stable name other facts and the agent corpus refer to |
| `value` | The machine value. Absent only for a claim that is not measured |
| `unit` | What the value counts, so a formatter can render it later |
| `display` | The authored form, exactly as it appears on the site |
| `label` | What the number is about, used in captions and accessible text |
| `provenance` | The class, plus the mechanism or the control that produces it |
| `sources` | The surfaces allowed to show it |

`display` and `value` are both present for a stated figure, and a test asserts that the digits of one match the other. Neither can drift without failing.

## The four classes

| Class | Meaning | Colour |
| --- | --- | --- |
| `measured` | Observed at a named employer, with the mechanism that produced it | Indigo |
| `derived` | Arithmetic over other facts, naming its inputs by id | Indigo |
| `assumed` | A control the reader can change. Never presented as a measurement | Clay |
| `not-measured` | A claim the site names and refuses to quantify | Neutral |

A derived figure names its inputs as ids rather than as numbers, so it is computed from the registry and never from a copy.

## The accent rule lives in one function

`accentFor(provenance)` in `web/content/accent.ts` is the only place a class becomes a colour role. It returns a closed union of `data`, `assume`, or `neutral`, and the switch is exhaustive, so a new provenance class cannot compile until it has been given a colour or deliberately given none. No component may pick an accent any other way.

## The single-source rule

A surface renders a `Fact`, never a literal. `scripts/check-content.mjs` scans JSX text nodes for digits and fails the build when one appears outside the registry, so "every number carries a mechanism" is enforced rather than remembered. A line that genuinely needs a number outside the registry can be annotated with `content-literal-ok`, and that annotation is visible in review.

Employer-scoped figures stay scoped: a figure measured at Meta may only appear on the work surface, and a test asserts it.

## The figures

Fifteen numbers, matching the provenance list in `README.md`.

| Id | Class | Shown on |
| --- | --- | --- |
| `queries-faster` | measured, Walmart | home, work, report |
| `storage-saved` | measured, Walmart | work, report |
| `intake-per-second` | measured, Walmart | home, work, report |
| `submissions-per-day` | measured, Walmart | home, work, report |
| `session-shorter` | measured, Walmart | home, work, report |
| `meta-queries-per-second` | measured, Meta | work |
| `meta-platform-performance` | measured, Meta | work |
| `meta-build-smaller` | measured, Meta | work |
| `submissions-per-year` | derived | report |
| `filing-hours-per-second` | derived | report |
| `seller-hours-returned` | derived | report |
| `seconds-per-record` | assumed | report |
| `human-share` | assumed | report |
| `session-minutes` | assumed | report |
| `revenue` | not measured | report |

## The arithmetic

`web/content/model.ts` holds the formulas as pure functions with the default assumptions exported. The build-time render and the reader's two controls both call them, so `annualSubmissions`, `filingHoursPerSecond`, and `sellerHoursReturned` exist once. At the defaults they produce `142,350,000`, `2,500`, and `782,925`, which is what the report prints and what the agent must state.

## Source

- `web/content/ids.ts` for the id vocabulary.
- `web/content/types.ts` for the provenance union.
- `web/content/facts.ts` for the registry.
- `web/content/accent.ts` for the colour mapping.
- `web/content/model.ts` for the arithmetic.
- `scripts/check-content.mjs` for the enforcement.
- `web/tests/unit/facts.test.ts` and `web/tests/unit/model.test.ts` for the assertions.
