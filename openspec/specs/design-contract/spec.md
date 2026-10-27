# design-contract Specification

## Purpose

Defines the material, voice, and shape decisions that make the site read as measured evidence: what
colours mean, how many voices speak, and what shape carries what intent.

## Requirements

### Requirement: Colour is defined once and referenced by role

Every colour SHALL be defined in one place as a named role and referenced from there. No surface,
figure, or component SHALL define its own colour value.

#### Scenario: A new element needs colour

- **WHEN** an element is added that needs a colour
- **THEN** it references an existing role, or a new role is added to the contract first

#### Scenario: A literal colour in a figure

- **WHEN** a chart mark carries a colour that is not a contract role
- **THEN** the change is rejected

### Requirement: Two accents with fixed meanings

The site SHALL have two accent colours and no third. Indigo SHALL mean measurement: result numbers,
section numerals, chart marks, and links to data. Clay SHALL mean assumption: the abstract label,
the inference in figure 1, the assumed row of the method, the model's inputs, and a note on an
unstated answer, and nothing else.

#### Scenario: Colouring navigation

- **WHEN** a navigation item, badge, caption, or role label is given an accent
- **THEN** it is reset to a neutral role, because those never take colour

#### Scenario: A third accent

- **WHEN** a design proposal introduces a third accent to distinguish something
- **THEN** it is rejected in favour of shape, weight, or spacing

#### Scenario: The clay inventory

- **WHEN** clay appears anywhere
- **THEN** it marks an assumption, and the set of places clay appears is enumerable and recorded

### Requirement: Both themes carry the same meanings

The site SHALL render in a light and a dark theme from two sets of role values. Dark SHALL NOT be
produced by filtering, inverting, or opacity-shifting the light values. A role SHALL mean the same
thing in both themes.

#### Scenario: Reading in dark

- **WHEN** the reader views any surface in the dark theme
- **THEN** measured values remain indigo, assumptions remain clay, and surfaces still separate
  without a shadow

#### Scenario: One invitation in dark

- **WHEN** the invitation is rendered in the dark theme
- **THEN** it remains the one filled element in the top bar and its text meets the contrast floor

### Requirement: Contrast floors

Every text and background pairing SHALL meet a recorded contrast floor in both themes. In the light
theme the floors are: body 12:1, muted interface text 5.8:1, indigo on paper 10:1, clay on the panel
5.5:1. In the dark theme every text pairing SHALL be measured and meet at least 4.5:1, and every
non-text indicator at least 3:1.

#### Scenario: Lightening muted text

- **WHEN** a proposal lightens the muted role to make it softer
- **THEN** it is rejected if the recorded floor is breached

#### Scenario: Dark theme has no floor recorded

- **WHEN** the dark theme is changed
- **THEN** the new pairings are measured and recorded, and the capability SHALL NOT claim a floor it
  has not measured

### Requirement: Three voices with fixed jobs

The site SHALL use three type families: a display serif for statements, a reading face for prose,
and an interface face for labels, captions, navigation, and figure text. A family SHALL NOT be used
outside its job.

#### Scenario: Interface copy in the reading face

- **WHEN** a navigation label or figure caption is set in the reading face
- **THEN** it is rejected, because interface text uses the interface face

### Requirement: One scale, and no in-between sizes

The type scale SHALL be a fixed set of steps. A surface SHALL NOT use a size that sits between two
steps unless that size is itself a recorded step. The reading size SHALL be the same on every prose
surface, with at most one recorded exception for the conversational surface.

#### Scenario: A locally tuned heading

- **WHEN** a heading needs to be slightly smaller to fit
- **THEN** it uses the next step down, and the layout changes instead of the type

#### Scenario: An exception is needed

- **WHEN** the conversational surface genuinely needs a different reading size
- **THEN** that size is recorded in the contract as an exception, and no other surface inherits it

### Requirement: Display tracking and small-type floors

Every display heading SHALL carry the same negative tracking. Uppercase interface keys SHALL carry
open tracking. No interface text SHALL render below a recorded floor: uppercase keys at a recorded
minimum size and weight, captions at a recorded minimum, and figure labels at a minimum that does not
fall below legible size at the reading measure.

#### Scenario: A cramped figure label

- **WHEN** a chart label would render below the recorded minimum at the reading measure
- **THEN** the label count or the figure changes, not the floor

#### Scenario: Uppercase without tracking

- **WHEN** an uppercase key is set without open tracking
- **THEN** it is rejected, because uppercase without tracking reads as a lump

### Requirement: The reading measure

Prose and full-width figures SHALL share one reading measure so that figures and text align on the
same column. The measure SHALL NOT be shortened without re-checking figure label size at the same
time. On narrow viewports every surface SHALL collapse to a single column with no horizontal
overflow.

#### Scenario: A narrow column

- **WHEN** the reading measure is reduced
- **THEN** the effect on figure label size is checked in the same change

#### Scenario: A narrow viewport

- **WHEN** the reader is on the narrowest supported viewport
- **THEN** no surface scrolls horizontally and no element crosses the viewport edge

### Requirement: Shape carries intent

Radius SHALL carry meaning rather than decoration: a small radius for facts, a mid radius for
secondary actions and controls, a large radius for panels, a larger radius for the abstract, and a
pill for the invitation and the conversational input. A filled circle is a control, not an
invitation.

#### Scenario: A new panel

- **WHEN** a new container is added around content
- **THEN** it takes the panel radius or it is removed, because section spacing separates before a
  container does

### Requirement: Elevation

The site SHALL NOT use drop shadows. Depth SHALL come from surface fill and a hairline. A single
recorded control may carry a shadow where it must separate from a track.

#### Scenario: Adding a card shadow

- **WHEN** a surface appears to need more separation
- **THEN** it gains whitespace or a hairline, not a shadow

### Requirement: Motion is reader-initiated

Nothing SHALL move on its own. Motion SHALL be limited to responses to the reader, and a reduced
motion preference SHALL remove travel while leaving every control in its end state.

#### Scenario: Reduced motion

- **WHEN** the reader has asked for reduced motion
- **THEN** transitions resolve with no travel, no typing animation runs, and no content is hidden
  behind an animation that will not play

#### Scenario: An entrance animation

- **WHEN** a section is proposed to animate in on scroll
- **THEN** the content is fully readable without it, and with reduced motion it appears at once
