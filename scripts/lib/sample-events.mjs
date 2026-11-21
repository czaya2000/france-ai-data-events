// SAMPLE events for the local digest preview only (npm run digest:preview, when events.json is empty).
// Invented, relative to `today`; never written to the data file, never sent.
import { addDays } from './digest.mjs';

const RAW = [
	{ offset: 1, title: 'Compute! Paris : retours d’expérience sur les agents LLM', city: 'Paris', time: '19:00–21:00', format: 'Meetup', organiser: 'Compute! Paris', cost: 'Free', en: 'Evening talks on putting LLM agents into production, with a Q&A.', fr: 'Soirée de présentations sur la mise en production d’agents LLM, suivie d’un échange avec le public.' },
	{ offset: 3, title: 'Lyon Data Science : dbt et qualité des données', city: 'Lyon', time: '18:30', format: 'Meetup', organiser: 'Lyon Data Science', cost: 'Free', en: 'Practical session on testing data models with dbt.', fr: 'Séance pratique sur les tests de modèles de données avec dbt.' },
	{ offset: 6, title: 'IA & santé : atelier RAG', city: 'Toulouse', time: '14:00–17:30', format: 'Workshop', organiser: 'Toulouse Tech Hub', cost: 'EUR 45', en: 'Hands-on workshop building a retrieval-augmented assistant.', fr: 'Atelier pratique pour construire un assistant avec recherche documentaire (RAG).' },
	{ offset: 8, title: 'Webinaire : gouvernance des données en 2027', city: 'Online (FR)', time: '12:30', format: 'Webinar', organiser: 'Hub France IA', cost: 'Free', en: 'Webinar on data governance priorities for the year ahead.', fr: 'Webinaire sur les priorités de gouvernance des données pour l’année à venir.' },
	{ offset: 10, title: 'Nice Data Meetup : Snowflake en pratique', city: 'Sophia Antipolis', time: '18:00', format: 'Meetup', organiser: 'Club Data Nice', cost: 'Not listed', en: 'Customer talks on running Snowflake in production.', fr: 'Retours de clients sur l’exploitation de Snowflake en production.' },
	{ offset: 12, end: 13, title: 'Sommet IA appliquée (exemple)', city: 'Paris', time: '09:00–18:00', format: 'Conference', organiser: 'Exemple Events', cost: 'From EUR 199', en: 'Two-day conference on applied AI.', fr: 'Conférence de deux jours sur l’IA appliquée.' },
];

export function sampleEvents(today) {
	return RAW.map((r, i) => ({
		id: `sample-${i + 1}`,
		title: r.title,
		date: addDays(today, r.offset),
		...(r.end ? { endDate: addDays(today, r.end) } : {}),
		time: r.time,
		city: r.city,
		format: r.format,
		topics: ['Sample'],
		organiser: r.organiser,
		cost: r.cost,
		url: `https://example.com/sample-${i + 1}`,
		source: 'Sample',
		blurb: r.en,
		blurb_en: r.en,
		blurb_fr: r.fr,
		firstSeen: today,
	}));
}
