import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePercent, clampPercent, displayCompletion } from '../src/progress.mjs';

test('calculates and rounds percent', () => {
  assert.equal(calculatePercent(72, 100), 72);
  assert.equal(calculatePercent(1, 3), 33);
});

test('clamps invalid/out-of-range percentages', () => {
  assert.equal(clampPercent(-20), 0);
  assert.equal(clampPercent(140), 100);
  assert.equal(clampPercent(Number.NaN), 0);
});

test('reference display rule chooses most advanced mode', () => {
  assert.equal(displayCompletion({ reading: 35, listening: 72 }), 72);
});
