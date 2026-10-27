---
title: Ask page
group: Surfaces
status: current
reviewed: 2026-10-26
sources:
  - ask.html
  - assets/tui.css
  - assets/tui.js
  - assets/site.css
  - DESIGN.md
---

# Ask page

`ask.html` is a room, not a section inside a page. The viewport below the top bar is filled with a channel header, a scrolling transcript, and a field, and the document itself does not scroll. It is the only surface that skips `.wrap` and `.page-head`, the only one with a live region, and the only one whose height is arithmetic on the bar. The bar and its Ask switch are in [navigation](../components/navigation.md), the rows in [messaging](../components/messaging.md), the field in [inputs](../components/inputs.md). This page covers the shell and how a reader gets in and out of it.

## Composition

```html
<main class="agent" id="main">
  <h1 class="sr-only">Ask the site agent</h1>
  <div class="agent__in">
    <header class="agent__head">
      <p class="agent__title"><span class="agent__hash" aria-hidden="true">#</span> ask-van</p>
      <span class="agent__rule" aria-hidden="true"></span>
      <p class="agent__topic">reads this site only</p>
    </header>
    <div class="agent__log" id="tui-log" role="log" aria-live="polite" aria-relevant="additions"></div>
    <div class="agent__composer">
      <form class="composer" id="tui-form">…</form>
      <p class="agent__hint">Enter to send · ↑↓ history · esc to leave</p>
    </div>
  </div>
</main>
```

`.agent` is the room: a height, a ground, a centring flex, hidden overflow, and a token pair. `height: calc(100dvh - 59px)`, `background: var(--tui-bg)`, `display: flex; justify-content: center`, `overflow: hidden`, and `--chat-size: 16.5px` with `--chat-leading: 1.62`. The 59 is the 58px bar plus its 1px border, so the room starts exactly where the bar ends and no page scroll is left over. At a 1280 by 577 viewport the room measures 518 high and the document scrollHeight equals innerHeight.

`overflow: hidden` is what makes it a room. The header and the composer are `flex: none` and never leave the screen, the log is `flex: 1` with `min-height: 0` and is the only scroller in the page. A reader who reaches the bottom of the transcript is still holding the field.

`.agent__in` is the column: `width: 100%`, `max-width: 860px`, `padding: 0 24px`, `display: flex`, `flex-direction: column`, `min-height: 0`. The min-height is load bearing, since a flex child cannot scroll unless it is allowed to be smaller than its content. The room is centred at 860 against the bar's 1040, so the transcript sits in a narrower column than the site nav above it. Nothing else is in the container: no page head, no lede, no footer, no second column.

The ground is `--tui-bg`, which is `--panel` `#f6f6f3` in light and `--surface` `#1a1f2b` in dark, while the bar above it stays paper. The room reads as a panel set into the page, with the header rule its only edge.

## Sections and components

### Channel header

`.agent__head` is 56px tall, flex, `gap: 12px`, with a 1px `--tui-line` bottom border. Three parts: the title, a 1px by 18px rule, and a topic line with a 5px accent dot from `::before`.

- `.agent__title` reads `# ask-van`. The hash is 15px weight 400 in `--tui-muted`, the name 15px weight 600 in `--tui-fg`.
- The `#` and `.agent__rule` are `aria-hidden`, so the header reads as `ask-van, reads this site only`. Under 380 the rule and the topic disappear and only `# ask-van` is left.
- The topic says `reads this site only`. It is the one sentence on the page that states the agent's limits before a reader asks anything, so it stays muted and small rather than becoming a banner.

The page heading is `h1.sr-only`, `Ask the site agent`. The visible header is a channel label, not a document title, and it carries no state: it does not change when answers arrive or when the theme flips.

### Transcript

The log is the whole body of the room. It opens with an intro, answers in one paragraph each, and closes at the composer. Surface level facts belong here; row anatomy and the answer table's shape are in [messaging](../components/messaging.md).

- `role="log"`, `aria-live="polite"`, `aria-relevant="additions"` sit in the markup, not in script.
- The first child carries `margin-top: auto`, so a short transcript sits at the bottom of the log and the empty space is above it. That is why the intro looks low on a fresh page rather than at the top edge.
- `scroll()` writes `log.scrollTop = log.scrollHeight` after the question and again after the answer, so the newest row is always in view. There is no scroll anchoring and no scroll to latest control.
- The scrollbar is 8px in WebKit with a `--tui-line` thumb on a transparent track, and `scrollbar-width: thin` with the same thumb colour in Firefox.

On load nothing scrolls the log. At 390 by 844 the intro is 685 tall in a 671 box and the log sits at scrollTop 0, so the last line of the example answer is under the fold until the reader scrolls or asks something.

### Composer and hint

