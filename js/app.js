/* Date Calculator BD - UI wiring. Depends on DateCalc and DateCalcI18N. */
(function () {
  'use strict';

  var DC = window.DateCalc;
  var I18N = window.DateCalcI18N.I18N;
  var WEEKDAYS_BN = window.DateCalcI18N.WEEKDAYS_BN;
  var LS_LANG = 'datecalc-lang-v1';
  var LS_HISTORY = 'datecalc-history-v1';
  var MAX_RANGE_DAYS = 36500; // ~100 years, keeps business-day loops fast

  var lang = 'en';
  try {
    var savedLang = localStorage.getItem(LS_LANG);
    if (savedLang === 'bn' || savedLang === 'en') lang = savedLang;
  } catch (e) { /* storage unavailable: stay in English */ }

  function t(key) {
    return I18N[lang][key];
  }

  function $(id) {
    return document.getElementById(id);
  }

  function toBnDigits(str) {
    var map = { '0': '\u09e6', '1': '\u09e7', '2': '\u09e8', '3': '\u09e9', '4': '\u09ea', '5': '\u09eb', '6': '\u09ec', '7': '\u09ed', '8': '\u09ee', '9': '\u09ef' };
    return String(str).replace(/[0-9]/g, function (ch) { return map[ch]; });
  }

  function fmtNum(n) {
    var s = Number(n).toLocaleString('en-US');
    return lang === 'bn' ? toBnDigits(s) : s;
  }

  function fmtDateForLang(iso) {
    return lang === 'bn' ? toBnDigits(iso) : iso;
  }

  function weekdayLabel(dt) {
    return lang === 'bn' ? WEEKDAYS_BN[dt.getUTCDay()] : DC.weekdayName(dt);
  }

  function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    // Select option labels carry their own keys.
    document.querySelectorAll('[data-i18n-opt]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n-opt'));
    });
    $('langBtn').textContent = lang === 'en' ? '\u09ac\u09be\u0982\u09b2\u09be' : 'English';
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
    renderHistory();
    try { localStorage.setItem(LS_LANG, lang); } catch (e) { /* ignore */ }
  }

  function showError(boxId, msg) {
    var box = $(boxId);
    box.textContent = msg;
    box.hidden = false;
  }

  function clearError(boxId) {
    var box = $(boxId);
    box.textContent = '';
    box.hidden = true;
  }

  function showResult(boxId, html) {
    var box = $(boxId);
    box.innerHTML = html;
    box.hidden = false;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---- history ----
  function loadHistory() {
    try {
      var raw = localStorage.getItem(LS_HISTORY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!DC.validateHistoryPayload({ app: 'date-calculator-bd', version: 1, entries: parsed })) return [];
      return parsed;
    } catch (e) {
      return [];
    }
  }

  function saveHistory(entries) {
    try { localStorage.setItem(LS_HISTORY, JSON.stringify(entries)); } catch (e) { /* ignore */ }
  }

  function pushHistory(kind, summary) {
    var entries = loadHistory();
    entries.unshift({ kind: kind, summary: summary });
    entries = entries.slice(0, 100);
    saveHistory(entries);
    renderHistory();
  }

  function renderHistory() {
    var list = $('historyList');
    var empty = $('historyEmpty');
    var entries = loadHistory();
    if (entries.length === 0) {
      list.innerHTML = '';
      empty.textContent = t('historyEmpty');
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    list.innerHTML = entries.map(function (e) {
      return '<li><span class="hist-kind">' + esc(e.kind) + '</span> ' + esc(e.summary) + '</li>';
    }).join('');
  }

  // Shared two-date validation. Returns {a, b} or null (error already shown).
  function readTwoDates(startId, endId, errId) {
    var sv = $(startId).value.trim();
    var ev = $(endId).value.trim();
    clearError(errId);
    if (!sv || !ev) { showError(errId, t('errBothDates')); return null; }
    var a = DC.parseISO(sv);
    var b = DC.parseISO(ev);
    if (!a || !b) { showError(errId, t('errInvalidDate')); return null; }
    if (b.getTime() < a.getTime()) { showError(errId, t('errEndBeforeStart')); return null; }
    var span = DC.daysBetween(a, b);
    if (span > MAX_RANGE_DAYS) { showError(errId, t('errRangeTooLarge')); return null; }
    return { a: a, b: b };
  }

  // ---- tabs ----
  function switchTab(name) {
    document.querySelectorAll('.tab').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === name);
      btn.setAttribute('aria-selected', btn.getAttribute('data-tab') === name ? 'true' : 'false');
    });
    document.querySelectorAll('.panel').forEach(function (panel) {
      panel.hidden = panel.id !== 'panel-' + name;
    });
  }

  function init() {
    document.querySelectorAll('.tab').forEach(function (btn) {
      btn.addEventListener('click', function () { switchTab(btn.getAttribute('data-tab')); });
    });

    $('langBtn').addEventListener('click', function () {
      lang = lang === 'en' ? 'bn' : 'en';
      applyLang();
    });

    // Days between
    $('betweenForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var pair = readTwoDates('betweenStart', 'betweenEnd', 'betweenError');
      if (!pair) { $('betweenResult').hidden = true; return; }
      var total = DC.daysBetween(pair.a, pair.b);
      var incl = $('betweenInclusive').checked ? total + 1 : total;
      var bd = DC.breakdown(pair.a, pair.b);
      var weeks = Math.floor(total / 7);
      var remDays = total % 7;
      var lines = [];
      lines.push('<p class="big">' + fmtNum(incl) + ' ' + t('days') + '</p>');
      lines.push('<p>' + t('totalDays') + ': ' + fmtNum(total) + ' (' + fmtNum(weeks) + ' ' + t('weeks') + ', ' + fmtNum(remDays) + ' ' + t('days') + ')</p>');
      lines.push('<p>' + fmtNum(bd.years) + ' ' + t('years') + ', ' + fmtNum(bd.months) + ' ' + t('months') + ', ' + fmtNum(bd.days) + ' ' + t('days') + '</p>');
      showResult('betweenResult', lines.join(''));
      pushHistory('between', DC.fmt(pair.a) + ' -> ' + DC.fmt(pair.b) + ' = ' + total + ' days');
    });

    // Add / subtract
    $('addSubForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      clearError('addSubError');
      var sv = $('addSubDate').value.trim();
      var base = DC.parseISO(sv);
      if (!base) { showError('addSubError', t('errInvalidDate')); $('addSubResult').hidden = true; return; }
      var raw = $('addSubAmount').value.trim();
      if (!/^[0-9]+$/.test(raw)) { showError('addSubError', t('errInvalidAmount')); $('addSubResult').hidden = true; return; }
      var amount = parseInt(raw, 10);
      if (amount < 1 || amount > 99999) { showError('addSubError', t('errInvalidAmount')); $('addSubResult').hidden = true; return; }
      var dir = $('addSubDirection').value === 'subtract' ? -1 : 1;
      var unit = $('addSubUnit').value;
      var out;
      if (unit === 'days') out = DC.addDays(base, dir * amount);
      else if (unit === 'weeks') out = DC.addDays(base, dir * amount * 7);
      else if (unit === 'months') out = DC.addMonths(base, dir * amount);
      else out = DC.addYears(base, dir * amount);
      var sign = dir === 1 ? '+' : '-';
      showResult('addSubResult',
        '<p class="big">' + fmtDateForLang(DC.fmt(out)) + '</p>' +
        '<p>' + weekdayLabel(out) + '</p>');
      pushHistory('addsub', DC.fmt(base) + ' ' + sign + ' ' + amount + ' ' + unit + ' = ' + DC.fmt(out));
    });

    // Weekday
    $('weekdayForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      clearError('weekdayError');
      var sv = $('weekdayDate').value.trim();
      var dt = DC.parseISO(sv);
      if (!dt) { showError('weekdayError', t('errInvalidDate')); $('weekdayResult').hidden = true; return; }
      showResult('weekdayResult',
        '<p class="big">' + weekdayLabel(dt) + '</p>' +
        '<p>' + fmtDateForLang(DC.fmt(dt)) + '</p>');
      pushHistory('weekday', DC.fmt(dt) + ' = ' + DC.weekdayName(dt));
    });

    // Business days
    $('businessForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var pair = readTwoDates('businessStart', 'businessEnd', 'businessError');
      if (!pair) { $('businessResult').hidden = true; return; }
      var count = DC.businessDays(pair.a, pair.b);
      var total = DC.daysBetween(pair.a, pair.b) + 1;
      showResult('businessResult',
        '<p class="big">' + fmtNum(count) + ' ' + t('businessDaysLabel') + '</p>' +
        '<p>' + fmtNum(total) + ' ' + t('days') + ' ' + t('totalDaysSuffix') + '</p>');
      pushHistory('business', DC.fmt(pair.a) + ' -> ' + DC.fmt(pair.b) + ' = ' + count + ' business days');
    });

    // History: export / import / clear
    $('exportBtn').addEventListener('click', function () {
      var payload = { app: 'date-calculator-bd', version: 1, entries: loadHistory() };
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'date-calculator-history.json';
      a.click();
      URL.revokeObjectURL(a.href);
    });

    $('importBtn').addEventListener('click', function () { $('importFile').click(); });
    $('importFile').addEventListener('change', function () {
      var file = $('importFile').files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var parsed = JSON.parse(reader.result);
          if (!DC.validateHistoryPayload(parsed)) throw new Error('invalid');
          saveHistory(parsed.entries.slice(0, 100));
          renderHistory();
          showResult('historyMsg', '<p>' + esc(t('importOk')) + '</p>');
        } catch (e) {
          showError('historyError', t('errBadImport'));
          $('historyMsg').hidden = true;
        }
      };
      reader.readAsText(file);
      $('importFile').value = '';
    });

    $('clearBtn').addEventListener('click', function () {
      clearError('historyError');
      $('historyMsg').hidden = true;
      if ($('deleteConfirm').value.trim() !== 'DELETE') {
        showError('historyError', t('typeDelete'));
        return;
      }
      saveHistory([]);
      $('deleteConfirm').value = '';
      renderHistory();
    });

    applyLang();
    switchTab('between');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
