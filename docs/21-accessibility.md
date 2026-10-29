# 21 — Accessibility

## Why accessibility is architectural

Accessibility is not a final QA pass. This product contains dialogs, forms, media controls, reading surfaces, date/slot selection, dynamic assessments, toasts, and direction-aware UI. Accessibility behavior belongs in shared primitives and domain acceptance criteria.

The supplied manifest includes Headless UI and Radix accessibility-oriented primitives such as `VisuallyHidden`. That supports the presence of useful accessibility infrastructure, but this case study does not invent a historical WCAG conformance claim.

## Shared primitive responsibilities

A design-system primitive should make the correct path easier:

- keyboard focus management for dialogs and overlays;
- visible focus states;
- semantic labels for icon-only controls;
- form label/error association;
- screen-reader announcements for important async state;
- disabled/loading semantics that do not silently trap users;
- reduced-motion support where animation is non-essential.

## Audio player

The persistent player should expose:

- a meaningful track title;
- play/pause button state;
- accessible seek/progress semantics;
- keyboard-operable controls;
- non-color-only indicators;
- clear loading/error feedback.

A waveform is a visualization, not the only control surface.

## Reader

Reader customization can improve accessibility when implemented carefully:

- font sizing without clipping;
- sufficient contrast across theme choices;
- line length and spacing that remain usable;
- logical document structure;
- focus order compatible with pagination/navigation;
- RTL/LTR semantics at the document/container level.

## Booking and assessments

High-risk interaction details include:

- slot grids that remain keyboard navigable;
- errors announced near the relevant input;
- current step/progress communicated semantically;
- question groups using correct labels and roles;
- result charts accompanied by textual interpretation.

## Testing approach

Automated accessibility checks are useful but incomplete. Combine them with keyboard-only review, screen-reader smoke testing of critical journeys, and semantic assertions in component/integration tests.
