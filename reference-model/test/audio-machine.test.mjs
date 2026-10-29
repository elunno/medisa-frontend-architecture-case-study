import test from 'node:test';
import assert from 'node:assert/strict';
import { initialAudioState, transitionAudio } from '../src/audio-machine.mjs';

test('loads and begins playback when media is ready', () => {
  let state = transitionAudio(initialAudioState(), { type: 'LOAD', trackId: 'audio-1' });
  state = transitionAudio(state, { type: 'READY', duration: 180 });
  assert.equal(state.status, 'playing');
  assert.equal(state.trackId, 'audio-1');
  assert.equal(state.duration, 180);
});

test('route change does not stop playback', () => {
  let state = transitionAudio(initialAudioState(), { type: 'LOAD', trackId: 'audio-1' });
  state = transitionAudio(state, { type: 'READY', duration: 180 });
  const afterRoute = transitionAudio(state, { type: 'ROUTE_CHANGED', route: '/profile' });
  assert.strictEqual(afterRoute, state);
  assert.equal(afterRoute.status, 'playing');
});

test('supports pause, seek, resume, and finish', () => {
  let state = transitionAudio(initialAudioState(), { type: 'LOAD', trackId: 'audio-1' });
  state = transitionAudio(state, { type: 'READY', duration: 100 });
  state = transitionAudio(state, { type: 'PAUSE' });
  state = transitionAudio(state, { type: 'SEEK', position: 45 });
  state = transitionAudio(state, { type: 'PLAY' });
  state = transitionAudio(state, { type: 'END' });
  assert.equal(state.status, 'finished');
  assert.equal(state.position, 100);
});

test('loading a new track replaces previous playback state', () => {
  let state = transitionAudio(initialAudioState(), { type: 'LOAD', trackId: 'audio-1' });
  state = transitionAudio(state, { type: 'READY', duration: 100 });
  state = transitionAudio(state, { type: 'LOAD', trackId: 'audio-2' });
  assert.equal(state.status, 'loading');
  assert.equal(state.trackId, 'audio-2');
  assert.equal(state.position, 0);
});

test('rejects impossible transition', () => {
  assert.throws(() => transitionAudio(initialAudioState(), { type: 'PAUSE' }), /Invalid audio transition/);
});
