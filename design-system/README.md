---
title: Design system
group: Index
status: current
reviewed: 2026-10-27
sources:
  - DESIGN.md
  - web/app/globals.css
  - web/components
  - web/content
---

# Design system

The component reference for the Van Sirisouk site. It describes the application as it is built: the
tokens, the components, the surfaces, and the checks that hold them together. `DESIGN.md` remains the
token contract.

Read [the narrative](narrative.md) for the feel. Read the foundations before making a new component.
Read the component doc before changing one, and the surface doc before changing a page's composition.

## The system in one screen

- Four materials: white paper, ink blue, indigo for measurement, clay for assumption. No third accent.
- Three voices: Instrument Serif for statements, Literata for reading, Instrument Sans for interface.
- Shapes: 4px badges, 6px secondary actions, 10px panels, 12px abstract, 999px for the invitation and
  the composer field, a 44px circle for send.
- Structure: a 1040px frame, a 720px reading column in the report, an 860px agent room, a 64px bar,
  one 32px gutter at every width.
- Five surfaces, one answer endpoint, one fact registry.

## Read in this order

| Doc | Answers | Read when |
|---|---|---|
| [The feel of the site](narrative.md) | Why the site feels quiet, measured, and a little austere, and what it refuses | You need the intent before the rules |
| [Typography](foundations/typography.md) | Families and the loader, the 13 contract steps, utilities, floors, measures, chart type, the conversational step | You are setting or changing type |
| [Color and theme](foundations/color-and-theme.md) | The four materials, the role table in both themes, how a colour reaches an element, measured contrast, the theme's application | You are adding color or a theme state |
| [Space, shape, and motion](foundations/space-shape-motion.md) | Frames, one gutter, the spacing base and rhythm tokens, radii, hairlines, elevation, breakpoints, motion | You are changing layout, shape, or animation |
| [Content and provenance](foundations/content-and-provenance.md) | The fact registry, the four provenance classes, the accent mapping, the single-source rule, the arithmetic | You are adding or moving a number |
| [Accessibility](foundations/accessibility.md) | Focus, skip link, landmarks, targets, keyboard paths, contrast, reduced motion, no-script behaviour, known gaps | You are changing behavior or checking a release |
| [Navigation](components/navigation.md) | The bar, its order, the invitation, the agent switch, the theme control, the disclosure, skip link, footer | You are touching the bar or a global control |
| [Actions](components/actions.md) | The invitation, the outlined action, text and mail links, states that do not exist | You are adding or restyling an action |
| [Inputs](components/inputs.md) | The model's sliders, their states and value text, the reset control | You are changing a field or a slider |
| [Evidence and data display](components/evidence.md) | Badges, result cells, role and system rows, figures, captions, method rows, headings, byline | You are presenting a number |
| [Chat messages](components/messaging.md) | Message rows, inline citations, the refusal note, withdrawal, suggestions, waiting and failure rows, announcement | You are changing the transcript |
| [Report](surfaces/report.md) | The report as a document: masthead, abstract, reading column, five figures, the model, method, section navigation | You are changing report composition |
| [Chat](surfaces/chat.md) | The agent as a room: composition, where the conversation lives, composer, return path, the endpoint | You are changing the chat surface |
| [Pages](surfaces/pages.md) | Home, work, and about composition | You are changing a page layout |

## Coverage map

Every source file maps to one doc. A file that is named nowhere fails `check-artifacts`.

| Group | Files | Doc |
|---|---|---|
| Theme and tokens | `web/app/globals.css`, `web/app/providers.tsx`, `web/components/theme/` | [Color and theme](foundations/color-and-theme.md) |
| Content model | `web/content/facts.ts`, `ids.ts`, `types.ts`, `model.ts`, `accent.ts` | [Content and provenance](foundations/content-and-provenance.md) |
| Page copy | `web/content/home.ts`, `work.ts`, `about.ts`, `report.ts`, `site.ts`, `format.ts`, `index.ts` | [Pages](surfaces/pages.md), [Report](surfaces/report.md) |
| Frame | `web/components/shell/` | [Navigation](components/navigation.md) |
| Actions and inputs | `web/components/shell/contact-pill.tsx`, `web/components/report/model.tsx` | [Actions](components/actions.md), [Inputs](components/inputs.md) |
| Evidence | `web/components/evidence/badge.tsx`, `web/components/home/results-band.tsx`, `web/components/work/role-row.tsx` | [Evidence](components/evidence.md) |
| Figures | `web/components/figures/`, `web/components/report/model.tsx` | [Evidence](components/evidence.md), [Report](surfaces/report.md) |
| Agent | `web/components/agent/`, `web/lib/ask/`, `web/lib/agent/`, `web/app/api/ask/route.ts` | [Chat](surfaces/chat.md), [Chat messages](components/messaging.md) |
| Checks | `web/scripts/` | [Accessibility](foundations/accessibility.md), this index |
| Tests | `web/tests/` | The doc for the thing each test covers |

