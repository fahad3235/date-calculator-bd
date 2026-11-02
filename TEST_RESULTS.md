# Test results - date-calculator-bd (run 2026-11-02, 13:00 slot)

## Unit tests - 24/24 pass (`node tests/datecalc.test.js`)

Hand-verified cases:
- 2026-01-01 -> 2026-01-31 = 30 days; breakdown 0y 0m 30d
- Leap: 2024-02-28 -> 2024-03-01 = 2 days; non-leap 2023 = 1 day
- 2020-01-15 -> 2026-11-02 = 6y 9m 18d
- 2026-01-31 + 1 month = 2026-02-28 (clamp); 2024-01-31 + 1 = 2024-02-29 (leap)
- 2024-02-29 + 1 year = 2025-02-28 (clamp); breakdown of that pair = 1y 0m 0d
- 2026-11-02 is Monday; 2026-01-01 Thursday; 2000-01-01 Saturday
- Business days: Mon-Fri week = 5; Mon-Sun = 5; single Saturday = 0; single Monday = 1
- parseISO rejects 2026-02-30, 2023-02-29, month 13, free text, non-padded dates
- History payload validation: valid passes; wrong app / version / malformed entries rejected

One test expectation was corrected during the run (not an app bug): the
2024-02-29 -> 2025-02-28 breakdown is 1y 0m 0d, because the year step clamps
to 2025-02-28, which equals the end date.

## Headless-Chrome smoke - 16/16 pass (`node tests/smoke.mjs`)

Raw CDP against the stock Playwright headless_shell binary, `file://` page:
title + 5 tabs render; between-flow shows 30 days and the 0y/0m/30d line;
end-before-start shows an inline error; add-flow gives 2026-02-28;
weekday-flow gives Monday; business-flow gives 5; Bangla toggle changes the
title (first codepoint U+09A4) and persists `datecalc-lang-v1 = bn`;
history recorded >=3 entries; 390px viewport has no horizontal overflow
(scrollWidth <= 391); zero console errors and zero page exceptions across
the whole session.

Repairs: 0 app-logic bugs. Two Bengali source fixes found by decoding the
escape strings and reading the rendered Bangla: a missing syllable in the
app title (fixed before smoke) and a wrong codepoint in one Bangla heading
(fixed before smoke).

## ASCII hygiene

App sources are pure ASCII (Bangla as `\uXXXX` escapes); verified with
`grep -P '[^\x00-\x7F]'` returning no matches in `js/` and `index.html`.
The smoke harness (`tests/smoke.mjs`) is a local QA tool and is not pushed.
