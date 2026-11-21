// Generic schema.org JSON-LD source: fetch an HTML page (or one page per city for `{city}` URL templates), read its Event
// blocks. Used for Brief IA, Meetup city pages (group discovery only), Toulouse Tech Hub, AI Tinkerers, Create With.
// Policy: only basic facts are kept (title, date, time, city, venue, url). Descriptions are NOT copied unless the source
// entry sets `keepDesc: true`; blurbs are always our own sentence.
import { getText } from '../lib/cache.mjs';
import { extractJsonLdEvents } from '../lib/jsonld.mjs';
import { canonicalCity, detectCity, isOnlineText, ONLINE } from '../lib/city.mjs';
import { makeCandidate, stripHtml } from '../lib/normalize.mjs';
import { parseStamp, timeRange } from '../lib/time.mjs';

export const MEETUP_CITY_SLUGS = ['paris', 'lyon', 'toulouse', 'marseille', 'nice', 'bordeaux', 'lille', 'nantes', 'rennes', 'grenoble', 'strasbourg', 'montpellier'];
const CITY_HINT = { paris: 'Paris', lyon: 'Lyon', toulouse: 'Toulouse', marseille: 'Marseille', nice: 'Nice', bordeaux: 'Bordeaux', lille: 'Lille', nantes: 'Nantes', rennes: 'Rennes', grenoble: 'Grenoble', strasbourg: 'Strasbourg', montpellier: 'Montpellier' };

export function pageUrls(src, ctx) {
	if (!src.url.includes('{city}')) return [{ url: src.url }];
	const cities = src.cities ?? MEETUP_CITY_SLUGS;
	return (ctx?.limit ? cities.slice(0, 1) : cities).map((c) => ({ url: src.url.replace('{city}', c), cityHint: CITY_HINT[c] ?? null }));
}

export async function fetchSource(src, ctx) {
	const out = [];
	let okPages = 0;
	let lastErr;
	for (const { url, cityHint } of pageUrls(src, ctx)) {
		let r;
		try { r = await getText(url, ctx, { accept: 'text/html', gapMs: ctx.gapMs ?? 1500, retries: 1, fetchImpl: ctx.fetchImpl }); } catch (e) { lastErr = e; continue; }
		if (!r.ok) { lastErr = new Error('HTTP ' + r.status); continue; }
		okPages++;
		for (const e of extractJsonLdEvents(r.text)) out.push({ ...e, _page: url, _cityHint: cityHint });
	}
	if (!okPages) throw lastErr ?? new Error('no page reachable');
	return out;
}

const first = (v) => (Array.isArray(v) ? v[0] : v);
const text = (v) => (typeof v === 'string' ? v : v?.name ?? '');

/** The Place of an Event's `location` (which may be an array mixing Place and VirtualLocation). */
function place(e) {
	const locs = [].concat(e.location ?? []);
	return locs.find((l) => l && typeof l === 'object' && !/Virtual/.test(l['@type'] ?? '')) ?? null;
}

function countryOf(addr) {
	const raw = text(addr?.addressCountry).trim();
	if (!raw) return null;
	if (/^(france|fr|fra)$/i.test(raw)) return 'FR';
	return raw.length === 2 ? raw.toUpperCase() : 'XX';
}

const MEETUP_GROUP_ROOT = /meetup\.com\/(?:[a-z]{2}-[A-Z]{2}\/)?([A-Za-z0-9_\-%.]+)\/?(?:[?#]|$)/;

export function normalise(e, src) {
	const name = stripHtml(text(e.name));
	const s = parseStamp(e.startDate);
	if (!name || !s) return null;
	const en = e.endDate ? parseStamp(e.endDate) : null;
	const mode = String(e.eventAttendanceMode ?? '');
	const virtual = [].concat(e.location ?? []).some((l) => /Virtual/.test(l?.['@type'] ?? ''));
	const loc = place(e);
	const addr = typeof loc?.address === 'object' ? loc.address : { addressLocality: loc?.address };
	const locality = text(addr?.addressLocality).trim();
	const bareCountry = /^france$/i.test(locality);
	const online = (/Online/.test(mode) && !/Mixed/.test(mode)) || (virtual && !loc) || (!loc && isOnlineText(name) && /webinaire|webinar|en ligne/i.test(name));
	const venueName = text(loc?.name).trim();
	const city = online
		? ONLINE
		: (!bareCountry && locality ? canonicalCity(locality) : null) ?? detectCity(`${venueName} ${text(addr?.streetAddress)}`) ?? e._cityHint ?? src.cityHint ?? null;
	const offer = first(e.offers);
	const price = offer?.price != null && offer.price !== '' ? Number(String(offer.price).replace(',', '.')) : null;
	const cost = price === 0 ? 'Free' : price > 0 ? `${(offer.priceCurrency ?? 'EUR').toUpperCase()} ${Number.isInteger(price) ? price : price.toFixed(2)}` : null;
	const url = String(e.url ?? first(e.offers)?.url ?? e['@id'] ?? '');
	const extraUrls = [];
	for (const u of [offer?.url, ...[].concat(e.sameAs ?? [])]) {
		if (u && u !== url && /(\/events\/\d+|eventbrite\.[a-z.]+\/e\/|(?:lu\.ma|luma\.com)\/[A-Za-z0-9-]+\/?$)/.test(u)) extraUrls.push(u);
	}
	const org = text(first(e.organizer)).trim();
	const orgUrl = typeof first(e.organizer) === 'object' ? String(first(e.organizer)?.url ?? '') : '';
	const c = makeCandidate(
		{
			title: name,
			start: s.date,
			end: en && en.date >= s.date ? en.date : s.date,
			time: timeRange(s.time, en && en.date === s.date ? en.time : undefined),
			city,
			venue: online ? undefined : [venueName, text(addr?.streetAddress)].filter(Boolean).join(', ') || undefined,
			organiser: org,
			url,
			extraUrls,
			cost,
			desc: src.keepDesc ? stripHtml(text(e.description)) : '',
			online,
			country: online ? null : countryOf(addr) ?? src.country ?? null,
			cancelled: /Cancel/i.test(String(e.eventStatus ?? '')),
		},
		src,
	);
	if (c) {
		const g = MEETUP_GROUP_ROOT.exec(orgUrl);
		c.meetupGroups = g && !['cities', 'find', 'topics'].includes(g[1]) ? [decodeURIComponent(g[1]).toLowerCase()] : [];
	}
	return c;
}
