# Prepare run report

- Date: 2026-11-28 (window 120 days), mode: daily
- Feed sources: 156/156 reachable (100%), 18 disabled
- Totals: fetched 1863, in-window France 676, after keyword filter 469, after dedupe 344, known 342, new 2, sent to Claude 2, deferred by cap 0
- Ledger: 1242 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window FR = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window FR | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 608 | 16 | 16 | 16 | 15 | 0 | 275 | ok |
| brainberg-fr | noisy | 193 | 163 | 82 | 82 | 32 | 0 | 2864 | ok |
| aieventlist-europe | curated | 161 | 8 | 7 | 7 | 0 | 0 | 1079 | ok |
| openagenda | noisy | 143 | 143 | 114 | 108 | 108 | 0 | 9508 | ok |
| confstech | noisy | 138 | 1 | 0 | 0 | 0 | 0 | 1092 | ok |
| luma-cal:claudecommunity | noisy | 104 | 1 | 1 | 1 | 0 | 0 | 20165 | ok |
| luma-cal:genai-collective | curated | 52 | 14 | 14 | 12 | 12 | 0 | 11997 | ok |
| luma-cal:n8n-events | noisy | 50 | 15 | 5 | 5 | 5 | 0 | 12022 | ok |
| briefia-meetups | curated | 46 | 46 | 42 | 40 | 30 | 0 | 523 | ok |
| luma-paris | noisy | 32 | 32 | 11 | 11 | 11 | 0 | 373 | ok |
| aitinkerers-paris | curated | 20 | 4 | 4 | 4 | 1 | 0 | 1530 | ok |
| afia | curated | 15 | 0 | 0 | 0 | 0 | 0 | 2253 | ok |
| luma-cal:bond-paris | noisy | 14 | 14 | 8 | 8 | 3 | 0 | 1022 | ok |
| luma-cal:clickhouse-events | noisy | 13 | 7 | 7 | 7 | 6 | 0 | 8091 | ok |
| aieventlist-paris | curated | 12 | 7 | 6 | 6 | 2 | 0 | 593 | ok |
| toulouse-tech-hub | noisy | 12 | 12 | 4 | 4 | 0 | 0 | 360 | ok |
| meetup:le-wagon-bordeaux-coding-station-bootcamp | curated | 10 | 10 | 7 | 7 | 7 | 0 | 8380 | ok |
| meetup:l-apero-de-l-ia | noisy | 10 | 8 | 8 | 8 | 8 | 0 | 6852 | ok |
| meetup:aperos-agiles-montpellier | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8686 | ok |
| meetup:digital-nomads-remote-workers-montpellier | noisy | 10 | 9 | 9 | 9 | 9 | 0 | 8806 | ok |
| luma-cal:cal-cedsWn0tyHau5wm | noisy | 9 | 8 | 1 | 1 | 1 | 0 | 14000 | ok |
| devevents | noisy | 8 | 0 | 0 | 0 | 0 | 0 | 337 | ok |
| meetup:hacksxb | noisy | 7 | 4 | 0 | 0 | 0 | 0 | 8616 | ok |
| meetup:yeeso-itwomen-network | noisy | 7 | 7 | 1 | 1 | 1 | 0 | 8404 | ok |
| luma-cal:cal-SqDwK6XAVF8AiZh | noisy | 7 | 2 | 0 | 0 | 0 | 0 | 91 | ok |
| luma-cal:datacraft | curated | 6 | 6 | 6 | 6 | 5 | 0 | 670 | ok |
| numerique-gouv | curated | 6 | 4 | 1 | 1 | 1 | 0 | 641 | ok |
| hi-paris-ics | curated | 6 | 5 | 5 | 5 | 5 | 0 | 1962 | ok |
| luma-cal:ai-circle | noisy | 6 | 1 | 1 | 1 | 0 | 0 | 1981 | ok |
| meetup:paris-big-data | curated | 5 | 5 | 5 | 5 | 5 | 0 | 6385 | ok |
| meetup:le-wagon-lille-coding-station | curated | 5 | 5 | 4 | 4 | 4 | 0 | 8327 | ok |
| luma-cal:womenincode | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7998 | ok |
| luma-cal:neo4j | noisy | 5 | 2 | 2 | 2 | 2 | 0 | 7995 | ok |
| createwith-paris | noisy | 5 | 5 | 5 | 4 | 1 | 0 | 798 | ok |
| meetup:theproductcrew | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 6319 | ok |
| meetup:ac-cdg | noisy | 5 | 5 | 5 | 5 | 0 | 0 | 7168 | ok |
| luma-cal:softr-events | noisy | 5 | 2 | 2 | 2 | 1 | 0 | 7002 | ok |
| luma-cal:cal-ouvsbv3Gj9kvRGD | noisy | 5 | 0 | 0 | 0 | 0 | 0 | 7127 | ok |
| meetup:lyondigitalhub | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 8248 | ok |
| meetup:lyon-data-science | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8649 | ok |
| luma-cal:airstreet | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 2012 | ok |
| luma-cal:dust | curated | 3 | 2 | 2 | 2 | 1 | 0 | 3878 | ok |
| luma-cal:nouvellemachine | noisy | 3 | 3 | 2 | 2 | 2 | 0 | 8227 | ok |
| meetup:agile-testing-paris | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 289 | ok |
| meetup:agile-toulouse | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 2804 | ok |
| meetup:lyondatascience | noisy | 3 | 3 | 3 | 3 | 0 | 0 | 7304 | ok |
| meetup:software-craftsmanship-lille | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 8394 | ok |
| luma-cal:cal-qFg6R8OBKsMjMhr | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 946 | ok |
| luma-cal:alpic | noisy | 3 | 1 | 1 | 1 | 0 | 0 | 1075 | ok |
| meetup:paris-ai | curated | 2 | 2 | 2 | 2 | 1 | 0 | 4251 | ok |
| meetup:artificial-intelligence-meetup-paris | curated | 2 | 2 | 2 | 2 | 0 | 0 | 5217 | ok |
| meetup:groupe-meetup-nice-data | curated | 2 | 2 | 2 | 2 | 2 | 0 | 7965 | ok |
| meetup:strasbourg-deep-learning-meetup | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8003 | ok |
| meetup:les-meetups-de-l-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8222 | ok |
| meetup:ai-first | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8033 | ok |
| luma-cal:cto-de-lyon | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 6049 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8543 | ok |
| luma-cal:alan.eu | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 6988 | ok |
| luma-cal:Paris-hardware-meetup | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 6919 | ok |
| meetup:paris-dataladies | curated | 1 | 1 | 1 | 1 | 1 | 0 | 2220 | ok |
| meetup:paris-ai-tech-talk | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3239 | ok |
| meetup:paris-dbt-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7929 | ok |
| meetup:paris-apache-airflow-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8101 | ok |
| meetup:paris-dataops | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8037 | ok |
| meetup:search-and-data | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7892 | ok |
| meetup:health-data-hub | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8070 | ok |
| meetup:aws-lyon-amazon-web-services-user-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8030 | ok |
| meetup:postgres-toulouse | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8135 | ok |
| meetup:latoulboxducloudnatif | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8035 | ok |
| meetup:google-developer-group-aix-en-provence | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8014 | ok |
| meetup:nice-natural-language-processing-meetup-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8033 | ok |
| meetup:generative-ai-rennes | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7998 | ok |
| meetup:ianancy | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7977 | ok |
| meetup:cfdatalovers | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8080 | ok |
| luma-cal:doctolib-ai-community | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 2991 | ok |
| luma-cal:hcompany.ai | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 3977 | ok |
| luma-cal:aificionados | curated | 1 | 1 | 1 | 1 | 1 | 0 | 5969 | ok |
| luma-cal:genainetwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7037 | ok |
| luma-cal:machina | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 8003 | ok |
| luma-cal:ai-automations-make-global-calendar | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7995 | ok |
| luma-cal:hub-france-ia | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7963 | ok |
| meetup:afup-lorraine-php | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 871 | ok |
| meetup:ai-agent-builders-paris-by-dataiku | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1873 | ok |
| meetup:code-is-art | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 3599 | ok |
| meetup:data-cloud-paris | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5735 | ok |
| meetup:mindstone-lyon-ai-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6502 | ok |
| meetup:wptoulouse | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7414 | ok |
| meetup:mug-toulouse-mobile-user-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7522 | ok |
| meetup:solutiontech | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6810 | ok |
| meetup:android-paris | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 8526 | ok |
| meetup:parisapi | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8541 | ok |
| meetup:alpesjug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8650 | ok |
| meetup:lyonjs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8521 | ok |
| meetup:meetup-harrycow-coworking-toulouse | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7011 | ok |
| meetup:maxsessions | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6950 | ok |
| meetup:rladies-limoges | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8458 | ok |
| meetup:cara-grenoble | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8256 | ok |
| meetup:strasbourg-net-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8419 | ok |
| meetup:meetup-programmez | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8509 | ok |
| meetup:le-meetup-du-laptop-ux-creation | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7040 | ok |
| luma-cal:cal-3G8iH6OhKXzkwOU | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1998 | ok |
| luma-cal:cal-5QALGbpeLcvA6dg | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 3016 | ok |
| luma-cal:cal-zEeI5VCF8jeLwjB | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 4006 | ok |
| luma-cal:augmented-thiga | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 5074 | ok |
| luma-cal:GdgEpita | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 6088 | ok |
| luma-cal:cal-1hB7mHUJ8WZ0l8h | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 7004 | ok |
| luma-cal:cal-8yPHi9oITkCB5CI | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 6998 | ok |
| luma-cal:cal-QEWfkaGcHSASBfq | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 6998 | ok |
| meetup:pydata-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 262 | empty |
| meetup:compute-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 1166 | empty |
| meetup:paris-big-data-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7406 | empty |
| meetup:paris-machine-learning-study-group-in-english-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8018 | empty |
| meetup:paris-women-in-machine-learning-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7912 | empty |
| meetup:mlops-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7910 | empty |
| meetup:paris-nlp | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7784 | empty |
| meetup:generative-ai-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7759 | empty |
| meetup:data-science-leaders | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7949 | empty |
| meetup:data-for-good-france | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7923 | empty |
| meetup:ia-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8012 | empty |
| meetup:rladies-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7982 | empty |
| meetup:french-aws-ug | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7929 | empty |
| meetup:gdg-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8001 | empty |
| meetup:semweb-pro | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7993 | empty |
| meetup:lyon-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7989 | empty |
| meetup:lyon-dataviz | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7982 | empty |
| meetup:tlse-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7960 | empty |
| meetup:meetup-visualisation-des-donnees-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7972 | empty |
| meetup:ia-innovateurs | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7985 | empty |
| meetup:python-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7436 | empty |
| meetup:intelligence-artificielle-aix-marseille | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8045 | empty |
| meetup:bordeaux-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8081 | empty |
| meetup:meetup-postgresql-lille | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7817 | empty |
| meetup:python-rennes | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8001 | empty |
| meetup:strasbourg-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7614 | empty |
| meetup:strasbourg-aws-user-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7671 | empty |
| meetup:afterwork-ia-montpellier | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8002 | empty |
| meetup:ai-for-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7939 | empty |
| meetup:it-business-club-data-cloud-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8038 | empty |
| luma-cal:amilabs | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4773 | empty |
| luma-cal:notionparis | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4994 | empty |
| eventbrite-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 185 | disabled: Eventbrite answered HTTP 405; disabled for the rest of this run |
| eventbrite-lyon | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-toulouse | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-marseille | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-aix-en-provence | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-nantes | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-bordeaux | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-lille | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-grenoble | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-nice | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-rennes | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-strasbourg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-montpellier | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-online | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| hackevents-fr | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Returns an empty calendar (0 VEVENT) for country=fr on 2026-11-21. Re-test later. |
| meetup-city-pages | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 70319 | empty |
| aniti-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| saclay-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| actuia-events | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| meetup:afterwork | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6628 | empty |
| meetup:golang-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7478 | empty |
| meetup:rencontres-tech-innovation | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8513 | empty |
| meetup:chtijug | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8472 | empty |
| meetup:paris-tech-afterwork-talks-networking | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8086 | empty |
| meetup:gdg-rennes | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8354 | empty |
| meetup:finistdevs | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8676 | empty |
| meetup:staff42 | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8172 | empty |
| meetup:proxiadnord | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7044 | empty |
| meetup:paris-philosophy-cafe | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6986 | empty |
| luma-cal:cal-iRk0Ck3LB66OAMa | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 2984 | empty |
| luma-cal:iq-project-ai | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4020 | empty |
| luma-cal:cal-5a2J8U3e8jKPu3W | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4968 | empty |
| luma-cal:cal-0ICm7FJKGW0OHUA | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6994 | empty |
| luma-cal:cal-R4V662MAZSQBUp5 | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7003 | empty |

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
| Paris | 140 | 140 | 0 |
| Other France | 62 | 62 | 0 |
| Online (FR) | 23 | 23 | 0 |
| Lyon | 18 | 18 | 0 |
| Bordeaux | 15 | 15 | 0 |
| Unknown | 15 | 14 | 1 |
| Rennes | 14 | 14 | 0 |
| Marseille-Aix | 13 | 13 | 0 |
| Toulouse | 12 | 12 | 0 |
| Montpellier | 10 | 10 | 0 |
| Lille | 7 | 7 | 0 |
| Nice-Sophia | 6 | 5 | 1 |
| Strasbourg | 3 | 3 | 0 |
| Nantes | 3 | 3 | 0 |
| Grenoble | 3 | 3 | 0 |

