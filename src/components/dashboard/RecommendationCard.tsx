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
  Info,
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
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm transition-all hover:shadow-theme-md">
      {/* Header avec drapeau et nom */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white text-3xl">
            {flag}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900">
                {countryName}
              </h3>
              <Badge color="light" size="sm">
                #{rank}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-900">
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
            <span className="text-sm text-gray-900">
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
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3">
          <DollarSign className="mb-1 h-4 w-4 text-gray-900" />
          <span className="text-xs text-gray-900">
            Budget
          </span>
          <span className="mt-1 font-semibold text-gray-900">
            {scores.budget}
          </span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3">
          <Thermometer className="mb-1 h-4 w-4 text-gray-900" />
          <span className="text-xs text-gray-900">
            Climat
          </span>
          <span className="mt-1 font-semibold text-gray-900">
            {scores.climate}
          </span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3">
          <Shield className="mb-1 h-4 w-4 text-gray-900" />
          <span className="text-xs text-gray-900">
            Sécurité
          </span>
          <span className="mt-1 font-semibold text-gray-900">
            {scores.safety}
          </span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3">
          <Heart className="mb-1 h-4 w-4 text-gray-900" />
          <span className="text-xs text-gray-900">
            Santé
          </span>
          <span className="mt-1 font-semibold text-gray-900">
            {scores.healthcare}
          </span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-3">
          <TrendingUp className="mb-1 h-4 w-4 text-gray-900" />
          <span className="text-xs text-gray-900">Vie</span>
          <span className="mt-1 font-semibold text-gray-900">
            {scores.lifestyle}
          </span>
        </div>
      </div>

      {/* Explication des scores */}
      <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
          <div className="text-xs text-blue-900">
            <span className="font-medium">Scores personnalisés :</span> Ces notes sur 100 sont calculées selon vos priorités.
            Budget compare le coût de vie avec votre budget, Climat évalue la météo selon vos préférences,
            et les autres scores combinent des données réelles (sécurité, santé) avec vos besoins.
          </div>
        </div>
      </div>

      {/* Résumé */}
      <div className="mt-6">
        <p className="text-sm leading-relaxed text-gray-900">
          {summary}
        </p>
      </div>

      {/* Points forts */}
      <div className="mt-6">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <CheckCircle className="h-4 w-4 text-success-500" />
          Points forts
        </h4>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-gray-900"
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
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <AlertCircle className="h-4 w-4 text-warning-500" />
            Points d&apos;attention
          </h4>
          <ul className="space-y-2">
            {weaknesses.map((weakness, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-900"
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
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          Comparer
        </button>
      </div>
    </div>
  );
}
