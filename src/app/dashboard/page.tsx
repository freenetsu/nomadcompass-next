"use client";

import Link from "next/link";
import { ArrowLeft, Globe, TrendingUp, Target, Info, HelpCircle } from "lucide-react";
import { useRecommendations } from "@/hooks/useRecommendations";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { ComparisonChart } from "@/components/dashboard/ComparisonChart";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";
import { useState } from "react";

export default function DashboardPage() {
  const { recommendations, isLoading, error } = useRecommendations();
  const [showHelp, setShowHelp] = useState(false);

  // État de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-ocean-50">
        <header className="border-b border-ocean-200 bg-white shadow-sm">
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
      <div className="min-h-screen bg-ocean-50">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral-50">
              <Globe className="h-8 w-8 text-coral-500" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              Erreur lors du chargement
            </h2>
            <p className="mt-2 text-gray-900">{error}</p>
            {error.includes("questionnaire") ? (
              <Link
                href="/questionnaire"
                className="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                Remplir le questionnaire
              </Link>
            ) : (
              <Link
                href="/home"
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
      <div className="min-h-screen bg-ocean-50">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md text-center">
            <Globe className="mx-auto h-16 w-16 text-gray-900" />
            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              Aucune recommandation disponible
            </h2>
            <p className="mt-2 text-gray-900">
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
    <div className="min-h-screen bg-ocean-50">
      {/* Header */}
      <header className="border-b border-ocean-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/home"
                className="flex items-center gap-2 text-gray-900 hover:text-brand-500"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Retour</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Vos Recommandations
                </h1>
                <p className="mt-1 text-sm text-gray-900">
                  Top 10 sur {countries.length} pays analysés selon votre profil
                </p>
              </div>
            </div>
            <Link
              href="/questionnaire"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
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
          <div className="rounded-xl border border-ocean-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-900">
                Meilleure recommandation
              </span>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl">{topCountry.flag}</span>
                <h4 className="text-lg font-bold text-gray-900">
                  {topCountry.countryName}
                </h4>
              </div>
              <Badge color="success" className="mt-2">
                {topCountry.matchPercentage}% match
              </Badge>
            </div>
          </div>

          {/* Score moyen */}
          <div className="rounded-xl border border-ocean-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-900">
                Score moyen
              </span>
              <h4 className="mt-2 text-lg font-bold text-gray-900">
                {Math.round(
                  countries.reduce((sum, c) => sum + c.overallScore, 0) /
                    countries.length,
                )}
                /100
              </h4>
            </div>
          </div>

          {/* Budget */}
          <div className="rounded-xl border border-ocean-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-900">
                Catégorie budget
              </span>
              <h4 className="mt-2 text-lg font-bold capitalize text-gray-900">
                {analysis.budgetCategory}
              </h4>
              <p className="mt-1 text-xs text-gray-900">
                {analysis.climatePreference}
              </p>
            </div>
          </div>
        </div>

        {/* Section d'aide méthodologie */}
        <div className="mb-8">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex w-full items-center justify-between rounded-xl border border-blue-200 bg-blue-50 p-4 text-left transition-colors hover:bg-blue-100"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">
                Comment sont calculés les scores ?
              </span>
            </div>
            <span className="text-blue-600">
              {showHelp ? "Masquer" : "Afficher"}
            </span>
          </button>

          {showHelp && (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                    <Info className="h-5 w-5 text-brand-500" />
                    Méthodologie de scoring
                  </h3>
                  <p className="mt-2 text-sm text-gray-900">
                    Nos recommandations combinent des données réelles avec vos préférences personnelles
                    pour vous proposer les destinations les plus adaptées.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">Score global (/100)</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      Calculé par intelligence artificielle (Claude) en fonction de TOUTES vos priorités.
                      Pondère chaque critère selon l&apos;importance que vous lui avez donnée (1-5).
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">Scores par catégorie (/100)</h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-900">
                      <li>• <span className="font-medium">Budget :</span> Compare le coût de vie du pays avec votre budget mensuel</li>
                      <li>• <span className="font-medium">Climat :</span> Évalue la météo selon vos préférences (température, saison)</li>
                      <li>• <span className="font-medium">Sécurité :</span> Utilise l&apos;indice de sécurité Numbeo (données réelles d&apos;expatriés)</li>
                      <li>• <span className="font-medium">Santé :</span> Utilise l&apos;indice de qualité du système de santé Numbeo</li>
                      <li>• <span className="font-medium">Vie :</span> Combine culture, environnement et transport selon vos priorités</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">Source des données</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      Les indices de coût, sécurité, santé et pollution proviennent de{" "}
                      <a href="https://www.numbeo.com" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-500 hover:text-brand-600">
                        Numbeo.com
                      </a>, la plus grande base de données collaborative au monde alimentée par
                      des milliers d&apos;expatriés et voyageurs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2"
              >
                <span className="text-sm font-medium text-gray-900">
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
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Top 10 des pays recommandés
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {countries.slice(0, 10).map((country, index) => (
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
