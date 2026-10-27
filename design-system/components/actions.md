---
title: Actions
group: Components
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - assets/site.css
  - index.html
  - about.html
  - report.html
---

# Actions

Six controls carry every action on the site. The top bar holds a compact filled pill, Contact, on all five pages. The home hero pairs a 6px outlined rectangle with a small underlined text link. The home and about pages end on a serif mail address. The report ends on a full size filled pill and a reset button that belongs to Figure 5. All six are one anchor or one button, set in Instrument Sans except the mail address, with a 0.2s color transition and no shadow.

## Anatomy

Every action is a single inline element with a text label and a visible shape or rule. None contains an icon, a second line, or a nested span.

| Class | Element | Shape |
| --- | --- | --- |
| `.pill` | anchor | filled ink capsule, no border |
| `.top__cta` | anchor inside `.top__nav` | filled ink capsule, smaller padding |
| `.btn-rect` | anchor | transparent box, 1px ink border, 6px radius |
| `.textlink` | anchor | no box, 1px rule under the baseline |
| `.mail` | anchor | serif text, 1px rule under the baseline |
| `.reset` | `button type="button"` | no box, 1px rule under the baseline |

The home hero and report contact block wrap their actions in `.actions`, a flex row with wrapping:

```html
<div class="actions">
  <a class="btn-rect" href="work.html">See the work</a>
  <a class="textlink" href="report.html">Read the report</a>
</div>
```

The top bar variant carries no wrapper beyond the nav:

```html
<nav class="top__nav">
  <a href="work.html">Work</a>
  <a class="top__cta" href="mailto:hello@vansirisouk.com">Contact</a>
</nav>
```

The anchor underline that `a` sets globally is removed on all of these. `.pill` and `.btn-rect` also repeat `text-decoration:none` in their hover rules, because `a:hover` changes the decoration color and would otherwise draw a line through the capsule or box.

## Variants

| Class | Use case | Size | Color | Radius | Hover |
| --- | --- | --- | --- | --- | --- |
| `.pill` | high emphasis invitation, report contact block, "Email me" | 14px/500, padding 12px 22px, about 47px tall | `--ink` fill, `--paper` label | 999px | `--ink-hover` fill, `translateY(-1px)` |
| `.top__cta` | the one Contact action in the top bar, all pages | inherits 13.5px nav size, 500, padding 7px 15px, about 36px tall | `--ink` fill, `--paper` label | 999px | `--ink-hover` fill, `translateY(-1px)` |
| `.btn-rect` | secondary action beside a primary, "See the work" | 14px/500, padding 11px 20px, 1px border, about 47px tall | `--ink` label on transparent, `--ink` border | 6px | `--ink` fill, `--paper` label |
| `.textlink` | quiet link after a stronger action, LinkedIn, cross page links | 14px/400, 2px bottom padding, 1px rule, about 26px tall | `--muted` label, `--line-2` rule | 0 | label `--ink`, rule `--ink` |
| `.mail` | the email address as the contact action | Instrument Serif, clamp 24 to 30px on home, clamp 22 to 27px on about | `--ink` label, `--line-2` rule | 0 | rule `--ink`, label unchanged |
| `.reset` | return Figure 5 sliders to 25 and 6 | 12px/400, 2px bottom padding, 1px rule, about 18px tall | `--muted` label, `--line-2` rule | 0 | label `--ink`, rule `--ink` |

Two sizes exist for the filled pill and only two. The top bar uses the compact one because it sits in a 58px bar next to 13.5px nav links. The report contact block uses the full one because it is the only action in that block.

The `.mail` class has no rule of its own. Each page styles it in context: `.contact-strip .mail` in `index.html`, `.contact-card a.mail` in `about.html`. A bare `.mail` outside those parents gets no serif face.

## States

