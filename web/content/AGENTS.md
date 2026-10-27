# content/

Everything the site says: one registry for every number, one copy file per surface, the report's
arithmetic, and the passages the agent may answer from.

## The files

| File | Owns |
|---|---|
| `web/content/ids.ts` | The vocabulary: `surfaceIds`, `controlIds`, `factIds`, and the types derived from them |
| `web/content/types.ts` | The `Provenance` union and its four members, the closed `Unit` union, the `Fact` union of `StatedFact` and `UnstatedFact`, and `isStated` |
| `web/content/facts.ts` | The registry, keyed by `FactId`, plus `fact(id)`, `factValue(id)`, `isFactId(id)`, `factsFor(surface)`, and `UnstatedFactError` |
| `web/content/model.ts` | The report's arithmetic as pure functions, `DEFAULT_ASSUMPTIONS`, `DAYS_PER_YEAR`, `defaultOutput`, `clamp` |
| `web/content/accent.ts` | `accentFor(provenance)` and the `Accent` union, the one mapping from class to role |
| `web/content/format.ts` | `compact` and `grouped`, for SVG labels and accessible value text |
| `web/content/site.ts` | `site` (name, origin, email, nav, surfaces), `NavItem`, and `fromKey`, `urlFor`, `isCurrent` |
| `web/content/home.ts` | The home copy and `bandCells()`, which builds the three result cells from the registry |
| `web/content/work.ts` | `work`: roles, system rows, and the `RoleRow` and `SystemRow` types |
| `web/content/about.ts` | The bio, the four facts rows, and the contact block copy |
| `web/content/report.ts` | `report`: masthead, abstract, sections, subsections, five captions, method rows, author, contact, `wordsPerMinute`; `ReportSection`; and the placeholder helpers |
| `web/content/corpus.ts` | `Chunk` and `corpus`, the passages the agent retrieves from |
| `web/content/index.ts` | The barrel. Exports only, and no application file imports it today |

## The single-source rule

A number exists once, in `web/content/facts.ts`. A surface renders `Fact.display` or calls
`fact(id)`; it never types the figure. Five mechanisms hold that:

| Mechanism | What it does | Where |
|---|---|---|
| The record type | `facts` is `Record<FactId, Fact>`, so an id without an entry and an entry without an id both fail `tsc` | `web/content/facts.ts` |
| The build scan | Walks `app/` and `components/` for `.tsx`, matches one line of `>text<`, and fails on a digit in a JSX text node | `web/scripts/check-content.mjs` |
| The type assertion | A number or a string cannot be passed where a `Fact` is required; `tsc` runs over `tests/` during the build | `web/tests/types/fact-types.ts` |
| Display agreement | Strips everything but digits and dots from `display` and compares it with `String(value)` | `web/tests/unit/facts.test.ts` |
| Employer scope | Meta figures must carry `sources: ["work"]`, and no home or report fact may be measured at Meta | `web/tests/unit/facts.test.ts`, `web/tests/unit/contact.test.ts` |

The scan is narrower than the rule. It reads JSX text nodes only, in `.tsx` files under `app/` and
`components/`. It does not read `content/*.ts`, JSX attributes, or values inside braces, and annotating
a line with `content-literal-ok` exempts every digit on that line. Report paragraphs, figure captions,
and corpus passages are prose in `.ts` files, held by review and by the tests named here, not by the
scanner. Dates and periods such as `2023 to 2025`, `Jun 2025 to now`, `October 2026`, and
`Four years` are typed strings in the copy files, not registry facts.

## The Fact shape

| Field | Required | Holds |
|---|---|---|
| `id` | yes | The stable name, which repeats the registry key. `ids.ts` declares the list, and a test checks the entries are distinct |
| `value` | stated only | The machine value, read through `factValue(id)`. The `not-measured` member has no value at all |
| `unit` | stated only | A member of the closed `Unit` union. Declarative only; nothing reads it at render |
| `display` | yes | The authored form, exactly as the reader sees it |
| `label` | yes | What the number is about, for captions and accessible value text |
| `provenance` | yes | The class and what it carries. It is also the discriminant |
| `sources` | yes | The surfaces allowed to show it, as `SurfaceId` values |

`Fact` is a union of `StatedFact` (measured, derived, or assumed) and `UnstatedFact` (not measured),
discriminated on `provenance.kind`. A stated fact carries `value` and `unit`; an unstated one declares
them `never`, so `fact(id).value` is not a number a component can read by accident. Use
`isStated(fact)` to narrow, and `factValue(id)` to get the machine form of a stated fact: it throws
`UnstatedFactError` for a claim the site refuses to quantify rather than falling back to zero.

