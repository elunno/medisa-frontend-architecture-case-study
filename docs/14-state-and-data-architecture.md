# 14 — State & Data Architecture

## The main distinction

The supplied stack includes TanStack Query and Zustand. Those tools solve different problems.

A useful architectural split is:

### Server state

Data owned by a remote authority:

- books/content;
- professional profiles;
- appointment availability;
- subscription/account state;
- bookmarks/progress persisted on the server;
- assessment definitions/results when server-backed.

Characteristics:

- asynchronous;
- cached;
- can become stale;
- needs invalidation/refetch;
- shared with other clients.

### Client/application state

Data owned by the current frontend runtime:

- current audio runtime state;
- transient flow step;
- open dialogs;
- unsaved form state;
- local interaction state;
- potentially persisted reader preferences.

## Why mirroring is dangerous

A common anti-pattern:

```text
API → Query Cache → copy into global store → components
```

Now the app has two sources of truth for the same server-owned data.

Use a second copy only when there is a deliberate need, such as editable draft state with clear reconciliation semantics.

## State ownership matrix

See [State Ownership](../examples/state-ownership.md).

## API boundary

A useful request flow:

```text
UI
 ↓
Feature query / mutation
 ↓
Domain API adapter
 ↓
Shared HTTP client
 ↓
Backend
```

Cross-cutting responsibilities belong low in the stack:

- credentials;
- cancellation;
- normalized network errors;
- retry defaults;
- request IDs/observability hooks.

Feature semantics stay higher:

- “slot became unavailable”;
- “subscription required”;
- “assessment already completed.”

## Validation

The supplied manifest contains Zod. Runtime validation can be valuable at unsafe boundaries, especially for:

- persisted state migrations;
- URL/query parameters;
- third-party callback payloads;
- complex API responses where schema drift has high impact.

Package presence alone does not prove exactly where production validation occurred.
