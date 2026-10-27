---
title: Navigation
group: Components
status: current
reviewed: 2026-10-27
sources:
  - web/components/shell/site-header.tsx
  - web/components/shell/menu.tsx
  - web/components/shell/ask-switch.tsx
  - web/components/shell/contact-pill.tsx
  - web/components/shell/skip-link.tsx
  - web/components/shell/site-footer.tsx
  - web/components/theme/theme-toggle.tsx
  - web/content/site.ts
---

# Navigation

One bar, one order, on every surface. The bar is 64px tall, sticks to the top, and separates from the page with a hairline rather than a shadow. Everything in it meets the 44px target floor.

## Order

```
name (home)  |  primary navigation  |  invitation  |  ask switch  |  menu (narrow)  |  theme
```

The theme control is always last. The menu control appears only below 768px and the primary navigation hides at the same point, so the bar never carries two ways to reach the same links.

## The name

A link home at `text-body-small` weight 600 with tight tracking, `min-h-11`. On the home surface it carries `aria-current="page"`.

## Primary navigation

Work, Report, About, at `text-label`, muted at rest and ink on hover or when current. Each link is `min-h-11 px-2` so its target is at least 44 by 44 without a taller bar. The current surface is marked with `aria-current="page"`, not with colour alone.

## The invitation

`ContactPill` is the one filled element in the bar: `bg-ink text-paper`, `rounded-pill`, `min-h-11 px-4`, at the 12.5px label step in medium weight. It is a `mailto:` link. Its full form, and the one place a document may repeat it, are documented in [Actions](actions.md).

## The agent switch

A link to the agent surface that reads as a switch: a 28 by 16 track with a 12px knob that translates when the reader is on that surface. It is navigation, so it is a link with `aria-current="page"`, not a `role="switch"` control. It sits at `min-h-11` and keeps its own outline.

## The theme control

A 44 by 44 icon button at the far right, 18px glyph, `aria-pressed` reflecting the rendered theme, and a label that names the next theme rather than the current one. It reads its state from the theme provider after mount, so it never announces a theme the document is not showing. The theme itself is applied after hydration; see [Color and theme](../foundations/color-and-theme.md).

## The narrow-viewport disclosure

Below 768px the navigation collapses behind a `Menu` button. This is a disclosure, not a menu primitive: `aria-expanded` on the button, `aria-controls` pointing at the panel, and a list of links inside. Application-menu semantics would be wrong for site navigation.

Behaviour:

| Event | Result |
| --- | --- |
| Open | Focus moves to the first link in the panel |
| Escape | Panel closes, focus returns to the control |
| Choosing a link | Panel closes, navigation proceeds |
| Route change | Panel closes |
| Viewport widens past 768px | Panel closes |

The panel is `absolute` under the bar, full frame width, and animates 8px down with a fade over 180ms. Under a reduced-motion preference the transform is dropped and the panel lands in its end state with opacity only.

Without scripting the panel cannot open, which is a known gap recorded in [Accessibility](../foundations/accessibility.md).

## The skip link

The first focusable element in the document. Hidden until focused, then a filled pill at the top left. It targets `#main`, which is a `tabIndex={-1}` landmark so following the link moves focus into the content rather than only scrolling to it.

## The footer

The site name, links to all five surfaces, and the contact address. Every link is at least 44 by 44 with `px-2` inside the label. The footer surfaces the address in full rather than hiding it behind a second invitation.

## Print

The bar and the footer are hidden in print. A printed document carries its content and its figures, not its navigation.

## Measurements and tokens

| Element | Value | Utility |
| --- | --- | --- |
| Bar height | 64px | `h-16` |
| Gutter | 32px | `px-gutter` |
| Frame | 1040px | `max-w-frame` |
| Every control | 44px minimum | `min-h-11`, `min-w-11` |
| Invitation radius | 999px | `rounded-pill` |
| Menu button radius | 6px | `rounded-action` |
| Hairline | 1px | `border-line` |
| Focus ring | 2px at 3px offset | global `:focus-visible` |

## Do and don't

- Do keep the order. A surface that reorders the bar is a different site.
- Do keep one filled element in the bar.
- Don't add a second navigation control at desktop width.
- Don't give the ask switch a switch role; it navigates.
- Don't colour a nav link to show state. Use `aria-current` and ink.

## Accessibility

Landmarks: `header`, `nav` labelled Primary, `nav` labelled Footer, `main#main`, `footer`. The current surface is announced in all three places it appears. The focus indicator is 2px at a 3px offset and is drawn outside the filled invitation so it stays visible against its own fill. Every control meets 44 by 44.

## Source

- `web/components/shell/site-header.tsx` for the bar and order.
- `web/components/shell/menu.tsx` for the disclosure and its focus handling.
- `web/components/shell/ask-switch.tsx` for the switch as a link.
- `web/components/shell/contact-pill.tsx` for the invitation.
- `web/components/shell/skip-link.tsx` and `page-main.tsx` for the skip target.
- `web/components/shell/site-footer.tsx` for the footer.
- `web/components/theme/theme-toggle.tsx` for the theme control.
- `web/content/site.ts` for the routes and the address.
- `web/tests/e2e/shell.spec.ts` for order, current, targets, focus, the disclosure, and reduced motion.
