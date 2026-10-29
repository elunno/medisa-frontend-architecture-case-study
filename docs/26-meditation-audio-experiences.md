# 26 — Meditation & Interactive Audio Experiences

## Product surface

The supplied product description includes multiple audio-based wellness experiences: guided meditation, nature-sound experiences, and instrumental/background meditation audio.

This creates a broader media problem than simply “play an MP3.” Different experiences may have different control surfaces, durations, metadata, layering rules, and completion semantics.

## Separate content type from playback engine

A useful model is:

```text
Meditation Definition
├─ type
├─ title / metadata
├─ primary audio asset(s)
├─ optional ambient configuration
└─ access policy
       ↓
Meditation Session
├─ playback state
├─ elapsed time
├─ selected options
└─ completion state
       ↓
Shared Media Runtime / Audio Primitives
```

This keeps “what this meditation means” separate from low-level media playback.

## Guided meditation

Typical frontend concerns:

- start/pause/resume;
- session duration;
- interruption recovery;
- subscription/access checks;
- progress/completion semantics;
- background playback behavior where supported.

## Nature-sound composition

If an experience allows users to combine or adjust ambient sounds, a useful conceptual model is layer-based:

```text
Session
├─ rain layer: volume / enabled
├─ forest layer: volume / enabled
├─ ocean layer: volume / enabled
└─ master playback state
```

This is presented as a **design model for an interactive sound-composer experience**, not a claim about the exact historical audio mixing implementation.

## Shared audio vs separate runtime

Book audio and meditation audio may share low-level primitives while preserving domain semantics:

- book progress may map to content completion;
- a meditation session may have its own completion/session rules;
- an ambient mixer may have multiple active layers rather than one track.

A shared playback abstraction should not erase those differences.

## Performance concerns

- avoid broad rerenders from high-frequency audio events;
- unload unused media resources;
- avoid preloading every sound asset eagerly;
- handle mobile browser playback restrictions;
- persist only the state that has product value.
