# Van Sirisouk, personal site

Five static pages, shared CSS, no build step, no framework, no trackers.

| Page | Job |
|---|---|
| `index.html` | Who you are, three numbers, one contact path. About one screen and a half |
| `work.html` | Roles and systems, including the FAIR AI internship at Meta, with deep links into the report |
| `about.html` | The bio, the facts, and the email |
| `report.html` | The visual report. Five figures, the live model, method note. About 500 words |
| `ask.html` | The site agent: a chat page that answers from these pages, cites them, and refuses when the answer is not there |

The split exists on purpose. The home page answers "who is this and what did they ship" in under a minute. The work page carries the systems. The report carries the reasoning, the model, and the method, in roughly 500 words with five figures, and doubles as the template for future writing.

The agent is its own page, not an overlay. The switch in the top bar is a link to `ask.html`, and it stays on while you are there.

The calculator has one home: section 3 of the report, where it is Figure 4. The home's band links to it rather than repeating it. An earlier Impact page duplicated the model and was cut for that reason.

## Run it

Open `index.html`. Fonts are local, so it works offline. Every page links through `assets/site.css`, `assets/site.js`, and `assets/theme.js`. All five load `assets/tui.css` for the nav switch; `ask.html` also loads `assets/tui.js`. Page-specific rules sit in a `<style>` block in each file. The report still carries its own stylesheet inline because it is a separate document type.

`python3 scripts/check-artifact-coverage.py` verifies that every source file is named in `AGENTS.md`, `README.md`, `DESIGN.md`, or `design-system/README.md`.

## Site agent

`ask.html` is a local chat page, built as a channel: a header, message rows with an author and a time, and a composer at the bottom. `assets/tui.js` holds a keyword index of 13 topics across the four content pages, and `match(q)` picks one by score. There is no network call and no model. Every answer names the page it came from and links to the anchor, and anything outside the index gets the same line: "Not stated on the site."

The switch carries `?from=` so the chat page knows where to send you back. Escape does the same. To put a real model behind it, replace `match(q)` and keep the answer and source renderers.

## Dark mode

Each page follows the operating system until the reader flips the toggle in the top bar. The choice is stored under `vs-theme` and wins from then on. `assets/theme.js` owns the switch. A four line script in each page's head applies the stored choice before first paint, so a dark reader never gets a white flash on the way in.

The palette is a second token set, not a filter or an inverted stylesheet. `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` point at the same values, so the page works with JavaScript off, and the toggle only takes over when someone asks it to.

Figures follow the theme through the same tokens. Charts use classes such as `.bar-before`, `.cell`, `.line-data`, `.band`, and `.chart-grid`, which map to `--cell`, `--data`, `--band`, and `--chart-grid`, so no chart carries a hex value of its own.

Measured contrast in both themes: body 12.1:1 light and 11.3:1 dark, muted labels 5.8:1 and 6.7:1, indigo on the figure panel 9.2:1 and 8.9:1. All above AA.

The dark ground is `#0c1018`, an ink-blue near-black rather than a neutral one, so panels (`#131824`), cards (`#1a1f2b`), and hairlines still separate. The indigo lifts from `#2b3a8f` to `#a9b3ff` and the clay from `#95522c` to `#d8a06e`, and the Contact pill inverts to a light fill with dark type so it stays the one filled pill in the bar. The report adds a second filled pill in its closing contact block.

## Design system

`DESIGN.md` is the spec. YAML front matter carries the role tokens (ink, indigo, clay, white, panel, body, muted, badge) and the type scale; the body explains the rules that the tokens cannot: the two-accent meaning, the 720px measure, caps tracking, the small-type floors, the shape language, and what not to do.

The component reference is in `design-system/README.md`: the narrative, four foundations, five component groups, and three surface docs. It describes the implemented values and records where `DESIGN.md` is behind the CSS.

```bash
npx -y @google/design.md lint DESIGN.md          # 0 errors, 0 warnings
python3 scripts/check-design-tokens.py           # 8 role colors, both stylesheets
```

The spec is role-based rather than a mirror of every CSS variable. Surfaces, chart marks, and the dark palette are documented in the Colors section because the spec only lets components reference a background and text pair.

`assets/site.css` is the implementation. `report.html` carries its own copy because it is a standalone document, so the check script verifies both against the spec and fails on drift.

