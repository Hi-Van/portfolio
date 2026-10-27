---
title: Actions
group: Components
status: current
reviewed: 2026-10-27
sources:
  - web/components/shell/contact-pill.tsx
  - web/components/shell/ask-switch.tsx
  - web/components/shell/site-footer.tsx
  - web/content/site.ts
---

# Actions

Four actions exist: the invitation, the outlined action, the text link, and the mail link. The invitation is the only filled one. There is no second high-emphasis action anywhere on a surface.

## The invitation

The one filled element on a page. `bg-ink text-paper`, `rounded-pill`, the 12.5px label step at medium weight, `min-h-11`.

| Variant | Padding | Where |
| --- | --- | --- |
| `compact` | `px-4` | The top bar, on every surface |
| full | `px-5` | A document's closing block, and the report's contact block |

One recorded label size serves both variants. The earlier build used 12.5, 13.5, and 14 across three places, which is the drift this rebuild removes.

Colour comes from roles only, so it inverts in dark mode without a second rule: `bg-ink` is a light fill in dark, and `text-paper` is the dark ground.

### The document exception

The report is the one surface allowed a second filled invitation, in its closing contact block. It is the same component, not a new one, and no other surface may repeat it.

## The outlined action

`border border-line-strong`, `rounded-action`, `min-h-11`, ink text. Used where an action is real but not the primary invitation. The narrow-viewport menu control is the one place it appears today.

## The text link

Inline, inherited size, muted at rest and ink on hover, underlined only where the surrounding copy needs the affordance. Inside a paragraph a text link is exempt from the 44px floor, which is the standard exception: enlarging inline links would break the line.

## The mail link

The footer prints the address in full as a link rather than hiding it behind a second invitation. It sits at `min-h-11` with `px-2`, so its target is a real target.

## States

| State | Present | Styling |
| --- | --- | --- |
| Rest | yes | Role colours |
| Hover | yes | Invitation to `bg-ink/90`, links from muted to ink |
| Focus | yes | 2px ring at 3px offset, drawn outside a filled control |
| Current | yes, on navigation | `aria-current="page"`, not colour alone |
| Disabled | no | Nothing on the site disables an action |
| Loading | no | The agent's waiting state is a row in the transcript, not a button state |
| Error | no | The agent's retry is a row with its own control |

States that do not exist are named rather than invented. A new state needs a component that needs it.

## Measurements and tokens

| Property | Value | Utility |
| --- | --- | --- |
| Target floor | 44px | `min-h-11`, `min-w-11` |
| Invitation radius | 999px | `rounded-pill` |
| Outlined radius | 6px | `rounded-action` |
| Label step | 12.5px | `text-label` |
| Transition | 200ms | `duration-200` |

## Do and don't

- Do keep exactly one filled invitation per page.
- Do use the outlined action when something is secondary.
- Don't make a link look like a button, or a button look like a link.
- Don't add a loading spinner inside an action.
- Don't colour an action with an accent. The invitation is ink; the accents mean measurement and assumption.

## Accessibility

Every action is a real link or a real button, never a `div` with a handler. The focus indicator is visible on every one, including the filled invitation where the ring sits outside the fill. Target sizes are measured by a browser test rather than judged by eye.

## Source

- `web/components/shell/contact-pill.tsx` for the invitation.
- `web/components/shell/menu.tsx` for the outlined action.
- `web/components/shell/site-footer.tsx` for text and mail links.
- `web/content/site.ts` for the address.
- `design-system/foundations/space-shape-motion.md` for the radius language.
