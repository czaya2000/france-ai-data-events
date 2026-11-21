import './env.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { utcToLocal, zonedToUtc, addDays, daysBetween, parseStamp } from '../lib/time.mjs';
import { parseIcs } from '../lib/ical.mjs';
import { canonicalUrl, ledgerKeys, parseDateText, costFromPrice } from '../lib/normalize.mjs';
import { canonicalCity, citiesCompatible, detectCity, hubLabel, hubSlug, resolveCity } from '../lib/city.mjs';
import { dropReason, loadKeywords } from '../lib/filter.mjs';
import { emptyLedger, lookup, matchesExisting, prune, record, touch, updateMissing, loadLedger, saveJson } from '../lib/ledger.mjs';
import { applyCap, candidateId, chunk, compactCandidate, MAX_INPUT_CHARS } from '../lib/work.mjs';
import { getText } from '../lib/cache.mjs';
import { prepare } from '../prepare.mjs';
import { resetEventbriteBlock } from '../sources/eventbrite.mjs';
import { cand } from './helpers.mjs';

const kw = loadKeywords();
const base = { today: '2026-11-20', windowDays: 120, kw };
const mk = (o) => {
	const c = cand(o);
	c.keys = ledgerKeys(c);
	c.key = c.keys[0];
	return c;
};

// ---- time ----
test('UTC to Europe/Paris around the spring DST switch (29 Mar 2026, 01:00 UTC)', () => {
	assert.deepEqual(utcToLocal(Date.parse('2026-03-29T00:30:00Z')), { date: '2026-03-29', time: '01:30' }); // CET
	assert.deepEqual(utcToLocal(Date.parse('2026-03-29T01:00:00Z')), { date: '2026-03-29', time: '03:00' }); // CEST: 02:00-03:00 does not exist
	assert.deepEqual(utcToLocal(Date.parse('2026-03-28T23:30:00Z')), { date: '2026-03-29', time: '00:30' });
});
test('UTC to Europe/Paris around the autumn DST switch (25 Oct 2026, 01:00 UTC)', () => {
	assert.deepEqual(utcToLocal(Date.parse('2026-10-25T00:30:00Z')), { date: '2026-10-25', time: '02:30' }); // CEST
	assert.deepEqual(utcToLocal(Date.parse('2026-10-25T01:30:00Z')), { date: '2026-10-25', time: '02:30' }); // CET, the hour repeats
	assert.deepEqual(utcToLocal(Date.parse('2026-10-24T22:30:00Z')), { date: '2026-10-25', time: '00:30' }); // date rolls over
});
test('UTC to Europe/Paris around the March 2027 DST switch (28 Mar, 01:00 UTC)', () => {
	assert.deepEqual(utcToLocal(Date.parse('2027-03-28T00:30:00Z')), { date: '2027-03-28', time: '01:30' });
	assert.deepEqual(utcToLocal(Date.parse('2027-03-28T01:30:00Z')), { date: '2027-03-28', time: '03:30' });
});
test('zonedToUtc handles other zones and DST', () => {
	assert.equal(new Date(zonedToUtc(2026, 11, 20, 18, 0, 'Europe/Paris')).toISOString(), '2026-11-20T17:00:00.000Z');
	assert.equal(new Date(zonedToUtc(2026, 7, 1, 18, 0, 'Europe/Paris')).toISOString(), '2026-07-01T16:00:00.000Z');
	assert.equal(new Date(zonedToUtc(2026, 11, 20, 12, 0, 'America/New_York')).toISOString(), '2026-11-20T17:00:00.000Z');
});
test('ICS: UTC times and floating TZID times are both converted to Paris', () => {
	const ics = [
		'BEGIN:VCALENDAR', 'VERSION:2.0',
		'BEGIN:VEVENT', 'UID:a', 'DTSTART:20261024T223000Z', 'DTEND:20261025T003000Z', 'SUMMARY:UTC event', 'END:VEVENT',
		'BEGIN:VEVENT', 'UID:b', 'DTSTART;TZID=Europe/London:20261120T170000', 'DTEND;TZID=Europe/London:20261120T180000', 'SUMMARY:London event', 'END:VEVENT',
		'END:VCALENDAR', '',
	].join('\r\n');
	const { events } = parseIcs(ics);
	assert.equal(events[0].start, '2026-10-25');
	assert.equal(events[0].time, '00:30–02:30'); // 22:30Z-00:30Z around the switch = 00:30-02:30 local
	assert.equal(events[1].time, '18:00–19:00'); // London 17:00 = Paris 18:00
});
test('parseStamp: schema.org stamps with offsets, naive local times and date-only values', () => {
	assert.deepEqual(parseStamp('2026-12-01'), { date: '2026-12-01', time: undefined, dateOnly: true });
	assert.deepEqual(parseStamp('2026-12-01T18:30:00'), { date: '2026-12-01', time: '18:30', dateOnly: false });
	assert.deepEqual(parseStamp('2026-11-26T17:30:00+00:00'), { date: '2026-11-26', time: '18:30', dateOnly: false });
	assert.deepEqual(parseStamp('2026-07-01T17:30:00+02:00'), { date: '2026-07-01', time: '17:30', dateOnly: false });
	assert.deepEqual(parseStamp('2026-11-25T00:00:00+00:00'), { date: '2026-11-25', time: undefined, dateOnly: true }); // feeds use 00:00Z for "no time"
	assert.deepEqual(parseStamp('2026-11-30T23:00:00+00:00'), { date: '2026-12-01', time: undefined, dateOnly: true }); // = 00:00 Paris
	assert.equal(parseStamp('next week'), null);
});
test('date helpers', () => {
	assert.equal(addDays('2026-11-30', 1), '2026-12-01');
	assert.equal(daysBetween('2026-11-20', '2027-03-20'), 120);
});