| Class | Default | Hover | Focus visible | Dark | Mobile |
| --- | --- | --- | --- | --- | --- |
| `.pill` | ink capsule | darker fill, 1px lift | 2px `--data` ring at 3px | light fill `#eef1f7`, dark label `#0c1018` | unchanged |
| `.top__cta` | ink capsule | darker fill, 1px lift | same ring | light fill, dark label | full width pill in the open menu at 760 |
| `.btn-rect` | outlined | filled, label flips to paper | same ring, follows the 6px radius | border and label become `#eef1f7` | unchanged |
| `.textlink` | muted with rule | ink label and rule | same ring | muted `#9299a8`, rule `#343c4c` | unchanged |
| `.mail` | ink serif with rule | rule goes ink | same ring | rule `#343c4c` | font bottoms out at the clamp minimum |
| `.reset` | muted with rule | ink label and rule | same ring | same as textlink | `margin-top` drops from 22 to 4 |

Focus is the global rule, not a per component one: `:focus-visible{outline:2px solid var(--data);outline-offset:3px;border-radius:2px}` at `site.css:164` and `report.html:151`. The `border-radius:2px` in that rule loses to any class that declares a radius later in the file, so the pill keeps 999 and the rectangle keeps 6. The ring is indigo in light mode and `#a9b3ff` in dark mode.

Hover on the two filled pills keeps the lift under `prefers-reduced-motion: reduce`. The global reduced motion block shortens the transition to .001ms but does not remove the transform, so the 1px shift still happens instantly.

There is no disabled, loading, empty, error, or success class for any action, and no `aria-disabled` in the markup. The only `:active` rule in the project is `.composer__send:active span{opacity:.76}` in `assets/tui.css`. Pressing a pill or a text link produces the browser's own active frame and nothing from this CSS.

## Measurements and tokens

```css
.pill{
  font-size:14px;font-weight:500;
  padding:12px 22px;border-radius:999px;
  background:var(--ink);color:var(--paper);
  transition:background .2s var(--ease),transform .2s var(--ease);
}
```

| Value | Light | Dark |
| --- | --- | --- |
| `--ink` | `#131a2b` | `#eef1f7` |
| `--ink-hover` | `#0b1120` | `#ffffff` |
| `--paper` | `#ffffff` | `#0c1018` |
| `--muted` | `#5f6673` | `#9299a8` |
| `--line-2` | `#d3d3cc` | `#343c4c` |
| `--data` | `#2b3a8f` | `#a9b3ff` |
| `--ease` | one shared timing curve | same |

Computed heights come from the inherited body line height of 1.66 for the 17.5px text face: pill 47.2px, rectangle 47.2px, text link 26.2px, reset 18.0px. The compact CTA is 36.4px because `.top__cta` sets no font size and inherits 13.5px from `.top__nav`. The report sets body line height 1.62 under 760, so its pill measures 46.7px there.

## Usage

One filled pill per page, and it is Contact. The report is the only page that places a second filled pill, in its contact block, and that is recorded under Divergences rather than treated as a pattern.

- The top bar CTA is the invitation on all five pages. On the report it points at `#contact` instead of a `mailto:`, so the reader lands on the author block before leaving.
- The secondary action is the 6px outlined rectangle. It appears once, "See the work", opposite "Read the report" in the home hero.
- Text links carry lower emphasis. They follow a primary or secondary action in `.actions`, sit in the about contact card row, and close the home contact strip.
- The mail address is its own action, not a link inside a paragraph. It is the largest type on the home contact strip at up to 30px.
- The chat send circle is a control and belongs to [inputs](inputs.md). It is filled, and it is not an invitation, so it does not count against the one pill rule.
- The reset control belongs to the Figure 5 model. It is the third column of the controls grid in the report, not a page level action.

Where actions sit: home hero (rectangle plus text link), home contact strip (mail plus two text links), about contact card (mail plus two text links), report contact block (pill plus two text links), report Figure 5 (reset), all five top bars (compact CTA).

## Do and don't

- Do keep one filled pill per page, Contact.
- Do use the compact `.top__cta` in the top bar and the full `.pill` only in a contact block.
- Do give a filled pill a single short label. "Contact", "Email me".
- Do keep the secondary action outlined at 6px. A second filled shape reads as a second invitation.
- Don't add a disabled or loading appearance. Neither exists, and the site has no async action that would need one.
- Don't add a third size of pill, a shadow, or a second accent color to an action.
- Don't turn a text link into a small pill to raise its emphasis. Move it into `.actions` beside a primary instead.
- Don't set a color on `.mail` inline. Its size and border live in the page block that owns it.