The registry holds 16 entries: 8 measured (5 at Walmart, 3 at Meta), 4 derived, 3 assumed, 1 not
measured. `web/tests/unit/facts.test.ts` pins the total and each count by reading `provenance.kind`,
and `factIds` in `web/content/ids.ts` has to grow with it. The annotated table of all 16 lives in
`design-system/foundations/content-and-provenance.md`; do not fork it here.

## The four provenance classes

| Class | Carries | What is checked | `accentFor` | Colour |
|---|---|---|---|---|
| `measured` | `where: "walmart"` or `"meta"`, and `mechanism` | The employer is type-enforced, and the mechanism is longer than 10 characters | `data` | Indigo |
| `derived` | `inputs: FactId[]` and `mechanism` | At least one input, a mechanism longer than 10 characters, and a stored value that recomputes from the inputs | `data` | Indigo |
| `assumed` | `control: ControlId` | The control id exists in `controlIds`, and a value and display are present so the display test applies | `assume` | Clay |
| `not-measured` | `note` | The note is longer than 10 characters. There is no number, so no value and no unit | `neutral` | No accent |

`accentFor` in `web/content/accent.ts` takes the whole `Provenance` object, not the kind string, and
returns `"data"`, `"assume"`, or `"neutral"`. The switch is exhaustive with no default, so a new
member of `Provenance` does not compile until it has been mapped. `web/tests/unit/facts.test.ts` pins
all four results, and `web/tests/types/fact-types.ts` pins that a string is not accepted.

Two things to know before you trust the mapping:

- No component calls `accentFor` today. Figures and rows write `text-indigo` and `text-clay`
  directly, and `web/components/evidence/badge.tsx` stays neutral by design. The function is the
  contract those choices have to match, not a live call site.
- `assumed` does not mean adjustable. `seconds-per-record` is an assumption with a control id, and
  the report states it as fixed; only `human-share` and `session-minutes` are sliders.

The derived figures and their inputs:

| Derived id | Inputs by id |
|---|---|
| `submissions-per-year` | `submissions-per-day` |
| `filing-hours-per-second` | `intake-per-second`, `seconds-per-record` |
| `filing-person-days` | `filing-hours-per-second` |
| `seller-hours-returned` | `submissions-per-year`, `human-share`, `session-minutes`, `session-shorter` |

Each mechanism string states the arithmetic. The stored `value` is a checked default, not a separate
source of truth: between them, `web/tests/unit/facts.test.ts` and `web/tests/unit/model.test.ts`
recompute all four from their inputs and pin the same results through the functions.

## Adding a number

1. `web/content/ids.ts`: add the id to `factIds` under its class comment. Add a `ControlId` if the
   reader will change the value, and a `SurfaceId` only if a new surface can show it.
2. `web/content/types.ts`: add a member to `Unit` only if no existing unit describes the quantity.
   A new provenance class means editing `Provenance` and then `accentFor`.
3. `web/content/facts.ts`: add the entry with `id`, `value`, `unit`, `display`, `label`,
   `provenance`, and `sources`. Keep `sources` to the surfaces that discuss the employer.
4. `web/content/model.ts`: for a derived figure, add a pure function or reuse one, then add a case to
   `defaultOutput` if the report prints it at the defaults. A new assumption's default belongs in
   `DEFAULT_ASSUMPTIONS`; the slider range belongs in `web/components/report/model.tsx`.
5. State it where the reader sees it: a cell in `bandCells()` in `web/content/home.ts`, a `systems`
   row in `web/content/work.ts`, or a `{fact-id}` placeholder or caption in `web/content/report.ts`.
   The facts list in `web/content/about.ts` states no registry figure today, so do not copy its
   plain-string rows for a number. Never a literal anywhere.
6. `web/content/corpus.ts`: if the agent should reach it, put the same figure in the chunk `text` in
   digits, and add the reader's words, including the number, to `keywords`.
7. Tests: `web/tests/unit/facts.test.ts` for the total and the class split, and for a derived
   recompute; `web/tests/unit/model.test.ts` for the arithmetic at the defaults;
   `web/tests/unit/contact.test.ts` if the figure is employer-scoped; `web/tests/unit/corpus.test.ts`
   if you added an anchorable section; `web/tests/types/fact-types.ts` if the shape or the mapping
   changed. `web/tests/e2e/home.spec.ts` and `web/tests/e2e/work.spec.ts` assert specific displays,
   so a changed figure breaks them on purpose.
