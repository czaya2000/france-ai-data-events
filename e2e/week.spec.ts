import { test, expect } from '@playwright/test';
import { LOCALES, NOW, at, open, titles, expectConsistent, tab, TXT } from './helpers';

/* "This week" / "Cette semaine" and "This month" / "Ce mois-ci": calendar week Monday to Sunday and
   calendar month in Europe/Paris, today included, events that already started included, ended events never shown.
   Fixture: e2e/fixtures/events.json. The build's "today" is Wed 2026-11-18; the browser clock is moved per test. */

const sorted = (a: string[]) => [...a].sort();

const BERLIN_WEEK_WED = [
	'Paris Cycle en cours', // started 2 Nov, runs to 18 Dec
	'Paris Sommet déjà commencé', // 16-18 Nov
	'Paris Causerie du mercredi',
	'Paris Atelier du samedi',
	'Paris Meetup du dimanche',
	'Paris Conférence du week-end', // Sun 22 - Tue 24
];

for (const loc of LOCALES) {
	test.describe(`week and month filter (${loc})`, () => {
		test('Paris hub, This week = Monday-Sunday of the current week, not the next 7 days', async ({ page }) => {
			await open(page, at(loc, '/paris/'), NOW.wed);
			await tab(page, loc, 'week').click();
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(sorted(BERLIN_WEEK_WED));
			expect(list).not.toContain('Paris Lundi prochain'); // 23 Nov belongs to next week
			expect(list).not.toContain('Paris Jeudi prochain');
			await expect(tab(page, loc, 'week')).toHaveAttribute('aria-pressed', 'true');
		});

		test('Paris hub, ?when=week from a link gives the same list', async ({ page }) => {
			await open(page, at(loc, '/paris/?when=week'), NOW.wed);
			expect(sorted(await expectConsistent(page, loc))).toEqual(sorted(BERLIN_WEEK_WED));
		});

		test('home, This week lists every city of the current week', async ({ page }) => {
			await open(page, at(loc, '/?when=week'), NOW.wed);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(
				sorted([...BERLIN_WEEK_WED, 'Lyon Meetup du jeudi', 'Toulouse Webinaire du vendredi', 'En ligne Webinaire du mardi']),
			);
		});

		test('Sunday 23:30 Paris: Sunday events are still this week, Monday is not', async ({ page }) => {
			await open(page, at(loc, '/paris/?when=week'), NOW.sunLate);
			const list = await expectConsistent(page, loc);
			// Everything up to Sat 21 Nov is over; Sun 22 and the event spanning into Monday are on.
			expect(sorted(list)).toEqual(sorted(['Paris Cycle en cours', 'Paris Meetup du dimanche', 'Paris Conférence du week-end']));
		});

		test('Monday 00:30 Paris (still Sunday in Los Angeles): the new week has started', async ({ page }) => {
			await open(page, at(loc, '/paris/?when=week'), NOW.monEarly);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(
				sorted(['Paris Cycle en cours', 'Paris Conférence du week-end', 'Paris Lundi prochain', 'Paris Jeudi prochain']),
			);
		});

		test('events that ended before today are never listed, even on a page built earlier', async ({ page }) => {
			await open(page, at(loc, '/paris/'), NOW.monEarly);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(
				sorted(['Paris Cycle en cours', 'Paris Conférence du week-end', 'Paris Lundi prochain', 'Paris Jeudi prochain', 'Paris Sommet de décembre']),
			);
		});

		test('an event ending today is still listed today', async ({ page }) => {
			await open(page, at(loc, '/paris/'), '2026-11-18T23:50:00+01:00');
			expect(await titles(page)).toContain('Paris Sommet déjà commencé');
			await page.clock.setSystemTime(new Date('2026-11-19T00:10:00+01:00'));
			await page.reload();
			await expect(page.locator('#result-count')).not.toBeEmpty();
			expect(await titles(page)).not.toContain('Paris Sommet déjà commencé');
		});

		test('events already over today are hidden by the clock in Paris, not just by date', async ({ page }) => {
			// Built at 00:00 on 18 Nov; the 17:00-18:00 talk is in the HTML and listed during the day...
			await open(page, at(loc, '/paris/'), NOW.wed);
			expect(await titles(page)).toContain('Paris Causerie du mercredi');
			await page.clock.setSystemTime(new Date('2026-11-18T17:59:00+01:00'));
			await page.reload();
			await expect(page.locator('#result-count')).not.toBeEmpty();
			expect(await titles(page)).toContain('Paris Causerie du mercredi');
			// ...and gone once it has ended, while all-day events of the same day stay.
			await page.clock.setSystemTime(new Date(NOW.wedEvening));
			await page.reload();
			await expect(page.locator('#result-count')).not.toBeEmpty();
			const list = await expectConsistent(page, loc);
			expect(list).not.toContain('Paris Causerie du mercredi');
			expect(list).toContain('Paris Sommet déjà commencé');
		});

		test('running events sit under Today with the real end day, later ones stay in their week', async ({ page }) => {
			await open(page, at(loc, '/paris/'), NOW.wed);
			await expectConsistent(page, loc);
			const first = page.locator('.band:not([hidden])').first();
			await expect(first).toHaveAttribute('data-band', 'today');
			await expect(first).toContainText(loc === 'fr' ? 'Aujourd’hui' : 'Today');
			const today = page.locator('.row[data-band="today"]:not([hidden]) .title');
			expect(sorted(await today.allTextContents()).map((x) => x.replace(/\(new\)|\(nouveau\)/, '').trim())).toEqual(
				sorted(['Paris Cycle en cours', 'Paris Sommet déjà commencé', 'Paris Causerie du mercredi']),
			);
			// The date column shows today (18), never the start day (16 / 2), plus the "runs until" note.
			const started = page.locator('.row', { hasText: 'Paris Sommet déjà commencé' }).locator('.spine');
			await expect(started.locator('.day')).toHaveText('18');
			await expect(started.locator('.through')).toHaveText(loc === 'fr' ? /jusqu’au 18 nov/ : 'until 18 Nov');
			const running = page.locator('.row', { hasText: 'Paris Cycle en cours' }).locator('.spine');
			await expect(running.locator('.day')).toHaveText('18');
			await expect(running.locator('.through')).toHaveText(loc === 'fr' ? /jusqu’au 18 déc/ : 'until 18 Dec');
			// An event that starts today has a normal spine and no "runs until" note.
			const talk = page.locator('.row', { hasText: 'Paris Causerie du mercredi' }).locator('.spine');
			await expect(talk.locator('.day')).toHaveText('18');
			await expect(talk.locator('.through')).toHaveCount(0);
			// Later this week stays under the week heading.
			const week = page.locator('.row[data-band="2026-11-16"]:not([hidden]) .title');
			expect(sorted((await week.allTextContents()).map((x) => x.replace(/\(new\)|\(nouveau\)/, '').trim()))).toEqual(
				sorted(['Paris Atelier du samedi', 'Paris Meetup du dimanche', 'Paris Conférence du week-end']),
			);
		});

		test('a page built on 18 Nov, opened on 19 Nov: the running event moves up with its new date', async ({ page }) => {
			await open(page, at(loc, '/paris/'), '2026-11-19T09:00:00+01:00');
			await expectConsistent(page, loc);
			const row = page.locator('.row', { hasText: 'Paris Cycle en cours' });
			await expect(row).toHaveAttribute('data-band', 'today');
			await expect(row.locator('.day')).toHaveText('19');
			// Paris Sommet déjà commencé ended on the 18th.
			expect(await titles(page)).not.toContain('Paris Sommet déjà commencé');
		});

		test('card meta line is the city and the time only, no venue or address', async ({ page }) => {
			await open(page, at(loc, '/paris/'), NOW.wed);
			const talk = page.locator('.row', { hasText: 'Paris Causerie du mercredi' }).locator('.meta');
			await expect(talk).toHaveText('Paris, 17:00–18:00');
			const sat = page.locator('.row', { hasText: 'Paris Atelier du samedi' }).locator('.meta');
			await expect(sat).toHaveText('Paris');
			await open(page, at(loc, '/?when=month'), NOW.wed);
			await expect(page.locator('.row:not([hidden]) .meta', { hasText: 'Salle Fixture' })).toHaveCount(0);
			await expect(page.locator('.row', { hasText: 'Lyon Meetup du jeudi' }).locator('.meta')).toHaveText('Lyon');
		});

		test('This month runs to the last day of the month in Paris', async ({ page }) => {
			await open(page, at(loc, '/?when=month'), NOW.novEnd);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(sorted(['Paris Cycle en cours', 'Bordeaux Fin de mois']));
		});

		test('This month on 1 Dec 00:30 Paris (30 Nov in Los Angeles) is December', async ({ page }) => {
			await open(page, at(loc, '/?when=month'), NOW.decStart);
			const list = await expectConsistent(page, loc);
			expect(sorted(list)).toEqual(
				sorted(['Paris Cycle en cours', 'Paris Sommet de décembre', 'En ligne Webinaire de décembre', 'Dijon Meetup de décembre']),
			);
		});

		test('the current week heading is marked from the visitor clock, not the build date', async ({ page }) => {
			await open(page, at(loc, '/paris/'), NOW.monEarly);
			// The page was built on Wed 18 Nov; on Mon 23 Nov the running series belongs under 23-29 Nov.
			await expectConsistent(page, loc);
			await expect(page.locator('.band.current:not([hidden])')).toHaveCount(1);
			await expect(page.locator('.band.current:not([hidden])')).toContainText(loc === 'fr' ? /23 – 29 novembre/ : '23 – 29 November');
			// The running events sit in the Today group on top; the heading under it is the current week.
			await expect(page.locator('.band:not([hidden])').first()).toHaveAttribute('data-band', 'today');
			await expect(page.locator('.band:not([hidden])').nth(1)).toHaveClass(/current/);
			// ...and nothing is left under the week that is over.
			await expect(page.locator('.band[data-band="2026-11-16"]:not([hidden])')).toHaveCount(0);
		});

		test('All resets the time range', async ({ page }) => {
			await open(page, at(loc, '/paris/?when=week'), NOW.wed);
			await tab(page, loc, 'all').click();
			expect((await expectConsistent(page, loc)).length).toBe(9);
			await expect(page).not.toHaveURL(/when=/);
			expect(TXT[loc].all).toBeTruthy();
		});
	});
}
