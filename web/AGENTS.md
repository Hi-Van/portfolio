<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# web/

The Next.js application that serves the site. Five prerendered surfaces, one dynamic answer endpoint, no
database, no analytics. The design contract is `../DESIGN.md`, the component reference is
`../design-system/`, and the durable capability specs are `../openspec/specs/`.

## Where to start

| You are asked to | Read |
|---|---|
| Change a page's composition or copy | `app/AGENTS.md`, then `../design-system/surfaces/` |
| Add or restyle a component | `components/AGENTS.md`, then the matching doc in `../design-system/components/` |
| Add or move a number | `content/AGENTS.md`, then `../design-system/foundations/content-and-provenance.md` |
| Touch the agent's answers or citations | `lib/AGENTS.md`, then `../design-system/surfaces/chat.md` |
| Add or fix a check | `scripts/AGENTS.md` |
| Write or repair a test | `tests/AGENTS.md` |
| Know what the site is meant to guarantee | `../openspec/specs/<capability>/spec.md` |

Each subdirectory has its own `AGENTS.md`. Read the one for the folder you are editing before the root
one; the root file carries the rules, the folder files carry the map.

## The tree

```
app/        routes, layout, providers, the answer endpoint, the theme layer
components/ everything that renders; grouped by what the reader is doing
content/    the fact registry, page copy, the agent's corpus, formatting
lib/        logic with no JSX: the ask pipeline, metadata helper
scripts/    the checks, and the three generators (og, captures, measurement)
tests/      unit, browser, and compile-time assertions
public/     og.png, the share image, generated from the home surface
proxy.ts    one canonical host: www and http to the apex
```

## Commands

```bash
npm run dev              # localhost:3000
npm run build            # prerenders the five surfaces
npm run check            # the gate: eight steps, reported separately
npm run test:browsers    # the integration pass in Firefox and WebKit
npm run lint             # biome
node scripts/capture.mjs # screenshots, needs a running server
node scripts/measure.mjs # transferred script per surface, needs a running server
```

`npm run check` exits non-zero if any step fails. It builds twice, once for the bundle scan and once
inside Playwright, so it takes about a minute. Run it before you claim anything is done.

## Invariants that bite in here

- **A number comes from `content/facts.ts`.** `scripts/check-content.mjs` fails on a digit in a JSX
  text node. Report prose uses `{fact-id}` placeholders instead of literals.
- **Colour comes from a role.** The Tailwind colour namespace is cleared in `app/globals.css`; an
  off-contract colour has no utility. `check-styles.mjs` fails on an arbitrary value, a raw hex, or a
  `dark:` variant. One token set serves both themes through raw variables, so never write `dark:`.
- **Only four things are interactive**: the theme control, the narrow-viewport disclosure, the model's
  two sliders, and the agent room. Everything else is a server component. Do not put a client
  boundary around a surface.
- **Content is visible before scripting runs.** Nothing may start at zero opacity or zero scale and
  wait for an animation. The agent's withdrawal is the only deliberate exception.
- **The frame and the floor are fixed.** 1040px frame, 720px reading column, 32px gutter, 44px targets,
  a 2px focus ring at 3px offset. A layout that does not fit changes, not the floor.

## The two request shapes

```
GET /work            prerendered at build, no client data
POST /api/ask        dynamic; parses, retrieves, guards, streams
```

Anything else is static. If a change needs a database, a cache, or a background job, it is a change to
the design, not an implementation detail; the archived design records why none of those exist.

## Gotchas

- **`cacheComponents` is on**, so route segment config such as `export const dynamic` is rejected. A
  route handler is dynamic because it reads the request.
- **Tailwind runs through `@tailwindcss/turbopack`**, not PostCSS. The theme block lives in
  `app/globals.css`; there is no `tailwind.config`.
- **`127.0.0.1` breaks hydration in dev.** Next blocks cross-origin dev requests from that host, so the
  client never starts. Use `localhost` for screenshots and manual checks.
- **`next dev` rewrites the block at the top of this file.** Leave it; add your notes below it.
- **Vitest 5 wants Node `^22.12 || ^24 || >=26`.** This machine runs 25 and prints an engine warning.
- **Without `DEEPSEEK_API_KEY`** the endpoint answers from the retrieved passage. Both paths go through
  the same guard, so citations and tracing behave the same; only the prose differs.
