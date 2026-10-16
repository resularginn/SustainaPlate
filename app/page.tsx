"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";
import { SingleMealResults } from "@/app/components/SingleMealResults";
import { MultiDayResults } from "@/app/components/MultiDayResults";
import {
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

export default function ZeroWasteChefPage() {
  // Theme & Localization state (Defaults: Light mode, English)
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [language, setLanguage] = useState<Language>("en");

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

  const t = TRANSLATIONS[language];

  // Synchronize root `.dark` class for smooth CSS transitions
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLanguageChange = (nextLang: Language) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const activeIngredients =
      mode === "single" ? singleIngredients : multiIngredients;

    if (!activeIngredients.trim()) {
      setError(t.emptyIngredientsError);
      return;
    }

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
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.error ||
            `Request failed (${response.status}). Please verify your configuration.`
        );
        return;
      }

      if (mode === "single") {
        setSingleResult(data as SingleMealResponse);
      } else {
        setMultiResult(data as MultiDayPlanResponse);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Network error occurred while contacting the server."
      );
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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Minimalist Editorial Intro */}
        <section className="space-y-2.5 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            {t.heroEyebrow}
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] leading-snug">
            {t.heroTitle}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {t.heroDescription}
          </p>
        </section>

        {/* Two-Segment Workspace Navigation Control */}
        <section aria-label="Workspace selector">
          <div
            role="tablist"
            className="grid grid-cols-1 sm:grid-cols-2 p-1 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-pill)] gap-1 transition-colors duration-200"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "single"}
              onClick={() => {
                setMode("single");
                setError(null);
              }}
              className={`text-left px-4 py-3 rounded-lg transition-all duration-150 cursor-pointer ${
                mode === "single"
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-hairline)] shadow-2xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{t.tabSingleTitle}</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                  01
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {t.tabSingleSubtitle}
              </p>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={mode === "multi_day"}
              onClick={() => {
                setMode("multi_day");
                setError(null);
              }}
              className={`text-left px-4 py-3 rounded-lg transition-all duration-150 cursor-pointer ${
                mode === "multi_day"
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-hairline)] shadow-2xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{t.tabMultiTitle}</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                  2–7d
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {t.tabMultiSubtitle}
              </p>
            </button>
          </div>
        </section>

        {/* Active Workspace Form Card */}
        <section className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 transition-colors duration-200">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {t.singlePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplySinglePreset(preset)}
                    className="text-left p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
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
                    className="text-left p-3.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                        {dayNum}d
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Household Size */}
              <div>
                <label
                  htmlFor="servings-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
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
                  className="w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--border-strong)] focus:bg-[var(--bg-surface)] focus:outline-none transition-colors"
                >
                  <option value="1 person">{t.servingsOptions.one}</option>
                  <option value="2 people">{t.servingsOptions.two}</option>
                  <option value="4+ people">
                    {t.servingsOptions.fourPlus}
                  </option>
                </select>
              </div>

              {/* Max Cooking Time */}
              <div>
                <label
                  htmlFor="max-time-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
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
                  className="w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--border-strong)] focus:bg-[var(--bg-surface)] focus:outline-none transition-colors"
                >
                  <option value="15 mins">{t.maxTimeOptions.fifteen}</option>
                  <option value="30 mins">{t.maxTimeOptions.thirty}</option>
                  <option value="45 mins">{t.maxTimeOptions.fortyFive}</option>
                </select>
              </div>

              {/* Dietary Notes / Allergies */}
              <div>
                <label
                  htmlFor="dietary-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                >
                  {t.dietaryLabel}{" "}
                  <span className="font-normal lowercase text-[var(--text-muted)]">
                    {t.optionalTag}
                  </span>
                </label>
                <input
                  id="dietary-input"
                  type="text"
                  value={mode === "single" ? singleDietary : multiDietary}
                  onChange={(e) =>
                    mode === "single"
                      ? setSingleDietary(e.target.value)
                      : setMultiDietary(e.target.value)
                  }
                  placeholder={t.dietaryPlaceholder}
                  className="w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:bg-[var(--bg-surface)] focus:outline-none transition-colors"
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
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] hover:opacity-90 disabled:opacity-50 font-medium text-sm px-6 py-2.5 transition-opacity cursor-pointer disabled:cursor-not-allowed shrink-0"
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
                  <span>
                    {mode === "single"
                      ? t.submitSingleBtn
                      : `${t.submitMultiBtn} (${targetDays}d)`}
                  </span>
                )}
              </button>
            </div>
          </form>
        </section>

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
      </main>

      {/* Quiet, Persistent Food Safety & Hygiene Footer */}
      <footer className="mt-16 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
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
      </footer>
    </div>
  );
}
