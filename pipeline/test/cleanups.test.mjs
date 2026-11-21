import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cleanOrganiser, registrableDomain, organiserOrDomain, makeCandidate } from '../lib/normalize.mjs';
import { resolveCity, cityFromUrl, cityFromVenue } from '../lib/city.mjs';
import { buildReport } from '../lib/report.mjs';
import { newsletterCity, isNationwide } from '../../src/lib/newsletter.mjs';
import { CITIES } from '../../config/country.mjs';
import { normalise as normaliseIcs } from '../sources/ics.mjs';
import { src } from './helpers.mjs';

test('cleanOrganiser strips feed junk', () => {
	for (const junk of ['Going: 0', 'going: 12', '12 going', 'Attendees: 3', '3 attendees', 'Hosted by', 'Hosted by:', 'Organized by', '42', '  ', '', null, undefined, 'Meetup', 'Eventbrite', 'Luma', 'Brainberg', 'Organizer:']) {
		assert.equal(cleanOrganiser(junk), '', JSON.stringify(junk));
	}
});

test('cleanOrganiser keeps real names and removes prefixes/counters', () => {
	assert.equal(cleanOrganiser('Hi! PARIS'), 'Hi! PARIS');
	assert.equal(cleanOrganiser('Hosted by Compute! Paris'), 'Compute! Paris');
	assert.equal(cleanOrganiser('Organized by: AI Builders'), 'AI Builders');
	assert.equal(cleanOrganiser('AI Builders Going: 3'), 'AI Builders');
	assert.equal(cleanOrganiser('Acme · 12 going'), 'Acme');
	assert.equal(cleanOrganiser('Going Places GmbH'), 'Going Places GmbH');
	assert.equal(cleanOrganiser('Camille Durand'), 'Camille Durand');
});

test('registrableDomain and organiserOrDomain', () => {
	assert.equal(registrableDomain('https://www.hub-franceia.fr/x?y=1'), 'hub-franceia.fr');
	assert.equal(registrableDomain('https://paris.aitinkerers.org/e/1'), 'aitinkerers.org');
	assert.equal(registrableDomain('https://events.example.co.uk/'), 'example.co.uk');
	assert.equal(registrableDomain('not a url'), '');
	assert.equal(organiserOrDomain('Going: 0', 'https://www.hub-franceia.fr/'), 'hub-franceia.fr');
	assert.equal(organiserOrDomain('Real Org', 'https://x.fr/'), 'Real Org');
	assert.equal(organiserOrDomain('', ''), '');
});

test('organiserOrDomain: aggregator domains fall back to "Not listed", real sites keep the domain', () => {
	for (const url of [
		'https://aieventlist.ai/e/1', 'https://agentconfs.com/x', 'https://www.eventbrite.fr/e/123', 'https://eventbrite.co.uk/e/1',
		'https://dev.events/conferences/x', 'https://brainberg.com/e', 'https://hackevents.net/y', 'https://allai.events/z', 'https://www.briefia.fr/meetups/x', 'https://openagenda.com/a/events/b', 'https://www.helloasso.com/e/1',
		'https://lu.ma/abc', 'https://luma.com/abc', 'https://www.meetup.com/g/events/1/',
	]) assert.equal(organiserOrDomain('', url), 'Not listed', url);
	assert.equal(organiserOrDomain('Going: 0', 'https://luma.com/x'), 'Not listed');
	assert.equal(organiserOrDomain('aieventlist.ai', 'https://aieventlist.ai/e/1'), 'Not listed'); // old stored fallback
	assert.equal(organiserOrDomain('Not listed', 'https://hi-paris.fr/'), 'Not listed'); // idempotent
	assert.equal(organiserOrDomain('', 'https://hi-paris.fr/event'), 'hi-paris.fr');
	assert.equal(organiserOrDomain('', 'https://www.afia.asso.fr/x'), 'afia.asso.fr');
	assert.equal(organiserOrDomain('Real Org', 'https://luma.com/x'), 'Real Org');
});

test('organiser display: Not listed is localised, real names untouched', async () => {
	const { localizeOrganiser, organiserUnknown } = await import('../../src/i18n/format.ts');
	assert.notEqual(localizeOrganiser('Not listed', 'fr'), 'Not listed'); // translated, whatever the exact wording
	assert.ok(localizeOrganiser('Not listed', 'fr').length > 3);
	assert.equal(localizeOrganiser('Not listed', 'en'), 'Not listed');
	assert.equal(localizeOrganiser('hi-paris.fr', 'fr'), 'hi-paris.fr');
	assert.ok(organiserUnknown('Not listed') && organiserUnknown('') && !organiserUnknown('X'));
});

test('makeCandidate cleans the organiser', () => {
	const c = makeCandidate({ title: 'T', start: '2026-12-01', organiser: 'Going: 0', city: 'Paris' }, src());
	assert.equal(c.organiser, '');
});

test('hackevents feed "Going: 0" never becomes the organiser; meetup falls back to the group name', () => {
	const ics = (extra) => ({
		calName: extra.calName,
		events: [{ title: 'Event', start: '2026-12-01', end: '2026-12-01', description: extra.desc ?? '', location: '', url: 'https://www.meetup.com/some-group/events/123456/', status: '' }],
	});
	const m = normaliseIcs(ics({ calName: 'Hosted by' }), src({ type: 'meetup', id: 'meetup:some-group', cityHint: 'Paris' }));
	assert.equal(m[0].organiser, 'some-group');
	const h = normaliseIcs(ics({ desc: 'Register: https://x.org/r\nOrganizer: Going: 0' }), src({ type: 'hackevents', id: 'hackevents' }));
	assert.equal(h[0].organiser, '');
});

