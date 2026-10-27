# Design

## Context

See `proposal.md` for motivation. The state that shapes this approach:

- Five static documents, two shared stylesheets, four scripts, and one standalone report with its own
  inline stylesheet and 161 lines of inline script.
- No version control. No history, no revert, no baseline to roll back to.
- Content has no source of truth. A headline number is written into three to five files.
- The agent is 13 hand-written topics behind a keyword scorer. No network, no model, no server.
- Fifteen design docs describe the medium they were written against, including line-number citations.
- Two Python checks enforce the token contract and artifact coverage. Both assume a flat file tree.

Constraints that come from the specs, not from taste: no third-party tracking, the report must be
complete without scripting, one server credential must never reach the client, and every control needs a
44px target.

## Goals / Non-Goals

**Goals:**

- One source of truth for content, so a number exists once and every surface renders from it.
- A medium that satisfies the six capabilities without any capability naming it.
- One server-side answer path with validated citations, not a client-side lookup.
- A rollback that returns the site to exactly what it is today.

**Non-Goals:**

- No content management system, no database for content, no editorial workflow.
- No accounts, comments, newsletter, analytics, or A/B testing.
- No reusable component library. Components serve this site.
- No native app, no theming beyond the two recorded themes.
- **No performance budget.** Transferred script is recorded in 12.5 as information. The app is small
  enough that a budget would be ceremony.
- **No logging or observability.** The endpoint is a portfolio feature, not a production service. A
  failure is visible to the reader and not recorded anywhere.
- **No accessibility work beyond the floor this change already crosses.** This change fixes the
  failures its own surfaces touch: target sizes, focus visibility, the skip link, menu focus, reduced
  motion, contrast floors, and announcements. A later change carries the rest: the uppercase legibility
  floor, forced-colors and increased-contrast modes, text spacing and reflow at 200 percent, and a
  screen reader matrix across platforms. Deferred, not refused.
- **No localization.** One language ships. Adding locales is its own change, because it moves the
  content model, number formatting, the stream guard's digit normalisation, the fixed refusal, and the
  metadata together. It is deferred rather than refused, and the structure this change leaves behind is
  meant to carry it: facts hold values and units, and the documents already declare their language.

## Decisions

### D1. The medium: a React framework with prerendered surfaces and one server route

Take Next.js App Router. Four surfaces are prerendered to static HTML at build time, the agent
surface is prerendered as a shell and hydrated, and a single route handler serves the answer path.

Alternatives and why not:

| Alternative | Why not |
|---|---|
| Astro with React islands | Genuinely the closest fit, and the fallback if the payload regresses. Rejected for one reason: the project needs a typed content layer and one server route, and it does not need two rendering models to learn and keep in step |
| React Router v7 as a server | Requires operating a process. The site's only server need is one endpoint that runs a few times a day |
| Vite SPA | Makes every surface script-dependent, which contradicts the report's no-script requirement and complicates canonical metadata per surface |

The deciding constraint is not familiarity. It is that four of five surfaces must be complete
without scripting, and one surface must never render untrusted text.

### D2. Only four things are interactive

Prerendered: home, work, about, report, and the agent shell. Client-interactive: the theme control,
the narrow-viewport menu, the model's three inputs, and the agent's composer and transcript.

Figure 1's 104 cells and figure 5's chart are currently built by runtime script. They become build
time output, so the report ships with all five figures drawn and no script required to draw them.
Net effect: the report's client script shrinks while the site gains a server route.

### D3. Content is typed modules, not a CMS and not MDX

Content lives in TypeScript modules grouped by surface, exporting plain data. No database, no CMS,
no MDX compiler step.

| Alternative | Why not |
|---|---|
| MDX | Prose with embedded components reads well until a number has to be shared between prose, a figure, and the agent corpus. MDX has no place to put a typed fact |
| Headless CMS | Adds a network dependency, a schema to migrate, and an editor for one author |
| Database | Same, plus a backup and a bill |

Typed modules make the provenance rule a compile error, which is the whole point of the change. They
also make a number's every appearance greppable in one file.

### D4. One fact registry, and provenance is a union type

