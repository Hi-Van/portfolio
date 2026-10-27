# scripts/

This folder holds the six checks that hold the stylesheet, the copy, the context docs, and the client
bundle to `DESIGN.md` and the design-system docs, the runner that runs them, and three generators that
write review artefacts from a running server. Nothing here is a page, and no file here is imported by
the application or shipped to a reader. This file, `web/scripts/AGENTS.md`, is the folder's map, and
`check-artifacts.mjs` reads it as context.

## Every script

Run each from `web/`. `check-content.mjs`, `check-styles.mjs`, `check-bundle.mjs`, and the three
generators resolve their paths from the working directory; `check-tokens.mjs`, `contrast.mjs`, and
`check-artifacts.mjs` resolve from their own location. `web/` is the directory the gate uses and the
one the generators write into. Only two checks have an npm alias (`check:tokens`, `check:artifacts`);
the rest are called as `node scripts/<name>.mjs`.

| Script | Fails when | Fix by |
|---|---|---|
| `web/scripts/check.mjs` | Any of its eight steps exits non-zero. It runs all eight regardless | Read the `== name: FAIL ==` block; its step printed the reason. Run that script alone, then the gate |
| `web/scripts/check-tokens.mjs` | The keys parsed from `colors:` in `DESIGN.md` differ from the keys of `ROLE_MAP`; a mapped variable such as `--ink` or `--indigo` is missing from `:root` or is not the contract hex (case is ignored); its `--color-` name is missing from `@theme inline`; a `:root` variable is missing from a dark scope, or a dark variable is missing from `:root` | Change the contract, `web/app/globals.css`, and `web/scripts/lib/tokens.mjs` in one edit. Dark and system values are compared by name, never by value |
| `web/scripts/check-artifacts.mjs` | A file under `web/app`, `web/components`, `web/content`, `web/lib`, `web/scripts`, `web/tests`, or one of the eight root entries listed below, is not a substring of the context docs | Name the full `web/...` path in an `AGENTS.md`, `README.md`, `DESIGN.md`, or a file under `design-system/` |
| `web/scripts/check-content.mjs` | A line in a `.tsx` under `web/app` or `web/components` holds a JSX text node with a digit and no `content-literal-ok` on that line | Render the value from `web/content/facts.ts`, or annotate the line when the number genuinely is not a fact |
| `web/scripts/check-styles.mjs` | A line in a `.tsx` under `web/app` or `web/components` holds a hex colour, a `dark:` variant, or a bracketed utility whose bracket contains a digit or `#` | Use a role utility. If the value is missing, add it to the theme block in `web/app/globals.css` first |
| `web/scripts/contrast.mjs` | One of its eleven fixed pairings falls below 4.5:1 for text or 3:1 for an indicator, in `:root` or `[data-theme="dark"]` | Change the role in `DESIGN.md` and in the matching scopes of `web/app/globals.css`. The failure is a table row, with no fix line |
| `web/scripts/check-bundle.mjs` | `zod`, `zustand`, `swr`, `valibot`, or `@upstash/redis` appears in `dependencies` or `devDependencies`; `next build` exits non-zero; or a `.js` chunk under `.next/static` matches `/deepseek/i`, `DEEPSEEK_API_KEY`, or `@ai-sdk/deepseek` | Remove the dependency, fix the build, or move the import behind `web/app/api/ask/route.ts` |
| `web/scripts/lib/tokens.mjs` | Not a step. It throws `no front matter`, `missing block: <selector>`, or `unbalanced braces` when `DESIGN.md` or the stylesheet stops matching what it parses | Restore the shape it parses, or change the parser and every caller in the same edit |
| `web/scripts/make-og.mjs` | No pass or fail. It throws when the server is unreachable or Chromium is absent | Start a server; keep `BASE_URL` on `localhost` |
| `web/scripts/capture.mjs` | No pass or fail, same as above | Same |
| `web/scripts/measure.mjs` | No pass or fail, same as above. It only prints | Same |

`web/scripts/check-content.mjs` and `web/scripts/check-styles.mjs` report `path:line` with the path
relative to `web/`. `check-artifacts.mjs` reports repo-relative paths. `check-tokens.mjs` names the
variable and the `DESIGN.md` key instead of a line, and `contrast.mjs` names the theme and the pairing.
`check-bundle.mjs` stops at the first marker it finds and names the chunk.

## How the runner reports