8. `design-system/foundations/content-and-provenance.md`: the count sentence, the figures table row,
   and the arithmetic values in its "The arithmetic" section.
9. `README.md`: the bullet under "The numbers, and where they come from", in the right class. The
   registry test names that list as the source of the figures.
10. Run `npm run check` in `web/`. The count in `facts.test.ts` fails first if the registry and the
    test disagree, and `check-artifacts.mjs` fails if a new source file is named nowhere.

`display` and `value` move together for a stated figure. A test strips commas, currency signs, and
units, so `$1,200` passes a value of 1200 and `1.2k` does not. Only the `not-measured` entry has
neither `value` nor `unit`.

## How report prose states a number

Report copy carries `{fact-id}` placeholders. `renderProse` in `web/content/report.ts` replaces each
one with `fact(id).display` at render. `web/app/report/page.tsx` calls it for every paragraph, every
method row body, and captions for figures 1 to 4; `web/components/report/model.tsx` calls it for
figure 5's caption. Placeholders exist so the document and the rest of the site read the same value:
the abstract, the method note, the figures, the home band, and the agent all come from one entry, so a
changed figure cannot leave the prose behind.

The details that matter when you edit a paragraph:

- The pattern is `[a-z0-9-]+` inside braces. `renderProse` checks the id with `isFactId` before it
  reads the registry and throws `UnknownPlaceholderError` naming the missing placeholder, so a typo
  fails the render and the word count instead of printing raw braces. A capital letter, an
  underscore, or a space means the braces are printed literally.
- `reportProse()` flattens the deck, the abstract, every section and subsection title and paragraph,
  the method lede and row bodies, the author and contact blocks, and the five figure captions, with
  placeholders resolved before counting. `wordCount()` splits that string on whitespace.
- `readingMinutes()` is `max(1, round(wordCount() / report.wordsPerMinute))`, with `wordsPerMinute` at
  200. `web/tests/e2e/report.spec.ts` compares the rendered reading time with `readingMinutes()`, so
  copy and the stated time move together.
- `placeholdersIn(text)` returns the ids in a string. `web/tests/unit/facts.test.ts` uses it to
  assert that every placeholder in the report's copy names a registry id.
- The method note and the figure 3 caption still type some assumptions as literals: `20 seconds per
  record`, `25% human traffic`, `records times 20 seconds`, and `daily times 365`. These are the
  report's known hand-typed figures. Captions now pass through `renderProse` too, so converting them
  to placeholders is safe when you touch those lines, and do not copy the pattern into new prose.

## The corpus

`web/content/corpus.ts` is the agent's retrieval set and, through `web/app/api/ask/route.ts`, the
allowlist for the numbers its answer may state. One entry per passage the agent can answer from:
four work roles, seven report passages (three numbered sections, three subsections, and the method),
the about page, and the home page. Thirteen entries today.

| Field | Must satisfy |
|---|---|
| `surface` | A `SurfaceId`. It also fixes the `href` prefix |
| `anchor` | A string, or `null` for a whole surface. Every report section and subsection id and every work role anchor needs exactly one chunk (`web/tests/unit/corpus.test.ts`) |
| `label` | The citation's link text, which the reader sees |
| `href` | `/` for home, otherwise `/${surface}` plus the anchor. The corpus test checks the prefix |
| `heading` | The section name, used in prompts and in failure messages |
| `text` | The passage. Figures as digits, identical to the registry |
| `keywords` | More than two, lowercase, in the words a reader would type |

Coverage is per numbered section, not per anchor. `web/app/report/page.tsx` also renders `abstract`
and `contact` anchors, and neither has a chunk; a question about the abstract lands on a section
chunk and is answered from there.

How a question is scored, in `web/lib/ask/compose.ts`:

- The question is lowercased and split on anything that is not a letter or digit. One-character words
  and every word in the local `STOP` set are dropped.
- `stem` strips one trailing `ing`, `ed`, `es`, or `s`. The keyword set is stored stemmed.
- A question word scores 3 when its stem is in the set, 2 when the whole word is, and 1 when the stem
  is at least five characters and appears inside the chunk `text`. A word that is only digits scores
  3 when that digit string appears in the `text`.
- The highest total wins, a total below 3 retrieves nothing and produces the refusal, and a tie goes
  to the earlier entry in the array.

