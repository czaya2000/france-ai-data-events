import { test, expect } from '@playwright/test';
import { LOCALES, NOW, at, open } from './helpers';

/* France-specific checks: not indexable yet, Europe/Paris in the calendar feeds, the form and
   newsletter endpoints, French-first language handling, ICS download. */

const FORM = 'https://formsubmit.co/contact@frenchdataevents.fr';

test.describe('not indexable yet (INDEXABLE=false)', () => {
	for (const loc of LOCALES) {
		for (const p of ['/', '/paris/', '/events/p-sun-span/', '/mentions-legales/']) {
			// The legal pages have an English twin under a different slug; skip the mismatched combinations.
			if (loc === 'en' && p === '/mentions-legales/') continue;
			test(`${at(loc, p)} carries noindex`, async ({ page }) => {
				await page.goto(at(loc, p));
				await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
			});
		}
	}
	test('robots.txt disallows everything and there is no sitemap', async ({ request }) => {
		const robots = await (await request.get('/robots.txt')).text();
		expect(robots).toMatch(/Disallow:\s*\/\s*$/m);
		expect((await request.get('/sitemap-index.xml')).status()).toBe(404);
	});
	test('no analytics script while UMAMI_WEBSITE_ID is empty', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('script[data-website-id]')).toHaveCount(0);
	});
});

test.describe('forms markup', () => {
	for (const loc of LOCALES) {
		test(`contact and submit forms post to FormSubmit with the France address (${loc})`, async ({ page }) => {
			for (const [path, id] of [['/contact/', '#contact-form'], ['/submit/', '#submit-form']] as const) {
				await page.goto(at(loc, path));
				const form = page.locator(id);
				await expect(form).toHaveAttribute('action', FORM);
				await expect(form).toHaveAttribute('method', /post/i);
				await expect(form.locator('input[name="_honey"]')).toHaveCount(1);
				const next = await form.locator('input[name="_next"]').getAttribute('value');
				expect(next).toContain(`${loc === 'en' ? '/en' : ''}${path}thanks/`);
			}
		});

		test(`newsletter form posts to Buttondown france-data-events with exactly one language tag (${loc})`, async ({ page }) => {
			await open(page, at(loc, '/paris/'), NOW.wed);
			const form = page.locator('form.subscribe-form').first();
			await expect(form).toHaveAttribute('action', /buttondown\.com\/api\/emails\/embed-subscribe\/france-data-events$/);
			await expect(form.locator('input[type="radio"][value^="lang-"]')).toHaveCount(2);
			const values = await form.locator('input[type="radio"][value^="lang-"]').evaluateAll((els) => els.map((e) => (e as HTMLInputElement).value).sort());
			expect(values).toEqual(['lang-en', 'lang-fr']);
			await expect(form.locator('input[type="radio"]:checked')).toHaveCount(1);
			await expect(form.locator(`input[type="radio"][value="lang-${loc}"]`)).toBeChecked();
			// City and format tags use France slugs.
			await expect(form.locator('input[value="city-toulouse"]')).toHaveCount(1);
			await expect(form.locator('input[value="city-marseille-aix"]')).toHaveCount(1);
			await expect(form.locator('input[value="format-conference"], input[value="format-conferences"]').first()).toHaveCount(1);
		});
	}
});

test.describe('ICS feeds', () => {
	for (const loc of LOCALES) {
		test(`city feed is Europe/Paris with a frenchdataevents.fr UID domain (${loc})`, async ({ request }) => {
			const res = await request.get(at(loc, '/calendar/paris.ics'));
			expect(res.status()).toBe(200);
			expect(res.headers()['content-type']).toContain('text/calendar');
			const ics = await res.text();
			expect(ics).toContain('BEGIN:VCALENDAR');
			expect(ics).toContain('TZID=Europe/Paris');
			expect(ics).not.toMatch(/Europe\/Berlin|Europe\/Zurich/);
			expect(ics).toMatch(/UID:[^\r\n]+@frenchdataevents\.fr/);
			expect((ics.match(/BEGIN:VEVENT/g) || []).length).toBe(9);
			// 17:00 local (Paris) event stays 17:00 in the feed, not shifted to the browser zone.
			expect(ics).toMatch(/DTSTART;TZID=Europe\/Paris:20261118T170000/);
		});

		test(`the online feed uses the online-fr name (${loc})`, async ({ request }) => {
			const res = await request.get(at(loc, '/calendar/online-fr.ics'));
			expect(res.status()).toBe(200);
			expect(await res.text()).toContain('BEGIN:VEVENT');
		});
	}
});

test.describe('language switch', () => {
	test('French is the root, English is /en/, hub and legal slugs map both ways', async ({ page }) => {
		for (const [fr, en] of [
			['/ateliers/', '/en/workshops/'],
			['/webinaires/', '/en/webinars/'],
			['/conferences/', '/en/conferences/'],
			['/mentions-legales/', '/en/legal-notice/'],
			['/confidentialite/', '/en/privacy/'],
			['/paris/', '/en/paris/'],
		]) {
			await page.goto(fr);
			await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
			await expect(page.locator(`link[rel="alternate"][hreflang="en"]`)).toHaveAttribute('href', new RegExp(`${en}$`));
			await page.getByRole('link', { name: 'EN', exact: true }).click();
			await expect(page).toHaveURL((u) => u.pathname === en);
			await page.getByRole('link', { name: 'FR', exact: true }).click();
			await expect(page).toHaveURL((u) => u.pathname === fr);
		}
	});

	test('no German text anywhere on the main pages', async ({ page }) => {
		for (const p of ['/', '/en/', '/paris/', '/contact/', '/submit/', '/data/', '/mentions-legales/', '/confidentialite/']) {
			await page.goto(p);
			const text = await page.locator('body').innerText();
			expect(text, p).not.toMatch(/Impressum|Datenschutz|Deutschland|Veranstalter|Kontakt\b|Germany|German /);
		}
	});

	test('no TODO, Brouillon or Draft on any public page', async ({ page }) => {
		for (const p of ['/', '/en/', '/paris/', '/contact/', '/submit/', '/data/', '/mentions-legales/', '/confidentialite/', '/en/legal-notice/', '/en/privacy/']) {
			await page.goto(p);
			const text = await page.locator('body').innerText();
			expect(text, p).not.toMatch(/TODO|Brouillon|\bDraft\b|\[\[/);
		}
	});
});
