---
title: Home, work, and about
group: Surfaces
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/site.css
  - index.html
  - work.html
  - about.html
  - README.md
---

# Home, work, and about

Three pages carry the argument before the report. Home states who the person is and what shipped, work lists the roles and the systems inside them, about gives the bio and the contact path. All three share one shell, the sticky top bar and the footer. Work and about also share the page head with its lede, and about adds the prose block. Everything else is local: `.hero`, `.results`, and `.contact-strip` in `index.html`; `.role-row`, `.systems`, and `.work-foot` in `work.html`; `.about-grid`, `.facts`, and `.contact-card` in `about.html`. No page has a sidebar, a card grid, a hero image, an empty state, or a loading state.

## Composition

All three run on `.wrap`: `max-width:1040px`, centered, `padding:0 32px`, so the text column inside is 976px. Content is one column of blocks in DOM order. Home is three `<section>` elements inside `main`, each the full frame. Work and about put `.wrap` on `main` itself and open with `header.page-head`.

| Page | Job | Local classes | Blocks, top to bottom |
|---|---|---|---|
| Home | who, three numbers, one contact path | `.hero`, `.statement`, `.actions`, `.results`, `.result`, `.band-link`, `.contact-strip` | hero, results band, band link, contact strip |
| Work | roles and the systems inside them | `.role-row`, `.role-meta`, `.systems`, `.system`, `.work-foot` | page head, four role rows, work foot |
| About | the bio, the facts, the email | `.about-grid`, `.facts`, `.contact-card` | page head, prose with facts, contact card |

README calls home "about one screen and a half" and gives work one job: roles and systems with deep links into the report. Nothing on the three pages fetches, filters, or paginates.

The three page style blocks under `index.html`, `work.html`, and `about.html` own their layout, spacing, and type. They declare no color literal; every color is a `var()` reference, so the composition follows the active token set and needs no page level dark override.

## Sections and components

### Shared page head, lede, and prose

`.page-head` appears on work and about only. Home replaces it with `.hero`, which carries its own h1. The head is a `<header>` with one `h1` and one `p.lede`, no eyebrow, kicker, byline, or divider.

```html
<header class="page-head">
  <h1>Work</h1>
  <p class="lede">Four years of moving product data between systems that disagree.</p>
</header>
```

The block is `padding:clamp(46px,6.5vw,84px) 0 clamp(24px,3vw,40px)`. The h1 is serif `clamp(38px,4.8vw,60px)` at 1.02 with `-.02em`, `max-width:18ch`, and `text-wrap:balance`. The lede is 18.5px/1.6 in `--muted`, 18px below the h1, capped at 54ch. On work the first role row's heavier `--line-2` top border closes the head. On about the head sits in whitespace and the grid starts under it.

`.prose` is used once, in `about.html`: three Literata paragraphs at 17.5px/1.66, capped at 62ch, with `1.05em` between them. It sets no first-line indent, no drop cap, no lead paragraph, and no heading. The `dl.facts` inside it is the last child, so `.prose p:last-child` never matches the third paragraph and its bottom margin survives; the list's 32px top margin wins the collapse.

### Home hero

```html
<section class="wrap hero" aria-labelledby="who">
  <h1 id="who">Van Sirisouk</h1>
  <p class="badgeline">...</p>
  <p class="statement">...</p>
  <div class="actions">
    <a class="btn-rect" href="work.html">See the work</a>
    <a class="textlink" href="report.html">Read the report</a>
  </div>
</section>
```

`.hero` is `padding-block:clamp(52px,8vw,104px) clamp(36px,4.5vw,56px)`. The name is serif `clamp(50px,7.6vw,104px)` at .94 with `-.02em`, the largest type on the site. The badge line sits a fixed 26px under the h1 and states role, employer, and city as three neutral chips joined by the words "at" and "in", with an `sr-only` "Currently" before the first. Badge internals are in [evidence](../components/evidence.md).

The statement is `clamp(19px,1.7vw,22px)` at 1.5 in `--body`, capped at 44ch and set with `text-wrap:pretty`. It is one sentence group with no heading over it. `.actions` is a wrapping flex row, `gap:12px 22px`, 30px below the statement, holding the 6px outlined rectangle and one text link. The filled Contact pill stays in the top bar, so home keeps the one filled pill per page. Shapes and hover rules are in [actions](../components/actions.md).

