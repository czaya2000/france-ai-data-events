# Prepare run report

- Date: 2026-11-23 (window 120 days), mode: daily
- Feed sources: 136/136 reachable (100%), 18 disabled
- Totals: fetched 2004, in-window France 826, after keyword filter 584, after dedupe 429, known 416, new 13, sent to Claude 13, deferred by cap 0
- Ledger: 1080 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window FR = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window FR | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 544 | 13 | 13 | 13 | 12 | 0 | 419 | ok |
| brainberg-fr | noisy | 236 | 208 | 109 | 107 | 36 | 0 | 2614 | ok |
| openagenda | noisy | 219 | 219 | 173 | 162 | 161 | 0 | 9722 | ok |
| aieventlist-europe | curated | 184 | 8 | 7 | 7 | 0 | 0 | 994 | ok |
| confstech | noisy | 138 | 1 | 0 | 0 | 0 | 0 | 1095 | ok |
| luma-cal:claudecommunity | noisy | 122 | 2 | 2 | 2 | 1 | 0 | 13113 | ok |
| luma-cal:genai-collective | curated | 61 | 22 | 22 | 19 | 19 | 0 | 14203 | ok |
| luma-cal:n8n-events | noisy | 53 | 11 | 4 | 4 | 4 | 0 | 12014 | ok |
| briefia-meetups | curated | 50 | 50 | 45 | 42 | 31 | 0 | 275 | ok |
| luma-paris | noisy | 39 | 39 | 12 | 12 | 12 | 0 | 322 | ok |
| aitinkerers-paris | curated | 20 | 3 | 3 | 3 | 0 | 0 | 3569 | ok |
| luma-cal:clickhouse-events | noisy | 19 | 8 | 8 | 8 | 7 | 0 | 8078 | ok |
| devevents | noisy | 15 | 1 | 0 | 0 | 0 | 0 | 699 | ok |
| toulouse-tech-hub | noisy | 15 | 15 | 5 | 5 | 1 | 0 | 264 | ok |
| afia | curated | 15 | 0 | 0 | 0 | 0 | 0 | 1339 | ok |
| luma-cal:bond-paris | noisy | 12 | 12 | 6 | 6 | 4 | 0 | 1158 | ok |
| aieventlist-paris | curated | 12 | 7 | 6 | 6 | 3 | 0 | 555 | ok |
| meetup:le-wagon-bordeaux-coding-station-bootcamp | curated | 10 | 10 | 8 | 8 | 8 | 0 | 8281 | ok |
| meetup:l-apero-de-l-ia | noisy | 10 | 9 | 9 | 9 | 8 | 0 | 268 | ok |
| meetup:aperos-agiles-montpellier | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 2946 | ok |
| meetup:digital-nomads-remote-workers-montpellier | noisy | 10 | 8 | 8 | 8 | 8 | 0 | 8750 | ok |
| meetup:hacksxb | noisy | 8 | 5 | 1 | 1 | 1 | 0 | 7616 | ok |
| meetup:yeeso-itwomen-network | noisy | 8 | 8 | 1 | 1 | 1 | 0 | 8672 | ok |
| luma-cal:cal-cedsWn0tyHau5wm | noisy | 8 | 6 | 1 | 1 | 1 | 0 | 6125 | ok |
| luma-cal:cal-ouvsbv3Gj9kvRGD | noisy | 8 | 1 | 1 | 1 | 0 | 0 | 6593 | ok |
| meetup:le-wagon-lille-coding-station | curated | 7 | 7 | 4 | 4 | 4 | 0 | 8311 | ok |
| hi-paris-ics | curated | 7 | 6 | 6 | 6 | 6 | 0 | 2013 | ok |
| luma-cal:softr-events | noisy | 7 | 0 | 0 | 0 | 0 | 0 | 1325 | ok |
| meetup:paris-big-data | curated | 6 | 6 | 6 | 6 | 6 | 0 | 6367 | ok |
| luma-cal:datacraft | curated | 6 | 6 | 6 | 6 | 4 | 0 | 778 | ok |
| createwith-paris | noisy | 6 | 6 | 5 | 4 | 1 | 0 | 2311 | ok |
| meetup:ac-cdg | noisy | 6 | 6 | 6 | 6 | 0 | 0 | 1168 | ok |
| luma-cal:womenincode | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7148 | ok |
| luma-cal:neo4j | noisy | 5 | 2 | 2 | 2 | 2 | 0 | 8041 | ok |
| meetup:theproductcrew | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 0 | ok |
| luma-cal:ai-automations-make-global-calendar | noisy | 4 | 3 | 3 | 3 | 2 | 0 | 8132 | ok |
| numerique-gouv | curated | 4 | 2 | 1 | 1 | 1 | 0 | 575 | ok |
| meetup:lyondigitalhub | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 6704 | ok |
| meetup:lyon-data-science | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8333 | ok |
| meetup:groupe-meetup-nice-data | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8028 | ok |
| meetup:strasbourg-deep-learning-meetup | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8064 | ok |
| luma-cal:airstreet | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 2136 | ok |
| luma-cal:dust | curated | 3 | 1 | 1 | 1 | 0 | 0 | 3108 | ok |
| luma-cal:nouvellemachine | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 8054 | ok |
| meetup:lyondatascience | noisy | 3 | 3 | 3 | 3 | 0 | 0 | 2791 | ok |
| meetup:meetup-harrycow-coworking-toulouse | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 8476 | ok |
| meetup:health-data-hub | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8090 | ok |
| meetup:strasbourg-aws-user-group | curated | 2 | 2 | 2 | 1 | 1 | 0 | 7728 | ok |
| meetup:les-meetups-de-l-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8014 | ok |
| meetup:ai-first | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8117 | ok |
| luma-cal:doctolib-ai-community | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 2985 | ok |
| luma-cal:notionparis | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 5092 | ok |
| luma-cal:cto-de-lyon | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 6145 | ok |
| luma-cal:hub-france-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8003 | ok |
| meetup:solutiontech | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7508 | ok |
| meetup:android-paris | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 7517 | ok |
| meetup:software-craftsmanship-lille | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8382 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8445 | ok |
| meetup:le-meetup-du-laptop-ux-creation | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8536 | ok |
| luma-cal:Paris-hardware-meetup | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 4614 | ok |
| luma-cal:cal-R4V662MAZSQBUp5 | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 6989 | ok |
| meetup:pydata-paris | curated | 1 | 1 | 1 | 1 | 1 | 0 | 318 | ok |
| meetup:compute-paris | curated | 1 | 1 | 1 | 1 | 0 | 0 | 1133 | ok |
| meetup:paris-dataladies | curated | 1 | 1 | 1 | 1 | 1 | 0 | 2164 | ok |
| meetup:paris-ai-tech-talk | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3166 | ok |
| meetup:paris-ai | curated | 1 | 1 | 1 | 1 | 0 | 0 | 4327 | ok |
| meetup:artificial-intelligence-meetup-paris | curated | 1 | 1 | 1 | 1 | 0 | 0 | 5221 | ok |
| meetup:paris-dbt-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7817 | ok |
| meetup:paris-apache-airflow-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8052 | ok |
| meetup:french-aws-ug | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8114 | ok |
| meetup:gdg-paris | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8077 | ok |
| meetup:semweb-pro | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8006 | ok |
| meetup:aws-lyon-amazon-web-services-user-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8040 | ok |
| meetup:ia-innovateurs | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8033 | ok |
| meetup:postgres-toulouse | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7960 | ok |
| meetup:latoulboxducloudnatif | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8021 | ok |
| meetup:intelligence-artificielle-aix-marseille | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7975 | ok |
| meetup:google-developer-group-aix-en-provence | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7998 | ok |
| meetup:meetup-postgresql-lille | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8002 | ok |
| meetup:generative-ai-rennes | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8007 | ok |
| meetup:strasbourg-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7742 | ok |
| meetup:afterwork-ia-montpellier | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8015 | ok |
| meetup:ianancy | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7974 | ok |
| meetup:cfdatalovers | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8036 | ok |
| meetup:ai-for-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7981 | ok |
| meetup:it-business-club-data-cloud-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8027 | ok |
| luma-cal:hcompany.ai | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 4163 | ok |
| luma-cal:amilabs | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 4999 | ok |
| luma-cal:aificionados | curated | 1 | 1 | 1 | 1 | 1 | 0 | 5996 | ok |
| luma-cal:genainetwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6991 | ok |
| luma-cal:machina | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 8007 | ok |
| meetup:rencontres-tech-innovation | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 1781 | ok |
| meetup:chtijug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 3761 | ok |
| meetup:paris-tech-afterwork-talks-networking | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 3861 | ok |
| meetup:gdg-rennes | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 3976 | ok |
| meetup:finistdevs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4845 | ok |
| meetup:staff42 | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7138 | ok |
| meetup:proxiadnord | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7281 | ok |
| meetup:parisapi | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8190 | ok |
| meetup:alpesjug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7148 | ok |
| meetup:lyonjs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7041 | ok |
| meetup:maxsessions | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8441 | ok |
| meetup:rladies-limoges | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8469 | ok |
| meetup:cara-grenoble | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8315 | ok |
| meetup:strasbourg-net-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8451 | ok |
| meetup:meetup-programmez | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6923 | ok |
| luma-cal:alan.eu | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 2819 | ok |
| luma-cal:cal-1hB7mHUJ8WZ0l8h | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 3192 | ok |
| luma-cal:cal-8yPHi9oITkCB5CI | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 3995 | ok |
| luma-cal:cal-QEWfkaGcHSASBfq | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 4904 | ok |
| meetup:golang-paris | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:wptoulouse | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:mug-toulouse-mobile-user-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:paris-big-data-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7145 | empty |
| meetup:paris-machine-learning-study-group-in-english-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8007 | empty |
| meetup:paris-women-in-machine-learning-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7956 | empty |
| meetup:mlops-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7801 | empty |
| meetup:paris-dataops | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7904 | empty |
| meetup:paris-nlp | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7771 | empty |
| meetup:generative-ai-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7985 | empty |
| meetup:data-science-leaders | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7965 | empty |
| meetup:search-and-data | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7960 | empty |
| meetup:data-for-good-france | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7993 | empty |
| meetup:ia-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8002 | empty |
| meetup:rladies-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7995 | empty |
| meetup:lyon-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7961 | empty |
| meetup:lyon-dataviz | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8029 | empty |
| meetup:tlse-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7935 | empty |
| meetup:meetup-visualisation-des-donnees-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7904 | empty |
| meetup:python-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7693 | empty |
| meetup:bordeaux-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7939 | empty |
| meetup:nice-natural-language-processing-meetup-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8032 | empty |
| meetup:python-rennes | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7939 | empty |
| eventbrite-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 148 | disabled: Eventbrite answered HTTP 405; disabled for the rest of this run |
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
| eventbrite-montpellier | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-online | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| hackevents-fr | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Returns an empty calendar (0 VEVENT) for country=fr on 2026-11-21. Re-test later. |
| meetup-city-pages | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 56823 | empty |
| aniti-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| saclay-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| actuia-events | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| meetup:paris-philosophy-cafe | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8534 | empty |
| luma-cal:cal-0ICm7FJKGW0OHUA | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5674 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| prairie-psai | not due |  |  | slot day 2 |
| miai | not due |  |  | slot day 2 |
| 3ia-cote-d-azur | not due |  |  | slot day 2 |
| dataia-saclay | not due |  |  | slot day 2 |
| sorbonne-evenements | not due |  |  | slot day 3 |
| telecom-paris | not due |  |  | slot day 3 |
| epita | not due |  |  | slot day 3 |
| stationf-events | skipped |  |  | js: true (Playwright arrives later) |
| systematic-paris-region | not due |  |  | slot day 4 |
| bpifrance-events | not due |  |  | slot day 4 |
| cnrs-agenda | not due |  |  | slot day 3 |
| cerim-lille | not due |  |  | slot day 3 |
| conftech-france-map | skipped |  |  | js: true (Playwright arrives later) |
| dotai | deferred |  |  | cap of 4 pages per run |
| hub-franceia | unchanged | 14156 | 53 | page text hash unchanged |
| allai-fr | ready | 11369 | 29 |  |
| bigdataparis | skipped |  |  | robots.txt disallows this path |
| vivatech | FAILED |  |  | HTTP 403 |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Paris | 165 | 160 | 5 |
| Other France | 98 | 98 | 0 |
| Online (FR) | 26 | 22 | 4 |
| Marseille-Aix | 17 | 17 | 0 |
| Bordeaux | 17 | 17 | 0 |
| Lyon | 16 | 16 | 0 |
| Rennes | 16 | 16 | 0 |
| Unknown | 14 | 11 | 3 |
| Lille | 13 | 13 | 0 |
| Toulouse | 12 | 12 | 0 |
| Montpellier | 10 | 10 | 0 |
| Nantes | 9 | 9 | 0 |
| Strasbourg | 7 | 7 | 0 |
| Nice-Sophia | 6 | 5 | 1 |
| Grenoble | 3 | 3 | 0 |

