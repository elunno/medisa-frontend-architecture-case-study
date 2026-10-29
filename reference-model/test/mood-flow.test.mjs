import test from 'node:test';
import assert from 'node:assert/strict';
import { createMoodSession, answerMoodStep } from '../src/mood-flow.mjs';

const flow = {
  steps: {
    mood: { id: 'mood', answers: [{ value: 'low', next: 'energy' }, { value: 'calm', next: null }] },
    energy: { id: 'energy', answers: [{ value: 'tired', next: null }, { value: 'restless', next: null }] }
  }
};

test('branches to follow-up question and preserves answers', () => {
  let session = createMoodSession(flow, 'mood');
  session = answerMoodStep(flow, session, 'low');
  assert.equal(session.currentStepId, 'energy');
  assert.deepEqual(session.answers, { mood: 'low' });
  session = answerMoodStep(flow, session, 'tired');
  assert.equal(session.complete, true);
  assert.deepEqual(session.answers, { mood: 'low', energy: 'tired' });
});

test('supports a terminal answer without unnecessary step', () => {
  let session = createMoodSession(flow, 'mood');
  session = answerMoodStep(flow, session, 'calm');
  assert.equal(session.complete, true);
});
