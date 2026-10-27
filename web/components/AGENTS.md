# web/components/

Everything that renders, grouped by what the reader is doing rather than by file type: the frame, the
theme, one surface's blocks, the evidence, the figures, the report's model, and the agent. This file is
`web/components/AGENTS.md`; it is context, not source, so the artifact check skips it. Every path in
this file is from the repository root.

## Groups

| Group | What it is for | Read |
|---|---|---|
| `web/components/shell/` | The bar, its order, the invitation, the agent switch, the disclosure, the skip link and its target, the footer | `design-system/components/navigation.md`, `design-system/components/actions.md` |
| `web/components/theme/` | The theme context and the control that reads it | `design-system/foundations/color-and-theme.md` |
| `web/components/evidence/` | The badge, the one neutral container for a fact about the person | `design-system/components/evidence.md` |
| `web/components/home/`, `web/components/work/`, `web/components/about/` | One surface's blocks, and nothing another surface uses | `design-system/surfaces/pages.md` |
| `web/components/figures/` | The figure frame and figures 1 to 4 | `design-system/components/evidence.md`, `design-system/surfaces/report.md` |
| `web/components/report/` | Figure 5 with the model that drives it, and the report's section navigation | `design-system/surfaces/report.md`, `design-system/components/inputs.md` |
| `web/components/agent/` | The room, and where the conversation lives | `design-system/surfaces/chat.md`, `design-system/components/messaging.md` |

## Files

| File | Owns |
|---|---|
| `web/components/shell/site-header.tsx` | The bar and its order: name, primary navigation, invitation at desktop width, ask switch, menu, theme control last. Client for `usePathname`. |
| `web/components/shell/menu.tsx` | The disclosure below 768px: expanded state, focus in and out, Escape, close on route change and on widening, the 8px entrance. |
| `web/components/shell/ask-switch.tsx` | The agent switch as a link with `aria-current`, not a switch control. Takes `current` and `from` as props. |
| `web/components/shell/contact-pill.tsx` | The one filled invitation. `compact` for the bar, the full form for a document's closing block. |
| `web/components/shell/site-footer.tsx` | The site name, the five surfaces, and the address in full. |
| `web/components/shell/skip-link.tsx` | The first focusable element, hidden until focused, targeting `#main`. |
| `web/components/shell/page-main.tsx` | `main#main` with `tabIndex={-1}`, so the skip link moves focus rather than only scrolling. |
| `web/components/theme/theme-provider.tsx` | The theme context, the stored choice, and the `data-theme` attribute. Applies the choice after hydration. |
| `web/components/theme/theme-toggle.tsx` | The 44 by 44 control. `aria-pressed` is the current theme; the label names the next one. |
| `web/components/evidence/badge.tsx` | `Badge` and `LocationPin`. Neutral fill, hairline, small radius, no accent. |
| `web/components/home/results-band.tsx` | Three measured cells, each a link into `/work`, plus the link into the report. |
| `web/components/home/contact-strip.tsx` | The home closing block: label, address, note, link to about. |
| `web/components/work/role-row.tsx` | A role on a three column grid, with system rows whose figures come from the registry and whose names link into the report. |
| `web/components/about/contact-card.tsx` | The about closing block: label, address, note, link to the report. |
| `web/components/figures/figure.tsx` | The frame: panel fill, a caption that states the assumption, a bold figure number, `aria-labelledby`. |
| `web/components/figures/submissions-diagram.tsx` | Figure 1, markup only: three submissions resolving to one record. |
| `web/components/figures/latency-bars.tsx` | Figure 2, hand written SVG: two indexed bars in `chart-cell` and indigo. |
| `web/components/figures/unit-grid.tsx` | Figure 3, SVG generated at render: 104 cells, one indigo reference bar. |
| `web/components/figures/annual-volume.tsx` | Figure 4, visx scales and one line path in indigo. |
| `web/components/report/model.tsx` | Figure 5 and the model: two Base UI sliders, a derived readout, the band chart, the fixed assumption note, and the reset control. |
| `web/components/report/section-nav.tsx` | In page navigation, sticky under the bar, stating the section in view with `aria-current="location"`. |
| `web/components/agent/chat-provider.tsx` | The conversation above the route: `useChat`, the transport that posts the endpoint's contract, the context. |
| `web/components/agent/agent-room.tsx` | The room: empty state and suggestions, message rows, citations, refusal note, composer, stop, retry, announcement, return link. |