`.agent__composer` is `flex: none`, `padding: 6px 0 10px`, about 85px tall with the hint. The form is capped at 680px from 761 up and runs the full 812 of the content column below that. The field and the send circle are both 44px. The hint is 10.5px muted under the form and is the only visible statement of the keyboard: `Enter to send · ↑↓ history · esc to leave`. All of it is covered in [inputs](../components/inputs.md).

The form is the only thing on the page that submits. There is no second action, no attach button, no microphone, no model picker.

### Intro, example exchange, and the first question

`intro()` runs once at the end of the script and appends four nodes to the empty log:

1. A system line, `This is the beginning of #ask-van.`
2. An agent introduction stamped `now`, with no sources and no follow ups: `Ask about the work, the numbers, or the roles. Every answer cites the page it came from, and it says so when the answer is not here.`
3. A second system line, `Example exchange`.
4. A question, `what did he ship at walmart?`, and its answer with two sources and two follow ups, both stamped `example`.

The last three nodes carry `.msg--example`. `ask()` runs `log.querySelectorAll('.msg--example')` and removes all of them before it appends the reader's question, so the demonstration leaves no trace and the introduction stays. The marker class has no CSS rule: example rows look exactly like live ones, which is the point, and the only cue that they are examples is the time column reading `example`.

The intro is also why the log is never empty. There is no empty state to design because the page cannot reach one with script running.

### Return to the page you came from

The switch in the bar is the exit and the keyboard exit matches it. `backHref()` reads `?from=` and maps four values: `index`, `work`, `report`, `about`. Anything else, including no parameter, returns `index.html`. The function runs at load to rewrite `#ask-back`, and again on every Escape keydown.

- `ask.html?from=work` gives the switch `href="work.html"` and the label `Ask the site: on. Activate to leave.`, measured in the browser.
- Escape is bound to `document`, so it leaves from the field, from the send button, and from the transcript. It does not clear the field first, because no handler exists for that.
- A typo in the query, such as `?from=contact`, sends the reader home rather than back to the page they left.
- Every site page links in with its own name. The switch is the only route back, since the page has no breadcrumb and no footer link.

### The topic index

`tui.js` holds thirteen entries and one fallback. `match()` lowercases the question, replaces every character outside word characters, spaces and `%` with a space, and tests each key as a substring. A key with a space scores 3, a single word scores 1, the highest total wins, ties go to the earlier entry, and a zero returns `FALLBACK`. The answers are written strings, not generated text, and no answer contains markup.

| Keys that match | What it answers | Cites |
| --- | --- | --- |
| `catalog cleanup`, `cleanup`, `duplicate` | The C# merge service, 30% faster queries, $1,200 a year in storage | work · catalog cleanup, report · cleaning |
| `walmart`, `catalog`, `pipeline`, `ship` | Three Walmart systems, 450,000 records a second, 390,000 submissions a day, the 22% cut | work · walmart, report · systems |
| `22%`, `hours`, `scale` | Where the 22% comes from and the 783,000 seller hours it implies | report · what it adds up to |
| `assumed`, `model` | 20 seconds a record, 25% human traffic, a six minute baseline | report · method, report · the model |
| `atlassian`, `current`, `role` | Growth engineering on cloud products, most detail under NDA | work · atlassian |
| `background`, `before`, `career` | UConn 2023, Edgewell, Synchrony, Meta, Walmart, Atlassian since June 2025 | work · before, work · meta, work · walmart |
| `stack`, `typescript`, `c#` | C# and .NET, TypeScript, SQL, and a static site with no framework | work · systems, about |
| `care`, `about`, `values` | Product data as the through line | about, report · the problem |
| `where`, `based`, `location` | New York, New York | about |
| `contact`, `email`, `reach` | Email or LinkedIn, both linked from about | about · contact |
| `available`, `hire` | The site does not say, with the note on and the source kept | about · contact |
| `site`, `built`, `fonts` | Four static pages, local fonts, no trackers, light and dark themes | about, report |
| `van`, `who is` | One line of identity and the current role | home, about |

`FALLBACK` is `That is not on the site. It only reads these four pages, so it will not guess.` It carries the clay note, no source line, and two follow ups. The count in the copy, four pages, is the site's own count and does not include the ask page.

## Responsive behavior

| Viewport | What changes |
| --- | --- |
| 761 and up | 860 container, 24px side padding, composer capped at 680, 16.5px chat type, hint visible |
| 760 and below | 14px side padding, 16px chat type, header gap 10, log padding 8 top and 10 bottom, rows 8, avatar 24, input padding 18, composer padding gains `env(safe-area-inset-bottom)`, hint `display: none` |
| 380 and below | header rule and topic hidden, leaving `# ask-van` |

