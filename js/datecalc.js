/* Date Calculator BD - pure date logic (no DOM). Works in browser and Node.
   All math uses UTC dates so results never shift with the local timezone. */
(function (global) {
  'use strict';

  // Parse a strict YYYY-MM-DD string. Returns a UTC Date or null.
  function parseISO(s) {
    if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    var parts = s.split('-').map(Number);
    var y = parts[0], m = parts[1], d = parts[2];
    if (y < 1 || y > 9999 || m < 1 || m > 12 || d < 1 || d > 31) return null;
    var dt = new Date(Date.UTC(y, m - 1, d));
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
    return dt;
  }

  function fmt(dt) {
    return dt.toISOString().slice(0, 10);
  }

  // Whole days from a to b (negative when b is before a).
  function daysBetween(a, b) {
    return Math.round((b.getTime() - a.getTime()) / 86400000);
  }

  function addDays(dt, n) {
    var d = new Date(dt.getTime());
    d.setUTCDate(d.getUTCDate() + n);
    return d;
  }

  // Add months, clamping the day to the target month's length
  // (2026-01-31 + 1 month = 2026-02-28; 2024-01-31 + 1 = 2024-02-29).
  function addMonths(dt, n) {
    var y = dt.getUTCFullYear();
    var m = dt.getUTCMonth() + n;
    var d = dt.getUTCDate();
    var first = new Date(Date.UTC(y, m, 1));
    var lastDay = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
    return new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), Math.min(d, lastDay)));
  }

  function addYears(dt, n) {
    return addMonths(dt, n * 12);
  }

  // Calendar breakdown of a..b (requires a <= b): { years, months, days }.
  function breakdown(a, b) {
    var years = b.getUTCFullYear() - a.getUTCFullYear();
    var anchor = addYears(a, years);
    if (anchor.getTime() > b.getTime()) {
      years -= 1;
      anchor = addYears(a, years);
    }
    var months = 0;
    while (true) {
      var next = addMonths(anchor, 1);
      if (next.getTime() > b.getTime()) break;
      anchor = next;
      months += 1;
    }
    return { years: years, months: months, days: daysBetween(anchor, b) };
  }

  // Count of Monday-Friday days from a to b inclusive (requires a <= b).
  function businessDays(a, b) {
    var count = 0;
    var d = new Date(a.getTime());
    while (d.getTime() <= b.getTime()) {
      var wd = d.getUTCDay();
      if (wd !== 0 && wd !== 6) count += 1;
      d.setUTCDate(d.getUTCDate() + 1);
    }
    return count;
  }

  var WEEKDAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function weekdayIndex(dt) {
    return dt.getUTCDay();
  }

  function weekdayName(dt) {
    return WEEKDAYS_EN[dt.getUTCDay()];
  }

  // Strict validation for an exported history payload. Returns true/false.
  // Shape: { app: 'date-calculator-bd', version: 1, entries: [{kind, summary}] }
  function validateHistoryPayload(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
    if (obj.app !== 'date-calculator-bd' || obj.version !== 1) return false;
    if (!Array.isArray(obj.entries) || obj.entries.length > 500) return false;
    for (var i = 0; i < obj.entries.length; i++) {
      var e = obj.entries[i];
      if (!e || typeof e !== 'object' || Array.isArray(e)) return false;
      if (typeof e.kind !== 'string' || e.kind.length === 0 || e.kind.length > 40) return false;
      if (typeof e.summary !== 'string' || e.summary.length === 0 || e.summary.length > 300) return false;
    }
    return true;
  }

  var api = {
    parseISO: parseISO,
    fmt: fmt,
    daysBetween: daysBetween,
    addDays: addDays,
    addMonths: addMonths,
    addYears: addYears,
    breakdown: breakdown,
    businessDays: businessDays,
    weekdayIndex: weekdayIndex,
    weekdayName: weekdayName,
    WEEKDAYS_EN: WEEKDAYS_EN,
    validateHistoryPayload: validateHistoryPayload
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    global.DateCalc = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