Places inside "Other France" (after dedupe): Other France 6, Rouen 6, Orchies 3, Tremblay-en-France 3, Dammarie-les-Lys 3, Abbeville 3, Nancy 2, Le Mans 2, Lorient 2, Boves 2, Reims 2, Poitiers 2, Écouché-les-Vallées 2, Saint-Omer 2, Vienne 2

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 1082 |
| keyword | 238 |
| window | 96 |
| excluded | 4 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 5 | Data & IA à Lyon : projets, blocages et retours terrain — Table ronde | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr, briefia-meetups |
| 5 | IA & Apéro 10e rencontre ! | meetup:ia-innovateurs, meetup:l-apero-de-l-ia, toulouse-tech-hub, brainberg-fr |
| 5 | Cloud Native AI Summit Europe | agentconfs, aieventlist-paris, aieventlist-europe, brainberg-fr, createwith-paris |
| 4 | GenerationAI Conference for Agentic Enterprise (Free Tickets) | meetup:paris-ai-tech-talk, meetup:paris-ai, meetup:artificial-intelligence-meetup-paris, brainberg-fr |
| 4 | Découvrez la nouvelle ère de l'agentic coding | meetup:strasbourg-aws-user-group, brainberg-fr |
| 3 | Compute! Paris 2026 | meetup:pydata-paris, meetup:compute-paris, brainberg-fr |
| 3 | Forum des 10 ans de Lyon Data Science — Data, IA & communautés | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr |
| 3 | À travers les yeux d’une IA : atelier découverte de la data science | meetup:le-wagon-bordeaux-coding-station-bootcamp, brainberg-fr, briefia-meetups |
| 3 | Meetup #81 - IA et pros du web : on flippe, on s'adapte ou on change de métier ? | meetup:wptoulouse, toulouse-tech-hub, brainberg-fr |
| 3 | MUG TOULOUSE #7 - ANOM et IA Créative: le best-of mobile du DevFest | meetup:mug-toulouse-mobile-user-group, toulouse-tech-hub, brainberg-fr |

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

- meetup golang-paris: ok, polled from now on
- meetup wptoulouse: ok, polled from now on
- meetup mug-toulouse-mobile-user-group: ok, polled from now on
- meetup theproductcrew: ok, polled from now on

## Notes

- Ledger/ health/ cache files written; elapsed 146 s.
