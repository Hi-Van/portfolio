---
title: Design system
group: Index
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/site.css
  - assets/tui.css
  - index.html
  - work.html
  - about.html
  - report.html
  - ask.html
---

# Design system

The component reference for the Van Sirisouk site. It describes the five pages as they are built: exact classes, measurements, variants, states, and the places where `DESIGN.md` has fallen behind the CSS. `DESIGN.md` remains the token contract. This tree is the working reference for anyone changing a component.

Read [the narrative](narrative.md) for the feel. Read the foundations before making a new component. Read the component doc before editing a class, and the surface doc before changing a page composition.

## The system in one screen

- Four materials: white paper, ink blue, indigo for measured data, clay for assumptions. No third accent.
- Three voices: Instrument Serif for statements, Literata for reading, Instrument Sans for interface.
- Shapes: 4px badges, 6px secondary action, 10px panels, 12px abstract, 999px for the Contact pill and the chat field, 44px circle for the chat send.
- Structure: 1040px frame on the marketing pages, 720px measure in the report, 860px in the chat, 58px top bar. No drop shadows except the range thumb.
- Five pages: home, work, about, report, ask. The chat is a room, not an overlay. It reads this site only.

## Read in this order

| Doc | Answers | Read when |
|---|---|---|
| [The feel of the site](narrative.md) | Why the site feels quiet, measured, and a little austere, and what it refuses | You need the intent before the rules |
| [Typography](foundations/typography.md) | Families and the loader, the 13 contract steps, utilities, floors, measures, chart type, the conversational step | You are setting or changing type |
| [Color and theme](foundations/color-and-theme.md) | The four materials, the role table in both themes, how a colour reaches an element, measured contrast, the theme's application | You are adding color or a theme state |
| [Space, shape, and motion](foundations/space-shape-motion.md) | Frames, one gutter, the spacing base and rhythm tokens, radii, hairlines, elevation, breakpoints, motion | You are changing layout, shape, or animation |
| [Accessibility](foundations/accessibility.md) | Focus, skip link, semantics, live regions, keyboard paths, contrast, targets, known gaps | You are changing behavior or checking a release |
| [Content and provenance](foundations/content-and-provenance.md) | The fact registry, the four provenance classes, the accent mapping, the single-source rule, the arithmetic | You are adding or moving a number |
| [Navigation](components/navigation.md) | Top bar, links, Contact CTA, Ask switch, theme toggle, menu, skip link, footer, report section nav | You are touching the bar or a global control |
| [Actions](components/actions.md) | Filled pill, compact Contact CTA, outlined rectangle, text links, mail links, reset | You are adding or restyling an action |
| [Inputs](components/inputs.md) | Chat composer, send circle, range controls, reset | You are changing a field or a slider |
| [Evidence and data display](components/evidence.md) | Badges, result tiles, system rows, role rows, figures, charts, abstract, method rows, headings, byline | You are presenting a number |
| [Chat messages](components/messaging.md) | Message rows, citations, suggestions, notes, typing, system dividers | You are changing the transcript |
| [Report](surfaces/report.md) | The report as a document: cover, abstract, 720 measure, sections, figures, model, method, contact | You are changing report composition |
| [Chat](surfaces/chat.md) | The ask page as a room: header, log, composer, intro, return behavior | You are changing the chat surface |
| [Pages](surfaces/pages.md) | Home, work, and about composition | You are changing a page layout |

## Coverage map

Every class group in the site maps to one doc, and the content model maps to its own foundation. If a class is not listed here, it is page-specific or a new component that needs a doc before it spreads.

| Group | Classes and selectors | Doc |
|---|---|---|
| Content | `web/content/ids.ts`, `types.ts`, `facts.ts`, `model.ts`, `accent.ts`, `scripts/check-content.mjs` | [Content and provenance](foundations/content-and-provenance.md) |
| Navigation | `.top`, `.top__in`, `.top__name`, `.top__nav`, `.top__cta`, `.top__actions`, `.top__menu`, `.theme-toggle`, `.ask`, `.ask__track`, `.ask__knob`, `.ask__label`, `.skip`, `.foot`, `.foot__in`, `.foot__links` | [Navigation](components/navigation.md) |
| Actions | `.pill`, `.btn-rect`, `.textlink`, `.mail`, `.reset` | [Actions](components/actions.md) |
| Inputs | `.agent__composer`, `.composer`, `.composer__input`, `.composer__send`, `.agent__hint`, `.controls`, `.control`, range inputs | [Inputs](components/inputs.md) |
| Evidence | `.badgeline`, `.bgroup`, `.badge`, `.badge--loc`, `.badge__label`, `.pin`, `.results`, `.result`, `.result__num`, `.result__unit`, `.result__what`, `.role-row`, `.role-meta`, `.systems`, `.system`, `.system__name`, `.system__desc`, `.system__res`, `.systems--facts` | [Evidence](components/evidence.md) |
| Figures and method | `.figure`, `.figure__panel`, `.figure__chart`, `.figure__cap`, `.anatomy`, `.src`, `.rec__name`, chart mark classes, `.abstract`, `.abstract__label`, `.method`, `.method__row`, `.sec`, `.byline`, `.deck`, `.fig5__num`, `.contact` | [Evidence](components/evidence.md) |
| Messaging | `.agent__log`, `.msg`, `.msg__body`, `.msg__meta`, `.msg__avatar`, `.msg__who`, `.msg__tag`, `.msg__time`, `.msg__text`, `.msg__note`, `.msg__src`, `.msg__suggest`, `.msg__system`, `.msg__typing` | [Chat messages](components/messaging.md) |
| Report surface | `.cover`, `.masthead`, `.article`, `.bleed`, report sections and footer | [Report](surfaces/report.md) |
| Chat surface | `.agent`, `.agent__in`, `.agent__head`, `.agent__title`, `.agent__hash`, `.agent__rule`, `.agent__topic`, `.agent__log` | [Chat](surfaces/chat.md) |
| Page surfaces | `.wrap`, `.hero`, `.statement`, `.actions`, `.contact-strip`, `.page-head`, `.lede`, `.prose`, `.about-grid`, `.facts`, `.contact-card`, `.work-foot` | [Pages](surfaces/pages.md) |

