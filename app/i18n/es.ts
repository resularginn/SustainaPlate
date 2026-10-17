import type { TranslationDictionary } from "@/app/types";

export const es: TranslationDictionary = {
  brandName: "ZeroWaste Chef",
  brandSubtitle: "Rescate de alimentos y planificación de comidas para varios días",
  sdgBadge12: "ODS 12 · Producción y consumo responsables",
  sdgBadge13: "ODS 13 · Acción por el clima",
  themeLight: "Claro",
  themeDark: "Oscuro",
  heroEyebrow: "Prototipo para los Objetivos de Desarrollo Sostenible de la ONU",
  heroTitle:
    "Planificación en la cocina para reducir a la mitad el desperdicio de alimentos en el hogar.",
  heroDescription:
    "Rescata tus sobras con una receta al instante, o planifica tus compras para 2 a 7 días según el riesgo de deterioro, sin afirmaciones sin verificar ni compras adicionales.",
  tabSingleTitle: "Rescate de una comida",
  tabSingleSubtitle: "Receta en 4 pasos para sobras a punto de caducar",
  tabMultiTitle: "Plan de comidas para varios días",
  tabMultiSubtitle: "Calendario de 2 a 7 días según el riesgo de deterioro",
  presetsHeading: "Escenarios rápidos",
  presetsHint: "Elige un escenario para rellenar el formulario",
  singleIngredientsLabel:
    "Ingredientes disponibles (sobre todo los que están por caducar)",
  singleIngredientsPlaceholder:
    "p. ej.: media barra de pan duro, 2 tomates blandos, 1 huevo, ajo, espinacas mustias...",
  multiIngredientsLabel: "Compras y productos frescos disponibles para la semana",
  multiIngredientsPlaceholder:
    "p. ej.: espinacas frescas, 3 tomates maduros, arroz cocido sobrante, 2 pechugas de pollo, 4 huevos, media col, lentejas secas, patatas, zanahorias, cebollas...",
  servingsLabel: "Tamaño del hogar",
  servingsOptions: {
    one: "1 persona",
    two: "2 personas",
    fourPlus: "4 o más personas",
  },
  maxTimeLabel: "Tiempo máximo de cocción",
  maxTimeOptions: {
    fifteen: "15 min",
    thirty: "30 min",
    fortyFive: "45 min",
  },
  targetDaysLabel: "Horizonte de planificación (2 a 7 días)",
  targetDaysUnit: "días",
  targetDaysHelper:
    "Los primeros días priorizan los productos frágiles y las sobras cocinadas; los últimos, las raíces resistentes y los productos secos.",
  dietaryLabel: "Restricciones alimentarias o alergias",
  optionalTag: "(opcional)",
  dietaryPlaceholder: "p. ej.: vegetariano, alergia a los frutos secos, sin gluten",
  pantryAssumptionNote:
    "Solo se suponen los productos básicos de despensa (agua, sal, pimienta negra, aceite, harina, especias comunes).",
  submitSingleBtn: "Rescatar una comida",
  submitMultiBtn: "Crear plan para varios días",
  loadingSingleText: "Analizando prioridades y pasos de la receta...",
  loadingMultiText: "Organizando el calendario según el riesgo de deterioro...",
  errorTitle: "No se pudo completar la solicitud",
  emptyIngredientsError:
    "Introduce al menos algunos ingredientes antes de crear un plan.",
  requestFailedError:
    "La solicitud falló ({status}). Verifica tu configuración.",
  networkError: "Se produjo un error de red al conectar con el servidor.",
  safetyAlertBadge: "Alerta de seguridad alimentaria",
  safetyAlertTitle:
    "Alerta de seguridad alimentaria, alérgenos o filtro de protección",
  safetyPassedPrefix: "Control de seguridad alimentaria superado:",
  singleResultHeader: "Plan de rescate de una comida",
  multiResultHeader: "Calendario de varios días según el deterioro",
  prepTimePrefix: "Preparación y cocción:",
  verifiedStaplesBadge: "Solo productos básicos verificados",
  prioritizedItemsLabel: "Perecederos que se usan primero",
  usedIngredientsLabel: "Ingredientes del hogar utilizados",
  pantryStaplesLabel: "Productos básicos supuestos",
  noExtraStaples: "Ninguno necesario",
  stepsHeading: "Pasos de preparación",
  alternativeIdeaBadge: "Opción de rescate alternativa",
  alternativeIdeaTitle: "Idea rápida de reserva",
  alternativeIdeaFooter:
    "No requiere compras adicionales aparte de los ingredientes indicados.",
  sdgImpactBadge: "Evaluación ODS 12.3 y ODS 13 de la ONU",
  sdgImpactTitle: "Nota sobre desperdicio de alimentos y huella climática",
  sdgTarget12Note: "Meta 12.3: reducir a la mitad el desperdicio de alimentos per cápita",
  sdgTarget13Note: "ODS 13: reducir las emisiones de los residuos orgánicos",
  dayLabelFormat: "Día {n}",
  spoilageScheduleNote: "Justificación según el riesgo de deterioro",
  footerDisclaimerBadge: "Aviso de seguridad e higiene alimentaria",
  footerDisclaimerText:
    "ZeroWaste Chef ofrece sugerencias culinarias con fines educativos y de sostenibilidad. Revisa siempre que los ingredientes no tengan moho, mal olor ni deterioro, comprueba los alérgenos y cocina los alimentos perecederos a una temperatura interna segura.",
  footerMeta: "Prototipo académico ODS 12.3 y ODS 13 de la ONU",
  footerSupportText:
    "Desarrollado en el programa Samsung Innovation Campus, en apoyo del Programa de las Naciones Unidas para el Desarrollo (PNUD) y los Objetivos de Desarrollo Sostenible.",
  undpLogoAlt: "Logotipo del Programa de las Naciones Unidas para el Desarrollo (PNUD)",
  sdgLogoAlt: "Logotipo de los Objetivos de Desarrollo Sostenible",
  samsungLogoAlt: "Logotipo de Samsung",
  sdgGoalsHeading: "Los 17 Objetivos Mundiales",
  sdgGoalsText:
    "ZeroWaste Chef contribuye directamente a los ODS 12 y 13, dos de los 17 Objetivos de Desarrollo Sostenible.",
  asideLabel: "Guía, consejos e impacto",
  asideHowTitle: "Cómo funciona",
  asideHowSteps: [
    "Anota lo que tienes, sobre todo lo que está por estropearse.",
    "Elige rescatar una comida o un plan de 2 a 7 días.",
    "Cocina en orden de deterioro y no desperdicies nada.",
  ],
  asideTipsTitle: "Consejos para no desperdiciar",
  asideTips: [
    {
      emoji: "🌿",
      text: "Guarda las hierbas frescas en un vaso de agua, como si fueran flores.",
    },
    {
      emoji: "📅",
      text: "«Consumir preferentemente antes de» indica calidad; «fecha de caducidad» indica seguridad.",
    },
    {
      emoji: "🧊",
      text: "Congela el pan y las sobras antes de que se estropeen.",
    },
    {
      emoji: "🔄",
      text: "Lo primero que entra, lo primero que sale: pon delante los productos más antiguos.",
    },
  ],
  asideImpactTitle: "Por qué importa",
  asideImpactStats: [
    { value: "1050 millones de t", label: "de alimentos desperdiciados en el mundo en 2022" },
    { value: "60 %", label: "de ese desperdicio ocurre en los hogares" },
    {
      value: "8–10 %",
      label: "de las emisiones mundiales de gases de efecto invernadero provienen de la pérdida y el desperdicio de alimentos",
    },
  ],
  asideImpactSource: "Fuente: Informe del Índice de Desperdicio de Alimentos 2024 del PNUMA",
  languageSwitcherLabel: "Idioma",
  themeToggleLabel: "Cambiar entre tema claro y oscuro",
  workspaceSelectorLabel: "Selector de espacio de trabajo",
  daysShortFormat: "{n} d",
  singlePresets: [
    {
      id: "stale-bread-tomatoes-es",
      label: "Pan duro y tomates blandos",
      tag: "Rescate 15 min",
      ingredients:
        "Media barra de pan duro, 2 tomates blandos, 1 huevo, 2 dientes de ajo, un trozo pequeño de queso cheddar",
      servings: "2 people",
      maxTime: "15 mins",
      dietaryNotes: "Vegetariano",
    },
    {
      id: "leftover-rice-greens-es",
      label: "Arroz sobrante y verduras mustias",
      tag: "Salteado rápido",
      ingredients:
        "2 tazas de arroz cocido sobrante, un puñado de espinacas mustias, media cebolla, 1 zanahoria blanda, 1 pimiento arrugado",
      servings: "2 people",
      maxTime: "15 mins",
      dietaryNotes: "Vegano, sin lácteos",
    },
    {
      id: "soft-potatoes-herbs-es",
      label: "Patatas blandas y lácteos",
      tag: "Sartén familiar",
      ingredients:
        "4 patatas algo blandas, perejil mustio, 3 huevos, medio vaso de leche a punto de caducar, medio bloque de queso feta",
      servings: "4+ people",
      maxTime: "30 mins",
      dietaryNotes: "Sin gluten",
    },
    {
      id: "safety-guardrail-test-es",
      label: "Prueba de seguridad: alimentos en mal estado",
      tag: "Control de seguridad",
      ingredients:
        "Pan con moho verde visible, pollo con olor agrio, 3 huevos frescos, 2 tomates maduros, espinacas frescas",
      servings: "1 person",
      maxTime: "15 mins",
      dietaryNotes: "",
    },
  ],
  multiDayPresets: [
    {
      id: "three-day-student-es",
      label: "Vaciar la nevera de estudiante en 3 días",
      tag: "3 días",
      ingredients:
        "Brotes de espinaca mustios, 3 tomates blandos, arroz cocido sobrante, 1 lata de garbanzos, 4 huevos, media hogaza de pan, 2 cebollas, 3 zanahorias",
      servings: "1 person",
      targetDays: 3,
      maxTime: "15 mins",
      dietaryNotes: "Vegetariano",
    },
    {
      id: "five-day-household-es",
      label: "Cesta familiar equilibrada para 5 días",
      tag: "5 días",
      ingredients:
        "Hierbas frescas (perejil y eneldo), 2 calabacines maduros, 400 g de carne picada de ternera, 1 taza de pasta cocida, 1 yogur natural a punto de caducar, 1 brócoli, 4 patatas, 1 taza de lentejas rojas, 1 col, 2 cebollas, ajo",
      servings: "2 people",
      targetDays: 5,
      maxTime: "30 mins",
      dietaryNotes: "",
    },
    {
      id: "seven-day-full-week-es",
      label: "Semana completa sin desperdicio",
      tag: "7 días",
      ingredients:
        "Lechuga y espinacas mustias, 4 tomates blandos, pollo asado sobrante, 2 aguacates, 1 bloque de tofu, 6 huevos, medio cartón de leche, 2 pimientos, 3 calabacines, 1 bolsa de arroz, 1 bolsa de pasta, 1 lata de frijoles negros, 5 patatas, 4 zanahorias, 1 calabaza, 3 cebollas, ajo",
      servings: "4+ people",
      targetDays: 7,
      maxTime: "30 mins",
      dietaryNotes: "Sin frutos secos",
    },
  ],
};
