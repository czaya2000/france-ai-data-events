// Tests for the i18n layer: locale paths (with and without a base path), the
// language switch, key parity between fr.ts and en.ts, and the localisation
// of costs and dates. Offline; loads the .ts files through Node's type stripping.
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createLocalePaths, hubPath, legalPath } from '../../src/i18n/paths.mjs';
import { HUBS } from '../../src/lib/hubs.mjs';
import { fr } from '../../src/i18n/fr.ts';
import { en } from '../../src/i18n/en.ts';
import { t, displayCity, formatLabel, hubText, fmt, toLocale } from '../../src/i18n/index.ts';
import { localizeCost, formatDateRange, formatDateCompact, dateSpine, weekRangeLabel, formatNumber } from '../../src/i18n/format.ts';

const BASE = '/france-ai-data-events';
const p = createLocalePaths(BASE);
const root = createLocalePaths('');

test('localePath: French at the root, English under /en/, base respected', () => {
	assert.equal(p.localePath('/', 'fr'), `${BASE}/`);
	assert.equal(p.localePath('/', 'en'), `${BASE}/en/`);
	assert.equal(p.localePath('/events/x/', 'fr'), `${BASE}/events/x/`);
	assert.equal(p.localePath('/events/x/', 'en'), `${BASE}/en/events/x/`);
	assert.equal(p.localePath('/contact/?topic=sponsor', 'en'), `${BASE}/en/contact/?topic=sponsor`);
	assert.equal(p.localePath('/#subscribe', 'fr'), `${BASE}/#subscribe`);
	assert.equal(root.localePath('/', 'en'), '/en/');
	assert.equal(root.localePath('/paris/', 'fr'), '/paris/');
	// A path that already has a prefix or the base is not prefixed twice.
	assert.equal(p.localePath(`${BASE}/en/paris/`, 'en'), `${BASE}/en/paris/`);
});

test('switchLocalePath: home', () => {
	assert.equal(p.switchLocalePath(`${BASE}/`, 'en'), `${BASE}/en/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/`, 'fr'), `${BASE}/`);
	assert.equal(p.switchLocalePath(`${BASE}/`, 'fr'), `${BASE}/`);
	assert.equal(p.switchLocalePath('/', 'en'), `${BASE}/en/`, 'a path without the base works too');
	assert.equal(root.switchLocalePath('/', 'en'), '/en/');
	assert.equal(root.switchLocalePath('/en/', 'fr'), '/');
});

test('switchLocalePath: hub pages map to the translated slug, city slugs stay', () => {
	assert.equal(p.switchLocalePath(`${BASE}/ateliers/`, 'en'), `${BASE}/en/workshops/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/workshops/`, 'fr'), `${BASE}/ateliers/`);
	assert.equal(p.switchLocalePath(`${BASE}/webinaires/`, 'en'), `${BASE}/en/webinars/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/webinars/`, 'fr'), `${BASE}/webinaires/`);
	for (const same of ['conferences', 'meetups', 'networking', 'paris', 'lyon', 'marseille-aix', 'other-france', 'online']) {
		assert.equal(p.switchLocalePath(`${BASE}/${same}/`, 'en'), `${BASE}/en/${same}/`);
		assert.equal(p.switchLocalePath(`${BASE}/en/${same}/`, 'fr'), `${BASE}/${same}/`);
	}
	assert.equal(root.switchLocalePath('/ateliers/', 'en'), '/en/workshops/');
});

test('switchLocalePath: event pages keep the id, query and hash survive', () => {
	assert.equal(p.switchLocalePath(`${BASE}/events/some-id/`, 'en'), `${BASE}/en/events/some-id/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/events/some-id/`, 'fr'), `${BASE}/events/some-id/`);
	assert.equal(
		p.switchLocalePath(`${BASE}/?city=Lyon&format=Meetup#subscribe`, 'en'),
		`${BASE}/en/?city=Lyon&format=Meetup#subscribe`,
	);
	assert.equal(p.switchLocalePath(`${BASE}/en/workshops/?q=ai`, 'fr'), `${BASE}/ateliers/?q=ai`);
});