## What carries the number on each surface

| Surface | Component | What it is |
|---|---|---|
| Home | `web/components/home/results-band.tsx` | Three indigo measurements, each a link into the work surface |
| Work | `web/components/work/role-row.tsx` | The system rows, each with its figure at the 26px step in indigo |
| Report | `web/components/report/model.tsx` | Figure 5 and the derived seller hours at the page display step in indigo |
| About | none | The surface states no measurement in a component; the facts list is page copy |
| Ask | `web/components/agent/agent-room.tsx` | The transcript holds the answer and its citations |

## Server and client

Four reader interactions exist, as `web/AGENTS.md` says. Eight files carry `"use client"`: five islands
(the theme pair, the disclosure, the sliders, the room pair, and the section navigation) and the
header that reads the path.

| Client file | Why |
|---|---|
| `web/components/theme/theme-provider.tsx` | Reads storage, writes `data-theme`, and holds the context |
| `web/components/theme/theme-toggle.tsx` | Consumes that context and handles the click |
| `web/components/shell/site-header.tsx` | Reads `usePathname` for `aria-current` on the name, the links, and the switch |
| `web/components/shell/menu.tsx` | Disclosure state, focus, Escape, and the entrance animation |
| `web/components/report/section-nav.tsx` | An `IntersectionObserver` picks the section in view |
| `web/components/report/model.tsx` | Two sliders, a derived output, and the reset control |
| `web/components/agent/chat-provider.tsx` | The chat hook lives above the route |
| `web/components/agent/agent-room.tsx` | The transcript: send, stop, retry, announce |

The section navigation is the one island with no control; it needs an observer. Every other file is a
server component, including `web/components/shell/ask-switch.tsx` and
`web/components/shell/contact-pill.tsx`, which stay server side even though the client header imports
them.

Two rules follow:

- **Never wrap a surface in a client boundary.** Pass rendered children into the island. The root
  layout in `web/app/layout.tsx` wraps the whole site in `ChatProvider`, and `web/app/providers.tsx`
  wraps it in `ThemeProvider`, while every page inside stays a server component.
- **Never make a component client for a hook it does not need yet.** State lives in the island that
  owns the interaction, and the island holds nothing else.

One consequence of the first rule: a file imported from a client file becomes client code, so keep the
island small and do not reach for a server module from inside one.

## Styling

| Rule | Enforced by |
|---|---|
| Contract utilities only. There is no `tailwind.config`; the tokens are in `web/app/globals.css` | `web/scripts/check-styles.mjs` fails on an arbitrary value |
| No raw hex in a component | Same check |
| No `dark:` variant. One token set serves both themes through raw variables | Same check |
| State comes from the element: `aria-[current=page]:`, `aria-[current=location]:`, `disabled:`, or a `data-*` attribute a primitive sets | Write the variant, never a selector into internals |
| No shadows. Separation is surface fill plus a hairline | Review |
| One filled invitation per page, repeated only in a document's closing block | Review. `web/components/shell/contact-pill.tsx` is the only filled invitation component |
| Shape and type come from the contract steps | `web/scripts/check-tokens.mjs`, review |
| Every control is at least 44 by 44 | `web/tests/e2e/shell.spec.ts`, `web/tests/e2e/report.spec.ts` |

Notes that save a round trip:

- The arbitrary value check matches a bracketed class only when the bracket holds a digit or a colour.
  `aria-[current=page]:text-ink` and `data-[selected]` pass, `p-[13px]` and `bg-[#fff]` do not.
- `DESIGN.md` records a 1px shadow on the model's range thumb. `web/components/report/model.tsx` draws
  none, and the rule is no shadows, so do not add it.
- The sliders are Base UI parts: `Root`, `Control`, `Track`, `Indicator`, `Thumb`. The Control is 44px
  tall and the track is 6px. The Thumb is itself a 44 by 44 transparent cell around a 20px clay span,
  which is why the drawn knob looks smaller than the target: the browser test measures the element
  with the slider role, so keep that box at 44. Each Thumb carries `getAriaLabel` and
  `getAriaValueText`; the readout beside it is visual only.
- Clay in this folder is only the model's readouts, indicator, and knob, and the agent's refusal note.
  The report's abstract label is in `web/app/report/page.tsx`. The contract also names figure 1's
  inference and the assumed method row; both render muted today, so colouring them is a contract
  change, not a fix.
