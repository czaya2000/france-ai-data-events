<!-- Buttondown > Settings > General: newsletter name, description, and the Web page text. -->

**Newsletter name:** French Data Events

**Username:** french-data-events (must match `BUTTONDOWN_USERNAME` in config/country.mjs)

**Description (FR):** Chaque lundi, les événements data et IA des deux prochaines semaines en France : meetups, conférences, ateliers et webinaires, selon vos villes et vos formats. Gratuit, sans publicité.

**Description (EN):** Every Monday, the data and AI events in France for the next two weeks: meetups, conferences, workshops and webinars, matched to your cities and formats. Free, no ads.

**Tags to create** (the signup form submits them; Buttondown creates unknown ones on first signup):

- Language, exactly one per subscriber: `lang-fr`, `lang-en`
- Cities: `city-paris`, `city-lyon`, `city-toulouse`, `city-marseille-aix`, `city-nice-sophia`, `city-bordeaux`, `city-lille`, `city-nantes`, `city-rennes`, `city-grenoble`, `city-strasbourg`, `city-montpellier`, `city-online`, `city-other-france`
- Formats: `format-meetup`, `format-conference`, `format-workshop`, `format-networking`, `format-webinar`

**Appearance:** keep the accent colour black (the digest draws its own masthead with a deep-blue rule, `#1F3A93`). Paste `buttondown/web.css` into Settings > Web > Custom CSS (see the note inside the file about the tag placement rules).

**After the first signup flow works:** run `node scripts/buttondown-redirects.mjs --apply` (sets the "thanks" and "confirmed" pages) and set the sender name to "French Data Events" with reply-to hallo@germandataevents.com.
