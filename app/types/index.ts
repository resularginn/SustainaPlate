export type WorkspaceMode = "single" | "multi_day";
export type Language = "en" | "tr";
export type ThemeMode = "light" | "dark";

export interface GenerateRequestPayload {
  mode: WorkspaceMode;
  ingredients: string;
  servings: string;
  maxTime: string;
  dietaryNotes: string;
  target_days?: number;
  language?: Language;
}

export interface MainRecipe {
  title: string;
  prep_time: string;
  used_user_ingredients: string[];
  assumed_pantry_staples: string[];
  steps: string[];
}

export interface SingleMealResponse {
  mode?: "single";
  safety_alert: boolean;
  safety_message: string;
  prioritized_items: string[];
  main_recipe: MainRecipe;
  alternative_idea: string;
  sdg_impact_note: string;
  self_check_passed: boolean;
}

export interface DailyPlanItem {
  day: number;
  day_label: string;
  spoilage_rationale: string;
  title: string;
  prep_time: string;
  used_user_ingredients: string[];
  assumed_pantry_staples: string[];
  steps: string[];
}

export interface MultiDayPlanResponse {
  mode?: "multi_day";
  safety_alert: boolean;
  safety_message: string;
  target_days: number;
  prioritized_items: string[];
  daily_plans: DailyPlanItem[];
  sdg_impact_note: string;
  self_check_passed: boolean;
}

export type ZeroWasteApiResponse = SingleMealResponse | MultiDayPlanResponse;

export interface SinglePreset {
  id: string;
  label: string;
  tag: string;
  ingredients: string;
  servings: string;
  maxTime: string;
  dietaryNotes: string;
}

export interface MultiDayPreset {
  id: string;
  label: string;
  tag: string;
  ingredients: string;
  servings: string;
  targetDays: number;
  maxTime: string;
  dietaryNotes: string;
}

