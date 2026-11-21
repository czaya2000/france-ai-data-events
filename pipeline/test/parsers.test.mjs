import test from 'node:test';
import assert from 'node:assert/strict';
import { parseIcs } from '../lib/ical.mjs';
import { parseRss, parseAtom } from '../lib/feeds.mjs';
import { extractJsonLdEvents } from '../lib/jsonld.mjs';
import { dropReason, loadKeywords } from '../lib/filter.mjs';
import { normalise as normIcs } from '../sources/ics.mjs';
import { normalise as normBrainberg } from '../sources/brainberg.mjs';
import { normalise as normLuma } from '../sources/luma.mjs';
import { normalise as normLumaCal, parseLumaPage } from '../sources/luma-calendar.mjs';
import { normalise as normEb, parseEventbrite } from '../sources/eventbrite.mjs';
import { normalise as normRss } from '../sources/rss.mjs';
import { normalise as normAtom } from '../sources/atom.mjs';
import { normalise as normDev } from '../sources/devevents.mjs';
import { normalise as normConfs } from '../sources/confstech.mjs';
import { normalise as normJsonLd, pageUrls } from '../sources/jsonld.mjs';
import { buildWhere, nextOccurrence, normalise as normOa } from '../sources/openagenda.mjs';
import { groupsIn } from '../sources/meetup.mjs';
import { reduceHtml, robotsAllows } from '../sources/scrape.mjs';
import { fixture, src } from './helpers.mjs';

const ics = (name, s) => normIcs(parseIcs(fixture(name)), s);
const kw = loadKeywords();

test('Meetup ICS: group name as organiser, Paris wall time, canonical meetup URL', () => {
	const out = ics('meetup-ics.ics', src({ id: 'meetup:pydata-paris', type: 'meetup', cityHint: 'Paris' }));
	assert.equal(out.length, 1);
	const c = out[0];
	assert.equal(c.title, 'Compute! Paris 2026');
	assert.equal(c.organiser, 'Compute! Paris');
	assert.equal(c.start, '2026-11-25');
	assert.equal(c.end, '2026-11-26');
	assert.equal(c.time, '08:30');
	assert.equal(c.city, 'Paris');
	assert.match(c.url, /^https:\/\/www\.meetup\.com\/compute-paris\/events\/\d+/);
	assert.ok(c.keys[0].startsWith('u:meetup.com/compute-paris/events/'));
});

test('Meetup ICS (Bordeaux group): organiser from the calendar name, city hint for physical events', () => {
	const out = ics('meetup-ics2.ics', src({ id: 'meetup:le-wagon-bordeaux', type: 'meetup', cityHint: 'Bordeaux' }));
	assert.ok(out.length >= 3);
	assert.match(out[0].organiser, /^Le Wagon Bordeaux/);
	assert.equal(out[0].start, '2026-11-24');
	assert.equal(out[0].time, '18:30–22:00');
	assert.ok(out.every((c) => /^\d{4}-\d{2}-\d{2}$/.test(c.start)));
});

test('hackevents ICS: an empty calendar is not an error (France returns 0 events today)', () => {
	assert.deepEqual(ics('hackevents-ai.ics', src({ id: 'hackevents-fr', type: 'hackevents', role: 'lead' })), []);
});

test('aieventlist Paris ICS: La Défense and Paris both land in the Paris hub', () => {
	const out = ics('aieventlist-paris.ics', src({ id: 'aieventlist-paris', cityHint: 'Paris' }));
	assert.ok(out.length >= 5);
	assert.ok(out.some((c) => c.city === 'La Défense'));
	assert.ok(out.every((c) => c.country === 'FR'));
});

test('agentconfs ICS: French events are recognised by LOCATION, others keep another country code', () => {
	const out = ics('agentconfs.ics', src({ id: 'agentconfs', country: undefined, trust: 'curated' }));
	const fr = out.filter((c) => c.country === 'FR');
	assert.ok(fr.length >= 5);
	assert.ok(out.some((c) => c.country === 'XX'));
	assert.ok(fr.every((c) => c.city));
});

test('Hi! PARIS ICS: times converted to Paris, "Online" location gives Online (FR)', () => {
	const out = ics('hi-paris.ics', src({ id: 'hi-paris-ics', cityHint: 'Paris', trust: 'curated' }));
	assert.ok(out.length >= 6);
	assert.ok(out.some((c) => c.city === 'Online (FR)' && c.online));
	const sem = out.find((c) => /^Seminar: Terrestrial/.test(c.title));
	assert.equal(sem.start, '2026-11-23');
	assert.equal(sem.time, '11:30–13:00');
});