test('resolveCity: a feed city contradicted by the url path is overridden (echoed venue is no evidence)', () => {
	assert.equal(resolveCity({ city: 'Paris', venue: 'Paris', url: 'https://example.fr/lyon/#x' }), 'Lyon');
	assert.equal(resolveCity({ city: 'Paris', url: 'https://example.fr/lyon/' }), 'Lyon');
});

test('resolveCity: subdomain, venue wins over url, exactly-one rule, online untouched', () => {
	assert.equal(resolveCity({ city: 'Paris', url: 'https://toulouse.aitinkerers.org/p/1' }), 'Toulouse');
	assert.equal(resolveCity({ city: 'Paris', venue: 'La Cordée, Bordeaux', url: 'https://x.org/lille/' }), 'Bordeaux');
	assert.equal(resolveCity({ city: 'Paris', url: 'https://x.org/lyon-marseille-tour/' }), 'Paris');
	assert.equal(resolveCity({ city: 'Paris', venue: 'Lyon et Marseille' }), 'Paris');
	assert.equal(resolveCity({ city: 'Online (FR)', venue: 'Lyon', url: 'https://x.org/lyon/' }), 'Online (FR)');
	assert.equal(resolveCity({ city: 'Paris', online: true, url: 'https://x.org/lyon/' }), 'Paris');
	assert.equal(resolveCity({ city: 'Saclay', url: 'https://x.org/paris/' }), 'Saclay', 'same hub is no conflict');
	assert.equal(resolveCity({ city: 'Lyon', url: 'https://example.com/e/1' }), 'Lyon');
	assert.equal(resolveCity({ city: 'Rennes', venue: 'Nantes', url: 'https://www.example.fr/event/x/' }), 'Nantes');
});

test('resolveCity: feed city and url agreeing against a street venue keep the feed city', () => {
	assert.equal(resolveCity({ city: 'Dijon', venue: '11 rue du Palais, Paris', url: 'https://x.fr/dijon-atelier/' }), 'Dijon');
});

test('cityFromUrl / cityFromVenue need exactly one city', () => {
	assert.equal(cityFromUrl('https://x.org/lyon/'), 'Lyon');
	assert.equal(cityFromUrl('https://x.org/lyonnais'), null);
	assert.equal(cityFromUrl('https://x.org/lyon-paris'), null);
	assert.equal(cityFromVenue('Lyon, Lyon, France'), 'Lyon');
	assert.equal(cityFromVenue(''), null);
});

test('makeCandidate applies city precedence', () => {
	const c = makeCandidate({ title: 'Soirée IA', start: '2026-12-01', city: 'Paris', venue: 'Paris', url: 'https://example.fr/lyon/' }, src());
	assert.equal(c.city, 'Lyon');
});

test('every city in events.json maps to a newsletter city', () => {
	const events = JSON.parse(readFileSync(new URL('../../src/data/events.json', import.meta.url), 'utf8'));
	const unmapped = [...new Set(events.map((e) => e.city))].filter((c) => !isNationwide(c) && newsletterCity(c) === null);
	assert.deepEqual(unmapped, []);
	const groups = new Set(events.map((e) => newsletterCity(e.city)).filter(Boolean));
	const allowed = new Set(CITIES.map((c) => c.slug));
	for (const g of groups) assert.ok(allowed.has(g), g);
});

test('places map to their hub, unknown places to Other France', () => {
	const want = {
		Saclay: 'paris', Palaiseau: 'paris', 'La Défense': 'paris', Villeurbanne: 'lyon', Blagnac: 'toulouse', 'Aix-en-Provence': 'marseille-aix',
		'Sophia-Antipolis': 'nice-sophia', Mérignac: 'bordeaux', "Villeneuve-d'Ascq": 'lille', Meylan: 'grenoble', Dijon: 'other-france', Brest: 'other-france',
	};
	for (const [city, slug] of Object.entries(want)) assert.equal(newsletterCity(city), slug, city);
});

test('report shows disabled sources as disabled, not FAILED', () => {
	const base = {
		today: '2026-11-20', windowDays: 120, bootstrap: false, limit: 0, feedOk: 1, feedTotal: 1, feedDisabled: 1,
		totals: { fetched: 0, inWindow: 0, kept: 0, clusters: 0, known: 0, new: 0, sent: 0, deferred: 0 }, ledgerEntries: 0, pruned: 0,
		sources: [{ id: 'eventbrite-paris', trust: 'noisy', fetched: 0, inWindow: 0, kept: 0, inClusters: 0, primary: 0, disabled: true, reason: 'blocked', ms: 0 }],
		scrape: [], cities: [], otherPlaces: [], drops: {}, topClusters: [], problems: [], discovered: [], notes: [],
	};
	const md = buildReport(base);
	assert.match(md, /disabled: blocked/);
	assert.doesNotMatch(md, /FAILED/);
	assert.match(md, /1 disabled/);
});
