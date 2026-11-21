# Prepare run report

- Date: 2026-11-21 (window 120 days), mode: bootstrap
- Feed sources: 134/143 reachable (94%), 4 disabled
- Totals: fetched 2184, in-window France 1090, after keyword filter 647, after dedupe 461, known 0, new 461, sent to Claude 461, deferred by cap 0
- Ledger: 0 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window FR = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window FR | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 544 | 13 | 13 | 13 | 12 | 0 | 5360 | ok |
| openagenda | noisy | 229 | 229 | 182 | 170 | 169 | 0 | 9944 | ok |
| brainberg-fr | noisy | 228 | 198 | 103 | 101 | 21 | 0 | 12190 | ok |
| aieventlist-europe | curated | 171 | 8 | 7 | 7 | 0 | 0 | 1634 | ok |
| confstech | noisy | 138 | 1 | 0 | 0 | 0 | 0 | 1191 | ok |
| eventbrite-online | noisy | 91 | 83 | 57 | 57 | 43 | 0 | 69469 | ok |
| eventbrite-strasbourg | noisy | 76 | 49 | 6 | 6 | 6 | 0 | 65662 | ok |
| eventbrite-nice | noisy | 73 | 61 | 2 | 2 | 2 | 0 | 63288 | ok |
| luma-cal:genai-collective | curated | 59 | 20 | 20 | 17 | 17 | 0 | 13899 | ok |
| luma-cal:n8n-events | noisy | 58 | 10 | 2 | 2 | 2 | 0 | 12729 | ok |
| briefia-meetups | curated | 50 | 50 | 45 | 43 | 22 | 0 | 832 | ok |
| eventbrite-rennes | noisy | 48 | 47 | 8 | 8 | 8 | 0 | 55697 | ok |
| luma-paris | noisy | 40 | 40 | 11 | 11 | 11 | 0 | 401 | ok |
| eventbrite-montpellier | noisy | 39 | 39 | 5 | 5 | 5 | 0 | 48174 | ok |
| aitinkerers-paris | curated | 20 | 3 | 3 | 3 | 0 | 0 | 1952 | ok |
| luma-cal:clickhouse-events | noisy | 19 | 8 | 8 | 8 | 7 | 0 | 7942 | ok |
| devevents | noisy | 18 | 1 | 0 | 0 | 0 | 0 | 5288 | ok |
| toulouse-tech-hub | noisy | 15 | 15 | 5 | 5 | 3 | 0 | 831 | ok |
| afia | curated | 15 | 0 | 0 | 0 | 0 | 0 | 1250 | ok |
| luma-cal:bond-paris | noisy | 13 | 13 | 7 | 7 | 5 | 0 | 1281 | ok |
| aieventlist-paris | curated | 11 | 7 | 6 | 6 | 3 | 0 | 2107 | ok |
| meetup:le-wagon-bordeaux-coding-station-bootcamp | curated | 10 | 10 | 8 | 8 | 8 | 0 | 8279 | ok |
| meetup:aperos-agiles-montpellier | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:digital-nomads-remote-workers-montpellier | noisy | 10 | 8 | 8 | 8 | 8 | 0 | 0 | ok |
| luma-cal:cal-cedsWn0tyHau5wm | noisy | 9 | 7 | 2 | 2 | 1 | 0 | 0 | ok |
| hi-paris-ics | curated | 8 | 7 | 6 | 6 | 6 | 0 | 1256 | ok |
| meetup:hacksxb | noisy | 8 | 5 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:yeeso-itwomen-network | noisy | 8 | 8 | 1 | 1 | 1 | 0 | 0 | ok |
| luma-cal:cal-ouvsbv3Gj9kvRGD | noisy | 8 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| meetup:le-wagon-lille-coding-station | curated | 7 | 7 | 4 | 4 | 4 | 0 | 8271 | ok |
| meetup:paris-big-data | curated | 6 | 6 | 6 | 6 | 6 | 0 | 6686 | ok |
| createwith-paris | noisy | 6 | 6 | 5 | 4 | 1 | 0 | 1605 | ok |
| meetup:ac-cdg | noisy | 6 | 6 | 6 | 6 | 0 | 0 | 0 | ok |
| luma-cal:datacraft | curated | 5 | 5 | 5 | 5 | 4 | 0 | 922 | ok |
| luma-cal:womenincode | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7526 | ok |
| luma-cal:nouvellemachine | noisy | 4 | 4 | 4 | 4 | 3 | 0 | 7846 | ok |
| luma-cal:neo4j | noisy | 4 | 2 | 2 | 2 | 2 | 0 | 7886 | ok |
| luma-cal:ai-automations-make-global-calendar | noisy | 4 | 3 | 3 | 3 | 2 | 0 | 8424 | ok |
| numerique-gouv | curated | 4 | 2 | 1 | 1 | 1 | 0 | 360 | ok |
| meetup:lyondigitalhub | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 0 | ok |
| meetup:lyon-data-science | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8322 | ok |
| meetup:groupe-meetup-nice-data | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8123 | ok |
| meetup:strasbourg-deep-learning-meetup | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8199 | ok |
| luma-cal:airstreet | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 2404 | ok |
| luma-cal:dust | curated | 3 | 1 | 1 | 1 | 0 | 0 | 3250 | ok |
| meetup:lyondatascience | noisy | 3 | 3 | 3 | 3 | 0 | 0 | 0 | ok |
| meetup:meetup-harrycow-coworking-toulouse | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:health-data-hub | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8087 | ok |
| meetup:strasbourg-aws-user-group | curated | 2 | 2 | 2 | 1 | 1 | 0 | 7798 | ok |
| meetup:les-meetups-de-l-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8001 | ok |
| meetup:ai-first | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8150 | ok |
| luma-cal:doctolib-ai-community | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 2899 | ok |
| luma-cal:notionparis | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 5401 | ok |
| luma-cal:cto-de-lyon | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 6294 | ok |
| luma-cal:hub-france-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 7737 | ok |
| meetup:solutiontech | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 0 | ok |
| meetup:android-paris | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:software-craftsmanship-lille | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 0 | ok |
| meetup:le-meetup-du-laptop-ux-creation | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 0 | ok |
| luma-cal:Paris-hardware-meetup | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:cal-R4V662MAZSQBUp5 | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 0 | ok |
| meetup:pydata-paris | curated | 1 | 1 | 1 | 1 | 1 | 0 | 429 | ok |
| meetup:compute-paris | curated | 1 | 1 | 1 | 1 | 0 | 0 | 1221 | ok |
| meetup:paris-dataladies | curated | 1 | 1 | 1 | 1 | 1 | 0 | 2269 | ok |
| meetup:paris-ai-tech-talk | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3408 | ok |
| meetup:paris-ai | curated | 1 | 1 | 1 | 1 | 0 | 0 | 4305 | ok |
| meetup:artificial-intelligence-meetup-paris | curated | 1 | 1 | 1 | 1 | 0 | 0 | 5273 | ok |
| meetup:paris-dbt-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7816 | ok |
| meetup:paris-apache-airflow-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8033 | ok |
| meetup:french-aws-ug | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8039 | ok |
| meetup:gdg-paris | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8007 | ok |
| meetup:semweb-pro | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8032 | ok |
| meetup:aws-lyon-amazon-web-services-user-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7974 | ok |
| meetup:ia-innovateurs | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7964 | ok |
| meetup:postgres-toulouse | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7920 | ok |
| meetup:latoulboxducloudnatif | curated | 1 | 1 | 0 | 0 | 0 | 0 | 7961 | ok |
| meetup:intelligence-artificielle-aix-marseille | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8030 | ok |
| meetup:google-developer-group-aix-en-provence | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7975 | ok |
| meetup:meetup-postgresql-lille | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7992 | ok |
| meetup:nice-natural-language-processing-meetup-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8009 | ok |
| meetup:generative-ai-rennes | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8199 | ok |
| meetup:strasbourg-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7794 | ok |
| meetup:afterwork-ia-montpellier | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8237 | ok |
| meetup:ianancy | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8062 | ok |
| meetup:cfdatalovers | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8051 | ok |
| meetup:ai-for-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7891 | ok |
| meetup:it-business-club-data-cloud-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7959 | ok |
| luma-cal:hcompany.ai | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 4210 | ok |
| luma-cal:amilabs | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 4841 | ok |
| luma-cal:aificionados | curated | 1 | 1 | 1 | 1 | 1 | 0 | 6129 | ok |
| luma-cal:genainetwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7082 | ok |
| luma-cal:machina | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 7879 | ok |
| meetup:rencontres-tech-innovation | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:chtijug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:paris-tech-afterwork-talks-networking | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:gdg-rennes | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:finistdevs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:staff42 | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:proxiadnord | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:parisapi | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:alpesjug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:lyonjs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:maxsessions | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:rladies-limoges | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:cara-grenoble | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:strasbourg-net-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:meetup-programmez | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:paris-philosophy-cafe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| luma-cal:alan.eu | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:cal-1hB7mHUJ8WZ0l8h | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:cal-8yPHi9oITkCB5CI | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:cal-QEWfkaGcHSASBfq | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:cal-0ICm7FJKGW0OHUA | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| meetup:paris-big-data-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7232 | empty |
| meetup:paris-machine-learning-study-group-in-english-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7997 | empty |
| meetup:paris-women-in-machine-learning-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7809 | empty |
| meetup:mlops-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7938 | empty |
| meetup:paris-dataops | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7972 | empty |
| meetup:paris-nlp | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7546 | empty |
| meetup:generative-ai-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8006 | empty |
| meetup:data-science-leaders | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8004 | empty |
| meetup:search-and-data | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7975 | empty |
| meetup:data-for-good-france | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7931 | empty |
| meetup:ia-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8031 | empty |
| meetup:rladies-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8032 | empty |
| meetup:lyon-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8061 | empty |
| meetup:lyon-dataviz | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7977 | empty |
| meetup:tlse-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7958 | empty |
| meetup:meetup-visualisation-des-donnees-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7969 | empty |
| meetup:python-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7645 | empty |
| meetup:bordeaux-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7997 | empty |
| meetup:python-rennes | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7999 | empty |
| eventbrite-paris | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 275870 | FAILED: fetch failed |
| eventbrite-lyon | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 274879 | FAILED: fetch failed |
| eventbrite-toulouse | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 273907 | FAILED: fetch failed |
| eventbrite-marseille | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 271837 | FAILED: The operation was aborted due to timeout |
| eventbrite-aix-en-provence | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 270886 | FAILED: fetch failed |
| eventbrite-nantes | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 269361 | FAILED: fetch failed |
| eventbrite-bordeaux | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 268894 | FAILED: fetch failed |
| eventbrite-lille | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 266881 | FAILED: fetch failed |
| eventbrite-grenoble | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 843 | FAILED: fetch failed |
| hackevents-fr | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Returns an empty calendar (0 VEVENT) for country=fr on 2026-11-21. Re-test later. |
| meetup-city-pages | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 28898 | empty |
| aniti-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| saclay-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| actuia-events | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| stationf-events | skipped |  |  | js: true (Playwright arrives later) |
| conftech-france-map | skipped |  |  | js: true (Playwright arrives later) |
| 3ia-cote-d-azur | deferred |  |  | cap of 4 pages per run |
| dataia-saclay | deferred |  |  | cap of 4 pages per run |
| sorbonne-evenements | deferred |  |  | cap of 4 pages per run |
| telecom-paris | deferred |  |  | cap of 4 pages per run |
| epita | deferred |  |  | cap of 4 pages per run |
| systematic-paris-region | deferred |  |  | cap of 4 pages per run |
| bpifrance-events | deferred |  |  | cap of 4 pages per run |
| cnrs-agenda | deferred |  |  | cap of 4 pages per run |
| bigdataparis | deferred |  |  | cap of 4 pages per run |
| vivatech | deferred |  |  | cap of 4 pages per run |
| dotai | deferred |  |  | cap of 4 pages per run |
| cerim-lille | deferred |  |  | cap of 4 pages per run |
| hub-franceia | ready | 14156 | 53 |  |
| allai-fr | ready | 11241 | 29 |  |
| prairie-psai | skipped |  |  | robots.txt disallows this path |
| miai | ready | 2673 | 18 |  |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Paris | 178 | 0 | 178 |
| Other France | 121 | 0 | 121 |
| Online (FR) | 26 | 0 | 26 |
| Bordeaux | 19 | 0 | 19 |
| Lyon | 18 | 0 | 18 |
| Rennes | 18 | 0 | 18 |
| Marseille-Aix | 14 | 0 | 14 |
| Lille | 13 | 0 | 13 |
| Toulouse | 11 | 0 | 11 |
| Montpellier | 11 | 0 | 11 |
| Nantes | 10 | 0 | 10 |
| Strasbourg | 9 | 0 | 9 |
| Nice-Sophia | 7 | 0 | 7 |
| Grenoble | 3 | 0 | 3 |
| Unknown | 3 | 0 | 3 |

