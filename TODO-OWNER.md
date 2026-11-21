# Owner to-do (French Data Events)

Only things you can do. In order. The site already runs at **https://czaya2000.github.io/france-ai-data-events/** (not indexable on purpose). Everything below is needed for go-live, none of it blocks the preview.

## 1. Buy the domain

1. Go to your registrar. Search `frenchdataevents.fr` (it looked unregistered on 21 Nov 2026 by RDAP; confirm there, premium or reserved names are possible). Buy it, 1 year or more, with privacy/WHOIS protection on.
2. Optional defensive buy: `frenchdataevents.fr` (a `.fr` needs a registrant with an address in the EU/EEA). If bought, set it to redirect to `https://frenchdataevents.fr` at the registrar.

## 2. DNS for GitHub Pages (at the registrar's DNS panel)

Delete any parking A/AAAA records and a `www` CNAME that points at the apex, then add:

- 4 apex `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- 4 apex `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- `www` `CNAME` to `czaya2000.github.io`

## 3. DNS for email (ImprovMX, so `hallo@germandataevents.com` reaches you)

1. Sign up at improvmx.com, add domain `frenchdataevents.fr`.
2. Add the DNS records it shows: 2 `MX` records (`mx1.improvmx.com` priority 10, `mx2.improvmx.com` priority 20) and one `TXT` SPF record (`v=spf1 include:spf.improvmx.com ~all`; merge it if the domain already has an SPF record).
3. Create the alias `contact@` forwarding to your own mailbox. Send a test mail to it.

## 4. Switch the site to the custom domain (the one-line change)

1. In `config/country.mjs` change `const DEFAULT_SITE_URL = GITHUB_PAGES_URL;` to `const DEFAULT_SITE_URL = CUSTOM_DOMAIN_URL;`.
2. Create `public/CNAME` containing exactly `frenchdataevents.fr`.
3. In the same file set `INDEXABLE = true` (removes noindex, opens robots.txt, emits the sitemap).
4. Commit and push to `main`. Then GitHub repo > Settings > Pages > Custom domain = `frenchdataevents.fr` > Save; when the certificate is ready tick **Enforce HTTPS**.
5. Open the site, check one event page and `/en/`.

## 5. Claude secret for the daily refresh

1. In a terminal run `claude setup-token` (same token as Germany works) and copy the output.
2. GitHub repo `czaya2000/france-ai-data-events` > Settings > Secrets and variables > Actions > New repository secret. Name `CLAUDE_CODE_OAUTH_TOKEN`, paste the token.
3. Actions > Daily refresh > Run workflow once. Until the secret exists the workflow skips the Claude step with a notice and keeps the site as is. The token lasts one year: set a reminder.

## 6. Buttondown newsletter

1. Done: newsletter exists with username `french-data-events` (that name is wired in the code; if you pick another, change `BUTTONDOWN_USERNAME` in `config/country.mjs`).
2. Create the tags listed in `buttondown/description.md`, give each a public description, set the accent colour to black (Settings > Appearance), turn on double opt-in.
3. Paste the confirmation and welcome texts from `buttondown/confirmation-email.md` and `welcome-email.md`; check the `{{ confirmation_url }}` variable against Buttondown's docs.
4. Run `node scripts/buttondown-tag-css.mjs` (needs the API key), paste its lines into `buttondown/web.css`, then paste the whole file into Settings > Web > Custom CSS.
5. Settings > Programming > API: create a key, add it as repository secret `BUTTONDOWN_API_KEY`. Until then the Monday draft step skips itself.
6. Redirect URLs (Settings): after the form `https://frenchdataevents.fr/subscribe/thanks/`, after confirmation `https://frenchdataevents.fr/subscribe/confirmed/`.
7. Every Monday two drafts (French, English) appear. Check them, send them yourself. Local previews: `preview/digest-fr.html`, `preview/digest-en.html`.

## 7. Umami analytics

1. Open https://umami-data-events.vercel.app > Settings > Websites > Add website: name `French Data Events`, domain `frenchdataevents.fr`.
2. Done 2026-11-21: website ID `58997630-33d4-4cf2-a171-1178d161205b` is set in `UMAMI_WEBSITE_ID` (`config/country.mjs`); the script is restricted to `frenchdataevents.fr` via data-domains.

## 8. Search Console

After step 4: Google Search Console > add property `frenchdataevents.fr` (DNS TXT verification), submit `https://frenchdataevents.fr/sitemap-index.xml`. Do the same in Bing Webmaster Tools. Put the verification token in `GOOGLE_SITE_VERIFICATION` if you use the meta method.

## 9. FormSubmit activation

After step 3 works and the site is on the domain: open the contact form and the submit-event form once and send a short real message from each. FormSubmit emails an activation link to `hallo@germandataevents.com`; click it. Until then submissions are held.

## 10. Reviews

- A native French speaker should read `src/i18n/fr.ts`, the two legal pages and the newsletter texts once.
- Legal pages are not legal advice. Have a French-speaking jurist skim `/mentions-legales/` and `/confidentialite/`. Specific points to check:
  1. The mentions légales say you gave your identity details to GitHub (LCEN art. 6 III-2). Check your GitHub account details are your real ones. Whether the host's phone number is also required was not verified.
  2. The privacy page says the Umami database on Supabase is in the EU. Confirm the Supabase project region.
  3. FormSubmit publishes no hosting location or transfer mechanism (2019 policy); the page says so. Consider replacing it later.
  4. Provider facts (DPF, SCC, retention) were taken from the German page's research; re-check once.
  5. CNIL address shown is "3 place de Fontenoy, 75007 Paris" (verified); the TSA/Cedex form is not shown.

## 11. Optional

- Replace `public/og-image.png` / favicon with real artwork (current ones are generated: blue accent, thin red band).
- Add places that fall into "Other France" to `PLACE_TO_CITY` in `config/country.mjs` (Éguilles, Martigues, Bouguenais ...).
- Review `data/cache/discovered-groups.json` and `discovered-luma-calendars.json` weekly at first and promote good groups to `curated` in `config/sources.json`.
- Eventbrite may be blocked from GitHub runners (as in Germany); it disables itself for the run on 429/405. A local `npm run pipeline:prepare` run fills it from your own connection.

## GitHub settings already done

Repo is public, Pages enabled with build type `workflow`, workflow permissions read/write. Nothing to do.
