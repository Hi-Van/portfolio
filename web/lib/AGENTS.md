# lib/

The logic behind `POST /api/ask` and the per-surface metadata helper: seven source files, no JSX, no route, no React.

## Files

| File | Owns |
|---|---|
| `web/lib/ask/guards.ts` | The request predicate `isAskRequest` and the `AskRequest` / `Turn` types. A question trimmed to 1 through `LIMITS.maxQuestion` characters, and an optional `history` of at most 12 turns, each with role `user` or `assistant` and text of at most 2000 characters. Written as a type predicate so the accepted shape is declared in one place. TypeScript does not verify a predicate's body, only that the claim type-checks, so the accepted cases are pinned by `web/tests/unit/guards.test.ts`. |
| `web/lib/ask/provider.ts` | `LIMITS`: the model id, the output ceiling, the question ceiling. `hasCredential()` and `model()`. The only file in the app that imports `@ai-sdk/deepseek`. |
| `web/lib/ask/compose.ts` | Retrieval over `web/content/corpus.ts`: the 59 stop words, the stemmer, the scorer, the threshold. `REFUSAL`, `compose()` for the passage-only answer, and `isRefusal()`, which the room also imports. |
| `web/lib/ask/answer.ts` | `answerChunks()`, the one seam the endpoint calls, and `SYSTEM`, the prompt. Chooses the model or the passage. Re-exports `retrieve`; import it from `compose.ts` instead, which is what every caller does. |
| `web/lib/ask/guard.ts` | `digits()`, `allowedDigits()`, and `createStreamGuard(allowedDigits, allowedAnchors)` with `push()` and `flush()`. Holds back text that could still become a numeral or close an anchor, then traces the numeral and resolves the anchor. |
| `web/lib/agent/parts.ts` | `visibleAnswer()`: what the transcript shows for one message, including a withdrawal. `web/components/agent/agent-room.tsx` imports it, so it must stay free of server modules. |
| `web/lib/seo.ts` | `pageMetadata()`: title, description, canonical, and the share image. Imported by the five `page.tsx` files and never by `web/app/layout.tsx`, which carries its own default metadata and `metadataBase`. |

There is no barrel file. Imports here are relative (`../../content/corpus`), even though `web/tsconfig.json` also allows `@/*`.

Client boundary: `web/lib/agent/parts.ts` is imported by `web/components/agent/agent-room.tsx`, and so is `web/lib/ask/compose.ts` for `isRefusal`. Those two must stay free of the credential and the prompt. `web/lib/ask/answer.ts` and `web/lib/ask/provider.ts` must never reach a client chunk, and `web/lib/ask/guards.ts` follows them because it imports `LIMITS`. `web/lib/seo.ts` is only imported by page files.

## The walk from question to stream

```
POST /api/ask                                web/app/api/ask/route.ts
  request.json(), null when it does not parse
  isAskRequest(body)                         web/lib/ask/guards.ts
    false -> 400, plain text, no stream
  question.trim(), history ?? []
  retrieve(question)                         web/lib/ask/compose.ts
  allowed set: chunk text, every turn        web/app/api/ask/route.ts
  allowedDigits(sources)                     web/lib/ask/guard.ts
  createStreamGuard(allowed, anchors)        web/lib/ask/guard.ts
  answerChunks(question, history)            web/lib/ask/answer.ts
    retrieve(question)                       web/lib/ask/compose.ts
    hasCredential()                          web/lib/ask/provider.ts
      yes -> streamText(...)                 web/lib/ask/answer.ts
      no  -> compose(question)               web/lib/ask/compose.ts, 24-char slices
  guard.push(delta)                          web/lib/ask/guard.ts
    violation -> withdraw, then stop
  guard.flush()                              web/lib/ask/guard.ts
  text-delta, text-end                       web/app/api/ask/route.ts
transcript                                   web/lib/agent/parts.ts
```

The client posts `{ question, history }`, not the SDK's chat payload. `web/components/agent/chat-provider.tsx` builds that body, and `isAskRequest` is the only thing that accepts it.

On a violation the route writes three parts and stops: `data-withdraw` with `{ reason }`, `text-delta` carrying `REFUSAL`, and `text-end`. Text already on screen is replaced rather than appended to, because `visibleAnswer` in `web/lib/agent/parts.ts` returns the refusal whenever the message carries a withdrawal.

## The invariant

