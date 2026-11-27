---
version: alpha
name: Van Sirisouk Portfolio
description: White paper, ink-blue type, pixel figures, and colour that only ever carries meaning.
colors:
  primary: "#131a2b"
  secondary: "#2b3a8f"
  neutral: "#ffffff"
  text: "#303645"
  muted: "#5b6272"
  surface: "#f4f4f1"
typography:
  display:
    fontFamily: Geist Pixel
    fontSize: 68px
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: 0
  figure:
    fontFamily: Geist Pixel
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: 0
  figure-inline:
    fontFamily: Geist Pixel
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: 0
  label:
    fontFamily: Instrument Sans
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.62
    letterSpacing: 1.1px
  lead:
    fontFamily: Instrument Sans
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.56
  body:
    fontFamily: Instrument Sans
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.62
  nav:
    fontFamily: Instrument Sans
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.62
    letterSpacing: "-0.15px"
  small:
    fontFamily: Instrument Sans
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.62
    letterSpacing: "-0.13px"
  micro:
    fontFamily: Instrument Sans
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  surface: 14px
  island: 10px
  control: 8px
  chip: 7px
  secondary: 6px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  row: 46px
  section: 124px
components:
  nav-island:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.island}"
    height: 60px
    padding: "0 7px 0 22px"
  nav-link:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    height: 44px
    padding: "0 14px"
    typography: "{typography.nav}"
  nav-link-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    height: 44px
    padding: "0 14px"
    typography: "{typography.nav}"
  button-outline:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    height: 44px
    padding: "0 20px"
    typography: "{typography.nav}"
  button-filled:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.control}"
    height: 44px
    padding: "0 20px"
    typography: "{typography.nav}"
  social-cell:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.control}"
    size: 44px
  badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.chip}"
    height: 32px
    padding: "0 13px 0 10px"
    typography: "{typography.small}"
  metric-figure:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.figure}"
  metric-inline:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.figure-inline}"
  name-mark:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.display}"
  footer-meta:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.micro}"
---

## Overview

A one-page portfolio for a software engineer, built as a document rather than an app. White paper, ink-blue
type, and measured numbers set in a pixel face. There is no sidebar, no card grid, and no illustration except a
pixel-art footer scene and a 16x16 mark in the nav.

Three constraints decide almost every question here. Type does the work, so the page runs on one interface face
plus one display face. Colour carries meaning, so an accent is never decorative. And the page is judged at
1440 down to 320 with no horizontal overflow in either theme, which is why spacing is measured rather than
eyeballed.

## Colors

Light theme is paper `#ffffff` and ink `#131a2b`. The page never uses a tinted background behind content; the
only off-page surface is `--panel` `#f4f4f1`, and it appears once, on the hero badge, so the stamp reads as an
object rather than another line of text.

- **Primary (`#131a2b`):** body text at the top of the hierarchy, and the fill of the one filled control.
- **Secondary (`#2b3a8f`):** indigo. It marks measured values (`832,000`, `28.1%`), the initials in the
  name, and the focus ring. Nothing else may use it.
- **Neutral (`#ffffff`):** the page and the ground under every control.
- **Text (`#303645`):** running copy and nav links, one step off the ink so a heading always outranks it.
- **Muted (`#5b6272`):** footer meta and secondary labels only.
- **Surface (`#f4f4f1`):** the badge fill and the active nav row.

Two roles live in prose rather than as tokens, because no component addresses them yet.

Clay `#95522c` is reserved for assumptions, the counterpart to indigo's measured values. Nothing on the page
currently makes an assumption explicit, so the value is documented and unused; if a claim ever needs marking as
an estimate, it takes this colour and not a new one.

Hairlines are `#e6e6e2` for resting rules and `#d3d3cc` for the stronger edge under a block, on a control border,
and on the island. Rules close a block, they never divide one section from the next.

Dark theme is a separate ramp, not an inversion: paper `#101114`, panel `#202329`, card `#1f2126`, ink
`#f1f2f5`, body `#c3c9d6`, muted `#99a1b2`, data `#a9b3ff`. It is deliberately near neutral, so the dark page
reads charcoal and not blue-black, with the cool cast carried by the text instead of the ground.

