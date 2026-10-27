---
title: Chat
group: Surfaces
status: current
reviewed: 2026-10-27
sources:
  - web/app/ask/page.tsx
  - web/components/agent/agent-room.tsx
  - web/components/agent/chat-provider.tsx
  - web/lib/agent/parts.ts
  - web/app/api/ask/route.ts
---

# Chat

The agent is its own surface, reached by the switch in the bar. It is a room, not an overlay: a heading, a short introduction, a transcript, and a composer pinned under it. It answers from this site and cites where each answer came from.

## Composition

```
Ask                                              display-page
Ask about the work, the numbers, or the method…  lede
┌ the room, 860px ─────────────────────────────┐
│ introduction, with suggested questions        │  panel
│                                               │
│ YOU        05:23                              │  message rows
│ What did he ship at Walmart?                  │
│ SITE AGENT 05:23                              │
│ Two years of making supplier data agree…      │
│ work, Walmart                                 │  citation link
│                                               │
│ [ Ask about this site            ] (send)     │  composer
│ Answers come from this site only.  Back home  │
└───────────────────────────────────────────────┘
```

The room is 860px wide, inside the same 32px gutter as every other surface. It is a normal page: the bar stays sticky, the footer follows, and nothing is fixed to the viewport.

## Where the conversation lives

The chat hook sits in a provider rendered by the root layout, above the route. That gives the transcript the lifetime the reader expects:

- Moving between surfaces keeps the conversation, including an answer still arriving.
- A reload empties it, because nothing is written to storage.
- Stream resume is off, so a reload cannot replay an answer the reader was meant to lose.

The trade: the chat runtime is in every surface's bundle, because the provider is above the route. That is accepted rather than optimised, and the transferred script is recorded per surface.

## The composer

One 999px outlined field and one 44px filled circle. Enter submits, a modifier inserts a newline, and the length limit is enforced by the field before the server sees it. While an answer is arriving, the send control becomes a stop control: a second question is not queued silently, it is simply not accepted until the first answer finishes.

The field, the send control, and every suggestion meet the 44px floor.

## The return path

Arriving from a surface carries `?from=`, and the surface resolves it through an allowlist rather than trusting the parameter: `index`, `work`, `report`, `about`. A direct arrival, or anything unrecognised, returns home. The footer of the room names the destination, and Escape does the same as the link.

## The answer path

```
question -> retrieve a passage -> stream the answer with inline anchors
```

The client posts one question and the turns before it. The server answers from a section of this site and cites it inline, and an answer that is not on the site is refused with one fixed sentence. Nothing the reader types is stored.

## Completeness without scripting

The surface renders its heading, introduction, suggested questions, and composer without scripting. Asking a question needs scripting, which is honest: the room exists, the conversation does not.

## Measurements and tokens

| Property | Value | Utility |
| --- | --- | --- |
| Room width | 860px | `max-w-chat` |
| Gutter | 32px | `px-gutter` |
| Field and controls | 44px minimum | `h-11`, `size-11` |
| Field radius | 999px | `rounded-pill` |
| Introduction panel | 10px | `rounded-panel` |
| Transcript ceiling | 60vh | `max-h-room` |
| Row entrance | 180ms, 6px | motion, dropped under reduced motion |

## Source

- `web/app/ask/page.tsx` for the surface shell.
- `web/components/agent/agent-room.tsx` for the room, composer, and return path.
- `web/components/agent/chat-provider.tsx` for where the conversation lives and what the transport posts.
- `web/lib/agent/parts.ts` for how a message is read, including a withdrawal.
- `web/app/api/ask/route.ts` for the answer endpoint.
- `web/tests/e2e/agent.spec.ts` for the behaviour.