// ---- text ----
test('date text parsing: French, English and the German dates of one feed', () => {
	assert.deepEqual(parseDateText('Compute! Paris : du 25 au 26 novembre 2026'), { start: '2026-11-25', end: '2026-11-26' });
	assert.deepEqual(parseDateText('Salon Data & IA, 1er avril 2027, Nantes'), { start: '2027-04-01', end: '2027-04-01' });
	assert.deepEqual(parseDateText('Forum du 28 novembre au 2 décembre 2026'), { start: '2026-11-28', end: '2026-12-02' });
	assert.deepEqual(parseDateText('3-5 décembre 2026'), { start: '2026-12-03', end: '2026-12-05' });
	assert.deepEqual(parseDateText('Lancement le 5 janv. 2027'), { start: '2027-01-05', end: '2027-01-05' });
	assert.deepEqual(parseDateText('Le 12 août 2027'), { start: '2027-08-12', end: '2027-08-12' });
	assert.deepEqual(parseDateText('Termin 05.03.2027'), { start: '2027-03-05', end: '2027-03-05' });
	assert.deepEqual(parseDateText('rendez-vous le 12/12/2026'), { start: '2026-12-12', end: '2026-12-12' });
	assert.deepEqual(parseDateText('happening on December 10, 2026'), { start: '2026-12-10', end: '2026-12-10' });
	assert.deepEqual(parseDateText('Dec 10-11, 2026'), { start: '2026-12-10', end: '2026-12-11' });
	assert.deepEqual(parseDateText('Build It Summit (1.–3. Dezember 2026)'), { start: '2026-12-01', end: '2026-12-03' });
	assert.deepEqual(parseDateText('2026-11-20'), { start: '2026-11-20', end: '2026-11-20' });
	assert.equal(parseDateText('no date here'), null);
});
test('canonical URLs and ledger keys', () => {
	assert.equal(canonicalUrl('https://www.meetup.com/Paris-AI/events/317368516/?utm_source=x'), 'meetup.com/paris-ai/events/317368516');
	assert.equal(canonicalUrl('https://lu.ma/abc123?utm_medium=y'), 'luma.com/abc123');
	assert.equal(canonicalUrl('https://www.eventbrite.fr/e/ia-monday-tickets-2003969207846?aff=x'), 'eventbrite/2003969207846');
	assert.equal(canonicalUrl('https://Example.com/a/b/?utm_campaign=1&id=7#frag'), 'example.com/a/b?id=7');
	const keys = ledgerKeys({ url: 'https://example.com/x/', title: 'Soirée IA 2026 à Paris', start: '2026-12-01' });
	assert.deepEqual(keys, ['u:example.com/x', 't:ia|2026-12-01']);
});
test('cost formatting', () => {
	assert.equal(costFromPrice({ isFree: true }), 'Free');
	assert.equal(costFromPrice({ priceFrom: 49, currency: 'EUR' }), 'EUR 49');
	assert.equal(costFromPrice({ priceFrom: 199, priceTo: 499, currency: 'EUR' }), 'From EUR 199');
	assert.equal(costFromPrice({}), null);
});
test('city detection: French places, accent-insensitive, with hubs for the suburbs', () => {
	assert.equal(detectCity('Station F, 5 Parvis Alan Turing, 75013 Paris'), 'Paris');
	assert.equal(detectCity('Campus de Saclay, Palaiseau'), 'Saclay'); // first place named; both are in the Paris hub
	assert.equal(detectCity('École polytechnique, Palaiseau'), 'Palaiseau');
	assert.equal(detectCity('Cité internationale, LYON'), 'Lyon');
	assert.equal(detectCity('aix en provence'), 'Aix-en-Provence');
	assert.equal(detectCity('Marché de Lérins, Valbonne'), 'Valbonne');
	assert.equal(detectCity('Villeneuve d’Ascq'), "Villeneuve-d'Ascq");
	assert.equal(detectCity('Nice place to meet'), null); // ordinary English word, never found inside text
	assert.equal(detectCity('city tours of the old town'), null);
	assert.equal(detectCity('Saint-Sever-du-Moustier'), null); // unknown village
});
test('canonicalCity: postcode, district and online spellings', () => {
	assert.equal(canonicalCity('Paris 15e'), 'Paris');
	assert.equal(canonicalCity('75008 Paris'), 'Paris');
	assert.equal(canonicalCity('Lyon Cedex 03'), 'Lyon');
	assert.equal(canonicalCity('Aix'), 'Aix-en-Provence');
	assert.equal(canonicalCity('Nice'), 'Nice'); // a whole city field is trusted
	assert.equal(canonicalCity('En ligne'), 'Online (FR)');
	assert.equal(canonicalCity('Webinaire'), 'Online (FR)');
	assert.equal(canonicalCity('Visioconférence'), 'Online (FR)');
	assert.equal(canonicalCity('Saint-Sever-du-Moustier'), 'Saint-Sever-du-Moustier');
	assert.equal(canonicalCity(''), null);
});
test('hubs and compatibility', () => {
	assert.equal(hubSlug('Palaiseau'), 'paris');
	assert.equal(hubSlug('Saint-Denis'), 'paris');
	assert.equal(hubSlug('Villeurbanne'), 'lyon');
	assert.equal(hubSlug('Sophia-Antipolis'), 'nice-sophia');
	assert.equal(hubSlug('Aix-en-Provence'), 'marseille-aix');
	assert.equal(hubLabel('Dijon'), 'Other France');
	assert.equal(hubLabel('Saint-Sever-du-Moustier'), 'Other France');
	assert.equal(hubLabel('Online (FR)'), 'Online (FR)');
	assert.equal(citiesCompatible('Paris', 'Saclay'), true);
	assert.equal(citiesCompatible('Paris', 'Lyon'), false);
	assert.equal(citiesCompatible('Dijon', 'Tours'), false);
	assert.equal(citiesCompatible(null, 'Lyon'), true);
	assert.equal(citiesCompatible('Online (FR)', 'Lyon'), true);
});
test('resolveCity: venue then URL override a conflicting feed city, a bare city name does not', () => {
	assert.equal(resolveCity({ city: 'Paris', venue: '12 rue de la République, 69002 Lyon' }), 'Lyon');
	assert.equal(resolveCity({ city: 'Paris', venue: 'Paris, France' }), 'Paris');
	assert.equal(resolveCity({ city: 'Paris', url: 'https://toulouse-tech-hub.fr/evenements/x' }), 'Toulouse');
	assert.equal(resolveCity({ city: 'Online (FR)', venue: 'Lyon' }), 'Online (FR)');
});

