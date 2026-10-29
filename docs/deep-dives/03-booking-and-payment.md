# Deep Dive 03 — Booking, Availability & Payment

## Product requirement

Users can search professionals, inspect profiles, see near-term availability, choose a slot, pay, receive upcoming-session notifications, and review completed sessions.

## Why this is a workflow, not a form

Each step can invalidate the next:

```text
Discovery data can go stale.
Availability can disappear.
Payment can fail.
Payment can succeed while confirmation is delayed.
Network can disappear after submit.
```

## State machine

```text
browsing
  ↓ choose-slot
slot-selected
  ↓ validate
validating
  ├─ stale → stale-slot
  └─ valid → payment-pending
               ├─ fail → payment-failed
               └─ confirm → booked
```

## Server authority

The frontend can display slot availability, but only the backend can guarantee reservation consistency.

The UI should therefore communicate:

> “Available” means available at the time this data was produced, not permanently reserved for this client.

## Optimistic vs pessimistic UX

Slot booking is usually a poor place for irreversible optimistic success because conflict is possible. Optimism can still be used for low-risk UI transitions, but final booked state should follow server confirmation.

## Payment ambiguity

A redirect-based payment flow can create a three-system problem:

```text
Frontend ↔ Backend ↔ Payment Provider
```

The safest UI model treats backend verification as final truth, even if the provider redirect looks successful.

## Retry design

Retries should be operation-aware:

- refetching availability is safe;
- creating a payment intent may need idempotency;
- repeating final booking creation blindly may not be safe.

## Tests

The reference model tests:

- happy-path booking;
- stale slot path;
- payment failure;
- retry from payment failure;
- invalid transition protection.

The availability test verifies earliest available slot selection from unsorted data.