The room keeps its 56px header, its flex split, and its 44px controls at every width. What changes is the gutter and the type step. The type step is one line of CSS, `--chat-size: 16px` in the 760 block, and it moves the message text and the field together because both read the property.

The mobile trim is not cosmetic. Fourteen pixels of gutter is tighter than the site's 20 because the transcript is the only thing on screen; hiding the hint removes a 10.5px line and its 8px margin from a bar that already shares the viewport with the transcript; the safe area padding keeps the field off an iPhone home indicator.

The bar is the one thing that can break the arithmetic. Under 760 `.top__in` becomes `height: auto; min-height: 58px`, and the open menu panel sits inside it. With the menu open at 390 by 844 the bar measured 296 tall, the room stayed 785, and the document grew to 1081, so the composer sat below the fold. The 59 in the height formula is fixed and does not follow a bar that grows.

Zoom behaves the way a fixed-height room behaves: text zoom shrinks how much transcript fits instead of growing the panel, and page zoom enlarges everything inside the same box. The room never reflows to a taller page. [Space, shape, and motion](../foundations/space-shape-motion.md) records this alongside the site's other reflow behavior.

## States

| State | What the reader sees |
| --- | --- |
| First load | Intro, example divider, example question and answer, all pinned to the bottom on a tall viewport, field focused 80ms after load |
| First question | Example rows removed, question appended, typing row below it, log pinned to the bottom |
| Waiting | `searching this site` with three accent dots for 620ms. A second submit during that window is dropped silently, and the typed text stays in the field |
| Answer | One paragraph, a source line with one to three links, up to two follow ups, log scrolled to the newest row |
| Refusal | The fallback paragraph, the clay note, no source line, two follow ups |
| Suggestion hover or focus | Row fill `--tui-hover`, text to ink, arrow already accent |
| Dark | Same layout and type, swapped `--tui-*` values |
| Mobile | 16px type, no hint, 14px gutter |
| Reduced motion | Transitions at .001ms, typing dots static at 60% opacity |
| Focus | 2px `--tui-accent` at 2px offset, inset rings on the field and the send circle |

Empty, loading beyond the typing row, error, retry, streaming, stop, copy, scroll to latest, and disabled send are not implemented. `ask()` returns early on an empty or whitespace value and on a second call while `busy`, so the send button is always enabled and sometimes does nothing. The log has no `aria-busy` and no status element; the typing row is the only progress signal. There is no cap on transcript length and no virtualization, so a long session keeps appending rows to the same scroller.

The time labels are literal strings, not formatted dates: `now` and `example` come from the intro call site, and real rows use `now()`, which returns `8:41 PM` with no date and no leading zero.

### Dark mode

Dark is a token swap and nothing else. `site.css` redeclares the seven `--tui-*` values under `[data-theme="dark"]` and again in the OS query, and `tui.css` declares no color of its own. The room takes `#1a1f2b`, text `#eef1f7`, rules `rgba(238,241,247,.16)`, accent `#a9b3ff`, hover `rgba(238,241,247,.07)`, note `#d8a06e`.

Two details follow from the swap. The send arrow is drawn in `--tui-bg`, so it is `#f6f6f3` on the light accent and `#1a1f2b` on the lavender one, and it stays legible both ways. The header rule, the composer ring, and the source underlines all take `--tui-line`, which is a lighter grey in light and a translucent white in dark, so the room's structure keeps the same weight in both. The full table is in [color and theme](../foundations/color-and-theme.md).

## Do and don't

- Do let the room fill the viewport and keep the header and composer out of the scroll. That is the whole idea of the page.
- Do keep the visible header as a channel label and the h1 clipped. There is no display heading on this page and no hero.
- Do keep the example exchange in the intro. It shows the shape of an answer, with sources and follow ups, without spending a word on instructions.
- Do remove the example on the first real question. A demonstration that stays becomes clutter beside a real answer.
- Do name the page and section in every source link, since that text is the only citation a reader gets.
- Do change the 59 in the height formula if the bar height ever changes, and check the mobile menu case while you are there.
- Don't add a welcome card, an empty illustration, or a suggested question grid outside the intro.
- Don't put a page head, lede, footer, or closing contact block inside `.agent`. The room ends at the composer.
- Don't add a second scroller, a fixed composer shadow, or a scroll to latest pill. The bar, the heading, and the field hold still already.
- Don't add a streaming or thinking state beyond the typing row. The answers are a fixed table and a model would only pretend.
- Don't style a row as a bubble or give the log a card edge. The ground is the surface and the rules do the separating.
- Don't put a headline number or a badge in the header. It is a channel label, and the accent there is one 5px dot.

## Accessibility

