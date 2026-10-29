# Deep Dive 02 — Persistent Cross-Route Audio

## Product requirement

When a user starts an audio summary, playback should continue while navigating elsewhere. A smaller player/progress surface remains available across the application.

## Architecture consequence

The media lifecycle must live above the route that started playback.

```text
Application Shell
├─ Router output
└─ Audio Runtime
```

## State split

### Control state

- current track;
- play/pause status;
- duration;
- error;
- loading status.

### High-frequency state

- current time;
- buffered range;
- waveform cursor if applicable.

### Persisted progress

- last meaningful checkpoint;
- server/local synchronization metadata.

## State machine

See [audio-state-machine.svg](../../diagrams/audio-state-machine.svg).

Key transitions:

```text
idle → loading → playing ↔ paused → finished
                ↘ error
```

A route change is intentionally **not** a playback transition.

## Race: track replacement

If track A is loading and the user selects track B:

1. identify the active load request;
2. cancel/ignore stale A resolution;
3. make B the current track;
4. ensure A cannot overwrite B state later.

## Render performance

A global runtime does not mean every audio tick should replace a giant global object. Narrow subscriptions and low-frequency checkpoints reduce unnecessary renders.

## Progress persistence

Avoid sending progress on every `timeupdate`. Persist at controlled checkpoints and on meaningful lifecycle events.

## Error recovery

- transient network error → retry;
- unavailable/protected content → explain access state;
- decode/media error → offer retry or report;
- logout → stop protected playback and clear user-specific state.

## Tests

The public reference state machine verifies:

- valid load/ready/play/pause/end transitions;
- route-change persistence;
- invalid transitions are rejected;
- new track load replaces the previous track state.

## Trade-offs

**Benefits:** persistent UX, consistent control surface, route independence.  
**Costs:** application-level lifecycle complexity, synchronization, cleanup discipline.
