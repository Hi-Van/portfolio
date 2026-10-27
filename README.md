# Van Sirisouk, personal site

A measurement-first portfolio. Five surfaces, one answer endpoint, no trackers. The site is a Next.js
application in `web/`; the design contract is `DESIGN.md`; the component reference is
`design-system/`.

## The surfaces

| Surface | Job |
|---|---|
| `/` | Who this is, three measured results, one way to get in touch. About a screen and a half |
| `/work` | Roles and systems, including the FAIR AI internship at Meta, with deep links into the report |
| `/about` | The bio, the facts, the address |
| `/report` | The document: five figures, the model, the method note |
| `/ask` | The agent: answers from this site, cites the page each answer came from |

The split is deliberate. The home page answers "who is this and what did they ship" in under a
minute. The work page carries the systems. The report carries the reasoning, the model, and the
method. The agent is its own room, reached by the switch in the top bar.

## Run it

```bash
cd web
npm install
npm run dev        # localhost:3000
npm run build      # prerenders every surface
npm run check      # the gate
```

The five surfaces are prerendered. The answer endpoint is dynamic. There is no database and no
analytics.

Supported browsers: the last two versions of Chrome, Edge, Firefox, and Safari. The surfaces are
checked in Chromium, Firefox, and WebKit by `npm run test:browsers` in `web/`. The site uses
`min-h-dvh` and `color-mix` through the Tailwind theme, so older engines will degrade.

One platform caveat: WebKit on macOS does not move focus to links with Tab unless the reader turns it
on. The skip link is first in the document everywhere, and the keyboard path is asserted where the
platform provides it.

`npm run check` runs eight steps and reports each one: tokens, artifacts, content, styles, contrast,
unit, e2e, bundle. It exits non-zero if any failed. It builds twice, once for the bundle scan and once
inside Playwright, so it takes about a minute.

```bash
npx -y @google/design.md lint DESIGN.md       # 0 errors, 0 warnings
```

## What ships

Measured from the production build, transferred script per surface:

| Surface | Script | CSS | Total |
|---|---|---|---|
| `/` | 300 KiB | 7 KiB | 491 KiB |
| `/work` | 300 KiB | 7 KiB | 491 KiB |
| `/report` | 300 KiB | 7 KiB | 488 KiB |
| `/about` | 300 KiB | 7 KiB | 492 KiB |
| `/ask` | 300 KiB | 7 KiB | 492 KiB |

The framework is most of that. The chat provider is in every surface's bundle because the conversation
lives above the route, and the report adds visx for two figures. There is no budget here, by decision:
the number is recorded rather than enforced.

## The agent

`/ask` is a room with a transcript, a composer, and four suggested questions. The conversation lives
above the route, so it survives moving between pages and clears on reload. Nothing a reader types is
stored.

An answer is retrieved from the section of this site that covers the question, streamed to the reader,
and cited inline with a link to that section. An answer that is not on the site is refused with one
fixed sentence: "Not stated on the site."

The endpoint at `/api/ask` accepts one question of up to 280 characters and the turns before it. A
stream guard holds a numeral until it is complete and traces it against the retrieved passage; an
untraced number withdraws the answer and leaves the refusal. The guard also holds an anchor until it
closes, so a half-written citation never renders.

With `DEEPSEEK_API_KEY` set, the answer is composed by the pinned model at a 400-token ceiling.
Without it, the retrieved passage is the answer, so a checkout with no key still answers and still
cites.

The question suite is the gate: 30 questions, a 23% refusal rate, no false refusals, no answered
question that should have been refused, no untraced number in any answer, and no withdrawal. Cost per
question is bounded by the output ceiling rather than measured, because no credential is configured in
this checkout.

## The numbers, and where they come from

Every number is defined once in `web/content/facts.ts` and rendered from there. Each carries a class
and a mechanism.

Measured at Walmart:

- query time after the catalog cleanup
- storage cost removed a year
- records a second through the intake pipeline
- submissions a day through the seller app
- shorter average seller session

Measured at Meta, stated only on the work surface:

- queries a second through the API data pipelines
- platform performance after batching subscription events
- smaller build after moving model packages

Derived, with the arithmetic stated:

- annual submissions: the daily rate times 365
- filing time: records times 20 seconds, expressed in hours and in person-days
- seller hours returned: annual submissions times the human share times the session length times the
  measured cut

Assumed, and exposed as controls in the model:

- time to file one record by hand, fixed and stated rather than adjustable
- the share of traffic that is human
- a baseline session length

Not measured, stated as such: revenue.

A build check fails when a surface prints a digit outside the registry. The report states its figures
through placeholders resolved from the same registry, so its prose cannot drift from the rest of the
site.

## Design system

`DESIGN.md` is the contract: eight role colours in two themes, thirteen type steps, the shape language,
and the rules the tokens cannot carry. `design-system/README.md` is the component reference, including
where the implemented values and the contract were reconciled in this rebuild.

Six checks hold the two together:

| Check | Fails when |
|---|---|
| tokens | The stylesheet and `DESIGN.md` disagree, or a theme scope misses a variable |
| artifacts | A source file is named in no context document |
| content | A surface prints a digit outside the registry |
| styles | A component uses an arbitrary value, a raw colour, or a `dark:` variant |
| contrast | A text pairing falls below AA in either theme |
| bundle | The build fails, a removed library returns, or a model module reaches the client |

## Theme

The site follows the operating system until the reader chooses. The choice is stored under `vs-theme`
and applied once the page is interactive, which means a reader whose choice differs from their system
sees the system theme for one frame. That is a recorded decision, not an oversight: see
`openspec/changes/replatform-site/design.md` D6.

## Before this goes live

- The Meta figures and every Walmart figure still want a check against your own records.
- There is no résumé yet. Nothing on the site promises one.
- The old site is still live at the origin until cutover.

## Review screenshots

`preview/` holds fourteen captures of the current build: five surfaces in both themes at 1440, three
narrow surfaces at 390, and the menu open. Regenerate them with `web/scripts/capture.mjs` against a
running server. They are evidence, never source.

## The previous medium

The static site is removed. The `baseline-static` tag restores it in one checkout: five documents, two
stylesheets, four scripts, five fonts, and the two Python checks that held the old token copies in
step.
