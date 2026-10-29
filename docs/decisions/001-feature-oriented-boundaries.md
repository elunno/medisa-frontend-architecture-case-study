# ADR-001 — Prefer Feature/Domain Boundaries

## Status

Retrospective recommendation / conceptual model.

## Context

The product spans identity, subscription, content, media, professionals, booking, mood journeys, meditation, assessments, notifications, onboarding, and PWA concerns.

A file-type-only structure makes ownership harder to see as the codebase grows.

## Options

1. File-type folders only (`components`, `hooks`, `services`).
2. Route-oriented ownership only.
3. Feature/domain-oriented modules with shared platform primitives.

## Decision

Prefer option 3 for complex product behavior.

## Consequences

**Positive:** stronger ownership, easier local reasoning, explicit public contracts.  
**Negative:** some duplication, boundary governance, naming decisions, occasional cross-domain orchestration layer.

## Guardrail

Do not make every tiny UI variation a “domain.” Boundaries should follow meaningful business responsibilities and lifecycles.