Places inside "Other France" (after dedupe): Martigues 7, Other France 6, Rouen 6, Nancy 3, Saint-Omer 3, Orchies 3, Tremblay-en-France 3, Dammarie-les-Lys 3, Abbeville 3, Éguilles 2, Le Mans 2, Le Coudray 2, Cherbourg 2, Lorient 2, Boves 2

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 989 |
| keyword | 426 |
| window | 105 |
| excluded | 17 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 5 | Cloud Native AI Summit Europe | agentconfs, aieventlist-paris, aieventlist-europe, brainberg-fr, createwith-paris |
| 4 | GenerationAI Conference for Agentic Enterprise (Free Tickets) | meetup:paris-ai-tech-talk, meetup:paris-ai, meetup:artificial-intelligence-meetup-paris, brainberg-fr |
| 4 | À travers les yeux d’une IA : atelier découverte de la data science | meetup:le-wagon-bordeaux-coding-station-bootcamp, eventbrite-online, brainberg-fr, briefia-meetups |
| 4 | 🚀 Découvrez la nouvelle ère de l'agentic coding | meetup:strasbourg-aws-user-group, brainberg-fr |
| 4 | Conférence Intelligence Artificielle | eventbrite-online, brainberg-fr, briefia-meetups |
| 4 | Future Intelligence - L'IA au service de l'environnement | eventbrite-online, brainberg-fr, briefia-meetups |
| 3 | Compute! Paris 2026 | meetup:pydata-paris, meetup:compute-paris, brainberg-fr |
| 3 | Data & IA à Lyon : projets, blocages et retours terrain — Table ronde | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr |
| 3 | Forum des 10 ans de Lyon Data Science — Data, IA & communautés | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr |
| 3 | IA & Apéro 10e rencontre ! | meetup:ia-innovateurs, toulouse-tech-hub, brainberg-fr |

