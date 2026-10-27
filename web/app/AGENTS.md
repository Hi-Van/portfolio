# app/

Every route, the shared layout, and the theme layer. Eleven files, in three kinds.

## Routes

| Path | File | Rendering | Metadata |
|---|---|---|---|
| `/` | `page.tsx` | static | `pageMetadata` plus `Person` JSON-LD |
| `/work` | `work/page.tsx` | static | `pageMetadata` |
| `/about` | `about/page.tsx` | static | `pageMetadata` |
| `/report` | `report/page.tsx` | static | `pageMetadata` |
| `/ask` | `ask/page.tsx` | static shell | `pageMetadata` |
| `/api/ask` | `api/ask/route.ts` | dynamic | n/a |
| any unknown | `not-found.tsx` | static | its own title |
| `/robots.txt` | `robots.ts` | generated | n/a |
| `/sitemap.xml` | `sitemap.ts` | generated | n/a |

The four content surfaces are prerendered, which is what makes them complete without scripting.

## The files that are not routes

| File | Owns |
|---|---|
| `layout.tsx` | The document: `lang`, the three font variables, `metadataBase`, the default share card, the skip link, the bar, the footer, and the two providers |
| `providers.tsx` | The theme provider wrapper. Server component, no state |
| `globals.css` | The theme block, the three colour scopes, base layer, focus ring, reduced motion, print |
| `not-found.tsx` | The missing-page surface, inside the frame, with two ways back |

## Adding a route

1. Create `app/<name>/page.tsx`.
2. Wrap the content in `<PageMain>` from `components/shell/page-main`, so the skip link has a target.
3. Add `export const metadata = pageMetadata({ title, description, path })` from `lib/seo`. Do not
   hand-write an `openGraph` object: a page-level one replaces the layout's wholesale and drops the
   share image.
4. If the route is public, add it to `PATHS` in `app/sitemap.ts` and to the footer's surface list in
   `content/site.ts`.
5. Run `npm run check`. The artifact check will fail until you name the new file in a doc.

## The answer endpoint

`api/ask/route.ts` is a thin adapter. It validates the request, asks `lib/ask` for text, pushes that
text through the stream guard, and writes the UI message stream. It owns no retrieval and no prompt.

- Status codes: 200 opens a stream, 400 for an invalid question, 502 for an unreachable model.
- A guard violation writes a `data-withdraw` part and the refusal, then ends the stream.
- The client posts `{ question, history }`, not the SDK's chat payload. The transport in
  `components/agent/chat-provider.tsx` composes that body.

If you are changing answer behaviour, you almost certainly want `lib/AGENTS.md` instead.

## The theme layer

`globals.css` is the only place a colour, size, radius, or measure is defined.

```
@theme inline        role tokens become utilities, colour namespace cleared
:root                raw light values
[data-theme=dark]    raw dark values, same names
@media dark          the same set, for a reader with no stored choice
```

A component writes `bg-paper text-ink` once and both themes follow. Adding a role means adding it to
all three scopes and to `check-tokens`' `ROLE_MAP`; the check fails if a scope is missing a variable.

## Don't

- Don't add `export const dynamic` or other segment config; `cacheComponents` rejects it.
- Don't put a `<main>` in a route without an `id`. Use `PageMain`.
- Don't import `content/facts` into a client component to print a raw number; pass a `Fact` or a
  rendered display.
- Don't add a second `<h1>` to a surface.