`web/scripts/check.mjs` runs eight steps in a fixed order: tokens, artifacts, content, styles,
contrast, unit, e2e, bundle. Each step is a child process with its output inherited, framed by a
header and a verdict:

```
== styles ==
check-styles: these bypass the token set
  app/page.tsx:41 arbitrary value  p-[13px]
Use a contract token, or add the value to the theme block in app/globals.css.
== styles: FAIL ==
```

The last line is `all checks passed` or `N checks failed`, and the process exits 1 if any step failed.

It does not stop at the first failure because the steps answer separate questions, and one failing
rule should not hide the next. The cheap static checks run first, so a broken token is reported before
anything spends a minute; the browser pass and the production build are last. The `unit` step runs
Vitest over every test it finds and the `e2e` step runs Playwright on Chromium only; the other two
engines are `npm run test:browsers`. The runner takes no arguments and has no filter, so run one
script directly when you are iterating:

```bash
cd web && node scripts/check-styles.mjs
```

## What needs a server

| Script | Produces | Command, from `web/` |
|---|---|---|
| `web/scripts/make-og.mjs` | `web/public/og.png`, a 1200 by 630 capture of the home surface | `node scripts/make-og.mjs` |
| `web/scripts/capture.mjs` | 14 PNGs in `preview/`: the five surfaces in both themes at 1440 by 1000, three narrow ones at 390 by 844, and the menu open | `node scripts/capture.mjs` |
| `web/scripts/measure.mjs` | No file. A table of js, css, and total KiB per surface on stdout | `node scripts/measure.mjs` |

All three default to `http://localhost:3000` and accept `BASE_URL` for another host. Use `localhost`,
never `127.0.0.1`: Next blocks cross-origin dev requests from that host, the client never hydrates, and
the captures and the share image come out inert.

None of the three is in the gate. The only step that starts a server is `e2e`: `web/playwright.config.ts`
runs `npm run dev` and reuses a server already on port 3000 unless `CI` is set. The gate therefore
builds once, in the `bundle` step, and the browser pass runs against a dev server. `measure.mjs` reads
resource timing and falls back to encoded size when a response was cached, so its numbers are only the
reader's payload when the server is `npm start` after `npm run build`; a dev server inflates them.

## What `check-artifacts.mjs` counts

| Set | Entries |
|---|---|
| Source | everything under `web/app/`, `web/components/`, `web/content/`, `web/lib/`, `web/scripts/`, `web/tests/`, plus `web/next.config.ts`, `web/vitest.config.mts`, `web/playwright.config.ts`, `web/biome.json`, `web/package.json`, `web/tsconfig.json`, `web/proxy.ts`, `web/public/og.png` |
| Context | every `AGENTS.md` under `web/`, the repo's `AGENTS.md`, `README.md`, `DESIGN.md`, and every file under `design-system/` |
| Skipped | `node_modules`, `.next`, `.git`, `test-results`, `playwright-report`, `coverage`, `.opencode`, `preview`, `assets`, `openspec`, and the `AGENTS.md` files themselves |
| Grouped | any file under `web/tests/` passes once `web/tests/` is named somewhere, so individual test files need no entry |

Matching is a substring of all the context text joined together, so a path in a table or a code block
counts, and a partial path does not.

## Adding a check

1. Write `web/scripts/check-<subject>.mjs` as Node ESM, using the node standard library rather than a
   new dependency. Resolve inputs from the working directory, the way the existing scripts read
   `app`, `components`, `package.json`, and `.next`.
2. Collect every violation instead of exiting at the first, print `path:line reason` for each, print one
   sentence saying what to do, and exit 1. On success print a count that proves it scanned something.
3. Plant a violation and watch the script fail before you trust it. Revert the plant.
4. Add it to `steps` in `web/scripts/check.mjs`, keeping the static checks before `unit` and `e2e`,
   anything that builds after them, and `bundle` last.
5. Name `web/scripts/check-<subject>.mjs` in this file, then confirm with
   `cd web && node scripts/check-artifacts.mjs`.
6. If it reads `DESIGN.md` or the scopes in `web/app/globals.css`, import from
   `web/scripts/lib/tokens.mjs` rather than writing a second parser.
7. Run `npm run check` and check that the new step reports `pass` in the summary.

## Two habits

- **A check is trusted only after it has failed on a planted violation.** A check that scans nothing
  exits 0 and reports a count, so read the count as well as the exit code: tiny means the paths or the
  file filter were wrong. The gate itself was built this way: the first commit shipped two check stubs
  that failed on purpose, so the runner was proven to report a failure before either real check
  existed.
