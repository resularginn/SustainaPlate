"use client";

import React from "react";
import type { MultiDayPlanResponse, TranslationDictionary } from "@/app/types";

interface MultiDayResultsProps {
  result: MultiDayPlanResponse;
  t: TranslationDictionary;
}

export function MultiDayResults({ result, t }: MultiDayResultsProps) {
  const hasAnyValidDay = result.daily_plans.some(
    (dayPlan) => Array.isArray(dayPlan.steps) && dayPlan.steps.length > 0
  );

  return (
    <section className="space-y-6">
      {/* Dedicated Food Safety Warning Banner */}
      {result.safety_alert ? (
        <div
          role="alert"
          className="rounded-xl border border-red-500/70 bg-red-500/10 p-5 text-[var(--text-primary)]"
        >
          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              !
            </span>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white">
                  {t.safetyAlertBadge}
                </span>
                <h3 className="text-sm font-semibold">{t.safetyAlertTitle}</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {result.safety_message}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-5 py-4 flex items-start gap-3">
          <span className="w-5 h-5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text-primary)] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
            ✓
          </span>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <strong className="font-semibold text-[var(--text-primary)]">
              {t.safetyPassedPrefix}{" "}
            </strong>
            {result.safety_message}
          </p>
        </div>
      )}

      {/* Multi-Day Summary Header Card */}
      {hasAnyValidDay ? (
        <>
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
                {t.multiResultHeader}
              </p>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-1">
                {result.daily_plans.length} {t.targetDaysUnit} ·{" "}
                {t.prioritizedItemsLabel}
              </h2>
            </div>
            {Array.isArray(result.prioritized_items) &&
              result.prioritized_items.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {result.prioritized_items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2.5 py-1 rounded border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text-primary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
          </div>

          {/* Sequential Day-by-Day Timeline Cards */}
          <div className="space-y-4">
            {result.daily_plans.map((dayPlan) => (
              <article
                key={dayPlan.day}
                className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden transition-colors duration-200"
              >
                {/* Day Header */}
                <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[var(--accent-bg)] text-[var(--accent-text)] text-xs font-semibold">
                      {t.dayLabelFormat.replace("{n}", String(dayPlan.day))}
                    </span>
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      {dayPlan.title}
                    </h3>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] self-start sm:self-auto">
                    {t.prepTimePrefix} {dayPlan.prep_time}
                  </span>
                </div>

                <div className="p-6 space-y-5">
                  {/* Spoilage Rationale */}
                  {dayPlan.spoilage_rationale && (
                    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-4 py-3 text-xs text-[var(--text-secondary)]">
                      <strong className="font-semibold text-[var(--text-primary)]">
                        {t.spoilageScheduleNote}:{" "}
                      </strong>
                      {dayPlan.spoilage_rationale}
                    </div>
                  )}

                  {/* Day Ingredients */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        {t.usedIngredientsLabel} (
                        {dayPlan.used_user_ingredients.length})
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {dayPlan.used_user_ingredients.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        {t.pantryStaplesLabel} (
                        {dayPlan.assumed_pantry_staples.length})
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {dayPlan.assumed_pantry_staples.length > 0 ? (
                          dayPlan.assumed_pantry_staples.map((staple, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2.5 py-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                            >
                              {staple}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[var(--text-muted)]">
                            {t.noExtraStaples}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Day Steps */}
                  <div>
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                      {t.stepsHeading}
                    </h4>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {dayPlan.steps.slice(0, 4).map((step, idx) => (
                        <li
                          key={idx}
                          className="p-3.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
            {t.multiResultHeader}
          </p>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-1">
            {result.daily_plans[0]?.title || t.safetyAlertBadge}
          </h2>
          {result.daily_plans[0]?.spoilage_rationale && (
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
              {result.daily_plans[0].spoilage_rationale}
            </p>
          )}
        </div>
      )}

      {/* Cumulative SDG 12.3 & SDG 13 Impact Assessment Card */}
      <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
              {t.sdgImpactBadge}
            </p>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mt-0.5">
              {t.sdgImpactTitle}
            </h3>
          </div>
          {result.self_check_passed && hasAnyValidDay && (
            <span className="text-xs font-medium px-2.5 py-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] self-start sm:self-auto">
              ✓ {t.verifiedStaplesBadge}
            </span>
          )}
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {result.sdg_impact_note}
        </p>
        <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
          <span>{t.sdgTarget12Note}</span>
          <span>{t.sdgTarget13Note}</span>
        </div>
      </div>
    </section>
  );
}