## Accessibility

Focus is visible on all six: a 2px indigo ring, 3px offset, following the shape's radius. Because the offset ring sits outside the fill, it stays legible on the ink pill and on the paper ground in both themes.

Target size splits three ways. The two filled pills and the rectangle are about 47px tall and clear the 44px comfort target. The compact CTA is about 36px tall and the text link about 26px; both clear the 24px minimum. The reset measures 18px, six under that minimum; the report gives it `justify-self:start` and 22px of top margin but no padding that would enlarge the hit area. The compact top bar CTA and the reset are the two places to fix first if the floor matters.

Link purpose is clear from the label alone in most cases: "See the work", "Read the report", "More about me", "The full report", "The site". Two exceptions are worth knowing. The mail link's accessible name is the address itself, so a screen reader reads `hello@vansirisouk.com` rather than "email me". And every LinkedIn link uses `target="_blank"` with `rel="noopener"` but no text or `aria-label` saying it opens a new tab, so the change of context is unannounced.

The reset is a real `button` with `type="button"`, so it does not submit anything, and its name is "Reset assumptions". The report includes `<p class="sr-only" role="status" aria-live="polite" id="f5-status">` next to it. The handler at `report.html:824` writes 25 and 6 back and calls `draw()`, and `draw()` writes the new total into `#f5-status`, so the reset is announced.

Print drops every action: `site.css:301` hides `.top`, `.actions`, `.controls`, `.reset`, and the report's print block hides the same set. No filled pill appears on paper.

## Divergences

`DESIGN.md` says the Contact pill is the only filled pill on a page. `report.html` has two: the compact Contact in the top bar at line 430 and the full "Email me" pill in the contact block at line 675. Both render filled ink with a 999px radius. The rule is repeated in Usage above; the report is the only page that breaks it.

`DESIGN.md` gives `components.contact-pill.padding: 12px`. The implemented padding is `12px 22px`, and the compact top bar variant is `7px 15px`. The token records only the vertical value.

`DESIGN.md` describes the mail address as a display link with a border. The border is implemented per page, not as a `.mail` rule, and the report has no mail link at all.

## Source

- `assets/site.css:162-164`: global link color, underline, `:focus-visible` ring.
- `assets/site.css:183-202`: `.top__nav` sizing and `.top__cta` fill, hover, lift.
- `assets/site.css:209-228`: `.pill`, `.btn-rect`, `.textlink` and their hovers.
- `assets/site.css:288-290`: 760 breakpoint, nav link padding, `.top__cta` full width and centered.
- `assets/site.css:296-301`: reduced motion and print, where actions are hidden.
- `index.html:26`: `.actions` row, gap 12px 22px, margin top 30.
- `index.html:52-57`: `.contact-strip .mail`, serif clamp 24 to 30.
- `index.html:82`, `index.html:116-119`, `index.html:145-149`: top bar CTA, hero actions, contact strip.
- `about.html:32-39`: `.contact-card a.mail`, serif clamp 22 to 27, `.row` gap 18.
- `about.html:60`, `about.html:98-102`: top bar CTA, contact card actions.
- `report.html:151`: report `:focus-visible` rule.
- `report.html:183-187`: report top bar CTA.
- `report.html:342-347`: `.reset` base and hover.
- `report.html:362-370`: `.actions` gap 14px 22px, `.pill`, `.textlink`.
- `report.html:381-401`: 760 breakpoint, `.reset` margin 4.
- `report.html:410-411`: print hides actions and reset.
- `report.html:430`, `report.html:637`, `report.html:671-679`: CTA markup, reset markup, contact block markup.
- `report.html:824-826`: reset click handler.

Related: [navigation](navigation.md), [inputs](inputs.md), [color and theme](../foundations/color-and-theme.md), [typography](../foundations/typography.md).
