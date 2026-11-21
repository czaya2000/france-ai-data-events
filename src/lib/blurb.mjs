// Which blurb to show for a locale (plain .mjs so the offline tests can import it without Astro).
// 'fr' uses blurb_fr and falls back to the English text; 'en' uses blurb_en, then the legacy blurb.
// Returns { text, lang } where lang is the language the text is actually in.
export function blurbFor(event, locale) {
	if (locale === 'fr' && event.blurb_fr) return { text: event.blurb_fr, lang: 'fr' };
	return { text: event.blurb_en ?? event.blurb ?? '', lang: 'en' };
}
