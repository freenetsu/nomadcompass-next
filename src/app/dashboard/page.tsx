"use client";

import Link from "next/link";
import { ArrowLeft, Globe, TrendingUp, Target } from "lucide-react";
import { useRecommendations } from "@/hooks/useRecommendations";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { ComparisonChart } from "@/components/dashboard/ComparisonChart";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

export default function DashboardPage() {
  const { recommendations, isLoading, error } = useRecommendations();

  // État de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-2 h-4 w-48" />
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
          <div className="mb-8">
            <Skeleton className="mb-6 h-7 w-48" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/10">
              <Globe className="h-8 w-8 text-error-500" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
              Erreur lors du chargement
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{error}</p>
            {error.includes("questionnaire") ? (
              <Link
                href="/questionnaire"
                className="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                Remplir le questionnaire
              </Link>
            ) : (
              <Link
                href="/"
                className="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                Retour à l&apos;accueil
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Pas de recommandations
  if (!recommendations || recommendations.recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md text-center">
            <Globe className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
              Aucune recommandation disponible
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Veuillez compléter le questionnaire pour recevoir des
              recommandations personnalisées.
            </p>
            <Link
              href="/questionnaire"
              className="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
            >
              Commencer le questionnaire
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { recommendations: countries, analysis } = recommendations;
  const topCountry = countries[0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Retour</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Vos Recommandations
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {countries.length} pays analysés selon votre profil
                </p>
              </div>
            </div>
            <Link
              href="/questionnaire"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-white/80 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Refaire le questionnaire
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistiques */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {/* Meilleure recommandation */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/15">
              <Target className="h-6 w-6 text-brand-500" />
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Meilleure recommandation
              </span>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl">{topCountry.flag}</span>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white/90">
                  {topCountry.countryName}
                </h4>
              </div>
              <Badge color="success" className="mt-2">
                {topCountry.matchPercentage}% match
              </Badge>
            </div>
          </div>

          {/* Score moyen */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-50 dark:bg-success-500/15">
              <TrendingUp className="h-6 w-6 text-success-500" />
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Score moyen
              </span>
              <h4 className="mt-2 text-lg font-bold text-gray-800 dark:text-white/90">
                {Math.round(
                  countries.reduce((sum, c) => sum + c.overallScore, 0) /
                    countries.length,
                )}
                /100
              </h4>
            </div>
          </div>

          {/* Budget */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning-50 dark:bg-warning-500/15">
              <Globe className="h-6 w-6 text-warning-500" />
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Catégorie budget
              </span>
              <h4 className="mt-2 text-lg font-bold capitalize text-gray-800 dark:text-white/90">
                {analysis.budgetCategory}
              </h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                {analysis.climatePreference}
              </p>
            </div>
          </div>
        </div>

        {/* Graphique de comparaison */}
        {countries.length >= 2 && (
          <Card
            title="Comparaison des Top 3"
            desc="Comparez les scores des meilleurs pays sur différents critères"
            className="mb-8"
          >
            <ComparisonChart recommendations={countries} maxCountries={3} />
          </Card>
        )}

        {/* Vos priorités */}
        <Card title="Vos priorités principales" className="mb-8">
          <div className="flex flex-wrap gap-2">
            {analysis.topPriorities.map((priority, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {priority.name}
                </span>
                <Badge color="primary" size="sm">
                  {priority.score}/5
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Liste des recommandations */}
        <div className="mb-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Tous les pays recommandés
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {countries.map((country, index) => (
              <RecommendationCard
                key={country.countryId}
                recommendation={country}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
