import test from 'node:test';
import assert from 'node:assert/strict';
import { dedupe, sameEvent } from '../lib/dedupe.mjs';
import { canonicalUrl, ledgerKeys, normTitle } from '../lib/normalize.mjs';
import { cand } from './helpers.mjs';

// [titleA, cityA, dateA, titleB, cityB, dateB]. Titles are real ones seen in the 21 Nov 2026 feeds (Luma, Brief IA,
// Meetup, Eventbrite, aieventlist, agentconfs): the same event listed by two sources under slightly different names.
const SAME = [
	['Compute! Paris 2026', 'Paris', '2026-11-25', 'Compute! Paris — 2026', 'Paris', '2026-11-25'],
	['GenerationAI Conference Paris 2026', 'La Défense', '2026-12-01', 'GenerationAI Paris 2026', 'Paris', '2026-12-01'],
	['Build It Summit 2026', 'Paris', '2026-12-01', 'Build It Summit', 'La Défense', '2026-12-01'],
	['Cloud Native AI Summit Europe 2026', 'La Défense', '2026-12-02', 'Cloud Native AI Summit Europe', 'Paris', '2026-12-02'],
	['Adopt AI 2026 — Grand Palais Paris', 'Paris', '2026-12-03', 'Adopt AI Grand Palais', 'Paris', '2026-12-03'],
	["Meetup Agents IA — Choix d'architecture et retours de prod entre pairs", 'Paris', '2026-11-26', 'Meetup Agents IA - Choix d’architecture et retours de prod entre pairs', 'Paris', '2026-11-26'],
	['First batch - Nice AI & ML', 'Nice', '2026-11-21', 'First batch', 'Nice', '2026-11-21'],
	['Mindstone Lyon November AI Meetup', 'Lyon', '2026-12-10', 'Mindstone Lyon November AI Meetup', 'Villeurbanne', '2026-12-10'],
	['Soirée IA Générative à Paris', 'Paris', '2026-12-02', 'Soirée IA Générative', 'Paris', '2026-12-03'], // one day apart (timezone shift)
	['Le rendez-vous des AI Builders #13', 'Paris', '2026-11-30', 'Le rendez-vous des AI Builders #13 - Hosted by « Le Wagon »', 'Paris', '2026-11-30'],
	['Hackathon « Désinformation et souveraineté démocratique » Adopt AI', 'Paris', '2026-12-02', 'Hackathon Désinformation et souveraineté démocratique', 'Paris', '2026-12-02'],
	['Lyon Data Science Forum 2026', 'Lyon', '2026-12-05', 'Forum Lyon Data Science', 'Villeurbanne', '2026-12-05'],
	['PyData Global 2026', 'Online (FR)', '2026-12-09', 'PyData Global 2026 (virtual)', 'Paris', '2026-12-09'],
	['Hi!ckathon 2026 | The Hi! PARIS AI & Data Science Challenge', 'Paris', '2026-11-27', 'Hi!ckathon 2026', 'Paris', '2026-11-27'],
	["Future Intelligence : L’IA au service de l’environnement", 'Toulouse', '2026-12-10', "Future Intelligence - L'IA au service de l'environnement", 'Toulouse', '2026-12-10'],
	['Journée Data & IA à Sophia Antipolis', 'Sophia-Antipolis', '2026-12-08', 'Journée Data et IA', 'Valbonne', '2026-12-08'], // same hub
];

