# Tasks

Task groups are ordered by dependency. Each group lands the tests and the documentation its own work
calls for, so no group starts on top of undocumented work.

## 1. Baseline, repository, scaffold

- [x] 1.1 Run `git init`, add a `.gitignore` covering dependencies, build output, and local
      environment files, and commit the untouched static site. Verify: `git log --oneline` shows one
      commit and `git status` is clean.
- [x] 1.2 Tag that commit as the rollback baseline and confirm it contains all five documents, both
      stylesheets, the four scripts, and the two check scripts. Verify: `git ls-tree -r <tag> --name-only`
      lists them.
- [x] 1.3 Scaffold the application beside the existing documents, without deleting anything. Verify:
      the development server serves a placeholder surface and the old `index.html` still opens.
- [x] 1.4 Add the two check scripts' replacements as stubs wired to a single `check` command. Verify:
      the command runs and exits non-zero while the stubs are empty.
- [x] 1.5 Add the dependencies the task list already requires: `tailwindcss` with its PostCSS plugin
      for the theme block, `motion` for the two animated islands, `@base-ui/react` for the model's two
      slider controls, `ai` with `@ai-sdk/deepseek` and `@ai-sdk/react` for the model call and the
      conversation, `@visx/scale`, `@visx/axis`, `@visx/shape`, and `@visx/group` for figures 4 and 5,
      `vitest` for unit and contract tests, `playwright` with `@axe-core/playwright` for the browser
      passes, and one formatter and linter. Pin exact versions. Verify: a placeholder unit test and a
      placeholder browser test both run under the `check` command, no validation or state library is
      installed, the two model packages are absent from the client bundle, and the bundle contains
      nothing beyond the framework, the menu and transcript islands, and figure 5's controls.

## 2. Content model and fact registry

- [x] 2.1 Define the fact, provenance, and claim types as specified in `design.md` D4. Verify: the
      types admit a measured, a derived, an assumed, and a not-measured example, and reject a raw
      number where a fact is required (type-level test).
- [x] 2.2 Move every number from the README's provenance list into the registry with its unit,
      display form, provenance class, and mechanism. Verify: a test asserts the registry holds all
      15 documented figures, the count the README's provenance list actually contains, and that each has
      a mechanism.
- [x] 2.3 Implement the derived arithmetic as one pure module and unit-test it: daily to annual at
      365, human filing time at 20 seconds per record, and seller hours as volume times human share
      times session length times the 22% cut. Verify: tests assert 390,000 daily becomes 142,350,000
      annual and the default assumptions produce 782,925 hours.
- [x] 2.4 Add a build-time check that fails when a surface prints a numeric literal that is not
      sourced from the registry. Verify: a deliberately planted literal fails the check, then passes
      once replaced.
- [x] 2.5 Map provenance to the accent rule in one place: measured to indigo, assumed to clay,
      derived to indigo with its mechanism shown, not-measured to neutral. Verify: a test asserts the
      mapping and that no other class can request an accent.
- [x] 2.6 Write the content section of `design-system/` describing the registry, the provenance
      classes, and the single source rule. Verify: links resolve and the doc names every fact id.

## 3. Tokens, theme, and their checks

- [x] 3.1 Author the theme block: clear the colour namespace so no default palette exists, and define
      every contract role as an inline reference to a raw variable, with the light values in the root
      scope. Verify: an off-contract utility such as `bg-red-500` generates no CSS at all, while every
      contract role generates its utility.
- [x] 3.2 Put the dark values in an attribute scope and in an OS-preference scope that redefine the
      same raw variables, so one class string serves both themes. Verify: both themes render correctly
      and no `dark:` utility appears in the source.
- [x] 3.3 Declare the three families through the framework's font loader with their recorded weights
      and styles, map their variables into the font namespace of the theme block, and define the type
      steps, tracking, radii, measures, and the single spacing base there too, plus three named layout
      tokens for gutters and section rhythm. Verify: every contract value has a utility, no component
      uses a size outside the recorded scale, there is no hand-written face declaration anywhere, and
      the page makes no third-party font request.