**Within one response, no numeral reaches the reader unless its digits, with every separator removed, match the digits of one numeral in the retrieved passage or in a turn that arrived with the question.**

The guard enforces it on the way out, not on the way in:

1. `push(delta)` appends the delta to a buffer, then finds the last `[[` that has no `]]` after it. Everything from that point is held.
2. In the text before that point, a trailing run matching `[0-9][0-9,.]*` is held too, because the next delta can still extend it.
3. The text before the hold point is released, after every numeral in it has been traced against the allowed set. A miss returns a violation and an empty string, and the released prefix is dropped.
4. `flush()` releases the whole buffer and traces it, so a number cut off by the end of the stream is checked rather than assumed safe.

One guard per response. On a violation the route returns at once, so a guard is never reused after it has reported one.

This is a digit check, not a truth check. It cannot see a number spelled as words or tell `2.5` from `25`. It does resolve an anchor against the corpus, so an anchor the site cannot produce is a violation and the answer is withdrawn.

## Boundaries it has to survive

| Boundary | What arrives | What the reader gets |
|---|---|---|
| Numeral split across deltas | `push("It files 45")`, then `push("0,000 records")` | `It files ` first, then `450,000 records` |
| Anchor split across deltas | `push("[[work#wa")`, then `push("lmart\|work, Walmart]]")` | Nothing from `[[` until `]]` arrives |
| Numeral directly before an open anchor | `push("450,000 [[wor")` | Nothing, because the anchor hold backs the numeral up with it |
| Numeral at the end of a delta | `push("... 390,000")` | Held until the next delta or until `flush()` |
| Stream ends mid numeral | `push("It returns 782")`, then `flush()` | `flush()` traces `782` as written. The source has `782,925`, so this is a violation |
| Decimal against an integer | `2.5` when the passage says `25` | Released, because `digits()` compares both as `25` |

`web/tests/unit/guard.test.ts` pins the split numeral, the split anchor, the separator-blind comparison, the mid-number flush, a resolving anchor, and a fabricated one. `web/tests/unit/route.test.ts` then proves the withdrawal round trip: a violating answer is written by the real route, parsed back into parts, and read by `visibleAnswer`, so a rename of the part on either side fails the gate.

## How retrieval picks a passage

`retrieve()` in `web/lib/ask/compose.ts` scores every chunk in `web/content/corpus.ts` and keeps the best.

| Step | Rule |
|---|---|
| Split | Lowercase, split on anything that is not `a-z0-9`, drop every word of one character |
| Stop words | 59 removed before scoring: the question words, pronouns, auxiliaries, and words that appear in almost every question (`number`, `year`, `next`) |
| No words left | Every chunk scores 0, so the answer is the refusal |
| Numeral | A word that is all digits scores 3 when the chunk text contains it as a substring, then scores nothing more |
| Stemmed keyword | One trailing `ing`, `ed`, `es`, or `s` is removed from the question word and from every keyword, so `cleaned`, `cleaning`, and `cleans` all become `clean`. A match scores 3 |
| Raw keyword | The raw word branch scores 2 and is unreachable as written. See gotchas |
| Text substring | The stemmed word is 5 characters or longer and appears anywhere in the chunk text, which scores 1. This is how `clean` finds `cleanup` |
| Threshold | A best score of 3 or more, otherwise no chunk. A tie keeps the earlier chunk in corpus order |

Because the threshold is 3, one keyword hit is enough, and so is one numeral. A refusal is usually a question whose only words are stop words or whose words reach no chunk.

## Changing the answer source

`answerChunks(question, history): AsyncGenerator<string>` is the whole contract between the source and the endpoint. `web/tests/unit/route.test.ts` mocks that module and nothing else in the source.

1. Keep the signature. The route imports `answerChunks` and nothing else from `web/lib/ask/answer.ts`.
2. Keep retrieval inside `retrieve()` in `web/lib/ask/compose.ts`, and keep it pure: the route calls it separately to build the allowed set. The allowed digits come from that passage alone, never from history. If you retrieve on a rewritten query, on the history, or on more than one chunk, export the chunk you used and pass it to the route, or the allowlist describes a passage the answer did not come from and every number withdraws.
3. Emit text only. Quantities as digits, citations as `[[surface#anchor|label]]` or `[[surface|label]]` for a whole-surface chunk. Use `citationFor(chunk)` so the anchor you emit is one the guard resolves. Every other part of the stream belongs to the route.
4. Do not write to the writer from the source. `text-start`, `text-delta`, `text-end`, and `data-withdraw` are written in one place, `web/app/api/ask/route.ts`.
5. If you move to structured output, the guard changes from tracing prose to parsing an object. The requirements about what a reader sees while an answer is arriving still apply, and they are about the stream, not the response shape.

