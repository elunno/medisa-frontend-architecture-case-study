# Deep Dive 01 — Subscription & Entitlement Architecture

## Problem

The product combines free usage, premium capabilities, subscription duration, and a daily item that becomes available to all users for a limited window.

A UI-only approach spreads business logic across every entry point.

## Design target

Provide a stable contract:

```text
resolveAccess(user, subscription, resource, promotion, now)
       ↓
AccessDecision
```

Example output:

```json
{
  "allowed": false,
  "reason": "subscription-required",
  "action": "upgrade"
}
```

## Decision inputs

- authentication state;
- subscription status;
- resource policy;
- temporary promotion window;
- current authoritative time/context;
- possibly plan/tier in future.

## Decision outputs

Do not return only true/false if the UI needs recovery semantics.

Useful reasons:

- `free-content`;
- `active-subscription`;
- `temporary-access`;
- `sign-in-required`;
- `subscription-required`;
- `subscription-expired`;
- `unavailable`.

## UI integration

```text
Book card click
   ↓
Access decision
   ├─ allowed → open reader/player
   ├─ sign-in-required → auth flow
   ├─ subscription-required → upgrade
   └─ unavailable → explanatory state
```

The same policy can be used by multiple UI surfaces without duplicating rule logic.

## Time-window edge

A promotion expiring while the screen remains mounted should not depend solely on a timer in a component. The server remains the authority; the frontend can revalidate at relevant boundaries and recover from denied requests.

## Caching trade-off

Caching entitlement inputs improves UX but introduces stale access windows. Secure systems always enforce access server-side. Client caching is for UX, not authorization truth.

## Tests

See `../../reference-model/test/entitlements.test.mjs` for cases covering:

- free content;
- anonymous premium request;
- active subscription;
- expired subscription;
- active temporary access;
- expired temporary access;
- grace-period behavior in the illustrative model.

## Trade-offs

**Benefits**

- consistent business rules;
- testable behavior;
- UI does not understand payment details;
- future policies are easier to add.

**Costs**

- additional abstraction;
- access result contract must remain stable;
- careless caching can make UX stale.

## Historical-claim note

This centralized resolver is a **sanitized conceptual model** of the access problem. It is not presented as copied production source.
