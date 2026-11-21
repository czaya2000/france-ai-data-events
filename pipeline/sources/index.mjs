// Source type -> module. Each module exports fetchSource(src, ctx) and normalise(raw, src, ctx) -> Candidate|Candidate[]|null.
import * as meetup from './meetup.mjs';
import * as hackevents from './hackevents.mjs';
import * as brainberg from './brainberg.mjs';
import * as luma from './luma.mjs';
import * as lumaCalendar from './luma-calendar.mjs';
import * as eventbrite from './eventbrite.mjs';
import * as rss from './rss.mjs';
import * as atom from './atom.mjs';
import * as ics from './ics.mjs';
import * as devevents from './devevents.mjs';
import * as confstech from './confstech.mjs';
import * as jsonld from './jsonld.mjs';
import * as openagenda from './openagenda.mjs';

export const MODULES = {
	meetup, hackevents, brainberg, luma, 'luma-calendar': lumaCalendar, eventbrite, rss, atom, ics, devevents, confstech, jsonld, openagenda,
};

/** Fetch + normalise one feed source. ICS modules return {calName, events}, others arrays of raw items. */
export async function runFeedSource(src, ctx) {
	const mod = MODULES[src.type];
	if (!mod) throw new Error('unknown source type ' + src.type);
	const raw = await mod.fetchSource(src, ctx);
	return normaliseRaw(src, raw, ctx);
}

export function normaliseRaw(src, raw, ctx = {}) {
	const mod = MODULES[src.type];
	const rawCount = raw.events ? raw.events.length : raw.length;
	let cands;
	if (raw.events && 'calName' in raw) cands = mod.normalise(raw, src, ctx);
	else cands = raw.map((r) => mod.normalise(r, src, ctx)).filter(Boolean);
	return { rawCount, candidates: cands.filter(Boolean) };
}
