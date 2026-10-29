# ADR-003 — Centralize Entitlement Decisions

## Status

Conceptual model / retrospective recommendation.

## Context

Access can depend on authentication, subscription status, resource policy, and temporary free windows.

## Options

1. Inline `isPremium` checks in components.
2. Per-feature duplicated access helpers.
3. A shared entitlement contract with domain-specific policy inputs.

## Decision

Use option 3.

## Consequences

**Positive:** consistent rules, testability, richer denial reasons, easier future plan support.  
**Negative:** abstraction maintenance, cache invalidation considerations, temptation to make one overly generic policy engine.

## Security note

Frontend entitlements improve UX; backend authorization remains authoritative.
