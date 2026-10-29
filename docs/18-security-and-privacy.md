# 18 — Security & Privacy

## Scope

This application shape includes identity, payments, psychological assessments, professional sessions, profile information, and potentially sensitive wellness context.

This chapter documents frontend security requirements and review questions. It does not disclose production secrets or claim backend controls that were not supplied.

## Authentication and session data

Frontend requirements:

- never log credentials/tokens;
- centralize authentication failure handling;
- clear user-specific caches on logout/account switch;
- avoid persisting sensitive tokens in unnecessary storage;
- prefer server-enforced authorization even if UI is gated;
- prevent protected data flashes during auth bootstrap.

## Payment

Frontend should minimize payment-data responsibility:

- use provider-hosted/tokenized flows where applicable;
- never store raw card data in application state;
- treat redirect/callback parameters as untrusted input;
- rely on backend verification for final payment truth;
- make double-submit/idempotency behavior explicit.

## Rich content

The supplied stack includes TipTap and Markdown rendering. Rich content requires attention to:

- XSS-safe rendering;
- sanitization policy for HTML if enabled;
- safe link handling;
- image/source restrictions;
- Content Security Policy where applicable.

## Assessments and session notes

Potentially sensitive data should have stricter defaults:

- no accidental analytics payloads containing answers/notes;
- careful caching/service-worker policy;
- minimal browser persistence;
- clear deletion/retention semantics governed by backend/product policy;
- no sensitive content in exception logs.

## PWA cache review

Service workers can accidentally retain data longer than expected. Protected API responses and sensitive personalized pages should not be cached without an explicit threat/privacy review.

## Frontend threat-model prompts

- Can a stale cache reveal previous-user data after account switch?
- Can a crafted deep link bypass UI gating even though server authorization remains correct?
- Can rich text inject unsafe markup?
- Can a replayed payment callback create confusing duplicate UI state?
- Can service-worker caches expose private data on a shared device?
- Do error logs capture private assessment/session information?
