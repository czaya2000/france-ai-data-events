# French Data Events: build status (21 Nov 2026)

DONE. All five phases are finished and pushed to https://github.com/czaya2000/france-ai-data-events (public).

Live preview: https://czaya2000.github.io/france-ai-data-events/ (French) and /en/ (English). Both answer 200. It is not indexable on purpose (noindex plus robots Disallow).

What is done
- French and English site, 14 city hubs, five format hubs, calendar feeds, JSON/RSS/llms.txt. Blue accent, Swiss look.
- Pipeline with the three new fetchers (jsonld, luma-calendar, openagenda), self-expanding Meetup and Luma discovery, stronger dedupe, Eventbrite with backoff.
- Backlog run done: 199 upcoming events (180 within 8 weeks, the rest to March 2027). 200 candidates rejected, 64 deferred.
- Legal pages (mentions légales, confidentialité) in French and English, no postal address, host GitHub named.
- Newsletter code, Buttondown texts, local previews in preview/ (digest-fr.html, digest-en.html).
- Workflows: deploy.yml (tests + 306 Playwright tests + deploy), daily-refresh.yml (05:17 UTC, skips Claude step cleanly while the secret is missing). Pages enabled.
- Tests: 177 unit tests, build, validate, ICS, i18n, agent files, e2e all pass. QA-REPORT.md has the detail.

Events by city hub: Paris 92, Online 30, Other France 16, Bordeaux 9, Marseille-Aix 8, Lille 7, Toulouse 7, Nice-Sophia 6, Nantes 6, Strasbourg 6, Lyon 5, Rennes 4, Montpellier 2, Grenoble 1.

Open issues
- Coverage is thinner than Germany (research estimate 55-75%); discovery should grow it over weeks.
- allai.events listing has no dates, so it adds nothing by itself; 63 low-confidence candidates were held back.
- Eventbrite may be blocked from GitHub runners (it switches itself off).
- Legal text and French copy need a native/legal review.

Owner to-dos (exact steps in TODO-OWNER.md, in order)
1. Buy frenchdataevents.fr (optionally .fr). 2. DNS for GitHub Pages. 3. ImprovMX for contact@. 4. One-line domain switch + CNAME + INDEXABLE=true.
5. Secret CLAUDE_CODE_OAUTH_TOKEN (same as Germany). 6. Buttondown newsletter + API key. 7. Umami website ID. 8. Search Console. 9. FormSubmit activation. 10. Native French and legal review.
