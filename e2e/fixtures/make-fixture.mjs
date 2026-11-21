// Regenerates e2e/fixtures/events.json:  node e2e/fixtures/make-fixture.mjs
// Fixture "today" is Wed 2026-11-18, so "this week" is Mon 16 .. Sun 22 Nov (Europe/Paris).
import { writeFileSync } from 'node:fs';

const mk = (id, title, date, endDate, city, format, extra = {}) => ({
	id,
	title,
	date,
	...(endDate ? { endDate } : {}),
	...(extra.time ? { time: extra.time } : {}),
	city,
	venue: 'Salle Fixture',
	format,
	topics: ['AI'],
	organiser: 'Fixture Org',
	cost: 'Free',
	url: 'https://example.org/' + id + '/',
	source: 'fixture',
	blurb: 'Fixture blurb for ' + title + '.',
	blurb_en: 'Fixture blurb for ' + title + '.',
	blurb_fr: 'Description de test pour ' + title + '.',
	firstSeen: '2026-11-01',
});

const events = [
	mk('p-started-earlier', 'Paris Sommet déjà commencé', '2026-11-16', '2026-11-18', 'Paris', 'Conference'), // multi-day, ends today
	mk('p-wed', 'Paris Causerie du mercredi', '2026-11-18', null, 'Paris', 'Meetup', { time: '17:00–18:00' }), // today, over at 18:00 (the page script hides it from then on)
	mk('p-sat', 'Paris Atelier du samedi', '2026-11-21', null, 'Paris', 'Workshop'),
	mk('p-sun', 'Paris Meetup du dimanche', '2026-11-22', null, 'Paris', 'Meetup'), // last day of the week
	mk('p-mon', 'Paris Lundi prochain', '2026-11-23', null, 'Paris', 'Meetup'), // first day of next week
	mk('p-thu', 'Paris Jeudi prochain', '2026-11-26', null, 'Paris', 'Conference'),
	mk('p-running', 'Paris Cycle en cours', '2026-11-02', '2026-12-18', 'Paris', 'Workshop'), // started long ago, still running
	mk('p-sun-span', 'Paris Conférence du week-end', '2026-11-22', '2026-11-24', 'Paris', 'Conference'), // starts Sunday, ends next week
	mk('p-dec', 'Paris Sommet de décembre', '2026-12-03', null, 'Paris', 'Conference'),
	mk('l-thu', 'Lyon Meetup du jeudi', '2026-11-19', null, 'Lyon', 'Meetup'),
	mk('l-next', 'Lyon Atelier semaine prochaine', '2026-11-24', null, 'Villeurbanne', 'Workshop'),
	mk('t-fri', 'Toulouse Webinaire du vendredi', '2026-11-20', null, 'Toulouse', 'Webinar'),
	mk('o-tue', 'En ligne Webinaire du mardi', '2026-11-17', '2026-11-19', 'Online (FR)', 'Webinar'), // started yesterday
	mk('o-dec', 'En ligne Webinaire de décembre', '2026-12-10', null, 'Online (FR)', 'Webinar'),
	mk('b-nov30', 'Bordeaux Fin de mois', '2026-11-30', null, 'Bordeaux', 'Networking'),
	mk('d-dec', 'Dijon Meetup de décembre', '2026-12-01', null, 'Dijon', 'Meetup'),
];
events.sort((a, b) => a.date.localeCompare(b.date));
writeFileSync(new URL('./events.json', import.meta.url), JSON.stringify(events, null, '\t') + '\n');
console.log(events.length + ' fixture events');