## Failed or empty sources

- eventbrite-paris: FAILED (fetch failed)
- eventbrite-lyon: FAILED (fetch failed)
- eventbrite-toulouse: FAILED (fetch failed)
- eventbrite-marseille: FAILED (The operation was aborted due to timeout)
- eventbrite-aix-en-provence: FAILED (fetch failed)
- eventbrite-nantes: FAILED (fetch failed)
- eventbrite-bordeaux: FAILED (fetch failed)
- eventbrite-lille: FAILED (fetch failed)
- eventbrite-grenoble: FAILED (fetch failed)
- meetup:paris-big-data-meetup: empty (0 items)
- meetup:paris-machine-learning-study-group-in-english-meetup: empty (0 items)
- meetup:paris-women-in-machine-learning-data-science: empty (0 items) - WiMLDS Paris
- meetup:mlops-paris: empty (0 items)
- meetup:paris-dataops: empty (0 items) - now AI Agent Builders Paris (Dataiku)
- meetup:paris-nlp: empty (0 items)
- meetup:generative-ai-paris: empty (0 items)
- meetup:data-science-leaders: empty (0 items)
- meetup:search-and-data: empty (0 items) - Search, Data and AI
- meetup:data-for-good-france: empty (0 items)
- meetup:ia-paris: empty (0 items) - IA Generale
- meetup:rladies-paris: empty (0 items) - RLadies+ Paris; r-ladies-paris is an alias
- meetup:lyon-ia: empty (0 items) - Lyon & IA
- meetup:lyon-dataviz: empty (0 items)
- meetup:tlse-data-science: empty (0 items) - Toulouse Data Science
- meetup:meetup-visualisation-des-donnees-toulouse: empty (0 items) - Toulouse DataViz
- meetup:python-toulouse: empty (0 items)
- meetup:bordeaux-ia: empty (0 items)
- meetup:python-rennes: empty (0 items)

