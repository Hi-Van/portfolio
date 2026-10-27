---
title: Pages
group: Surfaces
status: current
reviewed: 2026-10-27
sources:
  - web/app/page.tsx
  - web/app/work/page.tsx
  - web/app/about/page.tsx
  - web/components/home/results-band.tsx
  - web/components/home/contact-strip.tsx
  - web/components/work/role-row.tsx
  - web/components/about/contact-card.tsx
  - web/components/evidence/badge.tsx
  - web/content/home.ts
  - web/content/work.ts
  - web/content/about.ts
---

# Pages

Home, work, and about share the 1040px frame and the one bar. Each answers a different question, and none of them carries report furniture: no abstract, no numbered sections, no method table, no figures.

## Home

Answers "who is this and what did they ship" in about a screen and a half.

```
Van Sirisouk                        display-home, 104px
● Software Engineer II at Atlassian in New York      badges
I build the systems behind product data…             statement, 544px
[See the work]  Read the report                      outlined action + text link
──────────────────────────────────────────────────
450,000        │ 390,000        │ 30%               results band, three cells
records/second │ submissions/day│ faster queries
…              │ …              │ …
What 22% is worth at scale                            link into the report
──────────────────────────────────────────────────
Hiring, referring, or just curious                    contact strip
hello@vansirisouk.com
```

- **The heading** is the person's name at the 104px display step with the single display tracking value.
- **The badges** state role, employer, and location. Neutral fill, hairline border, no accent. A 8px ink dot marks the current role, and its word "Currently" is present for a screen reader rather than implied by the dot.
- **The statement** holds a 544px measure so a lede does not run the width of the reading column.
- **The two actions** are an outlined action and a text link. Neither is filled: the only filled invitation is Contact in the bar.
- **The results band** is three cells separated by hairlines, each cell a link into the work surface. The numbers come from the fact registry and are indigo because they are measurements. A test mutates a fact and asserts the band follows it.
- **The band link** names the 22% cut and points at the report.
- **The contact strip** closes the surface with one address and one route onward.

## Work

Answers "where, when, and what did he build there".

```
Work                                             display-page
Four years of moving product data between…       lede, 544px
─────────────────────────────────────────────────
Atlassian          Software Engineer II, Growth  role row
Jun 2025 to now    …
New York           …
Walmart Global Tech  Software Engineer, …        role row
Aug 2023 to May 2025 …
Bentonville        …                             three system rows
                   Catalog cleanup     30% faster queries
                   Attire intake       450,000 records a second
                   Seller submissions  390,000 a day
Meta               Software Engineer Intern, FAIR AI
                   Model input         600,000 queries a second
                   Scoring path        350% platform performance
                   Model build         67% smaller build
Before 2023        Where I started
```

- **A role row** is a three-column grid: employer, period, and place in the first column, title and description in the other two. It stacks below the medium breakpoint.
- **A system row** is a name that links into the report, a one-line description, and the figure to the right. Every figure is a registry fact, so the audit trail and the number cannot disagree.
- **Employer scoping** holds here: the three Meta figures appear on this surface and nowhere else, and a test asserts that no Meta fact is reachable from home, the report, or the agent's corpus.
- **Deep links** carry the reader into the report section that explains the system. Every link is checked against a real anchor.

## About

Answers "who is this and how do I reach him".

```
About                                            display-page
                             │ Currently   Software Engineer II, …
Four paragraphs of bio       │ Based in    New York, NY
at the reading size and      │ Experience  Four years
the reading measure          │ Focus       Product data, growth
                             │ ────────────────────────────
                             │ Hiring, referring, or just curious
                             │ hello@vansirisouk.com
                             │ Email is fastest…
                             │ The full report
```

- **The bio** is four paragraphs at the reading size on a two-thirds column, so the line length stays inside the reading measure.
- **The facts list** is a definition list with uppercase keys and a hairline between rows. Keys use the caps step at 10px, which is the floor.
- **The contact card** carries one address, one sentence about it, and one route into the report.

## Shared rules

- One bar, one order, one gutter at every width, and no horizontal overflow at 390px.
- Every surface is prerendered and complete without scripting.
- Every surface ends with the footer, which repeats all five routes and the address.
- No number appears outside the fact registry. A build check scans JSX text for digits.
- The address is written once, in `web/content/site.ts`, and read everywhere. A test asserts the literal appears in no other source file.

## Measured

| Surface | Check |
| --- | --- |
| Home | Heading, three badges, statement, three band links, no report furniture |
| Work | Six system rows with registry figures, Meta figures scoped, every report anchor resolves |
| About | Bio, four facts, contact card, no overflow at 390 |
| All | Every `mailto:` equals the one constant; no surface scrolls horizontally at 390 |

## Source

- `web/app/page.tsx`, `web/app/work/page.tsx`, `web/app/about/page.tsx` for composition.
- `web/components/home/results-band.tsx` for the band's data path.
- `web/components/work/role-row.tsx` for roles and systems.
- `web/components/about/contact-card.tsx` for the closing block.
- `web/content/home.ts`, `work.ts`, `about.ts` for the copy.
- `web/tests/e2e/home.spec.ts`, `work.spec.ts`, `about.spec.ts` for the assertions.