```ts
type Provenance =
  | { kind: 'measured'; where: 'walmart' | 'meta'; mechanism: string }
  | { kind: 'derived'; inputs: FactId[]; mechanism: string }
  | { kind: 'assumed'; control: ControlId }
  | { kind: 'not-measured'; note: string }

type Fact = {
  id: FactId
  value?: number
  unit?: Unit
  display: string
  provenance: Provenance
}

type Claims = { fact: FactId; where: SurfaceId[] }
```

A renderer for a stated number takes a `Fact`, never a number and never a string. The accent follows
from `provenance.kind`: indigo for measured, clay for assumed. There is no prop for an unlabelled
number, so the copy rule stops being something a person has to remember.

`value` is optional because a not-measured claim has no number, and that absence is the point.

### D5. Styling: Tailwind v4 theme variables, one token source

Tailwind v4 lets design tokens be the API for utilities: a `@theme` block declares variables in
namespaces, and Tailwind generates `bg-paper`, `text-ink`, `font-display`, `text-display-home`,
`rounded-panel`, `tracking-display`, `max-w-measure` from them. The contract's values become utilities
instead of a parallel stylesheet, and there is one token source instead of the current two.

Two v4 details shape the design rather than decorate it:

**Namespaces are cleared first.** `--color-*: initial` removes every default colour, so no utility can
produce a colour that is not a contract role. Tailwind does not error on an unknown utility, it
silently generates nothing, so a cleared namespace plus a check is the enforcement, not a convention.

**The theme block cannot hold the dark theme.** `@theme` must be top level and cannot nest inside a
selector or a media query. So the block holds the light values as `@theme inline` references to raw
variables, and the dark values redefine those raw variables in `[data-theme="dark"]` and in the OS
preference scope. A component then writes `bg-paper text-ink` once and both themes follow, with no
`dark:` utility anywhere.

```css
@theme inline {
  --color-*: initial;
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  /* ... every contract role */
}

:root { --paper: #ffffff; --ink: #131a2b; /* ... */ }
[data-theme="dark"] { --paper: #0c1018; --ink: #eef1f7; /* ... */ }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { /* the same set */ } }
```

`inline` is not optional here. Without it the generated utility resolves `var(--paper)` where the
theme variable is defined, which is the root, so a dark override lower in the tree would never reach
the utility.

Alternatives: CSS Modules with no framework was the earlier position, and it loses the compiler-level
refusal of off-contract colour that a cleared namespace gives. CSS-in-JS still adds a runtime to a
site whose only runtime need is a chat box.

Print rules stay hand-written CSS because utilities cannot express them. The range thumb leaves that
list: it is a Base UI Slider part (D16) rather than three vendor pseudo-elements, which also removes
the one hardcoded colour the old stylesheet still carried.

### D6. The theme is painted after hydration

No inline script, no blocking work in the head. The document paints from the operating system preference
through the media query, and a client component applies the stored choice once the page is interactive
by writing the theme attribute on the root element.

The trade is explicit. A reader who chose a theme that differs from their system sees the system theme
for the hydration interval, then their own. A reader who never chose sees their system theme
immediately and nothing moves after that. This is accepted rather than mitigated: it is the one place
where a simpler document is preferred over the fastest possible first paint.

The control reads its state from the DOM after mount. With scripting off, the system preference stands
and the site remains fully readable.

### D7. The answer path verifies before it shows

Streaming is in. The client uses the SDK's chat hook, the server streams text, and the guarantee moves
from "after the whole answer" to "before each fragment is released".

```
question
  -> retrieve chunks (surface + anchor + text + fact ids)
  -> streamText with a system contract            [server only]
  -> stream guard, applied to the outgoing text:
       hold back a trailing fragment that could still become a numeral
       trace each completed numeral against the retrieved digits
       resolve each inline anchor the moment it arrives
  -> on violation: stop the stream, drop the rest, render the fixed refusal
```

The system contract asks for two things from the model. Any quantity is written in digits, never
spelled out, so it can be traced. Every claim carries an inline anchor of the form
`[[surface#anchor|label]]`, so a citation can be checked the moment it arrives rather than at the end.

The guard is the unit of exposure. A numeral is never shown before it is traced, an anchor is never
rendered before it resolves, and a fragment that could still become a number is held back until it is
decided. That is what preserves the one absolute rule while letting text arrive progressively.

