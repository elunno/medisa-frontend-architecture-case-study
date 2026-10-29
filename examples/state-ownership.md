# Example — State Ownership Matrix

| State | Source of truth | Lifetime | Suggested owner | Why |
|---|---|---|---|---|
| Modal open | UI | seconds | local component | narrowest owner |
| Reader font size | user/device preference | sessions | persisted preference layer | survives route but not server-owned business data |
| Current user | auth/session | session | identity/application | cross-route identity |
| Subscription | backend | cached | query/domain layer | remote authority |
| Entitlement result | derived | short-lived | domain policy | derived from user + resource context |
| Current audio track | frontend runtime | cross-route | audio application runtime | route-independent lifecycle |
| Audio position | runtime | high-frequency | audio runtime | avoid broad rerenders |
| Selected slot | workflow | minutes | booking flow | dies when flow ends |
| Slot availability | backend | stale-able | query cache | server authority |
| Assessment answers | workflow | minutes | assessment session | scoped to run |
| Book list | backend | cached | query cache | server data |
