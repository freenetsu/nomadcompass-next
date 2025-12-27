"use client";

import Link from "next/link";
import { Badge } from "@/components/ui";
import type { CountryRecommendation } from "@/types/recommendations";
import {
  CheckCircle,
  AlertCircle,
  DollarSign,
  Thermometer,
  Shield,
  Heart,
  TrendingUp,
} from "lucide-react";

interface RecommendationCardProps {
  recommendation: CountryRecommendation;
  rank: number;
}

export function RecommendationCard({
  recommendation,
  rank,
}: RecommendationCardProps) {
  const {
    countryName,
    flag,
    overallScore,
    matchPercentage,
    strengths,
    weaknesses,
    summary,
    scores,
  } = recommendation;

  // Déterminer la couleur du badge de score
  const getScoreColor = (score: number): "success" | "warning" | "error" => {
    if (score >= 75) return "success";
    if (score >= 50) return "warning";
    return "error";
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm transition-all hover:shadow-theme-md dark:border-gray-700 dark:bg-gray-800/80">
      {/* Header avec drapeau et nom */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white text-3xl dark:border-gray-600 dark:bg-gray-700">
            {flag}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {countryName}
              </h3>
              <Badge color="light" size="sm">
                #{rank}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {matchPercentage}% de correspondance
            </p>
          </div>
        </div>

        {/* Score global */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-1">
            <span className="text-2xl font-bold text-brand-500">
              {overallScore}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              /100
            </span>
          </div>
          <Badge color={getScoreColor(overallScore)} size="sm">
            {overallScore >= 75
              ? "Excellent"
              : overallScore >= 50
                ? "Bon"
                : "Moyen"}
          </Badge>
        </div>
      </div>

      {/* Scores détaillés */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-700/60">
          <DollarSign className="mb-1 h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="text-xs text-gray-600 dark:text-gray-300">
            Budget
          </span>
          <span className="mt-1 font-semibold text-gray-900 dark:text-white">
            {scores.budget}
          </span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-700/60">
          <Thermometer className="mb-1 h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="text-xs text-gray-600 dark:text-gray-300">
            Climat
          </span>
          <span className="mt-1 font-semibold text-gray-900 dark:text-white">
            {scores.climate}
          </span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-700/60">
          <Shield className="mb-1 h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="text-xs text-gray-600 dark:text-gray-300">
            Sécurité
          </span>
          <span className="mt-1 font-semibold text-gray-900 dark:text-white">
            {scores.safety}
          </span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-700/60">
          <Heart className="mb-1 h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="text-xs text-gray-600 dark:text-gray-300">
            Santé
          </span>
          <span className="mt-1 font-semibold text-gray-900 dark:text-white">
            {scores.healthcare}
          </span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-700/60">
          <TrendingUp className="mb-1 h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="text-xs text-gray-600 dark:text-gray-300">Vie</span>
          <span className="mt-1 font-semibold text-gray-900 dark:text-white">
            {scores.lifestyle}
          </span>
        </div>
      </div>

      {/* Résumé */}
      <div className="mt-6">
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {summary}
        </p>
      </div>

      {/* Points forts */}
      <div className="mt-6">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
          <CheckCircle className="h-4 w-4 text-success-500" />
          Points forts
        </h4>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Points faibles */}
      {weaknesses && weaknesses.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <AlertCircle className="h-4 w-4 text-warning-500" />
            Points d&apos;attention
          </h4>
          <ul className="space-y-2">
            {weaknesses.map((weakness, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Link
          href={`/countries/${recommendation.countryId}`}
          className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          Voir les détails
        </Link>
        <button
          type="button"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Comparer
        </button>
      </div>
    </div>
  );
}