## Source of truth

The CSS, markup, and scripts are the source for what the site does today. The component docs quote those values. `DESIGN.md` is the token contract: role colors, the type scale, shape language, and the rules the tokens cannot carry.

When the two disagree, the doc records both under `Divergences`. Neither the docs nor the contract should be edited to hide a mismatch. If you fix one, change the code, `DESIGN.md`, and the doc in the same pass.

## Contract debt

These are documented disagreements, not code changes waiting in this tree. Each link goes to the full note.

| Area | `DESIGN.md` | Implemented | Recorded in |
|---|---|---|---|
| Reading size | Literata body at 19px | 17.5px on the site pages, 17px under 760; 19px only on the report; 16.5px in the chat | [Typography](foundations/typography.md) |
| Serif minimum | Instrument Serif only at 26px and above | 20px abstract label, 20px system result, 25px record name, 16px chat avatar | [Typography](foundations/typography.md) |
| Scale purity | Nothing sits between steps | `.statement` 19 to 22, `.lede` 18.5, `.deck` 18 to 21, report and about headings on local clamps | [Typography](foundations/typography.md) |
| h2 tracking | -0.012em | -0.015em on work, -0.014em on about, -0.012em only on the report | [Typography](foundations/typography.md) |
| Caps floor | 10px | 9.5px on the chat bot tag and source label | [Typography](foundations/typography.md) |
| Contact pill type | 12.5px label | 13.5px compact CTA, 14px full pill | [Typography](foundations/typography.md), [Actions](components/actions.md) |
| One filled pill | One per page | The report has two: Contact in the bar and Email me in the closing block | [Actions](components/actions.md) |
| Badge | body text, 4px padding | ink text, 5px 10px padding, 4px radius | [Evidence](components/evidence.md) |
| Spacing tokens | 4, 8, 14, 24, 40 | No spacing tokens; literal values from 2 to 150 | [Space, shape, and motion](foundations/space-shape-motion.md) |
| Report frame | 1040 with 24px gutters, 720 body | Cover and bar 1040 at 24; article is a full width grid with a 720 middle; main pages use 32px gutters | [Space, shape, and motion](foundations/space-shape-motion.md) |
| Mobile report | One 350px column | One fluid column between 20px gutters; the 46px masthead floor arrives near a 667px viewport | [Space, shape, and motion](foundations/space-shape-motion.md) |
| Report tokens | Shared token set | The report repeats the tokens and five font faces inline; the Firefox range thumb is hardcoded `#fff` | [Color and theme](foundations/color-and-theme.md), [Evidence](components/evidence.md), [Inputs](components/inputs.md) |
| Clay count | Four places | The chat adds a fifth: the clay note on an unstated answer | [Color and theme](foundations/color-and-theme.md), [The feel of the site](narrative.md) |

## What is not in the system

There is no modal, dialog, toast, tooltip, popover, dropdown, breadcrumb, search, pagination, tab, accordion, generic table, generic form, select, checkbox, radio, disabled state, error state, success state, or empty state. The chat has a typing row, not a loading skeleton. The report has a method definition list, not a data table component.

A new pattern needs a doc here before it needs a second use. Group it by the reader's task, not by file count.

## Changing a component

1. Read this index, the component doc, and the source rule.
2. Change the CSS, markup, or script. Use tokens, not hex values. Keep the `file://` and offline constraints.
3. Update the doc's variants, states, measurements, and divergences in the same pass.
4. Update the coverage map if a class or group is new.
5. Update `DESIGN.md` if a token changes, then run its lint.
6. Run the token and artifact checks. Open the page at 390, 768, and 1440 in both themes. Move focus through the change.
7. Capture a current screenshot in `preview/` if the doc references one, and remove the stale capture it replaces.

## Doc conventions

- Frontmatter carries title, group, status, reviewed date, and sources.
- Component docs follow Anatomy, Variants, States, Measurements and tokens, Usage, Do and don't, Accessibility, Source.
- State tables name absent states instead of inventing them.
- Prose uses no em dashes or en dashes, straight quotes, sentence case headings, and no AI vocabulary.
- Screenshots are evidence, not source. A capture that shows an older component is marked stale in the doc.
- Links are relative and resolve inside this tree.

## Verification

Thirteen docs plus this index: one narrative, four foundations, five component groups, three surfaces. The source files were hashed before the writing wave and matched after it. `scripts/check-artifact-coverage.py` names the tree, `scripts/check-design-tokens.py` checks the two token copies, and `npx -y @google/design.md lint DESIGN.md` checks the contract.

If you add a doc, add it to the read order and the coverage map here, then run the artifact check. A page that the index does not name is invisible to the next agent.

## Related

- [DESIGN.md](../DESIGN.md) for the token contract and the hard rules.
- [README.md](../README.md) for the project state and number provenance.
- [AGENTS.md](../AGENTS.md) for the navigation map and commands.