test('legal pages: mentions légales and confidentialité have English twins', () => {
	assert.equal(p.switchLocalePath(`${BASE}/mentions-legales/`, 'en'), `${BASE}/en/legal-notice/`);
	assert.equal(p.switchLocalePath(`${BASE}/confidentialite/`, 'en'), `${BASE}/en/privacy/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/legal-notice/`, 'fr'), `${BASE}/mentions-legales/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/privacy/`, 'fr'), `${BASE}/confidentialite/`);
	assert.deepEqual(p.alternates('/confidentialite/'), { fr: '/confidentialite/', en: '/en/privacy/' });
	assert.deepEqual(p.alternates('/en/legal-notice/'), { en: '/en/legal-notice/', fr: '/mentions-legales/' });
	assert.deepEqual(['fr', 'en'].map((l) => legalPath('privacy', l)), ['/confidentialite/', '/privacy/']);
	assert.deepEqual(['fr', 'en'].map((l) => legalPath('legal', l)), ['/mentions-legales/', '/legal-notice/']);
	assert.deepEqual(p.alternates(`${BASE}/ateliers/`), { fr: '/ateliers/', en: '/en/workshops/' });
});

test('legal pages: no placeholders or draft banners, owner name present', () => {
	for (const f of ['MentionsLegalesPage', 'ConfidentialitePage']) {
		const src = readFileSync(new URL(`../../src/views/${f}.astro`, import.meta.url), 'utf8');
		assert.doesNotMatch(src, /TODO|Brouillon|Draft\b|class="todo"/, `${f} still has a placeholder or draft banner`);
		assert.ok(src.includes('Marcin Czajkowski'), `${f} lacks the owner name`);
	}
});

test('FORM_ENDPOINT posts to FormSubmit with the contact mailbox', async () => {
	const { FORM_ENDPOINT, CONTACT_EMAIL } = await import('../../config/country.mjs');
	assert.equal(FORM_ENDPOINT, `https://formsubmit.co/${CONTACT_EMAIL}`);
	assert.equal(FORM_ENDPOINT, 'https://formsubmit.co/contact@francedataevents.com');
});

test('switchLocalePath: 404 page', () => {
	assert.equal(p.switchLocalePath(`${BASE}/404.html`, 'en'), `${BASE}/en/404/`);
	assert.equal(p.switchLocalePath(`${BASE}/en/404/`, 'fr'), `${BASE}/404.html`);
});

test('hubPath: every hub has a distinct French and English slug set', () => {
	const frPaths = HUBS.map((h) => hubPath(h, 'fr'));
	const enPaths = HUBS.map((h) => hubPath(h, 'en'));
	assert.equal(new Set(frPaths).size, HUBS.length);
	assert.equal(new Set(enPaths).size, HUBS.length);
	assert.ok(frPaths.includes('/ateliers/') && enPaths.includes('/workshops/'));
	assert.ok(frPaths.includes('/paris/') && enPaths.includes('/paris/'));
});

/* ---- key parity -------------------------------------------------------- */

function shape(value, path = '') {
	const out = [];
	if (Array.isArray(value)) {
		out.push(`${path}: array`);
		value.forEach((v, i) => out.push(...shape(v, `${path}[${i}]`)));
	} else if (typeof value === 'function') {
		out.push(`${path}: function(${value.length})`);
	} else if (value && typeof value === 'object') {
		for (const k of Object.keys(value).sort()) out.push(...shape(value[k], path ? `${path}.${k}` : k));
	} else {
		out.push(`${path}: ${typeof value}`);
	}
	return out;
}

test('fr.ts and en.ts have exactly the same keys, with the same kind of value', () => {
	// placeNames is an open map (stored name -> display name); each language lists only its own differences.
	const { placeNames: _a, ...frRest } = fr;
	const { placeNames: _b, ...enRest } = en;
	assert.deepEqual(shape(frRest), shape(enRest));
});

