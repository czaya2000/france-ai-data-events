// Offline tests for the Monday digest builder and the signup form tags.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { selectEvents, renderDigest, audienceFilters, digestSubject, newTagPayload, previewBody } from '../../scripts/lib/digest.mjs';
import { sampleEvents } from '../../scripts/lib/sample-events.mjs';
import { SUBSCRIBE_ACTION } from '../../src/lib/newsletter.mjs';
import { SITE_URL } from '../../config/country.mjs';

// Links follow the configured site address (GitHub Pages now, frenchdataevents.fr after go-live).
const U = SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ev = (o) => ({
	id: 'x-paris-2026', title: 'Paris Data Meetup', date: '2026-11-25', city: 'Paris', venue: 'Station F',
	format: 'Meetup', topics: [], organiser: 'o', cost: 'Free', url: 'https://example.org', source: 's',
	blurb: 'English only', firstSeen: '2026-11-21', blurb_en: 'English blurb', blurb_fr: 'Texte français', ...o,
});
const OPEN = '{' + '{';
const events = [
	ev({}),
	ev({ id: 'y', title: `Lyon ${OPEN} evil }} {% x %}`, city: 'Lyon', format: 'Conference', blurb_fr: undefined }),
];
const sel = selectEvents(events, { today: '2026-11-23' });

test('subscribe endpoint is the france-data-events embed form', () => {
	assert.equal(SUBSCRIBE_ACTION, 'https://buttondown.com/api/emails/embed-subscribe/france-data-events');
});

test('subjects differ by language and carry the ISO week (S48 in French)', () => {
	assert.match(digestSubject('fr', '2026-11-23'), /S48, 2026/);
	assert.match(digestSubject('fr', '2026-11-23'), /Événements data & IA en France/);
	assert.match(digestSubject('en', '2026-11-23'), /week 48, 2026/);
});

test('French draft: French copy, blurb_fr, root links; English draft: English copy, blurb_en, /en/ links', () => {
	const fr = renderDigest(sel, 'fr');
	const en = renderDigest(sel, 'en');
	assert.match(fr.body, /Les deux prochaines semaines/);
	assert.match(fr.body, /Texte français/);
	assert.match(fr.body, new RegExp(`${U}/events/x-paris-2026/`));
	assert.doesNotMatch(fr.body, new RegExp(`${U}/en/`));
	assert.match(en.body, /Next two weeks/);
	assert.match(en.body, /English blurb/);
	assert.match(en.body, new RegExp(`${U}/en/events/x-paris-2026/`));
	for (const m of [fr, en]) {
		assert.match(m.body, /buttondown-editor-mode: plaintext/);
		assert.match(m.body, /'city-paris' in subscriber\.tags/);
		assert.match(m.body, /'format-meetup' in subscriber\.tags/);
		assert.match(m.body, /'city-lyon' in subscriber\.tags/);
	}
});

test('French email falls back to the English blurb with its own lang attribute', () => {
	const fr = renderDigest(sel, 'fr');
	assert.match(fr.body, /lang="en"[^>]*>English only|lang="en"[^>]*>English blurb/);
});

test('event titles cannot inject template tags', () => {
	const { body } = renderDigest(sel, 'en');
	assert.ok(!body.includes(`${OPEN} evil`));
	assert.ok(!body.includes('{% x'));
	assert.ok(body.includes('&#123;&#123; evil &#125;&#125;'));
});

test('audience filters: en contains lang-en, fr not_contains lang-en, by tag id', () => {
	assert.deepEqual(audienceFilters('en', 'TAGID'), {
		filters: [{ field: 'subscriber.tags', operator: 'contains', value: 'TAGID' }],
		groups: [],
		predicate: 'and',
	});
	assert.deepEqual(audienceFilters('fr', 'TAGID'), {
		filters: [{ field: 'subscriber.tags', operator: 'not_contains', value: 'TAGID' }],
		groups: [],
		predicate: 'and',
	});
	assert.throws(() => audienceFilters('en', undefined));
});

test('create-tag payload has name and the required color; build-digest uses it', () => {
	assert.deepEqual(newTagPayload('lang-en'), { name: 'lang-en', color: '#FAFAFA' });
	const src = readFileSync('scripts/build-digest.mjs', 'utf8');
	assert.ok(src.includes("call('POST', '/tags', newTagPayload(name))"));
});

test('build-digest only makes drafts and sends the three required headers', () => {
	const src = readFileSync('scripts/build-digest.mjs', 'utf8');
	const code = src.replace(/^\s*\/\/.*$/gm, '');
	assert.ok(!/about_to_send/.test(code));
	assert.ok(!/status:\s*'(sent|scheduled)'/.test(code));
	assert.ok(!/Live-Dangerously/.test(code));
	for (const h of ['Authorization', 'X-API-Version', 'Content-Type']) assert.ok(code.includes(h), h);
	assert.ok(code.includes("'2026-04-01'"));
});