Places inside "Other France" (after dedupe): Rouen 6, Other France 4, Nancy 2, Tremblay-en-France 2, Boves 2, Reims 2, Poitiers 2, Saint-Omer 2, Saint-Étienne 2, Bar-le-Duc 2, Clermont-Ferrand 1, Limoges 1, Orchies 1, Estrablin 1, Lézignan-Corbières 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 1086 |
| keyword | 204 |
| window | 101 |
| excluded | 3 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 5 | Data & IA à Lyon : projets, blocages et retours terrain — Table ronde | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr, briefia-meetups |
| 5 | Cloud Native AI Summit Europe | agentconfs, aieventlist-paris, aieventlist-europe, brainberg-fr, createwith-paris |
| 4 | GenerationAI Conference for Agentic Enterprise (Free Tickets) | meetup:paris-ai-tech-talk, meetup:paris-ai, meetup:artificial-intelligence-meetup-paris, brainberg-fr |
| 3 | Forum des 10 ans de Lyon Data Science — Data, IA & communautés | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr |
| 3 | À travers les yeux d’une IA : atelier découverte de la data science | meetup:le-wagon-bordeaux-coding-station-bootcamp, brainberg-fr, briefia-meetups |
| 3 | Bière Agile - Agilité et IA ? | meetup:agile-toulouse, toulouse-tech-hub, brainberg-fr |
| 3 | Meetup #81 - IA et pros du web : on flippe, on s'adapte ou on change de métier ? | meetup:wptoulouse, toulouse-tech-hub, brainberg-fr |
| 3 | MUG TOULOUSE #7 - ANOM et IA Créative: le best-of mobile du DevFest | meetup:mug-toulouse-mobile-user-group, toulouse-tech-hub, brainberg-fr |
| 3 | Paris / Claude Code for Developers | luma-paris, luma-cal:bond-paris, luma-cal:doctolib-ai-community |
| 3 | REX - Du graphe au edge computing : concevoir une IA industrielle distribuée et réutilisable | luma-paris, luma-cal:datacraft, briefia-meetups |

