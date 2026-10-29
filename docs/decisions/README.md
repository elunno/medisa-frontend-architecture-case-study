# Architecture Decision Records

ADRs capture the reasoning behind important architectural choices. They intentionally include alternatives and costs.

| ADR | Decision |
|---|---|
| [001](001-feature-oriented-boundaries.md) | Prefer feature/domain boundaries over file-type-only organization |
| [002](002-application-level-audio-runtime.md) | Keep persistent audio runtime above route lifecycle |
| [003](003-centralized-entitlements.md) | Centralize access decisions behind an entitlement contract |
| [004](004-server-vs-client-state.md) | Treat server state and client/application state differently |
| [005](005-design-system-boundary.md) | Keep domain components out of the generic design system by default |
| [006](006-data-driven-assessment-engine.md) | Model repeated assessments with shared mechanics and data-driven definitions |

These ADRs are retrospective architecture documentation. They are not asserted to be verbatim historical records from the private repository.