// ---- filters ----
test('filter: country, online, window, cancelled, duration, keyword, exclude', () => {
	assert.equal(dropReason(mk({ title: 'AI Meetup' }), base), null);
	assert.equal(dropReason(mk({ country: 'DE' }), base), 'country');
	assert.equal(dropReason(mk({ country: null, online: true, onlineOk: true }), base), null);
	assert.equal(dropReason(mk({ country: null, online: true, onlineOk: false }), base), 'country');
	assert.equal(dropReason(mk({ start: '2026-11-01', end: '2026-11-05' }), base), 'window');
	assert.equal(dropReason(mk({ start: '2026-11-18', end: '2026-11-21' }), base), null); // still running
	assert.equal(dropReason(mk({ start: '2027-03-21', end: '2027-03-21' }), base), 'window'); // day 121
	assert.equal(dropReason(mk({ start: '2027-03-20', end: '2027-03-20' }), base), null); // day 120
	assert.equal(dropReason(mk({ title: 'Soirée IA (annulée)' }), base), 'cancelled');
	assert.equal(dropReason(mk({ title: 'Meetup Data reporté' }), base), 'cancelled');
	assert.equal(dropReason(mk({ title: 'AI Night postponed' }), base), 'cancelled');
	assert.equal(dropReason(mk({ title: 'Data report 2026 launch' }), base), null); // "report" alone is an English word, not "reporté"
	assert.equal(dropReason(mk({ cancelled: true }), base), 'cancelled');
	assert.equal(dropReason(mk({ start: '2026-12-01', end: '2027-02-20' }), base), 'long');
	assert.equal(dropReason(mk({ start: '2026-12-01', end: '2027-02-20', trust: 'curated' }), base), null);
	assert.equal(dropReason(mk({ title: 'Pottery evening', desc: 'clay' }), base), 'keyword');
	assert.equal(dropReason(mk({ title: 'Pottery evening', acceptAll: true }), base), null);
	assert.equal(dropReason(mk({ title: 'Speed dating for data people' }), base), 'excluded');
	for (const t of ['Databricks Summit', "L'IA en pratique", 'Intelligence artificielle : conférence', 'Apprentissage automatique pour tous', 'Power BI Usergroup', 'dbt meetup', 'Data Mesh Day', 'RAG workshop', 'Microsoft Fabric Hands-on', 'MLOps Paris', 'Agentic coding', 'Soirée données ouvertes', 'Gouvernance des données', 'Atelier ChatGPT pour les TPE', 'IA générative : retours de prod']) {
		assert.equal(dropReason(mk({ title: t }), base), null, t);
	}
	for (const t of ['Dégustation de vins', 'Salon de l’emploi', 'Soirée yoga du mardi', 'Brunch networking']) {
		assert.notEqual(dropReason(mk({ title: t, desc: 'données' }), base), null, t);
	}
	assert.equal(dropReason(mk({ title: 'Evening', desc: 'About data platforms' }), base), null);
	assert.equal(dropReason(mk({ title: 'Soirée', desc: 'Parlons des données de santé' }), base), null); // accented words in the description // description counts
});

