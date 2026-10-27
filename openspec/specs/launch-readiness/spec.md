# launch-readiness Specification

## Purpose

Defines what must be true before the site is publicly reachable: a real address, a real origin,
metadata that resolves, a surface for a missing page, and a share image.

## Requirements

### Requirement: A real contact address

The site SHALL state one real contact address. A placeholder SHALL NOT be delivered, and the same
address SHALL be used everywhere it appears.

#### Scenario: Reading the footer

- **WHEN** the reader follows the contact path anywhere on the site
- **THEN** it reaches the same real address, and no surface still carries a placeholder

### Requirement: An origin, and canonical addresses

The site SHALL declare its origin, which is `https://vansiriso.uk` at the apex over `https`. Every
surface SHALL declare a canonical address built from that origin, and no canonical address SHALL
resolve to a different surface.

#### Scenario: Two paths to one surface

- **WHEN** a surface is reachable by a second path
- **THEN** its canonical address names the one true path

#### Scenario: A non-canonical host

- **WHEN** a reader arrives over `http` or on `www.vansiriso.uk`
- **THEN** they are redirected to the apex over `https`, and the canonical address they end on is that
  redirect target

#### Scenario: A missing origin

- **WHEN** the site is delivered without an origin
- **THEN** the release is blocked, because canonical and share metadata cannot be resolved

### Requirement: Per-surface metadata

Every surface SHALL declare a title and a description that describe that surface rather than the site
as a whole, and every surface SHALL carry share metadata that resolves.

#### Scenario: Sharing the report

- **WHEN** a reader shares the report's address
- **THEN** the preview shows the report's own title and description, not the home surface's

### Requirement: A missing-page surface

The site SHALL present a surface for an unknown address, in the same frame and design language, that
names the situation and offers a way back to the content.

#### Scenario: A mistyped address

- **WHEN** a reader requests an address that does not exist
- **THEN** they see the designed missing-page surface with a route back, not a bare error

### Requirement: A share image

The site SHALL provide a share image that is legible at thumbnail size and consistent with the design
language.

#### Scenario: A shared link with no image

- **WHEN** the site is shared on a platform that renders a preview
- **THEN** an image is present, and it is the site's own rather than a platform default

### Requirement: The résumé path

The site SHALL either offer a résumé at a stated address or SHALL NOT imply that one can be
requested elsewhere on the site.

#### Scenario: A reader looking for the résumé

- **WHEN** the reader looks for a résumé
- **THEN** the route they find is real, or the site does not offer one

### Requirement: No tracking

The site SHALL NOT include third-party tracking, and SHALL NOT send a reader's content or questions
to a third party for analytics.

#### Scenario: Reviewing what the client loads

- **WHEN** the delivered site is reviewed for third-party requests
- **THEN** the only outbound requests are those the reader's own action caused
