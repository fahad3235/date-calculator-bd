/* Node unit tests for js/datecalc.js. Run: node tests/datecalc.test.js */
const assert = require('assert');
const DC = require('../js/datecalc.js');

let passed = 0;
function check(name, fn) {
  fn();
  passed += 1;
  console.log('ok - ' + name);
}

// Parsing
check('parseISO accepts a valid date', () => {
  assert.strictEqual(DC.fmt(DC.parseISO('2026-11-02')), '2026-11-02');
});
check('parseISO rejects impossible dates', () => {
  assert.strictEqual(DC.parseISO('2026-02-30'), null);
  assert.strictEqual(DC.parseISO('2023-02-29'), null);
  assert.strictEqual(DC.parseISO('2026-13-01'), null);
  assert.strictEqual(DC.parseISO('not-a-date'), null);
  assert.strictEqual(DC.parseISO('2026-1-2'), null);
});

// Days between (hand-verified)
check('Jan 2026 has 30 days between 1st and 31st', () => {
  assert.strictEqual(DC.daysBetween(DC.parseISO('2026-01-01'), DC.parseISO('2026-01-31')), 30);
});
check('leap year: Feb 28 -> Mar 1 2024 is 2 days', () => {
  assert.strictEqual(DC.daysBetween(DC.parseISO('2024-02-28'), DC.parseISO('2024-03-01')), 2);
});
check('non-leap: Feb 28 -> Mar 1 2023 is 1 day', () => {
  assert.strictEqual(DC.daysBetween(DC.parseISO('2023-02-28'), DC.parseISO('2023-03-01')), 1);
});
check('same day is 0', () => {
  assert.strictEqual(DC.daysBetween(DC.parseISO('2026-11-02'), DC.parseISO('2026-11-02')), 0);
});

// Breakdown
check('2020-01-15 -> 2026-11-02 breaks down as 6y 9m 18d', () => {
  assert.deepStrictEqual(DC.breakdown(DC.parseISO('2020-01-15'), DC.parseISO('2026-11-02')), { years: 6, months: 9, days: 18 });
});
check('2026-01-01 -> 2026-01-31 breaks down as 0y 0m 30d', () => {
  assert.deepStrictEqual(DC.breakdown(DC.parseISO('2026-01-01'), DC.parseISO('2026-01-31')), { years: 0, months: 0, days: 30 });
});
check('2024-02-29 -> 2025-02-28 breaks down as 1y 0m 0d (year step clamps to Feb 28)', () => {
  assert.deepStrictEqual(DC.breakdown(DC.parseISO('2024-02-29'), DC.parseISO('2025-02-28')), { years: 1, months: 0, days: 0 });
});

// Add / subtract
check('2026-12-31 + 1 day = 2027-01-01', () => {
  assert.strictEqual(DC.fmt(DC.addDays(DC.parseISO('2026-12-31'), 1)), '2027-01-01');
});
check('2026-01-31 + 1 month clamps to 2026-02-28', () => {
  assert.strictEqual(DC.fmt(DC.addMonths(DC.parseISO('2026-01-31'), 1)), '2026-02-28');
});
check('2024-01-31 + 1 month clamps to 2024-02-29 (leap)', () => {
  assert.strictEqual(DC.fmt(DC.addMonths(DC.parseISO('2024-01-31'), 1)), '2024-02-29');
});
check('2026-03-31 - 1 month = 2026-02-28', () => {
  assert.strictEqual(DC.fmt(DC.addMonths(DC.parseISO('2026-03-31'), -1)), '2026-02-28');
});
check('2024-02-29 + 1 year clamps to 2025-02-28', () => {
  assert.strictEqual(DC.fmt(DC.addYears(DC.parseISO('2024-02-29'), 1)), '2025-02-28');
});
check('2026-11-02 + 2 weeks = 2026-11-16', () => {
  assert.strictEqual(DC.fmt(DC.addDays(DC.parseISO('2026-11-02'), 14)), '2026-11-16');
});

// Weekday (2026-11-02 is a Monday, per the run calendar)
check('2026-11-02 is Monday', () => {
  assert.strictEqual(DC.weekdayName(DC.parseISO('2026-11-02')), 'Monday');
  assert.strictEqual(DC.weekdayIndex(DC.parseISO('2026-11-02')), 1);
});
check('2026-01-01 is Thursday', () => {
  assert.strictEqual(DC.weekdayName(DC.parseISO('2026-01-01')), 'Thursday');
});
check('2000-01-01 is Saturday', () => {
  assert.strictEqual(DC.weekdayName(DC.parseISO('2000-01-01')), 'Saturday');
});

// Business days
check('Mon 2026-11-02 -> Fri 2026-11-06 is 5 business days', () => {
  assert.strictEqual(DC.businessDays(DC.parseISO('2026-11-02'), DC.parseISO('2026-11-06')), 5);
});
check('Mon -> Sun week is 5 business days', () => {
  assert.strictEqual(DC.businessDays(DC.parseISO('2026-11-02'), DC.parseISO('2026-11-08')), 5);
});
check('single Saturday is 0 business days', () => {
  assert.strictEqual(DC.businessDays(DC.parseISO('2026-11-07'), DC.parseISO('2026-11-07')), 0);
});
check('single Monday is 1 business day', () => {
  assert.strictEqual(DC.businessDays(DC.parseISO('2026-11-02'), DC.parseISO('2026-11-02')), 1);
});

// History payload validation
check('valid history payload passes', () => {
  assert.strictEqual(DC.validateHistoryPayload({ app: 'date-calculator-bd', version: 1, entries: [{ kind: 'between', summary: 'a -> b = 30 days' }] }), true);
});
check('wrong app, wrong version, bad entries rejected', () => {
  assert.strictEqual(DC.validateHistoryPayload({ app: 'other', version: 1, entries: [] }), false);
  assert.strictEqual(DC.validateHistoryPayload({ app: 'date-calculator-bd', version: 2, entries: [] }), false);
  assert.strictEqual(DC.validateHistoryPayload({ app: 'date-calculator-bd', version: 1, entries: [{ kind: 'between' }] }), false);
  assert.strictEqual(DC.validateHistoryPayload({ app: 'date-calculator-bd', version: 1, entries: 'nope' }), false);
  assert.strictEqual(DC.validateHistoryPayload(null), false);
});

console.log('\n' + passed + '/' + passed + ' unit tests passed');
