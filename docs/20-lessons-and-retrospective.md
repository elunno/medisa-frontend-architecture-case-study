# 20 — Lessons & Retrospective

## Architecture is a record of pressure

The most useful architecture emerges when the product creates real pressure:

- access rules appear in many screens;
- media must survive navigation;
- availability becomes stale;
- state is copied between stores;
- shared UI becomes a dumping ground;
- locale assumptions leak into layout.

The correct response is not “rewrite everything.” It is to identify the boundary that now matters.

## What I would formalize earlier

### 1. Entitlements as a first-class domain

Subscription checks become difficult when individual components own access decisions. A stable resolver/contract makes policy easier to reason about and test.

### 2. Audio as application infrastructure

Persistent playback proves that media is not merely a book-page widget. The runtime belongs above route lifecycle.

### 3. Explicit state ownership

Documenting who owns server data, workflow state, persisted preferences, and global runtime state prevents duplicated truth.

### 4. Error taxonomy

A stale booking slot, payment rejection, network timeout, and expired subscription are not interchangeable “errors.” Modeling them explicitly improves recovery UX and observability.

### 5. Design-system governance

Shared components need ownership boundaries. Reuse without governance can create a second monolith.

### 6. Privacy review for wellness data

Assessment answers, session reflections, and personalized wellness context deserve stronger cache/logging/analytics scrutiny than ordinary public content.

## What I would avoid

- over-generalizing before repeated semantics exist;
- putting all state in one store;
- letting components call arbitrary HTTP endpoints directly;
- using client-side gates as security controls;
- claiming performance wins without measurements;
- designing abstractions around library APIs instead of product responsibilities.

## The larger lesson

A large frontend is easier to scale when architecture follows **lifecycles and ownership**:

- who owns the truth;
- how long the state must live;
- what can invalidate it;
- what depends on it;
- what happens when it fails.

Those questions remain useful even when libraries change.
