"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

export default function FavoritesPage() {
  const { favorites, isLoading, removeFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Retour</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Mes Favoris
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {favorites.length} pays sauvegardé
                  {favorites.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {favorites.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-gray-800">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                Aucun favori
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Ajoutez des pays à vos favoris depuis le dashboard ou les pages
                de détails.
              </p>
              <Link
                href="/dashboard"
                className="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
              >
                Voir les recommandations
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl dark:bg-gray-800">
                      {favorite.country.flag}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {favorite.country.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {favorite.country.continent}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFavorite(favorite.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:border-error-300 hover:bg-error-50 hover:text-error-500 dark:border-gray-700 dark:hover:bg-error-500/15"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {favorite.country.data && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {favorite.country.data.costOfLivingIndex && (
                      <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          Coût de vie
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {favorite.country.data.costOfLivingIndex.toFixed(0)}
                        </p>
                      </div>
                    )}
                    {favorite.country.data.safetyIndex && (
                      <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          Sécurité
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {favorite.country.data.safetyIndex.toFixed(0)}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <Link
                  href={`/countries/${favorite.countryId}`}
                  className="mt-4 block w-full rounded-lg bg-brand-500 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-brand-600"
                >
                  Voir les détails
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
