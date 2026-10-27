---
title: Chat messages
group: Components
status: current
reviewed: 2026-10-27
sources:
  - web/components/agent/agent-room.tsx
  - web/lib/agent/parts.ts
  - web/lib/ask/compose.ts
---

# Chat messages

The transcript is a list of rows. Each row names its author and its time, and an answer carries its citations as links rather than as a list at the bottom.

## The row

| Part | Treatment |
| --- | --- |
| Author | Caps key at 10px, uppercase, ink for the author and muted for the time |
| Time | Caps key, muted, set when the row first appears |
| Text | Reading size, body colour, at the room's width |
| Citation | An inline link in indigo, underlined, part of the sentence it supports |

Author names are "You" and "Site agent". The row is an `article` with an accessible name, so a reader moving through the transcript hears whose turn it is.

## Inline citations

An answer carries `[[surface#anchor|label]]` markers. The renderer turns each into a link to that surface and anchor the moment it arrives, so a claim and its source appear together rather than being separated by a list.

An anchor that does not resolve is a server-side failure, not a client one: the response is refused instead of the link being rendered dead.

## The refusal note

An answer the site cannot give is the fixed sentence "Not stated on the site." and a clay note beside it: "This answer is not on the site, so the agent does not guess." The note is the fifth and last place clay appears, and it is the only clay element in the transcript.

## A withdrawn answer

Streamed text cannot be un-said on the wire, so a withdrawal is a deliberate act by the client: a `data-withdraw` part replaces the message's text with the refusal and nothing of the withdrawn answer remains. A unit test feeds a message containing both streamed text and a withdrawal and asserts the text is gone.

## Suggestions

Before the first question the introduction offers four suggested questions as pill buttons at the 44px floor. Every suggestion is a real question: each one produces an answer, never a refusal. A stale suggestion would be a broken promise.

## The waiting row

While an answer is arriving, a muted line reads "The agent is reading the site" with a pulsing ellipsis. It is `aria-hidden`, because the announcement is handled once at the end rather than per fragment.

## The failure row

If the answer fails or times out, the waiting row is replaced by a panel with a sentence and a "Try again" action that reuses the hook's regenerate. A failure never leaves an indeterminate indicator behind.

## Announcement

The transcript itself is not a live region. A separate visually hidden status region receives the finished answer once, when it completes or when it is withdrawn. Announcing per fragment would read the answer aloud in pieces, which is unusable.

## Motion

Rows enter with a 180ms fade and a 6px rise, through the motion library's presence support, configured once with `reducedMotion="user"`. Under that preference the row is created without a transform and lands in its end state; a browser test asserts the computed transform is `none`.

## States

| State | Present |
| --- | --- |
| Empty, with suggestions | yes |
| User row | yes |
| Answer streaming | yes |
| Answer complete | yes |
| Refused | yes |
| Withdrawn | yes |
| Failed, with retry | yes |
| Disabled composer | yes, while an answer arrives |
| Loading skeleton | no, a waiting row is enough |

## Source

- `web/components/agent/agent-room.tsx` for the rows, composer, and states.
- `web/lib/agent/parts.ts` for reading a message and its withdrawal.
- `web/lib/ask/compose.ts` for the fixed refusal.
- `web/tests/unit/parts.test.ts` and `web/tests/e2e/agent.spec.ts` for the assertions.
