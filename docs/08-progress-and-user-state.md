# 08 — Progress & User State

## Two modes of completion

The product supports both reading and listening. That creates a modeling question:

```text
Content X
├─ reading:   35%
└─ listening: 72%
```

There are at least three distinct concepts:

- reading progress;
- listening progress;
- user-facing “overall completion” shown in discovery/library UI.

The business rule for overall completion should be explicit rather than accidental.

## Conceptual data shape

```text
ContentProgress
├─ contentId
├─ reading.progress
├─ reading.position
├─ listening.progress
├─ listening.position
├─ lastMode
└─ updatedAt
```

## Persistence strategy

Persisting every audio tick or every scroll pixel is inefficient. A resilient strategy typically uses checkpoints:

- debounce/throttle client events;
- persist on meaningful intervals;
- persist on pause/navigation/visibility change where practical;
- include timestamp/version information to avoid older writes replacing newer state;
- reconcile server and local state after reconnect.

The exact production persistence policy is not disclosed here.

## Bookmark vs progress

Bookmarking and progress are separate semantics:

- **progress** answers “where was I?”
- **bookmark** answers “I explicitly want to save this item.”

They may share API infrastructure but should not be conflated in domain behavior.

## Display rules

A library card may show a single percentage, but that is a presentation decision over richer domain state.

The reference model uses a simple `max(reading, listening)` display rule solely as an executable example. It is not asserted as the historical production rule.

See `reference-model/src/progress.mjs`.