### Home results and band link

`section.wrap[aria-label="Results at a glance"]` holds `.results` and `p.band-link`. The band is `repeat(3,minmax(0,1fr))` with `--line-2` on the top and bottom edge and a 1px `--line` between columns. Each `.result` is the anchor itself at `26px 30px` with three stacked spans: the number in serif `clamp(36px,4vw,50px)` at `--data`, the unit at 11.5px sans muted, and a 14.5px sentence capped at 30ch that names the system and its consequence.

The three numbers are 450,000 records per second, 390,000 submissions a day, and 30% faster queries. Their links go to `work.html#attire-intake`, `#seller-submissions`, and `#catalog-cleanup`, which are the system rows that produced them. Hover fills the tile with `--hover` over .18s and turns the sentence ink; the number stays indigo.

`.band-link` sits 14px under the band, set at 13px sans, and reads "What 22% is worth at scale" in `--data` with a `--line-2` underline; the label goes ink on hover. It opens `report.html#scale` instead of repeating the model. The band and its states are documented in [evidence](../components/evidence.md).

### Home contact strip

`section.wrap.contact-strip[aria-label="Contact"]` closes the main content. It is a top rule at `--line`, `margin-top:clamp(52px,7vw,84px)`, and 28px of padding. Inside: an 11.5px muted label ("Hiring, referring, or just curious"), the address as `.mail` in serif `clamp(24px,3vw,30px)` with a 1px `--line-2` underline, then a 13px note row with `gap:10px 22px`. The row holds one plain sentence ("Email is fastest. I read everything, and I answer.") and two text links, LinkedIn and "More about me". The sentence is a span, not a link.

### Work roles

```html
<article class="role-row" id="walmart">
  <p class="role-meta"><span class="co">Walmart Global Tech</span>Aug 2023 to May 2025<br>Bentonville</p>
  <div>
    <h2>Software Engineer, Product Categorization &amp; Placements</h2>
    <p>Two years of making supplier data agree with itself at catalog scale.</p>
    <div class="systems">...</div>
  </div>
</article>
```

Four rows: Atlassian (`#atlassian`), Walmart Global Tech (`#walmart`), Meta (`#meta`), and Before 2023 (`#before`). Each is `article.role-row` in a `210px minmax(0,1fr)` grid with `gap:clamp(20px,4vw,48px)` and `padding:30px 0` over a 1px `--line` top border; the first row takes `--line-2`. The meta column holds `.co` at 15px/600 ink with the dates and city under it in 12.5px muted, split by `<br>`. The heading is serif `clamp(24px,2.8vw,32px)` at 1.08 with `-.015em` and 12px below it; the body is 16px/1.6 capped at 60ch.

Work is the only one of the three with an `h2` level: one per role under the `h1`. The Before 2023 row has no dates, only the word "Internships" after the company. The Atlassian entry is deliberately short because the work is under NDA.

### Work systems

`.systems` opens with a `--line` rule and 18px of air under the role paragraph. Each `.system` is `minmax(0,1fr) auto`, `gap:6px 20px`, `padding:13px 0`, bottom border `--line`, aligned on baselines. The name is 14px ink, the description 12.5px/1.5 muted beneath it, and the result sits in the right column across both rows in serif 20px at `--data`, `white-space:nowrap`.

The Walmart rows are links, each to the report passage that explains the measurement: Catalog cleanup 30% to `#sys-cleanup`, Attire intake 450k/s to `#sys-intake`, Seller submissions 390k/day to `#sys-seller`. Their own ids, `#catalog-cleanup`, `#attire-intake`, and `#seller-submissions`, are the targets of the three home tiles, and `.system[id]` carries `scroll-margin-top:84px` so the sticky bar does not cover the row.

The Meta rows use `.systems--facts` and are `div`s, not anchors: Model input 600k/s, Scoring path 350%, Model build 67%. Hover is removed and the cursor is default, because the report does not cover those numbers. The variant matrix is in [evidence](../components/evidence.md).

