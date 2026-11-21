// One-off helper: save truncated (<50 KB) real responses into pipeline/fixtures/ (France registry).
// Run it by hand (`node pipeline/dev/make-fixtures.mjs`) when a source changes shape; 1 request per second per host.
// The shipped fixtures were built from the 21 Nov 2026 research pulls (france-research/work) and a few live calls.
import { writeFileSync } from 'node:fs';
import { httpGet } from '../lib/http.mjs';

const OUT = new URL('../fixtures/', import.meta.url);
const LIMIT = 45000;

function truncIcs(t) {
	const head = t.slice(0, t.indexOf('BEGIN:VEVENT'));
	const parts = t.split('BEGIN:VEVENT').slice(1).map((p) => 'BEGIN:VEVENT' + p.split('END:VEVENT')[0] + 'END:VEVENT\r\n');
	let out = head;
	for (const p of parts) { if ((out + p).length > LIMIT) break; out += p; }
	return out + 'END:VCALENDAR\r\n';
}
function truncXml(t, tag) {
	const re = new RegExp('<' + tag + '[\\s>][\\s\\S]*?</' + tag + '>', 'g');
	const items = t.match(re) ?? [];
	if (!items.length) return t.slice(0, LIMIT);
	const first = t.indexOf(items[0]);
	const lastEnd = t.lastIndexOf('</' + tag + '>') + tag.length + 3;
	let out = t.slice(0, first);
	for (const it of items) { if ((out + it).length > LIMIT - 200) break; out += it; }
	return out + t.slice(lastEnd);
}
const ldBlocks = (t, keep) => '<html><head>' + [...t.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((x) => x[0]).filter(keep ?? (() => true)).join('\n').slice(0, LIMIT) + '</head><body></body></html>';

const jobs = [
	['meetup-ics.ics', 'https://www.meetup.com/pydata-paris/events/ical/', truncIcs],
	['meetup-ics2.ics', 'https://www.meetup.com/le-wagon-bordeaux-coding-station-bootcamp/events/ical/', truncIcs],
	['hackevents-ai.ics', 'https://www.hackevents.net/api/calendar?topic=ai-ml&country=fr', truncIcs],
	['agentconfs.ics', 'https://agentconfs.com/feeds/all.ics', truncIcs],
	['aieventlist-paris.ics', 'https://aieventlist.ai/cities/paris/events.ics', truncIcs],
	['hi-paris.ics', 'https://hi-paris.fr/events/?ical=1', truncIcs],
	['numerique-gouv.ics', 'https://www.numerique.gouv.fr/agenda/ical/', truncIcs],
	['brainberg.json', 'https://brainberg.eu/api/events?country=FR&limit=10', (t) => { const j = JSON.parse(t); j.events = j.events.slice(0, 10); return JSON.stringify(j, null, 1).slice(0, LIMIT * 2); }],
	['luma-paris.json', 'https://api.lu.ma/discover/get-paginated-events?discover_place_api_id=discplace-NdLrh1xJfeotJZC&pagination_limit=10', (t) => { const j = JSON.parse(t); j.entries = j.entries.slice(0, 8).map((e) => ({ api_id: e.api_id, event: e.event, calendar: { name: e.calendar?.name }, hosts: (e.hosts ?? []).map((h) => ({ name: h.name })) })); return JSON.stringify(j, null, 1).slice(0, LIMIT); }],
	['luma-calendar.json', 'https://api.lu.ma/calendar/get-items?calendar_api_id=cal-5HpS5DjhfyP4hWY&period=future&pagination_limit=10', (t) => JSON.stringify(JSON.parse(t), null, 1).slice(0, LIMIT)],
	['eventbrite.html', 'https://www.eventbrite.fr/d/france--lyon/intelligence-artificielle/?page=1', (t) => ldBlocks(t, (b) => /ItemList/.test(b))],
	['briefia.html', 'https://www.briefia.fr/meetups', (t) => ldBlocks(t, (b) => /ItemList/.test(b))],
	['jsonld-meetup-city.html', 'https://www.meetup.com/fr-FR/cities/fr/paris/events/', (t) => ldBlocks(t, (b) => /"Event"/.test(b))],
	['aieventlist.xml', 'https://aieventlist.ai/feed.xml', (t) => truncXml(t, 'item')],
	['devevents.xml', 'https://dev.events/rss.xml', (t) => truncXml(t, 'item')],
	['confstech.json', 'https://raw.githubusercontent.com/tech-conferences/conference-data/main/conferences/2026/data.json', (t) => JSON.stringify(JSON.parse(t).filter((c) => c.country === 'France').slice(0, 20)).slice(0, LIMIT)],
	['scrape.html', 'https://www.hub-franceia.fr/evenements/', (t) => { const i = Math.max(0, t.search(/\d{1,2} (?:novembre|décembre|janvier)/)); return '<html><body><main>' + t.slice(Math.max(0, i - 9000), i + 14000) + '</main></body></html>'; }],
];

for (const [name, url, fn] of jobs) {
	try {
		const r = await httpGet(url);
		if (!r.ok) { console.log('FAIL', name, r.status); continue; }
		const body = fn(r.text);
		writeFileSync(new URL(name, OUT), body);
		console.log('ok', name, body.length);
	} catch (e) {
		console.log('ERR', name, e.message);
	}
}