## Navigation

Desktop: Work, Report, About, a Contact pill, and the Ask switch. Mobile: a Menu button that reveals the list. The Ask switch is on every page and links to the chat page. The menu closes on Escape, on a link click, and when the viewport widens past 760px.

## The numbers, and where they come from

Measured at Walmart, and repeated as measurements:

- 30% faster queries after the catalog cleanup service
- $1,200 a year in storage saved
- 450,000 records a second through the intake pipeline
- 390,000 submissions a day through the seller app
- 22% shorter average session after launch

Measured at Meta, and stated only on the work page:

- 600,000 queries a second through the API data pipelines
- 350% platform performance after batching subscription events in the Python API
- 67% smaller build after moving model packages onto platform infrastructure

Derived with arithmetic, labeled as derived:

- Annual submissions: daily rate times 365
- Human filing time: records times 20 seconds
- Seller hours returned: volume times human share times session length times 22%

Assumed, and exposed as controls in the calculator:

- 20 seconds per record when filed by hand
- 25% of submissions are human sessions
- a 6 minute baseline session

Not measured, stated as such: revenue.

## Replace before this goes live

- Every number and claim in the report comes from the LinkedIn profile or is arithmetic on it. Check each one against your own records before publishing. The three supplier submissions in Figure 1 are illustrative, not a real submission.
- The Meta numbers on the work page also come from the profile and are not in the report.
- `hello@vansirisouk.com` is a placeholder. It appears four times in `index.html`, four times in `about.html`, twice in `work.html` (nav and footer), and once each in `ask.html` and the report's email button.
- The Meta internship is dated on the work page. Synchrony and Edgewell are still named without dates in the "Before 2023" row; the profile dates them Sep 2022 to May 2023 and May to Jul 2021.
- The Atlassian entry is deliberately generic. Add one real detail if it is not under NDA.
- The "3 minute read" in the report matches roughly 500 words.

## Design notes

Type: Instrument Serif for display, Literata for reading, Instrument Sans for interface and figure labels. Display tracking is one value, -0.02em, on every h1. The smallest type has a floor: 10px at weight 500 for the uppercase figure keys, 13px captions, 12px byline on mobile, and chart labels at 15 SVG units (about 11px at the 720 column) with 17 units for values. Paragraphs and captions use text-wrap: pretty to keep a single word off the last line; captions and the report deck use balance. The chat page runs one step smaller: 16.5px/1.62 Literata for messages and the input, 13.5px Instrument Sans for suggestions, 10.5px for metadata. It is the one documented exception to the scale.

Color: white (`#ffffff`) under an ink-blue (`#131a2b`), with two accents that carry meaning rather than mood. Indigo (`#2b3a8f`) is measurement and structure: result numbers, section numerals, chart marks, data links. Clay (`#95522c`) is the assumption: the abstract label, the inference in Figure 1, the Assumed row in the method table, the two model inputs, and the chat note on an unstated answer. Nothing else is colored. Panels are a light neutral (`#f6f6f3`) and cards are white, so the surfaces separate without a second hue, and the clay stays the only warm note in the system. In dark the ground is `#0c1018`, an ink-blue near-black; type lifts to `#eef1f7`; the two accents lift to `#a9b3ff` and `#d8a06e`.

Shapes: rectangles carry facts and surfaces, one filled pill carries the invitation. Badges are 4px filled rectangles with a hairline border, panels and figures are 10px, the secondary action is a 6px ink-outlined rectangle, and the only filled pill in the bar is Contact; the chat field is a 999px outlined pill and the send is a 44px filled circle. The report adds a second filled pill in its closing contact block.

Home: 1040px canvas, hero with status badges for role, employer, and location, then a results band whose cells link to the work page. No calculator, no bio, no role list.

Report: the masthead uses the 1040px site frame, the title can breathe to 960px, and everything from the abstract down is a 720px reading column, figures included. The top bar stays on the site frame. On mobile the report becomes one fluid column with 20px gutters. Figure 1 is an HTML diagram of three supplier submissions resolving to one record; the rest are SVG charts with captions that state their assumptions.

Motion: the calculator responds to the reader, and nothing moves on its own. `prefers-reduced-motion` is respected.
