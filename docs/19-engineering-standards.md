# 19 — Engineering Standards

## Why standards matter

A senior frontend engineer scales impact by reducing ambiguity for future changes, not only by shipping individual features.

The supplied project manifest confirms lint/build tooling, but no private CI or team process files were supplied. Therefore this chapter separates **principles** from **verified historical process**.

## Code standards

Useful standards for this architecture:

- TypeScript at domain boundaries;
- explicit feature public APIs;
- no arbitrary cross-feature internal imports;
- server-state queries colocated with domain ownership;
- normalized errors;
- narrow global-state selectors;
- accessibility requirements for shared primitives;
- tests for high-risk business rules;
- no secrets or user-sensitive data in logs.

## Abstraction standard

A strong default:

> Introduce shared abstractions after repeated semantics are understood, not because two files happen to look similar.

This avoids building generic systems before the product has proven what should be generic.

## Pull-request review lens

Review questions:

- Which domain owns this behavior?
- Is new global state necessary?
- Is server data being duplicated?
- What is the failure path?
- Does the change affect authentication/access?
- Does it work in RTL/LTR?
- Does it create high-frequency broad renders?
- Which business rule should be tested?
- Is any sensitive data introduced into logs/cache/URL?

## Public repository CI

This case-study repository contains its own quality workflow:

```text
Pull Request / Push
  ↓
Node setup
  ↓
Reference-model tests
  ↓
Internal link check
  ↓
Required-structure check
  ↓
Merge-ready
```

See `.github/workflows/quality.yml`.
