import test from 'node:test';
import assert from 'node:assert/strict';
import { initialBookingState, transitionBooking } from '../src/booking-machine.mjs';

function toPayment() {
  let state = transitionBooking(initialBookingState(), { type: 'SELECT_SLOT', slotId: 'slot-14' });
  state = transitionBooking(state, { type: 'VALIDATE' });
  return transitionBooking(state, { type: 'SLOT_VALID' });
}

test('happy path reaches confirmed booking', () => {
  let state = toPayment();
  state = transitionBooking(state, { type: 'PAYMENT_CONFIRMED', bookingId: 'booking-1' });
  assert.equal(state.status, 'booked');
  assert.equal(state.bookingId, 'booking-1');
});

test('stale slot enters recoverable stale state', () => {
  let state = transitionBooking(initialBookingState(), { type: 'SELECT_SLOT', slotId: 'slot-14' });
  state = transitionBooking(state, { type: 'VALIDATE' });
  state = transitionBooking(state, { type: 'SLOT_STALE' });
  assert.equal(state.status, 'stale-slot');
  assert.equal(state.error, 'slot-unavailable');
  state = transitionBooking(state, { type: 'REFRESHED' });
  assert.equal(state.status, 'browsing');
});

test('payment failure can retry without losing selected slot', () => {
  let state = toPayment();
  state = transitionBooking(state, { type: 'PAYMENT_FAILED', reason: 'declined' });
  assert.equal(state.status, 'payment-failed');
  assert.equal(state.slotId, 'slot-14');
  state = transitionBooking(state, { type: 'RETRY_PAYMENT' });
  assert.equal(state.status, 'payment-pending');
});

test('invalid transition is rejected', () => {
  assert.throws(() => transitionBooking(initialBookingState(), { type: 'PAYMENT_CONFIRMED', bookingId: 'x' }), /Invalid booking transition/);
});
