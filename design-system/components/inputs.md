---
title: Inputs
group: Components
status: current
reviewed: 2026-10-27
sources:
  - web/components/report/model.tsx
  - web/content/model.ts
  - web/content/facts.ts
---

# Inputs

Two kinds of input exist: the model's sliders and the reset control. The agent's composer is part of the agent surface and lands with it.

## The model sliders

Base UI's slider, unstyled, assembled from parts. Two of them: the share of traffic that is human, and a baseline session length.

| Part | Treatment |
| --- | --- |
| Control | 44px tall, so the pointer target meets the floor |
| Track | 6px tall, full width, `bg-line`, pill radius |
| Indicator | `bg-clay`, because the value is an assumption |
| Thumb | A 44 by 44 transparent target around a 20px clay knob |
| Readout | The value beside the label, clay and tabular |

### States

| State | Present | Styling |
| --- | --- | --- |
| Rest | yes | Clay knob on a line track |
| Hover | yes | No change; the knob is small and the hover state would be noise |
| Focus | yes | The global 2px ring at 3px offset |
| Dragging | yes | The knob moves; no scale or glow |
| Disabled | no | The model is always usable |
| Invalid | no | The control cannot produce an invalid value |

### Accessibility

Each thumb carries an accessible name and a value text in words, so a reader hears "share of traffic done by a person, 25 percent" rather than "25". The `<output>` beside each label is visual; the value text is what assistive technology reads. The assumption is also stated in prose beside the control, so the label is never the only place the meaning lives.

The fixed assumption, time to file one record by hand, is stated in text and is not a control. A test asserts the surface exposes exactly two sliders.

## The reset control

An outlined action at the 44px floor that returns both sliders to the defaults. It is the only action inside the figure panel, and it is outlined rather than filled because the filled invitation belongs to the page, not to a figure.

## Numbers as inputs

The model's outputs are not inputs, but they are adjacent: the derived figure uses the same arithmetic module as the prerender, so the value a reader sees at rest is the value the printed prose states. That is a data guarantee rather than a component one, and it is covered in [Content and provenance](../foundations/content-and-provenance.md).

## The composer

Not built yet. When the agent surface lands it will use the same floor and the same focus rule: a 999px outlined field, a 44px filled circle for send, Enter to submit with a modifier for a newline, and a maximum length enforced before submit.

## Source

- `web/components/report/model.tsx` for the sliders and the reset action.
- `web/content/model.ts` for the arithmetic they drive.
- `web/content/facts.ts` for the values they belong to.