Three consequences follow. A keyword that the stop list removes does nothing, and `about`, `how`,
`many`, `next`, `year`, and `number` are all on that list. Listing both `submission` and `submissions`
is redundant, because both stem to one root. A generic keyword such as `system` can pull a question
away from a more specific chunk, which is why the 30-question suite in
`web/tests/unit/suite.test.ts` names the anchor each question may land on.

What breaks when a corpus figure drifts from the registry:

- The agent states the old figure, and the guard releases it, because the allowlist is built from
  `chunk.text` plus the reader's earlier turns. The answer and the page disagree with no warning.
- No test compares corpus text with `facts.ts`. `web/tests/unit/corpus.test.ts` checks coverage,
  unique anchors, the href prefix, and the keyword count. `web/tests/unit/suite.test.ts` checks that
  an answer cites an expected anchor and that its numbers are traceable to the same passage. Both
  stay green.
- Retrieval shifts, because a number in a question scores against digits in the chunk text.

So a registry change includes a search of `web/content/corpus.ts` for the old display, and the passage
and its keywords change in the same edit.

## Gotchas

- **Percent facts store the whole number.** `human-share` is 25 and `session-shorter` is 22, while
  `web/content/model.ts` wants 0.25 and 0.22. The call sites divide by 100. Writing 0.25 into the
  registry fails the display test, because the digits of `25%` are `25`.
- **A new fact turns `facts.test.ts` red on the count first.** The total and the 8/4/3/1 split are
  literals in the test, and the "Sixteen numbers" line in the design-system doc has to change too.
- **`unit` is declarative.** No component reads `Fact.unit`. The unit words on the home band and the
  work rows are authored strings on `BandCell` and `SystemRow`. The `Unit` union has no
  queries-per-second member, so `meta-queries-per-second` carries `count`.
- **Slider ranges are not in `model.ts`.** `SHARE_RANGE` and `MINUTES_RANGE` live in
  `web/components/report/model.tsx`, and `clamp` in `model.ts` is only called by its test. A new
  adjustable assumption needs a control id here, a default in `DEFAULT_ASSUMPTIONS`, and a range in
  the component.
- **Scoping is pinned twice, the corpus is not.** `facts.test.ts` requires Meta facts to carry
  `sources: ["work"]`, and `contact.test.ts` requires that no home or report fact is measured at
  Meta. The Meta chunk may state those figures because it sits on the work surface. Nothing checks
  the corpus.
- **`factsFor("about")` is empty by design.** The `facts` array in `web/content/about.ts` is a list
  of label and value strings for the card, not registry entries, and a test pins the empty result.
- **`bandCells()` reads the registry on every call.** A test mutates a `display` and calls it again.
  Hoisting it to a module constant breaks that property.
- **Only the email is single-source by test.** `web/tests/unit/contact.test.ts` compares the holder
  list with exactly `["content/site.ts"]`, so the literal address in any `.ts` or `.tsx` file under
  `app/`, `components/`, or `content/` fails it, comments included. `site.name` is typed again in
  `web/content/home.ts` and `web/content/report.ts`. Changing `site.origin` also means changing the
  literal URLs in `web/tests/unit/proxy.test.ts`.
- **`web/content/index.ts` is unused.** Application files import `content/facts`, `content/site`, and
  so on directly. Keep the barrel compiling or delete it; either way it has to stay named in a
  context document.
- **An anchorless chunk becomes `#null` in a citation.** `web/lib/ask/compose.ts` and
  `web/lib/ask/answer.ts` interpolate `${surface}#${anchor}`, and the transcript renders
  `/about#null`. The browser ignores the fragment and the page loads, so it is easy to miss. The fix
  belongs in `web/lib/ask`, not here, and new chunks should not copy the marker.
- **The Meta system rows link into the Walmart section.** Their `href` is `/report#sys-cleanup` in
  `web/content/work.ts`. Any href you write has to name an anchor that exists in `report.ts`, and
  nothing validates those links.

## Where to read next

| Need | Read |
|---|---|
| The provenance model as the design states it | `design-system/foundations/content-and-provenance.md` |
| What the content must guarantee | `openspec/specs/site-content/spec.md` |
| The report's composition, figures, model, and reading time | `openspec/specs/report-document/spec.md` |
| Citations, refusal, and the corpus's job in an answer | `openspec/specs/site-agent/spec.md`, then `web/lib/AGENTS.md` |
| Which test protects which rule | `web/tests/AGENTS.md` |
| The copy that ships, including the list of numbers | `README.md` |
| The application's rules and commands | `web/AGENTS.md` |
