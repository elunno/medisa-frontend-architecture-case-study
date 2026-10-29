import test from 'node:test';
import assert from 'node:assert/strict';
import { earliestAvailableSlot } from '../src/availability.mjs';

test('finds earliest future available slot from unsorted input', () => {
  const slots = [
    { id: 'c', startsAt: '2026-11-03T10:00:00Z', available: true },
    { id: 'a', startsAt: '2026-11-01T10:00:00Z', available: false },
    { id: 'b', startsAt: '2026-11-02T09:00:00Z', available: true }
  ];
  assert.equal(earliestAvailableSlot(slots, '2026-10-28T00:00:00Z').id, 'b');
});

test('ignores slots in the past', () => {
  const slots = [
    { id: 'past', startsAt: '2026-10-27T10:00:00Z', available: true },
    { id: 'future', startsAt: '2026-10-29T10:00:00Z', available: true }
  ];
  assert.equal(earliestAvailableSlot(slots, '2026-10-28T00:00:00Z').id, 'future');
});

test('returns null when nothing is available', () => {
  assert.equal(earliestAvailableSlot([{ id: 'x', startsAt: '2026-11-01T10:00:00Z', available: false }]), null);
});