The cost, stated honestly: the guard is now the most safety-critical code in the project, it adds a
small delay before the first token, and a violation withdraws an answer the reader has partly read.
That last one is the right failure. A withdrawn answer is visible and honest; an uncited claim left on
screen is not.

Multi-turn context is sent by the hook, so the contract also says that history is context and never
evidence: every answer still cites the site, and the guard applies to the whole message regardless of
what came before it.

The 13 hand-written answers are not kept as a fast path. Two answer sources means two behaviours to
keep honest, and the curated ones already disagree with the pages.

### D8. Cost control without a database

There is no rate limit and no datastore. A per-visitor counter needs durable shared state to mean
anything, the direction for that state is not clear yet, and inventing a database for a portfolio is
the wrong trade. So the endpoint is open.

What holds the cost down instead, none of which needs storage:

- One request does one model call, with a pinned output cap, so the ceiling per request is known before
  it starts.
- The model is pinned in one constant, so the price per request is a chosen number rather than whatever
  a default resolves to.
- The provider account carries its own spend limit and usage alert. That is the platform's job, not
  ours, and it is the one place a hard stop exists.

The DeepSeek credential is read from the server environment as `DEEPSEEK_API_KEY` at request time and
never appears in a public variable.

This decision is reversible by design: the contract still returns a refusal shape the client already
renders, so adding a limit later is a new status code and one guard, not a redesign. Until then the
exposure is accepted and named in the risk table.

### D9. Resolving the contract debt, once

Thirteen recorded disagreements become six decisions. Each is now a single value in the contract and
nothing can drift from it.

| Cluster | Resolution |
|---|---|
| Reading size | One reading size on every prose surface, the contract's 19px step, at both widths. The 17.5 and 17 values are deleted. The conversational surface keeps its recorded exception |
| Small type | Serif text floor 20px. The 25px record name is promoted to the 26px display step. A 16px avatar glyph is not text and is exempt. The 9.5px uppercase instances are the one row left to the accessibility change, so this table has a known open line rather than a silent one |
| Scale purity | The in-between sizes are removed. `.statement`, `.lede`, and `.deck` use recorded steps, and their local clamps are deleted |
| Actions | One filled invitation per page. A document surface may repeat it in its closing block. The invitation's label is one recorded size, replacing the 12.5, 13.5, and 14 |
| Structure | Gutters are one value at every width. Mobile is one fluid column. Component spacing uses the 4px numeric base, layout rhythm uses three named tokens, and the old 4, 8, 14, 24, 40 contract scale stays deleted |
| Accents | Clay marks assumptions, in the five recorded places including the note on an unstated answer. The count is enumerable and tested |

### D10. Spacing takes the numeric base, and rhythm gets names

Tailwind generates spacing from one base value, so "no spacing scale" is no longer available: the
question becomes which base. The built page uses 29 distinct literals between 1px and 96px, most of
them already multiples of four, and the odd ones sit on small control paddings that the 44px target
requirement moves anyway.

So the base is 4px for component internals, and layout rhythm gets three named tokens (gutter, block,
section) rather than a numeric guess. The old 4, 8, 14, 24, 40 contract scale stays deleted: it was
never used and it is not the scale Tailwind generates.

The consequence to accept: component padding shifts by up to 2px where a literal was off the grid.
Colour, type, radius, and measures stay tokenised because they carry meaning and must not drift.
Spacing carries rhythm and now has a base instead of a judgement call.

### D11. Every absolute address derives from one constant

The production origin is `https://vansiriso.uk`, at the apex, over `https`. Every absolute URL the
site emits is built from that one value: canonical addresses, share metadata, the share image,
sitemap entries, and the answer endpoint's own address. `www.vansiriso.uk` and any plain `http`
request redirect to it.

The value lives in one configuration constant and is read, never repeated. A surface that hard-codes
the origin is the same class of defect as a surface that hard-codes a number.

### D12. Validation boundaries, checked by hand

Every input that crosses a trust boundary is checked, not assumed. The boundaries are:

| Boundary | Input | Handling |
|---|---|---|
| Question field | reader text | Trimmed, 1 to 280, checked on the client as a courtesy and on the server as the rule |
| Request body | JSON | Checked before anything else; a failure is 400, never an answer shape |
| Model output | untrusted streamed text | Anchors parsed and resolved, numerals traced; a failure ends the answer with a refusal |
| Citations | model-supplied anchor | Registry lookup at request time |
| Numbers | model-supplied text | Digit trace against retrieved facts |
| Return parameter | `?from=` | Allowlist with a home fallback, never a raw redirect |
| Model inputs | two slider values | Bounded by the control, then clamped again in the arithmetic module |

