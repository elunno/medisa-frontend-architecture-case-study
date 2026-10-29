# 17 — Performance

## Performance should start from hotspots

No private performance metrics were supplied, so this case study does not invent LCP/INP/CLS improvements or percentage claims.

Instead, it identifies the product areas most likely to create measurable frontend cost.

## Potential hotspots

### Content discovery

- large cards/lists;
- image loading;
- filtering/sorting;
- feed pagination;
- repeated metadata requests.

### Reader

- long content rendering;
- layout recalculation after typography changes;
- progress measurement;
- responsive/RTL layout.

### Audio

- high-frequency position updates;
- waveform rendering;
- loading large media;
- route persistence;
- saving progress too often.

### Professional search

- many profile results;
- availability data fan-out;
- filter changes;
- earliest-slot computation.

### Assessment/result analytics

- dynamic question rendering;
- charts;
- rich result text.

## Optimization framework

```text
Measure
  ↓
Locate bottleneck
  ↓
Identify owner/lifecycle
  ↓
Apply smallest useful change
  ↓
Re-measure
```

## Likely techniques — only when measurement justifies them

- route/feature code splitting;
- query caching and deduplication;
- pagination/infinite loading;
- image optimization;
- throttling audio progress updates;
- narrow Zustand selectors;
- memoization around proven expensive work;
- deferring non-critical rich editors/charts/media tools;
- prefetching only where intent predicts use;
- reducing client-side JavaScript for static content surfaces.

These are architectural techniques, not claims that every one was historically deployed.

## Example: audio update scope

Bad:

```text
timeupdate event
   ↓
large global object replaced
   ↓
wide subscriber tree rerenders
```

Better:

```text
timeupdate event
   ↓
scoped audio position state
   ↓
only player/progress subscribers update
```

## Budget mindset

A mature team can define budgets for:

- route JavaScript;
- image payloads;
- long tasks/INP;
- error rate;
- query waterfalls;
- media startup latency.

This repository intentionally omits fabricated numbers.