### Work foot

`p.work-foot` is 13px sans muted at 1.7, capped at 62ch, 34px under the last role row. It says the Walmart rows open the report and points "section 3" at `report.html#scale`. It is prose with two inline links, not a closing action block; the page ends there and the footer follows.

### About grid, facts, and contact card

```html
<div class="about-grid">
  <div class="prose">
    <p>...</p>
    <dl class="facts">...</dl>
  </div>
  <aside class="contact-card" id="contact" aria-labelledby="contact-h">...</aside>
</div>
```

`.about-grid` is `minmax(0,1fr) minmax(280px,.72fr)` with `gap:clamp(32px,5vw,72px)` and `align-items:start`. The left column is the prose; the right column is the card, which starts at the top of the grid so its top rule sits level with the first paragraph, and it does not stick.

`dl.facts` is a `110px minmax(0,1fr)` grid, `gap:10px 18px`, 32px above it and 22px under a `--line` rule. Both cells are 13px sans: `dt` muted, `dd` ink. Four pairs: Currently, Based in, Experience, Focus. There is no heading over the list and no color in it.

`.contact-card` opens with a `--line-2` rule and 18px of padding. The label is 11.5px muted, the address is `.mail` in serif `clamp(22px,2.4vw,27px)`, the supporting sentence is 13px/1.6 muted, and `.row` is a wrapping flex row at 18px gap with LinkedIn and "The full report". It is an `aside` labelled by the paragraph `#contact-h`, so the card has an accessible name but no heading.

### Shared top bar and footer

Every page opens with the skip link and `header.top`: sticky at 58px, translucent `--top-bg`, 18px blur, one `--line` border, brand, three page links, the Contact pill, the Ask switch, the theme toggle, and the Menu button under 760. Work sets `aria-current="page"` on Work and about on About; home marks nothing, because the brand already points there.

The footer is identical on all three: `.foot` at `margin-top:clamp(56px,7vw,96px)`, a `--line` top border, `padding:24px 0 52px`, then `.foot__in` as a 12px sans row with the credit line and four links (Work, Report, About, Email), spaced apart and wrapping when the width runs out. It is small, muted, and has no second row or social icons. Measurements and states for both belong to [navigation](../components/navigation.md).

## Responsive behavior

Three max-width breakpoints, no container queries, no fixed mobile width. Clamps keep the display type growing after the 1040 frame stops.

| Width | Home | Work | About |
|---|---|---|---|
| 900 | unchanged | `.role-row` becomes one column at `gap:8px`; `.role-meta` turns into a flex row with the company on its own line | `.about-grid` becomes one column at `gap:36px`; the card moves under the facts |
| 760 | gutters 20, hero top padding 40, badges 13px, results one column at `22px 0` with the divider moved to the bottom, tile sentence uncapped | gutters 20, `.system__desc` spans both columns, `.system__res` drops to 18px and stays on the name row | gutters 20, card full width |
| 600 | unchanged | unchanged | `.facts` becomes one column at `gap:2px`, with 8px above each `dt` |

At 760 the site body drops from 17.5 to 17px, `.badgeline` tightens to `gap:7px 8px` and 20px top margin, `.conn-in` hides, and the top bar wraps so the menu can appear. Below 760 the nav links leave the bar and the Contact pill goes full width inside the open panel. At 900 the 210px meta column disappears; at 600 the 110px fact column does too.

The h1 floors matter on a phone. Home reaches its 50px minimum at about 658px and holds there; work and about reach 38px at about 792px. The 44ch statement, the 54ch lede, and the 62ch prose cap are all wider than the column allows at 20px gutters, so those blocks fill the width.

Print drops `.top`, `.actions`, and `.foot__links`, and sets body text to 10.5pt black. On home that removes the two hero actions while the contact strip's address and note still print. Work and about have no `.actions`, so their text prints whole.

## States

### Interaction

