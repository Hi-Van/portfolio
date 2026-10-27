# Spec Delta

## Purpose

Holds everything the site says: which surfaces carry content, what each one is for, and the
provenance and mechanism every number must carry so no figure can appear as decoration.

## ADDED Requirements

### Requirement: Five surfaces with distinct jobs

The site SHALL present exactly five surfaces: home, work, about, report, and ask. Each SHALL have
one stated job, and content SHALL NOT be duplicated between surfaces except as a link.

#### Scenario: A reader looking for systems

- **WHEN** a reader wants the systems behind the numbers
- **THEN** the work surface names them, and the report carries the reasoning, and the home surface
  links to both rather than repeating either

#### Scenario: A duplicated model

- **WHEN** a surface is proposed that repeats the report's model
- **THEN** it is rejected in favour of a link, because the model has one home

### Requirement: One number registry

Every number the site states SHALL be defined once, with a value, a unit, a display form, a
provenance class, and a mechanism. Every surface SHALL render that number from the definition and
SHALL NOT carry its own hard-coded copy of it.

#### Scenario: Changing a measured number

- **WHEN** the daily submission rate changes in the registry
- **THEN** the home result, the work row, the report prose, and the agent's answer all change, and
  no surface still prints the old value

#### Scenario: Two copies of one number

- **WHEN** a surface prints a quantitative claim whose value is not sourced from the registry
- **THEN** the change is rejected

### Requirement: Provenance classes

Every number SHALL be classified as exactly one of: measured at a named employer, derived by
arithmetic, assumed as a control the reader can change, or stated as not measured. A number SHALL
NOT be presented without its class.

#### Scenario: A measured number

- **WHEN** the site states 30% faster queries
- **THEN** the reading is attributable to Walmart and is presented as a measurement

#### Scenario: An assumption

- **WHEN** the site states 20 seconds per record
- **THEN** it is presented as an assumption the reader can change, not as a measurement

#### Scenario: An unmeasured claim

- **WHEN** revenue would be a useful figure
- **THEN** the site states that it is not measured instead of estimating it

### Requirement: Derived numbers show their arithmetic

A derived number SHALL name the inputs and the arithmetic that produce it. The site SHALL compute
derived values from their inputs rather than storing a result.

#### Scenario: Annual submissions

- **WHEN** the daily submission rate is 390,000
- **THEN** the annual figure is the daily rate times 365, computed, not written down

#### Scenario: Seller hours returned

- **WHEN** the reader accepts the default assumptions
- **THEN** seller hours are the volume times the human share times the session length times the 22%
  cut, and the computed default is 782,925 hours

#### Scenario: A stale result

- **WHEN** the agent describes the seller-hours saving in prose
- **THEN** the figure it states is the computed one, and it does not disagree with the report's
  printed default

### Requirement: Assumptions are reader-controlled

An assumption used by a derived number SHALL be exposed as an input the reader can change, and
changing it SHALL recompute every dependent value without a page load.

#### Scenario: Changing an assumption

- **WHEN** the reader moves the human-share assumption from a quarter to a half
- **THEN** the derived seller hours double and no other figure changes

### Requirement: Figure captions state their assumption

Every figure SHALL carry a caption that states the assumption behind it. A figure built from
illustrative rather than real records SHALL say so in its caption.

#### Scenario: An illustrative figure

- **WHEN** figure 1 shows three supplier submissions resolving to one record
- **THEN** its caption states that the submissions are illustrative and not a real record

### Requirement: Voice and copy rules

Copy SHALL be written in the first person. Copy SHALL NOT use em dashes or en dashes. Copy SHALL
NOT invent a project, employer, metric, or date to fill a layout.

#### Scenario: Filling a gap

- **WHEN** a layout needs a fourth item and only three exist
- **THEN** the layout changes, and no item is invented

#### Scenario: An NDA-limited entry

- **WHEN** an employer's detail is under NDA
- **THEN** the entry stays short and says so, rather than being embellished

### Requirement: Employer-scoped numbers stay scoped

A number measured at one employer SHALL appear only on the surfaces that discuss that employer. A
number SHALL NOT be moved to a surface where its attribution would be lost.

#### Scenario: Meta figures

- **WHEN** the report discusses the model
- **THEN** the Meta figures do not appear there, because the report's figures are Walmart
  measurements
