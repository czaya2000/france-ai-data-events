import './env.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fetchSource as fetchEb, resetEventbriteBlock, SourceBlocked, EVENTBRITE_MAX_REQUESTS } from '../sources/eventbrite.mjs';
import { fetchSource as fetchJsonLd } from '../sources/jsonld.mjs';
import { fetchSource as fetchLumaCal, resolveCalendarId } from '../sources/luma-calendar.mjs';
import { fetchSource as fetchOa } from '../sources/openagenda.mjs';
import { runFeedSource } from '../sources/index.mjs';
import {
	CAPS, lumaSlugsIn, lumaSourcesFrom, newLumaSlugs, newMeetupGroups, pollableGroups, resolveLumaSlugs, testMeetupGroups,
} from '../lib/discovery.mjs';
import { fixture, src, cand } from './helpers.mjs';

const ICS_OK = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nEND:VCALENDAR\r\n';
const res = (body, status = 200, headers = {}) => new Response(body, { status, headers });

// ---------- Eventbrite: slow, cached, budgeted, never bypassing a block ----------
test('eventbrite: a 429 disables the source for the rest of the run (SourceBlocked), no retry, later sources do not even call out', async () => {
	process.env.PIPELINE_MIN_GAP_MS = '0';
	resetEventbriteBlock();
	let calls = 0;
	const fetchImpl = async () => { calls++; return res('slow down', 429, { 'retry-after': '120' }); };
	const s = src({ id: 'eventbrite-paris', type: 'eventbrite', citySlug: 'france--paris', keywords: ['data', 'ia'], maxPages: 2 });
	await assert.rejects(() => fetchEb(s, { fetchImpl }), (e) => e instanceof SourceBlocked && e.blocked && /429/.test(e.message));
	assert.equal(calls, 1);
	await assert.rejects(() => fetchEb({ ...s, id: 'eventbrite-lyon', citySlug: 'france--lyon' }, { fetchImpl }), SourceBlocked);
	assert.equal(calls, 1, 'no request after the block');
	resetEventbriteBlock();
});

