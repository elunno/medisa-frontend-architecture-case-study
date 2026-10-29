# ADR-006 — Use a Data-Driven Assessment Engine

## Status

Conceptual architecture for repeated assessment flows.

## Context

Many assessments repeat navigation, answer capture, validation, scoring, and result presentation.

## Options

1. Build each assessment as a separate page tree.
2. Share UI only, duplicate scoring and flow.
3. Use shared runner/evaluator mechanics with data-driven assessment definitions.

## Decision

Prefer option 3 when assessment semantics support it.

## Consequences

**Positive:** less duplication, deterministic scoring tests, consistent UX, easier new-assessment onboarding.  
**Negative:** definition schema becomes an API that needs validation/versioning; truly unique assessments may need escape hatches.
