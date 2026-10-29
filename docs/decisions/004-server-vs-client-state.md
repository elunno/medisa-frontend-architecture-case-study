# ADR-004 — Separate Server State from Client State

## Status

Architecture principle supported by the supplied use of TanStack Query and Zustand.

## Context

The product contains remote, cacheable data and local runtime/workflow state.

## Options

1. Put everything into one global store.
2. Keep all server data local to pages.
3. Use a server-state cache for remote data and client/application state for frontend-owned lifecycles.

## Decision

Use option 3 by default.

## Consequences

**Positive:** fewer synchronization bugs, clearer invalidation, smaller stores, better ownership.  
**Negative:** developers must understand two state models and the boundary between them.
