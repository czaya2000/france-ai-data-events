# Event sources: France edition

French counterpart of `SOURCES.de.md`. Compiled 21 Nov 2026 from live fetches (HTTP status, content type, payload shape) run from a Windows desktop, one request per second per host. Machine-readable version: `sources.fr.json` (same schema as the German `config/sources.json`, plus a `tier` field and three new fetcher types, see section F).

**Status legend**

- `VERIFIED`: returned HTTP 200 with the expected format (ICS, RSS, JSON, or HTML containing schema.org `Event` JSON-LD) on 21 Nov 2026.
- `UNVERIFIED`: seen in research or a search result, not fetched successfully.
- `DROPPED`: broken, blocked or useless.

**Trust classes** (same as Germany): `curated` (AI/data-specific, keyword prefilter only), `noisy` (general, keyword prefilter then LLM yes/no), `lead` (mostly re-lists other sources, use it to find groups and URLs and prefer the organiser page).

**Priority tiers:** 1 = must-have, 2 = useful, 3 = optional. **Events/month** is my estimate of AI/data events in France per month that the source adds, from the 8-week sample (`COMPETITORS.fr.md`), not a promise.

Polite fetching for everything: desktop browser User-Agent plus contact string, at most 1 request per second per host (2 s for Eventbrite and allai), conditional GET where supported, isolate failures per source. **Never bypass a 403, 429 or captcha; record it and move on.**

Key finding for France: **Meetup is thinner and Luma is fragmented compared with Germany.** About a third of the AI/data groups I tested had no upcoming event, Luma has a discover place only for Paris, and ticketing (Eventbrite) plus public-sector open data (OpenAgenda) carry a large share of the events. Expect lower overlap between sources and lower measured coverage than Germany.

---

## A. FEED sources (deterministic fetchers)

### A1. Meetup group calendars (ICS, tier 1) — VERIFIED

- Template `https://www.meetup.com/{group}/events/ical/`. Format as in Germany (`UID event_<id>@meetup.com`, `DTSTART;TZID=Europe/Paris`, `SUMMARY`, `DESCRIPTION`, `URL`). The ICS lists upcoming events only and **appears capped at about 10**.
- 55 Meetup entries (53 distinct calendars; 2 are aliases) are in `sources.fr.json` (all returned `text/calendar` 200). Counts below are upcoming VEVENTs on 21 Nov.
- **Self-expanding rule (critical for France):** add every `meetup.com/{group}/events/{id}` slug seen in Brainberg `meetupUrl`, Meetup city pages, Toulouse Tech Hub, Brief IA and Eventbrite descriptions to a discovery list; test its ICS once; poll it if AI/data-relevant. Brainberg alone gave 92 slugs, but most are not AI/data (cooking, salsa): review weekly. About 20 of the groups below have 0 upcoming; keep polling, they are not dead.