- **A check names the place a reader has to open.** `check-content.mjs` and `check-styles.mjs` print
  `path:line`; `check-artifacts.mjs` prints the repo-relative path; `check-tokens.mjs` names the token
  and the contract key. "Invalid" on its own sends the reader back to the source to guess.

## Gotchas

- **A text node that contains an interpolation is not scanned.** `check-content.mjs` matches `>` then
  text without braces then `<`, so `<p>1 million {unit}</p>` and `<p>{fact} of 12 months</p>` both
  pass. The digit has to sit alone between the tags to be caught. The scan is also line by line: a
  digit on a continuation line has no `>` before it and is missed.
- **The content exemption covers the whole line.** `content-literal-ok` anywhere on a line exempts
  every digit on that line, so annotate a line that holds one number.
- **`check-styles.mjs` reads `.tsx` only.** A hex in `web/app/globals.css` is the token definition and
  is expected, but a hex in a `.ts` file or in a `.css` file is not checked. The hex rule also matches
  anywhere on the line, comments included, so a comment quoting `#fff` fails.
- **The arbitrary-value rule deliberately allows brackets with no digit or `#`.** `aria-[current=page]`,
  `data-[selected]`, and `[&>svg]:block` pass; `p-[13px]` and `grid-cols-[1fr_2fr]` fail. That is why
  state variants from Base UI survive.
- **The system-preference scope is checked by name only.** `check-tokens.mjs` requires each raw
  variable to exist in `[data-theme="dark"]` and in `:root:not([data-theme="light"])`, but
  `contrast.mjs` measures only `:root` and `[data-theme="dark"]`. A value that is wrong only in the
  system-preference scope passes both.
- **The block readers match exact selector text.** `:root {`, `[data-theme="dark"] {`, and
  `@theme inline` are found by string. Reformatting the space before a brace throws `missing block`,
  and if `@theme inline` is gone, `readThemeNames` silently falls back to the first brace in the file
  instead of throwing.
- **The contract reader parses one shape.** `readContract` takes two-space-indented lowercase keys with
  a quoted hex value. A role written any other way is invisible, so it can be added to `DESIGN.md`
  without the "changed shape" message firing.
- **`check-bundle.mjs` matches `/deepseek/i` in every client chunk.** A visible sentence that names the
  provider fails the bundle even when no model module ships. Its header comment promises per-route
  script, but the code prints a chunk count and one total; `measure.mjs` is the per-route source.
- **`check-bundle.mjs` owns `.next` while it runs.** It starts `next build` itself, so do not run it
  beside `next dev` or a Playwright run.
- **The generators write relative to the working directory.** `capture.mjs` writes `../preview` and
  `make-og.mjs` writes `public/og.png`; run both from `web/` or the output lands beside wherever you
  were. `preview/` is excluded from the artifact check, so the 14 captures never need naming, and
  `web/tests/e2e/launch.spec.ts` checks `web/public/og.png` is a 1200 by 630 PNG but not that it is
  current.

## Which docs each step enforces

| Step | Enforces | Doc |
|---|---|---|
| tokens | Eight role colours, the three themed scopes, and the `@theme inline` mapping | `design-system/foundations/color-and-theme.md`, the Colors section of `DESIGN.md` |
| contrast | AA floors for text and indicators, in both themes, on page and panel | `design-system/foundations/color-and-theme.md`, `design-system/foundations/accessibility.md` |
| styles | No arbitrary value, raw colour, or `dark:` variant in a component | `design-system/foundations/color-and-theme.md`, the Styling section of `web/components/AGENTS.md` |
| content | Every number comes from the registry | `design-system/foundations/content-and-provenance.md` |
| artifacts | Every source file is findable from a navigation document | the Coverage map in `design-system/README.md` |
| bundle | No removed dependency returns, and no model package or credential reaches the client | the Credential section of `web/lib/AGENTS.md`, `design-system/surfaces/chat.md` |
| unit, e2e | The requirements themselves: the registry, the arithmetic, the guard, the frame, the theme, print, the launch surface | `web/tests/AGENTS.md`, `openspec/specs/<capability>/spec.md` |

## Don't

- Don't add an `--fix` mode to a check that enforces a design decision. The decision should be visible
  in a diff.
- Don't exclude a directory to make a check pass. Change the rule or the file.
- Don't let a generator write into `web/app/` or `web/components/`. Generated artefacts stay in
  `web/public/` or `preview/`.
