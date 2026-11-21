# QA report (21 November 2026)

Scope: the France edition as built in one autonomous run. Result: all checks below pass; open items at the end.

## Automated checks

| Check | Result |
|---|---|
| `npm test` (offline: parsers incl. jsonld / luma-calendar / openagenda, dedupe 16 positive + 14 negative French pairs, ledger, caps, Eventbrite politeness, discovery caps, verify/apply, i18n, schedule, digest) | 177 pass, 0 fail |
| `npm run build` with 199 real events | 458 pages |
| `npm run validate` | OK, 199 events valid |
| `npm run test:ics` | 56 French + 56 English feeds valid, `TZID=Europe/Paris`, UIDs `@frenchdataevents.fr` |
| `npm run test:agent` (llms.txt, llms-full.txt, per-city and per-type md) | OK |
| `npm run test:i18n` | 229 French + 229 English pages: lang, hreflang pairs, switch targets, no phrase leaks, noindex, base paths |
| `npm run test:e2e` (Playwright, frozen clock 2026-11-18, browser zone America/Los_Angeles, desktop 1280 + mobile 390, fr + en) | 306 pass; also green in `deploy.yml` on GitHub |
| Grep built pages for `TODO`, `Brouillon`, `Draft`, `[[` | none |
| Grep built pages for German leftovers (Deutsch, Impressum, Datenschutz, germandataevents, Europe/Berlin) | none (only code comments mention the German edition) |
| Basics: `lang`, one `h1`, `<title>`, canonical, viewport, every `img` has alt | pass on home |

## Behaviour covered by e2e

Filters (city, format, search, week = today..Sunday, month = today..end of month), ended events hidden at build and in client JS (Europe/Paris end time, else 23:59:59), running events under "Aujourd'hui" / "Today", cards show city + time only, FR/EN switch with slug mapping, forms (FormSubmit target `contact@frenchdataevents.fr`, Buttondown `france-data-events` with exactly one `lang-fr`/`lang-en`), ICS feeds, noindex and robots, no Umami script while the ID is empty.

## Deployed site

https://czaya2000.github.io/france-ai-data-events/ answers 200, carries the noindex meta, `robots.txt` is `Disallow: /`. Checked with curl after the phase 2 deploy and again after the phase 3 deploy (see BUILD-STATUS.md).

## Backlog run

Live `prepare --bootstrap`: 134 of 143 feed sources reachable (94%), 2,184 items fetched, 1,090 in window and in France, 461 new candidates after keyword filter and dedupe. LLM step done by the build agent (work/TASK.md in, enrichment out, no claude CLI). Apply: 197 from feeds + 2 from the Hub France IA page = **199 events**, 200 rejected, 64 deferred (63 low confidence, 1 without URL), 0 invalid outputs. 180 events fall within 8 weeks; the rest run to March 2027.

## Open issues

1. **Coverage is below Germany's** (research estimate 55 to 75%). Meetup and Luma discovery will grow it over the next weeks; review the discovered lists.
2. allai.events page: its listing has no dates, so the page-extraction route yields nothing; its events arrive only where other sources list them. Fetching its detail pages is a follow-up.
3. Brief IA events link to the briefia.fr page rather than the organiser's registration page.
4. 63 low-confidence candidates are deferred, not published; a human skim of `data/cache/ledger.json` deferrals could rescue some.
5. Eventbrite uses a budget of 70 requests per run and disables itself on 429/405; from GitHub runners it may be blocked, as in Germany.
6. The digest preview built from the full backlog is over Gmail's clip size; later weekly digests (two weeks only) will be smaller.
7. Native-French review and legal review are owner tasks (TODO-OWNER.md, section 10).
8. Playwright covers the site under a root path; the sub-path build is covered by `test:i18n` and the live curl check.
