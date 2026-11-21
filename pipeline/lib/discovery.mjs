// Self-expanding discovery (rule A1 in SOURCES.fr.md): Meetup groups and Luma calendars that show up in any source's
// links are tested once and then polled daily with trust `noisy` until the owner promotes them.
// Caps keep one run small: new checks per run, and a ceiling on how many discovered feeds are polled at all.
import { getText } from './cache.mjs';
import { parseIcs } from './ical.mjs';
import { groupsInCandidate, icsUrl } from '../sources/meetup.mjs';
import { parseLumaPage } from '../sources/luma-calendar.mjs';

export const CAPS = {
	meetupNewPerRun: 15, meetupNewPerRunBootstrap: 40, meetupPolledTotal: 60,
	lumaNewPerRun: 10, lumaNewPerRunBootstrap: 25, lumaPolledTotal: 40,
};

const LUMA_RE = /(?:^|[^a-z0-9.])(?:luma\.com|lu\.ma)\/([A-Za-z0-9][A-Za-z0-9_-]{4,60})(?![A-Za-z0-9_-])/g;
const NOT_LUMA = new Set(['discover', 'calendar', 'explore', 'events', 'home', 'signin', 'pricing', 'help', 'create', 'embed', 'search', 'ics', 'map', 'ai', 'paris', 'lyon', 'toulouse']);

/** Luma slugs (event or calendar) mentioned in urls or text. */
export function lumaSlugsIn(...texts) {
	const out = new Set();
	for (const t of texts) {
		for (const m of String(t ?? '').matchAll(LUMA_RE)) if (!NOT_LUMA.has(m[1].toLowerCase())) out.add(m[1]);
	}
	return out;
}
export const lumaSlugsInCandidate = (c) => lumaSlugsIn(c.url, ...(c.extraUrls ?? []), c.desc);

/**
 * Meetup groups found in this run's candidates that are neither configured nor already tested. `relevant(candidate)` keeps
 * discovery on topic: a group is only followed when it was seen on an AI/data-looking listing (Brainberg and the Meetup city
 * pages list cooking classes and salsa too).
 */
export function newMeetupGroups(results, known, groups, relevant = () => true) {
	const found = new Map();
	for (const r of results) {
		for (const c of r.candidates) {
			if (!relevant(c)) continue;
			for (const g of [...groupsInCandidate(c), ...(c.meetupGroups ?? [])]) {
				if (!known.has(g) && !groups[g] && !found.has(g)) found.set(g, r.src.id);
			}
		}
	}
	return found;
}

/** Test each new group's ICS once (cap per run); returns [{ group, info, parsed? }] and records `info` in `groups`. */
export async function testMeetupGroups(found, groups, { ctx, today, cap, parse = parseIcs }) {
	const out = [];
	let tested = 0;
	for (const [g, via] of found) {
		if (tested >= cap) break;
		tested++;
		const info = { firstSeen: today, via, trust: 'noisy', icsOk: false, checked: today };
		let parsed = null;
		try {
			const r = await getText(icsUrl(g), ctx, { accept: 'text/calendar, */*', retries: 0, gapMs: ctx.gapMs });
			const ct = r.headers?.get?.('content-type') ?? '';
			info.icsOk = r.ok && (/calendar/i.test(ct) || r.text.includes('BEGIN:VCALENDAR'));
			if (info.icsOk) parsed = parse(r.text);
		} catch {
			info.icsOk = false;
		}
		groups[g] = info;
		out.push({ group: g, info, parsed });
	}
	return out;
}

/** Discovered groups that may be polled: ICS ok, newest first, at most `total`. */
export function pollableGroups(groups, known, total = CAPS.meetupPolledTotal) {
	return Object.entries(groups)
		.filter(([g, i]) => i.icsOk && !known.has(g))
		.sort((a, b) => String(b[1].firstSeen).localeCompare(String(a[1].firstSeen)))
		.slice(0, total)
		.map(([g]) => g);
}

/** New Luma slugs from this run's candidates, not yet resolved. */
export function newLumaSlugs(results, file, relevant = () => true) {
	const found = new Map();
	for (const r of results) {
		for (const c of r.candidates) {
			if (!relevant(c)) continue;
			for (const s of lumaSlugsInCandidate(c)) if (!(s in file.slugs) && !found.has(s)) found.set(s, r.src.id);
		}
	}
	return found;
}

/**
 * Resolve each new slug to its calendar (one page fetch each, capped). Records the result for the slug (null when it
 * does not resolve) and the calendar in `file.calendars` keyed by calendar id. Returns the calendars added this run.
 */
export async function resolveLumaSlugs(found, file, knownIds, { ctx, today, cap }) {
	const added = [];
	let tested = 0;
	for (const [slug, via] of found) {
		if (tested >= cap) break;
		tested++;
		let p = null;
		try {
			const r = await getText('https://luma.com/' + slug, ctx, { accept: 'text/html', retries: 0, gapMs: ctx.gapMs });
			if (r.ok) p = parseLumaPage(r.text);
		} catch { /* unresolved, remembered below */ }
		file.slugs[slug] = p?.calendarId ?? null;
		// An event page in another country says nothing about the calendar being French (it may be a global calendar): skip it.
		const foreign = p?.country && String(p.country).toUpperCase() !== 'FR';
		if (p?.calendarId && !foreign && !knownIds.has(p.calendarId) && !file.calendars[p.calendarId]) {
			file.calendars[p.calendarId] = { name: p.name, slug: p.slug, city: p.city ?? null, via, firstSeen: today, trust: 'noisy' };
			added.push(p.calendarId);
		}
	}
	return added;
}

/** Source entries for discovered Luma calendars (polled daily, newest first, capped). */
export function lumaSourcesFrom(file, knownIds, total = CAPS.lumaPolledTotal) {
	return Object.entries(file.calendars)
		.filter(([id]) => !knownIds.has(id))
		.sort((a, b) => String(b[1].firstSeen).localeCompare(String(a[1].firstSeen)))
		.slice(0, total)
		.map(([id, c]) => ({
			id: 'luma-cal:' + (c.slug || id), type: 'luma-calendar', label: 'Luma', calendarId: id, calendarSlug: c.slug, trust: 'noisy',
			onlineOk: false, curatedCalendar: true, discovered: true, note: `discovered via ${c.via}: ${c.name ?? ''}`,
		}));
}
