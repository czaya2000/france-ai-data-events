# Prepare run report

- Date: 2026-11-26 (window 120 days), mode: daily
- Feed sources: 152/152 reachable (100%), 18 disabled
- Totals: fetched 1872, in-window France 744, after keyword filter 523, after dedupe 377, known 373, new 4, sent to Claude 4, deferred by cap 0
- Ledger: 1189 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window FR = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window FR | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 515 | 13 | 13 | 13 | 12 | 0 | 242 | ok |
| brainberg-fr | noisy | 207 | 178 | 91 | 90 | 32 | 0 | 2308 | ok |
| aieventlist-europe | curated | 173 | 8 | 7 | 7 | 0 | 0 | 1119 | ok |
| openagenda | noisy | 173 | 173 | 138 | 130 | 130 | 0 | 9544 | ok |
| confstech | noisy | 138 | 1 | 0 | 0 | 0 | 0 | 1007 | ok |
| luma-cal:claudecommunity | noisy | 115 | 1 | 1 | 1 | 0 | 0 | 18029 | ok |
| luma-cal:genai-collective | curated | 56 | 14 | 14 | 12 | 12 | 0 | 14044 | ok |
| luma-cal:n8n-events | noisy | 56 | 14 | 4 | 4 | 4 | 0 | 12026 | ok |
| briefia-meetups | curated | 50 | 50 | 46 | 44 | 31 | 0 | 462 | ok |
| luma-paris | noisy | 34 | 34 | 12 | 12 | 12 | 0 | 306 | ok |
| aitinkerers-paris | curated | 20 | 4 | 4 | 4 | 1 | 0 | 1514 | ok |
| luma-cal:bond-paris | noisy | 17 | 17 | 11 | 11 | 7 | 0 | 1185 | ok |
| luma-cal:clickhouse-events | noisy | 15 | 7 | 7 | 7 | 6 | 0 | 8011 | ok |
| afia | curated | 15 | 0 | 0 | 0 | 0 | 0 | 2300 | ok |
| toulouse-tech-hub | noisy | 14 | 14 | 5 | 5 | 0 | 0 | 380 | ok |
| aieventlist-paris | curated | 12 | 7 | 6 | 6 | 3 | 0 | 433 | ok |
| devevents | noisy | 11 | 1 | 0 | 0 | 0 | 0 | 297 | ok |
| meetup:le-wagon-bordeaux-coding-station-bootcamp | curated | 10 | 10 | 7 | 7 | 7 | 0 | 8223 | ok |
| meetup:l-apero-de-l-ia | noisy | 10 | 9 | 9 | 9 | 8 | 0 | 7434 | ok |
| meetup:aperos-agiles-montpellier | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8731 | ok |
| meetup:digital-nomads-remote-workers-montpellier | noisy | 10 | 9 | 9 | 9 | 9 | 0 | 8689 | ok |
| meetup:hacksxb | noisy | 8 | 5 | 1 | 1 | 1 | 0 | 8554 | ok |
| meetup:yeeso-itwomen-network | noisy | 8 | 8 | 1 | 1 | 1 | 0 | 7214 | ok |
| luma-cal:cal-cedsWn0tyHau5wm | noisy | 8 | 7 | 1 | 1 | 1 | 0 | 12002 | ok |
| luma-cal:datacraft | curated | 7 | 7 | 7 | 7 | 5 | 0 | 824 | ok |
| meetup:paris-big-data | curated | 6 | 6 | 6 | 6 | 6 | 0 | 6453 | ok |
| luma-cal:neo4j | noisy | 6 | 2 | 2 | 2 | 2 | 0 | 8007 | ok |
| numerique-gouv | curated | 6 | 4 | 1 | 1 | 1 | 0 | 557 | ok |
| hi-paris-ics | curated | 6 | 5 | 5 | 5 | 5 | 0 | 1966 | ok |
| meetup:ac-cdg | noisy | 6 | 6 | 6 | 6 | 0 | 0 | 7666 | ok |
| luma-cal:ai-circle | noisy | 6 | 1 | 1 | 1 | 0 | 0 | 986 | ok |
| luma-cal:softr-events | noisy | 6 | 2 | 2 | 2 | 1 | 0 | 4592 | ok |
| luma-cal:cal-ouvsbv3Gj9kvRGD | noisy | 6 | 0 | 0 | 0 | 0 | 0 | 7008 | ok |
| meetup:le-wagon-lille-coding-station | curated | 5 | 5 | 3 | 3 | 3 | 0 | 8395 | ok |
| luma-cal:womenincode | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7143 | ok |
| createwith-paris | noisy | 5 | 5 | 5 | 4 | 1 | 0 | 1367 | ok |
| meetup:theproductcrew | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7543 | ok |
| meetup:lyondigitalhub | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 6824 | ok |
| meetup:lyon-data-science | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8436 | ok |
| meetup:groupe-meetup-nice-data | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8065 | ok |
| meetup:strasbourg-deep-learning-meetup | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8041 | ok |
| luma-cal:airstreet | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 2072 | ok |
| luma-cal:dust | curated | 3 | 2 | 2 | 2 | 1 | 0 | 3143 | ok |
| luma-cal:nouvellemachine | noisy | 3 | 3 | 2 | 2 | 2 | 0 | 8019 | ok |
| meetup:agile-toulouse | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 1151 | ok |
| meetup:lyondatascience | noisy | 3 | 3 | 3 | 3 | 0 | 0 | 7727 | ok |
| luma-cal:alpic | noisy | 3 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| meetup:paris-ai | curated | 2 | 2 | 2 | 2 | 1 | 0 | 4114 | ok |
| meetup:artificial-intelligence-meetup-paris | curated | 2 | 2 | 2 | 2 | 0 | 0 | 5151 | ok |
| meetup:les-meetups-de-l-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8024 | ok |
| meetup:ai-first | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8116 | ok |
| luma-cal:ai-automations-make-global-calendar | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8012 | ok |
| meetup:solutiontech | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8318 | ok |
| meetup:android-paris | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 8545 | ok |
| meetup:meetup-harrycow-coworking-toulouse | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8511 | ok |
| meetup:software-craftsmanship-lille | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8495 | ok |
| luma-cal:augmented-thiga | noisy | 2 | 2 | 1 | 1 | 0 | 0 | 2987 | ok |
| luma-cal:alan.eu | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 5628 | ok |
| luma-cal:Paris-hardware-meetup | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 7156 | ok |
| meetup:pydata-paris | curated | 1 | 1 | 1 | 1 | 1 | 0 | 297 | ok |
| meetup:compute-paris | curated | 1 | 1 | 1 | 1 | 0 | 0 | 1175 | ok |
| meetup:paris-dataladies | curated | 1 | 1 | 1 | 1 | 1 | 0 | 2143 | ok |
| meetup:paris-ai-tech-talk | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3091 | ok |
| meetup:paris-dbt-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7824 | ok |
| meetup:paris-apache-airflow-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7959 | ok |
| meetup:paris-dataops | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7967 | ok |
| meetup:gdg-paris | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8114 | ok |
| meetup:semweb-pro | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8031 | ok |
| meetup:health-data-hub | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7958 | ok |
| meetup:aws-lyon-amazon-web-services-user-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8018 | ok |
| meetup:ia-innovateurs | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8040 | ok |
| meetup:postgres-toulouse | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8027 | ok |
| meetup:latoulboxducloudnatif | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8068 | ok |
| meetup:google-developer-group-aix-en-provence | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8020 | ok |
| meetup:generative-ai-rennes | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7999 | ok |
| meetup:strasbourg-aws-user-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7600 | ok |
| meetup:ianancy | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8048 | ok |
| meetup:cfdatalovers | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8022 | ok |
| luma-cal:doctolib-ai-community | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 2985 | ok |
| luma-cal:hcompany.ai | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 4120 | ok |
| luma-cal:aificionados | curated | 1 | 1 | 1 | 1 | 1 | 0 | 6000 | ok |
| luma-cal:cto-de-lyon | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 6139 | ok |
| luma-cal:genainetwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7005 | ok |
| luma-cal:machina | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 7980 | ok |
| luma-cal:hub-france-ia | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7994 | ok |
| meetup:code-is-art | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 1756 | ok |
| meetup:data-cloud-paris | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 2766 | ok |
| meetup:mindstone-lyon-ai-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 3805 | ok |
| meetup:afterwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4131 | ok |
| meetup:wptoulouse | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5084 | ok |
| meetup:mug-toulouse-mobile-user-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5963 | ok |
| meetup:gdg-rennes | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6837 | ok |
| meetup:finistdevs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8304 | ok |
| meetup:staff42 | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8275 | ok |
| meetup:proxiadnord | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8397 | ok |
| meetup:parisapi | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8554 | ok |
| meetup:alpesjug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6994 | ok |
| meetup:lyonjs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8501 | ok |
| meetup:maxsessions | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8406 | ok |
| meetup:rladies-limoges | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8458 | ok |
| meetup:cara-grenoble | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8270 | ok |
| meetup:strasbourg-net-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6945 | ok |
| meetup:meetup-programmez | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8506 | ok |
| meetup:ksug-in | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8524 | ok |
| meetup:le-meetup-du-laptop-ux-creation | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8544 | ok |
| luma-cal:cal-3G8iH6OhKXzkwOU | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 113 | ok |
| luma-cal:cal-5QALGbpeLcvA6dg | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 2002 | ok |
| luma-cal:cal-zEeI5VCF8jeLwjB | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 2043 | ok |
| luma-cal:iq-project-ai | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 3148 | ok |
| luma-cal:cal-5a2J8U3e8jKPu3W | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 3006 | ok |
| luma-cal:GdgEpita | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 3584 | ok |
| luma-cal:cal-1hB7mHUJ8WZ0l8h | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 6001 | ok |
| luma-cal:cal-8yPHi9oITkCB5CI | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 6765 | ok |
| luma-cal:cal-QEWfkaGcHSASBfq | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 7007 | ok |
| luma-cal:cal-R4V662MAZSQBUp5 | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 6815 | ok |
| meetup:ai-agent-builders-paris-by-dataiku | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| meetup:paris-big-data-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7092 | empty |
| meetup:paris-machine-learning-study-group-in-english-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7969 | empty |
| meetup:paris-women-in-machine-learning-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7976 | empty |
| meetup:mlops-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7997 | empty |
| meetup:paris-nlp | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7655 | empty |
| meetup:generative-ai-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7977 | empty |
| meetup:data-science-leaders | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8009 | empty |
| meetup:search-and-data | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7961 | empty |
| meetup:data-for-good-france | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7988 | empty |
| meetup:ia-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8035 | empty |
| meetup:rladies-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7982 | empty |
| meetup:french-aws-ug | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7992 | empty |
| meetup:lyon-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7972 | empty |
| meetup:lyon-dataviz | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7997 | empty |
| meetup:tlse-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7982 | empty |
| meetup:meetup-visualisation-des-donnees-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7899 | empty |
| meetup:python-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7532 | empty |
| meetup:intelligence-artificielle-aix-marseille | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7995 | empty |
| meetup:bordeaux-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8040 | empty |
| meetup:meetup-postgresql-lille | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7974 | empty |
| meetup:nice-natural-language-processing-meetup-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7928 | empty |
| meetup:python-rennes | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7939 | empty |
| meetup:strasbourg-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7766 | empty |
| meetup:afterwork-ia-montpellier | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7977 | empty |
| meetup:ai-for-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7917 | empty |
| meetup:it-business-club-data-cloud-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7985 | empty |
| luma-cal:amilabs | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5055 | empty |
| luma-cal:notionparis | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5044 | empty |
| eventbrite-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 151 | disabled: Eventbrite answered HTTP 405; disabled for the rest of this run |
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
| eventbrite-online | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| hackevents-fr | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Returns an empty calendar (0 VEVENT) for country=fr on 2026-11-21. Re-test later. |
| meetup-city-pages | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 64723 | empty |
| aniti-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| saclay-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| actuia-events | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| meetup:golang-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4947 | empty |
| meetup:rencontres-tech-innovation | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7803 | empty |
| meetup:chtijug | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8475 | empty |
| meetup:paris-tech-afterwork-talks-networking | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6934 | empty |
| meetup:paris-philosophy-cafe | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8477 | empty |
| luma-cal:cal-iRk0Ck3LB66OAMa | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1129 | empty |
| luma-cal:cal-0ICm7FJKGW0OHUA | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6991 | empty |

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
| cnrs-agenda | not due |  |  | slot day 3 |
| bigdataparis | not due |  |  | slot day 1 |
| vivatech | not due |  |  | slot day 1 |
| dotai | not due |  |  | slot day 1 |
| cerim-lille | not due |  |  | slot day 3 |
| conftech-france-map | skipped |  |  | js: true (Playwright arrives later) |
| systematic-paris-region | ready | 2506 | 6 |  |
| bpifrance-events | ready | 3125 | 11 |  |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Paris | 149 | 147 | 2 |
| Other France | 77 | 76 | 1 |
| Online (FR) | 21 | 21 | 0 |
| Lyon | 18 | 18 | 0 |
| Bordeaux | 16 | 16 | 0 |
| Rennes | 16 | 16 | 0 |
| Unknown | 15 | 14 | 1 |
| Toulouse | 13 | 13 | 0 |
| Marseille-Aix | 13 | 13 | 0 |
| Montpellier | 10 | 10 | 0 |
| Lille | 9 | 9 | 0 |
| Nice-Sophia | 6 | 6 | 0 |
| Strasbourg | 6 | 6 | 0 |
| Nantes | 5 | 5 | 0 |
| Grenoble | 3 | 3 | 0 |

