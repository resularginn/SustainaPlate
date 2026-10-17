"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/app/components/Header";
import { SingleMealResults } from "@/app/components/SingleMealResults";
import { MultiDayResults } from "@/app/components/MultiDayResults";
import { SidePanel } from "@/app/components/SidePanel";
import {
  LANGUAGE_OPTIONS,
  TRANSLATIONS,
  type Language,
  type MultiDayPlanResponse,
  type MultiDayPreset,
  type SingleMealResponse,
  type SinglePreset,
  type ThemeMode,
  type WorkspaceMode,
} from "@/app/types";

const DAY_OPTIONS = [2, 3, 4, 5, 6, 7] as const;
const SDG_GOALS = Array.from({ length: 17 }, (_, i) => i + 1);
const STORAGE_KEY = "sustainaplate_prefs_v1";
const LEGACY_STORAGE_KEY = "zerowaste_chef_prefs_v1";

// Food emoji per scenario preset — universal, language-independent cues
const PRESET_EMOJI: Record<string, string> = {
  "stale-bread-tomatoes": "🍞",
  "leftover-rice-greens": "🍚",
  "soft-potatoes-herbs": "🥔",
  "safety-guardrail-test": "⚠️",
  "three-day-student": "🥕",
  "five-day-household": "🧺",
  "seven-day-full-week": "🥗",
};

const presetEmoji = (id: string) =>
  PRESET_EMOJI[id.replace(/-(ar|zh|fr|ru|es|tr)$/, "")];

// Twinkling hero stars, kept clear of the text. `start` is measured from the
// reading side, so the stars mirror for right-to-left languages.
const HERO_STARS = [
  { top: "8%", start: "58%", size: 14, delay: 0, gold: true, desktopOnly: true },
  { top: "82%", start: "60%", size: 10, delay: 1.1, gold: false, desktopOnly: true },
  { top: "16%", start: "95%", size: 12, delay: 0.6, gold: false },
  { top: "86%", start: "93%", size: 16, delay: 1.8, gold: true },
  { top: "4%", start: "2%", size: 9, delay: 2.4, gold: false },
  { top: "93%", start: "40%", size: 11, delay: 0.3, gold: true },
];

function Sparkle({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
    </svg>
  );
}

