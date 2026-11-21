// Candidate shape, URL canonicalisation, ledger keys, text cleanup, French/English date parsing.
import { fold, resolveCity } from './city.mjs';
import { stripEmoji } from '../../src/lib/strip-emoji.mjs';
import { MONTHS } from './time.mjs';
import { AGGREGATOR_DOMAINS, NOT_LISTED } from '../../config/country.mjs';

export function stripHtml(html) {
	return String(html ?? '')
		.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
		.replace(/<br\s*\/?>|<\/p>|<\/li>|<\/h\d>/gi, '\n')
		.replace(/<[^>]+>/g, ' ')
		.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
		.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
		.replace(/[ \t ]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim();
}

export function oneLine(s, max) {
	const t = String(s ?? '').replace(/\s+/g, ' ').trim();
	return max && t.length > max ? t.slice(0, max - 1) + '…' : t;
}

const TRACKING = /^(utm_|fbclid|gclid|mc_|ref$|ref_|source$)/i;

/** Canonical URL for ledger keys: no query tracking, fragment or trailing slash; per-platform shortcuts. */
export function canonicalUrl(raw) {
	let u;
	try { u = new URL(String(raw).trim()); } catch { return null; }
	const host = u.hostname.replace(/^www\./, '').toLowerCase();
	let m;
	if (host === 'meetup.com' && (m = /^\/(?:[a-z]{2}-[A-Z]{2}\/)?([^/]+)\/events\/(\d+)/.exec(u.pathname))) return `meetup.com/${m[1].toLowerCase()}/events/${m[2]}`;
	if ((host === 'luma.com' || host === 'lu.ma') && (m = /^\/([^/]+)\/?$/.exec(u.pathname))) return `luma.com/${m[1]}`;
	if (/(^|\.)eventbrite\./.test(host) && (m = /(\d{8,})\/?$/.exec(u.pathname))) return `eventbrite/${m[1]}`;
	const keep = [...u.searchParams].filter(([k]) => !TRACKING.test(k));
	const q = keep.length ? '?' + keep.map(([k, v]) => `${k}=${v}`).join('&') : '';
	return `${host}${u.pathname.replace(/\/+$/, '')}${q}`;
}

const STOP = new Set([
	'the', 'and', 'of', 'in', 'at', 'a', 'for', 'to', 'with', 'by', 'on',
	'le', 'la', 'les', 'l', 'd', 'de', 'du', 'des', 'et', 'pour', 'sur', 'au', 'aux', 'en', 'un', 'une', 'dans', 'par', 'avec', 'ou', 'chez', 'qui', 'que',
	'paris', 'lyon', 'toulouse', 'marseille', 'aix', 'nice', 'sophia', 'antipolis', 'bordeaux', 'lille', 'nantes', 'rennes', 'grenoble',
	'strasbourg', 'montpellier', 'france', 'francais', 'francaise', 'idf',
	'event', 'events', 'evenement', 'meetup', 'online', 'ligne', 'soiree', 'afterwork', 'rencontre', 'rencontres', 'edition', 'special', 'conference', 'conferences', 'conf',
]);

/** Port of norm_title from reference/dedupe-and-keywords.py. */
export function normTitle(t) {
	let s = fold(t);
	s = s.replace(/20\d\d|#\d+|\bno\.?\s*\d+/g, '').replace(/[^a-z0-9 ]/g, ' ');
	return s.split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w)).join(' ');
}

export function ledgerKeys(c) {
	const keys = [];
	const u = canonicalUrl(c.url);
	if (u) keys.push('u:' + u);
	for (const x of c.extraUrls ?? []) {
		const cu = canonicalUrl(x);
		if (cu && !keys.includes('u:' + cu)) keys.push('u:' + cu);
	}
	const nt = normTitle(c.title);
	if (nt) keys.push(`t:${nt}|${c.start}`);
	return keys;
}