**Paris / Ile-de-France:** `pydata-paris` and `compute-paris` (same calendar, Compute! Paris 25-26 Nov, 1), `paris-dataladies` (1), `paris-ai-tech-talk` (1), `paris-ai` (1), `artificial-intelligence-meetup-paris` (1), `paris-big-data` (Analytics.Club, 6), `paris-dbt-meetup` (1), `paris-apache-airflow-meetup` (1), `semweb-pro` (1), `health-data-hub` (2), `french-aws-ug` (1), `gdg-paris` (1); 0 today: `paris-machine-learning-study-group-in-english-meetup`, `paris-women-in-machine-learning-data-science`, `mlops-paris`, `paris-dataops`, `paris-nlp`, `generative-ai-paris`, `data-science-leaders`, `search-and-data`, `data-for-good-france`, `ia-paris`, `paris-big-data-meetup`, `rladies-paris`.
**Lyon:** `lyon-data-science` (3, alias `lyondatascience`; includes the 10-year Forum on 5 Dec), `aws-lyon-amazon-web-services-user-group` (1); 0: `lyon-ia`, `lyon-dataviz`.
**Toulouse:** `ia-innovateurs` (1), `postgres-toulouse` (1), `latoulboxducloudnatif` (1); 0: `tlse-data-science`, `meetup-visualisation-des-donnees-toulouse`, `python-toulouse`.
**Marseille/Aix:** `intelligence-artificielle-aix-marseille` (1), `google-developer-group-aix-en-provence` (1).
**Bordeaux:** `le-wagon-bordeaux-coding-station-bootcamp` (10, intro sessions); 0: `bordeaux-ia`. **Lille:** `le-wagon-lille-coding-station` (7), `meetup-postgresql-lille` (1).
**Nice / Sophia:** `groupe-meetup-nice-data` (Club Data Nice, 3), `nice-natural-language-processing-meetup-group` (1).
**Rennes:** `generative-ai-rennes` (1); **Strasbourg:** `strasbourg-deep-learning-meetup` (3), `strasbourg-dev` (1), `strasbourg-aws-user-group` (2); **Montpellier:** `afterwork-ia-montpellier` (1); **Other:** `ianancy`, `cfdatalovers` (Clermont-Ferrand), `les-meetups-de-l-ia`, `ai-first`, `ai-for-dev`, `it-business-club-data-cloud-dev`.
**No usable group found** for Nantes, Grenoble grand data/AI communities at test time (guessed slugs return 404); rely on self-expansion and other feeds.

Estimated yield: 15 to 25 AI/data events per month across all groups. Tier 1.

### A2. Luma (tier 1, partly)

- **Discover place API, Paris only.** `https://api.lu.ma/discover/get-paginated-events?discover_place_api_id=discplace-NdLrh1xJfeotJZC&pagination_limit=50&pagination_cursor=...` — VERIFIED, 40 events, all topics. `https://api.lu.ma/discover/bootstrap-page` lists the 87 places worldwide; **no other French city exists** (luma.com/discover/lyon, /toulouse etc. are 404). Trust `noisy`. About 10 AI/data events per 8 weeks.
- **Calendar-level pulls (the real Luma coverage for France).** For a calendar id: `https://api.lu.ma/calendar/get-items?calendar_api_id=<cal-id>&period=future&pagination_limit=50` (VERIFIED, JSON) or ICS `https://api.lu.ma/ics/get?entity=calendar&id=<cal-id>` (VERIFIED, includes past events, location is a URL only). The id comes from the calendar page's `__NEXT_DATA__` (`props.pageProps.initialData.data.calendar.api_id`) or from resolving any event URL `luma.com/<slug>` to its calendar. 20 calendars are in `sources.fr.json`: datacraft (Paris data club), Hub France IA, Bond AI Paris, The AI Collective, Air Street, Doctolib AI Community, Dust, H Company, AMI Labs, Notion Paris, AI-Ficionados (Toulouse), CTO de Lyon, GenAI Network, Women in Code, Nouvelle Machine, MACHINA Summit, plus global calendars filtered to French cities (ClickHouse, n8n, Neo4j, Make). All VERIFIED.
- **Self-expanding rule for Luma:** resolve every Luma link found in Eventbrite, Meetup, Brief IA, Toulouse Tech Hub and Brainberg to its calendar id and add it. I resolved 41 links to 30 calendars this way in one pass.
- Estimated yield 10 to 20 per month. Tier 1.

### A3. Eventbrite France (JSON-LD, tier 1 but rate limited)

