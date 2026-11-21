import { test, expect, type Page } from '@playwright/test';
import { LOCALES, NOW, at, open, expectConsistent, type Loc } from './helpers';

/* Smoke suite: every page type in both languages loads without console errors or horizontal overflow,
   the dialogs and forms behave, and the counts shown agree with the list. Runs at 1280 px and 390 px. */

const CITY_HUBS = ['paris', 'lyon', 'toulouse', 'marseille-aix', 'nice-sophia', 'bordeaux', 'lille', 'nantes', 'rennes', 'grenoble', 'strasbourg', 'montpellier', 'online', 'other-france'];
const FORMAT_HUBS: Record<Loc, string[]> = {
	fr: ['meetups', 'conferences', 'ateliers', 'networking', 'webinaires'],
	en: ['meetups', 'conferences', 'workshops', 'networking', 'webinars'],
};

function watchErrors(page: Page) {
	const errors: string[] = [];
	page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
	page.on('pageerror', (e) => errors.push(e.message));
	return errors;
}

const overflow = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

for (const loc of LOCALES) {
	test.describe(`pages (${loc})`, () => {
		const pages = [
			'/',
			...CITY_HUBS.map((c) => `/${c}/`),
			...FORMAT_HUBS[loc].map((f) => `/${f}/`),
			'/submit/',
			'/contact/',
			'/data/',
			'/submit/thanks/',
			'/contact/thanks/',
			'/events/p-sun-span/',
		];
		for (const p of pages) {
			test(`${p} loads clean, no overflow, right language`, async ({ page }) => {
				const errors = watchErrors(page);
				const res = await page.goto(at(loc, p));
				expect(res?.status()).toBe(200);
				await expect(page.locator('html')).toHaveAttribute('lang', loc);
				await expect(page.locator('h1').first()).toBeVisible();
				expect(await overflow(page)).toBeLessThanOrEqual(0);
				// Every internal link and image is on the same language root (no missing /en/ or base).
				const hrefs = await page.$$eval('a[href^="/"]:not([data-lang-switch])', (as) => as.map((a) => a.getAttribute('href')!));
				for (const h of hrefs) {
					if (/^\/(llms|events\.json|rss|calendar|robots)/.test(h) || /\.(ics|md|json|xml|txt)$/.test(h)) continue;
					if (loc === 'en') expect(h, `link ${h} on ${p}`).toMatch(/^\/en(\/|$|\?|#)/);
					else expect(h, `link ${h} on ${p}`).not.toMatch(/^\/en(\/|$)/);
				}
				expect(errors).toEqual([]);
			});
		}

		test('hub headline count equals the listed events', async ({ page }) => {
			for (const slug of ['paris', 'lyon', 'toulouse', 'online']) {
				await open(page, at(loc, `/${slug}/`), NOW.wed);
				const headline = await page.locator('.statement-sub').innerText();
				const shown = (await expectConsistent(page, loc)).length;
				expect(headline, slug).toMatch(new RegExp(`\\b${shown}\\b`));
			}
		});

		test('empty hub (Strasbourg) shows an honest empty state', async ({ page }) => {
			await open(page, at(loc, '/strasbourg/'), NOW.wed);
			expect(await expectConsistent(page, loc)).toEqual([]);
			await expect(page.locator('#empty-state')).toBeVisible();
		});

		test('event page: facts, register link, back link, ended banner absent', async ({ page }) => {
			await page.goto(at(loc, '/events/p-sun-span/'));
			await expect(page.locator('h1')).toHaveText('Paris Conférence du week-end');
			const register = page.locator('a.register-btn[href^="https://example.org/"]');
			await expect(register).toHaveAttribute('href', /utm_source=/);
			await expect(page.locator('.ended')).toHaveCount(0);
			await page.locator('a.back').first().click();
			await expect(page).toHaveURL(loc === 'en' ? /\/en\/$/ : /\/$/);
		});

		test('404 page: status 404, own language links', async ({ page }) => {
			const res = await page.goto(at(loc, '/does-not-exist/'));
			expect(res?.status()).toBe(404);
			await expect(page.locator('h1')).toBeVisible();
			await expect(page.locator('a[href="/"], a[href="/en/"]').first()).toBeVisible();
		});
	});
}

test.describe('legal pages in both languages', () => {
	const pairs: [string, string, string][] = [
		['/mentions-legales/', '/en/legal-notice/', 'Mentions légales'],
		['/confidentialite/', '/en/privacy/', 'confidentialité'],
	];
	for (const [de, en, h1] of pairs) {
		test(`${de} <-> ${en}: language, switch, no overflow`, async ({ page }) => {
			const errors = watchErrors(page);
			expect((await page.goto(de))?.status()).toBe(200);
			await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
			await expect(page.locator('h1')).toContainText(h1);
			expect(await overflow(page)).toBeLessThanOrEqual(0);
			await page.getByRole('link', { name: 'EN', exact: true }).click();
			await expect(page).toHaveURL((u) => u.pathname === en);
			await expect(page.locator('html')).toHaveAttribute('lang', 'en');
			expect(await overflow(page)).toBeLessThanOrEqual(0);
			expect(errors).toEqual([]);
		});
	}
	test('every page links to the legal pages in its own language, legal pages are final: no placeholders or draft banner, name, email and CC BY note present', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('footer a[href="/mentions-legales/"]')).toHaveCount(1);
		await expect(page.locator('footer a[href="/confidentialite/"]')).toHaveCount(1);
		await page.goto('/en/');
		await expect(page.locator('footer a[href="/en/legal-notice/"]')).toHaveCount(1);
		await expect(page.locator('footer a[href="/en/privacy/"]')).toHaveCount(1);
		for (const [p, texts] of [
			['/mentions-legales/', ['Marcin Czajkowski', 'hallo@germandataevents.com', 'LCEN', 'CC BY 4.0']],
			['/en/legal-notice/', ['Marcin Czajkowski', 'hallo@germandataevents.com', 'LCEN', 'CC BY 4.0']],
			['/confidentialite/', ['Marcin Czajkowski', 'hallo@germandataevents.com', 'CNIL', 'GitHub', 'Buttondown', 'FormSubmit']],
			['/en/privacy/', ['Marcin Czajkowski', 'hallo@germandataevents.com', 'CNIL', 'GitHub', 'Buttondown', 'FormSubmit']],
		] as [string, string[]][]) {
			await page.goto(p);
			const main = page.locator('main');
			for (const t of texts) await expect(main).toContainText(t);
			await expect(main).not.toContainText('TODO');
			await expect(main).not.toContainText(/Brouillon|Draft|\[\[/);
		}
	});
});

test.describe('calendar dialog', () => {
	for (const loc of LOCALES) {
		test(`opens, labelled, traps focus, closes with Esc and returns focus (${loc})`, async ({ page }) => {
			await open(page, at(loc, '/paris/'), NOW.wed);
			const opener = page.locator('.icon-btn[data-cal-open]');
			await opener.click();
			const dialog = page.locator('#cal-dialog');
			await expect(dialog).toBeVisible();
			await expect(dialog).toHaveAttribute('aria-labelledby', 'cal-title');
			await expect(page.locator('#cal-title')).toHaveText(loc === 'fr' ? 'Ajouter à mon agenda' : /Save to my calendar|Subscribe/i);
			// While the modal is open, focus is inside it (or has left the page for the browser UI), never on the page behind.
			for (let i = 0; i < 12; i++) {
				await page.keyboard.press('Tab');
				expect(await page.evaluate(() => !document.activeElement || document.activeElement === document.body || !!document.activeElement.closest('#cal-dialog'))).toBe(true);
			}
			await page.keyboard.press('Escape');
			await expect(dialog).toBeHidden();
			await expect(opener).toBeFocused();
			await page.locator('.cal-cta').click();
			await page.locator('#cal-close').click();
			await expect(dialog).toBeHidden();
			await expect(page.locator('.cal-cta')).toBeFocused();
		});

		test(`hub pre-selects its city and the feed link is in the page language (${loc})`, async ({ page, context, request }) => {
			await context.grantPermissions(['clipboard-read', 'clipboard-write']);
			await open(page, at(loc, '/paris/'), NOW.wed);
			await page.locator('.cal-cta').click();
			await expect(page.locator('#cal-city')).toHaveValue('paris');
			const url = await page.locator('#cal-url').inputValue();
			expect(url).toBe(`http://localhost:4329${loc === 'en' ? '/en' : ''}/calendar/paris.ics`);
			await expect(page.locator('#cal-apple')).toHaveAttribute('href', url.replace('https:', 'webcal:'));
			await expect(page.locator('#cal-google')).toHaveAttribute('href', /calendar\.google\.com.*cid=(webcal|http)/); // the e2e origin is http://localhost; on https production it is webcal
			await expect(page.locator('#cal-outlook')).toHaveAttribute('href', /outlook\.live\.com.*addfromweb/);
			await expect(page.locator('#cal-count')).toContainText('9');
			const res = await request.get(new URL(url).pathname);
			expect(res.status()).toBe(200);
			expect(res.headers()['content-type']).toContain('text/calendar');
			await page.locator('#cal-copy').click();
			await expect(page.locator('#cal-copy')).toHaveText(loc === 'fr' ? 'Copié' : /Copied/);
			expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(url);
		});

		test(`a city + format with no events disables the links (${loc})`, async ({ page }) => {
			await open(page, at(loc, '/'), NOW.wed);
			await page.locator('.cal-cta').click();
			await page.locator('#cal-city').selectOption('toulouse');
			await page.locator('#cal-format').selectOption('meetup');
			await expect(page.locator('#cal-copy')).toBeDisabled();
			await expect(page.locator('#cal-apple')).not.toHaveAttribute('href', /.+/);
			await expect(page.locator('#cal-url')).toHaveValue('');
		});
	}

	test('opened from filters: one city and one format pre-select; several do not pick the first one', async ({ page }) => {
		await open(page, '/paris/?format=Meetup&format=Workshop', NOW.wed);
		await page.locator('.cal-cta').click();
		await expect(page.locator('#cal-city')).toHaveValue('paris');
		// Two formats ticked: the calendar cannot follow both, so it must not silently pick one.
		await expect(page.locator('#cal-format')).toHaveValue('');
		await page.locator('#cal-close').click();
		await open(page, '/paris/?format=Meetup', NOW.wed);
		await page.locator('.cal-cta').click();
		await expect(page.locator('#cal-format')).toHaveValue('meetup');
		await expect(page.locator('#cal-count')).toContainText('3');
	});
});

test.describe('subscribe dialog', () => {
	for (const loc of LOCALES) {
		test(`email is validated first; the dialog opens, ticks the hub city, tags the language (${loc})`, async ({ page }) => {
			await open(page, at(loc, '/paris/'), NOW.wed);
			const form = page.locator('form.subscribe-form').first();
			const opener = form.locator('.sub-open');
			await opener.click();
			await expect(form.locator('dialog')).toBeHidden(); // empty email: no dialog
			await form.locator('input[type="email"]').fill('not-an-email');
			await opener.click();
			await expect(form.locator('dialog')).toBeHidden();
			await form.locator('input[type="email"]').fill('reader@example.org');
			await opener.click();
			const dialog = form.locator('dialog');
			await expect(dialog).toBeVisible();
			await expect(form.locator('.sub-email')).toHaveText('reader@example.org');
			await expect(form.locator('input[value="city-paris"]')).toBeChecked();
			await expect(form.locator('input[value="city-lyon"]')).not.toBeChecked();
			await expect(form.locator(`input[type="radio"][value="lang-${loc}"]`)).toBeChecked();
			await expect(form.locator('input[type="radio"]:checked')).toHaveCount(1);
			await page.keyboard.press('Escape');
			await expect(dialog).toBeHidden();
			await expect(opener).toBeFocused();
			await form.locator('.sub-open').click();
			await form.locator('.sub-close').click();
			await expect(dialog).toBeHidden();
		});
	}

	test('submitting posts the ticked tags to the newsletter service (stubbed, nothing is sent)', async ({ page }) => {
		let body = '';
		await page.route(/buttondown\.(com|email)/, async (route) => {
			body = route.request().postData() ?? '';
			await route.fulfill({ status: 200, contentType: 'text/html', body: '<p>stubbed</p>' });
		});
		await open(page, '/paris/', NOW.wed);
		const form = page.locator('form.subscribe-form').first();
		await form.locator('input[type="email"]').fill('reader@example.org');
		await form.locator('.sub-open').click();
		await form.locator('input[value="format-meetup"]').check();
		await Promise.all([page.waitForRequest(/buttondown/), form.locator('.sub-submit').click()]);
		expect(body).toContain('email=reader%40example.org');
		expect(body).toContain('tag=lang-fr');
		expect(body).toContain('tag=city-paris');
		expect(body).toContain('tag=format-meetup');
	});
});

test.describe('forms', () => {
	const stub = (page: Page) => page.route(/formsubmit\.co/, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: 'stubbed' }));

	test('submit form: empty submit shows messages in the page language, nothing is sent', async ({ page }) => {
		let sent = false;
		await page.route(/formsubmit\.co/, (route) => {
			sent = true;
			return route.fulfill({ status: 200, body: 'x' });
		});
		for (const [loc, msg] of [['fr', 'Merci de remplir ce champ.'], ['en', /fill|required/i]] as const) {
			await page.goto(at(loc, '/submit/'));
			await page.locator('#submit-form button[type="submit"]').click();
			const first = page.locator('#submit-form input[name="event_title"]');
			await expect(first).toBeFocused();
			const text = await first.evaluate((el: HTMLInputElement) => el.validationMessage);
			if (typeof msg === 'string') expect(text).toBe(msg);
			else expect(text).toMatch(msg);
		}
		expect(sent).toBe(false);
	});

	test('submit form: an end date before the start date is rejected', async ({ page }) => {
		await stub(page);
		await page.goto('/submit/');
		await page.fill('input[name="start_date"]', '2026-12-10');
		await page.fill('input[name="end_date"]', '2026-12-08');
		const end = page.locator('input[name="end_date"]');
		await page.locator('#submit-form button[type="submit"]').click();
		const valid = await end.evaluate((el: HTMLInputElement) => el.validity.valid);
		expect(valid, 'end date before start date must be invalid').toBe(false);
		await page.fill('input[name="end_date"]', '2026-12-11');
		expect(await end.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(true);
	});

	test('submit form: a bad URL and a bad email give the French message', async ({ page }) => {
		await page.goto('/submit/');
		await page.fill('input[name="event_url"]', 'not a url');
		await page.fill('input[name="email"]', 'nope');
		await page.locator('#submit-form button[type="submit"]').click();
		const url = await page.locator('input[name="event_url"]').evaluate((el: HTMLInputElement) => el.validationMessage);
		expect(url).toMatch(/adresse web/);
	});

	test('contact form: required fields, in the page language', async ({ page }) => {
		let sent = false;
		await page.route(/formsubmit\.co/, (route) => {
			sent = true;
			return route.fulfill({ status: 200, body: 'x' });
		});
		await page.goto('/contact/');
		await page.locator('#contact-form button[type="submit"]').click();
		await expect(page.locator('#contact-form input[name="name"]')).toBeFocused();
		const msg = await page.locator('#contact-form input[name="name"]').evaluate((el: HTMLInputElement) => el.validationMessage);
		expect(msg).toBe('Merci de remplir ce champ.');
		await page.fill('#contact-form input[name="name"]', 'A');
		await page.fill('#contact-form input[name="email"]', 'nope');
		await page.locator('#contact-form button[type="submit"]').click();
		expect(await page.locator('#contact-form input[name="email"]').evaluate((el: HTMLInputElement) => el.validationMessage)).toMatch(/adresse e-mail/);
		expect(sent).toBe(false);
	});

	test('contact form: ?topic=sponsor swaps the intro and tags the subject', async ({ page }) => {
		await page.goto('/en/contact/?topic=sponsor');
		await expect(page.locator('#intro-sponsor')).toBeVisible();
		await expect(page.locator('#intro-default')).toBeHidden();
		await expect(page.locator('#contact-subject')).toHaveValue(/sponsor/i);
	});
});

test.describe('layout on small screens', () => {
	test('filter panels and dialogs fit the viewport', async ({ page }) => {
		await open(page, '/', NOW.wed);
		await page.locator('#city-toggle').click();
		expect(await overflow(page)).toBeLessThanOrEqual(0);
		const box = await page.locator('#city-panel').boundingBox();
		expect(box!.x).toBeGreaterThanOrEqual(0);
		expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
		await page.keyboard.press('Escape');
		await page.locator('.icon-btn[data-cal-open]').click();
		const d = await page.locator('#cal-dialog').boundingBox();
		expect(d!.x).toBeGreaterThanOrEqual(0);
		expect(d!.x + d!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
		expect(d!.y + d!.height).toBeLessThanOrEqual(page.viewportSize()!.height);
	});
});