// ---- organiser cleanup ----
const PLATFORMS = new Set([
	'meetup', 'meetup.com', 'eventbrite', 'eventbrite.fr', 'eventbrite.com', 'luma', 'lu.ma', 'luma.com', 'brainberg', 'brainberg.com', 'brainberg.eu',
	'briefia', 'brief ia', 'briefia.fr', 'allai', 'allai.events', 'openagenda', 'helloasso', 'weezevent', 'billetweb',
	'hackevents', 'hackevents.org', 'devevents', 'dev.events', 'confs.tech', 'confstech', 'aieventlist', 'facebook', 'linkedin',
	'unknown', 'n/a', 'na', 'none', 'tbd', 'tba', 'null', 'undefined', '-', '--',
]);
const COUNT_WORD = "(?:going|attendees?|attending|attended|rsvps?|interested|registered|guests?|members?|spots?|people|participants?)";
const HOSTED_PREFIX = /^(?:hosted|organi[sz]ed|presented|run|brought to you)\s+by\s*:?\s*/i;
const TRAILING_COUNT = new RegExp(`\\s*[·|,;-]?\\s*(?:${COUNT_WORD}\\s*:?\\s*\\d+|\\d+\\s*${COUNT_WORD})\\s*$`, 'i');
const WHOLE_JUNK = new RegExp(`^(?:${COUNT_WORD}\\s*:?\\s*\\d*|\\d+\\s*${COUNT_WORD}|(?:hosted|organi[sz]ed|organi[sz]er|presented|run)(?:\\s+by)?\\s*:?)$`, 'i');

