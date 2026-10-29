# 04 — Authentication & Access Control

## Authentication channels

The supplied product description includes registration and login through either email or mobile number.

Conceptually:

```text
Anonymous
  │
  ├─ Register
  │    ├─ Email
  │    └─ Mobile
  │
  └─ Login
       ├─ Email
       └─ Mobile
          ↓
     Authenticated Identity
```

## Authentication is not authorization

Being signed in answers:

> Who is this user?

It does not answer:

> What may this user access right now?

A useful separation is:

```text
Authentication
   ↓
Identity
   ↓
Subscription / account state
   ↓
Entitlement resolution
   ↓
Feature decision
   ├─ render
   ├─ redirect to sign-in
   └─ redirect to upgrade
```

## Token responsibility

The supplied feature inventory contains `auth-token`, which indicates token handling is an explicit feature concern. This case study does not disclose the production token format or storage mechanism.

Frontend principles for token handling include:

- one canonical place for attaching credentials to API requests;
- one canonical refresh/session-expiry policy;
- no token logging;
- avoid letting every feature interpret authentication errors independently;
- invalidate user-specific caches on identity changes;
- distinguish unauthorized (`401`) from authenticated-but-forbidden access.

## Bootstrap race

A common startup problem is rendering before identity is known:

```text
Page mounts
  ↓
Auth status unknown
  ↓
Premium content briefly appears / upgrade flashes
  ↓
Identity resolves
```

The architecture should represent an explicit bootstrapping state so protected content does not rely on optimistic guesses about access.

## Logout implications

Logout is not only deleting a token. It may require:

- clearing identity-specific query caches;
- stopping protected audio;
- closing privileged dialogs;
- resetting booking/assessment flows tied to a user;
- preserving non-sensitive device preferences where appropriate.

## Testing priorities

High-value tests include:

- anonymous → sign-in redirect;
- authenticated free → upgrade flow;
- authenticated premium → content access;
- session expiry while a protected screen is open;
- identity change invalidates user-specific cached data.
