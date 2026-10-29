# 01 — Product Context

## Product shape

The production application was a multilingual consumer platform combining digital content, subscription access, media playback, professional services, personalized wellness journeys, and psychological assessments.

A user could register or sign in with email or mobile identity, use free capabilities, encounter premium gates, purchase a subscription, and gain access for the subscription period.

The content side included text and audio book summaries. The supplied product description also includes direct editorial ownership of book summarization, preparation of voice-ready scripts, and generation of audio assets using ElevenLabs API v3.

The professional-services side allowed users to discover consultants, inspect rich profiles and availability, choose a time, pay, receive session-related notifications, review previous sessions, and add post-session reflection/summary information.

The wellness side included a mood checker that asked follow-up questions and produced next-step suggestions such as reading content, meditation, media, or talking with a professional. The application also included audio meditation experiences and psychological assessments with analyzed result output.

## Why this became a frontend architecture problem

The challenge was not the number of pages. It was the interaction between different lifecycles:

```text
Identity lifecycle
    └─ anonymous → authenticated

Subscription lifecycle
    └─ free → active → expired / renewed

Content access lifecycle
    └─ denied → temporarily allowed → denied again

Media lifecycle
    └─ idle → playing → route change → still playing

Booking lifecycle
    └─ discovered → selected → payment → confirmed / failed / stale

Assessment lifecycle
    └─ started → answered → submitted → evaluated → interpreted
```

Each lifecycle has different owners and different failure modes. A single “global app state” abstraction would hide those differences rather than solve them.

## User lifecycle

```text
Visitor
  │
  ├─ Register / Login with email or mobile
  ▼
Authenticated Free User
  │
  ├─ Free capabilities
  ├─ Time-limited promotional content
  └─ Premium capability
        │
        ▼
   Upgrade / Payment
        │
        ▼
   Active Subscriber
        │
        └─ Access until subscription state changes
```

## Content lifecycle

```text
Content metadata
   ↓
Details / discovery
   ↓
┌─────────────┬─────────────┐
│ Read        │ Listen      │
└─────┬───────┴──────┬──────┘
      │              │
      ▼              ▼
 Reading progress   Listening progress
      │              │
      └──────┬───────┘
             ▼
      User-facing progress
```

## Professional-service lifecycle

```text
Search / Filter / Sort
        ↓
Professional Profile
        ↓
Earliest Availability
        ↓
Choose Slot
        ↓
Validation / Payment
        ↓
Booking Confirmation
        ↓
Upcoming Session
        ↓
Reminder / Join
        ↓
Completed Session
        ↓
Reflection / History
```

## Product capabilities visible in the supplied feature inventory

The supplied feature directory names also show infrastructure and supporting domains beyond the core journeys:

- connectivity;
- app store/application state;
- authentication token management;
- courses;
- social follow/like interactions;
- explore feed;
- notifications;
- personalized onboarding;
- profile;
- PWA;
- theme control;
- app header and shared navigation surfaces.

The exact behavior of those features is not inferred beyond their supplied names.

## Engineering implication

A frontend of this shape benefits from **domain-oriented ownership plus shared platform capabilities**. Shared concerns should be shared intentionally; domain rules should stay domain-owned.