test('AFIA and numerique.gouv.fr ICS carry no per-event URL: candidates stay empty-url (deferred later, never invented)', () => {
	const afia = ics('afia.ics', src({ id: 'afia', cityHint: 'Paris', trust: 'curated' }));
	assert.ok(afia.length > 0);
	const num = ics('numerique-gouv.ics', src({ id: 'numerique-gouv' }));
	assert.ok(num.some((c) => c.city === 'Aix-en-Provence'));
	assert.ok([...afia, ...num].every((c) => c.url === ''));
});

test('Brainberg JSON: UTC to Paris, registration/meetup URL preferred, group slug for discovery', () => {
	const j = JSON.parse(fixture('brainberg.json'));
	const out = j.events.map((e) => normBrainberg(e, src({ id: 'brainberg', type: 'brainberg', role: 'lead' }))).filter(Boolean);
	assert.equal(out.length, 10);
	assert.ok(out.every((c) => c.country === 'FR'));
	const first = out[0];
	assert.equal(first.title, 'First batch');
	assert.equal(first.start, '2026-11-21');
	assert.equal(first.time, '16:00'); // 15:00Z in CET
	assert.equal(first.city, 'Nice');
	assert.equal(first.key, 'u:meetup.com/nice-natural-language-processing-meetup-group/events/317449936');
	assert.deepEqual(first.meetupGroups, ['nice-natural-language-processing-meetup-group']);
	assert.ok(out.some((c) => c.city === 'Aix-en-Provence'));
});

test('Luma discover JSON (Paris): UTC to Paris, short slug becomes a luma.com URL', () => {
	const j = JSON.parse(fixture('luma-paris.json'));
	const out = j.entries.map((e) => normLuma(e, src({ id: 'luma-paris', type: 'luma', cityHint: 'Paris', country: undefined }))).filter(Boolean);
	assert.equal(out.length, 8);
	const e = out.find((c) => /ConUt/.test(c.title));
	assert.equal(e.start, '2026-11-21');
	assert.equal(e.time, '16:00–18:30');
	assert.equal(e.url, 'https://luma.com/reppeu2t');
	assert.equal(e.key, 'u:luma.com/reppeu2t');
	assert.equal(e.country, 'FR');
});

test('luma-calendar: same entry shape; foreign physical events carry their own country, online ones are flagged', () => {
	const j = JSON.parse(fixture('luma-calendar.json'));
	const out = j.entries.map((e) => normLumaCal(e, src({ id: 'luma-cal:datacraft', type: 'luma-calendar', trust: 'curated', country: undefined, cityHint: 'Paris' }))).filter(Boolean);
	assert.equal(out.length, 7);
	const first = out[0];
	assert.equal(first.title, "Meetup Agents IA — Choix d'architecture et retours de prod entre pairs");
	assert.equal(first.start, '2026-11-26');
	assert.equal(first.time, '18:30–20:30'); // 17:30Z in CET
	assert.equal(first.organiser, 'datacraft');
	assert.equal(first.country, 'FR');
	assert.equal(first.city, 'Paris');
	const us = out.find((c) => /Austin/.test(c.title));
	assert.equal(us.country, 'US');
	assert.equal(dropReason(us, { today: '2026-11-21', windowDays: 120, kw }), 'country');
	const web = out.find((c) => /Data Quality/.test(c.title));
	assert.equal(web.online, true);
	assert.equal(web.city, 'Online (FR)');
});

test('luma-calendar: the calendar id is read from an event or calendar page (__NEXT_DATA__)', () => {
	const p = parseLumaPage(fixture('luma-event-page.html'));
	assert.deepEqual(p, { kind: 'event', calendarId: 'cal-5HpS5DjhfyP4hWY', name: 'datacraft', slug: 'datacraft', city: 'Paris', country: 'FR' });
	assert.equal(parseLumaPage('<html>nothing</html>'), null);
});

test('Eventbrite JSON-LD: ItemList of Event, eventbrite.fr and .co.uk both give one numeric key', () => {
	const evs = parseEventbrite(fixture('eventbrite.html'));
	assert.equal(evs.length, 8);
	const out = evs.map((e) => normEb(e, src({ id: 'eventbrite-lyon', type: 'eventbrite', cityHint: 'Lyon' }))).filter(Boolean);
	assert.equal(out[0].title, "Demo Day promo 4 Le Bahut : l'IA au service des métiers");
	assert.equal(out[0].start, '2027-03-18');
	assert.equal(out[0].city, 'Lyon');
	assert.equal(out[0].country, 'FR');
	assert.match(out[0].key, /^u:eventbrite\/\d+$/);
	const m = out.find((c) => /Mindstone/.test(c.title));
	assert.equal(m.key, 'u:eventbrite/2003375740770');
});

