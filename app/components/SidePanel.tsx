"use client";

import React from "react";
import type { TranslationDictionary } from "@/app/types";

interface SidePanelProps {
  t: TranslationDictionary;
}

export function SidePanel({ t }: SidePanelProps) {
  return (
    <aside
      aria-label={t.asideLabel}
      className="space-y-4 lg:sticky lg:top-24"
    >
      {/* How It Works */}
      <section className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
          {t.asideHowTitle}
        </h2>
        <ol className="space-y-3">
          {t.asideHowSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] text-xs font-semibold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-sm text-[var(--text-primary)] leading-snug pt-0.5">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Food-Saving Tips */}
      <section className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
          {t.asideTipsTitle}
        </h2>
        <ul className="space-y-2.5">
          {t.asideTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="text-base leading-5 shrink-0">
                {tip.emoji}
              </span>
              <p className="text-sm text-[var(--text-secondary)] leading-snug">
                {tip.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* SDG 12.3 & 13 Impact (UNEP figures) */}
      <section className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
        <div aria-hidden="true" className="sdg-stripe h-1" />
        <div className="p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
            {t.asideImpactTitle}
          </h2>
          <ul className="space-y-3">
            {t.asideImpactStats.map((stat, idx) => (
              <li key={idx}>
                <span className="block text-xl font-bold tracking-tight text-[var(--accent-bg)]">
                  {stat.value}
                </span>
                <span className="block text-xs text-[var(--text-secondary)] leading-snug">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 pt-3 border-t border-[var(--border-hairline)] text-[11px] text-[var(--text-muted)]">
            {t.asideImpactSource}
          </p>
        </div>
      </section>
    </aside>
  );
}