const DIFFERENT = [
	['Compute! Paris 2026', 'Paris', '2026-11-25', 'Build It Summit 2026', 'Paris', '2026-11-25'],
	['Meetup Agents IA', 'Paris', '2026-11-26', 'Meetup Agents IA', 'Lyon', '2026-11-26'], // same title, different city
	['Meetup Agents IA #1', 'Paris', '2026-11-26', 'Meetup Agents IA #2', 'Paris', '2027-01-14'], // different dates
	['Data Engineering Meetup', 'Paris', '2026-12-01', 'Data Science Meetup', 'Paris', '2026-12-01'],
	['Atelier IA pour les TPE', 'Lyon', '2026-12-04', 'Atelier IA pour les TPE', 'Bordeaux', '2026-12-04'],
	['Afterwork Data Nice', 'Nice', '2026-12-03', 'Afterwork Data Paris', 'Paris', '2026-12-03'],
	["Sécurité et Internet : Découvrir l'intelligence artificielle", 'Lyon', '2026-12-15', "Sécurité et Internet : Découvrir l'intelligence artificielle", 'Lyon', '2026-11-24'],
	["Café Philo : L'intelligence artificielle nous permet-elle de penser ?", 'Toulouse', '2026-12-08', 'IA et philosophie : conférence', 'Toulouse', '2026-12-08'],
	['Mindstone Lyon November AI Meetup', 'Lyon', '2026-11-12', 'Mindstone Lyon December AI Meetup', 'Lyon', '2026-12-10'],
	['Conférence Intelligence Artificielle', "Les Sables-d'Olonne", '2026-11-26', 'Conférence Intelligence Artificielle', 'Paris', '2026-11-26'],
	['Hackathon IA Santé', 'Paris', '2026-12-05', 'Hackathon IA Climat', 'Paris', '2026-12-05'],
	["Opportunités et risques de l'IA dans l'éducation", 'Online (FR)', '2026-11-24', 'IA et données industrielles', 'Online (FR)', '2026-11-24'],
	['Bootcamp 26 semaines pour apprendre l’IA et entreprendre', 'Online (FR)', '2026-12-01', 'Présentation de la formation en Intelligence Artificielle', 'Online (FR)', '2026-12-01'],
	['dotAI 2027', 'Paris', '2027-10-21', 'RAISE Summit 2027', 'Paris', '2027-07-06'],
];

const ev = (t, c, d, time) => ({ title: t, city: c, start: d, time });

test('dedupe: 16 real positive pairs are the same event', () => {
	assert.ok(SAME.length >= 12);
	for (const [ta, ca, da, tb, cb, db] of SAME) {
		assert.equal(sameEvent(ev(ta, ca, da), ev(tb, cb, db)), true, `${ta} == ${tb}`);
	}
});

test('dedupe: 14 real negative pairs stay separate', () => {
	assert.ok(DIFFERENT.length >= 12);
	for (const [ta, ca, da, tb, cb, db] of DIFFERENT) {
		assert.equal(sameEvent(ev(ta, ca, da), ev(tb, cb, db)), false, `${ta} != ${tb}`);
	}
});

test('dedupe: two sessions of one series on the same day are told apart by start time', () => {
	const a = ev('ChatGPT : Booster le contenu de vos webinaires', 'Online (FR)', '2026-11-24', '10:00');
	const b = ev('ChatGPT : Booster le contenu de vos formations', 'Online (FR)', '2026-11-24', '13:00');
	assert.equal(sameEvent(a, b), false);
	// without times the pair would merge (that is the known limit), and the same listing at the same time still merges
	assert.equal(sameEvent({ ...a, time: undefined }, { ...b, time: undefined }), true);
	assert.equal(sameEvent(a, { ...a, title: 'ChatGPT : Booster le contenu de vos webinaires !', time: '10:00–11:00' }), true);
	// a one-hour disagreement between sources (start vs doors) is tolerated
	assert.equal(sameEvent(ev('Soirée Data Lyon', 'Lyon', '2026-12-01', '18:30'), ev('Soirée Data Lyon x', 'Lyon', '2026-12-01', '19:00')), true);
});

test('normTitle strips years, numbering, French and English stop words and city names', () => {
	assert.equal(normTitle('AI.SUMMIT 2026 Paris'), 'ai summit');
	assert.equal(normTitle('Soirée IA à Paris #12'), 'ia');
	assert.equal(normTitle("L’IA pour les données de santé à Lyon"), 'ia donnees sante');
	assert.equal(normTitle('Événement : Rencontre Données & Analytics (2027)'), 'donnees analytics');
});

test('URL canonicalisation: meetup locale prefix, luma short host, eventbrite country domains, tracking, http/www', () => {
	assert.equal(canonicalUrl('https://www.meetup.com/fr-FR/Paris-AI/events/123456/?utm_source=x'), 'meetup.com/paris-ai/events/123456');
	assert.equal(canonicalUrl('http://meetup.com/paris-ai/events/123456'), 'meetup.com/paris-ai/events/123456');
	assert.equal(canonicalUrl('https://lu.ma/abc123?tk=x'), 'luma.com/abc123');
	assert.equal(canonicalUrl('https://luma.com/abc123/'), 'luma.com/abc123');
	assert.equal(canonicalUrl('https://www.eventbrite.fr/e/mon-evenement-tickets-2003375740770?aff=oddtdtcreator'), 'eventbrite/2003375740770');
	assert.equal(canonicalUrl('https://www.eventbrite.co.uk/e/mon-evenement-tickets-2003375740770'), 'eventbrite/2003375740770');
	assert.equal(canonicalUrl('https://Example.fr/a/b/?utm_campaign=1&id=7#frag'), 'example.fr/a/b?id=7');
});