Landmarks and headings. The bar is `header.top`, the navigation is labelled `Site`, the room is `main#main`, and the only heading is the clipped `h1`, so a screen reader lands in a transcript region named by that heading. The inner `header.agent__head` is a header inside main, so it adds no banner landmark. There is no footer landmark on this page.

The log is a live region. `role="log"` with `aria-live="polite"` and `aria-relevant="additions"` announces each appended row, including the reader's own question. Removal is silent, so the typing row disappears and the example exchange vanishes without an announcement. There is no `aria-atomic`, so a new row is announced rather than the whole log.

Focus. The page calls `input.focus()` 80ms after the script runs, which is the only automatic focus on the site and the reason the accent ring is the first thing on screen. Focus never moves when an answer arrives, so the newest text is announced but not focused. Suggestions call `ask()` and then `input.focus()`, so the field is ready for the next question. Each appended row is reachable by Tab through its source links and follow up buttons, in reading order, with no roving tabindex.

Keyboard paths.

| Key | Where | Result |
| --- | --- | --- |
| Tab | Bar to room | Skip link, name, nav links, Ask, theme toggle, the menu at 760 and below, then the field and the send |
| Enter | Field | Submits the form. Empty input is dropped |
| ArrowUp, ArrowDown | Field | Walks the in-session history, clamped at both ends, `preventDefault` so the caret stays |
| Escape | Anywhere | Leaves for the page in `?from=`, default home |

The hint names all three keys except the two arrows' clamping, and it is not wired to the field with `aria-describedby`. Under 760 it is `display: none`, so a phone reader gets no visible statement of the keyboard at all.

Targets. The field, the send circle, the Ask switch, and each follow up button meet 44px. The theme toggle at 34px and the menu button at about 30px do not, and they sit directly above the room on every visit.

Contrast. `--tui-muted` on the room is 5.34:1 light and 6.29:1 dark, `--tui-accent` is 9.22:1 and 8.3:1, and the clay note is 5.51:1 and 7.2:1, so the 9.5px and 10px caps clear 4.5:1 even at their size. The faintest marks are the hairlines, which are structure and not text.

Two limits worth stating. The nav marks no current page on `ask.html`, so the page's identity is carried by the switch label in prose rather than `aria-current`. And with JavaScript off the log stays empty, leaving a header, a blank panel, and a form that submits a GET back to itself, which is the one state in which the page has nothing to say.

## Source

- `ask.html` lines 14 to 38: skip link and top bar. Lines 40 to 58: `main.agent`, `h1.sr-only`, `.agent__in`, header, log, composer, hint. Lines 60 to 62: `site.js`, `theme.js`, `tui.js`.
- `assets/tui.css` lines 22 to 33: `.agent` room, focus, `.agent__in` column. 35 to 50: channel header. 52 to 61: log and scrollbar. 63 to 120: rows. 122 to 152: composer and hint. 154 to 156: the 680 cap. 158 to 171: the 760 block. 173 to 175: the 380 trim. 177 to 180: reduced motion.
- `assets/tui.js` lines 8 to 21: the return map and the switch rewrite. 23 to 103: the thirteen entries. 105 to 110: `FALLBACK`. 112 to 114: `busy` and the history cursor. 136 to 138: `scroll()`. 235 to 260: `intro()` and the example rows. 262 to 277: `match()`. 279 to 304: `ask()`, example removal, 620ms reply. 306 to 330: submit, history keys, Escape, 80ms focus.
- `assets/site.css` lines 30 to 37, 73 to 80, 110 to 118: `--tui-*` in light, dark, and the OS query. 165 to 167: `.skip` and `.sr-only`. 179 to 180: the 58px bar. 274 to 295: the mobile bar and menu panel.
- `DESIGN.md` line 169 for the chat size exception, 193 for the outlined 999px field and the 44px filled circle, 197 for the send as a control rather than an invitation.
- Captures: `../../preview/chat-intro.png` (desktop, intro and example pinned low, focused field), `chat-composer.png` (the field and hint), `chat-composer-dark.png` (the same crop in dark), `chat-mobile.png` (390 wide, hint hidden, 16px text).

### Divergences

- `preview/chat-intro.png` and `preview/chat-composer.png` show the field wider than the 680px cap that `tui.css` applies from 761 up. [Inputs](../components/inputs.md) records the same mismatch, so read those captures for the room and the ring, not for the field width.
- `preview/chat-mobile-answer.png` is in the current capture set by filename, but it shows the older field labelled `Message #ask-van` with a square send and chevron avatars, the same build as `chat-answer.png`, `chat-typing.png`, `chat-dark.png`, and `chat-suggest-hover.png`. Read those five for rows only.
- `DESIGN.md` does not state the room height, the 860 container, the 56px header, or the `?from` contract, so those values are documented from `tui.css` and `tui.js` alone.
