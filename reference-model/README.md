# Sanitized Reference Model

This directory makes selected architectural ideas executable without exposing proprietary production source.

## Important

- These files are **not copied from the commercial application**.
- Names and data structures are intentionally generic.
- The implementation is dependency-free so reviewers can run it immediately.
- The goal is to demonstrate business-rule testing and explicit lifecycle modeling.

## Modules

| Module | Demonstrates |
|---|---|
| `entitlements.mjs` | free/premium/temporary-access decisions |
| `audio-machine.mjs` | persistent playback state transitions |
| `booking-machine.mjs` | booking/payment/stale-slot transitions |
| `assessment-engine.mjs` | deterministic scoring and result bands |
| `progress.mjs` | normalized progress calculation |
| `mood-flow.mjs` | data-driven branching |
| `availability.mjs` | earliest available slot selection |
| `locale.mjs` | direction resolution |

## Run tests

```bash
npm test
```
