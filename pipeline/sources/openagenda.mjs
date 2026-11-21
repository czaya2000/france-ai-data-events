// OpenAgenda public events via Opendatasoft (keyless JSON API, open data). Mostly libraries, museums and universities:
// AI-literacy talks and workshops. One record can have many dated occurrences (`timings`); we emit the NEXT occurrence
// that is not over yet, as a single event, so a long series is one listing, not fifty.
import { httpJson } from '../lib/http.mjs';
import { canonicalCity, ONLINE } from '../lib/city.mjs';
import { makeCandidate, oneLine, stripHtml } from '../lib/normalize.mjs';
import { addDays, parseStamp, timeRange } from '../lib/time.mjs';

export const DEFAULT_TERMS = ['intelligence artificielle', 'IA', 'machine learning', 'données', 'data', 'ChatGPT', 'algorithme', 'LLM', 'robot'];
const MAX_OFFSET = 300; // per term, 100 per page

export function buildWhere(term, today, windowDays) {
	const t = String(term).replace(/"/g, '');
	return `(search(title_fr,"${t}") or search(keywords_fr,"${t}")) and lastdate_end>=date'${today}' and firstdate_begin<=date'${addDays(today, windowDays)}'`;
}

export async function fetchSource(src, ctx) {
	const byUid = new Map();
	const terms = ctx.limit ? (src.terms ?? DEFAULT_TERMS).slice(0, 1) : src.terms ?? DEFAULT_TERMS;
	for (const term of terms) {
		for (let offset = 0; offset < (ctx.limit ? 1 : MAX_OFFSET); offset += 100) {
			const u = new URL(src.url);
			u.searchParams.set('limit', String(ctx.limit ? Math.min(ctx.limit, 100) : 100));
			u.searchParams.set('offset', String(offset));
			u.searchParams.set('where', buildWhere(term, ctx.today, ctx.windowDays ?? 120));
			const j = await httpJson(u.toString(), { fetchImpl: ctx.fetchImpl ?? fetch, gapMs: ctx.gapMs ?? 1000 });
			if (!Array.isArray(j.results)) throw new Error('unexpected OpenAgenda response (no results[])');
			for (const r of j.results) byUid.set(r.uid ?? r.slug, r);
			if (j.results.length < 100) break;
		}
	}
	return [...byUid.values()];
}

const json = (v) => {
	if (v == null) return null;
	if (typeof v === 'object') return v;
	try { return JSON.parse(v); } catch { return null; }
};

/** The next occurrence of a record that ends today or later. `today` comes from normalise's src context. */
export function nextOccurrence(r, today) {
	const timings = json(r.timings);
	const occ = [];
	if (Array.isArray(timings)) {
		for (const t of timings) {
			const b = parseStamp(t.begin), e = t.end ? parseStamp(t.end) : null;
			if (!b) continue;
			occ.push({ date: b.date, time: b.dateOnly ? undefined : b.time, endDate: e?.date ?? b.date, endTime: e && !e.dateOnly ? e.time : undefined });
		}
	}
	if (!occ.length && r.firstdate_begin) {
		const b = parseStamp(r.firstdate_begin), e = parseStamp(r.firstdate_end ?? r.firstdate_begin);
		if (b) occ.push({ date: b.date, time: b.time, endDate: e?.date ?? b.date, endTime: e?.time });
	}
	occ.sort((a, b) => a.date.localeCompare(b.date));
	return occ.find((o) => o.endDate >= today) ?? null;
}

export function normalise(r, src, ctx = {}) {
	if (r.location_countrycode && r.location_countrycode !== 'FR') return null;
	const today = ctx.today ?? new Date().toISOString().slice(0, 10);
	const o = nextOccurrence(r, today);
	if (!o) return null;
	const mode = json(r.attendancemode);
	const online = mode?.id === 2; // 1 on site, 2 online, 3 mixed
	const url = r.canonicalurl || (r.slug ? `https://openagenda.com/agendas/${r.originagenda_uid}/events/${r.slug}` : '');
	const free = /gratuit|libre|free/i.test(r.conditions_fr ?? '');
	return makeCandidate(
		{
			title: stripHtml(r.title_fr ?? ''),
			start: o.date,
			end: o.endDate,
			time: timeRange(o.time, o.endDate === o.date ? o.endTime : undefined),
			city: online ? ONLINE : canonicalCity(r.location_city),
			venue: online ? undefined : [r.location_name, r.location_address].filter(Boolean).join(', ') || undefined,
			organiser: r.contributor_organization || r.originagenda_title || r.location_name,
			url,
			cost: free ? 'Free' : null,
			desc: oneLine(stripHtml(r.description_fr ?? ''), 400) + (r.keywords_fr?.length ? ' ' + r.keywords_fr.join(', ') : ''),
			online,
			country: online ? null : 'FR',
		},
		src,
	);
}
