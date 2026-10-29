# Deep Dive 04 — Mood-Driven Recommendation Flow

## Product requirement

The mood checker gathers a starting mood and follow-up context, then suggests relevant next actions across several domains.

## Architectural tension

The UI needs to remain flexible as product/content teams evolve the question graph.

Hard-coded page navigation:

```text
QuestionOneComponent → if answer X push /question-two-x
```

creates tight coupling between UI, routing, and decision logic.

## Data-driven model

A flow definition can describe:

```json
{
  "id": "energy",
  "question": "How is your energy?",
  "answers": [
    { "value": "low", "next": "sleep" },
    { "value": "high", "next": "stress" }
  ]
}
```

The renderer owns:

- display;
- answer selection;
- validation;
- transition dispatch.

The flow model owns:

- which step comes next;
- when enough context has been collected.

## Recommendation normalization

Different target domains can share a normalized recommendation shape:

```text
Recommendation
├─ type: content | meditation | media | professional
├─ targetId
├─ title
├─ reason/explanation
└─ access metadata
```

The UI can render a mixed result list without importing every target domain's internal model.

## Failure behavior

If recommendation resolution fails, the user should not lose the entire session. Preserve collected answers and offer retry.

## Access interaction

A recommendation may point to premium content. Recommendation and entitlement are separate responsibilities:

```text
recommendation says "this is relevant"
entitlement says "this user may open it now"
```

## Tests

The reference model demonstrates branch traversal and preserves prior answers.
