import Link from "next/link";
import { Button } from "@/components/ui";
import { UserDropdown } from "@/components/auth/UserDropdown";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            NomadCompass
          </Link>
          <UserDropdown />
        </div>
      </header>
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">NomadCompass</span>
              <span className="block text-brand-500">
                Votre guide d&apos;expatriation
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:mt-6 sm:text-lg">
              Plateforme IA d&apos;analyse d&apos;expatriation pour les Français
              souhaitant s&apos;installer à l&apos;étranger.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link href="/questionnaire" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Commencer l&apos;analyse
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full">
                  Voir le dashboard
                </Button>
              </Link>
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