test('signup form: language radios default to the page language, one lang tag, city/format tags kept', () => {
	const src = readFileSync('src/components/Subscribe.astro', 'utf8').replace(/<!--[\s\S]*?-->/g, '');
	assert.match(src, /type="radio" name="tag" value=\{`lang-\$\{l\.code\}`\}/);
	assert.match(src, /checked=\{l\.code === locale\}/);
	assert.ok(!/type="hidden" name="tag"/.test(src));
	assert.match(src, /type="checkbox" name="tag" value=\{cityTag/);
	assert.match(src, /type="checkbox" name="tag" value=\{formatTag/);
	assert.ok(!/fetch\(/.test(src));
	assert.match(src, /code: 'fr', label: 'Français'/);
});

test('digest selects only today..today+14 (Paris dates); new-only events are excluded', () => {
	const today = '2026-11-23';
	const mk = (id, date, o = {}) => ev({ id, title: id, date, firstSeen: '2026-01-01', ...o });
	const all = [
		mk('today', '2026-11-23'),
		mk('edge', '2026-12-07'), // today + 14: in
		mk('beyond', '2026-12-08'), // today + 15: out
		mk('beyond-new', '2026-12-20', { firstSeen: '2026-11-22' }), // new but later: out
		mk('inside-new', '2026-11-30', { firstSeen: '2026-11-22' }), // new and inside: in
		mk('past', '2026-11-20'),
	];
	const s = selectEvents(all, { today });
	assert.equal(s.horizon, '2026-12-07');
	assert.deepEqual(s.soon.map((e) => e.id), ['today', 'inside-new', 'edge']);
	assert.equal(s.fresh, undefined);
});

test('rendered digests have no "new this week" section, legend or marker', () => {
	const today = '2026-11-23';
	const all = [
		ev({ id: 'in', title: 'Inside', date: '2026-11-30', firstSeen: '2026-11-22' }),
		ev({ id: 'later', title: 'Later but new', date: '2026-12-20', firstSeen: '2026-11-22' }),
	];
	const s = selectEvents(all, { today });
	for (const locale of ['fr', 'en']) {
		const { body } = renderDigest(s, locale);
		assert.match(body, /events\/in\//);
		assert.ok(!body.includes('events/later/'));
		assert.doesNotMatch(body, /New this week|Nouveau cette semaine|new this week|nouveau cette semaine/);
		assert.doesNotMatch(body, /border-radius:50%/); // the old "new" dot
		assert.equal((body.match(/<h2\b/g) ?? []).length, 1);
	}
});

test('overlap window: ended events out, running ones in, nothing shown before today', () => {
	const today = '2026-11-20';
	const mk = (id, date, endDate) => ev({ id, title: id, date, endDate, firstSeen: '2026-01-01' });
	const all = [
		mk('past', '2026-11-16'),
		mk('ended', '2026-11-16', '2026-11-19'),
		mk('running', '2026-11-18', '2026-11-22'),
		mk('ends-today', '2026-11-19', '2026-11-20'),
		mk('starts-edge', '2026-12-04'),
		mk('beyond', '2026-12-05'),
	];
	const s = selectEvents(all, { today });
	assert.deepEqual(s.soon.map((e) => e.id).sort(), ['ends-today', 'running', 'starts-edge']);
	for (const e of s.soon) assert.ok(e.date >= today, `${e.id} shows ${e.date}`);
	assert.equal(s.soon.find((e) => e.id === 'running').date, today);
	assert.equal(s.soon.find((e) => e.id === 'ends-today').endDate, undefined);
	for (const locale of ['fr', 'en']) {
		const { body } = renderDigest(s, locale);
		assert.ok(!body.includes('events/past/') && !body.includes('events/ended/'));
		assert.doesNotMatch(body, />16</); // no day-16 date spine
	}
});

test('French range text has no double full stop', () => {
	const s = selectEvents([ev({ date: '2026-11-25' })], { today: '2026-11-20' });
	const { body } = renderDigest(s, 'fr');
	assert.doesNotMatch(body, /\.\./);
	assert.match(body, /20 nov\. – 4 déc\./);
	assert.doesNotMatch(renderDigest(s, 'en').body, /\.\./);
});

test('multi-day event shows "jusqu’au" in French and "to" in English', () => {
	const s = selectEvents([ev({ date: '2026-11-25', endDate: '2026-11-27' })], { today: '2026-11-20' });
	assert.match(renderDigest(s, 'fr').body, /jusqu’au 27 nov/);
	assert.match(renderDigest(s, 'en').body, /to 27 Nov/);
});

test('masthead says "French Data Events" (mark + blue accent rule), not the website name', () => {
	for (const locale of ['fr', 'en']) {
		const { body } = renderDigest(sel, locale);
		assert.match(body, />French Data Events</);
		assert.match(body, /border:2px solid #000000/); // the mark frame
		assert.match(body, /height="3"[^>]*background:#1F3A93/); // the 3px accent rule
		assert.ok(!body.includes('#e30613'));
	}
});

test('default look is the full event card with date spine; never a mixed layout', () => {
	const few = selectEvents([ev({ date: '2026-11-25' })], { today: '2026-11-23' });
	for (const locale of ['fr', 'en']) {
		const r = renderDigest(few, locale);
		assert.equal(r.level, 0);
		assert.match(r.body, /font-size:28px;font-weight:600/);
		assert.match(r.body, /width="64"/);
	}
	const many = selectEvents(
		Array.from({ length: 150 }, (_, i) => ev({ id: `e${i}`, title: `Event ${i}`, date: '2026-11-25' })),
		{ today: '2026-11-23' },
	);
	const r = renderDigest(many, 'fr');
	assert.equal((r.body.match(/width="64"/g) ?? []).length, 150); // every event is a full card
	assert.doesNotMatch(r.body, /font-size:15px;">\s*<span/); // no compact row
});

test('preview: Liquid resolved for a reader with no choice; sample events are never real data', () => {
	const s = selectEvents(sampleEvents('2026-11-23'), { today: '2026-11-23' });
	assert.ok(s.soon.length >= 5);
	const out = previewBody(renderDigest(s, 'fr').body);
	assert.ok(!out.includes('{%') && !out.includes('manage_subscription_url'));
	assert.match(out, /Compute! Paris/);
	assert.ok(!/Rien dans vos villes/.test(out)); // the fallback branch is dropped
	for (const e of sampleEvents('2026-11-23')) assert.match(e.url, /^https:\/\/example\.com\//);
});
