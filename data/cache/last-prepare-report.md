# Prepare run report

- Date: 2026-11-22 (window 120 days), mode: daily
- Feed sources: 132/132 reachable (100%), 18 disabled
- Totals: fetched 1969, in-window France 807, after keyword filter 571, after dedupe 424, known 410, new 14, sent to Claude 14, deferred by cap 0
- Ledger: 1037 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window FR = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window FR | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 544 | 13 | 13 | 13 | 12 | 0 | 203 | ok |
| brainberg-fr | noisy | 226 | 196 | 102 | 101 | 34 | 0 | 3209 | ok |
| openagenda | noisy | 221 | 221 | 175 | 164 | 163 | 0 | 9610 | ok |
| aieventlist-europe | curated | 172 | 8 | 7 | 7 | 0 | 0 | 1112 | ok |
| confstech | noisy | 138 | 1 | 0 | 0 | 0 | 0 | 1280 | ok |
| luma-cal:claudecommunity | noisy | 121 | 2 | 2 | 2 | 1 | 0 | 0 | ok |
| luma-cal:genai-collective | curated | 60 | 22 | 22 | 19 | 19 | 0 | 14011 | ok |
| luma-cal:n8n-events | noisy | 50 | 9 | 2 | 2 | 2 | 0 | 11974 | ok |
| briefia-meetups | curated | 50 | 50 | 46 | 44 | 33 | 0 | 456 | ok |
| luma-paris | noisy | 39 | 39 | 12 | 12 | 12 | 0 | 471 | ok |
| aitinkerers-paris | curated | 20 | 3 | 3 | 3 | 0 | 0 | 2183 | ok |
| luma-cal:clickhouse-events | noisy | 19 | 8 | 8 | 8 | 7 | 0 | 7411 | ok |
| devevents | noisy | 15 | 1 | 0 | 0 | 0 | 0 | 292 | ok |
| toulouse-tech-hub | noisy | 15 | 15 | 5 | 5 | 3 | 0 | 607 | ok |
| afia | curated | 15 | 0 | 0 | 0 | 0 | 0 | 1557 | ok |
| luma-cal:bond-paris | noisy | 12 | 12 | 6 | 6 | 4 | 0 | 1042 | ok |
| aieventlist-paris | curated | 11 | 7 | 6 | 6 | 3 | 0 | 616 | ok |
| meetup:le-wagon-bordeaux-coding-station-bootcamp | curated | 10 | 10 | 8 | 8 | 8 | 0 | 8309 | ok |
| meetup:aperos-agiles-montpellier | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 2518 | ok |
| meetup:digital-nomads-remote-workers-montpellier | noisy | 10 | 8 | 8 | 8 | 8 | 0 | 8738 | ok |
| meetup:l-apero-de-l-ia | noisy | 10 | 9 | 9 | 9 | 8 | 0 | 0 | ok |
| hi-paris-ics | curated | 8 | 7 | 6 | 6 | 6 | 0 | 2090 | ok |
| meetup:hacksxb | noisy | 8 | 5 | 1 | 1 | 1 | 0 | 7810 | ok |
| meetup:yeeso-itwomen-network | noisy | 8 | 8 | 1 | 1 | 1 | 0 | 8776 | ok |
| luma-cal:cal-cedsWn0tyHau5wm | noisy | 8 | 6 | 1 | 1 | 1 | 0 | 1063 | ok |
| luma-cal:cal-ouvsbv3Gj9kvRGD | noisy | 8 | 1 | 1 | 1 | 0 | 0 | 4060 | ok |
| meetup:le-wagon-lille-coding-station | curated | 7 | 7 | 4 | 4 | 4 | 0 | 8318 | ok |
| meetup:paris-big-data | curated | 6 | 6 | 6 | 6 | 6 | 0 | 6528 | ok |
| createwith-paris | noisy | 6 | 6 | 5 | 4 | 1 | 0 | 774 | ok |
| meetup:ac-cdg | noisy | 6 | 6 | 6 | 6 | 0 | 0 | 396 | ok |
| luma-cal:softr-events | noisy | 6 | 0 | 0 | 0 | 0 | 0 | 0 | ok |
| luma-cal:datacraft | curated | 5 | 5 | 5 | 5 | 3 | 0 | 585 | ok |
| luma-cal:womenincode | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7095 | ok |
| luma-cal:neo4j | noisy | 4 | 2 | 2 | 2 | 2 | 0 | 8001 | ok |
| luma-cal:ai-automations-make-global-calendar | noisy | 4 | 3 | 3 | 3 | 2 | 0 | 8025 | ok |
| numerique-gouv | curated | 4 | 2 | 1 | 1 | 1 | 0 | 851 | ok |
| meetup:lyondigitalhub | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 8305 | ok |
| meetup:lyon-data-science | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8406 | ok |
| meetup:groupe-meetup-nice-data | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8054 | ok |
| meetup:strasbourg-deep-learning-meetup | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8106 | ok |
| luma-cal:airstreet | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 2028 | ok |
| luma-cal:dust | curated | 3 | 1 | 1 | 1 | 0 | 0 | 3083 | ok |
| luma-cal:nouvellemachine | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 7844 | ok |
| meetup:lyondatascience | noisy | 3 | 3 | 3 | 3 | 0 | 0 | 1371 | ok |
| meetup:meetup-harrycow-coworking-toulouse | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 8470 | ok |
| meetup:health-data-hub | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8043 | ok |
| meetup:strasbourg-aws-user-group | curated | 2 | 2 | 2 | 1 | 1 | 0 | 7734 | ok |
| meetup:les-meetups-de-l-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 7995 | ok |
| meetup:ai-first | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8043 | ok |
| luma-cal:doctolib-ai-community | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 2737 | ok |
| luma-cal:notionparis | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 5665 | ok |
| luma-cal:cto-de-lyon | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 6062 | ok |
| luma-cal:hub-france-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 7996 | ok |
| meetup:solutiontech | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 5957 | ok |
| meetup:android-paris | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 5886 | ok |
| meetup:software-craftsmanship-lille | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8503 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8525 | ok |
| meetup:le-meetup-du-laptop-ux-creation | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7060 | ok |
| luma-cal:Paris-hardware-meetup | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 3010 | ok |
| luma-cal:cal-R4V662MAZSQBUp5 | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 4994 | ok |
| meetup:pydata-paris | curated | 1 | 1 | 1 | 1 | 1 | 0 | 531 | ok |
| meetup:compute-paris | curated | 1 | 1 | 1 | 1 | 0 | 0 | 1188 | ok |
| meetup:paris-dataladies | curated | 1 | 1 | 1 | 1 | 1 | 0 | 2259 | ok |
| meetup:paris-ai-tech-talk | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3189 | ok |
| meetup:paris-ai | curated | 1 | 1 | 1 | 1 | 0 | 0 | 4184 | ok |
| meetup:artificial-intelligence-meetup-paris | curated | 1 | 1 | 1 | 1 | 0 | 0 | 5164 | ok |
| meetup:paris-dbt-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7674 | ok |
| meetup:paris-apache-airflow-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8018 | ok |
| meetup:french-aws-ug | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8045 | ok |
| meetup:gdg-paris | curated | 1 | 1 | 0 | 0 | 0 | 0 | 7994 | ok |
| meetup:semweb-pro | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8047 | ok |
| meetup:aws-lyon-amazon-web-services-user-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8002 | ok |
| meetup:ia-innovateurs | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7972 | ok |
| meetup:postgres-toulouse | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8106 | ok |
| meetup:latoulboxducloudnatif | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8016 | ok |
| meetup:intelligence-artificielle-aix-marseille | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8350 | ok |
| meetup:google-developer-group-aix-en-provence | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8076 | ok |
| meetup:meetup-postgresql-lille | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7850 | ok |
| meetup:generative-ai-rennes | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7645 | ok |
| meetup:strasbourg-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7694 | ok |
| meetup:afterwork-ia-montpellier | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8065 | ok |
| meetup:ianancy | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8339 | ok |
| meetup:cfdatalovers | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8044 | ok |
| meetup:ai-for-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7941 | ok |
| meetup:it-business-club-data-cloud-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7991 | ok |
| luma-cal:hcompany.ai | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 4238 | ok |
| luma-cal:amilabs | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 4952 | ok |
| luma-cal:aificionados | curated | 1 | 1 | 1 | 1 | 1 | 0 | 6027 | ok |
| luma-cal:genainetwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6983 | ok |
| luma-cal:machina | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 7999 | ok |
| meetup:rencontres-tech-innovation | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 1768 | ok |
| meetup:chtijug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4591 | ok |
| meetup:paris-tech-afterwork-talks-networking | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5550 | ok |
| meetup:gdg-rennes | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6173 | ok |
| meetup:finistdevs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6552 | ok |
| meetup:staff42 | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7519 | ok |
| meetup:proxiadnord | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7334 | ok |
| meetup:parisapi | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8497 | ok |
| meetup:alpesjug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8521 | ok |
| meetup:lyonjs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8476 | ok |
| meetup:maxsessions | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6872 | ok |
| meetup:rladies-limoges | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6980 | ok |
| meetup:cara-grenoble | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8217 | ok |
| meetup:strasbourg-net-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8506 | ok |
| meetup:meetup-programmez | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8490 | ok |
| meetup:paris-philosophy-cafe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8501 | ok |
| luma-cal:alan.eu | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1056 | ok |
| luma-cal:cal-1hB7mHUJ8WZ0l8h | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1980 | ok |
| luma-cal:cal-8yPHi9oITkCB5CI | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 2046 | ok |
| luma-cal:cal-QEWfkaGcHSASBfq | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 3048 | ok |
| meetup:paris-big-data-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7201 | empty |
| meetup:paris-machine-learning-study-group-in-english-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7952 | empty |
| meetup:paris-women-in-machine-learning-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7984 | empty |
| meetup:mlops-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7978 | empty |
| meetup:paris-dataops | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7979 | empty |
| meetup:paris-nlp | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7656 | empty |
| meetup:generative-ai-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7940 | empty |
| meetup:data-science-leaders | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7962 | empty |
| meetup:search-and-data | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7935 | empty |
| meetup:data-for-good-france | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7936 | empty |
| meetup:ia-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7990 | empty |
| meetup:rladies-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8002 | empty |
| meetup:lyon-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8013 | empty |
| meetup:lyon-dataviz | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8026 | empty |
| meetup:tlse-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7972 | empty |
| meetup:meetup-visualisation-des-donnees-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7989 | empty |
| meetup:python-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7595 | empty |
| meetup:bordeaux-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7984 | empty |
| meetup:nice-natural-language-processing-meetup-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7969 | empty |
| meetup:python-rennes | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7921 | empty |
| eventbrite-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 320 | disabled: Eventbrite answered HTTP 405; disabled for the rest of this run |
| eventbrite-lyon | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-toulouse | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-marseille | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-aix-en-provence | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-nantes | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-bordeaux | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-lille | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-grenoble | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-nice | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-rennes | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-strasbourg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-montpellier | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-online | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| hackevents-fr | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Returns an empty calendar (0 VEVENT) for country=fr on 2026-11-21. Re-test later. |
| meetup-city-pages | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 58046 | empty |
| aniti-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| saclay-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| actuia-events | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| luma-cal:cal-0ICm7FJKGW0OHUA | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 3988 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| hub-franceia | not due |  |  | weekend |
| allai-fr | not due |  |  | weekend |
| prairie-psai | not due |  |  | weekend |
| miai | not due |  |  | weekend |
| 3ia-cote-d-azur | not due |  |  | weekend |
| dataia-saclay | not due |  |  | weekend |
| sorbonne-evenements | not due |  |  | weekend |
| telecom-paris | not due |  |  | weekend |
| epita | not due |  |  | weekend |
| stationf-events | skipped |  |  | js: true (Playwright arrives later) |
| systematic-paris-region | not due |  |  | weekend |
| bpifrance-events | not due |  |  | weekend |
| cnrs-agenda | not due |  |  | weekend |
| bigdataparis | not due |  |  | weekend |
| vivatech | not due |  |  | weekend |
| dotai | not due |  |  | weekend |
| cerim-lille | not due |  |  | weekend |
| conftech-france-map | skipped |  |  | js: true (Playwright arrives later) |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Paris | 162 | 157 | 5 |
| Other France | 98 | 98 | 0 |
| Online (FR) | 28 | 27 | 1 |
| Marseille-Aix | 17 | 17 | 0 |
| Bordeaux | 17 | 17 | 0 |
| Lyon | 16 | 16 | 0 |
| Rennes | 16 | 16 | 0 |
| Lille | 13 | 13 | 0 |
| Toulouse | 12 | 12 | 0 |
| Unknown | 11 | 3 | 8 |
| Montpellier | 10 | 10 | 0 |
| Nantes | 9 | 9 | 0 |
| Strasbourg | 7 | 7 | 0 |
| Nice-Sophia | 5 | 5 | 0 |
| Grenoble | 3 | 3 | 0 |

