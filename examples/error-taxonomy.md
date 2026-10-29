# Example — Error Taxonomy

```text
Transport
├─ offline
├─ timeout
└─ unexpected status

Identity
├─ unauthenticated
└─ session expired

Access
├─ subscription required
├─ subscription expired
└─ resource unavailable

Booking
├─ slot stale
├─ slot invalid
├─ payment failed
└─ confirmation pending/failed

Content/Media
├─ asset unavailable
├─ media decode/load error
└─ progress synchronization conflict

Validation
├─ invalid input
└─ incomplete assessment
```

A normalized transport error can be converted into a domain error. The domain decides the recovery UX.
