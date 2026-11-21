// Everything country-specific lives here. Plain .mjs so Astro, the Node
// scripts (validator, digest, indexnow) and the pipeline can all import it.
//
// Domain: frenchdataevents.fr (public/CNAME must match). The site builds at the domain root.
// INDEXABLE stays false until launch (see TODO-OWNER.md).
export const COUNTRY_CODE = 'FR';
export const COUNTRY_NAME = 'France';
export const TIMEZONE = 'Europe/Paris';
export const CURRENCY = 'EUR';
export const LOCALE = 'fr_FR';

export const SITE_NAME = 'French Data Events';
export const SITE_SHORT = 'French Data Events';

export const CUSTOM_DOMAIN_URL = 'https://frenchdataevents.fr';
export const GITHUB_PAGES_URL = 'https://czaya2000.github.io/france-ai-data-events';
const DEFAULT_SITE_URL = CUSTOM_DOMAIN_URL;
const siteUrl = new URL(process.env.SITE_URL || DEFAULT_SITE_URL);
/** Origin only, no path: Astro's `site`. */
export const SITE_ORIGIN = siteUrl.origin;
/** Path prefix without trailing slash: '' on a custom domain. Astro's `base`. */
export const BASE = siteUrl.pathname.replace(/\/+$/, '');
/** Full site address with the base path, no trailing slash. */
export const SITE_URL = `${SITE_ORIGIN}${BASE}`;
export const SITE_HOST = siteUrl.host;
/** Domain part of calendar UIDs (<event id>@<domain>). Always the future domain, so UIDs never change at go-live. */
export const UID_DOMAIN = new URL(CUSTOM_DOMAIN_URL).hostname;

/** Source repository, used in the fetcher User-Agent until a contact email is set. */
export const REPO_URL = 'https://github.com/czaya2000/france-ai-data-events';

// Not live yet (no domain, no DNS). While false: noindex + robots.txt Disallow + no sitemap + no IndexNow ping.
// Set to true on go-live day (see TODO-OWNER.md).
export const INDEXABLE = false;

// Owner-supplied values (open items are listed in the owner notes file).
export const CONTACT_EMAIL = 'hallo@germandataevents.com';
export const FORM_ENDPOINT = 'https://formsubmit.co/hallo@germandataevents.com';
export const BUTTONDOWN_USERNAME = 'french-data-events';
export const GOOGLE_SITE_VERIFICATION = '';
export const INDEXNOW_KEY = '';
/** Optional analytics. An empty website ID renders no tracking script at all. The owner adds the ID later. */
export const UMAMI_WEBSITE_ID = '58997630-33d4-4cf2-a171-1178d161205b';
/** Self-hosted Umami (Vercel). */
export const UMAMI_SCRIPT_URL = 'https://umami-data-events.vercel.app/script.js';
export const CLOUDFLARE_BEACON_TOKEN = '';
export const LINKEDIN_URL = '';
export const INSTAGRAM_URL = '';

/** Contact string for the fetcher User-Agent: the repo URL (the mailbox is not live yet). */
export const FETCHER_CONTACT = REPO_URL;

export const SITE_TAGLINE =
	"Upcoming AI and data events across France: conferences, meetups and workshops in one place, each checked daily against the organiser's page.";
export const SITE_HEADLINE = 'Discover AI & Data Events Across France';
export const SITE_SUBHEADLINE = 'Conferences, meetups and workshops in one place, checked daily.';
export const SITE_SCOPE =
	`${SITE_NAME} is a curated list of upcoming AI and data events in France: ` +
	'meetups, conferences, workshops, networking evenings and webinars about machine learning, generative AI, ' +
	'data engineering, analytics, data platforms (Databricks, Snowflake, Microsoft Fabric), data governance and applied AI. ' +
	"Every listing links to the organiser's own page, and the list is refreshed every day. " +
	"Registration always happens on the organiser's site.";

/** The twelve headline city hubs, plus Online and Other France. Slugs are stable: they
    become newsletter tags (city-<slug>), hub URLs and calendar feed names. */
export const CITIES = [
	{ slug: 'paris', label: 'Paris' },
	{ slug: 'lyon', label: 'Lyon' },
	{ slug: 'toulouse', label: 'Toulouse' },
	{ slug: 'marseille-aix', label: 'Marseille-Aix' },
	{ slug: 'nice-sophia', label: 'Nice-Sophia' },
	{ slug: 'bordeaux', label: 'Bordeaux' },
	{ slug: 'lille', label: 'Lille' },
	{ slug: 'nantes', label: 'Nantes' },
	{ slug: 'rennes', label: 'Rennes' },
	{ slug: 'grenoble', label: 'Grenoble' },
	{ slug: 'strasbourg', label: 'Strasbourg' },
	{ slug: 'montpellier', label: 'Montpellier' },
	{ slug: 'online', label: 'Online (FR)' },
	{ slug: 'other-france', label: 'Other France' },
];

/** Hub copy per city slug: the smaller places folded into the hub (see PLACE_TO_CITY). English wording;
    the French wording is in src/i18n/fr.ts. */
