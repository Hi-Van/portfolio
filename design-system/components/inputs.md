---
title: Inputs
group: Components
status: current
reviewed: 2026-10-26
sources:
  - ask.html
  - assets/tui.css
  - assets/tui.js
  - report.html
  - DESIGN.md
---

# Inputs

The site has two input groups. `ask.html` ends in a composer: a 999px pill for the question and a 44px circle that sends it. `report.html` puts two range sliders and a reset in the panel under Figure 5. Neither group validates anything, and these are the only places on the site where a visitor types text or moves a number.

## Anatomy

### Chat composer

```html
<div class="agent__composer">
  <form class="composer" id="tui-form">
    <label class="sr-only" for="tui-input">Ask a question</label>
    <input class="composer__input" id="tui-input" name="q" type="text"
           placeholder="ask a question..." autocomplete="off" spellcheck="false">
    <button class="composer__send" type="submit" aria-label="Send message">
      <span aria-hidden="true">→</span>
    </button>
  </form>
  <p class="agent__hint">Enter to send · ↑↓ history · esc to leave</p>
</div>
```

- `.agent__composer` is the wrapper. It carries `padding:6px 0 10px` and nothing else.
- `form.composer` is a flex row, `align-items:center`, `gap:12px`, with `border:0`, `background:none`, `padding:0`. Because it is a `form`, Enter submits without a key handler on the field.
- `label.sr-only` is the only label. It is clipped to 1px and never visible, so the placeholder is not the label.
- `input.composer__input` carries the whole visible shape: height, radius, padding, type, and the 1px inset ring. It has no border, no fill, and no outline.
- `button.composer__send` is a bare 44px box holding one span. The span draws the circle: 44px, `border-radius:50%`, a 1px `--tui-line` border, `--tui-accent` fill, and the arrow in `--tui-bg`.
- `.agent__hint` sits under the form and is hidden at 760px and below.

### Range controls

```html
<div class="controls">
  <div class="control">
    <label for="f5-share">Share of traffic done by a person
      <output id="f5-share-out" for="f5-share">25%</output></label>
    <input id="f5-share" type="range" min="5" max="100" step="5" value="25"
           aria-describedby="fig5-cap">
  </div>
  <div class="control">
    <label for="f5-mins">Baseline session
      <output id="f5-mins-out" for="f5-mins">6 min</output></label>
    <input id="f5-mins" type="range" min="2" max="12" step="1" value="6"
           aria-describedby="fig5-cap">
  </div>
  <button class="reset" id="f5-reset" type="button">Reset assumptions</button>
</div>
<p class="sr-only" role="status" aria-live="polite" id="f5-status"></p>
```

- `.controls` is the grid, `1fr 1fr auto`, gap 22px, with a 1px `--line-2` top border, 16px padding top, and 16px margin top. It sits inside `.figure__panel`.
- `.control` is one column: a label and the range input.
- The label is a flex row with `justify-content:space-between`, so the name sits left and the `output` sits right. The output is weight 600 in `--assume` with `tabular-nums`, so the number does not shift while dragging.
- `input[type=range]` is 100% wide, 20px high, `appearance:none`, transparent, and `cursor:pointer`.
- `.reset` is a bare button in the third column, `justify-self:start`, marked only by a bottom border.
- The sr-only `role="status"` line after the grid is where the result is announced. The visible number above the chart is not a live region.

## Variants

| Variant | Selector | Difference |
| --- | --- | --- |
| Chat composer | `.composer` | The only text input on the site. One size, no compact or large form. |
| Share slider | `#f5-share` | 5 to 100, step 5, default 25, output `25%` |
| Session slider | `#f5-mins` | 2 to 12, step 1, default 6, output `6 min` |
| Reset | `.reset` | One label, `Reset assumptions`, no icon |

The two sliders share one style. Only the range, step, copy, and unit differ. The composer has no size variant: at 760px and below it only changes side padding from 20 to 18 and type from 16.5 to 16.

## States

| State | Chat input | Send circle | Range and reset |
| --- | --- | --- | --- |
| Default | No fill, 1px inset `--tui-line` ring, caret `--tui-accent` | `--tui-accent` fill, 1px `--tui-line` border, `--tui-bg` arrow | 2px `--line-2` track, 16px `--surface` thumb with a 1px `--line-2` border |
| Placeholder | `ask a question...` in `--tui-muted` | No change | Not applicable |
| Focus | Ring becomes 1px inset `--tui-accent`, `outline:none` | Inner 2px `--tui-bg` outline at `-3` on the span, button outline none | `outline:2px solid var(--data)` at `offset:6px`, 2px radius |
| Filled | Text in `--tui-fg` at 16.5/1.62. No other change. | No change, still enabled | Thumb moves, output and status line update |
| Hover | None. There is no `:hover` rule on the field. | `opacity:.88` | Thumb border turns `--data` |
| Active | None | `opacity:.76` | Thumb `transform:scale(1.08)` |
| Dark | Ring `rgba(238,241,247,.16)`, accent `#a9b3ff`, text `#eef1f7` | Fill `#a9b3ff`, arrow `#1a1f2b` | Track `#343c4c`, thumb `#1a1f2b` on `--panel` `#131824` |
| Mobile | Height stays 44, padding 18, type 16 | Same 44 | One column, gap 18, reset margin 4 |

