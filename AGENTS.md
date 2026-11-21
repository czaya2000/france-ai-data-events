# France Data Events: operating notes

French edition of germandataevents.com (German edition of swissdataevents.ch). Spec: `CLAUDE-BRIEF.md`. Decisions: `DECISIONS.md`. Source registry: `SOURCES.fr.md` / `config/sources.json`. Owner steps: `TODO-OWNER.md`. The German repo (`../germany-ai-data-events`) is a read-only template: never write there.

## Layout

- Astro app at the repo root (`astro` pinned to `^6.4.8`; do not upgrade).
- `config/country.mjs`: all country-specific values (names, `DEFAULT_SITE_URL` / base, `INDEXABLE`, timezone Europe/Paris, cities, `PLACE_TO_CITY`, contact, owner placeholders). Plain `.mjs`, imported by Astro, scripts and the pipeline.
- `src/data/events.json`, `archive.json`, `meta.json`: event data (schema in `src/content.config.ts`; fields incl. `blurb_en`, `blurb_fr`).
- Every internal `href`/`src` goes through `withBase` / `localePath` (the site lives under `/france-ai-data-events/` until the domain is switched, see TODO-OWNER.md step 4). Absolute URLs: `${SITE_URL}/path` (`${SITE_URL}/en/path`).
- `scripts/`: `validate-events.mjs`, `archive-past.mjs`, `test-ics.mjs`, `test-agent-files.mjs`, `test-i18n.mjs`, `build-digest.mjs` (`npm run digest:preview` writes `preview/`), `buttondown-redirects.mjs`, `buttondown-tag-css.mjs`, `indexnow.mjs`, `make-brand-assets.mjs`.
- Pipeline: `pipeline:prepare` (code: fetch, filter, dedupe, ledger) -> Claude step reads `work/TASK.md`, writes `work/enrichment.json` -> `pipeline:apply` (code verifies everything in `pipeline/lib/verify.mjs`). Fetcher types: meetup, hackevents, brainberg, luma, luma-calendar, eventbrite, rss, atom, ics, devevents, confstech, jsonld, openagenda, scrape. Discovery: `data/cache/discovered-groups.json`, `discovered-luma-calendars.json` (capped, trust `noisy`).

## Commands

`npm test` (offline unit tests), `npm run build`, `npm run validate`, `npm run test:ics`, `npm run test:agent`, `npm run test:i18n` (after build), `npm run test:e2e` (Playwright, fixtures, frozen clock 2026-11-18, browser zone America/Los_Angeles; builds into `dist-e2e/`). E2E runs in `deploy.yml`, not in the daily refresh. Empty `events.json` is valid (honest empty state).

## Rules

- No Node script calls the Anthropic API or reads `CLAUDE_CODE_OAUTH_TOKEN`; only `daily-refresh.yml` references the secret and skips the Claude step with a notice when it is missing. No secrets in the repo.
- `INDEXABLE=false` until the domain is live: noindex meta, `Disallow: /`, no sitemap, no IndexNow. No `public/CNAME` until then.
- Umami: `UMAMI_WEBSITE_ID` empty means no script at all.
- Third-party listings (Brief IA, allai, Meetup city pages, Eventbrite): facts only, never descriptions; blurbs are generated. Eventbrite: slow, cached, backs off, never bypassed.
- Public pages carry no TODO / Brouillon / Draft text (tests enforce it).
- LF line endings. Commit to `main`.

## Behaviour that must not regress

- An event is over when its end instant in Europe/Paris is before now: end time on the last day if the time is a range ("10:00–12:00"), else 23:59:59 of the last day (`src/lib/schedule.mjs`, shared by build, digest and the client listing script, which uses `data-end`). Running events sit under "Aujourd'hui" / "Today"; a multi-day event that began earlier shows today's date plus "jusqu'au / until <end>".
- Cards on the website show city + time only; the full address is on the event page.
- "This week" = today..Sunday; "this month" = today..end of month, both in Europe/Paris.
- Test freezes: `SITE_NOW` (ISO instant) or `SITE_TODAY` (date); e2e env `E2E_EVENTS`, `E2E_OUT`.

## Languages (French first, English under /en/)

- Astro i18n: locales `['fr','en']`, default `fr`, no prefix for French. Language-neutral files stay single: `/events.json`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, hub `.md` files (English slugs). Per language: ICS (`/calendar/`, `/en/calendar/`, same UIDs) and RSS (`/rss.xml`, `/en/rss.xml`).
- Page bodies live once in `src/views/*.astro` (prop `locale`); `src/pages/**` are thin wrappers (French at root, same file under `src/pages/en/`). A new page = one view + two wrappers.
- Strings: `src/i18n/en.ts` defines the shape, `src/i18n/fr.ts` is typed `Messages`. Use `t(locale)`; no hard-coded UI copy. Stored values (titles, organisers, venues, topics) are shown as stored; `displayCity`, `formatLabel`, `localizeCost` translate stored English values at render time.
- Paths: `src/i18n/paths.mjs` (`localePath`, `switchLocalePath`, `hubPath`, `legalPath('legal'|'privacy', locale)`). Format hubs: `/conferences/`, `/ateliers/`, `/webinaires/`, `/meetups/`, `/networking/` <-> `/en/conferences/`, `/en/workshops/`, `/en/webinars/`, ...; legal: `/mentions-legales/` <-> `/en/legal-notice/`, `/confidentialite/` <-> `/en/privacy/`.
- Newsletter: Buttondown `france-data-events`, exactly one of `lang-fr` / `lang-en` plus optional `city-<slug>` / `format-<slug>`. The Monday digest creates two drafts only (French: not `lang-en`; English: `lang-en`); never send.
- Product name `SITE_NAME` "France Data Events" (English in both languages). `CONTACT_EMAIL` in `config/country.mjs` is the only contact constant; `FORM_ENDPOINT` is FormSubmit + that address.
