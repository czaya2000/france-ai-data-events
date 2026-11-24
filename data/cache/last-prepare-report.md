# Prepare run report

- Date: 2026-11-24 (window 120 days), mode: daily
- Feed sources: 143/143 reachable (100%), 18 disabled
- Totals: fetched 2010, in-window France 830, after keyword filter 585, after dedupe 425, known 409, new 16, sent to Claude 16, deferred by cap 0
- Ledger: 1113 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window FR = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window FR | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 544 | 13 | 13 | 13 | 12 | 0 | 299 | ok |
| brainberg-fr | noisy | 227 | 199 | 103 | 101 | 33 | 0 | 3113 | ok |
| openagenda | noisy | 213 | 213 | 169 | 158 | 157 | 0 | 9596 | ok |
| aieventlist-europe | curated | 184 | 8 | 7 | 7 | 0 | 0 | 1401 | ok |
| confstech | noisy | 138 | 1 | 0 | 0 | 0 | 0 | 1113 | ok |
| luma-cal:claudecommunity | noisy | 123 | 2 | 2 | 2 | 1 | 0 | 13082 | ok |
| luma-cal:genai-collective | curated | 61 | 19 | 19 | 16 | 16 | 0 | 12971 | ok |
| luma-cal:n8n-events | noisy | 52 | 12 | 4 | 4 | 4 | 0 | 12011 | ok |
| briefia-meetups | curated | 50 | 50 | 45 | 43 | 32 | 0 | 564 | ok |
| luma-paris | noisy | 38 | 38 | 10 | 10 | 10 | 0 | 350 | ok |
| luma-cal:bond-paris | noisy | 23 | 23 | 15 | 15 | 10 | 0 | 997 | ok |
| aitinkerers-paris | curated | 20 | 3 | 3 | 3 | 0 | 0 | 1623 | ok |
| luma-cal:clickhouse-events | noisy | 18 | 7 | 7 | 7 | 6 | 0 | 8004 | ok |
| afia | curated | 15 | 0 | 0 | 0 | 0 | 0 | 1933 | ok |
| devevents | noisy | 14 | 1 | 0 | 0 | 0 | 0 | 1158 | ok |
| toulouse-tech-hub | noisy | 14 | 14 | 5 | 5 | 1 | 0 | 365 | ok |
| aieventlist-paris | curated | 12 | 7 | 6 | 6 | 3 | 0 | 272 | ok |
| meetup:le-wagon-bordeaux-coding-station-bootcamp | curated | 10 | 10 | 8 | 8 | 8 | 0 | 8242 | ok |
| meetup:l-apero-de-l-ia | noisy | 10 | 9 | 9 | 9 | 8 | 0 | 3687 | ok |
| meetup:aperos-agiles-montpellier | noisy | 10 | 5 | 1 | 1 | 1 | 0 | 7841 | ok |
| meetup:digital-nomads-remote-workers-montpellier | noisy | 10 | 8 | 8 | 8 | 8 | 0 | 7050 | ok |
| luma-cal:softr-events | noisy | 9 | 2 | 2 | 2 | 1 | 0 | 1072 | ok |
| meetup:hacksxb | noisy | 8 | 5 | 1 | 1 | 1 | 0 | 8533 | ok |
| meetup:yeeso-itwomen-network | noisy | 8 | 8 | 1 | 1 | 1 | 0 | 8874 | ok |
| luma-cal:cal-cedsWn0tyHau5wm | noisy | 8 | 6 | 1 | 1 | 1 | 0 | 7113 | ok |
| luma-cal:cal-ouvsbv3Gj9kvRGD | noisy | 8 | 1 | 1 | 1 | 0 | 0 | 6599 | ok |
| meetup:le-wagon-lille-coding-station | curated | 7 | 7 | 4 | 4 | 4 | 0 | 8314 | ok |
| luma-cal:datacraft | curated | 7 | 7 | 7 | 7 | 5 | 0 | 763 | ok |
| hi-paris-ics | curated | 7 | 6 | 6 | 6 | 6 | 0 | 1877 | ok |
| meetup:paris-big-data | curated | 6 | 6 | 6 | 6 | 6 | 0 | 6498 | ok |
| luma-cal:neo4j | noisy | 6 | 2 | 2 | 2 | 2 | 0 | 7972 | ok |
| createwith-paris | noisy | 6 | 6 | 5 | 4 | 1 | 0 | 757 | ok |
| meetup:ac-cdg | noisy | 6 | 6 | 6 | 6 | 0 | 0 | 4498 | ok |
| luma-cal:womenincode | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 7806 | ok |
| meetup:theproductcrew | noisy | 5 | 5 | 4 | 4 | 4 | 0 | 2997 | ok |
| luma-cal:dust | curated | 4 | 2 | 2 | 2 | 1 | 0 | 3055 | ok |
| numerique-gouv | curated | 4 | 2 | 1 | 1 | 1 | 0 | 652 | ok |
| meetup:lyondigitalhub | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 8256 | ok |
| meetup:lyon-data-science | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8337 | ok |
| meetup:groupe-meetup-nice-data | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8071 | ok |
| meetup:strasbourg-deep-learning-meetup | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8118 | ok |
| luma-cal:airstreet | noisy | 3 | 0 | 0 | 0 | 0 | 0 | 2100 | ok |
| luma-cal:nouvellemachine | noisy | 3 | 3 | 2 | 2 | 2 | 0 | 7998 | ok |
| luma-cal:ai-automations-make-global-calendar | noisy | 3 | 2 | 2 | 2 | 2 | 0 | 7980 | ok |
| meetup:lyondatascience | noisy | 3 | 3 | 3 | 3 | 0 | 0 | 6697 | ok |
| meetup:meetup-harrycow-coworking-toulouse | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 6973 | ok |
| meetup:paris-ai | curated | 2 | 2 | 2 | 2 | 1 | 0 | 4271 | ok |
| meetup:artificial-intelligence-meetup-paris | curated | 2 | 2 | 2 | 2 | 0 | 0 | 5200 | ok |
| meetup:health-data-hub | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8023 | ok |
| meetup:strasbourg-aws-user-group | curated | 2 | 2 | 2 | 1 | 1 | 0 | 7700 | ok |
| meetup:les-meetups-de-l-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8484 | ok |
| meetup:ai-first | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8139 | ok |
| luma-cal:doctolib-ai-community | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 2998 | ok |
| luma-cal:notionparis | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 4993 | ok |
| luma-cal:cto-de-lyon | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 6169 | ok |
| luma-cal:hub-france-ia | curated | 2 | 2 | 2 | 2 | 2 | 0 | 7999 | ok |
| meetup:solutiontech | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8409 | ok |
| meetup:android-paris | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 8531 | ok |
| meetup:software-craftsmanship-lille | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8482 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7082 | ok |
| luma-cal:alan.eu | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 2938 | ok |
| luma-cal:Paris-hardware-meetup | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 5102 | ok |
| luma-cal:cal-R4V662MAZSQBUp5 | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 6812 | ok |
| luma-cal:cal-5QALGbpeLcvA6dg | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 0 | ok |
| luma-cal:cal-zEeI5VCF8jeLwjB | noisy | 2 | 2 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:iq-project-ai | noisy | 2 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:augmented-thiga | noisy | 2 | 2 | 1 | 1 | 0 | 0 | 0 | ok |
| meetup:pydata-paris | curated | 1 | 1 | 1 | 1 | 1 | 0 | 309 | ok |
| meetup:compute-paris | curated | 1 | 1 | 1 | 1 | 0 | 0 | 1216 | ok |
| meetup:paris-dataladies | curated | 1 | 1 | 1 | 1 | 1 | 0 | 2253 | ok |
| meetup:paris-ai-tech-talk | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3222 | ok |
| meetup:paris-dbt-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7904 | ok |
| meetup:paris-apache-airflow-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8125 | ok |
| meetup:french-aws-ug | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8076 | ok |
| meetup:gdg-paris | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8027 | ok |
| meetup:semweb-pro | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8047 | ok |
| meetup:aws-lyon-amazon-web-services-user-group | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8023 | ok |
| meetup:ia-innovateurs | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7981 | ok |
| meetup:postgres-toulouse | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7973 | ok |
| meetup:latoulboxducloudnatif | curated | 1 | 1 | 0 | 0 | 0 | 0 | 8038 | ok |
| meetup:google-developer-group-aix-en-provence | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7997 | ok |
| meetup:meetup-postgresql-lille | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8027 | ok |
| meetup:generative-ai-rennes | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8038 | ok |
| meetup:strasbourg-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7829 | ok |
| meetup:afterwork-ia-montpellier | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8099 | ok |
| meetup:ianancy | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7980 | ok |
| meetup:cfdatalovers | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7823 | ok |
| meetup:it-business-club-data-cloud-dev | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8226 | ok |
| luma-cal:hcompany.ai | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 3972 | ok |
| luma-cal:amilabs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4658 | ok |
| luma-cal:aificionados | curated | 1 | 1 | 1 | 1 | 1 | 0 | 5971 | ok |
| luma-cal:genainetwork | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7005 | ok |
| luma-cal:machina | noisy | 1 | 0 | 0 | 0 | 0 | 0 | 7907 | ok |
| meetup:golang-paris | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 198 | ok |
| meetup:wptoulouse | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 1091 | ok |
| meetup:mug-toulouse-mobile-user-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 1894 | ok |
| meetup:chtijug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7371 | ok |
| meetup:paris-tech-afterwork-talks-networking | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7473 | ok |
| meetup:gdg-rennes | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7173 | ok |
| meetup:finistdevs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6324 | ok |
| meetup:staff42 | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6762 | ok |
| meetup:proxiadnord | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7094 | ok |
| meetup:parisapi | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8636 | ok |
| meetup:alpesjug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8466 | ok |
| meetup:lyonjs | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8536 | ok |
| meetup:maxsessions | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8353 | ok |
| meetup:rladies-limoges | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8366 | ok |
| meetup:cara-grenoble | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8090 | ok |
| meetup:strasbourg-net-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8495 | ok |
| meetup:meetup-programmez | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8449 | ok |
| meetup:le-meetup-du-laptop-ux-creation | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8505 | ok |
| luma-cal:cal-1hB7mHUJ8WZ0l8h | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 3094 | ok |
| luma-cal:cal-8yPHi9oITkCB5CI | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 4184 | ok |
| luma-cal:cal-QEWfkaGcHSASBfq | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 6010 | ok |
| luma-cal:cal-iRk0Ck3LB66OAMa | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:cal-5a2J8U3e8jKPu3W | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| luma-cal:GdgEpita | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| meetup:paris-big-data-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7135 | empty |
| meetup:paris-machine-learning-study-group-in-english-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8036 | empty |
| meetup:paris-women-in-machine-learning-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7935 | empty |
| meetup:mlops-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7939 | empty |
| meetup:paris-dataops | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7939 | empty |
| meetup:paris-nlp | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7657 | empty |
| meetup:generative-ai-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8013 | empty |
| meetup:data-science-leaders | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7957 | empty |
| meetup:search-and-data | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7877 | empty |
| meetup:data-for-good-france | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7873 | empty |
| meetup:ia-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8045 | empty |
| meetup:rladies-paris | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7962 | empty |
| meetup:lyon-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7996 | empty |
| meetup:lyon-dataviz | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7940 | empty |
| meetup:tlse-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7948 | empty |
| meetup:meetup-visualisation-des-donnees-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7969 | empty |
| meetup:python-toulouse | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7584 | empty |
| meetup:intelligence-artificielle-aix-marseille | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8033 | empty |
| meetup:bordeaux-ia | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8023 | empty |
| meetup:nice-natural-language-processing-meetup-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8203 | empty |
| meetup:python-rennes | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7941 | empty |
| meetup:ai-for-dev | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7828 | empty |
| eventbrite-paris | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 128 | disabled: Eventbrite answered HTTP 405; disabled for the rest of this run |
| eventbrite-lyon | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1 | disabled: Eventbrite blocked this run (HTTP 405); not retried |
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
| meetup-city-pages | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 61541 | empty |
| aniti-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| saclay-rss | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| actuia-events | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: News feed, not an event calendar: its dates are publication dates, so it would list news as events. Kept for reference. |
| meetup:rencontres-tech-innovation | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6627 | empty |
| meetup:paris-philosophy-cafe | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6989 | empty |
| luma-cal:cal-0ICm7FJKGW0OHUA | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5996 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| hub-franceia | not due |  |  | slot day 1 |
| allai-fr | not due |  |  | slot day 1 |
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
| prairie-psai | skipped |  |  | robots.txt disallows this path |
| miai | ready | 2577 | 17 |  |
| 3ia-cote-d-azur | ready | 19273 | 124 |  |
| dataia-saclay | skipped |  |  | robots.txt disallows this path |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Paris | 167 | 154 | 13 |
| Other France | 94 | 94 | 0 |
| Online (FR) | 25 | 25 | 0 |
| Bordeaux | 18 | 17 | 1 |
| Rennes | 17 | 16 | 1 |
| Lyon | 16 | 16 | 0 |
| Marseille-Aix | 14 | 14 | 0 |
| Unknown | 14 | 14 | 0 |
| Toulouse | 13 | 12 | 1 |
| Lille | 13 | 13 | 0 |
| Montpellier | 10 | 10 | 0 |
| Nantes | 8 | 8 | 0 |
| Strasbourg | 7 | 7 | 0 |
| Nice-Sophia | 6 | 6 | 0 |
| Grenoble | 3 | 3 | 0 |

