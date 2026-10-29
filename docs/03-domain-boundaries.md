# 03 — Domain Boundaries

## Why file-type architecture stops scaling

A small app can work well with:

```text
components/
hooks/
services/
utils/
pages/
```

As product behavior grows, that structure often answers “what kind of file is this?” but not “what business responsibility owns it?”

A domain-oriented mental model is more useful for a product with independent content, subscription, media, booking, recommendation, and assessment lifecycles.

## Conceptual feature structure

```text
src/
├── app/
├── features/
│   ├── auth/
│   ├── subscription/
│   ├── content/
│   ├── reader/
│   ├── audio/
│   ├── bookmark/
│   ├── progress/
│   ├── professionals/
│   ├── booking/
│   ├── mood/
│   ├── meditation/
│   └── assessments/
└── shared/
    ├── ui/
    ├── api/
    ├── validation/
    ├── i18n/
    └── utilities/
```

This is a **conceptual representation**, not a published snapshot of the original repository.

## Public contracts vs internals

A feature should expose a small public surface:

```text
booking/
├── index.ts            # public exports
├── api/
├── model/
├── ui/
└── internal/
```

Other domains depend on `booking`'s public contract, not on `booking/internal/*`.

## Boundary examples

### Reader should not know payment details

Reader can ask:

```text
canAccess(content)
```

It should not need to know:

```text
paymentProviderStatus
subscriptionInvoiceShape
checkoutRedirectRules
```

### Audio should not know route structure

Audio can expose:

```text
play(track)
pause()
seek(position)
```

It should not contain page-specific navigation logic.

### Assessment engine should not own charts

The engine can return normalized results. Presentation decides whether a result is rendered as text, chart, range indicator, or recommendation.

## Acceptable duplication

Domain architecture does not mean “DRY at all costs.” Small duplication can be cheaper than a shared abstraction that couples unrelated domains.

A useful threshold for extraction:

1. the pattern appears repeatedly;
2. the semantics are actually the same;
3. change cadence is compatible;
4. the shared owner is clear;
5. the abstraction reduces total reasoning cost.

## Boundary smell checklist

Potential smells:

- feature A imports feature B's internal store;
- subscription checks appear in dozens of leaf components;
- every feature wraps Axios differently;
- design-system components know book/professional-specific business rules;
- global state mirrors query-cache data without a lifecycle reason;
- a route owns media expected to continue after navigation.
