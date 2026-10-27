# content/

The content model. One registry for every number, page copy as data, and the agent's reach.

## The files

| File | Owns |
|---|---|
| `ids.ts` | The vocabulary: surface ids, control ids, and the list of fact ids |
| `types.ts` | The provenance union and the `Fact` shape |
| `facts.ts` | The registry: every number the site states, with its mechanism |
| `model.ts` | The report's arithmetic, as pure functions with the default assumptions |
| `accent.ts` | The only place a provenance becomes a colour role |
| `format.ts` | Compact and grouped formatting for figure labels |
| `site.ts` | The name, the contact address, the production origin, the routes |
| `home.ts`, `work.ts`, `about.ts`, `report.ts` | One surface's copy |
| `corpus.ts` | One chunk per anchorable section, which is also the agent's reach |
| `index.ts` | The barrel |

## The rule

A number exists once. `facts.ts` is that once.

`check-content.mjs` fails when a JSX text node contains a digit, so a component cannot print a literal.
Report prose is the interesting case: it carries `{fact-id}` placeholders and `renderProse()` resolves
them at render, which means the document's numbers cannot drift from the rest of the site.

## Adding a number

1. Add the id to `factIds` in `ids.ts`.
2. Add the entry to `facts.ts`: `value`, `unit`, `display`, `label`, `provenance`, `sources`.
3. Pick the provenance:
   - `measured` names the employer and the mechanism.
   - `derived` names its inputs by id and the arithmetic. The value is a checked default, not a copy.
   - `assumed` names the control the reader changes.
   - `not-measured` states why there is no number.
4. If it is derived, add a case to `model.ts` and a test that recomputes it.
5. Update the counts and the table in
   `../design-system/foundations/content-and-provenance.md`.
6. Run `npm run check`. Two tests will tell you if `display` and `value` disagree, or if an employer
   scoped figure leaked to another surface.

`display` and `value` are both required for a stated figure, and a test asserts the digits match.
Change one and you change the other.

## Employer scoping

A figure measured at one employer may only appear on the surfaces that discuss it. The Meta figures are
`["work"]` and a test asserts that home, the report, and the corpus cannot reach them.

## The copy

Page copy is data so the structure stays uniform and the word count stays computable.

- Home, work, and about export an object of strings and arrays.
- `report.ts` exports sections, captions, the method rows, and three helpers: `renderProse`,
  `wordCount`, and `readingMinutes`. The stated reading time is computed, never typed.
- Copy rules are normative: first person, no em dashes, every number carries a mechanism, every figure
  caption states its assumption, no invented data.

## The corpus

`corpus.ts` is the agent's reach. One entry per anchorable section, with a `href` that must resolve.

- Add a chunk when you add a section a reader might ask about. `tests/unit/corpus.test.ts` fails if a
  report section or work role has no chunk, or if two chunks share an anchor.
- `keywords` are matched against the question after stop-word removal and suffix stemming. Include the
  words a reader would actually type, including the numbers they might ask about.
- The chunk text is also the passage the stream guard traces numerals against, so keep its figures
  identical to the registry.

## Don't

- Don't format a number at a call site. Add a helper to `format.ts` or render the registry's `display`.
- Don't add a fact without a mechanism. The test asserts one.
- Don't put a literal digit in a report paragraph; use a placeholder.
- Don't let the address appear anywhere but `site.ts`; a test asserts the literal exists in one file.