There is no disabled, error, success, loading, read-only, or character count state. The input has no `maxlength`, no `required`, and no `aria-invalid`. The send button is never disabled: an empty submit is dropped inside `ask()`, and a submit while a reply is pending (620ms) is also dropped, leaving the typed text in the field. The site has no select, checkbox, radio, or generic text field. The composer is the only text input, and it exists on `ask.html` only.

## Measurements and tokens

| Property | Value |
| --- | --- |
| Form gap | `gap:12px` |
| Form width | `max-width:680px` from 761 up, otherwise the full width of `.agent__in` |
| Input height | `44px`, unchanged on mobile |
| Input radius and padding | `999px`, `0 20px`, `0 18px` at 760 and below |
| Input type | Literata `16.5px` at line height `1.62` (26.73px), `16px` on mobile |
| Input shape | `border:0`, `background:none`, `box-shadow:inset 0 0 0 1px var(--tui-line)`, transition on box shadow `.2s var(--ease)` |
| Input focus | `inset 0 0 0 1px var(--tui-accent)` with `outline:none` |
| Placeholder and caret | Placeholder `var(--tui-muted)`, caret `var(--tui-accent)` |
| Send box and circle | `44px` by `44px`, `flex:none`, `border:0`, `background:none`; span `border-radius:50%`, `1px solid var(--tui-line)`, `var(--tui-accent)` |
| Arrow | `var(--tui-bg)`, Instrument Sans `16px`, `line-height:1` |
| Hint | `10.5px`, `var(--tui-muted)`, `margin:8px 0 0`, hidden at 760 and below |
| Composer wrapper | `padding:6px 0 10px`; mobile `6px 0 calc(8px + env(safe-area-inset-bottom))` |
| Controls grid | `grid-template-columns:1fr 1fr auto`, `gap:22px`, `align-items:start` |
| Controls frame | `border-top:1px solid var(--line-2)`, `padding-top:16px`, `margin-top:16px` |
| Label | `12.5px`, `var(--muted)`, flex, `gap:12px`, `margin-bottom:8px` |
| Output | weight `600`, `var(--assume)`, `font-variant-numeric:tabular-nums` |
| Range box | `width:100%`, `height:20px`, `appearance:none`, `margin:0`, `cursor:pointer` |
| Track | `height:2px`, `background:var(--line-2)`, `border-radius:2px` |
| Thumb | `16px` circle, `var(--surface)`, `1px solid var(--line-2)`, `margin-top:-7px`, `box-shadow:0 1px 3px rgba(0,0,0,.12)`, transition on border color and transform `.2s` |
| Range focus | `outline:2px solid var(--data)`, `outline-offset:6px`, `border-radius:2px` |
| Firefox thumb | `14px`, `#fff`, `1px solid var(--line-2)`, no shadow, no hover or scale rule |
| Reset | `12px`, `var(--muted)`, `border-bottom:1px solid var(--line-2)`, `padding:0 0 2px`, `margin-top:22px`, `4px` at 760 and below |

Tokens used here: `--tui-bg`, `--tui-fg`, `--tui-muted`, `--tui-line`, `--tui-accent` for the chat, and `--surface`, `--panel`, `--line-2`, `--data`, `--assume`, `--muted` for the report. Values live in `assets/site.css` and are duplicated inside `report.html`.

### Divergences

- `DESIGN.md` says the range thumb carries a `1px shadow`. The CSS is `box-shadow:0 1px 3px rgba(0,0,0,.12)`, a 1px vertical offset with a 3px blur.
- `DESIGN.md` lists 13px as the caption step and names only the chat page as an exception to the type scale. The range label is 12.5px and the reset is 12px, both below that step, on the report.
- `preview/chat-intro.png` shows the composer spanning the full 812px content width. The CSS caps `.composer` at 680px from 761 up, and Chromium reports 680 at a 1440 viewport. The screenshot predates or misses that rule.

## Usage

The composer is the only way to ask the site anything, and the page moves focus into it 80ms after load, so the accent ring is usually the first thing on screen. Type a question, press Enter, and `ask()` trims the value, ignores empties, clears the field, drops the example exchange from the log, and appends the question plus a typing row. A reply replaces the typing row after 620ms.

The hint lists the three keyboard moves. It is desktop only, at 10.5px under the field.

The sliders are the model in the report: share of traffic done by a person (5 to 100 in steps of 5) and baseline session length (2 to 12 minutes). Both feed the same `draw()` call on `input`, which updates the visible number, the chart, the SVG `aria-label`, and the sr-only status line. `Reset assumptions` writes 25 and 6 back and redraws.

## Do and don't

