import { Badge, Button } from "@/components/ui";
import {
  BarChart3,
  Brain,
  Database,
  Globe,
  Map,
  MapPin,
  Plane,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-ocean-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-colors hover:text-brand-500 sm:text-2xl"
          >
            <div className="rounded-lg bg-brand-500 p-2 shadow-sm">
              <Globe className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </div>
            <span className="text-gray-900">NomadCompass</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button
                variant="outline"
                size="md"
                className="font-semibold border-brand-500 text-brand-500 hover:bg-brand-50"
              >
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ocean-50 to-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex">
                <Badge
                  color="primary"
                  variant="solid"
                  className="text-sm px-4 py-2 font-semibold shadow-sm bg-brand-500"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  IA Révolutionnaire
                </Badge>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
                Découvrez Votre{" "}
                <span className="block text-brand-500 mt-2">
                  Destination de Rêve en 2min
                </span>
              </h1>

              <p className="mx-auto lg:mx-0 mt-6 max-w-xl text-lg text-gray-600">
                L&apos;IA qui transforme vos rêves d&apos;expatriation en
                réalité
              </p>

              <div className="mt-8 flex flex-col items-center lg:items-start justify-center lg:justify-start gap-4 sm:flex-row">
                <Link href="/auth/signin" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full text-base px-8 py-3 font-semibold shadow-sm bg-brand-500 hover:bg-brand-600"
                  >
                    <Plane className="mr-2 h-5 w-5" />
                    Décoller Maintenant
                  </Button>
                </Link>
                <a href="#demo" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-base px-8 py-3 font-semibold border border-brand-500 text-brand-500 hover:bg-brand-50"
                  >
                    <Map className="mr-2 h-5 w-5" />
                    Voir la Carte
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-brand-500">25+</div>
                  <div className="mt-2 text-sm text-gray-600 font-medium">
                    Pays
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-brand-500">100%</div>
                  <div className="mt-2 text-sm text-gray-600 font-medium">
                    Gratuit
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-brand-500">2min</div>
                  <div className="mt-2 text-sm text-gray-600 font-medium">
                    Chrono
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-lg border border-ocean-200">
                <Image
                  src="/illustration/onePiecePaysage.jpeg"
                  alt="Sunset Adventure"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Comment ça marche" */}
      <section className="bg-ocean-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">3 étapes ultra-simples</p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Étape 1 */}
            <div className="relative group">
              <div className="relative rounded-lg border border-ocean-200 bg-white p-6 shadow-md hover:shadow-lg transition-all duration-200">
                <div className="mb-6 w-full h-40 flex items-center justify-center overflow-hidden rounded-lg">
                  <Image
                    src="/illustration/montFuji.jpeg"
                    alt="Planification"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  Votre Profil
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Répondez à nos questions magiques sur vos envies de voyage
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="relative group">
              <div className="relative rounded-lg border border-ocean-200 bg-white p-6 shadow-md hover:shadow-lg transition-all duration-200">
                <div className="mb-6 w-full h-40 flex items-center justify-center overflow-hidden rounded-lg">
                  <Image
                    src="/illustration/onePiecePaysage.jpeg"
                    alt="IA Analysis"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  IA Turbo
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Notre super IA analyse 25+ destinations en quelques secondes
                </p>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="relative group">
              <div className="relative rounded-lg border border-ocean-200 bg-white p-6 shadow-md hover:shadow-lg transition-all duration-200">
                <div className="mb-6 w-full h-40 flex items-center justify-center overflow-hidden rounded-lg">
                  <Image
                    src="/illustration/montFuji.jpeg"
                    alt="Résultats"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  Résultats
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Découvrez votre pays idéal avec tous les détails qui comptent
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Fonctionnalités" avec illustrations */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Pourquoi NomadCompass ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              La plateforme N°1 des futurs nomades
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="group rounded-lg border border-ocean-200 bg-white p-6 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                IA Surpuissante
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Claude AI décortique votre profil comme un pro
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-lg border border-ocean-200 bg-white p-6 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Data en Direct
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mises à jour quotidiennes pour être toujours dans le game
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-lg border border-ocean-200 bg-white p-6 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Graphiques Clairs
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tout comprendre en un coup d&apos;œil, zero prise de tête
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-lg border border-ocean-200 bg-white p-6 transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                25+ Destinations
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Portugal, Bali, Mexique... Le monde entier vous attend !
              </p>
            </div>
          </div>

          {/* Illustration centrale */}
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-lg border border-ocean-200">
              <Image
                src="/illustration/wordlMap.jpeg"
                alt="World Map"
                width={800}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ocean-200 bg-ocean-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-gray-900"
              >
                <div className="rounded-lg bg-brand-500 p-2 shadow-sm">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <span className="text-gray-900">NomadCompass</span>
              </Link>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Votre guide ultime pour une expatriation de rêve. Propulsé par
                l&apos;IA Claude pour des résultats magiques
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wider">
                Navigation
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/auth/signin"
                    className="text-gray-600 hover:text-brand-500 transition-colors text-sm"
                  >
                    Se connecter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="text-gray-600 hover:text-brand-500 transition-colors text-sm"
                  >
                    Créer un compte
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wider">
                Légal
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-brand-500 transition-colors text-sm"
                  >
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-brand-500 transition-colors text-sm"
                  >
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-brand-500 transition-colors text-sm"
                  >
                    CGU
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-ocean-200 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © 2024 NomadCompass · Propulsé par Claude AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