| State | Where | Behavior |
|---|---|---|
| Hover | `.result` | `--hover` fill over .18s, sentence to `--ink`, number unchanged |
| Hover | `a.system` | `--hover` fill over .16s, name underlines at 3px offset |
| Hover | `.systems--facts .system` | none, default cursor |
| Hover | `.band-link a` | label to `--ink`, underline already at `--line-2` |
| Hover | `.mail`, `.textlink`, `.btn-rect` | see [actions](../components/actions.md) |
| Focus visible | every link and control | 2px `--data` outline at 3px offset; on a result tile or system row the ring wraps the whole target |
| Current | top bar on work and about | `aria-current="page"`, ink label, no underline |

There is no disabled, loading, empty, error, success, or skeleton state on any of the three pages. Nothing fetches, so nothing can fail or arrive late. There is no filter, sort, accordion, tab set, modal, tooltip, or form. No `:active` rule applies to a page tile or row, and no visited state is styled, so a followed result tile looks like an unfollowed one. Badges and role metadata have no hover and are not interactive. Reduced motion shortens every transition on these pages to .001ms, including the .16s and .18s hover fades; the hover fill and the name underline still land, without travel. No element on these pages moves on load.

### Dark mode

The three page blocks contain no hex value, and every color they set is a token reference, so each surface follows `--paper`, `--ink`, `--body`, `--muted`, `--line`, `--line-2`, `--data`, `--badge-*`, `--hover`, and `--top-bg` from the active set.

| Element | Light | Dark |
|---|---|---|
| Page ground | `#ffffff` | `#0c1018` |
| Headings | `#131a2b` | `#eef1f7` |
| Body, statement, result sentence | `#303645` | `#c2c8d4` |
| Muted labels, units, lede | `#5f6673` | `#9299a8` |
| Result numbers, band link, system results | `#2b3a8f` | `#a9b3ff` |
| Rules, dividers | `#e6e6e2`, `#d3d3cc` | `#232a38`, `#343c4c` |
| Hover wash | `rgba(19,26,43,.04)` | `rgba(238,241,247,.06)` |
| Contact pill | ink fill, paper label | near white fill, dark label |

The theme follows the OS until someone uses the toggle, then `vs-theme` wins. A head script applies the stored value before first paint, so a dark reader never sees a white flash. The full token tables and contrast pairs are in [color and theme](../foundations/color-and-theme.md).

## Do and don't

- Do let the h1 carry the page. Every page head has one line and one lede, no label above it.
- Do keep home to the hero, three numbers, and one contact path. README sets that scope.
- Do link a result tile to the system that produced the number, not to a generic work page.
- Do keep the Walmart rows linked and the Meta rows as facts. The report does not carry the Meta numbers.
- Do keep the 44ch statement, the 54ch lede, and the 62ch prose separate. They are three different reading jobs.
- Don't add a section to any of the three to fill space. There is no skills grid, no testimonial, no logo row, no timeline, and no contact form.
- Don't add a heading over the facts, the results band, or the contact card. None exists now.
- Don't put a card, shadow, or radius on a role row or a result tile. The rules do the separating.
- Don't restate a screenshot's copy. The work preview predates the current lede (see Source).

## Accessibility

- Landmarks: skip link first, then `header.top`, `nav#site-nav[aria-label="Site"]`, `main#main`, and `footer.foot` on all three. Home's three sections are labelled, by the h1 for the hero and by `aria-label` for "Results at a glance" and "Contact". Work has no named region beyond the header; about adds a labelled `aside` for the contact card.
- Headings: home and about stop at `h1`. Their outline is a single heading, even though about has three paragraphs and a facts list. Work is `h1` plus one `h2` per role, with no skipped level. The about contact card is named by a paragraph, `#contact-h`, not a heading.
- Result tiles: each is one anchor around number, unit, and sentence, so the name reads "450,000 records per second The attire intake pipeline..." and the entire tile is one focus stop. The band link that follows is a separate stop with a specific name.
- System rows: the linked variant is an `a` around three spans, read name, description, result. The Meta variant is a `div`, so those rows are not focusable and carry no link role. A home tile and its work row point at the same id, so either can be the entry point.
- Facts: a real `dl` with `dt` and `dd`, so the label and value are paired. The list has no heading, which means it cannot be jumped to by heading navigation.
- Badge line: the `sr-only` "Currently" opens the sentence, and "at" and "in" are plain text, so it reads as one statement. Under 760 `.conn-in` is hidden, so the line reads "at Atlassian New York" and the preposition before the city disappears with no replacement.
- Link names: the mail link's name is the address itself, not "email me". Every LinkedIn link uses `target="_blank"` with `rel="noopener"` but does not announce the new tab.
- Target sizes: result tiles and system rows are large multi-line targets. Text links run about 26px tall, above the 24px minimum; footer links are about 20px and under it. Both are under 44px. The theme toggle (34px) and menu button (about 30px) are under 44px; both are recorded in [accessibility](../foundations/accessibility.md).
- Contrast: body 12:1 light and 11.3:1 dark, muted 5.8:1 and 6.7:1, indigo 10:1 and 9.6:1. Muted carries the lede, units, role meta, footers, and contact labels, and it is the tightest pair in the system.
- Keyboard order: skip link, brand, page links, Contact, Ask, theme toggle, then main, then footer. Under 760 the menu button joins after the toggle and the closed links leave the tab order.
- Zoom and reflow: all three were measured at 320px with no horizontal overflow. Type is in px, so browser font-size settings do not resize it; zoom does.