## Typography

Two faces are in use.

Instrument Sans carries the interface: nav, buttons, labels, body copy, footer. It is set at 15px/500 for
controls and 17px/400 for reading, with a single negative tracking value (`-0.01em`) on the interface sizes and
none on body.

Geist Pixel carries the name, every measured figure, and inline `code`. It has one weight and one optical size,
so three rules bind it: no negative tracking, line height between 1.06 and 1.08, and never below 18px. Under
about 20px the face stops drawing its grid and resolves to a plain geometric, so a figure set at 16px is no
longer pixel type at all. Inline metrics sit at 22px to clear that floor without shouting over 17px body copy.

The two faces are the whole type system. There is no third typeface in the build.

## Layout

The content column is 1080px with a 32px gutter, 24px on phones. Type sizes step down at 1080, 860 and 520,
alongside the layout.

Sections are separated by air, not rules: 124px between blocks on desktop and 92px on mobile, against 46px
between rows inside a block. The ratio is what does the grouping. Each block closes itself with a rule, so the
reading order is content, closing rule, air, next label, label rule.

Anything interactive holds a 44px target. That number is the floor for a nav row, a button, a social cell and
the skip link, and it survives at 320.

## Elevation & Depth

One surface is elevated: the nav island. It floats over the page with a translucent fill (paper at 28.5%), an
8px backdrop blur, a 1px hairline, and a two-layer shadow that grows when the page scrolls. Everything else sits
flat on the paper.

Depth inside the footer scene and inside the swords mark comes from silhouette and tone, never from a drop
shadow on a shape. An outline applied per step was tried on the hills and read as horizontal stripes.

## Shapes

Rounded rectangles, never pills. Radius is a three-step scale plus the surface:

| token | value | where |
| --- | --- | --- |
| control | 8px | buttons, icon buttons, social cells, active nav row |
| chip | 7px | the hero badge |
| secondary | 6px | the theme switch track, menu rows |
| island | 10px | the nav island and the phone menu panel |
| surface | 14px | reserved for large panels |

8px on a 44px control keeps two parallel sides, which is what separates a rounded rectangle from a capsule.
12px was tried and still read as a soft pill at that height; 6px went square.

## Components

`nav-island` is the only fixed element. 60px tall on desktop, 56px on phones, hairline edge, and a blur that the
background can be seen through but not read through.

`nav-link` and `nav-link-active` share geometry. The active row takes the same 8px radius and a surface fill
rather than a colour change, so navigation state never competes with the indigo that means a measurement.

`button-filled` and `button-outline` are the two control weights. Both are 44px with 20px side padding and the
same radius. Hover lifts the fill instead of darkening it, and in dark mode it moves down rather than up,
because lifting a light fill on dark paper has nowhere to go.

`social-cell` is a 44px square: a 24px icon with 10px either side. The group is sized to the content and never
stretched, on desktop or on a phone.

`badge` is the hero stamp. It is the one place a second surface colour appears, and it stays one line down to
360 before wrapping to two centred lines.

`metric-figure` and `metric-inline` are the numbers. Both are pixel type in the indigo; the size difference is
the only thing separating a headline figure from a per-role figure.

`name-mark` is the highlighted part of the name: `Van`, the `S`, and the closing full stop, in indigo, in the nav
and in the hero. It is the one place the accent marks the person rather than a datum, and the name still reads
with the colour removed.

## Do's and Don'ts

- Don't round a control to a pill. If a corner looks too soft at 44px, the answer is a smaller radius, not half
  the height.
- Don't use indigo for decoration. If it is not a measured value, the initials, or the focus ring, it is the
  wrong colour.
- Don't set pixel type below 18px, and never with negative tracking. The face has one optical size; below the
  floor it stops being pixel type.
- Don't add a third typeface. Two are in use.
- Don't put a shadow on content. The island is the only elevated thing on the page.
- Don't use a rule to separate two sections. Rules close blocks; air separates them.
- Don't shrink a control below a 44px target to fit a narrow screen. Stack or wrap instead.
