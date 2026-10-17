"use client";

import React from "react";
import type { SingleMealResponse, TranslationDictionary } from "@/app/types";

interface SingleMealResultsProps {
  result: SingleMealResponse;
  t: TranslationDictionary;
}

export function SingleMealResults({ result, t }: SingleMealResultsProps) {
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

      {/* Main Recipe Card (Only show full recipe body when safe edible steps exist) */}
      {result.main_recipe.steps.length > 0 ? (
        <article className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden transition-colors duration-200">
          {/* Recipe Header */}
          <div className="border-b border-[var(--border-hairline)] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
                {t.singleResultHeader}
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] mt-1">
                {result.main_recipe.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium px-3 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)]">
                {t.prepTimePrefix} {result.main_recipe.prep_time}
              </span>
              {result.self_check_passed && (
                <span className="text-xs font-medium px-3 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]">
                  ✓ {t.verifiedStaplesBadge}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Prioritized High-Risk Perishables */}
            {Array.isArray(result.prioritized_items) &&
              result.prioritized_items.length > 0 && (
                <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                    {t.prioritizedItemsLabel}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.prioritized_items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-2.5 py-0.5 rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Used Ingredients vs Assumed Pantry Staples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  {t.usedIngredientsLabel} (
                  {result.main_recipe.used_user_ingredients.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {result.main_recipe.used_user_ingredients.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                  {t.pantryStaplesLabel} (
                  {result.main_recipe.assumed_pantry_staples.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {result.main_recipe.assumed_pantry_staples.length > 0 ? (
                    result.main_recipe.assumed_pantry_staples.map(
                      (staple, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                        >
                          {staple}
                        </span>
                      )
                    )
                  ) : (
                    <span className="text-xs text-[var(--text-muted)]">
                      {t.noExtraStaples}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 4 Clear Steps */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                {t.stepsHeading} ({result.main_recipe.steps.length})
              </h3>
              <ol className="divide-y divide-[var(--border-hairline)] rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
                {result.main_recipe.steps.slice(0, 4).map((step, index) => (
                  <li key={index} className="p-4 flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-md bg-[var(--accent-bg)] text-[var(--accent-text)] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </article>
      ) : (
        <article className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-6 py-5 transition-colors duration-200">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
            {t.singleResultHeader}
          </p>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] mt-1">
            {result.main_recipe.title}
          </h2>
        </article>
      )}

      {/* Bottom Grid: Alternative Idea + SDG Impact Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
              {t.alternativeIdeaBadge}
            </p>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              {t.alternativeIdeaTitle}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {result.alternative_idea}
            </p>
          </div>
          <p className="mt-4 pt-3 border-t border-[var(--border-hairline)] text-xs text-[var(--text-muted)]">
            {t.alternativeIdeaFooter}
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
              {t.sdgImpactBadge}
            </p>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              {t.sdgImpactTitle}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {result.sdg_impact_note}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
            <span>{t.sdgTarget12Note}</span>
            <span>{t.sdgTarget13Note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