- [x] 3.4 Resolve the six debt clusters from `design.md` D9 in the contract and the theme block
      together: one reading size, serif floor 20px, in-between sizes removed, one invitation size, one
      gutter value, clay's five places. Verify: the check fails if any value sits between two recorded
      steps.
- [x] 3.5 Replace the token check script with one that parses the theme block and the raw variable
      scopes and compares them to `DESIGN.md` front matter in both directions. Verify: mutating one
      role colour in `DESIGN.md` fails the check; reverting it passes.
- [x] 3.6 Close the escape hatches: a check that fails on an arbitrary value or a raw colour literal in
      any class string or inline style. Verify: a planted `bg-[#f6f6f3]` and a planted `p-[13px]` both
      fail the check, and pass once replaced with tokens.
- [x] 3.7 Implement the theme as a client effect applied after hydration, with the system preference as
      the painted default, and the control reading its state after mount. Verify: a reader with no
      stored choice sees the system theme from the first paint; a stored choice applies once
      interactive and holds across surfaces; with scripting disabled the system preference stands.
- [x] 3.8 Record measured contrast for every text pairing in both themes, and update the contract's
      floors with the dark theme's measured values. Verify: the recorded numbers match a measured run
      and every pairing meets text 4.5:1 and non-text 3:1.
- [x] 3.9 Rewrite the typography, colour and theme, and space and shape docs around the new values and
      the utility names. Verify: the docs state the same values as the contract, name no retired
      stylesheet, and `DESIGN.md` lints clean.
- [x] 3.10 Carry the print rules forward from the current stylesheets: black on white, no top bar, figures
      present, captions kept with their figures. They stay for now and can be dropped later if they add
      nothing. Verify: a print preview of the report and one marketing surface is legible, and no
      navigation furniture appears.

## 4. Frame and navigation

- [x] 4.1 Build the frame, top bar, navigation, one invitation, agent switch, theme control, skip
      link, and footer with the order the shell spec requires. Verify: all five surfaces render the
      same bar in the same order.
- [x] 4.2 Mark the current surface in a way assistive technology announces, including on the agent
      surface. Verify: a screen reader announces current on each surface, including the agent.
- [x] 4.3 Expand every control to a 44 by 44 target, including the theme control and the menu. Verify:
      measured boxes report at least 44 in both dimensions for every interactive element.
- [x] 4.4 Build the narrow-viewport navigation as a hand-written disclosure rather than a menu
      primitive, because it is navigation and not an application menu: open, close on Escape, close on
      selection, close on widen, focus into the panel on open, focus back to the control on close.
      Animate the panel's entry and exit with the motion library under one reduced-motion
      configuration. Verify: a scripted keyboard walk reaches every link and returns focus, with
      reduced motion the panel appears and leaves with no travel, and the markup exposes an expanded
      state rather than menu semantics.
- [x] 4.5 Confirm the skip link is the first focusable element and the focus indicator is 2px at 3px
      offset on every focusable element, including filled controls. Verify: a focus sweep across all
      five surfaces finds no element without a visible indicator.
- [x] 4.6 Rewrite the navigation, actions, and accessibility docs. Verify: the docs no longer cite a
      line number, and the accessibility doc's target table lists no failures.

## 5. Home surface

- [ ] 5.1 Build the home surface: hero statement, role, employer, and location badges, and the
      results band. Verify: visual parity with `preview/home.png` at 1440, and the band links to work.
- [ ] 5.2 Render every band result from the fact registry. Verify: changing one fact value changes the
      band with no other edit, checked by a test that mutates the registry.
- [ ] 5.3 Confirm no report furniture appears: no abstract, no numbered sections, no method. Verify:
      a review against the page-surfaces spec.

## 6. Work and about surfaces

- [ ] 6.1 Build the work surface: role rows, system rows, results, and deep links into the report.
      Verify: parity with `preview/work.png`, and every report link resolves to an existing anchor.
- [ ] 6.2 Keep employer-scoped figures on the work surface only, with the Meta figures rendered from
      the registry. Verify: a test asserts no Meta fact is referenced by the report or the home
      surface.
