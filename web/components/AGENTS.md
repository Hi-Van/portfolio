# components/

Everything that renders. Grouped by what the reader is doing, not by file type.

## The groups

| Directory | Owns | Doc |
|---|---|---|
| `shell/` | The bar, its order, the invitation, the agent switch, the disclosure, the skip link, the footer, the page main | `../design-system/components/navigation.md` |
| `theme/` | The theme provider and the control that reads it | `../design-system/foundations/color-and-theme.md` |
| `evidence/` | Badges | `../design-system/components/evidence.md` |
| `home/`, `work/`, `about/` | One surface's blocks | `../design-system/surfaces/pages.md` |
| `figures/` | The figure frame and figures 1 to 4 | `../design-system/components/evidence.md` |
| `report/` | The model (figure 5) and the section navigation | `../design-system/surfaces/report.md` |
| `agent/` | The chat room and where the conversation lives | `../design-system/surfaces/chat.md`, `../design-system/components/messaging.md` |

## Server or client

Only four things are interactive, so only they carry `"use client"`:

| Client file | Why |
|---|---|
| `theme/theme-provider.tsx` | Reads storage and writes an attribute after hydration |
| `shell/menu.tsx` | Disclosure state, focus, and its exit animation |
| `report/model.tsx` | Two sliders and a derived output |
| `agent/agent-room.tsx` | The transcript: send, stop, retry, announce |

Everything else is a server component. Two rules follow:

- **Never wrap a surface in a client boundary.** Pass rendered children into a client island instead.
- **Never make a component client to use a hook you have not needed yet.** State lives in the island
  that owns the interaction.

`shell/site-header.tsx` is a client component only because it reads `usePathname` for `aria-current`.

## Styling

- Use contract utilities from `../DESIGN.md` and `app/globals.css`. There is no `tailwind.config` and
  no arbitrary value is allowed.
- `check-styles.mjs` fails on `p-[13px]`, on a raw hex, and on any `dark:` variant. If a value is
  missing, add a token to the theme block first.
- Interactive state from a primitive arrives as a `data-*` attribute, for example Base UI's slider.
  Style it with a variant; do not reach into internals.
- No drop shadows. Separation is surface fill plus a hairline.
- One filled invitation per page. A document may repeat it in its closing block.

## Data

A component that states a number takes a `Fact` from `content/facts.ts` and renders `.display`, or
calls `fact(id)`. It never takes a number and never formats a literal. The accent follows
`accentFor(provenance)`, which is the only place a provenance becomes a colour role.

## Adding a component

1. Decide the group: which reader task does it serve?
2. Server by default. Add `"use client"` only if it owns an interaction.
3. Use tokens, and keep it inside the frame and the 44px floor.
4. Name the file in `../design-system/README.md`'s coverage map and in the matching doc.
5. Run `npm run check`; the artifact check fails until the file is named.

A component used once lives beside the surface that uses it. A component that could spread needs a doc
before it needs a second use.