/** Organiser text with feed junk removed ("Going: 0", "12 going", "Hosted by" alone, bare numbers, platform names); '' when nothing is left. */
export function cleanOrganiser(raw) {
	let s = String(raw ?? '').replace(/\s+/g, ' ').trim();
	for (let i = 0; i < 3 && s; i++) {
		const before = s;
		s = s.replace(HOSTED_PREFIX, '').replace(/^organi[sz]er\s*:\s*/i, '').trim();
		s = s.replace(TRAILING_COUNT, '').trim();
		if (s === before) break;
	}
	if (!s) return '';
	if (/^[\d\s.,:+#-]+$/.test(s)) return '';
	if (WHOLE_JUNK.test(s)) return '';
	if (PLATFORMS.has(s.toLowerCase())) return '';
	return s;
}

const MULTI_TLD = new Set(['co.uk', 'org.uk', 'ac.uk', 'com.au', 'co.jp', 'com.br', 'co.nz', 'co.za', 'asso.fr', 'gouv.fr', 'com.fr']);

/** Registrable domain of a URL ("https://www.hub-franceia.fr/x" -> "hub-franceia.fr"), or ''. */
export function registrableDomain(url) {
	let host;
	try { host = new URL(String(url ?? '').trim()).hostname.toLowerCase().replace(/\.$/, ''); } catch { return ''; }
	if (!host || /^[\d.]+$/.test(host) || host.includes(':')) return '';
	const parts = host.split('.');
	if (parts.length <= 2) return host.replace(/^www\./, '');
	const last2 = parts.slice(-2).join('.');
	return parts.slice(MULTI_TLD.has(last2) ? -3 : -2).join('.');
}

/** Organiser for a stored event: the cleaned organiser; else the registrable domain of the url, unless that is an
    aggregator platform (config AGGREGATOR_DOMAINS), then the literal "Not listed"; '' with no usable url.
    A stored bare aggregator domain (earlier fallback output) also becomes "Not listed". */
export function organiserOrDomain(organiser, url) {
	const cleaned = cleanOrganiser(organiser);
	if (cleaned) return AGGREGATOR_DOMAINS.includes(cleaned.toLowerCase().replace(/^www\./, '')) ? NOT_LISTED : cleaned;
	const d = registrableDomain(url);
	if (!d) return '';
	return AGGREGATOR_DOMAINS.includes(d) ? NOT_LISTED : d;
}

/** Build a Candidate from loose fields. Returns null when title/start are missing. */
export function makeCandidate(f, src) {
	if (!f.title || !f.start || !/^\d{4}-\d{2}-\d{2}$/.test(f.start)) return null;
	const c = {
		title: oneLine(stripEmoji(f.title), 200),
		start: f.start,
		end: f.end && f.end >= f.start ? f.end : f.start,
		time: f.time || undefined,
		city: resolveCity({ city: f.city || null, venue: f.venue, url: f.url, online: f.online }),
		venue: f.venue ? oneLine(f.venue, 160) : undefined,
		organiser: oneLine(cleanOrganiser(f.organiser), 120),
		url: f.url || '',
		extraUrls: f.extraUrls ?? [],
		cost: f.cost || null,
		desc: oneLine(f.desc, 600),
		online: !!f.online,
		country: f.country ?? src.country ?? null,
		cancelled: !!f.cancelled,
		sourceId: src.id,
		sourceLabel: src.label ?? src.id,
		sourceType: src.type,
		trust: src.trust,
		role: src.role,
		onlineOk: !!src.onlineOk,
		acceptAll: !!src.acceptAll,
		categoryHint: f.categoryHint,
	};
	c.keys = ledgerKeys(c);
	c.key = c.keys[0];
	return c;
}

// ---- date text parsing (French and English) ----
const FR_MONTHS = {
	janvier: 1, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6, juillet: 7, aout: 8,
	septembre: 9, octobre: 10, novembre: 11, decembre: 12,
	janv: 1, fevr: 2, avr: 4, juil: 7, sept: 9, oct: 10, nov: 11, dec: 12,
};
// German month names: the aieventlist.ai feed (a French-relevant source) writes its dates in German ("1.–3. Dezember 2026").
const DE_MONTHS = { januar: 1, februar: 2, maerz: 3, marz: 3, mai: 5, juni: 6, juli: 7, oktober: 10, dezember: 12, mrz: 3, okt: 10, dez: 12 };
const MON_ALL = { ...MONTHS, ...FR_MONTHS, ...DE_MONTHS };
for (const [k, v] of Object.entries(MONTHS)) MON_ALL[k.slice(0, 3)] = v;
const monthNum = (s) => MON_ALL[fold(s).replace(/\./g, '')];
const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const MON_RE = '(?:[A-Za-zÀ-ÿ]{3,9})\\.?';
const SEP = '(?:au|à|a|[–—-])';

/**
 * Find the first date or date range in free text.
 * French: "12 décembre 2026", "1er décembre 2026", "du 3 au 5 décembre 2026", "3-5 décembre 2026",
 * "28 novembre au 2 décembre 2026", "12/12/2026", "12.12.2026". English: "December 10, 2026", "Dec 10-11, 2026",
 * "10 Dec 2026". ISO: "2026-11-20". Returns { start, end } or null.
 */
export function parseDateText(text) {
	const t = String(text ?? '');
	let m;
	m = new RegExp(`(\\d{1,2})(?:er)?\\s+(${MON_RE})\\s*${SEP}\\s*(\\d{1,2})(?:er)?\\s+(${MON_RE})\\s+(\\d{4})`, 'i').exec(t);
	if (m && monthNum(m[2]) && monthNum(m[4])) return { start: iso(m[5], monthNum(m[2]), m[1]), end: iso(m[5], monthNum(m[4]), m[3]) };
	m = new RegExp(`(\\d{1,2})(?:er)?(?:\\s*${SEP}\\s*(\\d{1,2})(?:er)?)?\\s+(${MON_RE})\\s+(\\d{4})`, 'i').exec(t);
	if (m && monthNum(m[3])) return { start: iso(m[4], monthNum(m[3]), m[1]), end: iso(m[4], monthNum(m[3]), m[2] ?? m[1]) };
	// German: 1.–3. Dezember 2026 | 28. Nov. – 2. Dez. 2026 | 10. November 2026
	m = new RegExp(`(\\d{1,2})\\.\\s*(?:(${MON_RE})\\s*)?[–—-]\\s*(\\d{1,2})\\.\\s*(${MON_RE})\\s*(\\d{4})`).exec(t);
	if (m && monthNum(m[4]) && (!m[2] || monthNum(m[2]))) return { start: iso(m[5], m[2] ? monthNum(m[2]) : monthNum(m[4]), m[1]), end: iso(m[5], monthNum(m[4]), m[3]) };
	m = new RegExp(`(\\d{1,2})\\.\\s*(${MON_RE})\\s*(\\d{4})`).exec(t);
	if (m && monthNum(m[2])) return { start: iso(m[3], monthNum(m[2]), m[1]), end: iso(m[3], monthNum(m[2]), m[1]) };
	if ((m = /\b(\d{1,2})[./](\d{1,2})[./](\d{4})\b/.exec(t))) return { start: iso(m[3], m[2], m[1]), end: iso(m[3], m[2], m[1]) };
	if ((m = /\b(\d{4})-(\d{2})-(\d{2})\b/.exec(t))) return { start: m[0], end: m[0] };
	m = new RegExp(`(${MON_RE})\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:\\s*[–—-]\\s*(\\d{1,2}))?,?\\s+(\\d{4})`).exec(t);
	if (m && monthNum(m[1])) return { start: iso(m[4], monthNum(m[1]), m[2]), end: iso(m[4], monthNum(m[1]), m[3] ?? m[2]) };
	return null;
}

export function costFromPrice({ isFree, priceFrom, priceTo, currency }) {
	if (isFree === true) return 'Free';
	const cur = (currency || 'EUR').toUpperCase();
	if (priceFrom != null && Number(priceFrom) > 0) {
		const amount = Number.isInteger(Number(priceFrom)) ? Number(priceFrom) : Number(priceFrom).toFixed(2);
		if (priceTo != null && Number(priceTo) > Number(priceFrom)) return `From ${cur} ${amount}`;
		return `${cur} ${amount}`;
	}
	return null;
}