The distinction that matters is not which library checks, but whether a check is asking about shape or
about truth. The first three boundaries are shape: cheap to write, and cheap to write correctly. The
rest are truth, and truth cannot be a schema at all, because resolving a citation asks whether an
anchor exists and tracing a number asks whether a figure was in the retrieved text. Those are lookups,
not parses, and they are plain functions with their own tests.

The convention that replaces a schema library is the type predicate. A guard is declared as
`function isAskRequest(x: unknown): x is AskRequest`, and TypeScript checks the predicate's body against
the declared type, so the parser and the type cannot drift apart. The anchor parser returns
`Anchor | null` and is checked the same way. Together that is about twenty-five lines.

**No schema library is installed.** One was planned for structured model output, and the streaming
decision removed that output: the model now returns prose with markers, and prose has no shape to
enforce. What is left is one string, one optional turn list, and one marker format that needs a regular
expression whichever way it is validated. A dependency with no consumer bigger than its own guard has
not earned its place. If the answer path ever regains a structured stage, a schema earns it back
immediately.

All of this runs on the server except the composer's length check, which is a courtesy. A client-side
check never protects the endpoint, because the endpoint answers anyone who asks.

No form library. The site's only form is one text field with one rule, and a library would be more
code than the field. No persistence of questions, so there is no retention rule to write.

The model is treated as an untrusted author rather than an agent: it gets no tools and no loop it
controls, so the worst outcome of a hostile question is a refusal.

### D13. Charts: visx primitives, and only two figures are charts

Two of the five figures need chart machinery: figure 4 (a cumulative line, 12 points, 0 to 142.4
million) and figure 5 (two series, a shaded band, two live controls). Figure 1 is a diagram, figure 2
is two bars on one index, and figure 3 is a grid of 104 cells. Those three are authored by hand, and
forcing them into a chart library would produce a worse diagram and a worse grid.

For the two that need it, the toolkit is `@visx/scale`, `@visx/axis`, `@visx/shape`, and
`@visx/group`: d3's math with React SVG primitives, and no opinion about how the result looks.

| Alternative | Why not |
|---|---|
| Recharts | `ResponsiveContainer` measures the DOM, so during a prerender the width is zero. Its defaults for tick font, colour, and entrance animation all have to be neutralised. It ships the chart runtime to every reader |
| `@nivo/line` | Same theming problem with more weight |
| `@unovis/react` | Capable, but owns more of the rendering than this contract can give up |
| d3 directly | Imperative DOM writes inside a declarative tree, and nothing gained over visx |

Three constraints the toolkit must satisfy, which the specs already require of the output:

1. Every mark takes a contract role as its stroke or fill. `var(--data)` and `var(--band)` are
   attributes, not palette entries, so no library colour survives.
2. Every label takes a contract type value. Tick and value sizes are set explicitly, so the chart
   label floor holds at the reading measure and under it.
3. No entrance animation. Figures are drawn, not revealed.

Because visx computes at render time, figures 1 through 4 produce no client code: they are resolved
during the prerender. Only figure 5's controls import scale maths on the client, which is the code
that has to exist for the reader to move an assumption.

### D14. Animation: Motion, in leaf islands only

`motion` 14.6.0, imported from `motion/react`. Four rules constrain it, and the first is the one that
matters most.

**Content is visible before JavaScript runs.** No delivered markup or stylesheet may start at zero
opacity, zero scale, or zero width and wait for an animation to reveal it. Animation is an enhancement
applied after the fact, never the thing that makes content appear. This is a fix, not a style choice:
the current report's three revealed figures start at `scaleX(0)` and `opacity: 0`, so with scripting
disabled they are blank. `report-document` requires them present.

**Motion exists only where CSS cannot do it.** That is exit animation, which CSS has no answer for
removing a node: the menu panel closing, and a row leaving the transcript. Everything else stays
CSS: hover lifts, the typing row's keyframe, focus transitions.

**Reduced motion is configured, not remembered.** One `MotionConfig reducedMotion="user"` at each
animated island, which drops transform and layout animation when the reader has asked for less.