Places inside "Other France" (after dedupe): Rouen 6, Other France 4, Orchies 3, Nancy 2, Le Mans 2, Tremblay-en-France 2, Boves 2, Reims 2, Poitiers 2, Saint-Omer 2, Vienne 2, Abbeville 2, Blois 2, Saint-Étienne 2, Bar-le-Duc 2

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 1032 |
| keyword | 217 |
| window | 96 |
| excluded | 4 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 5 | Data & IA à Lyon : projets, blocages et retours terrain — Table ronde | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr, briefia-meetups |
| 5 | IA & Apéro 10e rencontre ! | meetup:ia-innovateurs, meetup:l-apero-de-l-ia, toulouse-tech-hub, brainberg-fr |
| 5 | Cloud Native AI Summit Europe | agentconfs, aieventlist-paris, aieventlist-europe, brainberg-fr, createwith-paris |
| 4 | GenerationAI Conference for Agentic Enterprise (Free Tickets) | meetup:paris-ai-tech-talk, meetup:paris-ai, meetup:artificial-intelligence-meetup-paris, brainberg-fr |
| 3 | Forum des 10 ans de Lyon Data Science — Data, IA & communautés | meetup:lyon-data-science, meetup:lyondatascience, brainberg-fr |
| 3 | À travers les yeux d’une IA : atelier découverte de la data science | meetup:le-wagon-bordeaux-coding-station-bootcamp, brainberg-fr, briefia-meetups |
| 3 | Bière Agile - Agilité et IA ? | meetup:agile-toulouse, toulouse-tech-hub, brainberg-fr |
| 3 | Meetup #81 - IA et pros du web : on flippe, on s'adapte ou on change de métier ? | meetup:wptoulouse, toulouse-tech-hub, brainberg-fr |
| 3 | MUG TOULOUSE #7 - ANOM et IA Créative: le best-of mobile du DevFest | meetup:mug-toulouse-mobile-user-group, toulouse-tech-hub, brainberg-fr |
| 3 | Paris / Claude Code for Developers | luma-paris, luma-cal:bond-paris, luma-cal:doctolib-ai-community |

