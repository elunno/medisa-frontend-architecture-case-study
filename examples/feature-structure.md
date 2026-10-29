# Example — Feature Structure

```text
features/
└── booking/
    ├── index.ts
    ├── api/
    │   ├── booking.queries.ts
    │   └── booking.mutations.ts
    ├── model/
    │   ├── booking.types.ts
    │   └── booking.machine.ts
    ├── ui/
    │   ├── AppointmentSlot.tsx
    │   └── BookingSummary.tsx
    └── internal/
        └── normalizeAvailability.ts
```

## Rule

Other features import from `booking/index.ts`, not `booking/internal/*`.

This is a conceptual example, not production source.
