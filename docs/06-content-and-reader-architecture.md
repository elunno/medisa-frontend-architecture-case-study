# 06 — Content & Reader Architecture

## Content model

The core content product included text and audio summaries. A useful conceptual content model is:

```text
Content Item
├── identity / metadata
├── localized title and description
├── text summary
├── audio summary
├── artwork
├── categories / discovery metadata
└── access policy
```

The UI then composes several experiences around the same content identity:

```text
Library / Explore
       ↓
Content Details
  ┌────┼───────────────┐
  ▼    ▼               ▼
Read  Listen         Bookmark
  │    │
  ▼    ▼
Reader Audio runtime
  │    │
  └─ Progress ─────────┘
```

## Reader responsibilities

The supplied product description includes configurable reading style such as font and color changes. Reader architecture therefore has at least three classes of state:

### Content state

- current content/chapter/section;
- current location;
- calculated progress;
- loading/error state.

### Preference state

- font family;
- font size;
- color/theme;
- direction-aware typography;
- potentially line height/spacing.

### User state

- bookmark;
- saved position/progress;
- entitlement.

## Why separate preference from content state

Changing typography should not conceptually mean “reload the user's reading progress.” These states have different lifecycles.

A useful ownership model:

```text
Reader UI local state
      │
      ├─ ephemeral controls
      │
Persisted preferences
      │
      ├─ font / theme / reader settings
      │
Server state
      └─ content + saved progress + bookmark
```

## Pagination vs scrolling

The exact production pagination algorithm is not disclosed. For either paginated or scrolling readers, the architecture should isolate:

- content rendering;
- viewport measurement;
- position/progress conversion;
- persistence policy;
- preference changes.

## RTL/LTR concerns

A multilingual reader needs direction-aware handling for:

- text alignment;
- navigation affordances;
- swipe/next/previous semantics;
- icon direction;
- font selection;
- numeric/date fragments inside RTL text.

## Content production pipeline

The supplied description includes editorial summarization, voice-script preparation, and ElevenLabs API v3 audio generation. A public conceptual pipeline is:

```text
Source material
    ↓
Editorial summarization
    ↓
Voice-ready script
    ↓
Text-to-speech generation
    ↓
Audio asset
    ↓
Content platform
    ↓
Frontend playback
```

This case study does not publish copyrighted source content, generated audio, private asset URLs, or internal content-management APIs.
