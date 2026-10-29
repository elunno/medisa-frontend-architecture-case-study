# 12 — Internationalization

## Multilingual is more than translation

The product is explicitly described as multilingual. The supplied stack also includes Persian/Jalaali date tooling, which reinforces the importance of locale-sensitive UI concerns.

A complete frontend localization model can affect:

```text
Locale
├─ UI messages
├─ content language
├─ text direction
├─ typography
├─ dates/calendars
├─ numbers
├─ icon direction
└─ layout behavior
```

## RTL/LTR architecture

Direction should be available at a shared platform boundary so feature components do not repeatedly infer it.

Examples of direction-sensitive behavior:

- chevrons and “next/previous” icons;
- drawers and sheet placement;
- reader navigation;
- progress labels mixed with Latin numerals;
- spacing that relies on left/right instead of inline start/end;
- date pickers and calendars.

## Content locale vs UI locale

The interface language and content language may differ. A robust model should avoid assuming that changing UI locale automatically changes every content asset.

Useful concepts:

- interface locale;
- content locale;
- fallback locale;
- localized metadata availability.

## Dates and appointments

Scheduling needs a separation between:

- canonical timestamps/slot identity;
- localized formatting;
- calendar-system presentation.

A user-facing Persian calendar string should not be used as the internal booking key.

## Testing

High-value locale tests include:

- `fa` resolves RTL;
- `en` resolves LTR;
- direction changes do not corrupt persisted reader position;
- date formatting changes without changing appointment identity;
- missing localized content falls back predictably.

The runnable reference model contains a minimal direction resolver only; it does not claim to reproduce the production i18n implementation.
