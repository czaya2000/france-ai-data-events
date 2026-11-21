// One-off Buttondown setup, run by .github/workflows/buttondown-setup.yml (workflow_dispatch).
// Uses BUTTONDOWN_API_KEY from the environment only; never prints it.
//   1. creates the lang-fr / lang-en tags if missing (default = French: no tag means French)
//   2. sets the subscribe redirect URLs
//   3. applies buttondown/web.css (+ generated tag placement rules) to every CSS field
//      the newsletter object exposes; anything the API does not expose is listed as skipped.
// Email styling of the digest itself is inline in scripts/lib/digest.mjs (template "classic").
import { readFileSync } from 'node:fs';
import { SITE_URL as SITE, BUTTONDOWN_USERNAME } from '../config/country.mjs';
import { NEWSLETTER_CITIES, NEWSLETTER_FORMATS, cityTag, formatTag } from '../src/lib/newsletter.mjs';
import { LANG_TAGS, newTagPayload } from './lib/digest.mjs';

const API = 'https://api.buttondown.com/v1';
const key = process.env.BUTTONDOWN_API_KEY;
if (!key) {
	console.error('BUTTONDOWN_API_KEY is not set.');
	process.exit(1);
}
const headers = { Authorization: `Token ${key}`, 'Content-Type': 'application/json', 'X-API-Version': '2026-04-01' };
const skipped = [];
const done = [];

async function call(method, path, body) {
	const res = await fetch(`${API}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
	const text = await res.text();
	if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 300)}`);
	return text ? JSON.parse(text) : null;
}
async function listAll(path) {
	const out = [];
	for (let p = path, n = 0; p && n < 20; n++) {
		const j = await call('GET', p);
		out.push(...(j.results ?? []));
		p = j.next ? j.next.replace(API, '') : null;
	}
	return out;
}

const newsletters = await listAll('/newsletters');
const nl = newsletters.find((n) => n.username === BUTTONDOWN_USERNAME);
if (!nl) throw new Error(`No newsletter "${BUTTONDOWN_USERNAME}" for this API key (found: ${newsletters.map((n) => n.username).join(', ') || 'none'}).`);
console.log(`Newsletter: ${nl.username} (${nl.id})`);
console.log(`Newsletter fields: ${Object.keys(nl).sort().join(', ')}`);

// 1. Tags
const tags = await listAll('/tags');
const ids = Object.fromEntries(tags.map((t) => [t.name, t.id]));
for (const name of Object.values(LANG_TAGS)) {
	if (ids[name]) {
		console.log(`tag ${name}: exists`);
		continue;
	}
	try {
		const t = await call('POST', '/tags', newTagPayload(name));
		ids[name] = t.id;
		done.push(`created tag ${name}`);
	} catch (e) {
		skipped.push(`tag ${name}: ${e.message}`);
	}
}

// 2. Redirects
try {
	await call('PATCH', `/newsletters/${nl.id}`, {
		subscription_redirect_url: `${SITE}/subscribe/thanks/`,
		subscription_confirmation_redirect_url: `${SITE}/subscribe/confirmed/`,
	});
	done.push('set subscription redirect URLs');
} catch (e) {
	skipped.push(`redirect URLs: ${e.message}`);
}

// 3. CSS
const rule = (name, column, row) =>
	ids[name] ? `.field-group:has([data-tag-id="${ids[name]}"]) { grid-column: ${column}; grid-row: ${row}; } /* ${name} */` : '';
const placement = [
	...NEWSLETTER_CITIES.map((c, i) => rule(cityTag(c.slug), '1', i + 2)),
	...NEWSLETTER_FORMATS.map((f, i) => rule(formatTag(f.label), '2', i + 2)),
	rule(LANG_TAGS.fr, '1 / -1', 40),
	rule(LANG_TAGS.en, '1 / -1', 41),
].filter(Boolean);
console.log('Placement rules:\n' + placement.join('\n'));
const css = readFileSync(new URL('../buttondown/web.css', import.meta.url), 'utf8') + '\n' + placement.join('\n') + '\n';

const cssFields = Object.keys(nl).filter((k) => /css/i.test(k));
console.log(`CSS-like newsletter fields: ${cssFields.join(', ') || '(none)'}`);
if (!cssFields.length) {
	skipped.push('web/email CSS: the API exposes no CSS field on the newsletter; paste buttondown/web.css into Settings > Web > Custom CSS by hand');
}
for (const f of cssFields) {
	try {
		await call('PATCH', `/newsletters/${nl.id}`, { [f]: css });
		done.push(`set ${f}`);
	} catch (e) {
		skipped.push(`${f}: ${e.message}`);
	}
}

console.log('\nDONE:\n' + (done.map((d) => ' - ' + d).join('\n') || ' (nothing)'));
console.log('\nSKIPPED (do by hand):\n' + (skipped.map((d) => ' - ' + d).join('\n') || ' (nothing)'));
