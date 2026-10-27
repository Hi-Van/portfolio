---
version: alpha
name: Van Sirisouk
description: A measurement-first portfolio. White paper, ink-blue type, indigo for data, clay for assumptions, and one serif display voice over a serif reading face.
colors:
  primary: "#131A2B"
  secondary: "#2B3A8F"
  tertiary: "#95522C"
  neutral: "#FFFFFF"
  panel: "#F6F6F3"
  body: "#303645"
  muted: "#5F6673"
  badge: "#EEEEE8"
typography:
  display-home:
    fontFamily: Instrument Serif
    fontSize: 104px
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.02em"
  display-report:
    fontFamily: Instrument Serif
    fontSize: 94px
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  display-page:
    fontFamily: Instrument Serif
    fontSize: 60px
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  heading-2:
    fontFamily: Instrument Serif
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.012em"
  heading-3:
    fontFamily: Instrument Serif
    fontSize: 26px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.008em"
  serif-label:
    fontFamily: Instrument Serif
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: Literata
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.66
  body-small:
    fontFamily: Instrument Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: Instrument Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: Instrument Sans
    fontSize: 12.5px
    fontWeight: 400
    lineHeight: 1.66
    letterSpacing: "0.01em"
  caps-key:
    fontFamily: Instrument Sans
    fontSize: 10px
    fontWeight: 500
    lineHeight: 1.62
    letterSpacing: "0.1em"
  chart-label:
    fontFamily: Instrument Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1
  chart-value:
    fontFamily: Instrument Sans
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1
rounded:
  sm: 4px
  md: 6px
  lg: 10px
  xl: 12px
  pill: 999px
spacing:
  base: 4px
  gutter: 32px
  block: 48px
  section: 96px
components:
  contact-pill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 12px
  contact-pill-hover:
    backgroundColor: "#0B1120"
    textColor: "{colors.neutral}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 12px
  badge:
    backgroundColor: "{colors.badge}"
    textColor: "{colors.body}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 4px
  figure-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  body-copy:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.body}"
    typography: "{typography.body}"
  caption-text:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
  measured-number:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
  assumed-value:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label}"
---

## Overview

This is the site for one person, read first by a recruiter who gives it thirty seconds and second by anyone who stays for the report. The design has one job: make numbers legible as evidence rather than decoration.

The materials are white paper, an ink-blue text color, one indigo for measured data, and one clay for assumptions. Type is a display serif for statements, a reading serif for long copy, and a grotesque for interface and figures.

## Colors

White paper (`#FFFFFF`) carries the page. Surfaces separate with a light neutral panel (`#F6F6F3`) and hairlines (`#E6E6E2`, `#D3D3CC`), not with shadows.

Ink blue (`#131A2B`) is the text and the one action. It is a very dark navy, not a neutral black, so large type reads as ink rather than soot.

Two accents, each with a job:

- Indigo (`#2B3A8F`) means measurement. It colors result numbers, section numerals, chart marks, and the links that lead to data. Nothing decorative is indigo.
- Clay (`#95522C`) means assumption. It appears in five places only: the italic Abstract label, the inference in Figure 1, the Assumed row in the method table, the two model inputs, and the note on an answer the site cannot give. It is the only warm note in the system.

If a new element needs color, it has to earn one of those two meanings. There is no third accent, and badges, navigation, captions, and role metadata stay neutral.

Supporting tokens, not component colors: surface `#FFFFFF`, body `#303645`, muted `#5F6673`, hover `rgba(19,26,43,.04)`, selection `#E3E6F4`, badge fill `#EEEEE8` with border `#D8D8D0`, chart grid `#E2E2DC`, chart axis `#D3D3CC`, chart cell `#C9CBCF`, chart baseline `#B6B9BE`, band `#E3E4F0`, on-data `#FFFFFF`.

Dark mode is a second token set, not a filter. Ground `#0C1018`, panel `#131824`, surface `#1A1F2B`, line `#232A38`, ink `#EEF1F7`, body `#C2C8D4`, muted `#9299A8`. Indigo lifts to `#A9B3FF` and clay to `#D8A06E`. The Contact pill inverts to a light fill with dark type.