Places inside "Other France" (after dedupe): Other France 6, Rouen 6, Orchies 3, Tremblay-en-France 3, Dammarie-les-Lys 3, Abbeville 3, Nancy 2, Le Mans 2, Lorient 2, Boves 2, Reims 2, Poitiers 2, Écouché-les-Vallées 2, Saint-Omer 2, Vienne 2

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 1066 |
| keyword | 232 |
| window | 96 |
| excluded | 4 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 5 | Cloud Native AI Summit Europe | agentconfs, aieventlist-paris, aieventlist-europe, brainberg-fr, createwith-paris |
| 4 | GenerationAI Conference for Agentic Enterprise (Free Tickets) | meetup:paris-ai-tech-talk, meetup:paris-ai, meetup:artificial-intelligence-meetup-paris, brainberg-fr |
| 4 | IA & Apéro 10e rencontre ! | meetup:ia-innovateurs, meetup:l-apero-de-l-ia, toulouse-tech-hub, brainberg-fr |
| 4 | Découvrez la nouvelle ère de l'agentic coding | meetup:strasbourg-aws-user-group, brainberg-fr |
| 3 | Compute! Paris 2026 | meetup:pydata-paris, meetup:compute-paris, brainberg-fr |
| 3 | Data & IA à Lyon : projets, blocages et retours terrain — Table ronde | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr |
| 3 | Forum des 10 ans de Lyon Data Science — Data, IA & communautés | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr |
| 3 | À travers les yeux d’une IA : atelier découverte de la data science | meetup:le-wagon-bordeaux-coding-station-bootcamp, brainberg-fr, briefia-meetups |
| 3 | Paris / Claude Code for Developers | luma-paris, luma-cal:bond-paris, luma-cal:doctolib-ai-community |
| 3 | Meetup Agents IA — Choix d'architecture et retours de prod entre pairs | luma-paris, luma-cal:datacraft, briefia-meetups |

## Failed or empty sources

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
- meetup:nice-natural-language-processing-meetup-group: empty (0 items) - GAP Nice AI & ML
- meetup:python-rennes: empty (0 items)

## Discovery (Meetup groups and Luma calendars)

- meetup l-apero-de-l-ia: ok, polled from now on
- luma claudecommunity: ok, polled from now on
- luma softr-events: ok, polled from now on

## Notes

- Ledger/ health/ cache files written; elapsed 138 s.
