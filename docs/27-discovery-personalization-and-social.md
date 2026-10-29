# 27 — Discovery, Personalization & Social Surfaces

## Evidence

The supplied feature inventory includes `explore-feed`, `follow`, `like`, `courses`, and `personalized-onboarding`.

The exact product behavior of those folders was not supplied, so this chapter focuses on architecture implications that can safely be drawn from their existence.

## Discovery feed

A discovery surface commonly has a different data lifecycle from detail pages:

- pagination or incremental loading;
- ranking/order that can change;
- mixed card types;
- optimistic low-risk interactions such as like/follow where product semantics allow;
- scroll-position restoration;
- image/media loading pressure.

The feed should consume public domain contracts rather than importing private internals from every target feature.

## Personalized onboarding

Onboarding often produces user preferences or profile context used elsewhere. The important architecture question is ownership:

```text
Onboarding UI
   ↓
collect preferences
   ↓
persist through profile/preferences contract
   ↓
other domains consume normalized user context
```

The onboarding flow should not become the permanent owner of data that belongs to the user's profile.

## Follow / like

Social actions are useful examples of mutation design:

- optimistic UI can improve responsiveness;
- failed mutations need rollback or reconciliation;
- query invalidation should be targeted;
- duplicate clicks should not create inconsistent counts;
- accessibility needs pressed/selected semantics.

No exact production optimistic-update strategy is claimed here.

## Courses

A `courses` feature indicates another content-like domain may exist. The safer architectural rule is to share platform primitives (queries, media, UI foundations) without automatically forcing books and courses into one domain model unless their behavior truly converges.
