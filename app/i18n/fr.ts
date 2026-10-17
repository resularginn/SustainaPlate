import type { TranslationDictionary } from "@/app/types";

export const fr: TranslationDictionary = {
  brandName: "ZeroWaste Chef",
  brandSubtitle: "Sauvetage alimentaire et planification des repas sur plusieurs jours",
  sdgBadge12: "ODD 12 · Consommation et production responsables",
  sdgBadge13: "ODD 13 · Lutte contre les changements climatiques",
  themeLight: "Clair",
  themeDark: "Sombre",
  heroEyebrow: "Prototype pour les Objectifs de développement durable de l'ONU",
  heroTitle:
    "Une cuisine planifiée pour réduire de moitié le gaspillage alimentaire des ménages.",
  heroDescription:
    "Sauvez vos restes avec une recette instantanée, ou planifiez vos courses sur 2 à 7 jours selon le risque d'altération — sans affirmations non vérifiées ni achats supplémentaires.",
  tabSingleTitle: "Sauvetage d'un repas",
  tabSingleSubtitle: "Recette en 4 étapes pour les restes qui vont se perdre",
  tabMultiTitle: "Plan de repas sur plusieurs jours",
  tabMultiSubtitle: "Planning de 2 à 7 jours selon le risque d'altération",
  presetsHeading: "Scénarios rapides",
  presetsHint: "Choisissez un scénario pour remplir le formulaire",
  singleIngredientsLabel:
    "Ingrédients disponibles (surtout ceux qui arrivent à expiration)",
  singleIngredientsPlaceholder:
    "ex. : un demi-pain rassis, 2 tomates molles, 1 œuf, de l'ail, des épinards flétris...",
  multiIngredientsLabel: "Courses et produits frais disponibles pour la semaine",
  multiIngredientsPlaceholder:
    "ex. : épinards frais, 3 tomates mûres, reste de riz cuit, 2 blancs de poulet, 4 œufs, un demi-chou, lentilles sèches, pommes de terre, carottes, oignons...",
  servingsLabel: "Taille du foyer",
  servingsOptions: {
    one: "1 personne",
    two: "2 personnes",
    fourPlus: "4 personnes et +",
  },
  maxTimeLabel: "Temps de cuisson maximal",
  maxTimeOptions: {
    fifteen: "15 min",
    thirty: "30 min",
    fortyFive: "45 min",
  },
  targetDaysLabel: "Horizon de planification (2 à 7 jours)",
  targetDaysUnit: "jours",
  targetDaysHelper:
    "Les premiers jours privilégient les produits fragiles et les restes cuisinés ; les jours suivants, les légumes-racines et les produits secs.",
  dietaryLabel: "Restrictions alimentaires ou allergies",
  optionalTag: "(facultatif)",
  dietaryPlaceholder: "ex. : végétarien, allergie aux noix, sans gluten",
  pantryAssumptionNote:
    "Seuls les produits de base du placard sont supposés disponibles (eau, sel, poivre noir, huile, farine, épices courantes).",
  submitSingleBtn: "Sauver un repas",
  submitMultiBtn: "Créer un plan sur plusieurs jours",
  loadingSingleText: "Analyse des priorités et des étapes de la recette...",
  loadingMultiText: "Organisation du planning selon le risque d'altération...",
  errorTitle: "La demande n'a pas pu aboutir",
  emptyIngredientsError:
    "Veuillez saisir au moins quelques ingrédients avant de créer un plan.",
  requestFailedError:
    "La demande a échoué ({status}). Veuillez vérifier votre configuration.",
  networkError: "Une erreur réseau est survenue lors de la connexion au serveur.",
  safetyAlertBadge: "Alerte sécurité alimentaire",
  safetyAlertTitle:
    "Alerte de sécurité alimentaire, d'allergène ou de protection",
  safetyPassedPrefix: "Contrôle de sécurité alimentaire réussi :",
  singleResultHeader: "Plan de sauvetage d'un repas",
  multiResultHeader: "Planning sur plusieurs jours selon l'altération",
  prepTimePrefix: "Préparation et cuisson :",
  verifiedStaplesBadge: "Uniquement des produits de base vérifiés",
  prioritizedItemsLabel: "Produits périssables utilisés en priorité",
  usedIngredientsLabel: "Ingrédients du foyer utilisés",
  pantryStaplesLabel: "Produits de base supposés",
  noExtraStaples: "Aucun nécessaire",
  stepsHeading: "Étapes de préparation",
  alternativeIdeaBadge: "Option de sauvetage alternative",
  alternativeIdeaTitle: "Idée de secours rapide",
  alternativeIdeaFooter:
    "Aucun achat supplémentaire au-delà des ingrédients indiqués.",
  sdgImpactBadge: "Évaluation ODD 12.3 et ODD 13 de l'ONU",
  sdgImpactTitle: "Note sur le gaspillage alimentaire et l'empreinte climatique",
  sdgTarget12Note: "Cible 12.3 : réduire de moitié le gaspillage alimentaire par habitant",
  sdgTarget13Note: "ODD 13 : limiter les émissions des déchets organiques",
  dayLabelFormat: "Jour {n}",
  spoilageScheduleNote: "Justification selon le risque d'altération",
  footerDisclaimerBadge: "Avis de sécurité et d'hygiène alimentaires",
  footerDisclaimerText:
    "ZeroWaste Chef propose des suggestions culinaires à des fins éducatives et de durabilité. Vérifiez toujours l'absence de moisissure, d'odeur suspecte ou d'altération, assurez-vous de l'absence d'allergènes et cuisez les aliments périssables à une température interne sûre.",
  footerMeta: "Prototype académique ODD 12.3 et ODD 13 de l'ONU",
  footerSupportText:
    "Développé dans le cadre du programme Samsung Innovation Campus, en soutien au Programme des Nations Unies pour le développement (PNUD) et aux Objectifs de développement durable.",
  undpLogoAlt: "Logo du Programme des Nations Unies pour le développement (PNUD)",
  sdgLogoAlt: "Logo des Objectifs de développement durable",
  samsungLogoAlt: "Logo Samsung",
  sdgGoalsHeading: "Les 17 objectifs mondiaux",
  sdgGoalsText:
    "ZeroWaste Chef contribue directement aux ODD 12 et 13 — deux des 17 Objectifs de développement durable.",
  asideLabel: "Guide, conseils et impact",
  asideHowTitle: "Comment ça marche",
  asideHowSteps: [
    "Listez ce que vous avez — surtout ce qui risque de se perdre.",
    "Choisissez le sauvetage d'un repas ou un plan de 2 à 7 jours.",
    "Cuisinez dans l'ordre d'altération et ne gaspillez rien.",
  ],
  asideTipsTitle: "Astuces anti-gaspillage",
  asideTips: [
    {
      emoji: "🌿",
      text: "Conservez les herbes fraîches dans un verre d'eau, comme des fleurs.",
    },
    {
      emoji: "📅",
      text: "« À consommer de préférence avant » concerne la qualité ; « à consommer jusqu'au » concerne la sécurité.",
    },
    {
      emoji: "🧊",
      text: "Congelez le pain et les restes avant qu'ils ne s'abîment.",
    },
    {
      emoji: "🔄",
      text: "Premier entré, premier sorti — placez les produits plus anciens devant.",
    },
  ],
  asideImpactTitle: "Pourquoi c'est important",
  asideImpactStats: [
    { value: "1,05 milliard de t", label: "de nourriture gaspillée dans le monde en 2022" },
    { value: "60 %", label: "de ce gaspillage a lieu dans les ménages" },
    {
      value: "8–10 %",
      label: "des émissions mondiales de gaz à effet de serre proviennent des pertes et du gaspillage alimentaires",
    },
  ],
  asideImpactSource: "Source : Rapport 2024 du PNUE sur l'indice du gaspillage alimentaire",
  languageSwitcherLabel: "Langue",
  themeToggleLabel: "Basculer entre thème clair et sombre",
  workspaceSelectorLabel: "Sélecteur d'espace de travail",
  daysShortFormat: "{n} j",
  singlePresets: [
    {
      id: "stale-bread-tomatoes-fr",
      label: "Pain rassis et tomates molles",
      tag: "Sauvetage 15 min",
      ingredients:
        "Un demi-pain rassis, 2 tomates molles, 1 œuf, 2 gousses d'ail, un petit morceau de cheddar",
      servings: "2 people",
      maxTime: "15 mins",
      dietaryNotes: "Végétarien",
    },
    {
      id: "leftover-rice-greens-fr",
      label: "Reste de riz et légumes flétris",
      tag: "Sauté express",
      ingredients:
        "2 tasses de riz cuit, une poignée d'épinards flétris, un demi-oignon, 1 carotte molle, 1 poivron ridé",
      servings: "2 people",
      maxTime: "15 mins",
      dietaryNotes: "Végétalien, sans produits laitiers",
    },
    {
      id: "soft-potatoes-herbs-fr",
      label: "Pommes de terre et produits laitiers",
      tag: "Poêlée familiale",
      ingredients:
        "4 pommes de terre un peu molles, du persil qui flétrit, 3 œufs, un demi-verre de lait proche de la date, un demi-bloc de feta",
      servings: "4+ people",
      maxTime: "30 mins",
      dietaryNotes: "Sans gluten",
    },
    {
      id: "safety-guardrail-test-fr",
      label: "Test de sécurité : aliments avariés",
      tag: "Contrôle sécurité",
      ingredients:
        "Pain avec moisissure verte visible, poulet à l'odeur aigre, 3 œufs frais, 2 tomates mûres, épinards frais",
      servings: "1 person",
      maxTime: "15 mins",
      dietaryNotes: "",
    },
  ],
  multiDayPresets: [
    {
      id: "three-day-student-fr",
      label: "Frigo étudiant à vider en 3 jours",
      tag: "3 jours",
      ingredients:
        "Pousses d'épinards flétries, 3 tomates molles, reste de riz cuit, 1 boîte de pois chiches, 4 œufs, un demi-pain de campagne, 2 oignons, 3 carottes",
      servings: "1 person",
      targetDays: 3,
      maxTime: "15 mins",
      dietaryNotes: "Végétarien",
    },
    {
      id: "five-day-household-fr",
      label: "Panier familial équilibré sur 5 jours",
      tag: "5 jours",
      ingredients:
        "Herbes fraîches (persil et aneth), 2 courgettes mûres, 400 g de bœuf haché, 1 tasse de pâtes cuites, 1 pot de yaourt nature proche de la date, 1 brocoli, 4 pommes de terre, 1 tasse de lentilles corail, 1 chou, 2 oignons, de l'ail",
      servings: "2 people",
      targetDays: 5,
      maxTime: "30 mins",
      dietaryNotes: "",
    },
    {
      id: "seven-day-full-week-fr",
      label: "Semaine complète zéro déchet",
      tag: "7 jours",
      ingredients:
        "Laitue et épinards flétris, 4 tomates molles, reste de poulet rôti, 2 avocats, 1 bloc de tofu, 6 œufs, une demi-brique de lait, 2 poivrons, 3 courgettes, 1 paquet de riz, 1 paquet de pâtes, 1 boîte de haricots noirs, 5 pommes de terre, 4 carottes, 1 courge butternut, 3 oignons, de l'ail",
      servings: "4+ people",
      targetDays: 7,
      maxTime: "30 mins",
      dietaryNotes: "Sans fruits à coque",
    },
  ],
};