- `bg-ink` circles are controls, not invitations: the chat send and stop in
  `web/components/agent/agent-room.tsx`. The skip link is a filled pill only while focused.

### Motion

Two islands move: the disclosure in `web/components/shell/menu.tsx` and the transcript in
`web/components/agent/agent-room.tsx`. Both configure the library the same way.

| Setting | Value |
|---|---|
| Features | `<LazyMotion features={domAnimation}>` with the `m` component, so the full motion component is not in the bundle |
| Preference | `<MotionConfig reducedMotion="user">` |
| Duration and curve | 180ms, `easeOut` |
| Menu travel | 8px down from `y: -8` |
| Row travel | 6px up from `y: 6` |
| Reduced motion | `useReducedMotion()` drops the transform, so the element animates opacity only and lands with `transform: none` |

`web/tests/e2e/shell.spec.ts` asserts the computed transform under the preference.
`web/app/globals.css` separately zeroes CSS transition and animation durations, which covers hover
colour and the ask switch, not the library's animation.

## Data

| Source | How it reaches the component | Example |
|---|---|---|
| `web/content/facts.ts` | `fact(id)` at render, then `.display` or `.value` | `web/components/work/role-row.tsx`, `web/components/figures/unit-grid.tsx` |
| `web/content/home.ts` | `bandCells()` resolves each cell's `display` on every call | `web/components/home/results-band.tsx` |
| `web/content/model.ts` | `DEFAULT_ASSUMPTIONS` and `sellerHoursReturned` | `web/components/report/model.tsx` |
| `web/content/format.ts` | `compact` and `grouped`, for SVG labels and live outputs | `web/components/figures/annual-volume.tsx` |
| `web/content/site.ts`, `home.ts`, `work.ts`, `about.ts`, `report.ts` | The object is imported and read | `web/components/shell/site-footer.tsx` |
| A client island | Plain props, rendered children, or context | `web/components/agent/chat-provider.tsx` to `agent-room.tsx` |

Nothing fetches at render. The one network call in the folder is the chat transport in
`web/components/agent/chat-provider.tsx`, which posts `{question, history}` to `/api/ask`.

`web/components/agent/agent-room.tsx` does not fetch. It calls `useAgentChat()`, which reads the
context from `ChatProvider`; that provider is mounted in `web/app/layout.tsx` above the route, so
moving between surfaces keeps the transcript and any answer still arriving, and a reload empties it
because nothing is written to storage.

`web/content/report.ts` placeholders such as `{session-shorter}` are resolved by `renderProse` in
`web/app/report/page.tsx`, not inside a component. A component that receives report prose receives it
already resolved.

What a component may do with a number:

- Take a `FactId` or a `Fact`, never a bare number. `web/tests/types/fact-types.ts` fails the build on
  `renderNumber(30)`, so the type is the rule.
- Render `.display`, the authored form. Use `.value` only to compute.
- Use `compact` or `grouped` where a display string is too long for an SVG label or a live output.
  Never author a second display string by hand.
- Call `web/content/model.ts` for a derived number. No component holds a formula.
- Never print a digit in a JSX text node. `web/scripts/check-content.mjs` scans for it, with a
  `content-literal-ok` line comment as the escape hatch. `Figure {number}` is an expression, and the
  section labels in `section-nav.tsx` are document numbering rather than a claim.
- Colour follows the meaning, not the value: indigo for a measurement or a derived figure, clay for an
  assumption, neutral for everything else. `accentFor` in `web/content/accent.ts` is the declared
  mapping when a class is dynamic; no component calls it today because each number's class is known at
  the call site.

## Adding a component

1. Pick the group by the reader's task, not by the primitive. A block used by one surface goes in that
   surface's folder.
2. Write it as a server component. Add `"use client"` only if it owns state, an effect, or an event,
   and keep that file as small as the interaction.
3. Read the matching design system doc, then the token contract in `DESIGN.md`.
4. Use role utilities and the shape and type steps. Keep the frame, the 44px floor, and the focus ring
   you get for free.
5. Take numbers as fact ids. A new number is added to `web/content/facts.ts` and `web/content/ids.ts`
   first, never in the component.
6. Name the file in the table above, in the coverage map in `design-system/README.md`, and in the
   matching doc. The artifact check only needs a context doc; the other two are the convention.
