# 28 — Notifications & Session Lifecycle

## Product behavior

The supplied product description states that users are prompted as an upcoming professional session approaches. The feature inventory also includes a `notification` area.

## Notification is not the source of truth

A notification should point back to authoritative booking/session state.

```text
Booking / Session record
        ↓
notification scheduling/delivery
        ↓
user opens notification
        ↓
frontend revalidates current session state
```

The UI should not assume that a notification payload is still current. A session may have been rescheduled, cancelled, or completed elsewhere.

## Frontend responsibilities

Depending on the delivery channel, the frontend may need to:

- request/handle notification permission;
- deep-link to the relevant session;
- display in-app reminders;
- deduplicate repeated notification surfaces;
- refresh session data when opened;
- handle unsupported/denied permission gracefully.

The exact production notification transport is not disclosed.

## Session lifecycle model

```text
Booked
  ↓
Upcoming
  ↓
Reminder window
  ↓
Joinable
  ↓
Completed
  ↓
Reflection / summary
  ↓
History
```

A session page should render from current lifecycle state rather than from an assumption that every booked appointment is immediately joinable.

## Time correctness

Reminder and joinability logic should rely on canonical appointment timestamps and server policy. Localized calendar display is presentation; it should not redefine session identity or authorization.

## Privacy

Notification text may appear on lock screens. Sensitive mental-health or session details should be minimized unless the product intentionally allows them and the user understands the exposure.
