import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getWeddingPageMode } from './weddingDay.js';

const wedding = new Date('2026-10-31T14:00:00+09:00');

test('shows the wedding-day page from the day before through the wedding day in Seoul', () => {
  assert.equal(getWeddingPageMode(wedding, new Date('2026-10-29T14:59:59.999Z')), 'invitation');
  assert.equal(getWeddingPageMode(wedding, new Date('2026-10-29T15:00:00Z')), 'wedding-day');
  assert.equal(getWeddingPageMode(wedding, new Date('2026-10-30T14:59:59.999Z')), 'wedding-day');
  assert.equal(getWeddingPageMode(wedding, new Date('2026-10-30T15:00:00Z')), 'wedding-day');
  assert.equal(getWeddingPageMode(wedding, new Date('2026-10-31T14:59:59.999Z')), 'wedding-day');
  assert.equal(getWeddingPageMode(wedding, new Date('2026-10-31T15:00:00Z')), 'thank-you');
});

test('preview can select all three layouts regardless of the current date', () => {
  const before = new Date('2026-10-25T00:00:00+09:00');
  assert.equal(getWeddingPageMode(wedding, before, 'wedding-day'), 'wedding-day');
  assert.equal(getWeddingPageMode(wedding, wedding, 'invitation'), 'invitation');
  assert.equal(getWeddingPageMode(wedding, before, 'thank-you'), 'thank-you');
  assert.equal(getWeddingPageMode(wedding, new Date('2026-11-01T00:00:00+09:00'), 'invitation'), 'invitation');
  assert.equal(getWeddingPageMode(wedding, before, 'unknown'), 'invitation');
});

test('keeps the thank-you page after the wedding, including the next year', () => {
  assert.equal(getWeddingPageMode(wedding, new Date('2026-11-01T12:00:00+09:00')), 'thank-you');
  assert.equal(getWeddingPageMode(wedding, new Date('2027-01-01T00:00:00+09:00')), 'thank-you');
});