- [ ] 6.3 Build the about surface: bio, facts, contact card. Verify: parity with `preview/about.png`
      at 1440 and 390.
- [ ] 6.4 Move the contact address into one constant and render it everywhere it appears. Verify:
      changing the constant changes all 12 former occurrences, and a grep for the placeholder returns
      nothing.
- [ ] 6.5 Update the page-surfaces doc for home, work, and about. Verify: the doc's class list matches
      the components that shipped, and every link resolves.

## 7. Report surface

- [ ] 7.1 Build the report as its own document: masthead, abstract, numbered sections, method note,
      and closing contact block, sharing one reading column. Verify: parity with `preview/report.png`
      at 1440, and the column width is identical for prose and figures.
- [ ] 7.2 Author figures 1, 2, and 3 by hand: the submissions diagram, the two-bar index, and the
      104-cell unit grid. Verify: the rendered markup carries no colour literal and only contract
      roles, and the grid draws 104 cells with scripting disabled.
- [ ] 7.3 Build figures 4 and 5 with the visx toolkit: the cumulative line and the two-series band.
      Set every mark to a contract role, set tick and value type from the contract, and disable the
      library's entrance animation. Verify: both figures are present with scripting disabled, no mark
      or label takes a library default, and label size stays at or above the floor at 960 and 390.
- [ ] 7.4 Write the five captions so each states its assumption, and state in figure 1's caption that
      the three submissions are illustrative. Verify: a copy review against the report spec.
- [ ] 7.5 Build the model with two slider controls from Base UI held in local component state, the
      fixed 20-second assumption stated rather than adjustable, assumption and measurement marked
      differently, and outputs recomputed through the shared arithmetic module so the formula exists
      once. Initialise from the same constants the prerender used, style every slider part from
      contract roles, and give each control a readable value text. Verify: unit tests cover each
      control, the default render shows 782,925 hours with scripting disabled, the track and thumb are
      present in the delivered markup, each control measures at least 44px, and hydration produces no
      mismatch warning.
- [ ] 7.6 Delete the scroll reveal rather than porting it: figures are drawn, not revealed. Confirm the
      report is complete with scripting disabled: five figures, method note, default outputs, and
      readable prose. Verify: a script-off pass at 390 and 1440 shows every figure's marks, and no
      element starts at zero opacity, zero scale, or zero width.
- [ ] 7.7 Build in-page section navigation that states the current section and stays reachable on a
      narrow viewport. Verify: at 390 the navigation is reachable through a control, and the current
      section is marked while scrolling.
- [ ] 7.8 Confirm the stated reading time matches the word count, and update it if the copy changed.
      Verify: word count divided by the recorded rate equals the stated time.
- [ ] 7.9 Rewrite the report, evidence, and inputs docs. Verify: no line-number citations remain, and
      the figures doc states which figures are library-backed and which are hand-authored.

## 8. Agent surface

- [ ] 8.1 Build the agent as its own surface with a header, transcript, composer, and return control,
      carrying the switch as current. Verify: the surface renders at 860 column width and the return
      control points home on a direct arrival.
- [ ] 8.2 Put the chat hook in a provider rendered by the root layout, expose it through a context, and
      consume it from the agent surface, with the stream-resume option off. Verify: a question streams
      an answer, navigating away and back keeps both the transcript and any answer still arriving, a
      refresh leaves the transcript empty, and no transcript state exists outside the provider.
- [ ] 8.3 Implement message rows with author and time, keeping the streaming text out of any live
      region and giving a separate status region the final text once, so an answer is announced on
      completion or on withdrawal and never per fragment, without moving focus from the composer.
      Animate arrival with the motion library's presence support under the same reduced-motion
      configuration. Verify: a streamed answer produces exactly one announcement, a withdrawn answer
      announces only the refusal, focus stays in the composer, and with reduced motion the row appears
      at once in its end state.
- [ ] 8.4 Render inline anchors as links to a surface and anchor as they arrive, and keep the
      unmapped-answer note in the clay role. Verify: each rendered link resolves, and the note is the
      only clay element in the transcript.