test('no translated string is empty, except the deliberate ones', () => {
	const empty = (o, path = '') =>
		Object.entries(o).flatMap(([k, v]) =>
			typeof v === 'string'
				? v === '' ? [`${path}${k}`] : []
				: v && typeof v === 'object' && !Array.isArray(v) ? empty(v, `${path}${k}.`) : [],
		);
	// Hubs without nearby places.
	const allowed = new Set(['hub.nearby.online', 'hub.nearby.montpellier']);
	for (const table of [fr, en]) assert.deepEqual(empty(table).filter((k) => !allowed.has(k)), []);
});

test('French text is actually French where the key is plain UI copy', () => {
	for (const key of ['calendarOpen', 'contact']) assert.ok(fr.nav[key]);
	assert.notEqual(fr.nav.calendarOpen, en.nav.calendarOpen);
	assert.equal(fr.calendar.title, 'Ajouter à mon agenda');
	assert.equal(fr.listing.today, 'Aujourd’hui');
	assert.equal(fr.listing.thisWeek, 'Cette semaine');
	assert.equal(fr.listing.thisMonth, 'Ce mois-ci');
	assert.equal(t('fr'), fr);
	assert.equal(t('en'), en);
	assert.equal(toLocale('en'), 'en');
	assert.equal(toLocale(undefined), 'fr');
});

/* ---- display values ---------------------------------------------------- */

test('city and format display names', () => {
	assert.equal(displayCity('Online (FR)', 'fr'), 'En ligne');
	assert.equal(displayCity('Online (FR)', 'en'), 'Online');
	assert.equal(displayCity('Other France', 'fr'), 'Autres villes');
	assert.equal(displayCity('Other France', 'en'), 'Other cities');
	assert.equal(displayCity('Lyon', 'fr'), 'Lyon');
	assert.equal(displayCity('Saclay (Paris)', 'fr'), 'Saclay (Paris)');
	assert.equal(formatLabel('Conference', 'fr'), 'Conférence');
	assert.equal(formatLabel('Workshop', 'fr'), 'Atelier');
	assert.equal(formatLabel('Webinar', 'fr'), 'Webinaire');
	assert.equal(formatLabel('Conference', 'en'), 'Conference');
	for (const f of ['Meetup', 'Networking']) assert.equal(formatLabel(f, 'fr'), f);
});

test('hub wording per language', () => {
	const paris = HUBS.find((h) => h.slug === 'paris');
	const conf = HUBS.find((h) => h.slug === 'conferences');
	assert.equal(hubText(paris, 'en').h1, 'AI & Data Events in Paris');
	assert.equal(hubText(paris, 'fr').h1, 'Événements IA et data à Paris');
	assert.equal(hubText(conf, 'fr').h1, 'Conférences IA et data en France');
	assert.equal(hubText(conf, 'en').h1, 'AI & Data Conferences in France');
	assert.equal(
		t('fr').hub.subFormat(1, hubText(conf, 'fr').one, hubText(conf, 'fr').where),
		'1 conférence à venir partout en France. Liste vérifiée chaque jour.',
	);
	assert.equal(t('fr').hub.noneNow('événements', 'à Paris'), 'Pas d’événements à venir à Paris pour le moment.');
	assert.equal(t('fr').hub.noneNow('conférences', 'en ligne'), 'Pas de conférences à venir en ligne pour le moment.');
	assert.equal(fmt('{n} événements', { n: 3 }), '3 événements');
});

/* ---- cost -------------------------------------------------------------- */

const nb = (s) => s.replace(/[  ]/g, ' ');

test('localizeCost: French', () => {
	assert.equal(localizeCost('Free', 'fr'), 'Gratuit');
	assert.equal(localizeCost('Not listed', 'fr'), 'Non indiqué');
	assert.equal(nb(localizeCost('EUR 49', 'fr')), '49 €');
	assert.equal(nb(localizeCost('From EUR 199', 'fr')), 'dès 199 €');
	assert.equal(nb(localizeCost('EUR 1,200', 'fr')), '1 200 €');
	assert.equal(nb(localizeCost('150 EUR', 'fr')), '150 €');
	assert.equal(nb(localizeCost('EUR 690 excl. VAT', 'fr')), '690 € HT');
	assert.equal(nb(localizeCost('EUR 49.90', 'fr')), '49,90 €');
	assert.equal(nb(localizeCost('Free for members / EUR 25 guests', 'fr')), 'Gratuit pour les membres / 25 € invités');
});

