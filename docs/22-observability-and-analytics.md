# 22 — Observability & Product Analytics

## Separate operational telemetry from product analytics

Both answer different questions:

- **Operational telemetry:** is the frontend healthy?
- **Product analytics:** how are users moving through the product?

The public artifacts supplied for this case study do not identify a production analytics vendor, so no vendor-specific implementation is claimed.

## Useful operational events

Examples of safe, structured signals:

- route/feature identifier;
- query/mutation operation name;
- normalized error category;
- media startup failure;
- booking conflict rate;
- payment confirmation failure state;
- application version;
- correlation/request ID.

Avoid placing sensitive assessment answers, session reflections, tokens, or payment data in telemetry.

## Useful product-funnel events

Examples, subject to privacy/product policy:

```text
premium_content_viewed
upgrade_started
subscription_completed
content_started
content_completed
professional_profile_viewed
slot_selected
booking_completed
assessment_started
assessment_completed
mood_flow_completed
```

Event names should describe product semantics, not DOM events such as `button_3_clicked`.

## Funnel integrity

A reliable event model distinguishes:

```text
user intent
  vs
operation started
  vs
operation confirmed
```

For example, `payment_returned` should not be treated as equivalent to `booking_confirmed`.

## Performance telemetry

Useful performance dimensions include:

- route load;
- media startup latency;
- query waterfall count;
- interaction latency;
- long tasks;
- error rate by feature.

No quantitative production metrics are published here because none were supplied for safe disclosure.
