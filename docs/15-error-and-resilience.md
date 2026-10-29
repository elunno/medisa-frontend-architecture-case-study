# 15 — Error & Resilience Architecture

## Error handling is a product decision

“Show a toast on error” is not an error architecture.

Different failures require different recovery experiences:

| Failure | Likely UX |
|---|---|
| Network interruption | Retry / offline state / preserve work |
| Unauthorized | Re-authenticate |
| Subscription required | Upgrade path |
| Subscription expired | Explain state + renewal path |
| Slot became unavailable | Refresh slots + reselect |
| Payment failed | Retry/change method/cancel |
| Audio load failed | Retry / switch track / preserve context |
| Assessment incomplete | Inline validation |
| Server validation error | Field-level or domain-level correction |
| Unexpected crash | Error boundary + safe recovery |

## Error normalization

A shared HTTP layer can normalize transport details:

```text
Axios/network error
        ↓
Normalized error contract
        ↓
Feature-specific interpretation
```

The shared layer should not attempt to understand every business meaning.

## Connectivity and PWA

The supplied feature inventory includes `connectivity` and `pwa`, and the manifest includes Serwist. This indicates offline/connectivity behavior is a relevant architecture surface.

Resilience questions include:

- what can safely be cached;
- what must always be fresh;
- how stale subscription data is handled;
- whether protected/sensitive responses should be cached by a service worker;
- how mutations behave after reconnect;
- how the UI communicates offline state.

## Failure containment

Not every failure should crash the application shell.

Useful containment levels:

- component-level recoverable state;
- feature-level boundary;
- route-level boundary;
- application-level fallback.

## Error observability

A production error should be diagnosable without exposing user-sensitive data. Useful context may include:

- feature name;
- operation name;
- normalized error category;
- correlation/request ID;
- application version;
- route identifier.

Avoid logging tokens, private assessment answers, payment data, or sensitive session notes.
