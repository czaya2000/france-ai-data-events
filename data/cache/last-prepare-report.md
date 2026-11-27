# Prepare run report

- Date: 2026-11-27 (window 120 days), mode: daily
- Feed sources: 156/156 reachable (100%), 18 disabled
- Totals: fetched 1901, in-window France 691, after keyword filter 482, after dedupe 354, known 340, new 14, sent to Claude 14, deferred by cap 0
- Ledger: 1206 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window FR = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window FR | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 615 | 15 | 15 | 15 | 14 | 0 | 268 | ok |
| brainberg-fr | noisy | 198 | 168 | 85 | 85 | 32 | 0 | 2960 | ok |
| aieventlist-europe | curated | 164 | 8 | 7 | 7 | 0 | 0 | 1169 | ok |
| openagenda | noisy | 150 | 150 | 122 | 116 | 116 | 0 | 9476 | ok |
| confstech | noisy | 138 | 1 | 0 | 0 | 0 | 0 | 1060 | ok |
| luma-cal:claudecommunity | noisy | 107 | 1 | 1 | 1 | 0 | 0 | 18524 | ok |
| luma-cal:genai-collective | curated | 55 | 14 | 14 | 12 | 12 | 0 | 14021 | ok |
| luma-cal:n8n-events | noisy | 52 | 15 | 5 | 5 | 5 | 0 | 11998 | ok |
| briefia-meetups | curated | 46 | 46 | 42 | 40 | 30 | 0 | 419 | ok |
| luma-paris | noisy | 32 | 32 | 11 | 11 | 11 | 0 | 133 | ok |
| aitinkerers-paris | curated | 20 | 4 | 4 | 4 | 1 | 0 | 1384 | ok |
| afia | curated | 15 | 0 | 0 | 0 | 0 | 0 | 2531 | ok |
| luma-cal:bond-paris | noisy | 14 | 14 | 8 | 8 | 3 | 0 | 1110 | ok |
| luma-cal:clickhouse-events | noisy | 13 | 7 | 7 | 7 | 6 | 0 | 8013 | ok |
| toulouse-tech-hub | noisy | 13 | 12 | 4 | 4 | 0 | 0 | 364 | ok |
| aieventlist-paris | curated | 12 | 7 | 6 | 6 | 2 | 0 | 631 | ok |
| devevents | noisy | 11 | 1 | 0 | 0 | 0 | 0 | 291 | ok |
| meetup:le-wagon-bordeaux-coding-station-bootcamp | curated | 10 | 10 | 8 | 8 | 8 | 0 | 8595 | ok |
| meetup:l-apero-de-l-ia | noisy | 10 | 8 | 8 | 8 | 8 | 0 | 7600 | ok |
| meetup:aperos-agiles-montpellier | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 7200 | ok |
| meetup:digital-nomads-remote-workers-montpellier | noisy | 10 | 9 | 9 | 9 | 9 | 0 | 8735 | ok |
| meetup:hacksxb | noisy | 8 | 5 | 1 | 1 | 1 | 0 | 7077 | ok |
| luma-cal:cal-cedsWn0tyHau5wm | noisy | 8 | 7 | 1 | 1 | 1 | 0 | 12569 | ok |
| meetup:yeeso-itwomen-network | noisy | 7 | 7 | 1 | 1 | 1 | 0 | 7199 | ok |
| luma-cal:cal-SqDwK6XAVF8AiZh | noisy | 7 | 2 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:le-wagon-lille-coding-station | curated | 6 | 6 | 4 | 4 | 4 | 0 | 8236 | ok |
| luma-cal:datacraft | curated | 6 | 6 | 6 | 6 | 5 | 0 | 913 | ok |
| luma-cal:neo4j | noisy | 6 | 2 | 2 | 2 | 2 | 0 | 8140 | ok |
| numerique-gouv | curated | 6 | 4 | 1 | 1 | 1 | 0 | 633 | ok |
| hi-paris-ics | curated | 6 | 5 | 5 | 5 | 5 | 0 | 2046 | ok |
| luma-cal:ai-circle | noisy | 6 | 1 | 1 | 1 | 0 | 0 | 1005 | ok |
| meetup:paris-big-data | curated | 5 | 5 | 5 | 5 | 5 | 0 | 6393 | ok |
| luma-cal:womenincode | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7137 | ok |
| createwith-paris | noisy | 5 | 5 | 5 | 4 | 1 | 0 | 711 | ok |
| meetup:theproductcrew | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7615 | ok |
| meetup:ac-cdg | noisy | 5 | 5 | 5 | 5 | 0 | 0 | 7628 | ok |
| luma-cal:softr-events | noisy | 5 | 2 | 2 | 2 | 1 | 0 | 5011 | ok |
| luma-cal:cal-ouvsbv3Gj9kvRGD | noisy | 5 | 0 | 0 | 0 | 0 | 0 | 7005 | ok |
| meetup:lyondigitalhub | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 6744 | ok |
| meetup:lyon-data-science | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8341 | ok |
| meetup:strasbourg-deep-learning-meetup | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8226 | ok |
| luma-cal:airstreet | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 1988 | ok |
| luma-cal:dust | curated | 3 | 2 | 2 | 2 | 1 | 0 | 3060 | ok |
| luma-cal:nouvellemachine | noisy | 3 | 3 | 2 | 2 | 2 | 0 | 7998 | ok |
| meetup:agile-toulouse | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 1079 | ok |
| meetup:lyondatascience | noisy | 3 | 3 | 3 | 3 | 0 | 0 | 7139 | ok |
| luma-cal:alpic | noisy | 3 | 1 | 1 | 1 | 0 | 0 | 70 | ok |
| meetup:agile-testing-paris | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 0 | ok |
| luma-cal:cal-qFg6R8OBKsMjMhr | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:paris-ai | curated | 2 | 2 | 2 | 2 | 1 | 0 | 4274 | ok |
| meetup:artificial-intelligence-meetup-paris | curated | 2 | 2 | 2 | 2 | 0 | 0 | 5314 | ok |
| meetup:groupe-meetup-nice-data | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8191 | ok |
| meetup:les-meetups-de-l-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 7993 | ok |
| meetup:ai-first | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8213 | ok |
| luma-cal:cto-de-lyon | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 6083 | ok |
| luma-cal:ai-automations-make-global-calendar | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8020 | ok |
| meetup:meetup-harrycow-coworking-toulouse | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8501 | ok |
| meetup:software-craftsmanship-lille | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8457 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8490 | ok |
| luma-cal:alan.eu | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 6257 | ok |
| luma-cal:Paris-hardware-meetup | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 7003 | ok |
| meetup:paris-dataladies | curated | 1 | 1 | 1 | 1 | 1 | 0 | 2290 | ok |
| meetup:paris-ai-tech-talk | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3171 | ok |
| meetup:paris-dbt-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8014 | ok |
| meetup:paris-apache-airflow-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8004 | ok |
| meetup:paris-dataops | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7936 | ok |
| meetup:search-and-data | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8016 | ok |
| meetup:gdg-paris | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8079 | ok |
| meetup:health-data-hub | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7992 | ok |
| meetup:aws-lyon-amazon-web-services-user-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8010 | ok |
| meetup:postgres-toulouse | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7947 | ok |
| meetup:latoulboxducloudnatif | curated | 1 | 1 | 0 | 0 | 0 | 0 | 7677 | ok |
| meetup:google-developer-group-aix-en-provence | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8047 | ok |
| meetup:generative-ai-rennes | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8022 | ok |
| meetup:ianancy | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7952 | ok |
| meetup:cfdatalovers | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8015 | ok |
| luma-cal:doctolib-ai-community | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 2914 | ok |
| luma-cal:hcompany.ai | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 4093 | ok |
| luma-cal:aificionados | curated | 1 | 1 | 1 | 1 | 1 | 0 | 5712 | ok |
| luma-cal:genainetwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7004 | ok |
| luma-cal:machina | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 8022 | ok |
| luma-cal:hub-france-ia | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7978 | ok |
| meetup:ai-agent-builders-paris-by-dataiku | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 175 | ok |
| meetup:code-is-art | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 1908 | ok |
| meetup:data-cloud-paris | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 2732 | ok |
| meetup:mindstone-lyon-ai-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 3792 | ok |
| meetup:wptoulouse | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6711 | ok |
| meetup:mug-toulouse-mobile-user-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7553 | ok |
| meetup:solutiontech | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8326 | ok |
| meetup:android-paris | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 8417 | ok |
| meetup:parisapi | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6949 | ok |
| meetup:alpesjug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7081 | ok |
| meetup:lyonjs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8939 | ok |
| meetup:maxsessions | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8477 | ok |
| meetup:rladies-limoges | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 9338 | ok |
| meetup:cara-grenoble | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8309 | ok |
| meetup:strasbourg-net-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6731 | ok |
| meetup:meetup-programmez | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8485 | ok |
| meetup:le-meetup-du-laptop-ux-creation | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8515 | ok |
| luma-cal:cal-3G8iH6OhKXzkwOU | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 969 | ok |
| luma-cal:cal-5QALGbpeLcvA6dg | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 2021 | ok |
| luma-cal:cal-zEeI5VCF8jeLwjB | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 3003 | ok |
| luma-cal:augmented-thiga | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 3520 | ok |
| luma-cal:GdgEpita | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 3990 | ok |
| luma-cal:cal-1hB7mHUJ8WZ0l8h | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 6482 | ok |
| luma-cal:cal-8yPHi9oITkCB5CI | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7001 | ok |
| luma-cal:cal-QEWfkaGcHSASBfq | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 7007 | ok |
| meetup:afup-lorraine-php | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:pydata-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 587 | empty |
| meetup:compute-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 1166 | empty |
| meetup:paris-big-data-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7212 | empty |
| meetup:paris-machine-learning-study-group-in-english-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7910 | empty |
| meetup:paris-women-in-machine-learning-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8205 | empty |
| meetup:mlops-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7924 | empty |
| meetup:paris-nlp | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7793 | empty |
| meetup:generative-ai-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8062 | empty |
| meetup:data-science-leaders | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7635 | empty |
| meetup:data-for-good-france | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8327 | empty |
| meetup:ia-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7782 | empty |
| meetup:rladies-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7968 | empty |
| meetup:french-aws-ug | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8089 | empty |
| meetup:semweb-pro | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7896 | empty |
| meetup:lyon-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7990 | empty |
| meetup:lyon-dataviz | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7989 | empty |
| meetup:tlse-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8071 | empty |
| meetup:meetup-visualisation-des-donnees-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7882 | empty |
| meetup:ia-innovateurs | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7995 | empty |
| meetup:python-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7689 | empty |
| meetup:intelligence-artificielle-aix-marseille | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8026 | empty |
| meetup:bordeaux-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7892 | empty |
| meetup:meetup-postgresql-lille | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8001 | empty |
| meetup:nice-natural-language-processing-meetup-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7999 | empty |
| meetup:python-rennes | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8134 | empty |
| meetup:strasbourg-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7431 | empty |
| meetup:strasbourg-aws-user-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7828 | empty |
| meetup:afterwork-ia-montpellier | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7997 | empty |
| meetup:ai-for-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7656 | empty |
| meetup:it-business-club-data-cloud-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7977 | empty |
| luma-cal:amilabs | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4996 | empty |
| luma-cal:notionparis | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4991 | empty |
| eventbrite-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 172 | disabled: Eventbrite answered HTTP 405; disabled for the rest of this run |
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
| meetup-city-pages | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 67917 | empty |
| aniti-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| saclay-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| actuia-events | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| meetup:afterwork | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4294 | empty |
| meetup:golang-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6412 | empty |
| meetup:rencontres-tech-innovation | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7027 | empty |
| meetup:chtijug | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7038 | empty |
| meetup:paris-tech-afterwork-talks-networking | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8375 | empty |
| meetup:gdg-rennes | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8405 | empty |
| meetup:finistdevs | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8314 | empty |
| meetup:staff42 | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8021 | empty |
| meetup:proxiadnord | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8507 | empty |
| meetup:paris-philosophy-cafe | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7558 | empty |
| luma-cal:cal-iRk0Ck3LB66OAMa | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1844 | empty |
| luma-cal:iq-project-ai | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 3013 | empty |
| luma-cal:cal-5a2J8U3e8jKPu3W | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 2984 | empty |
| luma-cal:cal-0ICm7FJKGW0OHUA | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6740 | empty |
| luma-cal:cal-R4V662MAZSQBUp5 | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6990 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| hub-franceia | not due |  |  | slot day 1 |
| allai-fr | not due |  |  | slot day 1 |
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
| bigdataparis | not due |  |  | slot day 1 |
| vivatech | not due |  |  | slot day 1 |
| dotai | not due |  |  | slot day 1 |
| cerim-lille | not due |  |  | slot day 3 |
| conftech-france-map | skipped |  |  | js: true (Playwright arrives later) |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Paris | 142 | 135 | 7 |
| Other France | 67 | 65 | 2 |
| Online (FR) | 23 | 21 | 2 |
| Lyon | 18 | 18 | 0 |
| Bordeaux | 16 | 14 | 2 |
| Rennes | 15 | 15 | 0 |
| Unknown | 14 | 14 | 0 |
| Marseille-Aix | 13 | 13 | 0 |
| Toulouse | 12 | 12 | 0 |
| Montpellier | 10 | 10 | 0 |
| Lille | 7 | 6 | 1 |
| Nice-Sophia | 5 | 5 | 0 |
| Strasbourg | 5 | 5 | 0 |
| Nantes | 4 | 4 | 0 |
| Grenoble | 3 | 3 | 0 |