function mk(over) {
	const c = cand(over);
	c.keys = ledgerKeys(c);
	c.key = c.keys[0];
	return c;
}

test('cluster: best source wins, organiser URL preferred, gaps filled from the others', () => {
	const brief = mk({ title: 'Hi!ckathon 2026', url: 'https://www.briefia.fr/meetups/hickathon-2026', sourceId: 'briefia-meetups', sourceType: 'jsonld', role: 'lead', trust: 'curated', start: '2026-11-27', end: '2026-11-30' });
	const org = mk({ title: 'Hi!ckathon 2026 | The Hi! PARIS AI & Data Science Challenge', url: 'https://hi-paris.fr/event/hickathon-2026', sourceId: 'hi-paris-ics', sourceType: 'ics', trust: 'curated', organiser: 'Hi! PARIS', start: '2026-11-27', end: '2026-11-30', venue: 'Campus Hi! PARIS' });
	const lu = mk({ title: 'Totally Different Event', url: 'https://luma.com/abc', sourceId: 'luma-paris', sourceType: 'luma', start: '2026-11-27' });
	const merges = [];
	const out = dedupe([brief, org, lu], { onMerge: (a, b) => merges.push([a.sourceId, b.sourceId]) });
	assert.equal(out.length, 2);
	const cl = out.find((c) => c.members.length === 2);
	assert.equal(cl.sourceId, 'hi-paris-ics'); // curated organiser beats the lead aggregator
	assert.equal(cl.url, 'https://hi-paris.fr/event/hickathon-2026'); // organiser URL over the aggregator
	assert.deepEqual(cl.sources.sort(), ['briefia-meetups', 'hi-paris-ics']);
	assert.equal(cl.organiser, 'Hi! PARIS');
	assert.equal(merges.length, 1);
});

test('cluster: Meetup record outranks aggregators and Luma', () => {
	const a = mk({ title: 'AI Beavers Meetup', url: 'https://brainberg.eu/x', sourceId: 'brainberg', sourceType: 'brainberg', role: 'lead' });
	const b = mk({ title: 'AI Beavers Meetup', url: 'https://www.meetup.com/ai-beavers/events/1/', sourceId: 'meetup:ai-beavers', sourceType: 'meetup', trust: 'curated' });
	const [one] = dedupe([a, b]);
	assert.equal(one.sourceId, 'meetup:ai-beavers');
	assert.equal(one.url, 'https://www.meetup.com/ai-beavers/events/1/');
	assert.equal(one.trust, 'curated');
});

test('cluster: the same Meetup page listed by two sources merges even when the titles differ', () => {
	const m = mk({ title: 'Soirée Analytics.Club #81', url: 'https://www.meetup.com/paris-big-data/events/317000001/', sourceId: 'meetup:paris-big-data', sourceType: 'meetup', trust: 'curated' });
	const b = mk({ title: 'Analytics Club - mesurer la valeur des données', url: 'https://brainberg.eu/e/x', extraUrls: ['https://www.meetup.com/fr-FR/paris-big-data/events/317000001/?utm_source=bb'], sourceId: 'brainberg', sourceType: 'brainberg', role: 'lead' });
	const out = dedupe([m, b]);
	assert.equal(out.length, 1);
	assert.equal(out[0].sourceId, 'meetup:paris-big-data');
});

test('cluster: a shared agenda page does NOT merge different talks on the same day', () => {
	const a = mk({ title: 'Keynote ouverture', url: 'https://conference.example.fr/agenda', keys: undefined });
	const b = mk({ title: 'Atelier dbt avancé', url: 'https://conference.example.fr/agenda', keys: undefined });
	assert.equal(dedupe([a, b]).length, 2);
});

test('cluster: an Eventbrite id on two country domains is one event', () => {
	const a = mk({ title: 'Mindstone Lyon November AI Meetup', city: 'Lyon', url: 'https://www.eventbrite.fr/e/x-tickets-2003375740770', sourceId: 'eventbrite-lyon', sourceType: 'eventbrite' });
	const b = mk({ title: 'Mindstone Lyon AI night', city: 'Lyon', url: 'https://www.eventbrite.co.uk/e/y-tickets-2003375740770', sourceId: 'briefia-meetups', sourceType: 'jsonld' });
	assert.equal(dedupe([a, b]).length, 1);
});
