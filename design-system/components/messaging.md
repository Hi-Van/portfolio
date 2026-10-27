---
title: Chat messages
group: Components
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/tui.css
  - assets/tui.js
  - assets/site.css
  - ask.html
---

# Chat messages

The transcript on `ask.html`. `tui.js` builds every row as DOM and appends it to `.agent__log`: a `.msg` article per speaker, a `.msg__system` divider, a `.msg__suggest` list, and the `.msg__typing` row. There is no model and no network call. Answers come from a fixed table of thirteen entries, each with a paragraph, a source list, and follow up questions. The page shell is in [chat](../surfaces/chat.md); the field below the log is in [inputs](./inputs.md).

## Anatomy

```html
<div class="agent__log" id="tui-log" role="log" aria-live="polite" aria-relevant="additions">
  <p class="msg__system">This is the beginning of #ask-van.</p>
  <article class="msg" data-who="agent">
    <div class="msg__body">
      <p class="msg__meta">
        <span class="msg__avatar" aria-hidden="true">V</span>
        <span class="msg__who">Site agent</span>
        <span class="msg__tag">bot</span>
        <span class="msg__time">8:41 PM</span>
      </p>
      <div class="msg__text"><p>The answer, as one paragraph.</p></div>
      <p class="msg__note">Not stated on the site.</p>
      <p class="msg__src">
        <span>source</span>
        <a href="work.html#walmart">work · walmart</a>
      </p>
      <div class="msg__suggest">
        <button type="button">what is the 22% number?</button>
      </div>
    </div>
  </article>
</div>
```

| Part | What it is |
| --- | --- |
| `.agent__log` | Scrolling transcript, flex column, `role="log"`, `aria-live="polite"`, `aria-relevant="additions"`. |
| `.msg` | `article` per speaker. Carries `data-who="agent"` or `data-who="you"`; the attribute only drives avatar styling. |
| `.msg__body` | Wrapper built by `message()`. No CSS rule targets it, so it adds no layout. |
| `.msg__meta` | Flex row, wraps: avatar, name, tag, time. |
| `.msg__avatar` | 26px square, 4px radius, 1px hairline. Serif `V` for the agent, sans `Y` for the reader. `aria-hidden="true"`. |
| `.msg__who` | "Site agent" or "You", 13px sans, weight 600. |
| `.msg__tag` | `bot`. Agent rows only. 9.5px uppercase, hairline box. |
| `.msg__time` | 10.5px muted. Not a `time` element, no `datetime`. |
| `.msg__text` | Literata body at `--chat-size`, 1.62 leading. Holds one or more `p`, plus `.msg__note`. |
| `.msg__note` | "Not stated on the site." 10px uppercase clay, inside the text block. |
| `.msg__src` | Source line: `source` label then links, separated by generated commas. |
| `.msg__suggest` | Follow up questions, one full width button each. |
| `.msg__system` | Centred 10.5px label with a rule either side. |
| `.msg__typing` | "searching this site" plus three 4px accent dots. |

Order inside the article is fixed: meta, text, note, sources, suggestions. The note sits inside `.msg__text`, so it inherits the reading column and the paragraph rhythm.

The log is the only scroller. It has `overflow-y:auto`, a thin 8px rail tinted with `--tui-line`, and `scroll()` sets `scrollTop = log.scrollHeight` after each question and answer, so the newest row is in view. The first child carries `margin-top:auto`, which pins a short transcript to the bottom of the log and leaves the space above it empty; that is why the intro sits low on a new page. No scroll-to-latest control, overflow fade, or scroll anchoring exists.

## Variants

The author is the only structural variant. Everything else is an optional block on the agent row.

| Variant | Markup | Look |
| --- | --- | --- |
| Agent answer | `data-who="agent"`, `V`, name "Site agent", `bot` tag | Serif V at 16px in `--tui-accent`; name in `--tui-fg` |
| User question | `data-who="you"`, `Y`, name "You", no tag | Sans Y at 13px weight 600 in `--tui-muted` |
| Cited answer | `.msg__src` appended | Muted 10.5px line, accent links with a 1px hairline underline |
| Unstated answer | `.msg__note` inside the text | Clay uppercase line after the paragraph |
| Follow ups | `.msg__suggest` appended | Hairline top rule, one bordered button per question |
| Typing | `.msg__typing` replaces the text | Label plus three dots, no sources |
| System line | `.msg__system` | Muted label, rule left and right |