// ---- ledger ----
test('ledger: known by URL key or by title+date key; rejected stays known', () => {
	const l = emptyLedger();
	const a = mk({ title: 'AI Night Paris', url: 'https://example.com/ai-night' });
	record(l, a, 'rejected', { today: '2026-11-20', reason: 'offtopic' });
	assert.equal(lookup(l, a).decision, 'rejected');
	const sameUrl = mk({ title: 'Renamed', url: 'https://example.com/ai-night/?utm_source=x' });
	assert.equal(lookup(l, sameUrl)?.decision, 'rejected');
	const sameTitle = mk({ title: 'AI Night', url: 'https://other.example/xyz' });
	assert.equal(lookup(l, sameTitle)?.decision, 'rejected');
	assert.equal(lookup(l, mk({ title: 'Other', url: 'https://example.com/other' })), null);
});
test('ledger: touch updates lastSeen and merges sources; prune drops entries 7 days after the end', () => {
	const l = emptyLedger();
	const a = mk({ end: '2026-12-01', start: '2026-12-01' });
	record(l, a, 'accepted', { today: '2026-11-20', eventId: 'ev1' });
	touch(lookup(l, a), { ...a, sourceId: 'other' }, '2026-11-25');
	assert.equal(lookup(l, a).lastSeen, '2026-11-25');
	assert.deepEqual(lookup(l, a).sources, ['t', 'other']);
	assert.equal(prune(l, '2026-12-08'), 0);
	assert.ok(Object.keys(l.entries).length > 0);
	assert.ok(prune(l, '2026-12-09') > 0);
	assert.equal(Object.keys(l.entries).length, 0);
});
test('ledger: vanished events removed only after two successful misses, never on a failed fetch, once per day', () => {
	const l = emptyLedger();
	const a = mk({ sourceId: 'hi-paris-ics', start: '2026-12-10', end: '2026-12-10', url: 'https://hi-paris.fr/event/x/' });
	record(l, a, 'accepted', { today: '2026-11-20', eventId: 'ev-hi' });
	const whole = new Set(['hi-paris-ics']);
	const run = (day, ok, seen) => updateMissing(l, { seen: new Map([['hi-paris-ics', new Set(seen)]]), okSources: new Set(ok ? ['hi-paris-ics'] : []), wholeCalendar: whole, today: day });
	assert.deepEqual(run('2026-11-21', false, []), []); // fetch failed: nothing counted
	l.lastMissingCheck = null;
	assert.deepEqual(run('2026-11-22', true, []), []); // first miss
	assert.deepEqual(run('2026-11-22', true, []), []); // same day again: not double counted
	assert.equal(lookup(l, a).missingDays, 1);
	assert.deepEqual(run('2026-11-23', true, []), ['ev-hi']); // second consecutive miss
	l.lastMissingCheck = null;
	lookup(l, a).missingDays = 1;
	assert.deepEqual(run('2026-11-24', true, [a.key]), []); // seen again: reset
	assert.equal(lookup(l, a).missingDays, 0);
});
test('known events: match against events.json by URL or fuzzy title+date', () => {
	const existing = [{ title: 'Compute! Paris 2026', date: '2026-11-25', city: 'Paris', url: 'https://compute.example.fr/paris/' }];
	assert.ok(matchesExisting(mk({ title: 'Something else', url: 'https://compute.example.fr/paris/?utm_source=x', start: '2026-11-25' }), existing));
	assert.ok(matchesExisting(mk({ title: 'Compute Paris 2026', url: 'https://brainberg.eu/x', start: '2026-11-25' }), existing));
	assert.equal(matchesExisting(mk({ title: 'PyData Lyon', url: 'https://x.example/p', start: '2026-12-03', city: 'Lyon' }), existing), null);
});

