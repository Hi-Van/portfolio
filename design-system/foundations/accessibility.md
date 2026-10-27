---
title: Accessibility
group: Foundations
status: current
reviewed: 2026-10-27
sources:
  - web/app/layout.tsx
  - web/app/globals.css
  - web/components/shell/site-header.tsx
  - web/components/shell/menu.tsx
  - web/components/shell/skip-link.tsx
  - web/components/shell/page-main.tsx
  - web/components/theme/theme-provider.tsx
  - web/tests/e2e/shell.spec.ts
  - web/tests/e2e/theme.spec.ts
  - web/tests/e2e/print.spec.ts
---

# Accessibility

The floor this build must hold: every target at least 44 by 44, a 2px focus ring at a 3px offset, a skip link, landmarks, reduced motion, measured contrast, and a page that is readable without scripting. This change fixes the failures its own surfaces touch. The remainder is carried by a later change, listed under known gaps.

## Target sizes

Measured by a browser test against the live bar and footer, not judged by eye.

| Control | Size | 44px |
| --- | --- | --- |
| Invitation | `min-h-11 px-4` | pass |
| Ask switch | `min-h-11` | pass |
| Theme control | `size-11` (44 by 44) | pass |
| Menu control | `min-h-11 min-w-11` | pass |
| Primary nav links | `min-h-11 px-2` | pass |
| Footer links | `min-h-11 min-w-11 px-2` | pass |
| Skip link | `min-h-11` when focused | pass |

Inline links inside a paragraph are exempt and stay inline. The complete report model's sliders, the chat composer, and the send control are held to the same floor when those surfaces land.

## Focus

One rule, in the base layer: `outline: 2px solid var(--indigo); outline-offset: 3px`. Indigo on paper measures 10:1 in light and 9.6:1 in dark, well past the 3:1 a non-text indicator needs.

The ring is drawn outside a filled control, so the invitation's ring never sits on its own fill. A browser test walks the first twelve focusable elements on every surface and asserts the width and offset, so a component cannot opt out by accident.

## Landmarks and structure

`header`, `nav` labelled Primary, `nav` labelled Footer, `main#main`, and `footer`. The skip link is the first focusable element and targets `#main`, which is `tabIndex={-1}` so following it moves focus rather than only scrolling.

`aria-current="page"` marks the current surface in the bar, in the narrow-viewport panel, and on the ask switch. It is never colour alone.

## Keyboard paths

| Path | Result |
| --- | --- |
| Tab from arrival | Skip link first, then the bar, then content |
| Skip link | Focus moves into `main` |
| Menu, opened | Focus moves to the first link in the panel |
| Menu, Escape | Panel closes and focus returns to the control |
| Menu, choosing a link | Panel closes and the route changes |
| Theme control | Space or Enter flips the theme; `aria-pressed` follows |
| Agent return | Escape returns the reader to the surface they came from, when the agent surface lands |
| Composer | Enter submits, a modifier inserts a newline, when the composer lands |

No focus trap exists anywhere. The disclosure is not modal; content behind it stays reachable.

## Live regions

No live region exists yet. When the agent surface lands, an answer is announced once on completion or withdrawal, never per fragment, because a streaming answer announced token by token is unusable. The requirement is in the `site-agent` spec.

## Contrast

Measured in both themes by `web/scripts/contrast.mjs`; the full table is in [Color and theme](color-and-theme.md). Every text pairing meets 4.5:1 and the focus indicator meets 3:1. The two accents are checked against both the page and the panel, not only the page.

## Reduced motion

`globals.css` removes transition and animation duration under a reduced-motion preference and turns off smooth scrolling. The motion library is configured once per animated island with `reducedMotion="user"`, which drops transform and layout animation while leaving opacity. In practice the menu panel appears in its end state with no travel.

The previous build's scroll reveal is deleted rather than ported: content that starts at zero opacity and waits for an observer is content that is missing without scripting. A test asserts the disclosure's transform is `none` under the preference.

## Zoom and reflow

The viewport meta carries no `maximum-scale` and no `user-scalable=no`. `html` sets `-webkit-text-size-adjust: 100%`. Every surface collapses to one fluid column inside the 32px gutter, and no element may cross the viewport edge. Charts scale with their container rather than reflowing, and their label sizes are checked at the narrowest viewport.

## Without scripting

- The page is readable. Type, colour, spacing, landmarks, and the skip link are all in markup and CSS.
- The theme follows the system preference, because the paint comes from the media query rather than from an effect.
- The narrow-viewport navigation cannot open, because the disclosure is a client interaction. This is a known gap.
- The theme control is inert and still announces the next theme, which is the correct reading of an unchanging page.

## Known gaps

Recorded here and carried by the accessibility change rather than closed in this one.

| Gap | Impact | Where |
| --- | --- | --- |
| Uppercase keys at 9.5px on the chat tag and source label | Hard to read at default zoom | Chat surface, when it lands |
| Narrow-viewport navigation needs scripting | A phone reader with scripting off has no site navigation | `web/components/shell/menu.tsx` |
| No `forced-colors` or increased-contrast handling | A reader in a forced palette sees the site's colours, not theirs | Deferred |
| Text spacing and reflow at 200 percent untested | A reader with a text-spacing override may meet a clipped row | Deferred |
| No screen reader matrix | Behaviour is asserted by browser tests, not by a person on VoiceOver and NVDA | Deferred |

The four deferred rows are the accessibility change's scope, recorded in `design.md` under goals and non-goals.

## Source

- `web/app/globals.css` for the focus ring, reduced motion, and print.
- `web/app/layout.tsx` for landmarks, language, and the skip link's position.
- `web/components/shell/skip-link.tsx` and `page-main.tsx` for the skip target.
- `web/components/shell/menu.tsx` for focus in, focus out, Escape, and reduced motion.
- `web/components/theme/theme-provider.tsx` for the state the control announces.
- `web/scripts/contrast.mjs` for the measured pairings.
- `web/tests/e2e/shell.spec.ts` for order, targets, focus, the disclosure, and the sweep.
- `web/tests/e2e/theme.spec.ts` for the theme with and without scripting.
