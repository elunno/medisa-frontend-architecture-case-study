# Example — Risk-Based Testing Matrix

| Area | Failure impact | Unit/model | Integration | E2E |
|---|---:|---|---|---|
| Entitlements | High | policy branches/time windows | gate UI + refreshed access | free → upgrade → premium access |
| Authentication | High | token/session helpers | auth bootstrap/logout | login/logout protected route |
| Booking | Very high | state transitions | stale slot + payment UI | discover → pay → confirmed |
| Audio | Medium/High | state machine/progress | route persistence | play → navigate → resume |
| Assessment | High | scoring boundaries | runner validation/result | complete assessment |
| Progress | Medium | clamp/calculation/conflict | save/restore | read/listen restore |
| Locale/RTL | Medium | direction/date helpers | direction-aware components | smoke critical RTL journey |
| PWA/connectivity | Medium/High | cache policy helpers | offline/reconnect states | selected offline scenario |

## Prioritization rule

A low-level helper with little business impact does not deserve more test investment than a payment or entitlement edge merely because it is easy to test.
