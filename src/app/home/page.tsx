import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";
import { UserDropdown } from "@/components/auth/UserDropdown";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Globe, Sparkles, BarChart3 } from "lucide-react";

export default async function HomePage() {
  const session = await auth();

  // Si l'utilisateur n'est pas connecté, rediriger vers la landing page
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/home"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-transform hover:scale-105 dark:text-white sm:text-2xl"
          >
            <Globe className="h-6 w-6 text-brand-500 sm:h-7 sm:w-7" />
            NomadCompass
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          {/* Welcome Message */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Bienvenue, {session.user.name?.split(" ")[0] || "Explorateur"} !
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Que souhaitez-vous faire aujourd&apos;hui ?
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card 1 - Commencer l'analyse */}
            <Link href="/questionnaire" className="group">
              <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-white/[0.03]">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-brand-500/10" />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-100 transition-transform group-hover:scale-110 dark:bg-brand-500/20">
                    <Sparkles className="h-8 w-8 text-brand-600 dark:text-brand-400" />
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    Commencer l&apos;analyse
                  </h2>

                  {/* Description */}
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Répondez au questionnaire personnalisé et découvrez les pays qui correspondent le mieux à votre profil
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                    <span className="font-medium">Commencer maintenant</span>
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2 - Voir le dashboard */}
            <Link href="/dashboard" className="group">
              <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:scale-105 hover:shadow-xl dark:border-gray-800 dark:bg-white/[0.03]">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-success-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-success-500/10" />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-success-100 transition-transform group-hover:scale-110 dark:bg-success-500/20">
                    <BarChart3 className="h-8 w-8 text-success-600 dark:text-success-400" />
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    Voir le dashboard
                  </h2>

                  {/* Description */}
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Consultez vos résultats, comparez les pays et explorez les recommandations personnalisées
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-success-600 dark:text-success-400">
                    <span className="font-medium">Accéder au dashboard</span>
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Additional Quick Links */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Besoin d&apos;aide ?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/countries"
                className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                Parcourir tous les pays
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link
                href="/compare"
                className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                Comparer des destinations
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link
                href="/favorites"
                className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                Mes favoris
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