test('eventbrite: 405 and 403 are blocks too; an honest identifying User-Agent is sent; URLs are eventbrite.fr', async () => {
	resetEventbriteBlock();
	const seen = [];
	const fetchImpl = async (url, init) => { seen.push([url, init.headers['User-Agent']]); return res('no', 405); };
	await assert.rejects(() => fetchEb(src({ type: 'eventbrite', citySlug: 'france--nice', keywords: ['data'] }), { fetchImpl }), SourceBlocked);
	assert.match(seen[0][0], /^https:\/\/www\.eventbrite\.fr\/d\/france--nice\/data\/\?page=1$/);
	assert.match(seen[0][1], /^france-ai-data-events\/\d.* \(event-aggregator; \+https:\/\/github\.com\//);
	assert.doesNotMatch(seen[0][1], /Mozilla|Chrome/);
	resetEventbriteBlock();
});

test('eventbrite: pages are cached on disk, a second run makes no request', async () => {
	resetEventbriteBlock();
	const cacheDir = mkdtempSync(join(tmpdir(), 'eb-'));
	let calls = 0;
	const fetchImpl = async () => { calls++; return res(fixture('eventbrite.html')); };
	const s = src({ id: 'eventbrite-lyon', type: 'eventbrite', citySlug: 'france--lyon', keywords: ['data'], maxPages: 1, cityHint: 'Lyon' });
	const a = await fetchEb(s, { fetchImpl, cacheDir });
	assert.equal(a.length, 8);
	assert.equal(calls, 1);
	assert.ok(readdirSync(cacheDir).some((f) => f.startsWith('eb-')));
	const b = await fetchEb(s, { fetchImpl, cacheDir });
	assert.equal(b.length, 8);
	assert.equal(calls, 1, 'served from cache');
	resetEventbriteBlock();
});

test('eventbrite: a per-run request budget stops the crawl as "disabled", not as an error', async () => {
	resetEventbriteBlock();
	let calls = 0;
	const fetchImpl = async () => { calls++; return res(fixture('eventbrite.html').replace('2003375740770', String(2000000000000 + calls))); };
	const keywords = Array.from({ length: EVENTBRITE_MAX_REQUESTS + 5 }, (_, i) => 'k' + i);
	await assert.rejects(() => fetchEb(src({ type: 'eventbrite', citySlug: 'france--paris', keywords, maxPages: 1 }), { fetchImpl }), (e) => e.blocked && /budget/.test(e.message));
	assert.equal(calls, EVENTBRITE_MAX_REQUESTS);
	resetEventbriteBlock();
});

// ---------- jsonld / luma-calendar / openagenda fetchers over a fake network ----------
test('jsonld fetcher: reads the page, expands {city} templates, tolerates one failing city page', async () => {
	const urls = [];
	const fetchImpl = async (url) => { urls.push(String(url)); return String(url).includes('/lyon/') ? res('x', 500) : res(fixture('jsonld-meetup-city.html')); };
	const s = src({ id: 'meetup-city-pages', type: 'jsonld', url: 'https://www.meetup.com/fr-FR/cities/fr/{city}/events/', cities: ['paris', 'lyon'] });
	const raw = await fetchJsonLd(s, { fetchImpl, gapMs: 0 });
	assert.equal(raw.length, 6);
	assert.ok(raw.every((e) => e._cityHint === 'Paris'));
	await assert.rejects(() => fetchJsonLd({ ...s, cities: ['lyon'] }, { fetchImpl, gapMs: 0 }));
});

test('jsonld via runFeedSource: Brief IA page gives candidates with no descriptions', async () => {
	const fetchImpl = async () => res(fixture('briefia.html'));
	const out = await runFeedSource(src({ id: 'briefia-meetups', type: 'jsonld', url: 'https://www.briefia.fr/meetups', trust: 'curated' }), { fetchImpl, gapMs: 0 });
	assert.equal(out.rawCount, 12);
	assert.equal(out.candidates.length, 12);
	assert.ok(out.candidates.every((c) => c.desc === ''));
});

test('luma-calendar: pages with the cursor, uses the configured calendar id, no page fetch needed', async () => {
	const calls = [];
	const entries = JSON.parse(fixture('luma-calendar.json')).entries;
	const fetchImpl = async (url) => {
		calls.push(String(url));
		const u = new URL(url);
		if (!u.searchParams.get('pagination_cursor')) return res(JSON.stringify({ entries: entries.slice(0, 3), has_more: true, next_cursor: 'abc' }));
		return res(JSON.stringify({ entries: entries.slice(3), has_more: false }));
	};
	const raw = await fetchLumaCal(src({ type: 'luma-calendar', calendarId: 'cal-5HpS5DjhfyP4hWY' }), { fetchImpl, gapMs: 0 });
	assert.equal(raw.length, entries.length);
	assert.equal(calls.length, 2);
	assert.match(calls[0], /api\.lu\.ma\/calendar\/get-items\?calendar_api_id=cal-5HpS5DjhfyP4hWY&period=future/);
	assert.match(calls[1], /pagination_cursor=abc/);
});

test('luma-calendar: without a calendar id it is resolved from the calendar page; a bad page is an error', async () => {
	const fetchImpl = async () => res(fixture('luma-event-page.html'));
	assert.equal(await resolveCalendarId(src({ type: 'luma-calendar', calendarSlug: 'datacraft', url: 'https://luma.com/datacraft' }), { fetchImpl, gapMs: 0 }), 'cal-5HpS5DjhfyP4hWY');
	await assert.rejects(() => resolveCalendarId(src({ type: 'luma-calendar', calendarSlug: 'nope' }), { fetchImpl: async () => res('<html></html>'), gapMs: 0 }), /no calendar id/);
});

test('openagenda: pages by 100 until a short page, one request per term with --limit, de-duplicated by uid', async () => {
	const j = JSON.parse(fixture('openagenda.json'));
	const full = Array.from({ length: 100 }, (_, i) => ({ ...j.results[0], uid: 'u' + i }));
	let calls = 0;
	const fetchImpl = async (url) => {
		calls++;
		const off = Number(new URL(url).searchParams.get('offset'));
		return res(JSON.stringify({ total_count: 130, results: off === 0 ? full : full.slice(0, 30).map((r, i) => ({ ...r, uid: 'v' + i })) }));
	};
	const s = src({ type: 'openagenda', url: 'https://public.opendatasoft.com/x/records', terms: ['intelligence artificielle'] });
	const raw = await fetchOa(s, { fetchImpl, today: '2026-11-21', windowDays: 120, gapMs: 0 });
	assert.equal(raw.length, 130);
	assert.equal(calls, 2);
	calls = 0;
	await fetchOa(s, { fetchImpl, today: '2026-11-21', windowDays: 120, gapMs: 0, limit: 5 });
	assert.equal(calls, 1);
	await assert.rejects(() => fetchOa(s, { fetchImpl: async () => res('{"error":1}'), today: '2026-11-21', gapMs: 0 }), /unexpected OpenAgenda/);
});

// ---------- self-expanding discovery with caps ----------
const withLinks = (id, ...urls) => ({ src: { id }, candidates: urls.map((u, i) => cand({ title: 'E' + i, url: u, extraUrls: [] })) });

test('discovery: Meetup groups found in any source are new once; configured and tested ones are skipped', () => {
	const results = [
		withLinks('brainberg', 'https://www.meetup.com/paris-ai/events/1/', 'https://www.meetup.com/lyon-ia/events/2/', 'https://www.meetup.com/paris-ai/events/3/'),
		{ src: { id: 'briefia' }, candidates: [{ ...cand({ url: 'https://www.briefia.fr/x' }), meetupGroups: ['ia-nantes'] }] },
	];
	const found = newMeetupGroups(results, new Set(['lyon-ia']), { 'ia-nantes': { icsOk: false } });
	assert.deepEqual([...found.keys()], ['paris-ai']);
	assert.equal(found.get('paris-ai'), 'brainberg');
});

test('discovery: each run tests at most `cap` new groups, records ICS ok/not ok, parses the calendar for the same-run fetch', async () => {
	const found = new Map(Array.from({ length: 20 }, (_, i) => ['g' + i, 'brainberg']));
	const groups = {};
	const fetchImpl = async (url) => (String(url).includes('/g3/') ? res('nope', 404) : res(ICS_OK, 200, { 'content-type': 'text/calendar' }));
	const out = await testMeetupGroups(found, groups, { ctx: { fetchImpl, gapMs: 0 }, today: '2026-11-21', cap: CAPS.meetupNewPerRun });
	assert.equal(out.length, 15);
	assert.equal(Object.keys(groups).length, 15);
	assert.equal(groups.g3.icsOk, false);
	assert.equal(groups.g0.icsOk, true);
	assert.deepEqual(groups.g0, { firstSeen: '2026-11-21', via: 'brainberg', trust: 'noisy', icsOk: true, checked: '2026-11-21' });
	assert.ok(out[0].parsed);
	assert.equal(out[3].parsed, null);
});

test('discovery: at most 60 discovered Meetup groups are polled, newest first; configured ones never twice', () => {
	const groups = {};
	for (let i = 0; i < 80; i++) groups['g' + i] = { icsOk: true, firstSeen: `2026-10-${String(1 + (i % 28)).padStart(2, '0')}` };
	groups.dead = { icsOk: false, firstSeen: '2026-11-20' };
	const polled = pollableGroups(groups, new Set(['g1']));
	assert.equal(polled.length, CAPS.meetupPolledTotal);
	assert.ok(!polled.includes('dead') && !polled.includes('g1'));
	assert.equal(CAPS.meetupPolledTotal, 60);
});

test('discovery: Luma slugs are read from urls and text, system words are ignored', () => {
	assert.deepEqual([...lumaSlugsIn('https://luma.com/7uxu3rd5', 'see lu.ma/datacraft-uy31 and https://luma.com/discover', 'https://lu.ma/calendar/x')].sort(), ['7uxu3rd5', 'datacraft-uy31']);
	const found = newLumaSlugs([withLinks('brainberg', 'https://luma.com/abcdef1', 'https://luma.com/known123')], { slugs: { known123: 'cal-X' } });
	assert.deepEqual([...found.keys()], ['abcdef1']);
});

test('discovery: Luma slugs resolve to calendars once, capped per run; foreign and unresolvable slugs are remembered, not polled', async () => {
	const pages = {
		'/slug-fr': fixture('luma-event-page.html'),
		'/slug-us': fixture('luma-event-page.html').replace('"country_code":"FR"', '"country_code":"US"').replace('cal-5HpS5DjhfyP4hWY', 'cal-US'),
		'/slug-bad': '<html></html>',
	};
	let calls = 0;
	const fetchImpl = async (url) => { calls++; const p = new URL(url).pathname; return pages[p] ? res(pages[p]) : res('x', 404); };
	const file = { calendars: {}, slugs: {} };
	const found = new Map([['slug-fr', 'brainberg'], ['slug-us', 'briefia'], ['slug-bad', 'x'], ['slug-extra', 'x']]);
	const added = await resolveLumaSlugs(found, file, new Set(), { ctx: { fetchImpl, gapMs: 0 }, today: '2026-11-21', cap: 3 });
	assert.equal(calls, 3, 'cap of 3 resolutions');
	assert.deepEqual(added, ['cal-5HpS5DjhfyP4hWY']);
	assert.deepEqual(file.slugs, { 'slug-fr': 'cal-5HpS5DjhfyP4hWY', 'slug-us': 'cal-US', 'slug-bad': null });
	assert.deepEqual(Object.keys(file.calendars), ['cal-5HpS5DjhfyP4hWY']);
	assert.equal(file.calendars['cal-5HpS5DjhfyP4hWY'].trust, 'noisy');
	const s = lumaSourcesFrom(file, new Set());
	assert.equal(s.length, 1);
	assert.deepEqual([s[0].type, s[0].trust, s[0].onlineOk, s[0].discovered], ['luma-calendar', 'noisy', false, true]);
	assert.equal(lumaSourcesFrom(file, new Set(['cal-5HpS5DjhfyP4hWY'])).length, 0, 'configured calendars are not polled twice');
	// polled total is capped at 40
	const many = { calendars: Object.fromEntries(Array.from({ length: 60 }, (_, i) => ['cal-' + i, { slug: 's' + i, firstSeen: '2026-11-01' }])), slugs: {} };
	assert.equal(lumaSourcesFrom(many, new Set()).length, CAPS.lumaPolledTotal);
});

test('discovery: only groups and calendars seen on on-topic listings are followed (no salsa, no cooking)', () => {
	const results = [{
		src: { id: 'brainberg' },
		candidates: [
			cand({ title: 'Soirée salsa', url: 'https://www.meetup.com/salsa-paris/events/1/' }),
			cand({ title: 'MLOps Paris #4', url: 'https://www.meetup.com/mlops-paris/events/2/' }),
			cand({ title: 'Atelier cuisine', url: 'https://luma.com/cook1234' }),
			cand({ title: 'Data meetup', url: 'https://luma.com/data1234' }),
		],
	}];
	const onTopic = (c) => /mlops|data/i.test(c.title);
	assert.deepEqual([...newMeetupGroups(results, new Set(), {}, onTopic).keys()], ['mlops-paris']);
	assert.deepEqual([...newLumaSlugs(results, { slugs: {} }, onTopic).keys()], ['data1234']);
});