- Pattern `https://www.eventbrite.fr/d/france--{city}/{keyword}/?page={n}`, parse `application/ld+json` `ItemList` → `Event` (`name`, `startDate`, `url`, `location.address.addressLocality`). About 20 per page. VERIFIED for Paris, Lyon, Toulouse, Bordeaux, Lille, Grenoble and Nantes.
- City slugs: `paris`, `lyon`, `toulouse`, `marseille`, `aix-en-provence`, `nantes`, `bordeaux`, `lille`, `grenoble`, `nice`, `rennes`, `strasbourg`, `montpellier`, `online`. Keywords: `intelligence-artificielle`, `data`, `machine-learning`, `data-science`, `ia`.
- **HTTP 429 after about 110 page loads in a single session** (hit at Nice). Not bypassed. Run 2 to 5 s apart, cap 2 pages per city and keyword, spread over the day, back off on 429. Nice onwards, Rennes, Strasbourg, Montpellier, Aix and Online are UNVERIFIED for that reason.
- Trust `noisy`: only 73 of 317 in-window items passed the keyword filter. The biggest single gap closer in the sample (+60 events).

### A4. Brainberg (JSON API, tier 1) — VERIFIED

`https://brainberg.eu/api/events?country=FR&limit=100&from=YYYY-MM-DD&cursor=<nextCursor>`: 3 pages, 215 events, all tech categories (about 70 AI/data by category). Re-lists Meetup (113), Eventbrite (53), dev.events (22), eventseye (25). Role `lead`. Use `meetupUrl`/`registrationUrl`, and `meetupUrl` for group discovery. Cities: Paris 27, Lille 8, Lyon 7, Strasbourg 7, Bordeaux 6, Nantes 5, Nice 4.

### A5. French aggregators with schema.org JSON-LD (tier 1 and 2)

- **Brief IA meetups** `https://www.briefia.fr/meetups` — VERIFIED, 50 Event blocks, about 8 weeks ahead, French, all of France. Tier 1 (+22 events). Mostly re-lists Eventbrite, Meetup and Luma; follow outbound links. Check terms; do not republish descriptions.
- **Meetup city pages** `https://www.meetup.com/fr-FR/cities/fr/{city}/events/` — VERIFIED for 12 cities, 10 to 54 JSON-LD events, all topics. Tier 2, discovery only.
- **Toulouse Tech Hub** `https://toulouse-tech-hub.fr/` — VERIFIED, 15 events, tier 2 for Toulouse.
- **AI Tinkerers Paris** `https://paris.aitinkerers.org/` — VERIFIED, 24 JSON-LD events, `curated`; `lille.` and `toulouse.` subdomains load with 0 events. Tier 2.
- **Create With Paris** `https://createwith.com/cities/paris` — VERIFIED, 6 events, English, tier 3.
- **dev.events France** `https://dev.events/EU/FR` (32) and `https://dev.events/meetups/EU/FR/Paris/datascience` (9) — VERIFIED JSON-LD; also global RSS `https://dev.events/rss.xml` (VERIFIED, 9 French items). Tier 2 (conferences: Compute! Paris, Cloud Native AI Summit, Data AI Sovereignty Summit, DevFest).

### A6. Public and institutional feeds

- **OpenAgenda via Opendatasoft** `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records` — VERIFIED, keyless JSON, full-text `search(title_fr,"...")`, date filters, `timings` field with exact occurrences. 129 AI-keyword events in the window, almost all public-sector (médiathèques, Cité des sciences, universities, Fête de la science). Tier 2, `noisy`. The only way to catch library and museum AI workshops across the country.
- **Hi! PARIS** ICS `https://hi-paris.fr/events/?ical=1` (VERIFIED, 8) and RSS `https://hi-paris.fr/event/feed/` (VERIFIED, 8). Tier 1, `curated`.
- **numerique.gouv.fr (DINUM)** ICS `https://www.numerique.gouv.fr/agenda/ical/` — VERIFIED, 4 events (Adopt AI hackathon, TNT tour). Tier 2.
- **AFIA** ICS `https://afia.asso.fr/?plugin=all-in-one-event-calendar&controller=ai1ec_exporter_controller&action=export_events&no_html=true` — VERIFIED, 15 VEVENT. Tier 1, `curated`.
- **aieventlist.ai** Paris ICS `https://aieventlist.ai/cities/paris/events.ics` (VERIFIED, 5; German text) and Europe RSS `https://aieventlist.ai/feed.xml` (VERIFIED, 12 French of 171). Other French city ICS are 404. Tier 3.
- **agentconfs.com** `https://agentconfs.com/feeds/all.ics` — VERIFIED, 18 French events/year, tier 3. **confs.tech** JSON on GitHub, 3 French entries (VivaTech, dotAI, Build It Summit), tier 3. **hackevents.net** `country=fr` returns an empty calendar (DISABLED).
- Feeds that are **news only, not events**: Hub France IA RSS, ANITI RSS (`https://aniti.univ-toulouse.fr/feed/`), Université Paris-Saclay RSS, Sorbonne RSS, CNRS RSS, Systematic RSS, ActuIA RSS (all VERIFIED as RSS, useful as `lead` for announcements only).

