# Deep Dive 05 — Data-Driven Assessment Engine

## Problem

Multiple psychological assessments share mechanics but differ in questions, scoring, and interpretation.

Duplicating a complete React flow for every assessment increases drift and makes scoring harder to audit.

## Separation of concerns

### Definition

- question IDs;
- answer options;
- points/weights;
- required/optional status;
- interpretation bands.

### Runner

- current question;
- selected answers;
- navigation;
- completion status.

### Evaluator

- validates answers;
- computes score;
- maps score to a result band.

### Presenter

- title/explanation;
- detailed text;
- chart if appropriate;
- recommended next steps.

## Determinism

Scoring is one of the best candidates for pure functions:

```text
same definition + same answers = same result
```

This enables stable tests and makes UI refactoring safer.

## Boundary cases

Test exact thresholds rather than only obvious middle values.

Example bands:

```text
0–4   low
5–9   moderate
10+   high
```

Scores `4`, `5`, `9`, and `10` deserve explicit tests.

## Invalid data

A robust evaluator should reject:

- unknown question IDs;
- unknown answer values;
- missing required answers;
- overlapping/invalid result bands if definitions are configurable.

## Privacy

Assessment answers and detailed interpretation can be sensitive. Avoid accidental persistence, analytics logging, or service-worker caching without explicit policy.

## Clinical scope

This public engineering model is not a clinical validation claim. It demonstrates frontend architecture and deterministic scoring mechanics only.