test('aieventlist RSS (German text): French places only, non-French items keep no country', () => {
	const items = parseRss(fixture('aieventlist.xml'));
	const out = items.map((i) => normRss(i, src({ id: 'aieventlist-europe', type: 'rss', dateMode: 'text', trust: 'curated', country: undefined }))).filter(Boolean);
	const b = out.find((c) => /Build It Summit/.test(c.title));
	assert.equal(b.start, '2026-12-01');
	assert.equal(b.end, '2026-12-03');
	assert.equal(b.title, 'Build It Summit 2026');
	assert.equal(b.country, 'FR');
	const ams = out.find((c) => /Amsterdam/.test(c.title));
	assert.equal(ams.country, null);
});

test('RSS dateMode pubdate and slug-date still work (generic feeds)', () => {
	const xml = '<rss><channel><item><title>Soirée données</title><link>https://example.fr/2026-12-04-soiree</link><pubDate>Fri, 04 Dec 2026 00:00:00 +0100</pubDate><description>Lieu : Lyon</description></item></channel></rss>';
	const [it] = parseRss(xml);
	assert.equal(normRss(it, src({ type: 'rss', dateMode: 'slug-date' })).start, '2026-12-04');
	assert.equal(normRss(it, src({ type: 'rss', dateMode: 'pubdate' })).start, '2026-12-04');
	assert.equal(normRss(it, src({ type: 'rss', dateMode: 'pubdate' })).city, 'Lyon');
});

test('Atom: dated entries only, date from the URL', () => {
	const xml = '<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Atelier IA</title><link href="https://example.fr/2026/12/09/atelier/"/><summary>Texte</summary></entry><entry><title>News</title><link href="https://example.fr/news/"/></entry></feed>';
	const entries = parseAtom(xml);
	assert.equal(entries.length, 2);
	assert.equal(normAtom(entries[0], src({ type: 'atom', cityHint: 'Lyon' })).start, '2026-12-09');
	assert.equal(normAtom(entries[1], src({ type: 'atom' })), null);
});

test('dev.events RSS: date and place from the description, non-French ignored', () => {
	const items = parseRss(fixture('devevents.xml'));
	const out = items.map((i) => normDev(i, src({ id: 'devevents', type: 'devevents', country: undefined }))).filter(Boolean);
	assert.ok(out.length >= 3 && out.length < items.length + 1);
	assert.ok(out.every((c) => c.country === 'FR' || c.online));
	assert.ok(out.some((c) => c.title === 'RAISE Summit 2027' && c.city === 'Paris' && c.start === '2027-07-06'));
});

test('confs.tech JSON: France only', () => {
	const arr = JSON.parse(fixture('confstech.json'));
	const out = arr.map((c) => normConfs(c, src({ id: 'confstech', type: 'confstech', country: undefined }))).filter(Boolean);
	assert.ok(out.some((c) => c.title === 'dotAI' && c.country === 'FR' && c.city === 'Paris'));
	assert.equal(out.filter((c) => c.country === 'FR').length, 3);
});

