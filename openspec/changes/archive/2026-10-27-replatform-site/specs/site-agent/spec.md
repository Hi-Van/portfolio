# Spec Delta

## Purpose

Defines the site's question-answering surface: it answers only from the site's own content, cites
where each answer came from, refuses when the answer is not there, and never states a number it was
not given.

## ADDED Requirements

### Requirement: A dedicated surface

The agent SHALL be a surface of its own, reached by the switch in the top bar, not an overlay on
another surface. It SHALL answer from this site's content and no other source.

#### Scenario: Opening the agent

- **WHEN** the reader activates the switch
- **THEN** the agent surface opens, and the switch reads as current while the reader is there

#### Scenario: A question about the wider world

- **WHEN** the reader asks something the site does not address
- **THEN** the agent refuses rather than answering from general knowledge

### Requirement: Every answer is cited

Every answer SHALL cite at least one location, consisting of a surface and an anchor within it. Every
citation SHALL resolve to content that exists and that supports the answer.

#### Scenario: A cited answer

- **WHEN** the agent answers a question about the intake pipeline
- **THEN** the answer names the surface and anchor it came from, and the reader can follow it there

#### Scenario: An unresolvable citation

- **WHEN** a citation points to an anchor that does not exist
- **THEN** the answer is withheld, because an unverifiable citation is worse than a refusal

### Requirement: One fixed refusal

When the answer is not on the site, the agent SHALL reply with one fixed sentence and SHALL NOT
paraphrase, expand, or apologise at length. A refusal SHALL carry no citations.

#### Scenario: Refusing

- **WHEN** the reader asks for something the site does not state
- **THEN** the reply is the fixed refusal line, identically every time

#### Scenario: A refusal with a citation

- **WHEN** the agent refuses and also cites a source
- **THEN** the reply is treated as an answer, not a refusal, and is validated as one

### Requirement: No unstated numbers

The agent SHALL NOT state a number that is absent from the content it retrieved for that answer. This
SHALL hold while an answer is arriving, not only once it is complete, so no number is displayed before
it has been checked.

#### Scenario: A rate the model invented

- **WHEN** a draft answer contains a rate that is not in the retrieved content
- **THEN** that draft is not shown

#### Scenario: A number split across arrival

- **WHEN** a number is produced in pieces as the answer arrives
- **THEN** no part of it is displayed until the whole number has been checked

#### Scenario: A derived figure

- **WHEN** the agent states the seller-hours saving
- **THEN** the figure it states is the one the content computes from the same assumptions

### Requirement: An answer may arrive progressively

The agent SHALL be able to make an answer visible as it is produced, so the reader is not waiting on a
full response. Progressive delivery SHALL NOT weaken any check: an anchor SHALL be resolved before it
is rendered, and a number SHALL be traced before it is displayed.

#### Scenario: An anchor arrives

- **WHEN** an anchor in the answer arrives
- **THEN** it is resolved before the reader can follow it

#### Scenario: An unresolvable anchor mid-answer

- **WHEN** an anchor fails to resolve partway through an answer
- **THEN** the answer stops and is replaced by the refusal

### Requirement: A failed check withdraws the answer

When a check fails after part of an answer is already visible, the agent SHALL replace that answer with
the fixed refusal and SHALL NOT leave the failed fragment in place or append a note beside it.

#### Scenario: A violation after a partial answer

- **WHEN** a number fails its check after the first sentences are visible
- **THEN** the visible text is replaced by the refusal, and no part of the failed answer remains

### Requirement: History is context, not evidence

The agent MAY receive the reader's earlier turns. Every answer SHALL still cite the site, and a
question that could only be answered from earlier turns SHALL be refused.

#### Scenario: A follow-up question

- **WHEN** the reader asks a follow-up that refers to an earlier answer
- **THEN** the reply still cites where the answer comes from on the site

#### Scenario: A question answerable only from the conversation

- **WHEN** the answer exists only in the reader's earlier turns and not on the site
- **THEN** the agent refuses

### Requirement: A visit keeps its conversation

A conversation SHALL persist while the reader moves between surfaces within one visit, including an
answer that is still arriving. A fresh load SHALL start with an empty conversation.

#### Scenario: Navigating away mid-answer

- **WHEN** the reader leaves the agent surface while an answer is arriving and returns
- **THEN** the transcript is intact and the answer is complete

#### Scenario: A refresh

- **WHEN** the reader reloads the agent surface
- **THEN** the conversation is empty, and no earlier answer is replayed

### Requirement: The reader returns where they came from

Arriving from a surface SHALL be remembered, and the agent SHALL offer a return path to that surface.
Arriving directly SHALL return the reader home.

#### Scenario: Arriving from the work surface

- **WHEN** the reader arrives from the work surface and leaves
- **THEN** they return to the work surface, by the return control or by Escape

#### Scenario: A direct arrival

- **WHEN** the reader opens the agent with no originating surface
- **THEN** the return path leads home

### Requirement: Composing a question

The composer SHALL submit on Enter, SHALL allow a newline with an explicit modifier, SHALL enforce a
recorded maximum question length, and SHALL NOT silently discard a submission made while an answer is
in progress.

#### Scenario: Submitting twice

- **WHEN** the reader submits while an answer is still arriving
- **THEN** the second question is queued or the control is visibly disabled, and in neither case is it
  dropped without a trace

#### Scenario: An over-long question

- **WHEN** the question exceeds the recorded maximum
- **THEN** the reader is told before submitting, not after

### Requirement: The transcript is announced once

Each message SHALL name its author and a time. An answer SHALL be announced to assistive technology
once, when it completes or when it is withdrawn, and SHALL NOT be announced while it is still arriving.
Announcing SHALL NOT move focus away from the composer.

#### Scenario: An answer arrives

- **WHEN** an answer completes
- **THEN** it is announced once, and the reader can move back through the transcript to read it

#### Scenario: An answer arrives in fragments

- **WHEN** an answer is produced over several updates
- **THEN** assistive technology stays silent until it completes, and the finished answer is announced
  once, not fragment by fragment

#### Scenario: An answer is withdrawn

- **WHEN** an answer is replaced by the refusal partway through
- **THEN** only the refusal is announced, and no fragment of the withdrawn answer is announced

#### Scenario: Revisiting an answer later

- **WHEN** a keyboard user wants to read the newest answer
- **THEN** there is a reachable route from the composer into the transcript

### Requirement: Failure is visible and recoverable

If the answer path fails or times out, the agent SHALL show a failure state with a way to retry, and
SHALL NOT leave an indeterminate waiting indicator behind.

#### Scenario: The answer never arrives

- **WHEN** an answer fails or exceeds a recorded timeout
- **THEN** the waiting indicator is replaced by a failure message with a retry control

### Requirement: The answer path is safe to expose

The agent SHALL keep any credential on the server and SHALL NOT expose it to the client. One request
SHALL cause one model call, bounded by a recorded output cap, so the cost of a request is known before
it begins.

There is no per-visitor limit, and this capability makes no promise about one.

#### Scenario: Inspecting the client

- **WHEN** the delivered client is inspected for credentials
- **THEN** none are present, and no request carries a secret

#### Scenario: A request's work is bounded

- **WHEN** the endpoint answers a question
- **THEN** it makes one model call with the recorded output cap, and the call cannot loop or fan out

### Requirement: Suggested questions are real questions

Any suggested question SHALL itself produce an answer, not a refusal.

#### Scenario: A stale suggestion

- **WHEN** a suggested question would be refused
- **THEN** it is removed, because a suggestion that refuses is a broken promise