## Discovery (Meetup groups and Luma calendars)

- meetup ac-cdg: ok, polled from now on
- meetup lyondatascience: ok, polled from now on
- meetup rencontres-tech-innovation: ok, polled from now on
- meetup aperos-agiles-montpellier: ok, polled from now on
- meetup chtijug: ok, polled from now on
- meetup paris-tech-afterwork-talks-networking: ok, polled from now on
- meetup gdg-rennes: ok, polled from now on
- meetup finistdevs: ok, polled from now on
- meetup staff42: ok, polled from now on
- meetup proxiadnord: ok, polled from now on
- meetup solutiontech: ok, polled from now on
- meetup android-paris: ok, polled from now on
- meetup hacksxb: ok, polled from now on
- meetup parisapi: ok, polled from now on
- meetup yeeso-itwomen-network: ok, polled from now on
- meetup alpesjug: ok, polled from now on
- meetup lyonjs: ok, polled from now on
- meetup digital-nomads-remote-workers-montpellier: ok, polled from now on
- meetup meetup-harrycow-coworking-toulouse: ok, polled from now on
- meetup maxsessions: ok, polled from now on
- meetup rladies-limoges: ok, polled from now on
- meetup cara-grenoble: ok, polled from now on
- meetup software-craftsmanship-lille: ok, polled from now on
- meetup strasbourg-net-group: ok, polled from now on
- meetup lyondigitalhub: ok, polled from now on
- meetup meetup-programmez: ok, polled from now on
- meetup ksug-in: ok, polled from now on
- meetup paris-philosophy-cafe: ok, polled from now on
- meetup le-meetup-du-laptop-ux-creation: ok, polled from now on
- luma cal-cedsWn0tyHau5wm: ok, polled from now on
- luma alan.eu: ok, polled from now on
- luma cal-1hB7mHUJ8WZ0l8h: ok, polled from now on
- luma cal-8yPHi9oITkCB5CI: ok, polled from now on
- luma Paris-hardware-meetup: ok, polled from now on
- luma cal-QEWfkaGcHSASBfq: ok, polled from now on
- luma cal-0ICm7FJKGW0OHUA: ok, polled from now on
- luma cal-ouvsbv3Gj9kvRGD: ok, polled from now on
- luma cal-R4V662MAZSQBUp5: ok, polled from now on

## Notes

- Ledger/ health/ cache files written; elapsed 478 s.
- Bootstrap: 8 chunk(s) of up to 60 under work/chunk-NN/.
