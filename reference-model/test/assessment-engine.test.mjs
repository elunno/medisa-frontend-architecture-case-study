import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAssessment } from '../src/assessment-engine.mjs';

const definition = {
  questions: [
    { id: 'q1', required: true, options: [{ value: 'a', points: 0 }, { value: 'b', points: 5 }] },
    { id: 'q2', required: true, options: [{ value: 'a', points: 4 }, { value: 'b', points: 5 }] }
  ],
  bands: [
    { id: 'low', label: 'Low', min: 0, max: 4 },
    { id: 'moderate', label: 'Moderate', min: 5, max: 9 },
    { id: 'high', label: 'High', min: 10, max: 10 }
  ]
};

test('maps exact lower boundary into moderate band', () => {
  const result = evaluateAssessment(definition, { q1: 'b', q2: 'a' });
  assert.equal(result.score, 9);
  assert.equal(result.band, 'moderate');
});

test('maps maximum score into high band', () => {
  const result = evaluateAssessment(definition, { q1: 'b', q2: 'b' });
  assert.deepEqual(result, { score: 10, band: 'high', label: 'High' });
});

test('rejects incomplete required answers', () => {
  assert.throws(() => evaluateAssessment(definition, { q1: 'a' }), /Missing required answer: q2/);
});

test('rejects unknown answer option', () => {
  assert.throws(() => evaluateAssessment(definition, { q1: 'x', q2: 'a' }), /Invalid answer/);
});
