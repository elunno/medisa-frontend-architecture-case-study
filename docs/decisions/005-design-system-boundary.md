# ADR-005 — Keep Domain Components Outside the Generic Design System

## Status

Retrospective governance principle.

## Context

A large application creates pressure to move every reused component into a shared folder.

## Decision

The design system owns generic foundations/primitives/components. Domain-specific components remain with their domain even if reused across several screens.

## Examples

- `Button` → design system.
- `BookCard` → content domain.
- `AppointmentSlot` → booking domain.
- `AssessmentQuestion` → assessment domain.

## Consequences

**Positive:** shared system remains coherent; domain semantics stay local.  
**Negative:** some visually similar components may remain separate until semantics truly converge.
