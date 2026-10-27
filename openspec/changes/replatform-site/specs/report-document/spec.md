# Spec Delta

## Purpose

Defines the report as its own document type: its composition, its reading column, its five figures,
the three-input model, and the method note that separates measurement from assumption.

## ADDED Requirements

### Requirement: The report is a document

The report surface SHALL read as a document rather than as a marketing page: a masthead, an
abstract, numbered sections, figures, a method note, and a closing contact block. Report furniture
SHALL NOT appear on any other surface.

#### Scenario: Borrowing report furniture

- **WHEN** a numbered section or an abstract is proposed on the home surface
- **THEN** it is rejected, because that furniture belongs to the document type

#### Scenario: The masthead width

- **WHEN** the report masthead is laid out
- **THEN** it may use the full frame while everything from the abstract down shares one reading
  column

### Requirement: The reading column

Everything from the abstract down, figures included, SHALL share one reading column so text and
figures align. On narrow viewports the column SHALL become one fluid column with margins, and the
cover title SHALL step down to a recorded size floor.

#### Scenario: A figure wider than the text

- **WHEN** a chart needs more width than the prose
- **THEN** the column widens for both, and figure label size is checked at the same time

### Requirement: Five figures

The report SHALL present five figures. Each SHALL carry a caption that states the assumption behind
it. Figure 1 SHALL show three supplier submissions resolving to one record.

#### Scenario: Reading a figure caption

- **WHEN** the reader reaches any figure
- **THEN** the caption states the assumption, not only the description

#### Scenario: Figure 1 is illustrative

- **WHEN** figure 1 is rendered
- **THEN** its caption states that the three submissions are illustrative and not a real record

#### Scenario: Chart marks carry meaning

- **WHEN** a chart distinguishes a measured value from an assumption
- **THEN** the distinction uses the indigo and clay roles, and no chart introduces its own colour

### Requirement: The model follows its inputs

The report SHALL expose two assumptions as controls: the share of traffic that is human, and a baseline
session length. A third assumption, time to file one record by hand, SHALL be stated as a fixed
assumption rather than offered as a control. Every derived output SHALL recompute when a control
changes, with no page load and no rounding that contradicts the arithmetic.

#### Scenario: The default state

- **WHEN** the reader arrives with no interaction
- **THEN** the outputs show the values produced by the default assumptions, and they match the figures
  the prose states

#### Scenario: Changing one assumption

- **WHEN** the reader changes the human-share control
- **THEN** every dependent output updates and the measured inputs do not change

#### Scenario: The fixed assumption

- **WHEN** the reader looks for a way to change the time to file one record
- **THEN** there is none, and the value is stated as an assumption the figures rest on

#### Scenario: A measured input

- **WHEN** the reader looks at the inputs
- **THEN** the assumptions are visually marked as assumptions, and the measured inputs are visually
  marked as measurements

### Requirement: The report is complete without scripting

Every figure SHALL render its intended form without scripting, and the model SHALL show its default
outputs without scripting. Scripting MAY add interaction that changes the outputs.

#### Scenario: Scripting unavailable

- **WHEN** a reader opens the report with scripting unavailable
- **THEN** all five figures are drawn, the method note is present, and the outputs show the default
  assumptions' results

#### Scenario: A script-built figure

- **WHEN** a figure's content is generated at runtime
- **THEN** the same content is present in the delivered document, so the figure is not blank without
  scripting

### Requirement: The method note

The report SHALL state, in one place, which figures are measured, which are derived by arithmetic,
which are assumptions the reader can change, and which claims are not measured at all.

#### Scenario: Revenue

- **WHEN** the method note is read
- **THEN** it states that revenue is not measured

#### Scenario: A derived figure

- **WHEN** a derived figure is listed
- **THEN** its inputs and arithmetic are stated next to it

### Requirement: Section navigation states position

The report SHALL offer in-page navigation across its sections that states which section is in view,
and SHALL keep that navigation reachable on a narrow viewport.

#### Scenario: Reading deep in the document

- **WHEN** the reader is inside section three
- **THEN** the in-page navigation marks section three as current

#### Scenario: A narrow viewport

- **WHEN** the reader is on a narrow viewport
- **THEN** the section navigation is available through a control, not hidden entirely

### Requirement: The stated reading time is true

If the report states a reading time, that time SHALL match the document's actual word count at a
recorded reading rate.

#### Scenario: Copy is added

- **WHEN** the report grows past the stated reading time
- **THEN** the stated time changes in the same edit
