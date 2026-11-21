# Build brief: French Data Events (frenchdataevents.fr)

French twin of germandataevents.com (itself the German edition of swissdataevents.ch). Built 21 November 2026 in one autonomous run, from a copy of the German repo (`../germany-ai-data-events`, read-only template: never modified, never pushed) plus the research in `../france-research` (approved by the owner).

Product: a public list of upcoming **AI and data events in France** (meetups, conferences, workshops, networking, webinars). French at `/`, English at `/en/`. Browse by city and format, weekly email digest (Buttondown, later), calendar feeds (ICS / Google Calendar), JSON / RSS / llms.txt for apps and agents. It refreshes itself daily.

Name: **French Data Events** (`SITE_NAME`, English in both languages). Domain: frenchdataevents.fr, **not bought yet**. Contact: hallo@germandataevents.com (ImprovMX forwarding, later).

## 1. What stays identical to Germany

Architecture, schema (`src/content.config.ts`, no new fields except `blurb_fr`), deterministic Node pipeline (`prepare` -> Claude step on new candidates only -> `apply`), ledger, verification of LLM output in code, budget guards, GitHub Actions deploy, Playwright e2e, the end-of-event rule, the filters, ICS, llms.txt, newsletter look. See `AGENTS.md` for the operating notes (they apply here with `de` -> `fr`, Berlin -> Paris).

## 2. What changes

| Topic | Germany | France |
|---|---|---|
| Time zone | Europe/Berlin | Europe/Paris (same EU DST rule) |
| Root language | German | French (`fr`), English under `/en/` |
| Cities | Berlin, Munich, Hamburg, Frankfurt, Cologne, Stuttgart, Online (DE), Other Germany | Paris (incl. Ile-de-France / Saclay), Lyon, Toulouse, Marseille-Aix, Nice-Sophia, Bordeaux, Lille, Nantes, Rennes, Grenoble, Strasbourg, Montpellier, Online (FR), Other France |
| Format slugs (FR) | konferenzen, webinare | conferences, webinaires, ateliers (workshops), meetups, networking |
| Blurbs | `blurb_en` + `blurb_de` | `blurb_en` + `blurb_fr` |
| Newsletter tags | `lang-de` / `lang-en` | `lang-fr` / `lang-en` + `city-<slug>`, `format-<slug>` |
| Legal | Impressum, Datenschutz (DDG, DSGVO, BfDI) | Mentions légales (LCEN art. 6 III), Politique de confidentialité (RGPD, CNIL) |
| Sources | German registry | `config/sources.json` from `../france-research/sources.fr.json` (127 sources, 61 tier 1), see `SOURCES.fr.md` |
| New fetcher types | none | `jsonld`, `luma-calendar`, `openagenda` |
| Accent colour | German red | deep blue `#1F3A93` (Swiss/German look otherwise) |
| Indexing | live | `INDEXABLE=false` until the domain is live (noindex + robots Disallow + no sitemap) |
| Hosting URL | germandataevents.com | `https://czaya2000.github.io/france-ai-data-events/` now (base path), custom domain later by one config line |

## 3. Decisions

Logged one by one in `DECISIONS.md`. Headlines:

1. Site works under a sub-path today and on the apex later: `config/country.mjs` `DEFAULT_SITE_URL` is the one line to change.
2. Research coverage is honestly lower than Germany's (65% central estimate): Meetup is thinner, Luma has no national discover page, Eventbrite and open data (OpenAgenda) carry more. The pipeline therefore self-expands: Meetup groups and Luma calendars seen in any source are discovered and polled (capped), marked `noisy` until promoted.
3. Third-party listing sites (Brief IA, allai.events, Meetup city pages, Eventbrite): only basic facts are stored (title, date, time, city, venue, link). Descriptions are never copied; blurbs are generated. Eventbrite is slow, cached, backs off and switches itself off for the run on 429/405; blocks are never bypassed.
4. Dedupe is stronger for cross-listed events (normalised title + date + city, URL canonicalisation), because overlap between French sources is low and credibility depends on it.
5. No postal address on the legal page (owner's accepted risk), see DECISIONS.md.

## 4. Acceptance criteria (checked in `QA-REPORT.md`)

1. `npm ci && npm test && npm run build && npm run validate && npm run test:ics` pass.
2. French (root) and English (`/en/`) render every page, switch works, hreflang pairs, no German text left (grep gate: `Deutsch|Germany|Berlin|Impressum|Datenschutz|germandataevents|Europe/Berlin` returns only justified exceptions).
3. Ended events are hidden (build time and client JS, Europe/Paris end time, else 23:59:59 of the last day); events running today sit under "Aujourd'hui" / "Today"; cards show city + time only.
4. Week filter = today..Sunday, month = today..end of month.
5. `noindex` meta and `Disallow: /` while `INDEXABLE=false`; no `public/CNAME`; all links work under `/france-ai-data-events/`.
6. Pages: no `TODO`, `Brouillon`, `Draft` on any built page.
7. Live Pages URL answers 200 with noindex.
8. No Node file references `api.anthropic.com`, `@anthropic-ai/sdk` or `CLAUDE_CODE_OAUTH_TOKEN`; the secret appears only in `daily-refresh.yml`. No secrets in the repo.
9. Backlog: all upcoming events from today to at least +8 weeks that the sources list are in `src/data/events.json`.

## 5. Phases of this run

0 brief + repo; 1 site adaptation; 2 pipeline (fetchers, discovery, workflows, Pages); 3 backlog run (local, the operator is the LLM); 4 legal + newsletter; 5 QA. One commit per phase, pushed to `main`.

## 6. Rules

- Never touch the German repo or its GitHub settings. Never print secrets.
- No questions during the run: decide, and log it in `DECISIONS.md`.
- Owner-only values are listed in `TODO-OWNER.md`.