export interface TranslationDictionary {
  brandName: string;
  brandSubtitle: string;
  sdgBadge12: string;
  sdgBadge13: string;
  themeLight: string;
  themeDark: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  tabSingleTitle: string;
  tabSingleSubtitle: string;
  tabMultiTitle: string;
  tabMultiSubtitle: string;
  presetsHeading: string;
  presetsHint: string;
  singleIngredientsLabel: string;
  singleIngredientsPlaceholder: string;
  multiIngredientsLabel: string;
  multiIngredientsPlaceholder: string;
  servingsLabel: string;
  servingsOptions: {
    one: string;
    two: string;
    fourPlus: string;
  };
  maxTimeLabel: string;
  maxTimeOptions: {
    fifteen: string;
    thirty: string;
    fortyFive: string;
  };
  targetDaysLabel: string;
  targetDaysUnit: string;
  targetDaysHelper: string;
  dietaryLabel: string;
  optionalTag: string;
  dietaryPlaceholder: string;
  pantryAssumptionNote: string;
  submitSingleBtn: string;
  submitMultiBtn: string;
  loadingSingleText: string;
  loadingMultiText: string;
  errorTitle: string;
  emptyIngredientsError: string;
  safetyAlertBadge: string;
  safetyAlertTitle: string;
  safetyPassedPrefix: string;
  singleResultHeader: string;
  multiResultHeader: string;
  prepTimePrefix: string;
  verifiedStaplesBadge: string;
  prioritizedItemsLabel: string;
  usedIngredientsLabel: string;
  pantryStaplesLabel: string;
  noExtraStaples: string;
  stepsHeading: string;
  alternativeIdeaBadge: string;
  alternativeIdeaTitle: string;
  alternativeIdeaFooter: string;
  sdgImpactBadge: string;
  sdgImpactTitle: string;
  sdgTarget12Note: string;
  sdgTarget13Note: string;
  dayPrefix: string;
  spoilageScheduleNote: string;
  footerDisclaimerBadge: string;
  footerDisclaimerText: string;
  footerMeta: string;
  singlePresets: SinglePreset[];
  multiDayPresets: MultiDayPreset[];
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    brandName: "ZeroWaste Chef",
    brandSubtitle: "Domestic Food Rescue & Multi-Day Planning Engine",
    sdgBadge12: "SDG 12.3 · Zero Waste",
    sdgBadge13: "SDG 13 · Climate Action",
    themeLight: "Light",
    themeDark: "Dark",
    heroEyebrow: "UN Sustainable Development Goals Prototype",
    heroTitle: "Systematic kitchen planning to halve household food waste.",
    heroDescription:
      "Rescue immediate leftovers with an on-demand recipe, or schedule bulk groceries across 2 to 7 days ordered strictly by spoilage risk—without unverified claims or extra shopping trips.",
    tabSingleTitle: "Single Meal Rescue",
    tabSingleSubtitle: "Immediate 4-step recipe for expiring leftovers",
    tabMultiTitle: "Multi-Day Meal Plan",
    tabMultiSubtitle: "2–7 day spoilage-ordered kitchen schedule",
    presetsHeading: "Quick Scenario Presets",
    presetsHint: "Select a preset to populate test data",
    singleIngredientsLabel:
      "Ingredients on hand (especially items close to expiring)",
    singleIngredientsPlaceholder:
      "e.g., half a loaf of stale bread, 2 soft tomatoes, 1 egg, garlic, wilted spinach...",
    multiIngredientsLabel:
      "Available household groceries & perishables for the week",
    multiIngredientsPlaceholder:
      "e.g., fresh spinach, 3 ripe tomatoes, leftover cooked rice, 2 chicken breasts, 4 eggs, half cabbage, dry lentils, potatoes, carrots, onions...",
    servingsLabel: "Household size",
    servingsOptions: {
      one: "1 person",
      two: "2 people",
      fourPlus: "4+ people",
    },
    maxTimeLabel: "Max cooking time",
    maxTimeOptions: {
      fifteen: "15 mins",
      thirty: "30 mins",
      fortyFive: "45 mins",
    },
    targetDaysLabel: "Planning horizon (2 to 7 days)",
    targetDaysUnit: "days",
    targetDaysHelper:
      "Earlier days prioritize fragile produce & cooked leftovers; later days schedule hardy root vegetables & dry staples.",
    dietaryLabel: "Dietary restrictions or allergies",
    optionalTag: "(optional)",
    dietaryPlaceholder: "e.g., Vegetarian, nut allergy, gluten-free",
    pantryAssumptionNote:
      "Assumes only standard pantry staples (water, salt, black pepper, cooking oil, basic flour, common spices).",
    submitSingleBtn: "Generate Single Meal Rescue",
    submitMultiBtn: "Generate Multi-Day Plan",
    loadingSingleText: "Analyzing spoilage priority & recipe steps...",
    loadingMultiText: "Sequencing multi-day spoilage schedule...",
    errorTitle: "Request Could Not Be Completed",
    emptyIngredientsError:
      "Please enter at least a few ingredients before generating a plan.",
    safetyAlertBadge: "Food Safety Alert",
    safetyAlertTitle: "Unsafe or Spoiled Ingredients Flagged — Discard Safely",
    safetyPassedPrefix: "Food Safety Verification Passed:",
    singleResultHeader: "Single Meal Rescue Plan",
    multiResultHeader: "Sequential Multi-Day Spoilage Schedule",
    prepTimePrefix: "Prep & Cook:",
    verifiedStaplesBadge: "Verified Pantry Staples Only",
    prioritizedItemsLabel: "High-Priority Perishables Scheduled First",
    usedIngredientsLabel: "Used Household Ingredients",
    pantryStaplesLabel: "Assumed Pantry Staples",
    noExtraStaples: "None required",
    stepsHeading: "Preparation Steps",
    alternativeIdeaBadge: "Alternative Rescue Option",
    alternativeIdeaTitle: "Quick Backup Idea",
    alternativeIdeaFooter:
      "Requires zero extra specialty groceries beyond your listed items.",
    sdgImpactBadge: "UN SDG 12.3 & SDG 13 Assessment",
    sdgImpactTitle: "Food Waste & Climate Footprint Note",
    sdgTarget12Note: "Target 12.3: Halve per-capita household waste",
    sdgTarget13Note: "SDG 13: Mitigate organic landfill emissions",
    dayPrefix: "Day",
    spoilageScheduleNote: "Spoilage Priority Rationale",
    footerDisclaimerBadge: "Food Safety & Hygiene Notice",
    footerDisclaimerText:
      "ZeroWaste Chef generates culinary suggestions for sustainability and educational purposes. Always inspect ingredients for mold, off-odors, or physical spoilage, verify personal allergen safety, and cook perishable foods to safe internal temperatures.",
    footerMeta: "UN SDG 12.3 & SDG 13 Academic Prototype",
    singlePresets: [
      {
        id: "stale-bread-tomatoes",
        label: "Stale Bread & Soft Tomatoes",
        tag: "15m Rescue",
        ingredients:
          "Half a loaf of stale bread, 2 soft tomatoes, 1 egg, 2 cloves garlic, a small piece of cheddar cheese",
        servings: "2 people",
        maxTime: "15 mins",
        dietaryNotes: "Vegetarian",
      },
      {
        id: "leftover-rice-greens",
        label: "Leftover Rice & Wilted Greens",
        tag: "Pantry Stir-Fry",
        ingredients:
          "2 cups leftover cooked rice, a handful of wilted spinach, half an onion, 1 soft carrot, 1 wrinkly bell pepper",
        servings: "2 people",
        maxTime: "15 mins",
        dietaryNotes: "Vegan, dairy-free",
      },
      {
        id: "soft-potatoes-herbs",
        label: "Soft Potatoes & Dairy",
        tag: "Family Skillet",
        ingredients:
          "4 slightly soft potatoes, wilting parsley, 3 eggs, half a cup of milk near expiry date, half block of feta",
        servings: "4+ people",
        maxTime: "30 mins",
        dietaryNotes: "Gluten-free",
      },
      {
        id: "safety-guardrail-test",
        label: "Spoiled Food Guardrail Test",
        tag: "Safety Check",
        ingredients:
          "Bread with visible green mold, sour-smelling chicken, 3 fresh eggs, 2 ripe tomatoes, fresh spinach",
        servings: "1 person",
        maxTime: "15 mins",
        dietaryNotes: "",
      },
    ],
    multiDayPresets: [
      {
        id: "three-day-student",
        label: "3-Day Student Fridge Clear-Out",
        tag: "3 Days",
        ingredients:
          "Wilted baby spinach, 3 soft tomatoes, leftover cooked rice, 1 can chickpeas, 4 eggs, half a loaf of country bread, 2 onions, 3 carrots",
        servings: "1 person",
        targetDays: 3,
        maxTime: "15 mins",
        dietaryNotes: "Vegetarian",
      },
      {
        id: "five-day-household",
        label: "5-Day Balanced Household Basket",
        tag: "5 Days",
        ingredients:
          "Fresh herbs (parsley & dill), 2 ripe zucchini, 400g minced beef, 1 cup cooked pasta, 1 tub plain yogurt near expiry, 1 head broccoli, 4 potatoes, 1 cup dry red lentils, 1 cabbage, 2 onions, garlic",
        servings: "2 people",
        targetDays: 5,
        maxTime: "30 mins",
        dietaryNotes: "",
      },
      {
        id: "seven-day-full-week",
        label: "7-Day Full-Week Zero-Waste Plan",
        tag: "7 Days",
        ingredients:
          "Wilted lettuce & spinach, 4 soft tomatoes, leftover roast chicken, 2 avocados, 1 block tofu, 6 eggs,half carton milk, 2 bell peppers, 3 zucchini, 1 bag dry rice, 1 bag dry pasta, 1 can black beans, 5 potatoes, 4 carrots, 1 butternut squash, 3 onions, garlic",
        servings: "4+ people",
        targetDays: 7,
        maxTime: "30 mins",
        dietaryNotes: "Nut-free",
      },
    ],
  },
  tr: {
    brandName: "ZeroWaste Chef",
    brandSubtitle: "Evsel Gıda Kurtarma ve Çok Günlü Planlama Motoru",
    sdgBadge12: "SKA 12.3 · Sıfır Atık",
    sdgBadge13: "SKA 13 · İklim Eylemi",
    themeLight: "Açık",
    themeDark: "Koyu",
    heroEyebrow: "BM Sürdürülebilir Kalkınma Amaçları Prototipi",
    heroTitle: "Evsel gıda israfını yarıya indiren sistematik mutfak planlaması.",
    heroDescription:
      "Son kullanma tarihi yaklaşan malzemeleri tek öğünlük hızlı tariflerle değerlendirin veya haftalık mutfak stokunuzu bozulma riskine göre 2 ila 7 gün arasında planlayın.",
    tabSingleTitle: "Tek Öğün Kurtarma",
    tabSingleSubtitle: "Artan malzemeler için 4 adımda hızlı tarif",
    tabMultiTitle: "Çok Günlü Plan (2–7 Gün)",
    tabMultiSubtitle: "Bozulma önceliğine göre sıralı mutfak takvimi",
    presetsHeading: "Hızlı Senaryo Örnekleri",
    presetsHint: "Formu otomatik doldurmak için bir senaryo seçin",
    singleIngredientsLabel:
      "Elinizdeki malzemeler (özellikle son tüketim tarihi yaklaşanlar)",
    singleIngredientsPlaceholder:
      "örn., yarım bayat ekmek, 2 yumuşamış domates, 1 yumurta, sarımsak, solmuş ıspanak...",
    multiIngredientsLabel:
      "Planlama süresi boyunca kullanabileceğiniz mutfak malzemeleri",
    multiIngredientsPlaceholder:
      "örn., taze ıspanak, 3 olgun domates, artan pilav, 4 yumurta, yarım lahana, kuru mercimek, patates, havuç, kuru soğan...",
    servingsLabel: "Hane büyüklüğü",
    servingsOptions: {
      one: "1 kişilik",
      two: "2 kişilik",
      fourPlus: "4+ kişilik",
    },
    maxTimeLabel: "Maksimum hazırlama süresi",
    maxTimeOptions: {
      fifteen: "15 dk",
      thirty: "30 dk",
      fortyFive: "45 dk",
    },
    targetDaysLabel: "Planlama süresi (2 ila 7 gün)",
    targetDaysUnit: "gün",
    targetDaysHelper:
      "İlk günler çabuk bozulan yeşillik ve pişmiş yemekleri; sonraki günler dayanıklı kök sebze ve bakliyatları önceliklendirir.",
    dietaryLabel: "Beslenme kısıtlamaları veya alerjiler",
    optionalTag: "(isteğe bağlı)",
    dietaryPlaceholder: "örn., Vejetaryen, fıstık alerjisi, glutensiz",
    pantryAssumptionNote:
      "Yalnızca temel kiler malzemelerinin (su, tuz, karabiber, sıvı yağ, un, temel baharatlar) bulunduğu varsayılır.",
    submitSingleBtn: "Tek Öğün Tarif Oluştur",
    submitMultiBtn: "Çok Günlü Plan Oluştur",
    loadingSingleText: "Malzeme güvenliği ve tarif adımları analiz ediliyor...",
    loadingMultiText: "Bozulma sırasına göre çok günlü takvim oluşturuluyor...",
    errorTitle: "İstek Tamamlanamadı",
    emptyIngredientsError:
      "Plan oluşturmadan önce lütfen elinizdeki malzemelerden birkaçını yazın.",
    safetyAlertBadge: "Gıda Güvenliği Uyarısı",
    safetyAlertTitle:
      "Bozulmuş veya Riskli Malzeme Tespit Edildi — Tüketmeyin",
    safetyPassedPrefix: "Gıda Güvenliği Kontrolü Geçti:",
    singleResultHeader: "Tek Öğün Sıfır Atık Tarifi",
    multiResultHeader: "Bozulma Öncelikli Günlük Mutfak Planı",
    prepTimePrefix: "Hazırlık ve Pişirme:",
    verifiedStaplesBadge: "Yalnızca Temel Kiler Ürünleri",
    prioritizedItemsLabel: "İlk Kurtarılan Çabuk Bozulan Malzemeler",
    usedIngredientsLabel: "Kullanılan Ev Malzemeleri",
    pantryStaplesLabel: "Varsayılan Temel Kiler Ürünleri",
    noExtraStaples: "Ek kiler malzemesi gerekmiyor",
    stepsHeading: "Hazırlanış Adımları",
    alternativeIdeaBadge: "Alternatif Kurtarma Fikri",
    alternativeIdeaTitle: "Hızlı Yedek Öneri",
    alternativeIdeaFooter:
      "Ekstra alışveriş gerektirmeden eldeki malzemelerle uygulanabilir.",
    sdgImpactBadge: "BM SKA 12.3 ve SKA 13 Etki Notu",
    sdgImpactTitle: "Gıda Atığı ve Karbon Ayak İzi Değerlendirmesi",
    sdgTarget12Note: "Hedef 12.3: Kişi başı gıda atığını yarıya indirme",
    sdgTarget13Note: "SKA 13: Organik atık kaynaklı metan salımını önleme",
    dayPrefix: "Gün",
    spoilageScheduleNote: "Bozulma Önceliği Gerekçesi",
    footerDisclaimerBadge: "Gıda Güvenliği ve Hijyen Bildirimi",
    footerDisclaimerText:
      "ZeroWaste Chef, sürdürülebilirlik ve eğitim amacıyla yapay zekâ destekli mutfak önerileri sunar. Malzemeleri küf, kötü koku veya bozulma açısından daima kontrol edin; alerjen uyumluluğunu doğrulayın ve gıdaları güvenli iç sıcaklıklarda pişirin.",
    footerMeta: "BM SKA 12.3 & SKA 13 Akademik Prototip",
    singlePresets: [
      {
        id: "stale-bread-tomatoes-tr",
        label: "Bayat Ekmek ve Yumuşak Domates",
        tag: "15dk Kurtarma",
        ingredients:
          "Yarım bayat ekmek, 2 yumuşamış domates, 1 yumurta, 2 diş sarımsak, küçük bir parça kaşar peyniri",
        servings: "2 people",
        maxTime: "15 mins",
        dietaryNotes: "Vejetaryen",
      },
      {
        id: "leftover-rice-greens-tr",
        label: "Artan Pilav ve Solmuş Yeşillikler",
        tag: "Hızlı Sote",
        ingredients:
          "2 su bardağı artan pişmiş pirinç pilavı, bir avuç solmuş ıspanak, yarım kuru soğan, 1 yumuşamış havuç, 1 kapya biber",
        servings: "2 people",
        maxTime: "15 mins",
        dietaryNotes: "Vegan",
      },
      {
        id: "soft-potatoes-herbs-tr",
        label: "Yumuşamış Patates ve Süt Ürünleri",
        tag: "Aile Öğünü",
        ingredients:
          "4 adet hafif yumuşamış patates, solmaya başlayan maydanoz, 3 yumurta, tarihi yaklaşan yarım bardak süt, biraz beyaz peynir",
        servings: "4+ people",
        maxTime: "30 mins",
        dietaryNotes: "Glutensiz",
      },
      {
        id: "safety-guardrail-test-tr",
        label: "Küflü Gıda Güvenlik Testi",
        tag: "Güvenlik Testi",
        ingredients:
          "Üzerinde yeşil küf olan ekmek, ağır kokulu tavuk eti, 3 taze yumurta, 2 olgun domates, taze ıspanak",
        servings: "1 person",
        maxTime: "15 mins",
        dietaryNotes: "",
      },
    ],
    multiDayPresets: [
      {
        id: "three-day-student-tr",
        label: "3 Günlük Öğrenci Mutfağı Planı",
        tag: "3 Gün",
        ingredients:
          "Solmuş bebek ıspanak, 3 yumuşak domates, artan pirinç pilavı, 1 su bardağı haşlanmış nohut, 4 yumurta, yarım bayat ekmek, 2 soğan, 3 havuç",
        servings: "1 person",
        targetDays: 3,
        maxTime: "15 mins",
        dietaryNotes: "Vejetaryen",
      },
      {
        id: "five-day-household-tr",
        label: "5 Günlük Dengeli Ev Sepeti",
        tag: "5 Gün",
        ingredients:
          "Maydanoz ve dereotu, 2 olgun kabak, 400g kıyma, haşlanmış makarna, tarihi yaklaşan 1 kase yoğurt, 1 brokoli, 4 patates, 1 su bardağı kırmızı mercimek, yarım lahana, 2 soğan, sarımsak",
        servings: "2 people",
        targetDays: 5,
        maxTime: "30 mins",
        dietaryNotes: "",
      },
      {
        id: "seven-day-full-week-tr",
        label: "7 Günlük Tam Hafta Sıfır Atık Planı",
        tag: "7 Gün",
        ingredients:
          "Solmuş marul ve ıspanak, 4 yumuşak domates, artan pişmiş tavuk, 6 yumurta, yarım kutu süt, 2 biber, 3 kabak, kuru pirinç, makarna, haşlanmış fasulye, 5 patates, 4 havuç, 1 dilim bal kabağı, 3 soğan, sarımsak",
        servings: "4+ people",
        targetDays: 7,
        maxTime: "30 mins",
        dietaryNotes: "Kuruyemişsiz",
      },
    ],
  },
};