export const CITY_NEARBY = {
	paris: 'Ile-de-France and the Saclay plateau (Saclay, Palaiseau, Versailles, La Défense, Saint-Denis, Montreuil and more)',
	lyon: 'Villeurbanne and the Lyon area',
	toulouse: 'Blagnac, Labège and Colomiers',
	'marseille-aix': 'Aix-en-Provence, Aubagne and Gardanne',
	'nice-sophia': 'Sophia Antipolis, Valbonne, Antibes and Cannes',
	bordeaux: 'Mérignac, Pessac and Talence',
	lille: 'Villeneuve-d’Ascq, Roubaix and Tourcoing',
	nantes: 'Saint-Herblain',
	rennes: 'Cesson-Sévigné',
	grenoble: 'Meylan and Saint-Martin-d’Hères',
	strasbourg: 'Illkirch-Graffenstaden',
	montpellier: '',
	online: '',
	'other-france': 'Dijon, Clermont-Ferrand, Tours, Angers, Brest, Metz, Nancy, Rouen, Reims, Annecy and more',
};

const hubOf = (slug, places) => Object.fromEntries(places.split(/\s+/).map((p) => [p, slug]));

/** Place slug -> city slug. Event `city` values are stored under the usual French name.
    Places not listed here fall into "other-france" (and warn in `npm run validate`). */
export const PLACE_TO_CITY = {
	...hubOf('paris',
		'paris saclay palaiseau gif-sur-yvette orsay massy versailles boulogne-billancourt issy-les-moulineaux nanterre ' +
		'la-defense courbevoie puteaux levallois-perret montreuil saint-denis creteil villejuif cachan evry courcouronnes ' +
		'montrouge malakoff ivry-sur-seine vincennes saint-ouen clichy neuilly-sur-seine rueil-malmaison velizy-villacoublay ' +
		'guyancourt saint-quentin-en-yvelines marne-la-vallee champs-sur-marne noisy-le-grand cergy bobigny aubervilliers ' +
		'pantin gennevilliers antony bagneux fontenay-aux-roses le-kremlin-bicetre'),
	...hubOf('lyon', 'lyon villeurbanne ecully vaulx-en-velin bron'),
	...hubOf('toulouse', 'toulouse blagnac labege colomiers balma'),
	...hubOf('marseille-aix', 'marseille aix-en-provence aubagne gardanne les-milles eguilles martigues vitrolles'),
	...hubOf('nice-sophia', 'nice sophia-antipolis valbonne antibes cannes biot grasse mougins'),
	...hubOf('bordeaux', 'bordeaux merignac pessac talence begles'),
	...hubOf('lille', 'lille villeneuve-d-ascq roubaix tourcoing marcq-en-baroeul euralille wasquehal'),
	...hubOf('nantes', 'nantes saint-herblain reze bouguenais orvault'),
	...hubOf('rennes', 'rennes cesson-sevigne'),
	...hubOf('grenoble', 'grenoble meylan saint-martin-d-heres echirolles'),
	...hubOf('strasbourg', 'strasbourg illkirch-graffenstaden'),
	...hubOf('montpellier', 'montpellier'),
	...hubOf('other-france',
		'dijon clermont-ferrand tours angers brest metz nancy rouen caen le-havre reims amiens limoges poitiers la-rochelle ' +
		'perpignan toulon avignon nimes pau bayonne annecy chambery saint-etienne orleans besancon mulhouse lorient vannes ' +
		'quimper saint-malo le-mans valence belfort troyes saint-nazaire cherbourg ajaccio bastia la-roche-sur-yon ' +
		'saint-brieuc evreux arles biarritz tarbes albi'),
};

// Pipeline defaults.
export const WINDOW_DAYS = 120;
export const MAX_NEW_CANDIDATES_PER_RUN = 120;
export const MAX_PAGES_PER_RUN = 4;

// Aggregator / ticketing / listing platforms. An event whose organiser is unknown and whose url is on one of
// these gets the literal stored value NOT_LISTED (never the platform domain). Real organiser sites keep the
// registrable-domain fallback. Matched against the registrable domain of the event url.
export const NOT_LISTED = 'Not listed';
export const AGGREGATOR_DOMAINS = [
	'aieventlist.ai', 'agentconfs.com', 'eventbrite.fr', 'eventbrite.com', 'eventbrite.co.uk', 'eventbrite.de', 'eventbrite.ch',
	'eventbrite.nl', 'eventbrite.es', 'eventbrite.it', 'dev.events', 'brainberg.com', 'brainberg.eu', 'hackevents.net',
	'hackevents.org', 'allai.events', 'luma.com', 'lu.ma', 'meetup.com', 'confs.tech', 'bookwhen.com', 'tickettailor.com',
	'eventfrog.ch', 'xing.com', 'linkedin.com', 'facebook.com', 'konfhub.com', 'sessionize.com', 'ti.to', 'tito.io',
	'briefia.fr', 'openagenda.com', 'helloasso.com', 'weezevent.com', 'billetweb.fr', 'yurplan.com', 'digitick.com',
];
