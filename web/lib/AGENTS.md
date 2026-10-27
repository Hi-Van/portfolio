# lib/

Logic with no JSX. Two concerns: the agent's answer path, and per-surface metadata.

## The answer path

```
question ──▶ guards.ts ──▶ answer.ts ──▶ guard.ts ──▶ route ──▶ stream
              shape         source        tracing
```

| File | Owns |
|---|---|
| `ask/guards.ts` | The request predicate. A question of 1 to 280 characters and up to 12 well formed turns |
| `ask/compose.ts` | Retrieval over `content/corpus.ts`, the fixed refusal, and the passage-only answer |
| `ask/answer.ts` | The source: the model when configured, the retrieved passage when not |
| `ask/guard.ts` | The stream guard: hold a numeral until it is traced, hold an anchor until it closes |
| `ask/provider.ts` | The model id, the output ceiling, the question ceiling, and the credential read |
| `seo.ts` | `pageMetadata`, including the share image |

`app/api/ask/route.ts` wires them together and owns nothing else.

## The invariant

**No unwatched number reaches a reader.** The guard holds back any trailing fragment that could still
become a numeral, and traces each completed numeral against the digits in the retrieved passage. An
untraceable number ends the answer, and the client replaces it with the refusal.

Three consequences worth knowing before you edit `guard.ts`:

- A numeral can arrive split across deltas. `45` then `0,000` must not release `45`.
- An anchor can arrive split across deltas. `[[work#wa` must not render as literal brackets.
- The stream can end mid-number. `flush()` traces what is left rather than assuming it is safe.

All three are pinned by `tests/unit/guard.test.ts`. Change the guard and those tests decide whether the
change is correct.

## Changing the source

`answer.ts` has one branch on `hasCredential()`. Both branches produce text that goes through the same
guard, so citations and tracing behave identically; only the prose differs.

If you change the system prompt, keep the three constraints it states: quantities as digits, an inline
anchor per claim, and the exact refusal sentence when the passage does not answer.

If you add structured output from the model, the guard's job changes from tracing prose to parsing an
object. Read `../openspec/specs/site-agent/spec.md` first: several requirements are about what the
reader sees while an answer is arriving, not about the shape of the response.

## The credential

`DEEPSEEK_API_KEY` is read at request time, never at module load, and never sent to the client.
`check-bundle.mjs` scans client chunks for the provider package and the credential name, so a stray
import from a component fails the build.

`LIMITS` in `provider.ts` is the single place the model, the output ceiling, and the question ceiling
are set. There is no rate limit; the output ceiling and the provider's own spend limit are the only
caps.

## Don't

- Don't import these modules from a component. They are server-only; a client import would either fail
  the bundle check or leak the prompt.
- Don't add a second answer path. One source, one guard.
- Don't loosen the guard to make an answer appear faster. A withdrawn answer is the designed failure.