## What the prompt must keep saying

`SYSTEM` in `web/lib/ask/answer.ts` is six sentences. The table groups the last two, which are one rule, and states each rule rather than quoting it.

| Rule | What breaks without it |
|---|---|
| Answer about one site, using only the passage you are given | The guard traces numbers, not claims. Nothing else keeps general knowledge out |
| Write quantities as digits, never spelled out | The guard sees digits only. A spelled number is invisible to it |
| End every claim with `[[surface#anchor\|label]]`, using the passage's anchor | An answer with no anchor cannot be followed, and the spec requires every answer to cite |
| If the passage does not answer, reply with exactly `Not stated on the site.` | The refusal is compared as one exact string. A paraphrase renders as an answer, not as a refusal |
| The conversation is context, never evidence | The spec refuses a question that only the conversation can answer |

The prompt hard-codes the refusal sentence instead of importing `REFUSAL` from `web/lib/ask/compose.ts`. `REFUSAL` is compared byte for byte in `web/tests/unit/route.test.ts` and `web/lib/agent/parts.ts` uses it to render the withdrawn answer. Change `REFUSAL` and you must change the prompt too, or the model is told to say one sentence while the client recognises another.

Only the last 4 turns go into the prompt. Every turn in the request, up to 12, is in the guard's allowed set.

## The credential, the limits, and the bundle check

- `hasCredential()` reads `process.env.DEEPSEEK_API_KEY` on every call, inside `answerChunks`. Never at module load, and a blank string counts as absent.
- `model()` builds the provider on demand. `web/lib/ask/provider.ts` is the only file that imports `@ai-sdk/deepseek`.
- No module here returns the key, logs it, or puts it in a response. A local key belongs in `web/.env.local`, which `web/.gitignore` covers with `.env*`. Do not print it in a command, a diff, or a doc.
- `LIMITS` is `{ model: "deepseek-chat", maxOutputTokens: 400, maxQuestion: 280 }`, `as const`. It is the only definition of the model and the output ceiling, and the server's definition of the question limit. Nothing in the endpoint rate limits a reader; the output ceiling is the only cap the code applies.
- The question ceiling is stated twice: `LIMITS.maxQuestion` on the server, and `MAX_QUESTION = 280` in `web/components/agent/agent-room.tsx`. The literal exists because importing `LIMITS` into a client component would ship the string `deepseek-chat` and fail the bundle check. Change both.
- `web/lib/ask/guards.ts` imports `LIMITS`, so the request predicate is server-only by dependency as well as by intent.

`web/scripts/check-bundle.mjs` builds the app, then fails if:

1. `zod`, `zustand`, `swr`, `valibot`, or `@upstash/redis` is in `dependencies` or `devDependencies` at all;
2. any `.js` file under `.next/static` contains `/deepseek/i`, `DEEPSEEK_API_KEY`, or `@ai-sdk/deepseek`.

Otherwise it reports the client chunk count and the total KiB. The marker is case-insensitive and matches a comment, so a note that mentions the provider is enough to fail it. Treat `web/lib/ask/provider.ts` and `web/lib/ask/answer.ts` as unreachable from a client component.

## With and without a credential

| | With `DEEPSEEK_API_KEY` | Without |
|---|---|---|
| Retrieval | `retrieve(question)` in `web/lib/ask/answer.ts` | The same call |
| No chunk found | Yields `REFUSAL` and makes no model call | The same |
| Source | `streamText` on `deepseek-chat`, the system prompt, the last 4 turns, 400 output tokens | `compose()`: the passage verbatim plus one anchor, cut into 24-character slices |
| Network | One provider call | None |
| Guard | `createStreamGuard` over the passage and the history | The same, so splitting and tracing behave identically |
| Reader sees | Prose written by the model, citing inline | The passage itself, citing once |
| A failure | The catch in the route writes `data-withdraw` with reason `the model was unreachable` | Nothing to fail |

The endpoint returns 200 once the stream opens, in both modes, including when the model throws. `web/app/AGENTS.md` lists 502 for an unreachable model; the catch in `web/app/api/ask/route.ts` withdraws inside the stream instead, so no 502 is produced. 400 is the only other status, and it is the only path that opens no stream.