**No spring on a figure.** A measured number may not overshoot its true value on the way to it. Model
outputs change directly or with a short tween.

Scope: Motion is imported inside leaf client components (`MenuPanel`, `Transcript`, `ModelOutput`) and
never wraps a surface. `LazyMotion` with the `domAnimation` feature bundle and `m` components keep
drag and layout code out of the payload. The menu is on every surface, so this cost is paid on every
surface; task 12.5 records the number for the record rather than as a gate.

### D15. Client data and state: the conversation lives above the route

The transcript has one requirement that decides this whole section: it must survive moving between
surfaces and must be gone on a fresh load. That is a mount lifetime, not a storage lifetime, so no
persistence layer is involved. `sessionStorage` and `localStorage` both survive a refresh, which is
the one thing the transcript must not do.

`useChat` holds its state in the component and offers no cross-mount persistence, so the hook moves
above the route. A client provider rendered by the root layout is not unmounted when routes change, so
the provider keeps the transcript, and the agent surface reads it through a context. On a fresh load
the provider remounts and the transcript is empty by construction.

Context rather than a store. A module-scope store would work, but it would mean mirroring the hook's
messages into a second owner, and a store can only hold what already finished, so an answer still
arriving when the reader navigates away would be lost. With the provider above the route, the stream
keeps arriving and is complete when they return.

Two configuration details are part of the decision:

- The stream-resume option is off, so a reload cannot replay a response the reader was meant to lose.
- The provider is mounted on every surface, which puts the chat module in every surface's bundle. That
  is accepted. There is no performance budget to fail (see non-goals), and lazy mounting would trade a
  guarantee about the transcript for a few kilobytes.

The report's model keeps local component state. Its two controls, its readouts, its chart and its reset
button all live in one subtree on one surface, so a store or a context would be a named thing earning
nothing.

Two exclusions keep their reasons:

- **The theme is not in a store.** D6 applies it as a client effect after hydration, so it needs no
  shared state; a store would add an owner without changing when the paint happens.
- **Prerendered content is not in a store.** Anything held in client state needs an initial value that
  matches the prerendered output exactly, or hydration disagrees with the delivered HTML. That is why
  the model starts from the same constants the build used.

SWR was considered and dropped. The only request the site makes is the agent call, and the SDK already
owns its transport, pending state, and error state. A fetching layer over that would be two owners of
one request.
### D16. Primitives: Base UI, used in exactly one place

`@base-ui/react` 1.9.0 provides unstyled, accessible primitives. It is used for the report's two model
controls and nothing else.

The Slider is the one primitive that earns its dependency. The current controls are native range
inputs with a 20px box and a 16px thumb, which fail the target floor twice over, and their thumb
carries a hand-written `#fff` for one vendor that breaks the token rule. A slider built from parts
fixes three recorded failures at once: the target size, the colour, and the cross-browser styling. It
also gives `aria-valuetext` so a control reads as "25 percent" rather than "25".

Unstyled is the reason it fits. Every part takes contract roles, and interactive states arrive as data
attributes, so states are styled with the same utility vocabulary as everything else. There is no
default palette or type to defeat, which was the reason a styled component library was never an
option.

Scope limits, each deliberate:

- **The narrow-viewport navigation is not a Base UI Menu.** A menu primitive carries `role="menu"` and
  menu items, which is application-menu semantics applied to site navigation. The navigation is a
  disclosure: a button with an expanded state and the link list below it. Base UI's Collapsible would
  supply the aria plumbing, but not the behaviour the shell spec requires (Escape, focus into the
  panel, focus back to the control, close on widen), and it would add a third library to the bundle
  every surface carries. The disclosure is hand-written, and task 4.4 says so to stop the next person
  reaching for a menu primitive.
- **No dialog, tooltip, popover, select, tab, or accordion.** The site has none of those patterns, and
  a primitive without a pattern is a dependency without a consumer.
- **The Slider loads on the report only.** It is the one place Base UI appears, so it is the one place
  it costs anything.

One consequence to verify rather than assume: a Slider is a client component, so the report must still
deliver its default outputs and its figure as prerendered content, and the control is allowed to be
inert without scripting. Task 7.5 checks that the track and thumb render server-side and that the
outputs do not depend on the control being interactive.
### D17. Fonts come from the framework's font loader

