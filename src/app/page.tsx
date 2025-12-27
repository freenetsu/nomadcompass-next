import Link from "next/link";
import { Button } from "@/components/ui";
import { UserDropdown } from "@/components/auth/UserDropdown";
import { Globe, Sparkles, Shield, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-gray-900 transition-transform hover:scale-105 dark:text-white"
          >
            <Globe className="h-7 w-7 text-brand-500" />
            NomadCompass
          </Link>
          <div className="flex items-center gap-3">
            <UserDropdown />
          </div>
        </div>
      </header>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <Sparkles className="h-4 w-4" />
              Powered by AI
            </div>
            <h1 className="animate-fade-in text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">NomadCompass</span>
              <span className="block bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                Votre guide d&apos;expatriation
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:mt-6 sm:text-lg">
              Plateforme IA d&apos;analyse d&apos;expatriation pour les Français
              souhaitant s&apos;installer à l&apos;étranger. Trouvez le pays
              parfait selon votre profil.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link href="/questionnaire" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full transition-transform hover:scale-105"
                >
                  Commencer l&apos;analyse
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full transition-transform hover:scale-105"
                >
                  Voir le dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:scale-105 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 transition-transform group-hover:scale-110 dark:bg-brand-500/15">
                <Sparkles className="h-6 w-6 text-brand-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Analyse IA Personnalisée
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Recommandations basées sur votre profil, budget et priorités
                grâce à Claude AI
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:scale-105 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success-50 transition-transform group-hover:scale-110 dark:bg-success-500/15">
                <TrendingUp className="h-6 w-6 text-success-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Données à Jour
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Coût de vie, climat, sécurité, santé actualisés régulièrement
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:scale-105 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03] sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 transition-transform group-hover:scale-110 dark:bg-orange-500/15">
                <Shield className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Comparaison Détaillée
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Comparez jusqu&apos;à 3 pays sur tous les critères importants
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-gray-500">
            © 2024 NomadCompass. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