## Gotchas

| Gotcha | Detail |
|---|---|
| The route and the source retrieve separately | The route calls `retrieve(question)` for the allowed set and `answerChunks` calls it again. They agree only because `retrieve` is pure and takes the same question. Change the query inside the source and every number withdraws |
| The history is in the allowlist, the withdrawal is not | The allowed set includes every turn's text. `textOf` in `web/components/agent/chat-provider.tsx` joins the `text` parts and ignores `data-withdraw`, so a withdrawn answer's prefix, untraced number included, is sent back as history on the next question, and the guard then treats those digits as allowed. `web/lib/agent/parts.ts` knows about the withdrawal, that function does not |
| The violation is sent to the browser | `withdraw` writes `untraced number: 350,000` into the `data-withdraw` part. Nothing renders it, but the token is in the payload. Put nothing in the reason you would not hand to the reader |
| A null anchor becomes the string `null` | `web/content/corpus.ts` allows `anchor: null` for whole-surface chunks, and `about` and `home` use it. `compose()` and the prompt in `web/lib/ask/answer.ts` both write `#${chunk.anchor}` unconditionally, so those citations read `[[about#null\|about]]` and link to `/about#null`. No test covers it: `web/tests/e2e/agent.spec.ts` checks resolution on the 22% answer, which uses a real anchor |
| A label with a digit must have that digit in its text | `work, before 2023` is traced like prose, and passes because the passage also says `class of 2023`. Add a chunk whose label carries a year its text does not, and every answer from that chunk withdraws |
| A closed anchor is not a resolved anchor | The guard checks `]]`. `renderWithAnchors` in `web/components/agent/agent-room.tsx` links any `[a-z]+` surface and `[a-z0-9-]+` anchor it is given. A fabricated anchor becomes a dead link, not a withdrawal, which is the opposite of what the spec asks |
| A client component already imports the corpus | `web/components/agent/agent-room.tsx` imports `isRefusal` from `web/lib/ask/compose.ts`, so the corpus and the scorer reach the client bundle on the agent surface. That is accepted. Keep `compose.ts` free of the credential and the prompt, and never let `provider.ts` or `answer.ts` follow it |
| The keyword weight of 2 is unreachable | `score()` builds its set from stemmed keywords, then checks the stemmed root for 3 and the raw word for 2. Once the set is stemmed, the second check can only fire when the word was never stemmed, which the first check already covered |
| A tie goes to corpus order | `retrieve()` replaces the best only when the score is strictly higher, so inserting a chunk at the top of `web/content/corpus.ts` can take a question that used to reach a different passage |
| The last number waits | A delta that ends in a numeral is never fully released. The final number of an answer appears when the next delta arrives or at `flush()`, which is after the source ends |

## Which tests decide

| Test | Pins |
|---|---|
| `web/tests/unit/guard.test.ts` | Splitting, holding, `flush()`, and what `allowedDigits` derives from a passage |
| `web/tests/unit/guards.test.ts` | The predicate: empty, blank, 281 characters, a non-string question, 13 turns, a `system` role |
| `web/tests/unit/route.test.ts` | 400 with no stream, the withdrawal and the refusal, a traced number passing, split deltas, history never becoming evidence |
| `web/tests/unit/suite.test.ts` | The question suite: every case cites or refuses, no answer contains an untraced number, the refusal rate stays under 0.4 |
| `web/tests/unit/parts.test.ts` | A withdrawal replaces the answer with the refusal |
| `web/tests/unit/corpus.test.ts` | Every anchorable section has a chunk, and no two share an anchor |
| `web/tests/e2e/agent.spec.ts` | The room in a browser: streaming, citations resolving, one announcement, retry, the return path |

## Read next

| For | Read |
|---|---|
| What the agent must guarantee | `../../openspec/specs/site-agent/spec.md`, the capability this folder implements |
| How the room looks, moves, and announces | `../../design-system/surfaces/chat.md` |
| The passage text and where each number in it comes from | `web/content/corpus.ts`, then `../../design-system/foundations/content-and-provenance.md` |
| The endpoint's contract from the app side | `../app/AGENTS.md` |
| Why the refusal note is clay | `../../DESIGN.md` and the hard rules in the root `AGENTS.md`: the note on an unstated answer is the fifth permitted use of clay |