All three families are on Google Fonts, so they are declared once through `next/font/google` rather than
shipped as files:

```ts
import { Instrument_Sans, Instrument_Serif, Literata } from 'next/font/google'
```

The loader downloads at build time, self-hosts the result, and generates fallback metrics, which removes
the manual face declarations and the layout shift they leave behind. Each family exposes a CSS variable,
and the Tailwind theme block maps those variables into the `--font-*` namespace, so `font-display`,
`font-reading`, and `font-ui` exist as utilities with no `@font-face` anywhere.

Declared styles, checked against the Google Fonts API: Instrument Serif 400 normal and 400 italic,
Literata 400 normal and 400 italic, Instrument Sans 400, 500, and 600 normal. Instrument Sans has no
italic on Google Fonts, and the current build does not use one.

Two consequences. The build now needs network access at build time, which is the only moment the files
are fetched; the served page still makes no third-party request, so the no-trackers rule holds. And the
five woff2 files retire with the old medium, which moves the licence question rather than removing it:
the open font licence travels with the files, so one licence file per family ships in the repository.
That is a smaller job than it was, not a zero one.

## Contracts

### The answer endpoint

```
POST /api/ask
content-type: application/json

{
  "question": string,          // 1..280 characters after trim
  "history"?: { role: 'user' | 'assistant'; text: string }[]
}
```

The response is a streamed assistant message whose text carries two machine-readable forms:

| Form | Example | Checked when |
|---|---|---|
| Numeral | `390,000 submissions a day` | The numeral completes |
| Anchor | `[[work#walmart|work, Walmart]]` | The anchor arrives |

```ts
type SurfaceId = 'home' | 'work' | 'about' | 'report'

type Anchor = {
  surface: SurfaceId
  anchor: string | null      // null means the surface itself
  label: string
}
```

Invariants, each one a test:

1. No numeral reaches the reader before it is traced to a retrieved chunk or fact, compared as
   normalised digits.
2. No anchor is rendered before it resolves in the content registry, checked at request time.
3. An answer contains at least one anchor. A message with none is a refusal.
4. The refusal text is exactly the recorded sentence, compared byte for byte.
5. A violation ends the stream, discards the remainder, and replaces the visible message with the
   refusal. A partial answer may be withdrawn; an untraced numeral may never be shown.
6. Status codes before the stream opens: 200 to open, 400 for an invalid question, 502 when the model
   is unreachable. A mid-stream failure closes the stream and renders the refusal.
7. History is context, not evidence. Every answer cites the site, and a question answerable only from
   earlier turns is refused.

### The retrieval corpus

Built at build time from the same content modules, one entry per anchorable section:

```ts
type Chunk = {
  surface: SurfaceId
  anchor: string
  heading: string
  text: string
  facts: FactId[]
}
```

The corpus is a build artifact with a generated type. A section that is not chunkable is a section the
agent cannot cite, which is a useful forcing function: every claim a reader might ask about needs an
anchor.

## Component inventory

Grouped by the reader's task, not by file count. Each group maps to one section of the design-system
tree that survives the rewrite.

| Group | Components | Note |
|---|---|---|
| Frame | `SiteFrame`, `ReadingColumn`, `TopBar`, `NavList`, `Invitation`, `AgentSwitch`, `ThemeControl`, `SkipLink`, `Footer` | `ThemeControl` is 44px now, not 34. `AgentSwitch` states current |
| Navigation on narrow viewports | `MenuControl`, `MenuPanel` | Moves focus in, returns focus out |
| Primitives | `Badge`, `Lede`, `Deck`, `Byline`, `AbstractLabel`, `SectionHeading`, `Hairline` | No colour except the abstract label's clay |
| Evidence | `ResultStatement`, `ResultCell`, `SystemRow`, `RoleRow`, `RecordName` | `ResultStatement` takes a `Fact`, not a number |
| Figures | `FigurePanel`, `FigureCaption`, `SubmissionsDiagram`, `RecordMap`, `UnitGrid`, `LoadChart`, `BrowserShare` | Build-time SVG. Marks use contract roles |
| Model | `ModelCalculator`, `ModelSlider`, `ModelOutput`, `AssumedRow`, `ResetControl` | `ModelSlider` is a Base UI Slider (D16). Assumptions and measured inputs are visually different |
| Actions | `OutlinedAction`, `TextLink`, `MailLink` | `Invitation` lives in Frame because there is one |
| Agent | `AgentSurface`, `Transcript`, `MessageRow`, `CitationList`, `Note`, `SuggestionRow`, `TypingRow`, `FailureRow`, `Composer` | `Note` is the fifth clay site |
| Launch | `NotFoundSurface`, `ShareMetadata` | Metadata is per surface, not global |