## Failed or empty sources

- meetup:paris-big-data-meetup: empty (0 items)
- meetup:paris-machine-learning-study-group-in-english-meetup: empty (0 items)
- meetup:paris-women-in-machine-learning-data-science: empty (0 items) - WiMLDS Paris
- meetup:mlops-paris: empty (0 items)
- meetup:paris-nlp: empty (0 items)
- meetup:generative-ai-paris: empty (0 items)
- meetup:data-science-leaders: empty (0 items)
- meetup:search-and-data: empty (0 items) - Search, Data and AI
- meetup:data-for-good-france: empty (0 items)
- meetup:ia-paris: empty (0 items) - IA Generale
- meetup:rladies-paris: empty (0 items) - RLadies+ Paris; r-ladies-paris is an alias
- meetup:french-aws-ug: empty (0 items) - AWS User Group France, generic cloud
- meetup:lyon-ia: empty (0 items) - Lyon & IA
- meetup:lyon-dataviz: empty (0 items)
- meetup:tlse-data-science: empty (0 items) - Toulouse Data Science
- meetup:meetup-visualisation-des-donnees-toulouse: empty (0 items) - Toulouse DataViz
- meetup:python-toulouse: empty (0 items)
- meetup:intelligence-artificielle-aix-marseille: empty (0 items)
- meetup:bordeaux-ia: empty (0 items)
- meetup:meetup-postgresql-lille: empty (0 items)
- meetup:nice-natural-language-processing-meetup-group: empty (0 items) - GAP Nice AI & ML
- meetup:python-rennes: empty (0 items)
- meetup:strasbourg-dev: empty (0 items) - Build with AI - Strasbourg
- meetup:afterwork-ia-montpellier: empty (0 items)
- meetup:ai-for-dev: empty (0 items)
- meetup:it-business-club-data-cloud-dev: empty (0 items)
- luma-cal:amilabs: empty (0 items) - Fetch via https://api.lu.ma/calendar/get-items?calendar_api_id=<id>&period=future&pagination_limit=50 (id from the page's __NEXT_DATA__ props.pageProps.initialData.data.calendar.api_id), or the ICS https://api.lu.ma/ics/get?entity=calendar&id=<id>. Global calendars: keep only events whose geo_address_info.city is French.
- luma-cal:notionparis: empty (0 items) - Fetch via https://api.lu.ma/calendar/get-items?calendar_api_id=<id>&period=future&pagination_limit=50 (id from the page's __NEXT_DATA__ props.pageProps.initialData.data.calendar.api_id), or the ICS https://api.lu.ma/ics/get?entity=calendar&id=<id>. Global calendars: keep only events whose geo_address_info.city is French.

## Discovery (Meetup groups and Luma calendars)

- meetup ai-agent-builders-paris-by-dataiku: ok, polled from now on
- luma alpic: ok, polled from now on

## Notes

- Ledger/ health/ cache files written; elapsed 144 s.