- Do keep the placeholder lowercase with three dots, `ask a question...`. It is a prompt, not a label.
- Do keep the send as a circle. The only filled pill on a page is Contact, and the send is a control, not an invitation.
- Do let the field reach 44px and leave it there. The height does not change at any breakpoint.
- Do state the assumption in the slider label. `Share of traffic done by a person` and `Baseline session` say what moves the number.
- Do reset both values, not one. The button has one job and it covers the pair.
- Don't add a second filled control to the composer.
- Don't disable the send when the field is empty. No disabled style exists, and empty submits are already ignored.
- Don't add a character count, `maxlength`, or validation copy. There is nowhere in the type scale for it and no error state to show.
- Don't put a visible label above the chat field. The pill is the shape; the sr-only label carries the name.
- Don't reuse `.composer` for a search field. It is tied to the chat page's tokens and the 680px cap.

## Accessibility

Labels. The input's accessible name comes from the clipped `label.sr-only` bound with `for="tui-input"`, which reads `Ask a question`. The send button has `aria-label="Send message"` and its arrow span is `aria-hidden`. In the report the label wraps the input's name and its `output`, so the accessible name includes the live value, for example `Share of traffic done by a person 25%`.

Descriptions. Both sliders carry `aria-describedby="fig5-cap"`, which points at the figure caption that names them as assumptions. The composer's hint is not wired to the field with `aria-describedby`; it follows the form in reading order and is `display:none` at 760 and below, so the keyboard help is lost on mobile.

Live status. `.agent__log` is `role="log"` with `aria-live="polite"` and `aria-relevant="additions"`, so sent questions, the typing row, and answers are announced as they are appended. The report's `#f5-status` is `role="status"` and `aria-live="polite"`, rewritten on every `input` event and on reset as `782,925 hours returned per year at these assumptions`. Every arrow key step rewrites it, so a held key queues a run of announcements.

Keyboard.

| Key | Where | Result |
| --- | --- | --- |
| Enter | Chat input | Submits the form; `ask()` trims and drops an empty value |
| ArrowUp | Chat input | Previous question from the in-memory history, clamped at the first |
| ArrowDown | Chat input | Next question, empty string once past the last |
| Escape | Anywhere on the chat page | Navigates to the page named in `?from=`, default `index.html` |
| Arrows, Home, End, PageUp, PageDown | Range | Native slider movement, no custom handler |
| Enter or Space | Reset | Restores 25 and 6 |

Focus. `.agent :focus-visible` gives a 2px `--tui-accent` outline at offset 2. The input overrides that with its inset ring and `outline:none`. The send button drops its outline and the span draws a 2px `--tui-bg` ring inside the circle at `-3`. The range takes a 2px `--data` outline at offset 6 around the 20px control.

Targets. The input and the send are 44px high. The range box is 20px high with a 16px thumb, and the reset renders about 18px high with a 104px width, so both are under the 44px target.

Contrast. Placeholder `#5f6673` on `#f6f6f3` is 5.34:1, and `#98a0b3` on `#1a1f2b` is 6.29:1. The range label matches at 5.34:1 on the light panel and 6.2:1 on the dark one. The clay output is 5.51:1 light and 7.75:1 dark. The arrow is 9.22:1 on the light accent and 8.3:1 in dark. The unfocused thumb is `#ffffff` with a `#d3d3cc` ring on a `#f6f6f3` panel, 1.08:1 against the panel, so its edge is drawn by the 1px shadow and by the `--data` border that appears on hover.

Forced colors. The field has `border:0`, so its only boundary is a box shadow. Box shadows are dropped in forced colors mode, which leaves the input without a visible edge there. The send and the range use outlines, which survive.

## Source

- `ask.html` lines 49 to 56: `.agent__composer`, `form.composer`, `label.sr-only`, `#tui-input`, `.composer__send`, `.agent__hint`.
- `assets/tui.css` lines 122 to 156: `.agent__composer`, `.composer`, `.composer__input` and its `:focus`, `:focus-visible` and `::placeholder`, `.composer__send` and its span, hover, active, and span focus ring; line 29 `.agent :focus-visible`; line 152 `.agent__hint`.
- `assets/tui.css` lines 154 to 175: the 680px cap at `min-width:761px`, and the 760px block with 18px padding, 16px type, and the mobile composer padding.
- `assets/tui.js` lines 279 to 327: `ask()`, the trim, the empty guard, the history push, the 620ms reply, the submit handler, ArrowUp and ArrowDown, and Escape.
- `assets/tui.js` lines 8 to 21 and 330: the `?from=` map and the 80ms autofocus.
- `report.html` lines 323 to 347: `.controls`, `.control` and its label and output, the range input, webkit track, thumb, hover, active, focus, moz track and thumb, and `.reset`; lines 381 to 400 stack the grid at 760; lines 410 to 411 hide `.controls` and `.reset` in print.
- `report.html` lines 628 to 639 and 730 to 827: the control markup, the `output` elements, the `#f5-status` live region, `draw()`, the `input` listeners, and the reset handler.

Related: [messaging](../components/messaging.md), [chat](../surfaces/chat.md), [report](../surfaces/report.md), [color and theme](../foundations/color-and-theme.md).
