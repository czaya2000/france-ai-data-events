// City detection and grouping. Event `city` values use the usual French name ("Paris", "Aix-en-Provence", "Villeurbanne").
// The place list comes from config/country.mjs (PLACE_TO_CITY): one source of truth for hubs and detection.
import { CITIES, PLACE_TO_CITY } from '../../config/country.mjs';

export const ONLINE = 'Online (FR)';
export const NATIONWIDE = 'Nationwide';

/** lowercase, strip diacritics (accent-insensitive matching), ligatures expanded */
export function fold(s) {
	return String(s ?? '')
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/ß/g, 'ss')
		.replace(/œ/gi, 'oe')
		.replace(/æ/gi, 'ae')
		.toLowerCase();
}
const slugify = (s) => fold(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Display names where title-casing the slug is not enough (accents, apostrophes, capital particles).
const DISPLAY = {
	'la-defense': 'La Défense', 'creteil': 'Créteil', 'evry': 'Évry', 'neuilly-sur-seine': 'Neuilly-sur-Seine',
	'velizy-villacoublay': 'Vélizy-Villacoublay', 'le-kremlin-bicetre': 'Le Kremlin-Bicêtre', 'marne-la-vallee': 'Marne-la-Vallée',
	'ecully': 'Écully', 'labege': 'Labège', 'merignac': 'Mérignac', 'begles': 'Bègles', 'villeneuve-d-ascq': "Villeneuve-d'Ascq",
	'reze': 'Rezé', 'cesson-sevigne': 'Cesson-Sévigné', 'saint-martin-d-heres': "Saint-Martin-d'Hères", 'echirolles': 'Échirolles',
	'saint-etienne': 'Saint-Étienne', 'orleans': 'Orléans', 'nimes': 'Nîmes', 'besancon': 'Besançon', 'chambery': 'Chambéry',
	'evreux': 'Évreux', 'saint-nazaire': 'Saint-Nazaire', 'la-roche-sur-yon': 'La Roche-sur-Yon', 'le-havre': 'Le Havre',
	'le-mans': 'Le Mans', 'la-rochelle': 'La Rochelle', 'les-milles': 'Les Milles', 'marcq-en-baroeul': 'Marcq-en-Barœul',
	'saint-brieuc': 'Saint-Brieuc', 'saint-malo': 'Saint-Malo', 'saint-denis': 'Saint-Denis', 'saint-ouen': 'Saint-Ouen',
	'saint-herblain': 'Saint-Herblain', 'clermont-ferrand': 'Clermont-Ferrand', 'nancy': 'Nancy',
};
const LOWER_PARTS = new Set(['sur', 'en', 'de', 'la', 'le', 'les', 'aux', 'au', 'd', 'sous', 'lez']);
function displayName(slug) {
	if (DISPLAY[slug]) return DISPLAY[slug];
	return slug.split('-').map((p, i) => (i > 0 && LOWER_PARTS.has(p) ? p : p[0].toUpperCase() + p.slice(1))).join('-');
}

// Words that are also ordinary words in English or French: matched only when the WHOLE string is the place
// (a feed city field), never inside a venue sentence or a URL.
const AMBIGUOUS = new Set(['nice', 'tours', 'pau', 'bron', 'biot', 'metz', 'reze', 'arles', 'albi', 'brest', 'caen', 'orsay', 'massy', 'bobigny']);
// Common alternative spellings (folded) -> slug.
const ALIASES = {
	'paris la defense': 'la-defense', 'saint denis': 'saint-denis', 'aix en provence': 'aix-en-provence', 'aix': 'aix-en-provence',
	'sophia antipolis': 'sophia-antipolis', 'sophia': 'sophia-antipolis', 'lille metropole': 'lille', 'marseille 1er': 'marseille',
	'villeneuve d ascq': 'villeneuve-d-ascq', 'saint martin d heres': 'saint-martin-d-heres',
};

const NAMES = []; // [folded needle with spaces, display, slug]
for (const slug of Object.keys(PLACE_TO_CITY)) NAMES.push([slug.replace(/-/g, ' '), displayName(slug), slug]);
for (const [alias, slug] of Object.entries(ALIASES)) NAMES.push([alias, displayName(slug), slug]);
const BY_NEEDLE = new Map(NAMES.map((n) => [n[0], n[1]]));
const DETECTABLE = NAMES.filter((n) => !AMBIGUOUS.has(n[2]) && !AMBIGUOUS.has(n[0]));
const NAME_RE = new RegExp('(?:^|[^a-z])(' + DETECTABLE.map((n) => n[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).sort((a, b) => b.length - a.length).join('|') + ')(?![a-z])');
const NAME_MAP = new Map(DETECTABLE.map((n) => [n[0], n[1]]));
const spaced = (s) => fold(s).replace(/[^a-z0-9]+/g, ' ').trim();

/** First known French place named in `text`, or null. Ambiguous names (Nice, Tours...) are never found inside text. */
export function detectCity(text) {
	const m = NAME_RE.exec(spaced(text));
	return m ? NAME_MAP.get(m[1]) : null;
}

const ONLINE_RE = /\b(online|en ligne|webinaire|webinar|visio(?:conf[ée]rence)?|distanciel|a distance|remote|virtual|virtuel(?:le)?|zoom|teams|live ?stream)\b/i;
/** True when a location string says the event is online ("En ligne", "Webinaire", "Visioconférence", "Zoom"). */
export function isOnlineText(s) {
	const t = fold(s).trim();
	if (!t) return false;
	return ONLINE_RE.test(t) && !detectCity(t);
}

/** Normalise a free-form city value ("Paris 15e", "75008 Paris", "Lyon Cedex 03", "Aix") to the stored name, or keep it trimmed. */
export function canonicalCity(raw) {
	if (!raw) return null;
	let s = String(raw).trim();
	if (!s) return null;
	if (isOnlineText(s) && s.length < 40) return ONLINE;
	s = s.replace(/\b\d{5}\b/g, ' ').replace(/\bcedex\b\s*\d*/gi, ' ').replace(/\b\d{1,2}(?:e|er|eme|ème)\b/gi, ' ').replace(/\s+/g, ' ').replace(/^[\s,-]+|[\s,-]+$/g, '');
	if (!s) return null;
	const whole = BY_NEEDLE.get(spaced(s));
	if (whole) return whole;
	return detectCity(s) ?? s;
}

/** City hub slug for a city name ('paris', ..., 'other-france', 'online', or null if unknown). */
export function hubSlug(city) {
	if (!city) return null;
	if (city === ONLINE) return 'online';
	if (city === NATIONWIDE) return null;
	return PLACE_TO_CITY[slugify(city)] ?? 'other-france';
}

export function hubLabel(city) {
	const slug = hubSlug(city);
	if (!slug) return 'Unknown';
	return CITIES.find((c) => c.slug === slug)?.label ?? 'Other France';
}

/** Cities are compatible when equal, either is unknown/online/nationwide, or both sit in the same hub. */
export function citiesCompatible(a, b) {
	if (!a || !b) return true;
	if (a === ONLINE || b === ONLINE || a === NATIONWIDE || b === NATIONWIDE) return true;
	if (a === b) return true;
	const ha = hubSlug(a), hb = hubSlug(b);
	return ha === hb && ha !== 'other-france';
}

/** Every distinct known French place named in `text` (display names). */
export function citiesIn(text) {
	const re = new RegExp(NAME_RE.source, 'g');
	const out = new Set();
	const t = spaced(text);
	let m;
	while ((m = re.exec(t))) {
		out.add(NAME_MAP.get(m[1]));
		re.lastIndex = m.index + m[0].length - 1; // the lookahead char may start the next match
	}
	return out;
}

const onlyCity = (set) => (set.size === 1 ? Array.from(set)[0] : null);

/** The city a venue string points to, only when it names exactly one known city. */
export const cityFromVenue = (venue) => (venue ? onlyCity(citiesIn(venue)) : null);

/** The city a URL points to (hostname, subdomain or path), only when it names exactly one known city. */
export function cityFromUrl(url) {
	let u;
	try { u = new URL(String(url ?? '').trim()); } catch { return null; }
	let path = u.pathname;
	try { path = decodeURIComponent(path); } catch { /* keep raw */ }
	// A platform host such as "paris.aitinkerers.org" is evidence; "eventbrite.fr/e/ia-a-lyon-123" is too, but only when exactly one city.
	return onlyCity(citiesIn(`${u.hostname} ${path}`));
}

/**
 * Pick the event city. The feed city is overridden when the venue string, or else the URL, names exactly
 * one known city that is not compatible with it (same city or same hub is no conflict).
 * Venue beats URL when both name a city. Online and nationwide events are left alone.
 */
export function resolveCity({ city, venue, url, online } = {}) {
	if (online || city === ONLINE || city === NATIONWIDE) return city ?? null;
	let v = cityFromVenue(venue);
	const u = cityFromUrl(url);
	// A venue that is only the feed city's own name ("Lyon") is no independent evidence.
	if (v && city && isBareCity(venue) && citiesCompatible(city, v)) v = null;
	const evident = v ?? u;
	if (!evident || !city) return city ?? evident ?? null;
	if (citiesCompatible(city, evident)) return city;
	// The feed city and the URL agree against a street-address venue: two sources against one, keep the feed city.
	if (v && u && citiesCompatible(city, u)) return city;
	return evident;
}

/** True when a venue string is nothing but a city name ("Lyon", "Paris, France"). */
function isBareCity(venue) {
	let t = spaced(venue).replace(/\b(france|fr)\b/g, ' ');
	for (const [needle, name] of NAMES) if (citiesIn(venue).has(name)) t = t.split(needle).join(' ');
	return !/[a-z0-9]/.test(t);
}
