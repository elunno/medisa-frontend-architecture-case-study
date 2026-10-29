const allowed = {
  idle: new Set(['LOAD']),
  loading: new Set(['READY', 'ERROR', 'LOAD', 'ROUTE_CHANGED']),
  playing: new Set(['PAUSE', 'END', 'ERROR', 'LOAD', 'SEEK', 'ROUTE_CHANGED']),
  paused: new Set(['PLAY', 'END', 'ERROR', 'LOAD', 'SEEK', 'ROUTE_CHANGED']),
  finished: new Set(['PLAY', 'LOAD', 'SEEK', 'ROUTE_CHANGED']),
  error: new Set(['LOAD', 'ROUTE_CHANGED'])
};

export function initialAudioState() {
  return { status: 'idle', trackId: null, position: 0, duration: 0, error: null };
}

export function transitionAudio(state, event) {
  const supported = allowed[state.status];
  if (!supported?.has(event.type)) {
    throw new Error(`Invalid audio transition: ${state.status} -> ${event.type}`);
  }

  switch (event.type) {
    case 'LOAD':
      return { status: 'loading', trackId: event.trackId, position: 0, duration: 0, error: null };
    case 'READY':
      return { ...state, status: 'playing', duration: event.duration, error: null };
    case 'PAUSE':
      return { ...state, status: 'paused' };
    case 'PLAY':
      return { ...state, status: 'playing' };
    case 'SEEK':
      return { ...state, position: Math.max(0, Math.min(event.position, state.duration || event.position)) };
    case 'END':
      return { ...state, status: 'finished', position: state.duration };
    case 'ERROR':
      return { ...state, status: 'error', error: event.message ?? 'media-error' };
    case 'ROUTE_CHANGED':
      return state; // route lifecycle intentionally does not control playback lifecycle
    default:
      return state;
  }
}
