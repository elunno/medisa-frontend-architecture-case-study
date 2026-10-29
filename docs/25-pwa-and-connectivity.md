# 25 — PWA & Connectivity

## Evidence

The supplied feature inventory includes `pwa` and `connectivity`, while the manifest includes Serwist and `@serwist/next`. This supports treating service-worker/connectivity concerns as part of the frontend architecture.

The exact production cache rules are not disclosed and are not inferred here.

## The key design question

Not all application data should have the same offline policy.

A useful classification is:

| Data/resource | Cache posture |
|---|---|
| Public static assets | good cache candidate |
| Public content metadata | potentially cacheable with freshness policy |
| Audio assets | potentially large; quota and access policy matter |
| Subscription/entitlement state | must not be trusted indefinitely offline |
| Appointment availability | freshness-critical |
| Payment state | online/authoritative |
| Assessment/session sensitive data | privacy review required |

## Connectivity state

The UI should avoid overpromising what `navigator.onLine` means. “Online” does not guarantee the API is reachable.

Useful states can include:

- browser reports offline;
- API unreachable;
- request timed out;
- reconnecting;
- recovered and revalidating stale data.

## Mutation recovery

Offline mutation queues require explicit product rules. A bookmark mutation may be safely replayable; a booking/payment mutation may not be.

## Service-worker updates

A PWA also needs an update strategy:

- detect new version;
- avoid corrupting in-progress user work;
- communicate refresh when necessary;
- handle persisted-state schema changes.

## Privacy boundary

Sensitive personalized data should not enter a service-worker cache just because caching improves offline UX. Cache policy is part of the privacy/security model.