## Divergences

- `DESIGN.md` puts the frame at 1040 with 24px gutters. These pages use 32px, and 20px under 760. The report is the surface that runs at 24. The full frame table is in [space, shape, and motion](../foundations/space-shape-motion.md).
- `DESIGN.md` says mobile collapses to one 350px column. No page sets a 350px width; the column is fluid inside 20px gutters from 320px up.
- `DESIGN.md` keeps Instrument Serif at 26px and above. The work system result is 20px, and 18px under 760, because it has to sit beside a 12.5px description. `.about-grid h2` declares a heading step at `clamp(26px,3vw,34px)` that no markup uses.

## Source

| What | File | Lines or selectors |
|---|---|---|
| Frame, page head, lede, prose | `assets/site.css` | `.wrap` 169, `.page-head` 251 to 257, `.prose` 258 to 259 |
| Footer | `assets/site.css` | `.foot` 262 to 271 |
| Breakpoint, motion, print | `assets/site.css` | 760 block 274 to 295, reduced motion 296 to 299, print 300 to 304 |
| Top bar | `assets/site.css` | `.top` 172 to 207; behavior in [navigation](../components/navigation.md) |
| Tokens | `assets/site.css` | `:root` 30 to 71, dark 73 to 109, OS dark 110 to 148 |
| Home styles | `index.html` | 17 to 69, media 760 at 63 to 69 |
| Home markup | `index.html` | hero 99 to 120, results and band 122 to 141, contact strip 143 to 151, footer 154 to 164 |
| Work styles | `work.html` | role row 14 to 25, systems 27 to 41, work foot 43 to 46, media 900 and 760 at 48 to 57 |
| Work markup | `work.html` | page head 87 to 90, Atlassian 92 to 98, Walmart 100 to 123, Meta 125 to 148, Before 2023 150 to 156, foot 158, footer 161 to 171 |
| About styles | `about.html` | grid 14 to 20, facts 22 to 28, contact card 30 to 39, media 900 and 600 at 41 to 47 |
| About markup | `about.html` | page head 77 to 80, grid 82 to 105, footer 108 to 118 |
| Page jobs and numbers | `README.md` | page table 5 to 13, numbers 60 to 88, home note 107 |

Screenshots: `../../preview/home.png`, `home-dark.png`, `home-mobile.png`, `badges.png`, `work-walmart.png`, `work-meta.png`, `work-meta-mobile.png`, `work-atlassian-mobile.png`, `work-hover-dark.png`, `about.png`, `about-dark.png`. `preview/work.png` shows an older lede that mentions an "Impact page", a page README says was cut, and none of the previews of home and about show the Ask switch. Treat the markup as current and the screenshots as layout evidence.

Related: [navigation](../components/navigation.md), [evidence](../components/evidence.md), [actions](../components/actions.md), [typography](../foundations/typography.md), [color and theme](../foundations/color-and-theme.md), [space, shape, and motion](../foundations/space-shape-motion.md), [accessibility](../foundations/accessibility.md).