## Failed or empty sources

- meetup:pydata-paris: empty (0 items) - Compute! Paris (ex PyData Paris)
- meetup:compute-paris: empty (0 items) - alias group of pydata-paris, same calendar
- meetup:paris-big-data-meetup: empty (0 items)
- meetup:paris-machine-learning-study-group-in-english-meetup: empty (0 items)
- meetup:paris-women-in-machine-learning-data-science: empty (0 items) - WiMLDS Paris
- meetup:mlops-paris: empty (0 items)
- meetup:paris-nlp: empty (0 items)
- meetup:generative-ai-paris: empty (0 items)
- meetup:data-science-leaders: empty (0 items)
- meetup:data-for-good-france: empty (0 items)
- meetup:ia-paris: empty (0 items) - IA Generale
- meetup:rladies-paris: empty (0 items) - RLadies+ Paris; r-ladies-paris is an alias
- meetup:french-aws-ug: empty (0 items) - AWS User Group France, generic cloud
- meetup:gdg-paris: empty (0 items) - generic dev, AI talks sometimes
- meetup:semweb-pro: empty (0 items) - knowledge graphs / semantic web / AI
- meetup:lyon-ia: empty (0 items) - Lyon & IA
- meetup:lyon-dataviz: empty (0 items)
- meetup:tlse-data-science: empty (0 items) - Toulouse Data Science
- meetup:meetup-visualisation-des-donnees-toulouse: empty (0 items) - Toulouse DataViz
- meetup:ia-innovateurs: empty (0 items) - IA Innovateurs / IA & Apero
- meetup:python-toulouse: empty (0 items)
- meetup:intelligence-artificielle-aix-marseille: empty (0 items)
- meetup:bordeaux-ia: empty (0 items)
- meetup:meetup-postgresql-lille: empty (0 items)
- meetup:python-rennes: empty (0 items)
- meetup:strasbourg-dev: empty (0 items) - Build with AI - Strasbourg
- meetup:strasbourg-aws-user-group: empty (0 items)
- meetup:afterwork-ia-montpellier: empty (0 items)
- meetup:ai-for-dev: empty (0 items)
- meetup:it-business-club-data-cloud-dev: empty (0 items)
- luma-cal:amilabs: empty (0 items) - Fetch via https://api.lu.ma/calendar/get-items?calendar_api_id=<id>&period=future&pagination_limit=50 (id from the page's __NEXT_DATA__ props.pageProps.initialData.data.calendar.api_id), or the ICS https://api.lu.ma/ics/get?entity=calendar&id=<id>. Global calendars: keep only events whose geo_address_info.city is French.
- luma-cal:notionparis: empty (0 items) - Fetch via https://api.lu.ma/calendar/get-items?calendar_api_id=<id>&period=future&pagination_limit=50 (id from the page's __NEXT_DATA__ props.pageProps.initialData.data.calendar.api_id), or the ICS https://api.lu.ma/ics/get?entity=calendar&id=<id>. Global calendars: keep only events whose geo_address_info.city is French.
- WARNING meetup:gdg-paris: returned zero items after 7 days of items

## Notes

- Ledger/ health/ cache files written; elapsed 145 s.
