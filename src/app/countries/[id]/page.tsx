"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useCountry } from "@/hooks/useCountry";
import { useFavorites } from "@/hooks/useFavorites";
import { CountryHeader } from "@/components/country/CountryHeader";
import { CostOfLivingSection } from "@/components/country/CostOfLivingSection";
import { ClimateSection } from "@/components/country/ClimateSection";
import { QualityOfLifeSection } from "@/components/country/QualityOfLifeSection";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CountryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { country, isLoading, error } = useCountry(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Skeleton className="h-6 w-24" />
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-20 w-20 rounded-xl" />
                  <div>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="mt-2 h-5 w-32" />
                  </div>
                </div>
                <Skeleton className="h-10 w-32 rounded-lg" />
              </div>
            </div>
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-50">
              <AlertCircle className="h-8 w-8 text-error-500" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              {error || "Pays non trouvé"}
            </h2>
            <p className="mt-2 text-gray-900">
              Impossible de charger les informations de ce pays.
            </p>
            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={() => router.back()}
                className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
              >
                Retour
              </button>
              <Link
                href="/dashboard"
                className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                Voir le dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-900 hover:text-brand-500"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Retour</span>
            </button>
            <Link
              href="/dashboard"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
            >
              Voir toutes les recommandations
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <CountryHeader
            name={country.name}
            code={country.code}
            flag={country.flag}
            continent={country.continent}
            isFavorite={isFavorite(country.id)}
            onToggleFavorite={() => toggleFavorite(country.id)}
          />

          <CostOfLivingSection
            costOfLivingIndex={country.data?.costOfLivingIndex}
            averageRent={country.data?.averageRent}
            averageSalary={country.data?.averageSalary}
          />

          <ClimateSection
            averageTemp={country.data?.averageTemp}
            climate={country.data?.climate}
            rainfall={country.data?.rainfall}
          />

          <QualityOfLifeSection
            safetyIndex={country.data?.safetyIndex}
            healthcareIndex={country.data?.healthcareIndex}
            pollutionIndex={country.data?.pollutionIndex}
            internetSpeed={country.data?.internetSpeed}
          />
        </div>
      </main>
    </div>
  );
}
