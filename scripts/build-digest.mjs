// Builds the weekly digest and saves it in Buttondown as TWO DRAFTS: a French
// email and an English one, from the same event data.
//
// Audience (Buttondown API 2026-04-01 `filters`, with tag IDs from GET /v1/tags):
//   English draft: subscribers who have the tag lang-en.
//   French draft:  subscribers who do not have lang-en (so lang-fr, and anyone
//                  with no language tag, get French).
// Inside each email, Liquid conditions on city-<slug> / format-<slug> tags show
// each reader only the matching events (src/lib/newsletter.mjs). Rendering lives
// in scripts/lib/digest.mjs.
//
//   npm run digest:preview                              # writes preview/digest-fr.html + digest-en.html, no API calls
//   node scripts/build-digest.mjs --dry-run             # subjects + summary, no API calls
//   node scripts/build-digest.mjs --dry-run --show-body # also print both bodies
//   BUTTONDOWN_API_KEY=... node scripts/build-digest.mjs   # create the drafts
//
// Options:
//   --preview       write preview/digest-<locale>.html (shows what a reader with no tag choice sees).
//                   If src/data/events.json has nothing in the window, a built-in SAMPLE of French events
//                   is used and the pages carry a "sample data" banner; those are never to be sent.
//                   No API calls, no key needed. Implies --dry-run.
//   --dry-run       print, don't call the API
//   --show-body     with --dry-run: print the HTML bodies too
//   --ahead=N       include events from today through today + N days (default 14)
//   --today=YYYY-MM-DD   pretend today is this date (for testing)
//   --from=YYYY-MM-DD    leave out events already over by this date (default today)
//   --replace       if this week's email is still a draft, overwrite its body
//
// Safety: drafts only. This script never sets a status other than "draft", never
// sends the X-Buttondown-Live-Dangerously header and never emails anyone.
// Idempotent: if this week's draft (same subject) exists, nothing is created.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { newsletterCity } from '../src/lib/newsletter.mjs';
import { isoDateIn } from '../src/i18n/format.ts';
import { wallClockIn } from '../src/lib/schedule.mjs';
import { LOCALES, LANG_TAGS, MAX_EVENTS, digestWeekStart, selectEvents, renderDigest, audienceFilters, newTagPayload, previewPage } from './lib/digest.mjs';
import { sampleEvents } from './lib/sample-events.mjs';

const API = 'https://api.buttondown.com/v1';
const API_VERSION = '2026-04-01';

const args = Object.fromEntries(
	process.argv.slice(2).map((a) => {
		const [k, v] = a.replace(/^--/, '').split('=');
		return [k, v ?? true];
	}),
);
const preview = Boolean(args.preview);
const dryRun = Boolean(args['dry-run']) || preview;
// Drafts are built Sunday evening for the owner to send Monday morning, so the digest is
// for the Monday of that week (a Sunday maps to the NEXT Monday). Window = [Monday, Monday + ahead].
const calendarDate = args.today ?? isoDateIn(new Date()); // Europe/Paris date
const today = digestWeekStart(calendarDate);

const select = (events) =>
	selectEvents(events, {
		today,
		ahead: Number(args.ahead ?? 14),
		from: args.from,
		// A pretend --today starts that day at 00:00; otherwise the real Paris time, so events already over are left out.
		now: args.today ? `${today}T00:00:00` : wallClockIn(new Date()),
	});

let sel = select(JSON.parse(readFileSync('src/data/events.json', 'utf8')));
let usingSample = false;
if (preview && sel.soon.length === 0) {
	sel = select(sampleEvents(today));
	usingSample = true;
	console.log('No real events in the window: using the built-in SAMPLE events for the preview.');
}

if (sel.soon.length === 0) {
	console.log(`Nothing in the next ${args.ahead ?? 14} days. No digest this week.`);
	process.exit(0);
}

// --test: "[TEST] " subject prefix; still a draft, never sent. Verified through the API below.
const testMode = Boolean(args.test);
const emails = LOCALES.map((locale) => {
	const m = { locale, ...renderDigest(sel, locale) };
	return testMode ? { ...m, subject: `[TEST] ${m.subject}` } : m;
});

// ---- Summary ----------------------------------------------------------------

const show = (e) =>
	console.log(`  - ${e.date} ${e.city} → ${newsletterCity(e.city) ?? 'everyone'} | ${e.format} | ${e.title}`);
console.log(`Next two weeks (${sel.from} to ${sel.horizon}): ${sel.soon.length}`);
sel.soon.forEach(show);
console.log('');
for (const m of emails) {
	console.log(`Subject (${m.locale}): ${m.subject}`);
	console.log(
		`  top section: ${m.lookName}; ~${m.sizeKb} KB for a reader with no filters (Gmail clips above ~102 KB)` +
			`; audience: lang-en ${m.locale === 'en' ? 'contains' : 'not_contains'}`,
	);
	console.log(`  events shown: ${m.shown} of ${m.shown + m.hidden} (cap MAX_EVENTS = ${MAX_EVENTS})${m.hidden ? `; ${m.hidden} behind the "see all" button` : ''}`);
	console.log(
		`  unfiltered size per look: full cards with blurbs ${m.looksKb[0]} KB, full cards no blurbs ${m.looksKb[1]} KB`,
	);
	if (m.overBudget) console.log('  WARNING: still over budget even without blurbs. Gmail may clip it for readers with no filters.');
}