7. Add the test that protects the behaviour: a unit test for the reading of data, a browser test for a
   target, a state, or a keyboard path. `web/tests/AGENTS.md` says where each belongs.
8. Run `node scripts/check-artifacts.mjs` while you work, then `npm run check` before claiming done.

A component used once lives beside the surface that uses it. A component that could spread needs a doc
before it needs a second use.

## Gotchas

- **The theme flash is a decision, not a bug.** `theme-provider.tsx` keeps `theme` null until mount so
  the first client render matches the server, then applies the stored choice. Decision D6 in
  `openspec/changes/archive/2026-10-27-replatform-site/design.md` records it. Do not add an inline
  script to pre-apply the theme without changing that decision first.
- **The storage key is `vs-theme`.** It is kept from the previous build so a saved choice survives.
  Changing it silently resets every reader's choice.
- **The model must start from `DEFAULT_ASSUMPTIONS`.** Initialising a slider from storage or `window`
  makes the prerender and the first client render disagree; `web/tests/e2e/report.spec.ts` asserts the
  default output with scripting off and fails on a hydration warning.
- **Announce once, when an answer finishes.** The transcript is not a live region. The hidden `output`
  receives one sentence per finished answer, with anchors stripped and a withdrawal already applied.
  Announcing per fragment reads the answer aloud in pieces.
- **`?from=` goes through an allowlist.** The room resolves it through `RETURN_TARGETS` in `web/content/site.ts`, through the verifying `isReturnKey` guard, and falls back to
  `/`. Never navigate to the raw parameter.
- **Figures are complete without scripting.** Nothing starts hidden and waits for a reveal; the unit
  grid is generated at render. Only the two motion islands may start at zero opacity, and only for an
  element that does not exist until the reader acts.
- **Chart labels depend on the reading measure.** The 900-unit viewBox scales with the column, so SVG
  text carries `text-chart-narrow md:text-chart`. Shortening `max-w-measure` means re-checking label
  size at 960 and at 390; `web/tests/e2e/report.spec.ts` measures both.
- **The menu panel is absolute inside the bar's relative container** and the bar hides the primary
  navigation, the invitation, and the panel's own trigger at the same 768px breakpoint. Moving the
  bar's positioning, or adding a control without checking the narrow width, breaks the only route to
  navigation on a phone.
- **The section navigation repeats the report's section ids and numbers.** `section-nav.tsx` holds its
  own `ITEMS` list. A new report section is invisible in the nav until it is added there too.
- **Every `mailto:` is `site.email`.** A browser test counts every mail link on every surface and
  requires one address.
- **The report's closing invitation is inlined in the page,** not rendered through `ContactPill`. It
  copies the same classes without the hover transition, so a change to the component does not reach
  it. Keep the two in step or switch the page to the component.
- **The composer is documented in two places.** `design-system/components/inputs.md` still says the
  composer is not built. It is; read `design-system/surfaces/chat.md` and
  `design-system/components/messaging.md`.

## Docs

| Doc | Answers | Read when |
|---|---|---|
| `design-system/components/navigation.md` | The bar, its order, the invitation, the switch, the theme control, the disclosure, the skip link, the footer, print | Touching anything in `shell/` or `theme/` |
| `design-system/components/actions.md` | The invitation variants, the outlined action, the text link, the mail link | Adding or restyling an action |
| `design-system/components/inputs.md` | The sliders, their states and value text, the reset control | Changing the model's controls |
| `design-system/components/evidence.md` | Badges, result cells, role and system rows, figures, captions, method rows, headings, the byline | Presenting a number |
| `design-system/components/messaging.md` | Message rows, inline citations, the refusal note, withdrawal, suggestions, waiting and failure, the announcement | Changing the transcript |
| `design-system/surfaces/pages.md` | Home, work, and about composition | Touching `home/`, `work/`, or `about/` |
| `design-system/surfaces/report.md` | Masthead, abstract, reading column, five figures, the model, method, section navigation | Touching `figures/` or `report/` |
| `design-system/surfaces/chat.md` | The room, where the conversation lives, the composer, the return path, the endpoint | Touching `agent/` |
| `design-system/foundations/content-and-provenance.md` | The registry, the four classes, the accent mapping, the arithmetic | Adding or moving a number |
| `design-system/foundations/accessibility.md` | Focus, targets, landmarks, keyboard paths, reduced motion, no-script behaviour | Changing behaviour or checking a release |
