/* Date Calculator BD - UI strings. Bengali is written as \uXXXX escapes so
   every source file stays pure ASCII (push-API safe). */
(function (global) {
  'use strict';

  var I18N = {
    en: {
      title: 'Date Calculator BD',
      tagline: 'Days between dates, date arithmetic, weekdays and business days - offline, in English and Bangla.',
      tabBetween: 'Days Between',
      tabAddSub: 'Add / Subtract',
      tabWeekday: 'Weekday',
      tabBusiness: 'Business Days',
      tabHistory: 'History',
      betweenH: 'Days between two dates',
      addSubH: 'Add to or subtract from a date',
      weekdayH: 'What day of the week is it?',
      businessH: 'Business days between two dates',
      historyH: 'Saved calculations',
      startDate: 'Start date',
      endDate: 'End date',
      date: 'Date',
      amount: 'Amount',
      unit: 'Unit',
      direction: 'Direction',
      add: 'Add',
      subtract: 'Subtract',
      calculate: 'Calculate',
      result: 'Result',
      days: 'days',
      weeks: 'weeks',
      months: 'months',
      years: 'years',
      totalDays: 'Total days',
      businessDaysLabel: 'business days',
      totalDaysSuffix: 'in total (inclusive)',
      inclusive: 'Count the end date too (inclusive)',
      historyEmpty: 'No calculations saved yet.',
      exportBtn: 'Export JSON',
      importBtn: 'Import JSON',
      clearAll: 'Clear all',
      typeDelete: 'Type DELETE to confirm',
      confirmClear: 'Clear',
      daysUnit: 'day',
      daysUnitPlural: 'days',
      weekUnit: 'week',
      errBothDates: 'Please enter both dates.',
      errInvalidDate: 'Please enter a valid date.',
      errEndBeforeStart: 'The end date must be on or after the start date.',
      errInvalidAmount: 'Please enter a whole number from 1 to 99999.',
      errBadImport: 'That file is not a valid export; your saved data is unchanged.',
      errRangeTooLarge: 'The date range is too large (max 100 years).',
      importOk: 'Import succeeded.',
      footer: 'Offline tool. Business days count Monday-Friday only and do not exclude public holidays. Dates use the Gregorian calendar.',
      langBtn: 'bn'
    },
    bn: {
      title: '\u09a4\u09be\u09b0\u09bf\u0996 \u0995\u09cd\u09af\u09be\u09b2\u0995\u09c1\u09b2\u09c7\u099f\u09b0 \u09ac\u09bf\u09a1\u09bf',
      tagline: '\u09a6\u09c1\u0987 \u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u09ac\u09cd\u09af\u09ac\u09a7\u09be\u09a8, \u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u09af\u09cb\u0997-\u09ac\u09bf\u09af\u09bc\u09cb\u0997, \u09b8\u09aa\u09cd\u09a4\u09be\u09b9\u09c7\u09b0 \u09a6\u09bf\u09a8 \u0993 \u0995\u09b0\u09cd\u09ae\u09a6\u09bf\u09ac\u09b8 - \u0985\u09ab\u09b2\u09be\u0987\u09a8\u09c7, \u09ac\u09be\u0982\u09b2\u09be \u0993 \u0987\u0982\u09b0\u09c7\u099c\u09bf\u09a4\u09c7\u0964',
      tabBetween: '\u09a6\u09bf\u09a8\u09c7\u09b0 \u09ac\u09cd\u09af\u09ac\u09a7\u09be\u09a8',
      tabAddSub: '\u09af\u09cb\u0997 / \u09ac\u09bf\u09af\u09bc\u09cb\u0997',
      tabWeekday: '\u09b8\u09aa\u09cd\u09a4\u09be\u09b9\u09c7\u09b0 \u09a6\u09bf\u09a8',
      tabBusiness: '\u0995\u09b0\u09cd\u09ae\u09a6\u09bf\u09ac\u09b8',
      tabHistory: '\u0987\u09a4\u09bf\u09b9\u09be\u09b8',
      betweenH: '\u09a6\u09c1\u0987 \u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u09ac\u09cd\u09af\u09ac\u09a7\u09be\u09a8',
      addSubH: '\u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u09af\u09cb\u0997 / \u09ac\u09bf\u09af\u09bc\u09cb\u0997',
      weekdayH: '\u09b8\u09aa\u09cd\u09a4\u09be\u09b9\u09c7\u09b0 \u0995\u09cb\u09a8 \u09a6\u09bf\u09a8?',
      businessH: '\u09a6\u09c1\u0987 \u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u0995\u09b0\u09cd\u09ae\u09a6\u09bf\u09ac\u09b8',
      historyH: '\u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09bf\u09a4 \u09b9\u09bf\u09b8\u09be\u09ac',
      startDate: '\u09b6\u09c1\u09b0\u09c1\u09b0 \u09a4\u09be\u09b0\u09bf\u0996',
      endDate: '\u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996',
      date: '\u09a4\u09be\u09b0\u09bf\u0996',
      amount: '\u09aa\u09b0\u09bf\u09ae\u09be\u09a3',
      unit: '\u098f\u0995\u0995',
      direction: '\u09a6\u09bf\u0995',
      add: '\u09af\u09cb\u0997',
      subtract: '\u09ac\u09bf\u09af\u09bc\u09cb\u0997',
      calculate: '\u09b9\u09bf\u09b8\u09be\u09ac \u0995\u09b0\u09c1\u09a8',
      result: '\u09ab\u09b2\u09be\u09ab\u09b2',
      days: '\u09a6\u09bf\u09a8',
      weeks: '\u09b8\u09aa\u09cd\u09a4\u09be\u09b9',
      months: '\u09ae\u09be\u09b8',
      years: '\u09ac\u099b\u09b0',
      totalDays: '\u09ae\u09cb\u099f \u09a6\u09bf\u09a8',
      businessDaysLabel: '\u0995\u09b0\u09cd\u09ae\u09a6\u09bf\u09ac\u09b8',
      totalDaysSuffix: '\u09ae\u09cb\u099f (\u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996\u09b8\u09b9)',
      inclusive: '\u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996\u09b8\u09b9 \u0997\u09c1\u09a8\u09c1\u09a8',
      historyEmpty: '\u098f\u0996\u09a8\u09cb \u0995\u09cb\u09a8\u09cb \u09b9\u09bf\u09b8\u09be\u09ac \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09bf\u09a4 \u09b9\u09af\u09bc\u09a8\u09bf\u0964',
      exportBtn: '\u098f\u0995\u09cd\u09b8\u09aa\u09cb\u09b0\u09cd\u099f JSON',
      importBtn: '\u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f JSON',
      clearAll: '\u09b8\u09ac \u09ae\u09c1\u099b\u09c1\u09a8',
      typeDelete: '\u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09a4\u09c7 DELETE \u09b2\u09bf\u0996\u09c1\u09a8',
      confirmClear: '\u09ae\u09c1\u099b\u09c1\u09a8',
      daysUnit: '\u09a6\u09bf\u09a8',
      daysUnitPlural: '\u09a6\u09bf\u09a8',
      weekUnit: '\u09b8\u09aa\u09cd\u09a4\u09be\u09b9',
      errBothDates: '\u09a6\u09c1\u099f\u09cb \u09a4\u09be\u09b0\u09bf\u0996\u0987 \u09a6\u09bf\u09a8\u0964',
      errInvalidDate: '\u09b8\u09a0\u09bf\u0995 \u09a4\u09be\u09b0\u09bf\u0996 \u09a6\u09bf\u09a8\u0964',
      errEndBeforeStart: '\u09b6\u09c7\u09b7 \u09a4\u09be\u09b0\u09bf\u0996 \u09b6\u09c1\u09b0\u09c1\u09b0 \u09a4\u09be\u09b0\u09bf\u0996\u09c7\u09b0 \u0986\u0997\u09c7 \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be\u0964',
      errInvalidAmount: '\u098f\u0995\u099f\u09bf \u09b8\u09a0\u09bf\u0995 \u09b8\u0982\u0996\u09cd\u09af\u09be \u09a6\u09bf\u09a8\u0964',
      errBadImport: '\u09ab\u09be\u0987\u09b2\u099f\u09bf \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc; \u09aa\u09c1\u09b0\u09a8\u09cb \u09a4\u09a5\u09cd\u09af \u0985\u09aa\u09b0\u09bf\u09ac\u09b0\u09cd\u09a4\u09bf\u09a4 \u0986\u099b\u09c7\u0964',
      errRangeTooLarge: '\u09ac\u09cd\u09af\u09ac\u09a7\u09be\u09a8 \u09e7\u09e6\u09e6 \u09ac\u099b\u09b0\u09c7\u09b0 \u09ac\u09c7\u09b6\u09bf \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be\u0964',
      importOk: '\u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u09b8\u09ab\u09b2 \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964',
      footer: '\u0985\u09ab\u09b2\u09be\u0987\u09a8 \u099f\u09c1\u09b2\u0964 \u0995\u09b0\u09cd\u09ae\u09a6\u09bf\u09ac\u09b8 \u09b6\u09c1\u09a7\u09c1 \u09b8\u09cb\u09ae-\u09b6\u09c1\u0995\u09cd\u09b0 \u0997\u09cb\u09a8\u09be \u09b9\u09af\u09bc, \u09b8\u09b0\u0995\u09be\u09b0\u09bf \u099b\u09c1\u099f\u09bf \u09ac\u09be\u09a6 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u09b9\u09af\u09bc \u09a8\u09be\u0964',
      langBtn: 'en'
    }
  };

  // Weekday names indexed by Date.getUTCDay() (0 = Sunday).
  var WEEKDAYS_BN = [
    '\u09b0\u09ac\u09bf\u09ac\u09be\u09b0',
    '\u09b8\u09cb\u09ae\u09ac\u09be\u09b0',
    '\u09ae\u0999\u09cd\u0997\u09b2\u09ac\u09be\u09b0',
    '\u09ac\u09c1\u09a7\u09ac\u09be\u09b0',
    '\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09bf\u09ac\u09be\u09b0',
    '\u09b6\u09c1\u0995\u09cd\u09b0\u09ac\u09be\u09b0',
    '\u09b6\u09a8\u09bf\u09ac\u09be\u09b0'
  ];

  var api = { I18N: I18N, WEEKDAYS_BN: WEEKDAYS_BN };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    global.DateCalcI18N = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