- [ ] 8.5 Handle sending: Enter submits, the modifier inserts a newline, the maximum length is enforced
      before submit, a second submit while an answer is arriving is queued or visibly disabled, and
      stop is available while streaming. Verify: a scripted double submit produces two handled
      outcomes and no silent drop, and stop ends the stream without leaving a waiting row.
- [ ] 8.6 Build the failure row with a retry that reuses the hook's regenerate, replacing the waiting
      indicator on failure or timeout, and render a withdrawn answer as the refusal with no residue.
      Verify: an induced failure shows the row and a retry that succeeds, and a violation replaces the
      visible answer entirely.
- [ ] 8.7 Remember the originating surface and return there, by control and by Escape. Verify: arriving
      from work returns to work; arriving directly returns home.
- [ ] 8.8 Confirm suggestions are 44px targets and that each suggested question produces an answer.
      Verify: each suggestion is run through the answer path and none refuses.
- [ ] 8.9 Rewrite the chat and messaging docs. Verify: the docs describe the surface as it shipped and
      cite no line numbers.

## 9. Answer endpoint

- [ ] 9.1 Build the retrieval corpus from the content modules, one entry per anchorable section, with
      fact ids. Verify: a test asserts every section a reader could ask about has a chunk, and the
      build fails on a duplicate anchor.
- [ ] 9.2 Write the request and anchor guards as type predicates, so the compiler checks each parser
      against its declared type and the two cannot drift. Verify: unit tests cover a valid question, an
      empty one, an over-long one, a well-formed anchor, a malformed anchor, and an over-long turn
      list.
- [ ] 9.3 Create the provider client: the DeepSeek provider, the credential read from the server
      environment at request time, and the model id and output cap pinned in one constant. Verify: the
      model id appears in exactly one place, the key is never read outside the server module, and both
      provider packages are absent from the client bundle except the hook's own module.
- [ ] 9.4 Implement the endpoint as a stream using the SDK's own streaming response, parsing the
      request first and passing the answer through the guard before it is forwarded. Verify: contract
      tests assert 200, 400, and 502, and that invalid requests never open a stream.
- [ ] 9.5 Implement the stream guard: hold back a trailing fragment that could still become a numeral,
      trace each completed numeral against the retrieved digits, and resolve each anchor as it arrives.
      Verify: unit tests split a numeral and an anchor across chunk boundaries and neither is released
      early.
- [ ] 9.6 Implement withdrawal: on any guard failure, end the stream, discard the remainder, and render
      the refusal in place of the visible answer. Verify: an invented rate mid-answer leaves exactly
      the refusal sentence on screen.
- [ ] 9.7 Make the refusal byte-identical to the recorded sentence. Verify: a test compares the refusal
      to the constant exactly.
- [ ] 9.8 Enforce the rule that history is context and not evidence, refusing a question that is only
      answerable from earlier turns. Verify: a follow-up about something never stated on the site
      refuses, and a follow-up about a site claim still cites.
- [ ] 9.9 Validate the return parameter against an enum allowlist with a home fallback, so no value can
      redirect off site. Verify: a foreign URL in the parameter lands on home.
- [ ] 9.10 Pin the model, the input ceiling, and the output cap in one constant, and confirm no
      credential reaches the client. Verify: the model id appears once, a scan of the client bundle
      finds no secret, and an over-long question is rejected at 400.
- [ ] 9.11 Build the question suite of about 30 realistic questions with their expected anchors, and
      record refusal rate, false refusals, withdrawal rate, and the measured cost of one question.
      Verify: the suite runs in the `check` command, asserts no answer contains an untraced numeral,
      and the numbers are written into the README's agent section.

## 10. Context documents and checks

- [ ] 10.1 Rewrite `AGENTS.md` around the new layout, commands, and hard rules, removing every rule
      that described the retired medium. Verify: a reader can follow its commands and none fails.
- [ ] 10.2 Rewrite `README.md`: what the site is, how to run it, the number provenance, and the agent's
      behaviour, with the stale "replace before launch" list reduced to what is still outstanding.
      Verify: every claim in it is true of the shipped build.