export default function SustainaPlatePage() {
  // Theme & Localization state (Defaults match pre-rendered DOM state)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
      return "dark";
    }
    return "light";
  });
  const [language, setLanguage] = useState<Language>("en");
  const [prefsLoaded, setPrefsLoaded] = useState<boolean>(false);

  // Active operational workspace ("single" | "multi_day")
  const [mode, setMode] = useState<WorkspaceMode>("single");

  // Single Meal Rescue form state
  const [singleIngredients, setSingleIngredients] = useState<string>(
    TRANSLATIONS.en.singlePresets[0].ingredients
  );
  const [singleServings, setSingleServings] = useState<string>("2 people");
  const [singleMaxTime, setSingleMaxTime] = useState<string>("15 mins");
  const [singleDietary, setSingleDietary] = useState<string>("Vegetarian");

  // Multi-Day Meal Plan form state (2 to 7 days)
  const [multiIngredients, setMultiIngredients] = useState<string>(
    TRANSLATIONS.en.multiDayPresets[0].ingredients
  );
  const [multiServings, setMultiServings] = useState<string>("2 people");
  const [targetDays, setTargetDays] = useState<number>(3);
  const [multiMaxTime, setMultiMaxTime] = useState<string>("30 mins");
  const [multiDietary, setMultiDietary] = useState<string>("");

  // Request & response state per workspace
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [singleResult, setSingleResult] = useState<SingleMealResponse | null>(
    null
  );
  const [multiResult, setMultiResult] = useState<MultiDayPlanResponse | null>(
    null
  );

  const abortControllerRef = useRef<AbortController | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const t = TRANSLATIONS[language];

  // Hydrate saved user preferences or fall back to device/browser defaults
  useEffect(() => {
    let saved: Partial<{
      theme: ThemeMode;
      language: Language;
      singleServings: string;
      multiServings: string;
      singleDietary: string;
      multiDietary: string;
    }> | null = null;

    try {
      const raw =
        window.localStorage.getItem(STORAGE_KEY) ||
        window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) {
        saved = JSON.parse(raw);
      }
    } catch {
      // Ignore localStorage read errors in restricted browsing modes
    }

    const isDomDark = document.documentElement.classList.contains("dark");
    const resolvedTheme: ThemeMode =
      saved?.theme === "dark" || saved?.theme === "light"
        ? saved.theme
        : isDomDark
        ? "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    setTheme(resolvedTheme);
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    const validSavedLang =
      saved?.language &&
      LANGUAGE_OPTIONS.some((opt) => opt.code === saved?.language)
        ? saved.language
        : null;

    const preferredBrowserLang = navigator.languages
      .map((tag) => tag.slice(0, 2).toLowerCase())
      .find((code) =>
        LANGUAGE_OPTIONS.some((option) => option.code === code)
      ) as Language | undefined;

    const initialLang: Language =
      validSavedLang ?? preferredBrowserLang ?? "en";

    if (initialLang !== "en") {
      const dict = TRANSLATIONS[initialLang];
      const single = dict.singlePresets[0];
      const multi = dict.multiDayPresets[0];
      setLanguage(initialLang);
      setSingleIngredients(single.ingredients);
      setSingleDietary(saved?.singleDietary ?? single.dietaryNotes);
      setMultiIngredients(multi.ingredients);
      setMultiDietary(saved?.multiDietary ?? multi.dietaryNotes);
    } else {
      if (typeof saved?.singleDietary === "string") {
        setSingleDietary(saved.singleDietary);
      }
      if (typeof saved?.multiDietary === "string") {
        setMultiDietary(saved.multiDietary);
      }
    }

    if (typeof saved?.singleServings === "string") {
      setSingleServings(saved.singleServings);
    }
    if (typeof saved?.multiServings === "string") {
      setMultiServings(saved.multiServings);
    }

    setPrefsLoaded(true);
  }, []);

  // Persist user preferences (theme, language, household size, allergy notes)
  useEffect(() => {
    if (!prefsLoaded) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          theme,
          language,
          singleServings,
          multiServings,
          singleDietary,
          multiDietary,
        })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [
    prefsLoaded,
    theme,
    language,
    singleServings,
    multiServings,
    singleDietary,
    multiDietary,
  ]);

  // Keep <html lang> and text direction in sync (Arabic is right-to-left)
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir =
      LANGUAGE_OPTIONS.find((option) => option.code === language)?.dir ?? "ltr";
  }, [language]);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const nextTheme: ThemeMode = prev === "light" ? "dark" : "light";
      const root = document.documentElement;
      if (nextTheme === "dark") {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      }
      return nextTheme;
    });
  };

  const handleLanguageChange = (nextLang: Language) => {
    const currentDict = TRANSLATIONS[language];
    const nextDict = TRANSLATIONS[nextLang];

    const matchedSingleIdx = currentDict.singlePresets.findIndex(
      (p) => p.ingredients === singleIngredients
    );
    if (matchedSingleIdx !== -1 && nextDict.singlePresets[matchedSingleIdx]) {
      const nextSingle = nextDict.singlePresets[matchedSingleIdx];
      setSingleIngredients(nextSingle.ingredients);
      setSingleDietary(nextSingle.dietaryNotes);
    }

    const matchedMultiIdx = currentDict.multiDayPresets.findIndex(
      (p) => p.ingredients === multiIngredients
    );
    if (matchedMultiIdx !== -1 && nextDict.multiDayPresets[matchedMultiIdx]) {
      const nextMulti = nextDict.multiDayPresets[matchedMultiIdx];
      setMultiIngredients(nextMulti.ingredients);
      setMultiDietary(nextMulti.dietaryNotes);
    }

    setLanguage(nextLang);
    setError(null);
  };

  const handleApplySinglePreset = (preset: SinglePreset) => {
    setSingleIngredients(preset.ingredients);
    setSingleServings(preset.servings);
    setSingleMaxTime(preset.maxTime);
    setSingleDietary(preset.dietaryNotes);
    setError(null);
  };

  const handleApplyMultiPreset = (preset: MultiDayPreset) => {
    setMultiIngredients(preset.ingredients);
    setMultiServings(preset.servings);
    setTargetDays(preset.targetDays);
    setMultiMaxTime(preset.maxTime);
    setMultiDietary(preset.dietaryNotes);
    setError(null);
  };

  const handleSelectMode = (nextMode: WorkspaceMode) => {
    setMode(nextMode);
    setError(null);
  };

  // Arrow keys move between the two workspace tabs (WAI-ARIA tabs pattern)
  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      return;
    }
    e.preventDefault();
    const nextMode: WorkspaceMode = mode === "single" ? "multi_day" : "single";
    handleSelectMode(nextMode);
    document.getElementById(`tab-${nextMode}`)?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const activeIngredients =
      mode === "single" ? singleIngredients : multiIngredients;

    if (!activeIngredients.trim()) {
      setError(t.emptyIngredientsError);
      return;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    const payload =
      mode === "single"
        ? {
            mode: "single" as const,
            language,
            ingredients: singleIngredients,
            servings: singleServings,
            maxTime: singleMaxTime,
            dietaryNotes: singleDietary,
          }
        : {
            mode: "multi_day" as const,
            language,
            target_days: targetDays,
            ingredients: multiIngredients,
            servings: multiServings,
            maxTime: multiMaxTime,
            dietaryNotes: multiDietary,
          };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.error ||
            t.requestFailedError.replace("{status}", String(response.status))
        );
        return;
      }

      if (mode === "single") {
        setSingleResult(data as SingleMealResponse);
      } else {
        setMultiResult(data as MultiDayPlanResponse);
      }

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      setError(err instanceof Error ? err.message : t.networkError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Top Minimalist Header */}
      <Header
        t={t}
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* UNDP-Blue Hero Banner with SDG 12 & 13 */}
        <section className="hero-banner relative overflow-hidden rounded-2xl text-white">
          <div
            aria-hidden="true"
            className="sdg-ring absolute -end-24 -top-24 w-80 h-80 opacity-20 pointer-events-none"
          />
          {HERO_STARS.map((star, idx) => (
            <span
              key={idx}
              aria-hidden="true"
              className={`absolute pointer-events-none ${star.desktopOnly ? "hidden md:block" : ""}`}
              style={{ top: star.top, insetInlineStart: star.start }}
            >
              <Sparkle
                className={`twinkle block ${star.gold ? "text-[#fcc30b]" : "text-white"}`}
                style={{
                  width: star.size,
                  height: star.size,
                  animationDelay: `${star.delay}s`,
                }}
              />
            </span>
          ))}
          <div className="relative p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/85">
                <Sparkle className="w-3 h-3 text-[#fcc30b]" />
                {t.heroEyebrow}
              </p>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                {t.heroDescription}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Image
                src="/brand/sdg/sdg-12.png"
                alt={t.sdgBadge12}
                title={t.sdgBadge12}
                width={96}
                height={96}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-md ring-2 ring-white/80"
                priority
              />
              <Image
                src="/brand/sdg/sdg-13.png"
                alt={t.sdgBadge13}
                title={t.sdgBadge13}
                width={96}
                height={96}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-md ring-2 ring-white/80"
                priority
              />
            </div>
          </div>
          <div aria-hidden="true" className="sdg-stripe h-1.5" />
        </section>

        {/* Two-column layout on large screens: workspace left, guide panel right */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
          <div className="space-y-8 min-w-0">
            {/* Two-Segment Workspace Navigation Control */}
            <section aria-label={t.workspaceSelectorLabel}>
              <div
                role="tablist"
                onKeyDown={handleTabKeyDown}
                className="grid grid-cols-1 sm:grid-cols-2 p-1.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-pill)] gap-2"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-single"
                  aria-selected={mode === "single"}
                  aria-controls="workspace-panel"
                  tabIndex={mode === "single" ? 0 : -1}
                  onClick={() => handleSelectMode("single")}
                  className={`text-start px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors duration-100 ${
                    mode === "single"
                      ? "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--accent-bg)] shadow-sm ring-1 ring-[var(--accent-bg)]/25"
                      : "bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-surface)]/60 hover:text-[var(--text-primary)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${
                          mode === "single"
                            ? "bg-[var(--accent-bg)]/15 text-[var(--accent-bg)]"
                            : "bg-[var(--bg-subtle)] text-[var(--text-muted)]"
                        }`}
                      >
                        {/* Cooking pot */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4">
                          <path d="M3 10h18M5 10v7a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-7M1.5 10H3M21 10h1.5M9 6c0-1 1-1 1-2M14 6c0-1 1-1 1-2" />
                        </svg>
                      </div>
                      <span className={`text-sm font-bold ${mode === "single" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                        {t.tabSingleTitle}
                      </span>
                    </div>
                    {mode === "single" ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {language === "tr" ? "SEÇİLİ" : "ACTIVE"}
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-muted)] shrink-0">
                        01
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1 ps-9.5">
                    {t.tabSingleSubtitle}
                  </p>
                </button>

                <button
                  type="button"
                  role="tab"
                  id="tab-multi_day"
                  aria-selected={mode === "multi_day"}
                  aria-controls="workspace-panel"
                  tabIndex={mode === "multi_day" ? 0 : -1}
                  onClick={() => handleSelectMode("multi_day")}
                  className={`text-start px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors duration-100 ${
                    mode === "multi_day"
                      ? "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--accent-bg)] shadow-sm ring-1 ring-[var(--accent-bg)]/25"
                      : "bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-surface)]/60 hover:text-[var(--text-primary)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${
                          mode === "multi_day"
                            ? "bg-[var(--accent-bg)]/15 text-[var(--accent-bg)]"
                            : "bg-[var(--bg-subtle)] text-[var(--text-muted)]"
                        }`}
                      >
                        {/* Calendar with a leaf */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4">
                          <rect x="3" y="5" width="18" height="16" rx="2" />
                          <path d="M3 10h18M8 3v4M16 3v4M10 18c0-3 2-5 5-5 0 3-2 5-5 5zM10 18l2.5-2.5" />
                        </svg>
                      </div>
                      <span className={`text-sm font-bold ${mode === "multi_day" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                        {t.tabMultiTitle}
                      </span>
                    </div>
                    {mode === "multi_day" ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {language === "tr" ? "SEÇİLİ" : "ACTIVE"}
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-muted)] shrink-0">
                        {t.daysShortFormat.replace("{n}", "2–7")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1 ps-9.5">
                    {t.tabMultiSubtitle}
                  </p>
                </button>
              </div>
            </section>

            {/* Active Workspace Form Card */}
            <section
              id="workspace-panel"
              role="tabpanel"
              aria-labelledby={`tab-${mode}`}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 transition-colors duration-200">
              {/* Scenario Presets Row */}
              <div className="mb-6">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                    {t.presetsHeading}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {t.presetsHint}
                  </span>
                </div>

                {mode === "single" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {t.singlePresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleApplySinglePreset(preset)}
                        className="text-start p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-1.5 mb-1">
                          <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                            <span aria-hidden="true" className="me-1.5">
                              {presetEmoji(preset.id)}
                            </span>
                            {preset.label}
                          </span>
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] shrink-0">
                            {preset.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                          {preset.ingredients}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {t.multiDayPresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleApplyMultiPreset(preset)}
                        className="text-start p-3.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-semibold text-[var(--text-primary)]">
                            <span aria-hidden="true" className="me-1.5">
                              {presetEmoji(preset.id)}
                            </span>
                            {preset.label}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] shrink-0">
                            {preset.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                          {preset.ingredients}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Inputs */}
              <form
                onSubmit={handleSubmit}
                aria-busy={loading}
                className="space-y-6"
              >
                {/* Multi-Day 2–7 Day Horizon Selector (Only in Multi-Day Mode) */}
                {mode === "multi_day" && (
                  <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 sm:p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <label
                          htmlFor="target-days-range"
                          className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]"
                        >
                          {t.targetDaysLabel}
                        </label>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {t.targetDaysHelper}
                        </p>
                      </div>

                      {/* Segmented 2–7 Day Pills */}
                      <div
                        role="group"
                        aria-label={t.targetDaysLabel}
                        className="inline-flex items-center p-0.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] self-start sm:self-auto"
                      >
                        {DAY_OPTIONS.map((dayNum) => (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => setTargetDays(dayNum)}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                              targetDays === dayNum
                                ? "bg-[var(--accent-bg)] text-[var(--accent-text)]"
                                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                          >
                            {t.daysShortFormat.replace("{n}", String(dayNum))}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Synchronized Range Slider */}
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs font-medium text-[var(--text-muted)]">
                        2 {t.targetDaysUnit}
                      </span>
                      <input
                        id="target-days-range"
                        type="range"
                        min={2}
                        max={7}
                        step={1}
                        value={targetDays}
                        onChange={(e) => setTargetDays(Number(e.target.value))}
                        className="w-full accent-[var(--text-primary)] cursor-pointer h-1.5 rounded-lg"
                      />
                      <span className="text-xs font-semibold text-[var(--text-primary)] shrink-0">
                        {targetDays} {t.targetDaysUnit}
                      </span>
                    </div>
                  </div>
                )}

                {/* Ingredients Textarea */}
                <div>
                  <label
                    htmlFor="kitchen-ingredients"
                    className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                  >
                    {mode === "single"
                      ? t.singleIngredientsLabel
                      : t.multiIngredientsLabel}
                  </label>
                  <textarea
                    id="kitchen-ingredients"
                    rows={3}
                    maxLength={1800}
                    value={
                      mode === "single" ? singleIngredients : multiIngredients
                    }
                    onChange={(e) =>
                      mode === "single"
                        ? setSingleIngredients(e.target.value)
                        : setMultiIngredients(e.target.value)
                    }
                    placeholder={
                      mode === "single"
                        ? t.singleIngredientsPlaceholder
                        : t.multiIngredientsPlaceholder
                    }
                    className="w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:bg-[var(--bg-surface)] focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Parameters Row: Servings, Max Cooking Time, Dietary Restrictions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                  {/* Household Size */}
                  <div className="flex flex-col justify-between">
                    <label
                      htmlFor="servings-select"
                      className="block text-xs font-semibold uppercase tracking-wider leading-snug text-[var(--text-secondary)] mb-2"
                    >
                      {t.servingsLabel}
                    </label>
                    <select
                      id="servings-select"
                      value={mode === "single" ? singleServings : multiServings}
                      onChange={(e) =>
                        mode === "single"
                          ? setSingleServings(e.target.value)
                          : setMultiServings(e.target.value)
                      }
                      className="w-full h-10 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 text-sm text-[var(--text-primary)] focus:border-[var(--border-strong)] focus:bg-[var(--bg-surface)] focus:outline-none transition-colors"
                    >
                      <option value="1 person">{t.servingsOptions.one}</option>
                      <option value="2 people">{t.servingsOptions.two}</option>
                      <option value="4+ people">
                        {t.servingsOptions.fourPlus}
                      </option>
                    </select>
                  </div>

                  {/* Max Cooking Time */}
                  <div className="flex flex-col justify-between">
                    <label
                      htmlFor="max-time-select"
                      className="block text-xs font-semibold uppercase tracking-wider leading-snug text-[var(--text-secondary)] mb-2"
                    >
                      {t.maxTimeLabel}
                    </label>
                    <select
                      id="max-time-select"
                      value={mode === "single" ? singleMaxTime : multiMaxTime}
                      onChange={(e) =>
                        mode === "single"
                          ? setSingleMaxTime(e.target.value)
                          : setMultiMaxTime(e.target.value)
                      }
                      className="w-full h-10 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 text-sm text-[var(--text-primary)] focus:border-[var(--border-strong)] focus:bg-[var(--bg-surface)] focus:outline-none transition-colors"
                    >
                      <option value="15 mins">{t.maxTimeOptions.fifteen}</option>
                      <option value="30 mins">{t.maxTimeOptions.thirty}</option>
                      <option value="45 mins">{t.maxTimeOptions.fortyFive}</option>
                    </select>
                  </div>

                  {/* Dietary Notes / Allergies */}
                  <div className="flex flex-col justify-between">
                    <label
                      htmlFor="dietary-input"
                      className="block text-xs font-semibold uppercase tracking-wider leading-snug text-[var(--text-secondary)] mb-2"
                    >
                      {t.dietaryLabel}{" "}
                      <span className="font-normal lowercase text-[var(--text-muted)]">
                        {t.optionalTag}
                      </span>
                    </label>
                    <input
                      id="dietary-input"
                      type="text"
                      maxLength={400}
                      value={mode === "single" ? singleDietary : multiDietary}
                      onChange={(e) =>
                        mode === "single"
                          ? setSingleDietary(e.target.value)
                          : setMultiDietary(e.target.value)
                      }
                      placeholder={t.dietaryPlaceholder}
                      className="w-full h-10 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:bg-[var(--bg-surface)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Submit Bar */}
                <div className="pt-2 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[var(--text-muted)]">
                    {t.pantryAssumptionNote}
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow inline-flex items-center justify-center gap-2.5 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] hover:opacity-90 disabled:opacity-50 font-medium text-sm px-6 py-2.5 transition-opacity cursor-pointer disabled:cursor-not-allowed shrink-0"
                  >
                    {loading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>
                          {mode === "single"
                            ? t.loadingSingleText
                            : t.loadingMultiText}
                        </span>
                      </>
                    ) : (
                      <>
                        <Sparkle className="w-3.5 h-3.5" />
                        <span>
                          {mode === "single"
                            ? t.submitSingleBtn
                            : `${t.submitMultiBtn} (${t.daysShortFormat.replace("{n}", String(targetDays))})`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </section>

            {/* Live Results & Error Region */}
            <div
              ref={resultsRef}
              aria-live="polite"
              className="space-y-8 scroll-mt-24"
            >
              {/* Error Boundary Banner */}
              {error && (
                <section
                  role="alert"
                  className="rounded-xl border border-red-500/60 bg-red-500/10 p-5 text-[var(--text-primary)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      !
                    </span>
                    <div className="space-y-1">
                      <h2 className="text-sm font-semibold">{t.errorTitle}</h2>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {error}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Workspace-Specific Output Display */}
              {mode === "single" && singleResult && (
                <SingleMealResults result={singleResult} t={t} />
              )}

              {mode === "multi_day" && multiResult && (
                <MultiDayResults result={multiResult} t={t} />
              )}
            </div>
          </div>

          <SidePanel t={t} />
        </div>
      </main>

      {/* Quiet, Persistent Food Safety & Hygiene Footer */}
      <footer className="mt-16 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-colors duration-200">
        {/* All 17 SDGs, with our goals (12 & 13) highlighted */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              {t.sdgGoalsHeading}
            </h2>
            <p className="text-xs text-[var(--text-muted)]">{t.sdgGoalsText}</p>
          </div>
          <ul className="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-[repeat(17,minmax(0,1fr))] gap-1.5">
            {SDG_GOALS.map((goal) => {
              const isOurGoal = goal === 12 || goal === 13;
              const label = goal === 12 ? t.sdgBadge12 : goal === 13 ? t.sdgBadge13 : "";
              return (
                <li key={goal}>
                  <Image
                    src={`/brand/sdg/sdg-${String(goal).padStart(2, "0")}.png`}
                    alt={label}
                    title={isOurGoal ? label : `SDG ${goal}`}
                    width={64}
                    height={64}
                    className={`w-full h-auto rounded-sm transition-all duration-200 ${
                      isOurGoal
                        ? "ring-2 ring-[var(--accent-bg)] ring-offset-2 ring-offset-[var(--bg-surface)]"
                        : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div aria-hidden="true" className="sdg-stripe h-1" />
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex items-start sm:items-center gap-3 max-w-3xl">
            <span className="font-semibold text-[11px] uppercase tracking-wider px-2 py-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] shrink-0">
              {t.footerDisclaimerBadge}
            </span>
            <p className="leading-relaxed">{t.footerDisclaimerText}</p>
          </div>
          <span className="text-[11px] font-medium text-[var(--text-secondary)] shrink-0">
            {t.footerMeta}
          </span>
        </div>

        {/* Samsung Innovation Campus, UNDP & SDG Partnership Strip */}
        <div className="border-t border-[var(--border-hairline)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* White plate keeps the official logos unaltered and legible in dark mode */}
            <div className="flex flex-wrap items-center gap-4 rounded-md bg-white px-3 py-2 shrink-0">
              <Image
                src="/brand/samsung-logo.svg"
                alt={t.samsungLogoAlt}
                width={131}
                height={20}
                className="h-5 w-auto"
              />
              <Image
                src="/brand/undp-logo.svg"
                alt={t.undpLogoAlt}
                width={24}
                height={48}
                className="h-12 w-auto"
              />
              <Image
                src="/brand/sdg-logo-horizontal.png"
                alt={t.sdgLogoAlt}
                width={176}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {t.footerSupportText}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
