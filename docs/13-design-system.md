# 13 — Design System

## Why a shared UI system matters here

This product spans content, media, booking, forms, assessments, charts, onboarding, subscription gates, notifications, and profile experiences. Repetition across those surfaces creates pressure for shared primitives.

The key design-system question is not “how many components are shared?” It is **what belongs in the shared system and what remains domain-owned?**

## Layering

```text
Foundations
├─ color
├─ typography
├─ spacing
├─ radius
├─ elevation
├─ motion
└─ direction

Primitives
├─ button
├─ text/input
├─ surface
├─ icon
└─ focus/visually-hidden utilities

Reusable components
├─ dialog
├─ select
├─ tabs
├─ drawer
├─ toast
├─ progress
└─ form controls

Reusable patterns
├─ empty state
├─ error state
├─ loading state
├─ confirmation flow
└─ subscription gate shell
```

## Domain components stay domain-owned

Examples:

```text
Button                → shared design system
Dialog                → shared design system
BookCard              → content domain
ProfessionalCard      → professional-services domain
AppointmentSlot       → booking domain
AssessmentQuestion    → assessment domain
AudioMiniPlayer       → audio domain
```

A domain component can be reused across several screens without becoming a universal design-system component.

## Supplied UI stack

The manifest includes Headless UI, Radix UI, CVA, clsx, Tailwind Merge, Tailwind CSS, Lucide, Lottie, and Motion. These packages can support accessible primitives and consistent variants, but package presence alone does not prove a formal design system existed.

This case study therefore distinguishes **available UI infrastructure** from **retrospective design-system governance recommendations**.

## Governance rules

A mature system benefits from:

- documented ownership;
- accessibility expectations;
- variant constraints;
- deprecation strategy;
- visual regression or interaction coverage for critical primitives;
- migration path when primitives change.