- [ ] 10.3 Update `DESIGN.md` with the six resolved clusters and confirm it still lints clean. Verify:
      `npx -y @google/design.md lint DESIGN.md` reports 0 errors and 0 warnings.
- [ ] 10.4 Replace the artifact coverage check with one that enumerates the source tree, excluding
      dependency and build directories, and requires each file to be named in a context doc. Verify:
      it passes on a clean tree and fails on an added unnamed file.
- [ ] 10.5 Confirm no document in the repository cites a line number or a selector as the unit of
      specification. Verify: a grep for the retired citation pattern returns nothing.

## 11. Launch readiness

- [ ] 11.1 Replace the placeholder address with the real one and confirm every former occurrence
      renders from the single constant. Verify: a grep for the placeholder returns nothing.
- [ ] 11.2 Configure the production origin `https://vansiriso.uk` in one constant, redirect `www`
      and plain `http` to it, and build each surface's canonical address and share metadata from that
      constant. Verify: each canonical is absolute, begins with `https://vansiriso.uk`, resolves to
      its own surface, and no two surfaces share one; `www` and `http` requests land on the apex.
- [ ] 11.3 Build the missing-page surface in the site frame with a route back. Verify: an unknown
      address renders it with the shared bar.
- [ ] 11.4 Produce the share image and confirm it is legible at thumbnail size. Verify: a preview
      render shows the site's own image.
- [ ] 11.5 Decide the résumé question and either publish it at a stated address or remove any
      implication that one exists. Verify: the route is real or absent everywhere.
- [ ] 11.6 Confirm no third-party requests occur beyond those a reader's action causes. Verify: a
      network log on each surface, including the agent.
- [ ] 11.7 Define the crawler rules, a sitemap, and a person schema for structured data, choosing the
      details at build time. Verify: both crawler files name the production origin only, the sitemap
      lists every surface and no preview host, and the structured data validates.

## 12. Cutover and integration

- [ ] 12.1 Switch every address to the new medium and remove the retired documents, stylesheets,
      scripts, and the five font files in one commit. Verify: all five addresses resolve, no reference to
      a retired path remains, and `git show --stat` shows only retirements.
- [ ] 12.2 Run the full surface pass at 390, 768, and 1440 in both themes and record the result.
      Verify: no horizontal overflow, no failed contrast, no missing target.
- [ ] 12.3 Run the script-off pass across all five surfaces. Verify: every figure and the report's
      default outputs are present, and the theme follows the system preference.
- [ ] 12.4 Run the keyboard and screen-reader pass across all five surfaces. Verify: skip link first,
      focus visible throughout, menu focus contained and returned, answers announced.
- [ ] 12.5 Record total transferred script per surface, including the motion runtime and the chat
      provider that every surface now carries, and write the numbers into the README. This is a record,
      not a gate: there is no budget to fail.
- [ ] 12.6 Regenerate the review screenshots and remove the ones that show the retired medium. Verify:
      every screenshot referenced by a doc is current.
- [ ] 12.7 Confirm the baseline tag still restores a working site. Verify: check out the tag in a
      scratch worktree, open the home surface, and confirm it renders.
- [ ] 12.8 Run the reduced-motion pass across all five surfaces: no transition runs, the menu and the
      transcript land in their end state, and no content is hidden behind motion that will not play.
      Verify: with the preference set, a recorded sweep finds no travel and nothing missing.
- [ ] 12.9 Decide the supported browser floor, record it in the README, and check every surface against
      it. Verify: the floor is stated, and the oldest supported browser renders every surface with its
      figures and inputs intact.

## Workflow follow-up

- A later change adds localization: translated copy, per-locale corpora and refusal, formatted numbers,
  `hreflang` alternates, and per-locale canonical and share metadata. It depends on this change rather
  than overlapping it.
- A later change carries the rest of accessibility: the uppercase legibility floor, forced-colors and
  increased-contrast modes, text spacing and reflow at 200 percent, and a screen reader matrix across
  platforms. The floor this change crosses is listed in `design.md` under goals and non-goals.
- Archive this change once the launch blockers are closed and the cutover has been reviewed.
- After archiving, confirm the six capability specs are the main specs and that `openspec list --specs`
  reports them.
