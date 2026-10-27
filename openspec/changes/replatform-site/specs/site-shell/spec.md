# Spec Delta

## Purpose

Defines the frame every surface sits in: the top bar, navigation, the one invitation, the agent
switch, the theme choice, the narrow-viewport menu, and the keyboard path through all of them.

## ADDED Requirements

### Requirement: A shared top bar

Every surface SHALL carry the same top bar, in the same order: the site name as a link home,
navigation, one invitation, the agent switch, and the theme control. A surface SHALL NOT omit or
reorder these.

#### Scenario: Arriving on any surface

- **WHEN** the reader opens any of the five surfaces
- **THEN** the top bar is present, in the same order, and the invitation leads to one address

### Requirement: One filled invitation

The top bar SHALL contain exactly one filled invitation. A document surface MAY repeat that
invitation in its closing block. No other filled invitation SHALL exist anywhere on the site.

#### Scenario: The report's closing block

- **WHEN** the reader reaches the end of the report
- **THEN** the closing block may offer the invitation, and it is the only other filled invitation

#### Scenario: Adding a second call to action

- **WHEN** a surface is proposed to carry two filled actions
- **THEN** the second becomes an outlined action or a plain link

### Requirement: The current surface is stated

Navigation SHALL state which surface the reader is on, in a way assistive technology announces,
including on the agent surface.

#### Scenario: On the home surface

- **WHEN** the reader is on the home surface
- **THEN** the home link is marked current

#### Scenario: On the agent surface

- **WHEN** the reader is on the agent surface
- **THEN** the agent switch is on and announced as current, not merely styled

### Requirement: The theme choice

The site SHALL follow the operating system's colour preference until the reader makes a choice. A
choice SHALL persist across surfaces and visits and SHALL win from then on, applied once the page is
interactive. A fresh load MAY show the system theme before the stored choice applies.

#### Scenario: First visit on a dark system

- **WHEN** a reader whose system prefers dark arrives with no stored choice
- **THEN** the site renders dark from the first paint, because the system preference needs no scripting

#### Scenario: Returning after choosing

- **WHEN** a reader who chose light returns on a system that prefers dark
- **THEN** the site settles on light once the page is interactive, and keeps it for the rest of the visit

#### Scenario: No scripting available

- **WHEN** scripting is unavailable
- **THEN** the site follows the operating system preference and remains fully readable

#### Scenario: The control disagrees with the page

- **WHEN** the theme control cannot take effect
- **THEN** it SHALL NOT announce a state that contradicts the rendered page

### Requirement: The narrow-viewport menu

Below the recorded breakpoint, navigation SHALL collapse behind a menu control. The menu SHALL close
on Escape, on choosing a link, and when the viewport widens past the breakpoint. Opening the menu
SHALL move focus into the navigation, and closing it SHALL return focus to the control.

#### Scenario: Opening the menu with a keyboard

- **WHEN** a keyboard user opens the menu
- **THEN** focus moves into the revealed navigation and the next Tab reaches the links

#### Scenario: Closing the menu

- **WHEN** the reader presses Escape or chooses a link
- **THEN** the menu closes and focus returns to the control

#### Scenario: A document surface on a narrow viewport

- **WHEN** the reader is on the document surface below the breakpoint
- **THEN** in-page section navigation is still reachable, and the surface does not rely on the
  desktop-only section links

### Requirement: The keyboard path

Every surface SHALL offer a skip link as the first focusable element, SHALL show a visible focus
indicator of a recorded width and offset on every focusable element, and SHALL NOT trap focus.

#### Scenario: Skipping the bar

- **WHEN** a keyboard user presses Tab on arrival
- **THEN** the skip link receives focus first and moves focus past the top bar

#### Scenario: Focus on a filled invitation

- **WHEN** the invitation receives focus
- **THEN** the indicator is drawn outside the fill so it stays visible against its own colour

### Requirement: Interactive targets meet the size floor

Every interactive control SHALL present a target of at least 44 by 44 in both dimensions, either as
its visible size or as a hit area that does not overlap another target.

#### Scenario: A small icon control

- **WHEN** a control's glyph is smaller than the floor
- **THEN** the target is expanded to the floor, so the visible mark and the hit area may differ

#### Scenario: An inline text link

- **WHEN** a link sits inside a paragraph
- **THEN** it is exempt from the target floor but SHALL remain reachable and visibly focused

### Requirement: The footer

Every surface SHALL end with a footer carrying the site name, links to all content surfaces, and the
contact path. Footer links SHALL meet the target floor where they are not inside a paragraph.

#### Scenario: Reaching the end of a surface

- **WHEN** the reader reaches the footer
- **THEN** every content surface is reachable from it, and the contact path is present
