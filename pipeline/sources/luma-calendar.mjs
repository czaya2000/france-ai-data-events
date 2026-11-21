// Luma calendar feed: api.lu.ma/calendar/get-items?calendar_api_id=<cal-id>&period=future (undocumented; keep tolerant).
// Entries have the same shape as the discover feed, so normalise() is shared with luma.mjs. Global calendars (ClickHouse,
// n8n, Neo4j, Make...) list events worldwide: non-French physical events carry another country code and are dropped
// by the country filter. The calendar id is in the source entry, or resolved once from the calendar page and cached.
import { httpJson } from '../lib/http.mjs';
import { getText } from '../lib/cache.mjs';
export { normalise } from './luma.mjs';

const NEXT_DATA = /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/;

/** Calendar id (cal-...) and metadata from a luma.com page (a calendar page or any event page). */
export function parseLumaPage(html) {
	const m = NEXT_DATA.exec(html);
	if (!m) return null;
	let d;
	try { d = JSON.parse(m[1])?.props?.pageProps?.initialData; } catch { return null; }
	if (!d) return null;
	if (d.kind === 'event') {
		const cal = d.data?.calendar;
		const g = d.data?.event?.geo_address_info ?? {};
		return cal?.api_id ? { kind: 'event', calendarId: cal.api_id, name: cal.name, slug: cal.slug, city: g.city ?? null, country: g.country_code ?? null } : null;
	}
	const cal = d.data?.calendar;
	return cal?.api_id ? { kind: 'calendar', calendarId: cal.api_id, name: cal.name, slug: cal.slug } : null;
}

export async function resolveCalendarId(src, ctx) {
	if (src.calendarId) return src.calendarId;
	const slug = src.calendarSlug ?? new URL(src.url).pathname.replace(/^\/|\/$/g, '');
	const r = await getText('https://luma.com/' + slug, ctx, { accept: 'text/html' });
	if (!r.ok) throw new Error('calendar page HTTP ' + r.status);
	const p = parseLumaPage(r.text);
	if (!p) throw new Error('no calendar id on page');
	return p.calendarId;
}

export async function fetchSource(src, ctx) {
	const id = await resolveCalendarId(src, ctx);
	const all = [];
	let cursor;
	const maxPages = ctx.limit ? 1 : 6;
	for (let page = 0; page < maxPages; page++) {
		const u = new URL('https://api.lu.ma/calendar/get-items');
		u.searchParams.set('calendar_api_id', id);
		u.searchParams.set('period', 'future');
		u.searchParams.set('pagination_limit', String(ctx.limit ? Math.min(ctx.limit, 50) : 50));
		if (cursor) u.searchParams.set('pagination_cursor', cursor);
		const j = await httpJson(u.toString(), { fetchImpl: ctx.fetchImpl ?? fetch, gapMs: ctx.gapMs });
		if (!Array.isArray(j.entries)) throw new Error('unexpected Luma calendar response (no entries[])');
		all.push(...j.entries);
		if (!j.has_more || !j.next_cursor) break;
		cursor = j.next_cursor;
	}
	return all;
}
