const transitions = {
  browsing: new Set(['SELECT_SLOT']),
  'slot-selected': new Set(['VALIDATE', 'CANCEL']),
  validating: new Set(['SLOT_VALID', 'SLOT_STALE', 'CANCEL']),
  'payment-pending': new Set(['PAYMENT_CONFIRMED', 'PAYMENT_FAILED', 'SLOT_STALE']),
  'payment-failed': new Set(['RETRY_PAYMENT', 'CANCEL']),
  'stale-slot': new Set(['REFRESHED', 'CANCEL']),
  booked: new Set([]),
  cancelled: new Set([])
};

export function initialBookingState() {
  return { status: 'browsing', slotId: null, bookingId: null, error: null };
}

export function transitionBooking(state, event) {
  if (!transitions[state.status]?.has(event.type)) {
    throw new Error(`Invalid booking transition: ${state.status} -> ${event.type}`);
  }

  switch (event.type) {
    case 'SELECT_SLOT':
      return { status: 'slot-selected', slotId: event.slotId, bookingId: null, error: null };
    case 'VALIDATE':
      return { ...state, status: 'validating' };
    case 'SLOT_VALID':
      return { ...state, status: 'payment-pending' };
    case 'SLOT_STALE':
      return { ...state, status: 'stale-slot', error: 'slot-unavailable' };
    case 'PAYMENT_FAILED':
      return { ...state, status: 'payment-failed', error: event.reason ?? 'payment-failed' };
    case 'RETRY_PAYMENT':
      return { ...state, status: 'payment-pending', error: null };
    case 'PAYMENT_CONFIRMED':
      return { ...state, status: 'booked', bookingId: event.bookingId, error: null };
    case 'REFRESHED':
      return { status: 'browsing', slotId: null, bookingId: null, error: null };
    case 'CANCEL':
      return { ...state, status: 'cancelled' };
    default:
      return state;
  }
}
