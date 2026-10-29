# Example — API & Query Boundaries

```text
React component
  ↓
feature query hook / action
  ↓
domain API adapter
  ↓
shared HTTP client
  ↓
backend
```

## Shared HTTP concerns

- credentials;
- base configuration;
- cancellation;
- transport error normalization;
- request metadata/correlation;
- conservative retry defaults.

## Feature concerns

- query keys;
- stale/cache policy;
- transforming backend shapes into domain models;
- invalidation after mutations;
- domain-specific error meaning.

Avoid arbitrary `axios.get()` calls scattered through leaf components.