Time labels are literal strings from the call site, not formatted dates. `intro()` passes `'now'` for the opening agent message and `'example'` for both example rows, so the meta line reads `Site agent bot now` and `You example`. A real exchange calls `now()`, which returns `8:41 PM` style output with no leading zero on the hour and no date. `.msg--example` is a marker class with no CSS rule, so example rows look like real rows and are removed on use rather than dimmed.

## States

| State | What the reader sees | Implementation |
| --- | --- | --- |
| Agent answer | Meta, paragraph, source line, suggestions | Appended after the 620ms timeout |
| User question | Meta, one paragraph, no tag, no sources | Appended immediately on submit |
| Example | Agent and user rows tagged `example`, removed on first question | `.msg--example` on divider, question, answer |
| Live | New rows announced, not the whole log | `aria-live="polite"` with `aria-relevant="additions"` |
| Refusal | "That is not on the site..." plus note and two suggestions | `FALLBACK` entry, `src: []`, `note: true` |
| Sources present | `source` label and 1 to 3 links | `sourceLine()` returns a `p.msg__src` |
| No sources | No source line at all, not an empty one | `sourceLine()` returns `null` for an empty list |
| Suggestions | One or two questions, full width, arrow at the left | `.msg__suggest button` |
| Typing | Agent row whose text is "searching this site" and three dots | `typingMessage()`, removed before the answer lands |
| System line | Label between two rules | `.msg__system` with `::before` and `::after` |
| Dark | Same layout, lavender accent, warm clay note | `--tui-*` swap in `site.css` |
| Mobile | Tighter rows, 24px avatar, 16px text, hint hidden | `@media (max-width:760px)` |
| Reduced motion | Dots static at 60% opacity, transitions cut | `@media (prefers-reduced-motion:reduce)` |

Empty, loading, error, retry, streaming, copy, and scroll to latest do not exist. The send control is never disabled; `ask()` returns early while `busy` is true, so a second Enter during the 620ms does nothing and says nothing.

## Measurements and tokens

| Element | Desktop | 760 and below |
| --- | --- | --- |
| Log padding | `12px 0 14px` | `8px 0 10px` |
| Log first child | `margin-top:auto` pushes content to the bottom | same |
| Row padding | `10px 0`, radius 4 | `8px 0` |
| Avatar | 26px, radius 4, serif 16px | 24px, 10.5px |
| Meta gap | 8px, margin `0 0 5px` | same |
| Name | 13px / 600, tracking -.005em | same |
| Tag | 9.5px, tracking .1em, padding `1px 5px` | same |
| Time | 10.5px, tracking .01em | same |
| Text | 16.5px / 1.62 | 16px / 1.62 |
| Paragraph | `0 0 .55em`, last child 0 | same |
| Note | 10px, tracking .1em, margin `8px 0 0` | same |
| Source line | 10.5px, gap `4px 12px`, margin `10px 0 0` | same |
| Source label | 9.5px, tracking .14em, uppercase | same |
| Suggest block | margin `14px 0 2px`, 1px top rule | same |
| Suggest button | `min-height:44px`, padding `12px 10px`, 13.5px / 1.45 | same |
| Suggest arrow | `::before` "→", 12px, accent | same |
| System line | 10.5px, tracking .02em, margin `14px 0 6px` | same |
| Typing | 12px, dots 4px, gap 5px, `agent-typing` 1.2s with .15s stagger | same |

`--chat-size` and `--chat-leading` are set on `.agent` and shared by `.msg__text` and `.composer__input`, which is why the answer text and the field match at 16.5px and drop to 16px together.

| Token | Light | Dark |
| --- | --- | --- |
| `--tui-bg` | `#f6f6f3` | `#1a1f2b` |
| `--tui-fg` | `#131a2b` | `#eef1f7` |
| `--tui-muted` | `#5f6673` | `#98a0b3` |
| `--tui-line` | `#dedcd5` | `rgba(238,241,247,.16)` |
| `--tui-accent` | `#2b3a8f` | `#a9b3ff` |
| `--tui-hover` | `rgba(19,26,43,.045)` | `rgba(238,241,247,.07)` |
| `--tui-note` | `#95522c` | `#d8a06e` |

The note is the only clay in the log. Accent appears on the avatar letter, the suggestion arrow, the typing dots, and the source links. Tags and times stay muted so the paragraph leads.

## Usage

The log opens with a system line, an agent introduction, an `Example exchange` divider, an example question, and its cited answer. The first real question runs `log.querySelectorAll('.msg--example')` and removes all three example rows before appending the new question and typing row. The introduction survives.

