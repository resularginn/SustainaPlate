"use client";

import React from "react";
import Image from "next/image";
import {
  LANGUAGE_OPTIONS,
  type Language,
  type ThemeMode,
  type TranslationDictionary,
} from "@/app/types";

interface HeaderProps {
  t: TranslationDictionary;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Header({
  t,
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-hairline)] bg-[var(--bg-surface)]/90 backdrop-blur-md transition-colors duration-200">
      {/* 17-colour SDG stripe */}
      <div aria-hidden="true" className="sdg-stripe h-1" />
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity & SDG Badges */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Official UNDP logo (kept unaltered on a white plate so it stays legible in dark mode) */}
            <span className="shrink-0 rounded-sm bg-white p-0.5">
              <Image
                src="/brand/undp-logo.svg"
                alt={t.undpLogoAlt}
                width={20}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </span>
            <div className="truncate">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
                  {t.brandName}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] truncate hidden sm:block">
                {t.brandSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Language Dropdown & Animated Light/Dark Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language dropdown: 6 UN languages + Turkish, each in its own script */}
          <label className="relative inline-flex items-center">
            <span className="sr-only">{t.languageSwitcherLabel}</span>
            {/* Globe icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="pointer-events-none absolute start-2.5 w-3.5 h-3.5 text-[var(--text-muted)]"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9s1.3-6.3 3.8-9z" />
            </svg>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="appearance-none ps-8 pe-3 py-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)] text-xs font-medium text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.code} value={option.code} lang={option.code}>
                  {option.nativeName}
                </option>
              ))}
            </select>
          </label>

          {/* Animated Light / Dark Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={t.themeToggleLabel}
            className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)] text-xs font-medium text-[var(--text-primary)] transition-all duration-200 cursor-pointer"
          >
            <span className="relative flex items-center justify-center w-4 h-4">
              {/* Sun Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`w-3.5 h-3.5 absolute transition-all duration-300 ${
                  theme === "light"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              {/* Moon Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`w-3.5 h-3.5 absolute transition-all duration-300 ${
                  theme === "dark"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-50"
                }`}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
            <span className="hidden sm:inline">
              {theme === "light" ? t.themeLight : t.themeDark}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
