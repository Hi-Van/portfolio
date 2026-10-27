---
title: Space, shape, and motion
group: Foundations
status: current
reviewed: 2026-10-27
sources:
  - DESIGN.md
  - web/app/globals.css
  - web/components/theme/theme-provider.tsx
---

# Space, shape, and motion

Three frames, one gutter, a 4px spacing base with three named rhythm tokens, and radii that mean something. There are no drop shadows and nothing moves on its own.

## Frames

| Frame | Width | Utility | Surface |
| --- | --- | --- | --- |
| Site frame | 1040px | `max-w-frame` | Home, work, about, and the report masthead |
| Reading measure | 720px | `max-w-measure` | Report prose and figures |
| Agent room | 860px | `max-w-chat` | The agent surface |

The gutter is 32px at every width. On a narrow viewport every surface collapses to one fluid column inside that gutter; nothing shrinks its margin to buy column width, and nothing scrolls horizontally.

Vertical rhythm comes from section spacing, not from containers. Avoid wrapping a section in an extra panel.

## Spacing

Component spacing uses the numeric base: `--spacing: 4px`, so `p-4` is 16px and `gap-6` is 24px. Matching the old hand-tuned literals to that grid moved some control padding by up to 2px, which the 44px target floor was going to move anyway.

Layout rhythm is named rather than guessed:

| Token | Value | Utility | Where |
| --- | --- | --- | --- |
| `--spacing-gutter` | 32px | `px-gutter` | The frame's horizontal padding, every width |
| `--spacing-block` | 48px | `gap-block` | Space between blocks inside a section |
| `--spacing-section` | 96px | `py-section` | Space between sections |

There is no larger scale. A layout that needs a value outside these is judged in review, not rounded to a step that does not exist.

## Shape carries intent

| Radius | Value | Utility | Carries |
| --- | --- | --- | --- |
| fact | 4px | `rounded-fact` | Badges and fact labels |
| action | 6px | `rounded-action` | Secondary actions and controls |
| panel | 10px | `rounded-panel` | Panels and figure frames |
| abstract | 12px | `rounded-abstract` | The abstract block |
| pill | 999px | `rounded-pill` | The invitation and the conversational input |

A filled circle is a control, not an invitation. The agent's send is a 44px filled circle; the input is a 999px outlined pill.

## Elevation

There are no drop shadows. Depth is surface fill plus a hairline: `border-line` for a hairline, `border-line-strong` for a boundary that must read as an edge. The one exception is the slider thumb, which carries a 1px shadow to separate it from its track.

## Breakpoints

Tailwind's defaults, used sparingly. The narrow-viewport menu switches at 768px, the report's role and system rows regrid at 900px and 760px, and the about grid stacks at 900px. No component defines its own breakpoint; a new one belongs in the theme block first.

## Motion

Two mechanisms and one rule.

The rule: **content is visible before JavaScript runs.** No delivered markup or stylesheet may start at zero opacity, zero scale, or zero width and wait for an animation to reveal it. The previous build's scroll reveal did exactly that, which left three report figures blank with scripting off. It is deleted rather than ported.

- **CSS transitions** carry hover, focus, and colour changes. They are short and they never move layout.
- **The motion library** is used only where CSS cannot go: exit animation, which CSS has no answer for when a node is removed. That is the menu panel closing and a row leaving the transcript. It is imported inside leaf client components, never around a surface, and it uses the smaller feature bundle with `m` components.

Reduced motion is configured once per animated island and drops transform and layout animation. A reader who asked for less gets the end state at once, not a slower version of the same travel.

No measured number may spring toward its value. A figure that overshoots the truth on the way to it is a lie for a frame, so model outputs change directly or with a short tween.

## Accessibility

Every interactive target is at least 44 by 44, as a visible size or as a hit area that does not overlap another target. The focus indicator is 2px at a 3px offset, drawn outside a filled control so it stays visible against the fill.

## Source

- `DESIGN.md` for the frame, radius, and elevation rules.
- `web/app/globals.css` for the spacing base, rhythm tokens, radii, and containers.
- `web/components/theme/theme-toggle.tsx` for a control at the 44px floor.
- `web/tests/e2e/print.spec.ts` for the print override.
