import test from 'node:test';
import assert from 'node:assert/strict';
import { localeDirection } from '../src/locale.mjs';

test('Persian locale is RTL', () => {
  assert.equal(localeDirection('fa-IR'), 'rtl');
});

test('English locale is LTR', () => {
  assert.equal(localeDirection('en-US'), 'ltr');
});
