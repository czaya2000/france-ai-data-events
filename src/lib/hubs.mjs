// Hub pages: one indexable listing per city (/paris/) and per event type
// (/conferences/), built by src/pages/[hub]/index.astro from the same
// component as the homepage (src/components/Listing.astro).
//
// Every hub always has a page, so a link never 404s. A hub with fewer than
// HUB_MIN_EVENTS upcoming events is "thin": its page is noindex, it is left
// out of the sitemap, and nothing links to it. It comes back on its own when
// the count recovers.
//
// Cities are the newsletter's list (newsletter.mjs, config/country.mjs), so a hub, the City
// filter, the calendar feed and the digest tag all mean the same set of events.
//
// Plain .mjs so astro.config.mjs can import it for the sitemap.

import {
	NEWSLETTER_CITIES,
	NEWSLETTER_FORMATS,
	newsletterCity,
	cityTag,
	formatTag,
} from './newsletter.mjs';
import { CITY_NEARBY } from '../../config/country.mjs';

export const HUB_MIN_EVENTS = 5;

// `nearby` lists the smaller places that newsletter.mjs folds into the city,
// so the page says what it covers. Keep it in step with PLACE_TO_CITY.
const CITY_COPY = Object.fromEntries(
	Object.entries(CITY_NEARBY).map(([slug, nearby]) => [slug, { nearby }]),
);

// URL slug and wording per event type. `one` / `many` are used in sentences.
// `slug` is the English URL (under /en/) and the stable key; `slugFr` the French one at the root.
// The wording here is English only (used by the markdown lists); the French wording is in src/i18n/fr.ts.
const FORMAT_COPY = {
	Meetup: { slug: 'meetups', slugFr: 'meetups', plural: 'Meetups', one: 'meetup', many: 'meetups' },
	Conference: {
		slug: 'conferences',
		slugFr: 'conferences',
		plural: 'Conferences',
		one: 'conference',
		many: 'conferences',
	},
	Workshop: { slug: 'workshops', slugFr: 'ateliers', plural: 'Workshops', one: 'workshop', many: 'workshops' },
	Networking: {
		slug: 'networking',
		slugFr: 'networking',
		plural: 'Networking Events',
		one: 'networking event',
		many: 'networking events',
	},
	Webinar: { slug: 'webinars', slugFr: 'webinaires', plural: 'Webinars', one: 'webinar', many: 'webinars' },
};

const cityHubs = NEWSLETTER_CITIES.map((c) => {
	const online = c.slug === 'online';
	const other = c.slug === 'other-france';
	return {
		kind: 'city',
		slug: c.slug,
		slugFr: c.slug,
		path: `/${c.slug}/`,
		label: c.label,
		linkLabel: c.label,
		h1: online
			? 'Online AI & Data Events in France'
			: other
				? 'AI & Data Events in Other French Cities'
				: `AI & Data Events in ${c.label}`,
		where: online ? 'online' : other ? 'in other French cities' : `in ${c.label}`,
		nearby: CITY_COPY[c.slug]?.nearby ?? '',
		one: 'event',
		many: 'events',
		// Pre-ticked in the digest dialog, and pre-chosen in "Save to my calendar".
		tag: cityTag(c.slug),
		// Calendar feed names are slugify(cityGroup(city)): "Online (FR)" -> online-fr.
		calCity: online ? 'online-fr' : c.slug,
		calFormat: '',
		matches: (e) => newsletterCity(e.city) === c.slug,
	};
});

const formatHubs = NEWSLETTER_FORMATS.map((f) => {
	const copy = FORMAT_COPY[f.label];
	return {
		kind: 'format',
		slug: copy.slug,
		slugFr: copy.slugFr,
		path: `/${copy.slug}/`,
		label: f.label,
		linkLabel: copy.plural === 'Networking Events' ? 'Networking' : copy.plural,
		h1: `AI & Data ${copy.plural} in France`,
		where: 'across France',
		nearby: '',
		one: copy.one,
		many: copy.many,
		tag: formatTag(f.label),
		calCity: '',
		calFormat: f.slug,
		matches: (e) => e.format === f.label,
	};
});

export const HUBS = [...cityHubs, ...formatHubs];

/** Number of the given events (plain objects with `city` and `format`) on a hub. */
export function hubCount(hub, events) {
	return events.filter((e) => hub.matches(e)).length;
}

/** True when the hub has enough upcoming events to be indexed and linked to. */
export function isHubLive(hub, events) {
	return hubCount(hub, events) >= HUB_MIN_EVENTS;
}

/** The city hub an event belongs to, or undefined ("Nationwide", unmapped place). */
export function cityHubFor(event) {
	return cityHubs.find((h) => h.matches(event));
}