// ---- caps and hand-off ----
test('caps: soonest first, rest deferred; bootstrap chunks of 60', () => {
	const list = Array.from({ length: 150 }, (_, i) => mk({ title: `AI ${i}`, start: addDays('2026-12-01', 150 - i), end: addDays('2026-12-01', 150 - i), url: `https://example.com/${i}`, key: `u:${i}` }));
	const { send, deferred } = applyCap(list, 120);
	assert.equal(send.length, 120);
	assert.equal(deferred.length, 30);
	assert.ok(send.at(-1).start < deferred[0].start);
	const parts = chunk(send.map(compactCandidate));
	assert.deepEqual(parts.map((p) => p.length), [60, 60]);
	assert.equal(chunk(Array.from({ length: 61 }, (_, i) => i)).length, 2);
});
test('compact candidate: no URL field, desc capped at 500, total under the per-candidate cap', () => {
	const c = mk({ title: 'T'.repeat(150), desc: 'x'.repeat(600), organiser: 'O'.repeat(100), venue: 'V'.repeat(150), key: 'u:1' });
	const r = compactCandidate(c);
	assert.ok(!('url' in r));
	assert.ok(JSON.stringify(r).length <= MAX_INPUT_CHARS);
	assert.match(r.id, /^c_[0-9a-f]{10}$/);
	assert.equal(candidateId(c), r.id);
});

