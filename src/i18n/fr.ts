/* Textes de l'interface en français. Typé comme les mêmes `Messages` que en.ts :
   une clé manquante ici est une erreur de type. Ton : neutre, simple, direct ;
   on évite d'interpeller le lecteur quand la phrase s'en passe. Le nom du produit
   « French Data Events » reste en anglais dans les deux langues. */
import type { Messages } from './en.ts';

/** "de " / "d’" before a plural noun: "de conférences", "d’événements". */
const de = (word: string) => (/^[aeiouhéèêàâîïôû]/i.test(word) ? `d’${word} ` : `de ${word} `);

export const fr: Messages = {
	site: {
		tagline:
			"Les prochains événements IA et data en France : conférences, meetups et ateliers au même endroit, vérifiés chaque jour auprès de la page de l'organisateur.",
		headline: 'Tous les événements IA et data en France',
		subheadline: 'Conférences, meetups et ateliers au même endroit, vérifiés chaque jour.',
		scope: (name: string) =>
			`${name} est une liste sélectionnée des prochains événements IA et data en France : ` +
			'meetups, conférences, ateliers, soirées networking et webinaires sur le machine learning, l’IA générative, ' +
			'la data engineering, l’analytique, les plateformes de données (Databricks, Snowflake, Microsoft Fabric), la gouvernance des données et l’IA appliquée. ' +
			'Chaque fiche renvoie vers la page de l’organisateur, et la liste est mise à jour chaque jour. ' +
			'L’inscription se fait toujours sur le site de l’organisateur.',
		homeTitle: (name: string) => `${name} – événements IA et data en France`,
		countryName: 'France',
		feedTitle: (name: string) => `${name} : prochains événements IA et data en France`,
	},

	placeNames: {
		'Online (FR)': 'En ligne',
		'Other France': 'Autres villes',
		Marseille: 'Marseille',
		'Marseille-Aix': 'Marseille-Aix',
	},

	base: {
		rssTitle: 'prochains événements',
		jsonTitle: 'événements (JSON)',
	},

	nav: {
		home: 'Accueil',
		calendarOpen: 'Ajouter à mon agenda',
		contact: 'Contact',
		linkedin: 'Me suivre sur LinkedIn',
		langSwitch: 'Langue',
		langName: { fr: 'Français', en: 'English' },
	},

	footer: {
		backToAll: 'Retour à tous les événements',
		dataFeeds: 'Données et flux',
		dataFeedsSuffix: ' pour applications et agents IA',
		privacy: 'Confidentialité',
		impressum: 'Mentions légales',
		franceOnly: (name: string) => `${name} – France uniquement, centré pour l’instant sur l’IA et la data.`,
		submit: 'Proposer un événement',
		weeklyDigest: 'Newsletter hebdomadaire',
		sponsor: 'Toucher les décideurs data en France ? Contactez-moi',
		linksAria: 'Site',
	},

	listing: {
		search: 'Rechercher',
		searchPlaceholder: 'Titre, organisateur, sujet…',
		city: 'Ville',
		format: 'Format',
		cities: 'Villes',
		formats: 'Formats',
		clear: 'Réinitialiser',
		saveCal: 'Ajouter à mon agenda',
		timeRange: 'Période',
		all: 'Tous',
		thisWeek: 'Cette semaine',
		thisMonth: 'Ce mois-ci',
		breadcrumb: 'Fil d’Ariane',
		allEvents: 'Tous les événements',
		newSr: '(nouveau)',
		through: (day: number, month: string) => `jusqu’au ${day} ${month}`,
		today: 'Aujourd’hui',
		runsUntil: (day: number | string, month: string) => `jusqu’au ${day} ${month}`,
		countOne: '1 événement',
		countMany: '{n} événements',
		shown: 'affichés',
		lastScanned: (when: string) => `Dernière vérification : ${when}.`,
		browseAria: 'Parcourir les événements par ville et par format',
		byCity: 'Par ville',
		otherCities: 'Autres villes',
		byType: 'Par format',
		otherTypes: 'Autres formats',
		digestDefault: 'Chaque lundi, les événements des deux semaines à venir dans votre boîte mail.',
		digestOnline: 'Chaque lundi, les événements en ligne des deux semaines à venir dans votre boîte mail.',
		digestCity: (label: string) => `Chaque lundi, les événements des deux semaines à venir à ${label} dans votre boîte mail.`,
		digestFormat: (many: string) => `Chaque lundi, les ${many} des deux semaines à venir dans votre boîte mail.`,
		emptyHub: (many: string, where: string) =>
			`Pas ${de(many)}à venir ${where} pour le moment. La newsletter hebdomadaire prévient dès qu’un nouvel événement est ajouté.`,
		emptyAll:
			'Aucun événement pour le moment. La liste se remplit après la prochaine mise à jour quotidienne ; la newsletter hebdomadaire prévient dès que c’est le cas.',
		emptyFiltered: 'Aucun événement ne correspond à ces filtres.',
	},

	hub: {
		h1City: (label: string) => `Événements IA et data à ${label}`,
		h1Online: 'Événements IA et data en ligne en France',
		h1Other: 'Événements IA et data dans les autres villes de France',
		h1Format: (plural: string) => `${plural} IA et data en France`,
		whereCity: (label: string) => `à ${label}`,
		whereOnline: 'en ligne',
		whereOther: 'dans les autres villes de France',
		whereFormat: 'partout en France',
		noneNow: (many: string, where: string) => `Pas ${de(many)}à venir ${where} pour le moment.`,
		subCity: (n: number, noun: string, where: string) =>
			`${n} ${noun} ${where} : conférences, meetups et ateliers. Liste vérifiée chaque jour.`,
		subFormat: (n: number, noun: string, where: string) => `${n} ${noun} ${where}. Liste vérifiée chaque jour.`,
		cityNoun: ['événement à venir', 'événements à venir'],
		intro: (nearby: string) => `Cette page couvre aussi ${nearby}.`,
		metaCity: (where: string) =>
			`Prochains événements IA et data ${where} : conférences, meetups et ateliers, vérifiés chaque jour auprès de la page de l’organisateur.`,
		metaFormat: (many: string) =>
			`${many[0].toUpperCase()}${many.slice(1)} IA et data à venir partout en France, avec vérification quotidienne auprès de la page de l’organisateur.`,
		nearby: {
			paris: 'l’Île-de-France et le plateau de Saclay (Saclay, Palaiseau, Versailles, La Défense, Saint-Denis, Montreuil et d’autres communes)',
			lyon: 'Villeurbanne et l’agglomération lyonnaise',
			toulouse: 'Blagnac, Labège et Colomiers',
			'marseille-aix': 'Aix-en-Provence, Aubagne et Gardanne',
			'nice-sophia': 'Sophia Antipolis, Valbonne, Antibes et Cannes',
			bordeaux: 'Mérignac, Pessac et Talence',
			lille: 'Villeneuve-d’Ascq, Roubaix et Tourcoing',
			nantes: 'Saint-Herblain',
			rennes: 'Cesson-Sévigné',
			grenoble: 'Meylan et Saint-Martin-d’Hères',
			strasbourg: 'Illkirch-Graffenstaden',
			montpellier: '',
			online: '',
			'other-france': 'Dijon, Clermont-Ferrand, Tours, Angers, Brest, Metz, Nancy, Rouen, Reims, Annecy et d’autres villes',
		},
		formats: {
			Meetup: { label: 'Meetup', plural: 'Meetups', one: 'meetup', many: 'meetups', link: 'Meetups', upOne: 'meetup à venir', upMany: 'meetups à venir' },
			Conference: { label: 'Conférence', plural: 'Conférences', one: 'conférence', many: 'conférences', link: 'Conférences', upOne: 'conférence à venir', upMany: 'conférences à venir' },
			Workshop: { label: 'Atelier', plural: 'Ateliers', one: 'atelier', many: 'ateliers', link: 'Ateliers', upOne: 'atelier à venir', upMany: 'ateliers à venir' },
			Networking: { label: 'Networking', plural: 'Événements networking', one: 'événement networking', many: 'événements networking', link: 'Networking', upOne: 'événement networking à venir', upMany: 'événements networking à venir' },
			Webinar: { label: 'Webinaire', plural: 'Webinaires', one: 'webinaire', many: 'webinaires', link: 'Webinaires', upOne: 'webinaire à venir', upMany: 'webinaires à venir' },
		},
	},

	event: {
		pastPrefix: 'Événement passé : ',
		pastDescription: (date: string, where: string, format: string, blurb: string) =>
			`Cet événement a eu lieu le ${date} · ${where} · ${format}. ${blurb}`,
		allEvents: '← Tous les événements',
		onlineEvents: 'Événements en ligne',
		eventsIn: (label: string) => `Événements à ${label}`,
		breadcrumb: 'Fil d’Ariane',
		endedTitle: 'Cet événement est terminé.',
		endedNote: (date: string) => `Il a eu lieu le ${date}. Les informations ci-dessous sont conservées à titre indicatif.`,
		dates: 'Date',
		time: 'Horaire',
		city: 'Ville',
		venue: 'Lieu',
		organiser: 'Organisateur',
		organiserNotListed: 'Non indiqué',
		format: 'Format',
		cost: 'Tarif',
		topics: 'Sujets',
		verifiedVia: 'Vérifié via',
		registerTitle: 'S’inscrire auprès de l’organisateur',
		registerNote: (source: string) =>
			`L’inscription se fait sur ${source}. Nous ne vendons pas de billets et ne touchons aucune commission.`,
		goTo: (source: string) => `Aller sur ${source} ↗`,
		disclosure: (name: string) =>
			`Chaque fiche de ${name} est vérifiée auprès de sa source d’origine avant publication. Les informations peuvent changer côté organisateur : mieux vaut les confirmer via le lien ci-dessus avant de se déplacer.`,
		upcomingIn: (city: string) => `Prochainement à ${city}`,
		upcomingEvents: 'Prochains événements',
		seeAllUpcoming: 'Voir tous les prochains événements',
	},

	subscribe: {
		defaultNote: 'Chaque lundi, les événements des deux semaines à venir dans votre boîte mail.',
		emailLabel: 'Adresse e-mail',
		emailPlaceholder: 'nom@entreprise.fr',
		open: 'Recevoir la newsletter',
		dialogTitle: 'Votre newsletter hebdomadaire',
		close: 'Fermer',
		intro: 'Choisissez des villes et des formats, ou laissez vide pour tout recevoir.',
		language: 'Langue de l’e-mail',
		languageHelp: 'La langue de votre newsletter hebdomadaire. Les événements sont les mêmes.',
		cities: 'Villes',
		types: 'Formats',
		submit: 'S’abonner',
		confirmBefore: 'Un e-mail de confirmation sera envoyé à ',
		confirmAfter: '.',
	},

	calendar: {
		title: 'Ajouter à mon agenda',
		close: 'Fermer',
		intro: 'Abonnez-vous une fois : les nouveaux événements correspondant à votre choix apparaissent automatiquement dans votre agenda.',
		city: 'Ville',
		allCities: 'Toutes les villes',
		format: 'Format',
		allFormats: 'Tous les formats',
		google: 'Google Agenda',
		apple: 'Apple / autres applications',
		outlook: 'Outlook.com',
		office: 'Microsoft 365',
		linkLabel: 'Lien de l’agenda',
		copy: 'Copier le lien',
		copied: 'Copié',
		pressCtrlC: 'Appuyez sur Ctrl+C',
		note: 'L’agenda se met à jour tout seul. Google peut mettre jusqu’à 24 h à afficher les changements.',
		none: 'Aucun événement à venir ne correspond. Essayez « Tous » pour l’un des filtres.',
		one: '1 événement à venir correspond',
		many: '{n} événements à venir correspondent',
		feedName: (site: string, parts: string[]) => [site, ...parts].join(' – '),
	},

	ics: {
		calDesc: (country: string, host: string) => `Prochains événements IA et data en ${country}, proposés par ${host}`,
		runsUntil: (date: string) => `Se poursuit jusqu’au ${date} – les dates de chaque séance figurent sur la page de l’événement.`,
		organiser: (name: string) => `Organisateur : ${name}`,
		details: (url: string) => `Détails et inscription : ${url}`,
		online: 'En ligne',
	},

	submit: {
		title: (name: string) => `Proposer un événement – ${name}`,
		description:
			'Vous organisez un événement IA ou data en France ? Proposez-le : chaque fiche est vérifiée auprès de la page de l’organisateur avant d’être publiée.',
		h1: 'Proposer un événement',
		intro:
			'Vous organisez un événement IA ou data en France ? Proposez-le ici. L’inscription dans la liste est gratuite. Chaque événement est vérifié auprès de sa page d’origine avant publication : merci donc de renseigner la page où l’on s’inscrit réellement.',
		scope:
			'Ce qui convient : conférences, meetups, ateliers, webinaires et événements networking pour les professionnels de l’IA et de la data, organisés en France ou par un organisateur français. Ce qui ne convient pas : le networking généraliste, les webinaires diffusés dans le monde entier et les présentations commerciales sans véritable programme.',
		subject: (name: string) => `Proposition d’événement – ${name}`,
		legendEvent: 'L’événement',
		legendYou: 'Vous',
		eventTitle: 'Titre de l’événement',
		startDate: 'Date de début',
		endDate: 'Date de fin',
		endDateHint: '(si l’événement dure plusieurs jours)',
		city: 'Ville',
		cityPlaceholder: 'Paris, Lyon, en ligne…',
		venue: 'Lieu',
		optional: '(facultatif)',
		format: 'Format',
		choose: 'Choisir…',
		cost: 'Tarif',
		costPlaceholder: 'Gratuit, 150 €, …',
		url: 'Lien de la page d’inscription',
		blurb: 'Description en un paragraphe',
		blurbHint: '(de quoi il s’agit, à qui cela s’adresse)',
		organiser: 'Organisateur',
		name: 'Votre nom',
		email: 'E-mail',
		featured:
			'Je souhaite en savoir plus sur une mise en avant ou sur la newsletter hebdomadaire pour cet événement.',
		send: 'Envoyer pour vérification',
		invalid: {
			required: 'Merci de remplir ce champ.',
			email: 'Merci de saisir une adresse e-mail valide.',
			url: 'Merci de saisir une adresse web complète, commençant par https://',
			date: 'Merci de choisir une date.',
			choose: 'Merci de choisir une option.',
			endBeforeStart: 'La date de fin ne peut pas précéder la date de début.',
		},
		thanksTitle: (name: string) => `Événement reçu – ${name}`,
		thanksDescription: 'Merci d’avoir proposé un événement.',
		thanksH1: 'Merci, c’est bien reçu.',
		thanksText:
			'Je vérifie chaque proposition auprès de la page d’origine avant publication, en général sous quelques jours. Vous aurez de mes nouvelles dans tous les cas.',
	},

	contact: {
		title: (name: string) => `Contact – ${name}`,
		description: 'Suggérer un événement, signaler une erreur ou simplement dire bonjour.',
		h1: 'Contact',
		introBefore:
			'Une date erronée, un événement qui mériterait d’être listé, ou simplement un message ? Écrivez-moi : il arrive directement dans ma boîte mail. Organisateurs : il existe un ',
		introLink: 'formulaire dédié',
		introAfter: ' pour les nouveaux événements.',
		introSponsor:
			'Vous voulez mettre votre entreprise, votre produit ou votre conférence devant les décideurs de la data et de l’IA en France ? Dites-moi en quelques lignes ce que vous cherchez et je reviens vers vous avec les possibilités : fiches mises en avant, une place dans la newsletter hebdomadaire, ou autre chose à imaginer ensemble.',
		subject: (name: string) => `Nouveau message de ${name}`,
		subjectSponsor: (name: string) => `Demande de partenariat – ${name}`,
		name: 'Nom',
		email: 'E-mail',
		message: 'Message',
		send: 'Envoyer le message',
		linkedinBefore: 'Plutôt sur LinkedIn ? ',
		linkedinLink: 'On peut s’y retrouver',
		linkedinAfter: '.',
		thanksTitle: (name: string) => `Message envoyé – ${name}`,
		thanksDescription: 'Merci de votre message.',
		thanksH1: 'Merci, message envoyé.',
		thanksText: 'Je reviens vers vous dès que possible.',
	},

	thanks: {
		backToAll: '← Retour à tous les événements',
		seeAll: 'Voir tous les événements →',
		inboxTitle: (name: string) => `Vérifiez votre boîte mail – ${name}`,
		inboxDescription: 'Confirmez votre abonnement à la newsletter hebdomadaire.',
		inboxH1: 'Vérifiez votre boîte mail.',
		inboxText:
			'Un e-mail de confirmation vient de partir. Cliquez sur le lien qu’il contient et l’inscription est validée. La newsletter arrive le lundi matin, et chaque e-mail contient un lien pour modifier vos villes et vos formats.',
		confirmedTitle: (name: string) => `Abonnement confirmé – ${name}`,
		confirmedDescription: 'Votre abonnement à la newsletter hebdomadaire est confirmé.',
		confirmedH1: 'C’est confirmé.',
		confirmedText:
			'La première newsletter arrive lundi matin : les événements des deux semaines à venir et les derniers ajouts. Chaque e-mail contient un lien pour modifier vos villes et vos formats.',
	},

	notFound: {
		title: (name: string) => `Page introuvable – ${name}`,
		description: 'Cette page n’existe pas. Voir tous les prochains événements IA et data en France.',
		h1: 'Page introuvable.',
		text: 'Il n’y a rien à cette adresse. L’événement a peut-être été renommé, ou le lien contient une faute de frappe.',
		seeAll: 'Voir tous les prochains événements',
		orCity: 'Ou aller directement à une ville : ',
	},

	data: {
		title: (name: string) => `Données et flux – ${name}`,
		description: (name: string) =>
			`La liste d’événements de ${name} en JSON, RSS, iCalendar et Markdown simple (llms.txt), pour les applications, les lecteurs de flux et les agents IA.`,
		h1: 'Données et flux',
		intro: (name: string) =>
			`La liste d’événements peut être réutilisée librement dans des applications, newsletters, agendas et assistants IA. Tout ce qui suit est régénéré chaque jour avec le site, à partir des mêmes données. Seuls les événements à venir sont inclus : un événement quitte la liste le lendemain de sa fin. Merci de renvoyer vers la page de l’événement sur ${name} en cas de réutilisation.`,
		endpoints: 'Points d’accès',
		eventsJson: ' : tous les événements à venir en JSON.',
		rss: ' : flux RSS en français, nouveautés en premier.',
		rssEn: ' : flux RSS en anglais.',
		llms: ' : un court guide Markdown pour les agents IA, avec des liens vers les listes ci-dessous.',
		llmsFull: ' : tous les événements à venir en Markdown, une ligne par événement.',
		mdLists: 'Une liste Markdown par ville et par format, à l’adresse anglaise de la page avec ',
		ics: ' : flux iCalendar auquel s’abonner, avec des textes en français. La version anglaise : ',
		calendarFeeds: 'Flux d’agenda',
		calendarIntro:
			'À ajouter par URL dans Google Agenda, Outlook ou Apple Calendrier. Tous les horaires sont en Europe/Paris.',
		allEvents: 'Tous les événements',
		fieldsIn: 'Champs dans ',
		notes: 'Remarques',
		fields: [
			['id', 'Identifiant stable. Il ne change jamais, même si le titre ou la date est corrigé.'],
			['title', 'Nom de l’événement, tel que l’organisateur le publie.'],
			['start, end', 'ISO 8601. Date et heure avec le décalage de Paris (p. ex. 2026-10-29T17:30:00+01:00) si l’horaire est connu, sinon une simple date.'],
			['allDay', 'Vrai quand start et end sont de simples dates.'],
			['dateLabel, time', 'Période en clair et horaire tel qu’indiqué à l’origine.'],
			['city, region', 'Le lieu exact et la grande ville à laquelle il se rattache (p. ex. Saclay → Paris).'],
			['online', 'Vrai pour les événements uniquement en ligne.'],
			['venue', 'Nom du lieu, ou null.'],
			['format', 'Une valeur parmi Meetup, Conference, Workshop, Networking, Webinar.'],
			['topics', 'Courts mots-clés thématiques.'],
			['cost, free', 'Tarif tel que publié, et indication de gratuité.'],
			['organiser', 'Qui organise l’événement.'],
			['description', 'Résumé en une phrase rédigé par nos soins (en anglais ; identique à blurb_en).'],
			['blurb_en, blurb_fr', 'Le même résumé en anglais et en français (blurb_fr vaut null tant qu’il n’est pas rédigé).'],
			['url', 'La page de l’événement sur ce site.'],
			['registrationUrl', 'La page de l’organisateur, où l’on s’inscrit.'],
			['verifiedVia', 'Où les informations ont été vérifiées.'],
			['firstSeen', 'Date à laquelle l’événement a été listé ici pour la première fois.'],
			['calendarFeed', 'Flux iCalendar de la ville de l’événement.'],
		],
		note1:
			'Chaque fiche est vérifiée auprès de la page de l’organisateur, mais les informations peuvent changer de son côté : renvoyez donc vers sa page avant de vous déplacer. Des champs peuvent être ajoutés ; les champs existants ne sont ni renommés ni supprimés sans changement de ',
		note1After: '.',
		note2a: 'Une série ou une formation à plusieurs dates forme une seule entrée : ',
		note2b: ' est le premier jour, ',
		note2c: ' le dernier, et ',
		note2d: ' s’applique à chaque séance. La page de l’organisateur donne les dates précises.',
		note3a: ' dans ',
		note3b: ' et les premières lignes des fichiers Markdown indiquent la date de la dernière vérification de la liste. Si elle remonte à plus de deux jours, il s’agit d’une copie en cache.',
		note4: 'Les données JSON, Markdown et RSS sont neutres quant à la langue, sauf mention contraire : les valeurs des champs sont en anglais, le résumé en français se trouve dans blurb_fr.',
	},

	jsonld: {
		areaServed: 'France',
	},
};