## Risks / Trade-offs

- **The docs rewrite is larger than the build.** Fifteen docs, three context files, and two checks all
  describe the retiring medium. Mitigation: rewrite each surface's doc in the same commit that ports
  the surface, so no doc is ever describing a medium that no longer exists.
- **No version control.** Mitigation: `git init` and commit the untouched static site as the first
  commit, before any file moves. That commit is the rollback.
- **Validation makes the agent refuse too often.** A strict number check can reject good answers.
  Mitigation: a fixed set of about 30 realistic questions, run as a test, tracking refusal rate and
  false refusals. Tune retrieval before loosening validation.
- **Prerendering plus a client calculator duplicates arithmetic.** Mitigation: one pure module owns
  the formulas, imported by both the build-time render and the client, with unit tests on the
  arithmetic.
- **A model call is the only unbounded cost, and the endpoint is open.** Mitigation: D8's pinned output
  cap and model, plus the provider account's own spend limit and usage alert. This is an accepted
  exposure, not a solved one: a determined caller can still spend money, and the only hard stop lives
  outside this codebase.
- **React payload against the site's austerity.** Mitigation: five prerendered documents, one chart
  toolkit used by two figures, one motion library scoped to the menu and the transcript, and the
  report shipping less client script than today. Watch total transferred script as a release gate.
- **The stream guard is now the safety-critical path.** A bug there shows an untraced numeral or lets
  an unresolvable anchor render. Mitigation: the guard is pure and unit-tested on numerals split across
  chunks, on anchors split across chunks, and on a violation mid-answer; the question suite asserts
  that no answer in it contains an untraced numeral.
- **A withdrawn answer looks like a broken agent.** Mitigation: the withdrawal is explicit, rendered
  as the refusal with no residue, and the suite tracks how often it happens so retrieval quality is
  measured rather than hoped for.
- **Client state whose initial value disagrees with the prerender.** Mitigation: the model starts from
  the same constants the build used, and a hydration-warning check runs on the surface that mounts it.
- **The chat provider is in every surface's bundle.** Accepted. Lazy mounting would make the transcript
  conditional on which surface the reader arrived from, which is a worse trade than the bytes.
- **A stored theme can flash.** The system theme paints first and the stored choice follows. Accepted by
  D6; it affects only readers whose choice differs from their system.
- **The domain must resolve before launch metadata can be verified.** Canonical addresses and share
  metadata cannot be tested until `https://vansiriso.uk` points at the host. Mitigation: D11 fixes the
  value now, so the build is not blocked; group 11 verifies once DNS is in place.

## Migration Plan

1. `git init`, commit the static site untouched, tag it as the baseline.
2. Scaffold the new medium beside the old documents. Nothing is deleted yet.
3. Port in this order: content model and fact registry, then frame, then home, then work and about,
   then the report, then the agent. Each surface is parity-checked against the baseline.
4. Cut over: the new medium serves every address, the old documents are removed in one commit.
5. Rewrite the docs and replace the two checks in the same pass as their surface.
6. Close the launch blockers.

Rollback is the baseline tag. It is a complete, working site, so reverting is a branch checkout rather
than a repair.

## Open Questions

- **The origin.** Recorded as `https://vansiriso.uk` in D11. Confirm the domain is registered and
  pointed at the host, and that `www` is expected to redirect, before group 11 closes.
- **The model id and the spend ceiling.** The provider is fixed: `@ai-sdk/deepseek` with
  `DEEPSEEK_API_KEY`. Which model id to pin is now the primary cost decision, because no rate limit
  stands in front of it, and it is set once in a constant in group 9. A reasoning model is the wrong
  default here, because it bills reasoning tokens to answer a question whose answer is a citation.
- **The résumé.** Whether one exists to publish is a content decision, not a design one. The spec
  accepts either answer.