---

## B. SCRAPE sources (HTML, rotate weekly)

### B1. Aggregators

- **allai.events** `https://allai.events/events/france` (+ `/page-2`) and city pages `/events/{paris,lyon,toulouse,nice,marseille,cannes,bordeaux,nantes,strasbourg,rennes}` — VERIFIED, about 89 events. `lille` and `grenoble` are 404. `?page=2` is ignored; use `/page-2`. Tier 2 (+14).
- **ActuIA** `https://www.actuia.com/en/type/event/` — news-style articles, not a calendar. Tier 3.
- **France tech conference map** `https://a-la-french.github.io/carte-conftech-france/` — community map, tier 3, inspect its data source.

### B2. AI institutes, universities, grandes écoles

- **PR[AI]RIE-PSAI** `https://prairie-psai.fr/events/` (VERIFIED HTML; `prairie-institute.fr` is 403). **Hi! PARIS** via ICS above. **DATAIA** `https://www.dataia.eu/` (home only). **MIAI Grenoble** `https://miai.univ-grenoble-alpes.fr/` (no events URL found). **ANITI Toulouse** `https://aniti.univ-toulouse.fr/` (events 404, news RSS only). **3IA Côte d'Azur** `https://3ia.univ-cotedazur.eu/events` (VERIFIED HTML).
- **Université Paris-Saclay** `https://www.universite-paris-saclay.fr/evenements` (HTML), **Sorbonne** `https://sorbonne-universite.fr/evenements` (HTML), **Télécom Paris** `https://www.telecom-paris.fr/fr/agenda` (1.4 MB HTML), **EPITA** `https://www.epita.fr/evenements/` (HTML), **CERIM Lille** `https://cerim.univ-lille.fr/seminaires-et-evenements`, **CNRS** `https://www.cnrs.fr/fr/agenda`. All VERIFIED HTML, no ICS; tier 3, `noisy`.
- **Inria**: captcha wall (`Vérification que vous n'êtes pas un robot`), DROPPED. **Polytechnique** `/fr/evenements` 403, `/agenda` 404; **ENS, PSL, CentraleSupélec, IP Paris**: tried paths 404 or TLS failure; find the right URL manually. Do not bypass.

### B3. Ecosystem and city hubs