Places inside "Other France" (after dedupe): Rouen 6, Other France 4, Nancy 2, Orchies 2, Tremblay-en-France 2, Boves 2, Reims 2, Poitiers 2, Saint-Omer 2, Blois 2, Saint-Étienne 2, Bar-le-Duc 2, Clermont-Ferrand 1, Limoges 1, Estrablin 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 1107 |
| keyword | 206 |
| window | 103 |
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
- meetup:nice-natural-language-processing-meetup-group: empty (0 items) - GAP Nice AI & ML
- meetup:python-rennes: empty (0 items)
- meetup:strasbourg-dev: empty (0 items) - Build with AI - Strasbourg
- meetup:strasbourg-aws-user-group: empty (0 items)
- meetup:afterwork-ia-montpellier: empty (0 items)
- meetup:ai-for-dev: empty (0 items)
- meetup:it-business-club-data-cloud-dev: empty (0 items)
- luma-cal:amilabs: empty (0 items) - Fetch via https://api.lu.ma/calendar/get-items?calendar_api_id=<id>&period=future&pagination_limit=50 (id from the page's __NEXT_DATA__ props.pageProps.initialData.data.calendar.api_id), or the ICS https://api.lu.ma/ics/get?entity=calendar&id=<id>. Global calendars: keep only events whose geo_address_info.city is French.
- luma-cal:notionparis: empty (0 items) - Fetch via https://api.lu.ma/calendar/get-items?calendar_api_id=<id>&period=future&pagination_limit=50 (id from the page's __NEXT_DATA__ props.pageProps.initialData.data.calendar.api_id), or the ICS https://api.lu.ma/ics/get?entity=calendar&id=<id>. Global calendars: keep only events whose geo_address_info.city is French.

## Discovery (Meetup groups and Luma calendars)

- meetup agile-testing-paris: ok, polled from now on
- meetup afup-lorraine-php: ok, polled from now on
- luma cal-SqDwK6XAVF8AiZh: ok, polled from now on
- luma cal-qFg6R8OBKsMjMhr: ok, polled from now on

## Notes

- Ledger/ health/ cache files written; elapsed 145 s.
