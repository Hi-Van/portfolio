---
title: The feel of the site
group: Narrative
status: current
reviewed: 2026-10-26
sources:
  - DESIGN.md
  - README.md
  - assets/site.css
  - assets/tui.css
  - preview/
---

# The feel of the site

A portfolio usually asks to be admired. This one asks to be checked. Van Sirisouk builds the systems behind product catalogs, and the site is arranged around one claim: the numbers in that work are measurements with edges, not ornament. A recruiter who gives it thirty seconds should leave with three quantities and the sense that they could be verified. A reader who stays should find the arithmetic, the two assumptions it rests on, and the row that admits what was never measured.

## Four materials

The ground is white, `#ffffff`, and stays white. No cream, no grain, no paper texture. Ink is `#131a2b`, navy enough to read as ink at 104px and dark enough to read as black at 12px. Surfaces separate with a light panel (`#f6f6f3`) and two hairlines, nothing else. No shadows apart from the range thumb, and no gradients, including the chart bands, which are flat fills.

Indigo (`#2b3a8f`) belongs to measurement: the three result numbers, the report's section numerals, chart marks, the links that lead toward data. Clay (`#95522c`) belongs to assumption, and appears in four places in the report: the italic Abstract label, the inference in Figure 1, the Assumed row of the method table, the two values above the sliders. The chat adds one more, the note that says an answer is not stated on the site. It is the only warm color on the site, and the warmth is the point. A reader should feel the difference between a number that was recorded and a number someone chose.

Rectangles carry facts: badges at 4px, figure panels at 10px, the abstract at 12px, the secondary action as a 6px outlined rectangle. The pill is for a person speaking, and a page gets one filled pill, Contact in the top bar. The report bends that rule once, with Email me at the end.

## Three voices

Instrument Serif states. Weight 400, tracking `-0.02em` on every h1. At 104px the name looks drawn rather than typed, so the line under it can be plain. At 94px the report title takes the 960px masthead inside the 1040 frame before the column narrows to the 720 measure.

Literata explains, at 19px and 1.66 leading, about 80 characters to the line. The reason is structural: figures and prose share one 720 column, and the charts need the width more than the sentences need a shorter line. The leading pays for it. In the chat the same face runs at 16.5px, one step down, the single documented exception to the scale.

Instrument Sans operates: captions at 13, labels at 12.5, chart labels at 15 units with values at 17, uppercase keys at 10 with 0.1em tracking, because uppercase without tracking closes into a block. It labels. It never argues.

## Thirty seconds

Home is a screen and a half. The name, three badges joined by the words at and in, then one sentence about what he builds. The badges are neutral, hairline bordered, because a job title is a fact and not a category. Two actions: an outlined rectangle reading See the work, a text link reading Read the report.

Then the band: 450,000 records per second, 390,000 submissions a day, 30% faster queries, each number serif at up to 50px in indigo, each with a unit and a sentence that states the consequence. One second of the pipeline replaces 104 days of filing. Each cell is a link, and hovering fills it with a 4% ink wash while the number stays indigo. Under the band, one line, "What 22% is worth at scale", which goes to the model instead of restating it. Curiosity here is a matter of scale. Nothing says passionate. It says 104 days.

## The report earns the rest

The report is where the site stops asserting. A 94px masthead, a 44 character deck, a byline with a date and a three minute read. The abstract sits in a panel, labeled in serif italic and clay, and its first line sets the tone: "The results read like small numbers."

Figure 1, under the heading "The same shirt, six ways", is a diagram rather than a chart: three supplier submissions, "Navy tee, M", "Tee / Navy / Medium", "T-SHIRT NVY MD", resolving along a hairline into one record, Crew tee, Navy, SKU CT-NVY-M, with a caption calling it illustrative. Figure 3 sets one second of pipeline against 104 person-days of filing and names the 20 seconds as an estimate. Figure 4 labels 142.4 million annual submissions a projection, not a count.

Figure 5 is the turn: 782,925 seller-hours returned in a year, above a chart with two sliders. 25% of traffic done by a person, a 6 minute baseline session, both printed in clay, both adjustable. "The model below makes the last two numbers yours to change." Until then the reader has been shown numbers. Here they move one and watch the total answer, which is where a number becomes a model with named inputs.

The method table follows, four rows: measured in indigo, derived in a lighter indigo, assumed in clay, and a fourth with no color reading "Not measured: revenue", because a dollar figure would have been invented. That row is the conscience of the design. A site that will not print revenue has earned the right to print the rest.

## The chat is a room

The switch links to `ask.html` and stays on while you are there. The page opens with "# ask-van", a status dot, and four words: reads this site only. Replies carry an author, a time, a small uppercase BOT tag, and a source line, "SOURCE report · what it adds up to", with the links in indigo.

The agent is a keyword index of 13 topics across the four content pages, no network call, no model. Anything outside it gets a fixed reply and a clay note: "Not stated on the site." That refusal is why the room can be trusted. A bot that guessed would undo the method table in one answer. This one declines, and the decline is set like a footnote.

Enter sends, the arrows walk history, Escape returns by the `from` parameter. They print under the composer at 10.5px.

## The seam

The bar does not change between pages. The light under it does. In the light theme the chat ground is `#f6f6f3` instead of white; in dark it is `#1a1f2b` instead of `#0c1018`. The room is always one step off the page, in whichever direction the theme is going, so the shift reads as a different room in the same building. The composer is a 44px pill with a hairline inside its edge, indigo on focus, and the send is a separate 44px circle filled indigo with the arrow cut out in the ground color. It is a control, not a second invitation.

## What it refuses

No warm paper nostalgia: no cream stock, no grain overlay, no photograph of a desk. No dashboard density: no KPI card grid, no sparkline in the header, no sidebar. No third accent: color has to mean measured or assumed, and badges, navigation, captions and role metadata stay neutral. No decorative motion: nothing moves on load, nothing parallaxes, no card scales under the cursor. Charts reveal once when reached, and `prefers-reduced-motion` sets them in place at once. No invented numbers. No bot that guesses.

What the site wants is a sequence, not a single impression. Interest on the first screen, from a name set large and three quantities too big to be casual. Trust by the abstract, because it names the years, the company, and which results are small. Then, at the sliders, the understanding that the numbers were never decoration. They were there to be argued with. The one warm color is the color of the part you can change.
