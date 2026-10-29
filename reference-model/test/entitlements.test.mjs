import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAccess } from '../src/entitlements.mjs';

const now = '2026-10-28T12:00:00Z';
const premium = { id: 'book-1', access: 'premium' };

test('free content is available without authentication', () => {
  assert.deepEqual(resolveAccess({ authenticated: false, subscriptionStatus: 'none', resource: { id: 'free', access: 'free' }, now }), {
    allowed: true, reason: 'free-content', action: 'open'
  });
});

test('anonymous premium access asks user to sign in', () => {
  assert.equal(resolveAccess({ authenticated: false, subscriptionStatus: 'none', resource: premium, now }).reason, 'sign-in-required');
});

test('active subscription allows premium resource', () => {
  assert.equal(resolveAccess({ authenticated: true, subscriptionStatus: 'active', resource: premium, now }).allowed, true);
});

test('expired subscription produces renewal action', () => {
  const result = resolveAccess({ authenticated: true, subscriptionStatus: 'expired', resource: premium, now });
  assert.equal(result.allowed, false);
  assert.equal(result.action, 'renew');
});

test('temporary access overrides premium requirement during active window', () => {
  const result = resolveAccess({
    authenticated: false,
    subscriptionStatus: 'none',
    resource: premium,
    promotion: { resourceId: 'book-1', startsAt: '2026-10-28T00:00:00Z', endsAt: '2026-10-29T00:00:00Z' },
    now
  });
  assert.equal(result.reason, 'temporary-access');
});

test('expired temporary access no longer grants premium resource', () => {
  const result = resolveAccess({
    authenticated: false,
    subscriptionStatus: 'none',
    resource: premium,
    promotion: { resourceId: 'book-1', startsAt: '2026-10-27T00:00:00Z', endsAt: '2026-10-28T00:00:00Z' },
    now
  });
  assert.equal(result.reason, 'sign-in-required');
});

test('grace-period is explicitly modeled as allowed in the reference policy', () => {
  assert.equal(resolveAccess({ authenticated: true, subscriptionStatus: 'grace-period', resource: premium, now }).allowed, true);
});
