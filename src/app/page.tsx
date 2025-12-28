import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import {
  Globe,
  Sparkles,
  Database,
  BarChart3,
  MapPin,
  Brain
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-transform hover:scale-105 dark:text-white sm:text-2xl"
          >
            <Globe className="h-6 w-6 text-brand-500 sm:h-7 sm:w-7" />
            NomadCompass
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex">
              <Badge color="primary" className="text-sm">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Propulsé par Claude AI
              </Badge>
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Trouvez Votre Pays Idéal{" "}
              <span className="block bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                en 2 Minutes
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
              Analyse IA personnalisée basée sur votre profil pour une expatriation réussie
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/signin" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Commencer Gratuitement
                </Button>
              </Link>
              <a href="#demo" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full">
                  Voir la Démo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Comment ça marche" */}
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-800/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              En 3 étapes simples, trouvez votre destination idéale
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Étape 1 */}
            <div className="relative rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-500/20">
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">01</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                Remplissez votre profil
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Répondez à quelques questions sur vos préférences, budget et priorités de vie
              </p>
            </div>

            {/* Étape 2 */}
            <div className="relative rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-500/20">
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">02</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                IA analyse vos besoins
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Notre intelligence artificielle analyse votre profil et compare plus de 10 pays
              </p>
            </div>

            {/* Étape 3 */}
            <div className="relative rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-500/20">
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">03</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                Recevez vos destinations
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Obtenez un classement personnalisé avec analyses détaillées pour chaque pays
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Fonctionnalités" */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Pourquoi NomadCompass ?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              La plateforme la plus complète pour votre projet d&apos;expatriation
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:scale-105 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 transition-transform group-hover:scale-110 dark:bg-brand-500/15">
                <Brain className="h-6 w-6 text-brand-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Analyse IA Personnalisée
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Claude AI analyse votre profil en profondeur pour des recommandations ultra-précises
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:scale-105 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success-50 transition-transform group-hover:scale-110 dark:bg-success-500/15">
                <Database className="h-6 w-6 text-success-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Données Réelles
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Scraping quotidien depuis Numbeo et sites officiels pour des infos à jour
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:scale-105 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 transition-transform group-hover:scale-110 dark:bg-orange-500/15">
                <BarChart3 className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Dashboard Interactif
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Visualisez vos résultats avec des graphiques clairs et comparaisons détaillées
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:scale-105 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-light-50 transition-transform group-hover:scale-110 dark:bg-blue-light-500/15">
                <MapPin className="h-6 w-6 text-blue-light-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                10+ Pays Comparés
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Portugal, Thaïlande, Mexique, Espagne, Bali et bien d&apos;autres destinations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-16 dark:from-brand-700 dark:to-brand-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Prêt à trouver votre destination idéale ?
          </h2>
          <p className="mt-4 text-lg text-brand-100">
            Rejoignez des centaines d&apos;expatriés satisfaits qui ont trouvé leur pays idéal
          </p>
          <div className="mt-8">
            <Link href="/auth/signin">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-white text-brand-600 hover:bg-brand-50"
              >
                Commencer Mon Analyse Gratuite
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Colonne 1 - Logo et description */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
              >
                <Globe className="h-6 w-6 text-brand-500" />
                NomadCompass
              </Link>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Votre guide intelligent d&apos;expatriation propulsé par l&apos;IA.
                Trouvez le pays parfait selon votre profil en quelques minutes.
              </p>
            </div>

            {/* Colonne 2 - Liens */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Liens
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/auth/signin"
                    className="text-sm text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
                  >
                    Se connecter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="text-sm text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
                  >
                    Créer un compte
                  </Link>
                </li>
              </ul>
            </div>

            {/* Colonne 3 - Légal */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Légal
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
                  >
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
                  >
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
                  >
                    CGU
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © 2024 NomadCompass. Propulsé par Claude AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
