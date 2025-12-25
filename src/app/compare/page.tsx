"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Retour</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Comparer les pays
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Fonctionnalité en cours de développement
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            La comparaison de pays sera bientôt disponible. Vous pourrez
            comparer jusqu'à 3 pays côte à côte sur tous les critères.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
          >
            Retour au dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