test('localizeCost: English is returned as stored', () => {
	for (const c of ['Free', 'Not listed', 'EUR 49', 'From EUR 199', 'Free for members / EUR 25 guests']) {
		assert.equal(localizeCost(c, 'en'), c);
	}
});

/* ---- dates ------------------------------------------------------------- */

test('date ranges and compact dates per locale', () => {
	assert.equal(formatDateRange('2026-11-12', undefined, 'en'), '12 Nov 2026');
	assert.equal(formatDateRange('2026-11-12', undefined, 'fr'), '12 nov. 2026');
	assert.equal(formatDateRange('2026-11-12', '2026-11-13', 'fr'), '12 nov. 2026 – 13 nov. 2026');
	assert.equal(formatDateCompact('2026-11-12', '2026-11-13', 'en'), '12–13 Nov 2026');
	assert.equal(formatDateCompact('2026-11-12', '2026-11-13', 'fr'), '12–13 nov. 2026');
	assert.equal(formatDateCompact('2026-11-30', '2026-12-02', 'en'), '30 Nov – 2 Dec 2026');
	assert.equal(formatDateCompact('2026-11-30', '2026-12-02', 'fr'), '30 nov. – 2 déc. 2026');
	assert.equal(formatDateCompact('2026-12-30', '2027-01-02', 'en'), '30 Dec 2026 – 2 Jan 2027');
});

test('date spine: weekday and month in the locale, no trailing dots', () => {
	assert.deepEqual(dateSpine('2026-11-19', 'en'), { weekday: 'Thu', day: 19, month: 'Nov' });
	assert.deepEqual(dateSpine('2026-11-19', 'fr'), { weekday: 'jeu', day: 19, month: 'nov' });
	assert.match(dateSpine('2026-03-04', 'fr').month, /^mars/);
	assert.equal(dateSpine('2026-10-05', 'fr').weekday, 'lun');
});

test('week labels and numbers', () => {
	assert.equal(weekRangeLabel('2026-09-07', 'en'), '7 – 13 September');
	assert.equal(weekRangeLabel('2026-09-07', 'fr'), '7 – 13 septembre');
	assert.equal(weekRangeLabel('2026-09-28', 'fr'), '28 septembre – 4 octobre');
	assert.equal(nb(formatNumber(1234, 'fr')), '1 234');
	assert.equal(formatNumber(1234, 'en'), '1,234');
});

test('isoDateIn / today: the date in Europe/Paris, not UTC; SITE_TODAY freezes it', async () => {
	const { isoDateIn, today } = await import('../../src/i18n/format.ts');
	// 23:30 UTC on 22 Nov is already 00:30 on the 23rd in Paris (CET, UTC+1).
	assert.equal(isoDateIn(new Date('2026-11-22T23:30:00Z')), '2026-11-23');
	// Summer time (UTC+2): 22:30 UTC on 30 Jun is 00:30 on 1 Jul.
	assert.equal(isoDateIn(new Date('2026-06-30T22:30:00Z')), '2026-07-01');
	assert.equal(isoDateIn(new Date('2026-03-29T00:30:00Z')), '2026-03-29'); // DST switch day
	const saved = process.env.SITE_TODAY;
	process.env.SITE_TODAY = '2026-11-18';
	assert.equal(today(), '2026-11-18');
	process.env.SITE_TODAY = 'garbage';
	assert.match(today(), /^\d{4}-\d{2}-\d{2}$/);
	if (saved === undefined) delete process.env.SITE_TODAY;
	else process.env.SITE_TODAY = saved;
});

test('contact email is the France mailbox', async () => {
	const { CONTACT_EMAIL } = await import('../../config/country.mjs');
	assert.equal(CONTACT_EMAIL, 'contact@francedataevents.com');
});