Contrast floors, measured in the built theme. Light: body 12.1:1, muted 5.8:1, indigo 10:1, clay 5.5:1 on the panel, ink 17.4:1. Dark: body 11.3:1, muted 6.7:1, indigo 9.6:1 on the ground, clay 7.7:1 on the panel, ink 16.8:1. Do not lighten the muted color below `#5F6673` on white.

## Typography

Instrument Serif is the display voice. It carries statements at 26px and above, and appears nowhere below a 20px floor, which is the one size recorded for a serif label. Literata is the reading face for body copy at 19px, and Instrument Sans is the interface face for labels, captions, navigation, and figure text.

The scale steps once per level: 104 display, 94 display, 60 display, 40 h2, 26 h3, 20 serif label, 19 reading, 16 interface, 13 caption, 12.5 label, 10 caps key. Nothing sits between two steps. There is one documented exception: the conversational surface runs at 16.5px for messages and the input, 13.5px for suggestions, and 10.5px for metadata. The reading size is one value, 19px, on every prose surface at every width.

Display tracking is one value, `-0.02em`, on every h1. Headings tighten in steps (`-0.012em` at h2, `-0.008em` at h3). Caps keys take `0.1em` because uppercase without tracking reads as a lump.

Body copy runs at 1.66 leading and about 80 characters per line. That is longer than a book measure; the compensation is the leading, and the reason is structural: figures and text share one 720px column, and the charts need the width more than the prose needs a shorter line. Do not shorten the column without resizing the chart type with it.

Small type has a floor. Caps keys are 10px at weight 500, captions 13px, byline 12px on mobile, chart labels 15 SVG units (about 11px rendered) with values at 17. Because a figure scales with its column, a narrow viewport steps chart text up to 26 units and values to 28 so the rendered size stays above 9px.

Do not justify text. Ragged right with `text-wrap: pretty` on paragraphs and `balance` on captions and the report deck.

## Layout

The site frame is 1040px with one 32px gutter at every width. The report body is a 720px reading column that also holds the figures. The report masthead is the one exception: it uses the 1040 frame and a title up to 960px, because display type can use width that text cannot.

On mobile everything collapses to one fluid column inside the same 32px gutter, and the report's cover title uses the 60px display step.

Vertical rhythm comes from section spacing, not from cards. Avoid wrapping sections in extra containers.

## Elevation & Depth

There are no drop shadows on the site. Depth is surface fill plus a hairline. The single exception is the range thumb in the model, which carries a 1px shadow to separate it from the track.

## Shapes

Shapes carry meaning. Rectangles are facts and surfaces: badges at 4px, panels and figure frames at 10px, the abstract at 12px, the secondary action as a 6px ink-outlined rectangle. The 999px pill is the Contact invitation, filled, and the chat input field, outlined; the chat send is a 44px filled circle. One filled pill per page.

## Components

`contact-pill` is the only filled pill on a page and the only high-emphasis invitation. It uses the 12.5px label step at medium weight, one size for the bar and for a document's closing block, and it inverts in dark mode. The chat send (`ask.html`) is a filled circle, but it is a control, not an invitation.

`badge` states a fact about the person, not a category. It stays neutral and never takes an accent color.

`figure-panel` holds a chart or diagram on the light neutral surface. Captions sit outside it, in the reading column, and state the figure's assumption.

`measured-number` is indigo. `assumed-value` is clay and appears only on model inputs.

The theme toggle is a 34px icon button at the far right of the top bar on every page. It follows the OS until the reader chooses, then stores the choice under `vs-theme`.

## Documentation

The component reference is `design-system/README.md`. It records the implemented values, the variants and states, and the places where this contract has fallen behind the CSS. Read the relevant doc before changing a component, and update it in the same pass.

## Do's and Don'ts

- Do keep one accent per meaning. Indigo for measured, clay for assumed.
- Do let white space separate sections before adding a border.
- Do state the assumption in every figure caption.
- Do keep display type at 400. The serif carries the voice without bold.
- Don't add a second filled pill. The chat field is outlined and the send is a circle; the Contact pill is the only filled pill on a page.
- Don't add a third accent, a gradient, or a shadow to create hierarchy.
- Don't color badges, navigation, captions, or role metadata.
- Don't put report furniture on the home page: no abstract, no numbered sections, no method table.
- Don't invent a number, a project, or a metric to fill a layout.
- Don't change the 720px measure without checking chart label size at the same time.
