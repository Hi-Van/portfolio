# scripts/

The gate and three generators. Every check exits non-zero on failure and prints what to do about it.

## The checks

| Script | Fails when | Fix by |
|---|---|---|
| `check.mjs` | Any step fails | Read the failing step's output |
| `check-tokens.mjs` | The stylesheet and `DESIGN.md` disagree, a role is missing from the theme block, or a raw variable is missing from one of the three scopes | Change the stylesheet or the contract, deliberately, then both |
| `check-artifacts.mjs` | A source file is named in no context document | Name it in `AGENTS.md`, `README.md`, `DESIGN.md`, or a design-system doc |
| `check-content.mjs` | A JSX text node contains a digit | Render a registry fact, or annotate the line `content-literal-ok` |
| `check-styles.mjs` | An arbitrary value, a raw hex, or a `dark:` variant appears in a component | Use a contract token; add a token first if it is missing |
| `contrast.mjs` | A text pairing falls below AA in either theme | Change a colour role in the contract and every token copy |
| `check-bundle.mjs` | The build fails, a removed library is installed, or a model module reaches a client chunk | Remove the dependency or move the import server-side |

`check.mjs` runs every step and reports each one, so one failure does not hide the next. `lib/tokens.mjs`
holds the shared parsing: the contract reader, the block reader, and the theme-block reader.

## The generators

These need a running server. They are not part of the gate.

| Script | Produces | Run with |
|---|---|---|
| `make-og.mjs` | `public/og.png` at 1200 by 630, rendered from the home surface | `BASE_URL=... node scripts/make-og.mjs` |
| `capture.mjs` | `../preview/*.png`: five surfaces in both themes, three narrow, the menu open | same |
| `measure.mjs` | Transferred script and CSS per surface, as a table | same |

Use `localhost`, not `127.0.0.1`: Next blocks cross-origin dev requests from that host, the client never
hydrates, and the captures come out inert.

## Adding a check

1. Write it as a standalone script that exits non-zero and prints the fix.
2. Add it to the `steps` array in `check.mjs`. Do not let a new rule pass silently.
3. Add the file to `AGENTS.md` so `check-artifacts` accepts it.
4. If it needs to parse the contract, use `lib/tokens.mjs` rather than a second parser.

Two habits that matter here: a check must fail on a planted violation before you trust it, and a check
must print the file and line a reader needs, not just "invalid".

## Don't

- Don't add an `--fix` mode to a check that enforces a design decision. The decision should be visible
  in a diff.
- Don't exclude a directory to make a check pass. Change the rule or the file.
- Don't let a generator write into `app/` or `components/`. Generated artefacts stay in `public/` or
  `../preview/`.