Places inside "Other France" (after dedupe): Rouen 6, Other France 5, Orchies 3, Tremblay-en-France 3, Dammarie-les-Lys 3, Abbeville 3, Nancy 2, Le Mans 2, Boves 2, Reims 2, Poitiers 2, Écouché-les-Vallées 2, Saint-Omer 2, Vienne 2, Blois 2

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 1085 |
| keyword | 241 |
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
- meetup:lyon-ia: empty (0 items) - Lyon & IA
- meetup:lyon-dataviz: empty (0 items)
- meetup:tlse-data-science: empty (0 items) - Toulouse Data Science
- meetup:meetup-visualisation-des-donnees-toulouse: empty (0 items) - Toulouse DataViz
- meetup:python-toulouse: empty (0 items)
- meetup:intelligence-artificielle-aix-marseille: empty (0 items)
- meetup:bordeaux-ia: empty (0 items)
- meetup:nice-natural-language-processing-meetup-group: empty (0 items) - GAP Nice AI & ML
- meetup:python-rennes: empty (0 items)
- meetup:ai-for-dev: empty (0 items)

## Discovery (Meetup groups and Luma calendars)

- meetup le-wagon-nantes-coding-bootcamp: not usable
- luma cal-iRk0Ck3LB66OAMa: ok, polled from now on
- luma cal-5QALGbpeLcvA6dg: ok, polled from now on
- luma cal-zEeI5VCF8jeLwjB: ok, polled from now on
- luma iq-project-ai: ok, polled from now on
- luma cal-5a2J8U3e8jKPu3W: ok, polled from now on
- luma augmented-thiga: ok, polled from now on
- luma GdgEpita: ok, polled from now on

## Notes

- Ledger/ health/ cache files written; elapsed 152 s.