- **Hub France IA** `https://www.hub-franceia.fr/evenements/` (VERIFIED HTML, list "day month, city / title", no year) plus its Luma calendar. Tier 1 for national conferences, Apéro de l'IA series in Paris, Nantes, Nice, Strasbourg, Toulouse.
- **STATION F** `https://stationf.co/events` (JS). **Systematic Paris-Region** `https://systematic-paris-region.org/evenements/`. **Bpifrance** `https://evenements.bpifrance.fr/`. All VERIFIED HTML, tier 3.
- **Conferences:** Big Data & AI Paris (`bigdataparis.com`, next date TBD, 15-16 Sep 2026 just happened), VivaTech 2027 (16-20 Jun 2027), dotAI (21 Oct 2027), RAISE Summit (6-7 Jul 2027, Paris), Compute! Paris (25-26 Nov 2026), GenerationAI / Build It Summit / apidays Paris (1-3 Dec 2026, CNIT La Défense), Adopt AI (3-4 Dec 2026), Data AI Sovereignty Summit (25 Feb 2027), Future Intelligence Toulouse (10 Dec 2026), Lyon Data Science Forum (5-6 Dec 2026), DevFest Paris / Aix / Nantes, Salon de la Data et de l'IA Nantes then Lyon (1 Apr 2027, per a search snippet, UNVERIFIED), Data Days Lille (26 Mar, HelloAsso page is 403).

### B4. Rotation

Daily: all feeds in A (Meetup ICS, Luma, Brainberg, ICS, OpenAgenda, JSON-LD pages; Eventbrite split across the day). Mon: B1. Tue/Wed: B2. Thu: B3. Weekends: feeds only.

---

## C. Not usable (DROPPED or blocked)

HelloAsso (403), Inria (captcha), CCI Paris (403), CCI Lyon (403), Polytechnique `/evenements` (403), prairie-institute.fr (403), `lafrenchtech.com`, `datadays.fr`, `lyondatascience.fr`, `konfy.fr`, `events-ia.fr`, `ai-events.fr`, `toulouse-tech.fr`, `ailys.fr` (TLS or DNS failure from the test machine, retest from the build box), Luma `discover/<french city>` other than Paris (404), `hackevents.net country=fr` (empty), aieventlist French city ICS other than Paris (404), BilletWeb search (404), Weezevent search (200 HTML but no JSON-LD), Meetup `find` search URLs (no JSON-LD returned), data.gouv.fr events (404), Cap Digital, Numeum (404 on guessed paths), Agenda du Libre ICS (empty) and JSON (1.9 MB, mostly free-software events, not AI).

## D. Coverage reality check

See `COMPETITORS.fr.md`. In one line: 358-event sample, before 32%, after 100% sample-relative (circular), estimated true coverage about 55 to 75%; weakest cities Nantes, Grenoble, Montpellier, Nice, Strasbourg.

## E. Source count by tier (in `sources.fr.json`: 127 entries)

- Tier 1: Meetup ICS groups (55, tier 1 when acceptAll), Luma Paris + 20 Luma calendars, Eventbrite (14 city entries), Brainberg, Brief IA, Hi! PARIS, AFIA, Hub France IA, OpenAgenda (tier 2 for volume, tier 1 for "Other France").
- Tier 2: allai.events, Meetup city pages (discovery), Toulouse Tech Hub, AI Tinkerers Paris, numerique.gouv, dev.events, PRAIRIE, 3IA, Paris-Saclay, Sorbonne, CNRS.
- Tier 3: aieventlist, agentconfs, confs.tech, createwith, ActuIA, MIAI/ANITI/DATAIA home pages, EPITA, Télécom Paris, STATION F, Systematic, Bpifrance, CERIM, conference map.

## F. New fetcher types needed (not in the German repo)

`jsonld` (fetch an HTML page and read schema.org `Event` blocks; covers Brief IA, Meetup city pages, Toulouse Tech Hub, AI Tinkerers, dev.events lists, Create With), `luma-calendar` (calendar id → `calendar/get-items`), `openagenda` (Opendatasoft query + `timings` expansion). Everything else reuses existing types (`meetup`, `luma`, `eventbrite`, `brainberg`, `ics`, `rss`, `scrape`).

Also: city names should be normalised to the French set (Paris incl. Ile-de-France and Saclay, Lyon, Toulouse, Marseille/Aix, Nantes, Bordeaux, Lille, Grenoble, Sophia/Nice, Rennes, Strasbourg, Montpellier, Online, Other France); `tools/build_sample.py` has a working regex map to start from.
