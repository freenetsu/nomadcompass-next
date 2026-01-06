import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserDropdown } from "@/components/auth/UserDropdown";
import { Globe, Sparkles, BarChart3 } from "lucide-react";

export default async function HomePage() {
  const session = await auth();

  // Si l'utilisateur n'est pas connecté, rediriger vers la landing page
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-ocean-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-ocean-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/home"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-colors hover:text-brand-500 sm:text-2xl"
          >
            <div className="rounded-lg bg-brand-500 p-2 shadow-sm">
              <Globe className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </div>
            NomadCompass
          </Link>
          <div className="flex items-center gap-3">
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          {/* Welcome Message */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Bienvenue, {session.user.name?.split(" ")[0] || "Explorateur"} !
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Que souhaitez-vous faire aujourd&apos;hui ?
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card 1 - Commencer l'analyse */}
            <Link href="/questionnaire" className="group">
              <div className="relative h-full rounded-xl border border-ocean-200 bg-white p-8 transition-all hover:shadow-lg">
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">
                    Commencer l&apos;analyse
                  </h2>

                  {/* Description */}
                  <p className="mb-6 text-gray-600">
                    Répondez au questionnaire personnalisé et découvrez les pays qui correspondent le mieux à votre profil
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-brand-500">
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
              <div className="relative h-full rounded-xl border border-ocean-200 bg-white p-8 transition-all hover:shadow-lg">
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">
                    Voir le dashboard
                  </h2>

                  {/* Description */}
                  <p className="mb-6 text-gray-600">
                    Consultez vos résultats, comparez les pays et explorez les recommandations personnalisées
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-brand-500">
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
            <p className="mb-4 text-sm text-gray-600">
              Besoin d&apos;aide ?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/countries"
                className="text-sm text-brand-500 hover:text-brand-600 transition-colors"
              >
                Parcourir tous les pays
              </Link>
              <span className="text-ocean-200">•</span>
              <Link
                href="/compare"
                className="text-sm text-brand-500 hover:text-brand-600 transition-colors"
              >
                Comparer des destinations
              </Link>
              <span className="text-ocean-200">•</span>
              <Link
                href="/favorites"
                className="text-sm text-brand-500 hover:text-brand-600 transition-colors"
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