Answers are one paragraph. `entry.a` is written with `textContent`, so the text cannot contain markup, and no answer in the table contains a link. The `.msg__text a` rule exists and looks right, but the generator never produces one. Links belong in `.msg__src`, where every target is a page or an anchor on this site and opens in the same tab.

The refusal is the only answer without sources. It keeps the note and two suggestions so the reader has somewhere to go: "what did he ship at walmart?" and "where is he based?". The availability answer also sets `note: true` while keeping its source, which is the pattern for an answer that is honest about a limit but still cited.

## Do and don't

- Do let a source link name its page and section, as `work · walmart` does. The link text is the only citation the reader gets.
- Do keep one paragraph per answer. The 860px container and 1.62 leading are set for that length.
- Don't add an avatar, tag, or time to a system line. It is a divider, not a speaker.
- Don't style a message as a bubble. `.msg` has a 4px radius and no background, border, or rule; spacing alone separates rows and the only rules are the source and suggestion top border.
- Don't put a second mechanism beside the source line for citations, such as numbered footnotes or a citation chip.
- Don't show an empty source line. Leave the block out when the list is empty.
- Don't add copy, regenerate, retry, or scroll to bottom controls. None of them exist, and the fixed answer table has nothing to regenerate.

## Accessibility

- The log is `role="log"` with `aria-live="polite"` and `aria-relevant="additions"`. Each appended row is announced; the whole transcript is not re-read. Removal is not announced, so the typing row disappears silently when the answer arrives.
- There is no `aria-busy` on the log and no status message beyond the typing row, whose text "searching this site" is the only cue that work is happening.
- Reading order follows the visual order: name and time, then the paragraph, then the note, then sources, then follow ups. No CSS reorders anything in the log.
- The avatar is `aria-hidden`. Identity comes from the text name, "Site agent" or "You", so the `V` and `Y` are never read.
- Source links carry the page and section in their text, so they make sense out of context. The commas between them are `::after` content, so they are decoration rather than part of a link name.
- Follow ups are `<button type="button">` at 44px minimum height, not links or divs. Clicking one runs `ask()` and then calls `input.focus()`, so focus returns to the field.
- Focus stays in the composer after a typed answer: submit does not move it and nothing steals it. The page focuses the input 80ms after load, which is the only automatic focus.
- Focus rings come from `.agent :focus-visible`, 2px `--tui-accent` at offset 2. The input and the send circle opt out of that outline and draw their own inset ring so the ring sits inside the pill and circle.
- The heading for the page is `.sr-only` inside `main`, and the skip link targets `#main`, so a keyboard reader lands on the transcript region before the field.
- Ratios hold in both themes. Muted is 5.34:1 on the light background and 6.29:1 on the dark one, accent is 9.22:1 and 8.3:1, and the clay note is 5.51:1 and 7.2:1, so the 9.5px and 10px labels clear 4.5:1.

## Source

- `assets/tui.css` lines 53 to 120: `.agent__log`, `.msg`, avatar, meta, who, tag, time, text, note, source line, suggestions, system line, typing, keyframes.
- `assets/tui.css` lines 154 to 180: 760 breakpoint, 380 header trim, reduced motion.
- `assets/tui.js` lines 149 to 233: `sourceLine()`, `suggestions()`, `message()`, `extras()`, `answerMessage()`, `typingMessage()`.
- `assets/tui.js` lines 235 to 260: `intro()` and the example rows with `msg--example`.
- `assets/tui.js` lines 279 to 304: `ask()`, the example removal, history push, 620ms delay.
- `assets/tui.js` lines 105 to 110: the `FALLBACK` entry.
- `assets/site.css` lines 31 to 37, 74 to 80, 112 to 118: `--tui-*` in light, `[data-theme="dark"]`, and the system dark query.
- `ask.html` lines 40 to 58: `main.agent`, `#tui-log`, composer.
- `DESIGN.md` line 169 allows the chat page its 16.5px message size, 13.5px suggestions, and 10.5px metadata. Line 193 sets the 4px radius for badges and the 44px circle for send.
- Captures: `../../preview/chat-intro.png`, `chat-composer.png`, `chat-mobile.png`. Four older captures, `chat-answer.png`, `chat-typing.png`, `chat-dark.png`, and `chat-suggest-hover.png`, show a different composer labelled "Message #ask-van" with the arrow inside the field and a square send, which `tui.css` no longer builds; read their message rows only, not their field.