## Source of truth

The code is the source for what the site does today; these docs quote it. `DESIGN.md` is the contract
for colour, type, and shape. When a doc and the code disagree, fix both in the same change and record
what changed here.

Three checks make the contract enforceable rather than aspirational. `check-tokens` compares the
stylesheet to `DESIGN.md` in both directions. `check-content` fails when a surface prints a digit that
did not come from the registry. `check-styles` fails on an arbitrary value, a raw colour, or a
`dark:` variant. A fourth, `check-bundle`, proves the client ships nothing it should not.

## The debt this rebuild closed

The previous static build carried thirteen recorded disagreements between the contract and the
stylesheet. They were resolved by decision rather than recorded again:

| Was | Is |
|---|---|
| Reading size 17.5px on site pages, 17px narrow, 19px only in the report | One reading size, 19px, on every prose surface at every width |
| Serif at 20, 25, and 16px in places | A 20px serif floor, with the 25px record name promoted to the 26px step and a glyph avatar exempt |
| Sizes between the scale steps | Removed; a heading steps down rather than shrinking |
| Three invitation label sizes | One, at the 12.5px label step |
| Gutters of 24, 32, and 20 by viewport | One 32px gutter at every width |
| A declared spacing scale the build never used | A 4px numeric base plus three named rhythm tokens |
| Clay in four documented places | Five: the fifth is the note on an unstated answer |
| Two token copies, one in the report | One theme block in `web/app/globals.css` |
| Chart labels at one size | 15 units wide, 26 narrow, so a scaled figure stays legible |
| A scroll reveal that hid three figures without scripting | Deleted; figures are drawn, not revealed |

The one line left open is the 9.5px uppercase instances on the chat tag and source label. It belongs to
the accessibility change, and `design.md` lists it under that change's scope.

## What is not in the system

There is no modal, dialog, toast, tooltip, popover, dropdown, breadcrumb, search, pagination, tab,
accordion, generic table, generic form, select, checkbox, radio, disabled state, error field, or empty
state. The model has sliders, not a form. The report has a definition list, not a data table.

A new pattern needs a doc here before it needs a second use, and a primitive needs a pattern before it
needs a dependency.

## Changing a component

1. Read this index, the component doc, and the source.
2. Change the component. Use tokens, never a literal. Keep the frame and the floor.
3. Update the doc's variants, states, and measurements in the same change.
4. Update the coverage map if a file is new.
5. Update `DESIGN.md` if a token changes, then run its lint.
6. Run `npm run check` and open the surface at 390, 768, and 1440 in both themes.
7. Move focus through the change with a keyboard.

## Doc conventions

- Frontmatter carries title, group, status, reviewed date, and sources.
- Component docs follow Anatomy, Variants, States, Measurements and tokens, Usage, Do and don't,
  Accessibility, Source.
- State tables name absent states instead of inventing them.
- Prose uses no em dashes or en dashes, straight quotes, sentence case headings, and no AI vocabulary.
- Cite files, never line numbers. A line number rots on the first edit.
- Links are relative and resolve inside this tree.

## Verification

Fourteen docs plus this index: one narrative, five foundations, five component groups, three surfaces.
The checks in `web/scripts/` and the two test runners hold the code to the docs. `check-artifacts`
names every source file; `DESIGN.md` lints clean; the suite and the browser tests are the release gate.

If you add a doc, add it to the read order and the coverage map here.

## Related

- [DESIGN.md](../DESIGN.md) for the token contract.
- [README.md](../README.md) for the project state and number provenance.
- [AGENTS.md](../AGENTS.md) for the navigation map and commands.
- `openspec/changes/replatform-site/design.md` for why the medium is what it is.