if (preview) {
	mkdirSync('preview', { recursive: true });
	for (const m of emails) {
		const file = `preview/digest-${m.locale}.html`;
		writeFileSync(file, previewPage(m, m.locale, { sample: usingSample }));
		console.log(`Wrote ${file}`);
	}
}

if (dryRun) {
	if (args['show-body']) for (const m of emails) console.log(`\n----- body (${m.locale}) -----\n${m.body}`);
	console.log('\nDry run: no API calls made.');
	process.exit(0);
}

// ---- Buttondown -------------------------------------------------------------

const key = process.env.BUTTONDOWN_API_KEY;
if (!key) {
	console.log('BUTTONDOWN_API_KEY is not set. Skipping (no drafts created).');
	process.exit(0);
}

// Every call sends exactly these three headers. No Live-Dangerously header, ever.
const headers = {
	Authorization: `Token ${key}`,
	'X-API-Version': API_VERSION,
	'Content-Type': 'application/json',
};

async function call(method, path, body) {
	const res = await fetch(`${API}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
	const text = await res.text();
	let json = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {
		/* not JSON */
	}
	return { ok: res.ok, status: res.status, json, text };
}

const fail = (what, r) => {
	throw new Error(`${what}: HTTP ${r.status} ${r.text.slice(0, 300)}`);
};

/** Tag name -> id, created when missing (Buttondown tag names are unique per newsletter). */
async function ensureTagIds(names) {
	const ids = {};
	let path = '/tags';
	for (let page = 0; path && page < 20; page++) {
		const r = await call('GET', path);
		if (!r.ok) fail('Could not list tags', r);
		for (const tag of r.json?.results ?? []) if (names.includes(tag.name)) ids[tag.name] = tag.id;
		const next = r.json?.next;
		path = next ? next.replace(API, '') : null;
	}
	for (const name of names) {
		if (ids[name]) continue;
		const r = await call('POST', '/tags', newTagPayload(name));
		if (r.ok) ids[name] = r.json.id;
		else if (r.json?.metadata?.tag_id) ids[name] = r.json.metadata.tag_id; // name_already_exists
		else fail(`Could not create tag ${name}`, r);
		console.log(`Tag ${name}: ${r.ok ? 'created' : 'already existed'}.`);
	}
	return ids;
}

/** Create (or, with --replace, update) one draft. Returns a short result line. */
async function saveDraft({ locale, subject, body }, tagIds) {
	const found = await call('GET', `/emails?subject=${encodeURIComponent(subject)}`);
	if (!found.ok) fail('Could not check for an existing digest', found);
	const same = (found.json?.results ?? []).filter((e) => e.subject === subject);

	// archival_mode disabled: the public archive page has no subscriber, so the
	// conditions would show it an empty email. The site itself is the archive.
	// template classic: the plainest layout, so the body's own masthead is the only one.
	const payload = {
		subject,
		body,
		archival_mode: 'disabled',
		template: 'classic',
		filters: audienceFilters(locale, tagIds[LANG_TAGS.en]),
	};

	if (same.length > 0) {
		const draft = same.find((e) => e.status === 'draft');
		if (!args.replace || !draft) {
			return draft
				? `${locale}: a draft with this subject already exists. Run with --replace to update it.`
				: `${locale}: a digest with this subject was already sent or scheduled. Not creating another.`;
		}
		const upd = await call('PATCH', `/emails/${draft.id}`, payload); // no status in an update
		if (!upd.ok) fail(`${locale}: Buttondown refused the update`, upd);
		return `${locale}: draft updated (id ${draft.id}).`;
	}

	const res = await call('POST', '/emails', { ...payload, status: 'draft' });
	if (!res.ok) fail(`${locale}: Buttondown refused the draft`, res);
	return `${locale}: draft created (id ${res.json.id}).`;
}

let failed = false;
try {
	const tagIds = await ensureTagIds(Object.values(LANG_TAGS));
	for (const m of emails) {
		try {
			console.log(await saveDraft(m, tagIds));
		} catch (err) {
			failed = true;
			console.error(err.message);
		}
	}
} catch (err) {
	failed = true;
	console.error(err.message);
}

// --test: prove through the API that both test emails exist and are still drafts.
if (testMode && !failed) {
	for (const m of emails) {
		const r = await call('GET', `/emails?subject=${encodeURIComponent(m.subject)}`);
		const hit = (r.json?.results ?? []).find((e) => e.subject === m.subject);
		const kb = hit ? Math.round(Buffer.byteLength(hit.body ?? '') / 1024) : 0;
		console.log(`VERIFY ${m.locale}: ${hit ? `id ${hit.id}, status ${hit.status}, subject "${hit.subject}", body ${kb} KB` : 'NOT FOUND'}`);
		if (!hit || hit.status !== 'draft') failed = true;
	}
}
if (failed) process.exit(1);
console.log('Drafts only: review and send them from the Buttondown dashboard.');
