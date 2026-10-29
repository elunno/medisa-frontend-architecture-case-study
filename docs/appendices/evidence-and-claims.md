# Appendix — Evidence & Claims

This is the credibility contract for the repository.

## Category A — Production facts directly supplied

The following are treated as product facts because they were explicitly supplied:

- the application is multilingual;
- users can register/login using email or mobile;
- the product has freemium and paid subscription access;
- subscription duration controls paid access;
- text and audio book summaries exist;
- the owner prepared text summaries and voice-ready scripts and generated audio through ElevenLabs API v3;
- reading has style controls such as font/color preferences;
- audio continues in the background/cross-route and exposes progress on other pages;
- users can bookmark books;
- reading/listening completion is shown;
- one book/content item becomes free for everyone for 24 hours;
- users can search/filter/sort professionals and inspect profiles;
- professional profiles include media/resume information and available times;
- users can choose a slot, pay, receive upcoming-session prompts, review sessions, and add post-session reflections/summaries;
- a mood checker asks follow-up questions and recommends content, meditation, media, or a professional;
- meditation includes guided/ambient/instrumental audio experiences;
- psychological assessments collect answers and display analyzed results.

## Category B — Evidence from supplied technical artifacts

The supplied package manifest supports claims about technology availability, including Next.js, React, TypeScript, TanStack Query, Zustand, Axios, Zod, Serwist, TipTap, WaveSurfer, Chart.js, UI primitives, and date tooling.

The supplied feature-directory list supports claims that feature areas with names such as `subscription`, `audio-player`, `bookmark`, `connectivity`, `pwa`, `notification`, and others existed.

## Category C — Conceptual models

The following are deliberately presented as explanatory models, not copied historical implementation:

- domain boundary diagrams;
- a centralized entitlement resolver;
- explicit state machines for audio and booking;
- a normalized recommendation contract;
- a data-driven assessment engine shape;
- state ownership matrices.

These models are grounded in the product problems but may be cleaner/more explicit than the historical implementation.

## Category D — Retrospective recommendations

Sections titled “what I would improve,” ADR status notes, and design-system governance guidance represent present-day architectural recommendations.

## Claims intentionally omitted

No unsupported claims are made about:

- team size;
- direct reports or people management;
- revenue impact;
- conversion uplift;
- Core Web Vitals improvement percentages;
- production test coverage percentage;
- deployment platform;
- exact payment provider;
- clinical validation;
- security certification;
- private API design.

If those facts become available and are safe to disclose, they can be added with evidence.