// ---- conditional GET ----
test('conditional GET: 304 reuses the cached body; no body file means no conditional headers', async () => {
	const dir = mkdtempSync(join(tmpdir(), 'cache-'));
	const calls = [];
	const fetchImpl = async (url, init) => {
		calls.push(init.headers);
		if (init.headers['If-None-Match']) return new Response(null, { status: 304 });
		return new Response('BODY', { status: 200, headers: { etag: '"v1"' } });
	};
	const ctx = { cacheDir: dir, etags: {}, fetchImpl };
	process.env.PIPELINE_MIN_GAP_MS = '0';
	const r1 = await getText('https://example.com/feed', ctx);
	assert.equal(r1.text, 'BODY');
	assert.equal(ctx.etags['https://example.com/feed'].etag, '"v1"');
	const r2 = await getText('https://example.com/feed', ctx);
	assert.equal(r2.fromCache, true);
	assert.equal(r2.text, 'BODY');
	const fresh = { cacheDir: mkdtempSync(join(tmpdir(), 'cache-')), etags: ctx.etags, fetchImpl };
	const r3 = await getText('https://example.com/feed', fresh);
	assert.equal(r3.fromCache, false);
	assert.equal(calls.at(-1)['If-None-Match'], undefined);
});

// ---- end to end with a fake network ----
test('prepare (offline): one failing source never fails the run; failure recorded; blocked source is disabled, not failed', async () => {
	const ics = readFileSync(new URL('../fixtures/hi-paris.ics', import.meta.url), 'utf8');
	const fetchImpl = async (url) => {
		if (String(url).includes('hi-paris.fr')) return new Response(ics, { status: 200, headers: { 'content-type': 'text/calendar' } });
		if (String(url).includes('eventbrite')) return new Response('slow down', { status: 429, headers: { 'retry-after': '120' } });
		return new Response('nope', { status: 404 });
	};
	process.env.PIPELINE_MIN_GAP_MS = '0';
	process.env.EVENTBRITE_GAP_MS = '0';
	resetEventbriteBlock();
	const res = await prepare({ dry: true, scrape: false, only: ['hi-paris-ics', 'afia', 'eventbrite-paris', 'eventbrite-lyon'], today: '2026-11-21', fetchImpl });
	assert.equal(res.report.feedDisabled, 2); // Eventbrite answered 429 once: both city sources disabled for the run
	assert.equal(res.report.feedTotal, 2);
	assert.equal(res.report.feedOk, 1);
	assert.ok(res.report.problems.some((p) => p.startsWith('afia: FAILED')));
	assert.ok(!res.report.problems.some((p) => p.startsWith('eventbrite')));
	assert.ok(res.report.sources.find((s) => s.id === 'hi-paris-ics').fetched > 0);
	assert.match(res.md, /Per city \(after dedupe\)/);
	assert.match(res.md, /disabled: .*429/);
	resetEventbriteBlock();
});
