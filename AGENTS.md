# AGENTS.md: van-sirisouk

Personal portfolio for Van Sirisouk. Five static HTML pages, no build step, no framework, no
server. It must open from `file://` and work offline. `DESIGN.md` is the written token contract.
The implemented component reference is `design-system/README.md`; the CSS and markup are the
source for what the components do today.

State: pre-refactor. Styles live in the shared stylesheets plus inline page styles. There is no
separate component layer. Read `design-system/README.md` and the page you are changing before
editing shared CSS.

## Read first

| Task | Read |
|---|---|
| Any visual change | `design-system/README.md`, the named component doc, then `DESIGN.md` |
| Component variant, state, or measurement | `design-system/README.md`, then the named component or foundation doc |
| Copy, numbers, captions | `README.md`: "The numbers, and where they come from" and "Replace before this goes live" |
| Token or theme change | `DESIGN.md` Colors and Typography, then `scripts/check-design-tokens.py` |
| Layout or state reference | `preview/` screenshots, but treat them as evidence, not source |
| Chat page, composer, or agent copy | `ask.html`, `assets/tui.js`, `assets/tui.css` |

## Layout

| Path | What it is |
|---|---|
| `index.html`, `work.html`, `report.html`, `about.html` | The four content pages. `report.html` is a separate document with inline styles |
| `ask.html` | The site agent, a dedicated chat page. The nav switch is a link to it, on while there |
| `assets/site.css` | All shared styles and every token today |
| `assets/site.js` | Mobile menu |
| `assets/theme.js` | Theme toggle, storage under `vs-theme` |
| `assets/tui.css` | Chat page and nav switch styles. The switch uses the base tokens; the chat page reads `--tui-*` from `assets/site.css` |
| `assets/tui.js` | Chat index, `match(q)`, messages, composer, `?from=` return, Escape |
| `assets/fonts/` | Five local woff2 files (Instrument Serif, Literata, Instrument Sans) |
| `DESIGN.md` | Design contract. Lints clean with the `design.md` CLI |
| `design-system/` | `README.md` index, `narrative.md`, `foundations/`, `components/`, `surfaces/`. The implemented component reference, with divergences from `DESIGN.md` |
| `README.md` | Project state, number provenance, launch caveats |
| `scripts/` | `check-design-tokens.py` compares the eight role colors in `DESIGN.md` with the CSS; `check-artifact-coverage.py` verifies this map names every source file |
| `preview/` | 6.7 MB of review screenshots (30 files, Oct 2026), generated. Not source |

## Commands

```bash
open index.html                          # the only build step
npx -y @google/design.md lint DESIGN.md  # 0 errors, 0 warnings
python3 scripts/check-design-tokens.py   # 8 role colors x 2 stylesheets
python3 scripts/check-artifact-coverage.py  # every source file is named in the context docs
```

Verify layout by opening a page at 390, 768, and 1440 in both themes. There is no test suite.

## Hard rules

- No framework, bundler, or build step. No server requirement. If a change breaks `file://`, it is
  wrong.
- Classic IIFE scripts, not ES modules. Modules are blocked by CORS on `file://`.
- Tokens are the only place a color may be defined. No raw hex in HTML, SVG attributes, or JS
  strings. Charts use token-backed classes such as `bar-after`, `line-data`, `cell`, `band`.
- Two accents, each with a job: indigo is measured data, clay is an assumption. Never add a third
  accent, and never color badges, navigation, captions, or role metadata.
- Type is fixed: Instrument Serif for display, Literata for reading, Instrument Sans for interface.
  Every h1 uses `-0.02em` tracking. Do not invent sizes between the scale steps, except the
  documented chat page step in `DESIGN.md`.
- Shapes are semantic: 4px facts, 6px secondary action, 10px panels, 12px abstract. 999px is the
  Contact pill and the chat input field; the chat send is a 44px filled circle. One filled pill in
  the bar. The report adds a second filled pill in its closing contact block; see
  `design-system/components/actions.md`.
- The design-system docs describe implemented values, including the places where `DESIGN.md` is
  behind. If you change a component, update its doc and the coverage map in the same pass.
- Copy rules are normative: first person, no em dashes, every number carries a mechanism, every
  figure caption states its assumption, no invented data.
- Accessibility floor: 44px targets, a 2px focus outline at 3px offset, a skip link, landmarks, and
  reduced motion. The theme toggle (34px) and the mobile menu control (30px) are still below the
  target floor; fix them when you touch the top bar.
- `report.html` carries its own token copy. A token change means editing both `assets/site.css` and
  `report.html`.
- The chat page is `calc(100dvh - 59px)` because the top bar is 58px plus its 1px border. If the
  bar height changes, change the `.agent` height in `tui.css`.

## Gotchas

- This folder is not a git repository. There is no history and no revert. Copy a file before a
  risky rewrite.
- `preview/` is 6.7 MB and 30 screenshots, and will drown a naive `grep -r`. Exclude it. `.DS_Store`
  is macOS noise and is ignored by the coverage check.
- The palette is settled: white paper, ink-blue text, indigo data, clay assumptions. Do not copy
  colors out of screenshots; read the tokens in `assets/site.css`.
- `report.html` carries its own `<style>` block. Page-specific overrides live there, not in
  `assets/site.css`.

## Launch blockers

- `hello@vansirisouk.com` is a placeholder. Replace before publishing.
- Production origin is unset; canonical URLs, `og:url`, and any sitemap depend on it.
- No résumé link yet.
- There is no social image or 404 page yet.

Verified 2026-10-26: five pages including `ask.html`, the design-system tree (13 docs plus the
index), `DESIGN.md` lint clean, token check passing for both stylesheets, artifact coverage passing
for every source file.
