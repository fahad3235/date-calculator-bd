# Date Calculator BD

Offline, bilingual (English / Bangla) date calculator for Bangladesh. No server, no tracking, no network requests - everything runs in your browser and your history stays in your browser's localStorage.

## Features

1. **Days between two dates** - total days, weeks + days, and a calendar breakdown (years / months / days), with an optional inclusive count.
2. **Add / subtract** - add or subtract days, weeks, months, or years from any date. Month arithmetic clamps to the target month's length (31 Jan + 1 month = 28 Feb; 31 Jan 2024 + 1 month = 29 Feb).
3. **Weekday finder** - what day of the week any date falls on.
4. **Business days** - count of Monday-Friday days between two dates, inclusive.
5. **History** - every calculation is saved locally; export to JSON, import with strict validation (a bad file is rejected and your data stays intact), or clear all by typing `DELETE`.

Plus: English / Bangla UI toggle (persisted), Bengali digits in Bangla mode, inline validation with empty / error states, and a mobile layout that fits a 390px screen.

## Stack

Vanilla HTML, CSS, and JavaScript. No build step, no dependencies, no framework.

- `index.html` - page structure
- `css/style.css` - styling
- `js/datecalc.js` - pure date logic (UTC-based; shared by the app and the tests)
- `js/i18n.js` - English / Bangla strings (Bangla written as `\uXXXX` escapes so every source file stays pure ASCII)
- `js/app.js` - UI wiring and localStorage history

## Prerequisites

Any modern browser. For the tests: Node.js 18+.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Testing

```sh
node tests/datecalc.test.js   # 24 unit tests (date math, clamping, validation)
node tests/smoke.mjs          # 16 headless-Chrome checks (UI flows, i18n, 390px)
```

The smoke harness drives the stock Playwright `headless_shell` binary over raw CDP; it is a local QA tool and is not part of the shipped app.

## Deployment

Static hosting only - copy the folder to any static host, or enable GitHub Pages on the repository's `main` branch (root). There is no backend to configure and no environment variables.

## Limitations

- Dates use the Gregorian calendar only. Bangla-calendar conversion is a different tool (`bangla-calendar-bd`).
- Business days count Monday-Friday only; they do **not** exclude Bangladeshi public holidays, because no holiday list is bundled (holiday dates, especially Eid, depend on moon sighting).
- The date range for a single calculation is capped at ~100 years so business-day counting stays instant.
- History lives in one browser's localStorage; export JSON to move it to another device.

## Status

MVP complete. Unit tests 24/24 and headless-Chrome smoke checks 16/16 pass with zero console errors.