// ---- the three new fetcher types ----
test('jsonld: Brief IA ItemList. Basic facts only (no description), UTC to Paris, midnight means no time, online without a place', () => {
	const evs = extractJsonLdEvents(fixture('briefia.html'));
	assert.equal(evs.length, 12);
	const out = evs.map((e) => normJsonLd(e, src({ id: 'briefia-meetups', type: 'jsonld', trust: 'curated', role: 'lead' }))).filter(Boolean);
	assert.equal(out.length, 12);
	assert.ok(out.every((c) => c.desc === ''), 'descriptions are never stored');
	const first = out[0];
	assert.equal(first.title, 'First batch');
	assert.equal(first.start, '2026-11-21');
	assert.equal(first.time, '16:00–18:00'); // 15:00Z-17:00Z in CET
	assert.equal(first.city, 'Nice');
	assert.equal(first.url, 'https://www.briefia.fr/meetups/first-batch-nice-2026-11-14');
	assert.deepEqual(first.meetupGroups, ['nice-natural-language-processing-meetup-group']);
	const web = out.find((c) => /^Webinaire/.test(c.title));
	assert.equal(web.online, true);
	assert.equal(web.city, 'Online (FR)');
	assert.equal(web.time, '18:30–19:30');
	assert.equal(out.find((c) => c.title === 'Facilitateur, formateur, coach : maîtrisez l\'IA générative').city, 'Paris');
	// organiser profile pages (eventbrite.fr/o/...) must never become an event URL
	assert.ok(out.every((c) => !c.extraUrls.some((u) => /eventbrite\.[a-z.]+\/o\//.test(u))));
});

test('jsonld: Meetup city page (array of Events), group slug is readable from the event url', () => {
	const evs = extractJsonLdEvents(fixture('jsonld-meetup-city.html'));
	assert.equal(evs.length, 6);
	const out = evs.map((e) => normJsonLd({ ...e, _cityHint: 'Paris' }, src({ id: 'meetup-city-pages', type: 'jsonld', role: 'lead' }))).filter(Boolean);
	const ai = out.find((c) => /AI Builders/.test(c.title));
	assert.equal(ai.key, 'u:meetup.com/ai-first/events/317091185');
	assert.equal(ai.city, 'Paris');
	assert.ok([...groupsIn(ai.url)].includes('ai-first'));
});

test('jsonld: {city} templates expand to the twelve Meetup city pages; --limit uses one', () => {
	const s = src({ id: 'meetup-city-pages', type: 'jsonld', url: 'https://www.meetup.com/fr-FR/cities/fr/{city}/events/' });
	const all = pageUrls(s, {});
	assert.equal(all.length, 12);
	assert.equal(all[0].url, 'https://www.meetup.com/fr-FR/cities/fr/paris/events/');
	assert.equal(all[1].cityHint, 'Lyon');
	assert.equal(pageUrls(s, { limit: 5 }).length, 1);
});

test('jsonld extraction handles @graph, nested items and ignores non-event blocks and broken JSON', () => {
	const html = `<script type="application/ld+json">{"@graph":[{"@type":"WebSite","name":"x"},{"@type":"EducationEvent","name":"A","startDate":"2026-12-01"}]}</script>
		<script type="application/ld+json">{not json</script>
		<script type="application/ld+json">[{"@type":"Event","name":"B","startDate":"2026-12-02"},{"@type":"Event","name":"B","startDate":"2026-12-02"}]</script>`;
	assert.deepEqual(extractJsonLdEvents(html).map((e) => e.name), ['A', 'B']);
});

test('openagenda: next occurrence from `timings`, FR only, online mode, free from conditions, one listing per record', () => {
	const j = JSON.parse(fixture('openagenda.json'));
	const out = j.results.map((r) => normOa(r, src({ id: 'openagenda', type: 'openagenda' }), { today: '2026-11-21' })).filter(Boolean);
	assert.equal(out.length, j.results.length);
	const zoom = out.find((c) => /Zoom sur/.test(c.title));
	assert.equal(zoom.start, '2026-11-28'); // the series started in 2024; the next session is the listing
	assert.equal(zoom.time, '15:00–15:30');
	assert.equal(zoom.city, 'Paris');
	assert.equal(zoom.cost, 'Free');
	assert.match(zoom.venue, /Cité des sciences/);
	assert.match(zoom.url, /^https:\/\/openagenda\.com\//);
	const online = out.find((c) => c.online);
	assert.equal(online.city, 'Online (FR)');
	// later "today": the series moves on
	const later = normOa(j.results.find((r) => /Zoom sur/.test(r.title_fr)), src({ type: 'openagenda' }), { today: '2026-11-29' });
	assert.equal(later, null);
	assert.equal(normOa({ ...j.results[0], location_countrycode: 'BE' }, src({ type: 'openagenda' }), { today: '2026-11-21' }), null);
});

test('openagenda: where clause uses the window and quotes safely', () => {
	const w = buildWhere('intelligence "artificielle"', '2026-11-21', 120);
	assert.ok(w.includes(`search(title_fr,"intelligence artificielle")`));
	assert.ok(w.includes(`lastdate_end>=date'2026-11-21'`));
	assert.ok(w.includes(`firstdate_begin<=date'2027-03-21'`));
	assert.equal(nextOccurrence({ timings: '[]' }, '2026-11-21'), null);
});

test('Meetup group discovery regex', () => {
	const g = groupsIn('https://www.meetup.com/Paris-AI/events/123456/', 'see meetup.com/foo_bar/events/9 and https://www.meetup.com/find/events/1');
	assert.deepEqual([...g].sort(), ['foo_bar', 'paris-ai']);
});

test('scrape: page reduced to text with links, scripts and nav removed; robots respected', () => {
	const { text, links } = reduceHtml(fixture('scrape.html'), 'https://www.hub-franceia.fr/evenements/');
	assert.ok(text.length > 200);
	assert.ok(!/<script|<style/i.test(text));
	assert.ok(links.length >= 3);
	assert.ok(links.every((l) => /^https?:/.test(l.url)));
	const robots = 'User-agent: *\nDisallow: /private/\nAllow: /private/ok\n';
	assert.equal(robotsAllows(robots, '/events'), true);
	assert.equal(robotsAllows(robots, '/private/x'), false);
	assert.equal(robotsAllows(robots, '/private/ok'), true);
	assert.equal(robotsAllows('User-agent: *\nDisallow: /\n', '/anything'), false);
});
