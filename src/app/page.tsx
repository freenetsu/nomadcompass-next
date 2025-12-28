import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import {
  Globe,
  Sparkles,
  Database,
  BarChart3,
  MapPin,
  Brain,
  Plane,
  Map,
  Users
} from "lucide-react";
import { TravelerIllustration, WorldMapIllustration } from "@/components/illustrations/TravelIllustration";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-100 via-ocean-100 to-sunshine-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-4 border-brand-400 bg-white shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-black text-gray-900 transition-transform hover:scale-110 sm:text-3xl"
          >
            <div className="rounded-full bg-gradient-to-br from-brand-500 to-ocean-500 p-2.5 shadow-lg">
              <Globe className="h-7 w-7 text-white sm:h-8 sm:w-8" />
            </div>
            <span className="bg-gradient-to-r from-brand-600 to-ocean-600 bg-clip-text text-transparent">
              NomadCompass
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="outline" size="md" className="font-bold">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-200 via-ocean-200 to-adventure-200 px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-5 h-72 w-72 rounded-full bg-sunshine-400 opacity-40 blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-5 h-96 w-96 rounded-full bg-coral-400 opacity-40 blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 h-80 w-80 rounded-full bg-adventure-400 opacity-30 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <div className="mb-8 inline-flex animate-bounce-slow">
                <Badge color="primary" variant="solid" className="text-lg px-6 py-3 font-bold shadow-2xl">
                  <Sparkles className="mr-2 h-5 w-5" />
                  IA Révolutionnaire
                </Badge>
              </div>

              <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight">
                Trouvez Votre{" "}
                <span className="block bg-gradient-to-r from-brand-600 via-ocean-600 to-adventure-600 bg-clip-text text-transparent mt-2">
                  Paradis en 2min !
                </span>
              </h1>

              <p className="mx-auto lg:mx-0 mt-8 max-w-xl text-2xl text-gray-800 font-bold">
                🚀 L&apos;IA qui transforme vos rêves d&apos;expatriation en réalité
              </p>

              <div className="mt-12 flex flex-col items-center lg:items-start justify-center lg:justify-start gap-5 sm:flex-row">
                <Link href="/auth/signin" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-xl px-10 py-6 font-black shadow-2xl">
                    <Plane className="mr-3 h-6 w-6" />
                    Décoller Maintenant !
                  </Button>
                </Link>
                <a href="#demo" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full text-xl px-10 py-6 font-black border-4 shadow-xl">
                    <Map className="mr-3 h-6 w-6" />
                    Voir la Carte
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-5xl font-black bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                    25+
                  </div>
                  <div className="mt-2 text-base text-gray-800 font-bold">Pays</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-5xl font-black bg-gradient-to-r from-ocean-600 to-ocean-500 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="mt-2 text-base text-gray-800 font-bold">Gratuit</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-5xl font-black bg-gradient-to-r from-adventure-600 to-adventure-500 bg-clip-text text-transparent">
                    2min
                  </div>
                  <div className="mt-2 text-base text-gray-800 font-bold">Chrono</div>
                </div>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg animate-float">
                <TravelerIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Comment ça marche" */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">
              Comment ça marche ?
            </h2>
            <p className="mt-6 text-2xl text-gray-700 font-bold">
              3 étapes ultra-simples ⚡
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Étape 1 */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-500 to-ocean-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative rounded-3xl border-4 border-brand-400 bg-white p-10 shadow-2xl hover:shadow-brand-300 transition-all duration-300 hover:scale-105">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-xl">
                  <span className="text-4xl font-black text-white">1</span>
                </div>
                <h3 className="mb-5 text-3xl font-black text-gray-900">
                  🎯 Votre Profil
                </h3>
                <p className="text-gray-700 text-lg font-semibold leading-relaxed">
                  Répondez à nos questions magiques sur vos envies de voyage
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-ocean-500 to-adventure-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative rounded-3xl border-4 border-ocean-400 bg-white p-10 shadow-2xl hover:shadow-ocean-300 transition-all duration-300 hover:scale-105">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-700 shadow-xl">
                  <span className="text-4xl font-black text-white">2</span>
                </div>
                <h3 className="mb-5 text-3xl font-black text-gray-900">
                  🤖 IA Turbo
                </h3>
                <p className="text-gray-700 text-lg font-semibold leading-relaxed">
                  Notre super IA analyse 25+ destinations en quelques secondes
                </p>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-adventure-500 to-sunshine-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative rounded-3xl border-4 border-adventure-400 bg-white p-10 shadow-2xl hover:shadow-adventure-300 transition-all duration-300 hover:scale-105">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-adventure-500 to-adventure-700 shadow-xl">
                  <span className="text-4xl font-black text-white">3</span>
                </div>
                <h3 className="mb-5 text-3xl font-black text-gray-900">
                  ✨ Résultats !
                </h3>
                <p className="text-gray-700 text-lg font-semibold leading-relaxed">
                  Découvrez votre pays idéal avec tous les détails qui comptent
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Fonctionnalités" avec illustrations */}
      <section className="bg-gradient-to-br from-ocean-100 via-adventure-100 to-sunshine-100 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-5xl font-black text-gray-900 sm:text-6xl">
              Pourquoi NomadCompass ?
            </h2>
            <p className="mt-6 text-2xl text-gray-700 font-bold">
              La plateforme N°1 des futurs nomades 🌍
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="group rounded-4xl border-4 border-brand-400 bg-white p-8 transition-all hover:scale-110 hover:shadow-2xl hover:border-brand-600">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 transition-transform group-hover:rotate-12 shadow-xl">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-black text-gray-900">
                IA Surpuissante
              </h3>
              <p className="text-gray-700 font-semibold leading-relaxed">
                Claude AI décortique votre profil comme un pro
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-4xl border-4 border-ocean-400 bg-white p-8 transition-all hover:scale-110 hover:shadow-2xl hover:border-ocean-600">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-ocean-500 to-ocean-700 transition-transform group-hover:rotate-12 shadow-xl">
                <Database className="h-10 w-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-black text-gray-900">
                Data en Direct
              </h3>
              <p className="text-gray-700 font-semibold leading-relaxed">
                Mises à jour quotidiennes pour être toujours dans le game
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-4xl border-4 border-adventure-400 bg-white p-8 transition-all hover:scale-110 hover:shadow-2xl hover:border-adventure-600">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-adventure-500 to-adventure-700 transition-transform group-hover:rotate-12 shadow-xl">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-black text-gray-900">
                Graphiques Clairs
              </h3>
              <p className="text-gray-700 font-semibold leading-relaxed">
                Tout comprendre en un coup d&apos;œil, zero prise de tête
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-4xl border-4 border-sunshine-400 bg-white p-8 transition-all hover:scale-110 hover:shadow-2xl hover:border-sunshine-600">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sunshine-500 to-sunshine-700 transition-transform group-hover:rotate-12 shadow-xl">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-black text-gray-900">
                25+ Paradis
              </h3>
              <p className="text-gray-700 font-semibold leading-relaxed">
                Portugal, Bali, Mexique... Le monde entier vous attend !
              </p>
            </div>
          </div>

          {/* Illustration centrale */}
          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-2xl">
              <WorldMapIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-ocean-600 to-adventure-600 px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2Mmgydi0yem0wLTJoLTJ2Mmgydi0yem0tMiAyaC0ydjJoMnYtMnptMC0yaC0ydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

        <div className="relative mx-auto max-w-5xl text-center">
          <Users className="h-20 w-20 mx-auto mb-8 text-white animate-bounce-slow drop-shadow-2xl" />
          <h2 className="text-5xl font-black text-white sm:text-6xl drop-shadow-2xl">
            Prêt pour l&apos;Aventure ? 🚀
          </h2>
          <p className="mt-8 text-2xl text-white font-bold drop-shadow-xl">
            Rejoignez des milliers d&apos;aventuriers qui ont trouvé LEUR paradis
          </p>
          <div className="mt-12">
            <Link href="/auth/signin">
              <Button
                size="lg"
                variant="outline"
                className="border-[6px] border-white bg-white text-brand-600 hover:bg-sunshine-50 text-2xl px-16 py-8 font-black shadow-2xl hover:shadow-white/70 hover:scale-110 transition-all"
              >
                <Sparkles className="mr-3 h-8 w-8" />
                GO GO GO !
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-brand-400 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-3 text-3xl font-black text-gray-900"
              >
                <div className="rounded-full bg-gradient-to-br from-brand-500 to-ocean-500 p-3 shadow-xl">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <span className="bg-gradient-to-r from-brand-600 to-ocean-600 bg-clip-text text-transparent">
                  NomadCompass
                </span>
              </Link>
              <p className="mt-8 text-lg text-gray-700 leading-relaxed font-semibold">
                Votre guide ultime pour une expatriation de rêve.
                Propulsé par l&apos;IA Claude pour des résultats magiques ✨
              </p>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-black text-gray-900 uppercase tracking-wider">
                Navigation
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/auth/signin"
                    className="text-gray-700 hover:text-brand-600 transition-colors font-bold text-lg"
                  >
                    → Se connecter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="text-gray-700 hover:text-brand-600 transition-colors font-bold text-lg"
                  >
                    → Créer un compte
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-black text-gray-900 uppercase tracking-wider">
                Légal
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-brand-600 transition-colors font-bold text-lg"
                  >
                    → Mentions légales
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-brand-600 transition-colors font-bold text-lg"
                  >
                    → Confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-brand-600 transition-colors font-bold text-lg"
                  >
                    → CGU
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 border-t-4 border-gray-200 pt-10">
            <p className="text-center text-gray-600 font-bold text-lg">
              © 2024 NomadCompass · Propulsé par Claude AI · Made with 🔥 pour les voyageurs du monde
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
