# Prepare run report

- Date: 2026-11-25 (window 120 days), mode: daily
- Feed sources: 150/150 reachable (100%), 18 disabled
- Totals: fetched 1961, in-window France 793, after keyword filter 555, after dedupe 402, known 389, new 13, sent to Claude 13, deferred by cap 0
- Ledger: 1155 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window FR = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window FR | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 544 | 13 | 13 | 13 | 12 | 0 | 285 | ok |
| brainberg-fr | noisy | 224 | 195 | 99 | 97 | 33 | 0 | 3088 | ok |
| openagenda | noisy | 187 | 187 | 151 | 142 | 142 | 0 | 9528 | ok |
| aieventlist-europe | curated | 179 | 8 | 7 | 7 | 0 | 0 | 1026 | ok |
| confstech | noisy | 138 | 1 | 0 | 0 | 0 | 0 | 1075 | ok |
| luma-cal:claudecommunity | noisy | 119 | 1 | 1 | 1 | 1 | 0 | 19065 | ok |
| luma-cal:genai-collective | curated | 59 | 17 | 17 | 15 | 15 | 0 | 13899 | ok |
| luma-cal:n8n-events | noisy | 53 | 13 | 4 | 4 | 4 | 0 | 12012 | ok |
| briefia-meetups | curated | 50 | 50 | 46 | 44 | 32 | 0 | 358 | ok |
| luma-paris | noisy | 38 | 38 | 10 | 10 | 10 | 0 | 312 | ok |
| luma-cal:bond-paris | noisy | 21 | 21 | 14 | 14 | 10 | 0 | 1205 | ok |
| aitinkerers-paris | curated | 20 | 4 | 4 | 4 | 1 | 0 | 1494 | ok |
| luma-cal:clickhouse-events | noisy | 16 | 7 | 7 | 7 | 6 | 0 | 7981 | ok |
| toulouse-tech-hub | noisy | 15 | 15 | 5 | 5 | 0 | 0 | 456 | ok |
| afia | curated | 15 | 0 | 0 | 0 | 0 | 0 | 1845 | ok |
| devevents | noisy | 13 | 1 | 0 | 0 | 0 | 0 | 449 | ok |
| aieventlist-paris | curated | 12 | 7 | 6 | 6 | 3 | 0 | 507 | ok |
| meetup:le-wagon-bordeaux-coding-station-bootcamp | curated | 10 | 10 | 7 | 7 | 7 | 0 | 8221 | ok |
| meetup:l-apero-de-l-ia | noisy | 10 | 9 | 9 | 9 | 8 | 0 | 3539 | ok |
| meetup:aperos-agiles-montpellier | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 7643 | ok |
| meetup:digital-nomads-remote-workers-montpellier | noisy | 10 | 9 | 9 | 9 | 9 | 0 | 7212 | ok |
| meetup:hacksxb | noisy | 8 | 5 | 1 | 1 | 1 | 0 | 8549 | ok |
| meetup:yeeso-itwomen-network | noisy | 8 | 8 | 1 | 1 | 1 | 0 | 8817 | ok |
| luma-cal:cal-cedsWn0tyHau5wm | noisy | 8 | 7 | 1 | 1 | 1 | 0 | 11980 | ok |
| luma-cal:datacraft | curated | 7 | 7 | 7 | 7 | 5 | 0 | 875 | ok |
| luma-cal:cal-ouvsbv3Gj9kvRGD | noisy | 7 | 1 | 1 | 1 | 0 | 0 | 7021 | ok |
| meetup:paris-big-data | curated | 6 | 6 | 6 | 6 | 6 | 0 | 6774 | ok |
| meetup:le-wagon-lille-coding-station | curated | 6 | 6 | 3 | 3 | 3 | 0 | 8319 | ok |
| luma-cal:neo4j | noisy | 6 | 2 | 2 | 2 | 2 | 0 | 7992 | ok |
| hi-paris-ics | curated | 6 | 5 | 5 | 5 | 5 | 0 | 1784 | ok |
| meetup:ac-cdg | noisy | 6 | 6 | 6 | 6 | 0 | 0 | 6184 | ok |
| luma-cal:softr-events | noisy | 6 | 2 | 2 | 2 | 1 | 0 | 4144 | ok |
| luma-cal:ai-circle | noisy | 6 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:womenincode | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7126 | ok |
| createwith-paris | noisy | 5 | 5 | 5 | 4 | 1 | 0 | 642 | ok |
| meetup:theproductcrew | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 2863 | ok |
| numerique-gouv | curated | 4 | 2 | 1 | 1 | 1 | 0 | 768 | ok |
| meetup:lyondigitalhub | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 8377 | ok |
| meetup:agile-toulouse | noisy | 4 | 4 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:lyon-data-science | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8332 | ok |
| meetup:groupe-meetup-nice-data | curated | 3 | 3 | 3 | 3 | 3 | 0 | 7990 | ok |
| meetup:strasbourg-deep-learning-meetup | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8072 | ok |
| luma-cal:airstreet | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 2107 | ok |
| luma-cal:dust | curated | 3 | 2 | 2 | 2 | 1 | 0 | 3161 | ok |
| luma-cal:nouvellemachine | noisy | 3 | 3 | 2 | 2 | 2 | 0 | 7998 | ok |
| luma-cal:ai-automations-make-global-calendar | noisy | 3 | 2 | 2 | 2 | 2 | 0 | 8001 | ok |
| meetup:lyondatascience | noisy | 3 | 3 | 3 | 3 | 0 | 0 | 7049 | ok |
| meetup:paris-ai | curated | 2 | 2 | 2 | 2 | 1 | 0 | 4167 | ok |
| meetup:artificial-intelligence-meetup-paris | curated | 2 | 2 | 2 | 2 | 0 | 0 | 5193 | ok |
| meetup:health-data-hub | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8045 | ok |
| meetup:strasbourg-aws-user-group | curated | 2 | 2 | 2 | 1 | 1 | 0 | 7725 | ok |
| meetup:les-meetups-de-l-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8021 | ok |
| meetup:ai-first | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8087 | ok |
| meetup:solutiontech | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8310 | ok |
| meetup:android-paris | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 8515 | ok |
| meetup:meetup-harrycow-coworking-toulouse | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8500 | ok |
| luma-cal:cal-5QALGbpeLcvA6dg | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 1006 | ok |
| luma-cal:cal-zEeI5VCF8jeLwjB | noisy | 2 | 2 | 1 | 1 | 0 | 0 | 1141 | ok |
| luma-cal:iq-project-ai | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 1986 | ok |
| luma-cal:augmented-thiga | noisy | 2 | 2 | 1 | 1 | 0 | 0 | 2979 | ok |
| luma-cal:alan.eu | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 5012 | ok |
| luma-cal:Paris-hardware-meetup | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 6633 | ok |
| luma-cal:cal-R4V662MAZSQBUp5 | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 6823 | ok |
| meetup:pydata-paris | curated | 1 | 1 | 1 | 1 | 1 | 0 | 454 | ok |
| meetup:compute-paris | curated | 1 | 1 | 1 | 1 | 0 | 0 | 1117 | ok |
| meetup:paris-dataladies | curated | 1 | 1 | 1 | 1 | 1 | 0 | 2219 | ok |
| meetup:paris-ai-tech-talk | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3148 | ok |
| meetup:paris-dbt-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7709 | ok |
| meetup:paris-apache-airflow-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8009 | ok |
| meetup:gdg-paris | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8010 | ok |
| meetup:semweb-pro | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8075 | ok |
| meetup:aws-lyon-amazon-web-services-user-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8021 | ok |
| meetup:ia-innovateurs | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7985 | ok |
| meetup:postgres-toulouse | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8003 | ok |
| meetup:latoulboxducloudnatif | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8044 | ok |
| meetup:google-developer-group-aix-en-provence | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8057 | ok |
| meetup:generative-ai-rennes | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8007 | ok |
| meetup:strasbourg-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7825 | ok |
| meetup:ianancy | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8028 | ok |
| meetup:cfdatalovers | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7995 | ok |
| meetup:it-business-club-data-cloud-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8021 | ok |
| luma-cal:doctolib-ai-community | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 2976 | ok |
| luma-cal:hcompany.ai | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 4135 | ok |
| luma-cal:notionparis | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 5035 | ok |
| luma-cal:aificionados | curated | 1 | 1 | 1 | 1 | 1 | 0 | 5996 | ok |
| luma-cal:cto-de-lyon | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 6107 | ok |
| luma-cal:genainetwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6998 | ok |
| luma-cal:machina | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 8016 | ok |
| luma-cal:hub-france-ia | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7978 | ok |
| meetup:golang-paris | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 161 | ok |
| meetup:wptoulouse | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 976 | ok |
| meetup:mug-toulouse-mobile-user-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 1979 | ok |
| meetup:paris-tech-afterwork-talks-networking | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7421 | ok |
| meetup:gdg-rennes | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5380 | ok |
| meetup:finistdevs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6360 | ok |
| meetup:staff42 | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6400 | ok |
| meetup:proxiadnord | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8531 | ok |
| meetup:parisapi | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8434 | ok |
| meetup:alpesjug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8449 | ok |
| meetup:lyonjs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6991 | ok |
| meetup:maxsessions | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8391 | ok |
| meetup:rladies-limoges | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8509 | ok |
| meetup:cara-grenoble | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8128 | ok |
| meetup:software-craftsmanship-lille | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8563 | ok |
| meetup:strasbourg-net-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8503 | ok |
| meetup:meetup-programmez | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6990 | ok |
| meetup:ksug-in | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7036 | ok |
| meetup:le-meetup-du-laptop-ux-creation | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8505 | ok |
| luma-cal:cal-5a2J8U3e8jKPu3W | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 2015 | ok |
| luma-cal:GdgEpita | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 3097 | ok |
| luma-cal:cal-1hB7mHUJ8WZ0l8h | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 5000 | ok |
| luma-cal:cal-8yPHi9oITkCB5CI | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 5944 | ok |
| luma-cal:cal-QEWfkaGcHSASBfq | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 6970 | ok |
| meetup:code-is-art | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:data-cloud-paris | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:mindstone-lyon-ai-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:afterwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| luma-cal:cal-3G8iH6OhKXzkwOU | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| meetup:paris-big-data-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7133 | empty |
| meetup:paris-machine-learning-study-group-in-english-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7926 | empty |
| meetup:paris-women-in-machine-learning-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7977 | empty |
| meetup:mlops-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7943 | empty |
| meetup:paris-dataops | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7942 | empty |
| meetup:paris-nlp | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7330 | empty |
| meetup:generative-ai-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7960 | empty |
| meetup:data-science-leaders | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7952 | empty |
| meetup:search-and-data | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7971 | empty |
| meetup:data-for-good-france | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7965 | empty |
| meetup:ia-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7990 | empty |
| meetup:rladies-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8002 | empty |
| meetup:french-aws-ug | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7953 | empty |
| meetup:lyon-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7991 | empty |
| meetup:lyon-dataviz | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7964 | empty |
| meetup:tlse-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8141 | empty |
| meetup:meetup-visualisation-des-donnees-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7991 | empty |
| meetup:python-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7732 | empty |
| meetup:intelligence-artificielle-aix-marseille | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8044 | empty |
| meetup:bordeaux-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7882 | empty |
| meetup:meetup-postgresql-lille | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7931 | empty |
| meetup:nice-natural-language-processing-meetup-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7981 | empty |
| meetup:python-rennes | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7990 | empty |
| meetup:afterwork-ia-montpellier | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8009 | empty |
| meetup:ai-for-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8004 | empty |
| luma-cal:amilabs | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5000 | empty |
| eventbrite-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 199 | disabled: Eventbrite answered HTTP 405; disabled for the rest of this run |
| eventbrite-lyon | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
| eventbrite-toulouse | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
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
| meetup-city-pages | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 59146 | empty |
| aniti-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| saclay-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| actuia-events | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| meetup:rencontres-tech-innovation | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6410 | empty |
| meetup:chtijug | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7407 | empty |
| meetup:paris-philosophy-cafe | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8482 | empty |
| luma-cal:cal-iRk0Ck3LB66OAMa | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 92 | empty |
| luma-cal:cal-0ICm7FJKGW0OHUA | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7000 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| hub-franceia | not due |  |  | slot day 1 |
| allai-fr | not due |  |  | slot day 1 |
| prairie-psai | not due |  |  | slot day 2 |
| miai | not due |  |  | slot day 2 |
| 3ia-cote-d-azur | not due |  |  | slot day 2 |
| dataia-saclay | not due |  |  | slot day 2 |
| stationf-events | skipped |  |  | js: true (Playwright arrives later) |
| systematic-paris-region | not due |  |  | slot day 4 |
| bpifrance-events | not due |  |  | slot day 4 |
| bigdataparis | not due |  |  | slot day 1 |
| vivatech | not due |  |  | slot day 1 |
| dotai | not due |  |  | slot day 1 |
| conftech-france-map | skipped |  |  | js: true (Playwright arrives later) |
| cerim-lille | deferred |  |  | cap of 4 pages per run |
| sorbonne-evenements | skipped |  |  | robots.txt disallows this path |
| telecom-paris | ready | 32000 | 313 |  |
| epita | ready | 18024 | 37 |  |
| cnrs-agenda | skipped |  |  | robots.txt disallows this path |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Paris | 160 | 154 | 6 |
| Other France | 87 | 86 | 1 |
| Online (FR) | 23 | 23 | 0 |
| Lyon | 18 | 16 | 2 |
| Bordeaux | 17 | 17 | 0 |
| Rennes | 16 | 16 | 0 |
| Unknown | 15 | 13 | 2 |
| Toulouse | 13 | 13 | 0 |
| Marseille-Aix | 13 | 13 | 0 |
| Montpellier | 10 | 8 | 2 |
| Lille | 9 | 9 | 0 |
| Strasbourg | 7 | 7 | 0 |
| Nice-Sophia | 6 | 6 | 0 |
| Nantes | 5 | 5 | 0 |
| Grenoble | 3 | 3 | 0 |

