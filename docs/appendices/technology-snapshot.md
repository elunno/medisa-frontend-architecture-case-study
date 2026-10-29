# Appendix — Technology Snapshot

## Source

This snapshot is based on the package manifest supplied for the production application.

## Core

| Package | Supplied version | Architectural relevance |
|---|---:|---|
| Next.js | 16.3.0 | routing/rendering/application framework |
| React | 19.2.8 | UI/runtime |
| TypeScript | 7 | static typing/tooling |
| TanStack Query | 5.101.4 | server-state fetching/caching |
| Zustand | 5.0.14 | client/application state |
| Axios | 1.19.0 | HTTP client |
| Zod | 4.4.3 | runtime schema validation |

## UI and styling

- Tailwind CSS 4
- Headless UI
- Radix Alert Dialog / Visually Hidden
- class-variance-authority
- clsx / tailwind-merge
- Lucide React
- Motion
- Lottie / dotLottie
- Tippy
- toast libraries

## Content/media

- TipTap extensions and React integration
- React Markdown / remark-gfm
- WaveSurfer
- React Player
- Swiper

## Charts and dates

- Chart.js / react-chartjs-2
- jalaali-js
- react-date-object
- react-multi-date-picker

## PWA

- Serwist
- `@serwist/next`

## Interpretation limits

A dependency list proves availability, not exact usage patterns.

For example:

- Zustand's presence does not prove all client state was globally stored.
- TanStack Query's presence does not prove every request used it.
- Headless/Radix packages do not prove a formal design system existed.
- Serwist indicates PWA infrastructure, but this public case study does not infer which routes/assets were available offline.

This repository uses the manifest as evidence, not as permission to invent implementation details.
