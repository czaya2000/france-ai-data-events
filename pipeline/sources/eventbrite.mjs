// Eventbrite France search pages: JSON-LD ItemList of Event. No API key needed.
//
// Politeness rules (Eventbrite answered 429 after ~110 page loads in one session during research, and blocks bursts):
//  - an honest, identifying User-Agent, never a browser impersonation;
//  - at least EVENTBRITE_GAP_MS (default 2500 ms) between any two requests, one attempt per URL, no retry loops;
//  - a per-run request budget (EVENTBRITE_MAX_REQUESTS, default 70) so a run stays far below the threshold;
//  - every page is cached on disk for EVENTBRITE_CACHE_HOURS (default 20): a second run the same day costs nothing;
//  - the first 403/405/429 DISABLES Eventbrite for the rest of the run (recorded as `disabled` in the run report and
//    source health, not as a failure). We never try to get around a block.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { httpGet } from '../lib/http.mjs';
import { extractJsonLdEvents } from '../lib/jsonld.mjs';
import { canonicalUrl, makeCandidate, stripHtml } from '../lib/normalize.mjs';
import { canonicalCity, ONLINE } from '../lib/city.mjs';
import { FETCHER_CONTACT } from '../../config/country.mjs';

export const EVENTBRITE_UA = `france-ai-data-events/1.0 (event-aggregator; +${FETCHER_CONTACT})`;
export const EVENTBRITE_GAP_MS = Number(process.env.EVENTBRITE_GAP_MS ?? 2500);
export const EVENTBRITE_MAX_REQUESTS = Number(process.env.EVENTBRITE_MAX_REQUESTS ?? 70);
const CACHE_MS = Number(process.env.EVENTBRITE_CACHE_HOURS ?? 20) * 3600 * 1000;

let blocked = null; // e.g. 'HTTP 429 (retry-after 120)' once Eventbrite has pushed back this run
let requests = 0;
export const resetEventbriteBlock = () => { blocked = null; requests = 0; };

export class SourceBlocked extends Error {
	constructor(message) { super(message); this.blocked = true; }
}

/** Extract Event objects from every ld+json block of an HTML page. */
export const parseEventbrite = (html) => extractJsonLdEvents(html);

function cachedPage(url, ctx) {
	if (!ctx.cacheDir) return null;
	const f = join(ctx.cacheDir, 'eb-' + createHash('sha1').update(url).digest('hex').slice(0, 16) + '.html');
	return { f, hit: existsSync(f) && Date.now() - statSync(f).mtimeMs < CACHE_MS ? readFileSync(f, 'utf8') : null };
}

export async function fetchSource(src, ctx) {
	const host = src.host ?? 'www.eventbrite.fr';
	const maxPages = ctx.limit ? 1 : (src.maxPages ?? 1);
	const seen = new Set();
	const all = [];
	for (const keyword of src.keywords) {
		for (let page = 1; page <= maxPages; page++) {
			const url = `https://${host}/d/${src.citySlug}/${keyword}/?page=${page}`;
			let html = null;
			const c = cachedPage(url, ctx);
			if (c?.hit) html = c.hit;
			else {
				if (blocked) throw new SourceBlocked(`Eventbrite blocked this run (${blocked}); not retried`);
				if (requests >= EVENTBRITE_MAX_REQUESTS) throw new SourceBlocked(`request budget of ${EVENTBRITE_MAX_REQUESTS} per run reached; resumes from cache tomorrow`);
				requests++;
				const r = await httpGet(url, { accept: 'text/html', userAgent: EVENTBRITE_UA, gapMs: EVENTBRITE_GAP_MS, retries: 0, fetchImpl: ctx.fetchImpl ?? fetch });
				if (!r.ok) {
					if ([403, 405, 429].includes(r.status)) {
						const ra = r.headers?.get?.('retry-after');
						blocked = `HTTP ${r.status}${ra ? `, retry-after ${ra}` : ''}`;
						throw new SourceBlocked(`Eventbrite answered ${blocked}; disabled for the rest of this run`);
					}
					if (page === 1 && !all.length) throw new Error('HTTP ' + r.status);
					break;
				}
				html = r.text;
				if (c) { mkdirSync(ctx.cacheDir, { recursive: true }); writeFileSync(c.f, html); }
			}
			let fresh = 0;
			for (const e of parseEventbrite(html)) {
				const k = canonicalUrl(e.url ?? '');
				if (!k || seen.has(k)) continue;
				seen.add(k);
				all.push(e);
				fresh++;
			}
			if (!fresh) break;
		}
	}
	return all;
}

export function normalise(e, src) {
	if (!e?.name || !e.startDate) return null;
	const loc = [].concat(e.location ?? []).find((l) => l && typeof l === 'object' && !/Virtual/.test(l['@type'] ?? '')) ?? {};
	const addr = typeof loc.address === 'object' ? loc.address : {};
	const mode = String(e.eventAttendanceMode ?? '');
	const online = /Online/.test(mode) && !/Mixed/.test(mode);
	const start = String(e.startDate).slice(0, 10);
	const end = e.endDate ? String(e.endDate).slice(0, 10) : start;
	const timeM = /T(\d{2}:\d{2})/.exec(e.startDate);
	const country = (addr.addressCountry ?? '').toString().toUpperCase().slice(0, 2) || null;
	return makeCandidate(
		{
			title: stripHtml(e.name),
			start,
			end,
			time: timeM && timeM[1] !== '00:00' ? timeM[1] : undefined,
			city: online ? ONLINE : canonicalCity(addr.addressLocality) ?? canonicalCity(src.cityHint),
			venue: [loc.name, addr.streetAddress].filter(Boolean).join(', ') || undefined,
			url: e.url,
			desc: stripHtml(e.description ?? ''),
			online,
			country: online ? null : country,
		},
		src,
	);
}
