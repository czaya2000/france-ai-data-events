// Prints the CSS placement rules for buttondown/web.css (read-only: one GET /v1/tags, nothing is changed).
// Buttondown tag ids only exist once the tags do, so the rules cannot be written in advance.
//
//   PowerShell:  $env:BUTTONDOWN_API_KEY = "..."; node scripts/buttondown-tag-css.mjs
//   Create the tags first by signing up once with every city/format ticked, or by running
//   `node scripts/build-digest.mjs` (it creates lang-fr / lang-en).
//
// Paste the output into buttondown/web.css where the PLACEMENT RULES comment is.

import { NEWSLETTER_CITIES, NEWSLETTER_FORMATS, cityTag, formatTag } from '../src/lib/newsletter.mjs';
import { LANG_TAGS } from './lib/digest.mjs';

const key = process.env.BUTTONDOWN_API_KEY;
if (!key) {
	console.error('Set BUTTONDOWN_API_KEY first (Buttondown > Settings > API). Never commit it.');
	process.exit(1);
}

const API = 'https://api.buttondown.com/v1';
const ids = {};
let path = '/tags';
for (let page = 0; path && page < 20; page++) {
	const res = await fetch(`${API}${path}`, { headers: { Authorization: `Token ${key}`, 'X-API-Version': '2026-04-01' } });
	if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
	const json = await res.json();
	for (const tag of json.results ?? []) ids[tag.name] = tag.id;
	path = json.next ? json.next.replace(API, '') : null;
}

const rule = (name, column, row) =>
	ids[name]
		? `.field-group:has([data-tag-id="${ids[name]}"]) { grid-column: ${column}; grid-row: ${row}; } /* ${name} */`
		: `/* ${name}: tag does not exist yet */`;

const lines = [];
NEWSLETTER_CITIES.forEach((c, i) => lines.push(rule(cityTag(c.slug), '1', i + 2)));
NEWSLETTER_FORMATS.forEach((f, i) => lines.push(rule(formatTag(f.label), '2', i + 2)));
lines.push('/* Language row, below the city/format grid. Pick one; no choice = French. */');
lines.push(rule(LANG_TAGS.fr, '1 / -1', 40));
lines.push(rule(LANG_TAGS.en, '1 / -1', 41));
console.log(lines.join('\n'));