Places inside "Other France" (after dedupe): Rouen 6, Other France 5, Orchies 3, Dammarie-les-Lys 3, Nancy 2, Le Mans 2, Tremblay-en-France 2, Boves 2, Reims 2, Poitiers 2, Saint-Omer 2, Vienne 2, Abbeville 2, Blois 2, Saint-Étienne 2

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 1073 |
| keyword | 234 |
| window | 95 |
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
- meetup:afterwork-ia-montpellier: empty (0 items)
- meetup:ai-for-dev: empty (0 items)
- luma-cal:amilabs: empty (0 items) - Fetch via https://api.lu.ma/calendar/get-items?calendar_api_id=<id>&period=future&pagination_limit=50 (id from the page's __NEXT_DATA__ props.pageProps.initialData.data.calendar.api_id), or the ICS https://api.lu.ma/ics/get?entity=calendar&id=<id>. Global calendars: keep only events whose geo_address_info.city is French.

## Discovery (Meetup groups and Luma calendars)

- meetup agile-toulouse: ok, polled from now on
- meetup code-is-art: ok, polled from now on
- meetup data-cloud-paris: ok, polled from now on
- meetup mindstone-lyon-ai-meetup: ok, polled from now on
- meetup afterwork: ok, polled from now on
- luma cal-3G8iH6OhKXzkwOU: ok, polled from now on
- luma ai-circle: ok, polled from now on

## Notes

- Ledger/ health/ cache files written; elapsed 162 s.
