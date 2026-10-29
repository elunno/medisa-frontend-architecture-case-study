# How to Read This Case Study

## Audience

This repository is designed for three audiences:

- **Recruiters:** understand scope and ownership quickly from the README.
- **Senior/Staff frontend engineers:** inspect trade-offs, state boundaries, failure modes, and test strategy.
- **Hiring managers:** evaluate whether the engineering reasoning is grounded in production complexity.

## Three kinds of statements

Every major claim belongs to one of these categories:

1. **Production fact** — directly supplied about the application or visible in the supplied manifest/feature inventory.
2. **Conceptual model** — a simplified representation used to explain the shape of the problem.
3. **Retrospective recommendation** — how I would formalize or improve the architecture today.

Those categories are intentionally not blurred. See [Evidence & Claims](appendices/evidence-and-claims.md).

## What this repository is not

This is not:

- a code dump;
- a clone of the original commercial application;
- a claim that every diagram exactly matched the historical codebase;
- a place for confidential metrics, APIs, credentials, or user data;
- a generic “best practices” article disconnected from product constraints.

## Best reading path

1. [Product Context](01-product-context.md)
2. [Architecture Overview](02-architecture-overview.md)
3. Pick one [Hero Deep Dive](deep-dives/01-entitlements.md)
4. Read its related ADR
5. Review [Testing Strategy](16-testing-strategy.md)
6. Finish with [Lessons & Retrospective](20-lessons-and-retrospective.md)
