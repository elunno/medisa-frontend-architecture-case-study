# 16 — Testing Strategy

## Principle: test risk, not vanity coverage

The application contains a few workflows whose failure would be disproportionately expensive:

- access control;
- booking/payment;
- persistent audio lifecycle;
- progress persistence;
- assessment scoring;
- authentication transitions;
- time-sensitive availability/promotions.

Those deserve stronger tests than cosmetic implementation details.

## Testing pyramid adapted to the product

```text
                End-to-end
          critical user journeys
        /                         \
   Integration                 Integration
 feature behavior            workflow behavior
        \                         /
               Unit
       deterministic business rules
```

## Unit / model tests

Good candidates:

- entitlement resolution;
- score calculation;
- progress calculation;
- date/availability selectors;
- state-machine transitions;
- locale direction helpers;
- formatters and validators.

## Integration tests

Good candidates:

- premium gate renders upgrade vs content correctly;
- reader preferences persist independently of content fetch;
- player controls update the global audio runtime;
- booking invalidation refreshes stale slots;
- assessment runner moves through questions and blocks incomplete submit;
- logout clears privileged state.

## End-to-end tests

Critical journeys:

```text
login → premium feature → upgrade → access refreshed
```

```text
professional discovery → slot → payment → booking confirmation
```

```text
start audio → navigate → mini player remains → pause/resume → progress restores
```

```text
assessment → answer all questions → submit → result shown
```

## What not to over-test

Avoid coupling tests to:

- internal hook names;
- exact component hierarchy;
- implementation-only state shape;
- incidental CSS class names;
- every third-party component behavior.

Prefer behavior that matters to users and business rules.

## Public reference-model tests

The original production test framework was not supplied. To avoid inventing a historical claim, this portfolio repository uses Node's built-in test runner for small, sanitized domain models.

That choice has two benefits:

1. reviewers can run the tests with no test-library installation;
2. the tests communicate architecture rather than framework fluency.

Run:

```bash
npm test
```

See [Testing Matrix](../examples/testing-matrix.md).
