# ADR-002 — Keep Audio Runtime Above Route Lifecycle

## Status

Conceptual decision derived from the production requirement for cross-route playback.

## Context

Audio playback must continue when the starting page unmounts during navigation.

## Options

1. Page-level player.
2. Route-group player.
3. Application-level audio runtime with feature UI subscribers.

## Decision

Use an application-level runtime.

## Why

Playback lifecycle must not be coupled to one page lifecycle.

## Consequences

**Positive:** persistent playback, single control state, consistent mini-player.  
**Negative:** broader lifecycle responsibility, cleanup complexity, need for narrow subscriptions to avoid render fan-out.
