"use client";

import React from "react";
import type {
  Language,
  ThemeMode,
  TranslationDictionary,
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
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity & SDG Badges */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg border border-[var(--border-strong)] bg-[var(--accent-bg)] text-[var(--accent-text)] flex items-center justify-center font-semibold text-xs tracking-tight shrink-0 transition-colors duration-200">
              ZW
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
                  {t.brandName}
                </span>
                <span className="hidden md:inline-block text-[11px] font-medium px-2 py-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]">
                  {t.sdgBadge12}
                </span>
                <span className="hidden lg:inline-block text-[11px] font-medium px-2 py-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]">
                  {t.sdgBadge13}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] truncate hidden sm:block">
                {t.brandSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right: EN | TR Language Switch & Animated Light/Dark Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Instant EN | TR Segmented Switch */}
          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center p-0.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-xs font-medium"
          >
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer ${
                language === "en"
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs border border-[var(--border-hairline)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("tr")}
              className={`px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer ${
                language === "tr"
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs border border-[var(--border-hairline)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              TR
            </button>
          </div>

          {/* Animated Light / Dark Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle Light or Dark theme"
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
