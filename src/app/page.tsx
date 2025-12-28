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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-ocean-50 to-sunshine-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-brand-200 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-transform hover:scale-110 sm:text-2xl"
          >
            <div className="rounded-full bg-gradient-to-br from-brand-500 to-ocean-500 p-2">
              <Globe className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </div>
            <span className="bg-gradient-to-r from-brand-600 to-ocean-600 bg-clip-text text-transparent">
              NomadCompass
            </span>
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
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-brand-300 opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-ocean-300 opacity-20 blur-3xl animate-float" style={{animationDelay: '1s'}}></div>

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex animate-bounce-slow">
              <Badge color="primary" className="text-base px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4" />
                Propulsé par l&apos;Intelligence Artificielle
              </Badge>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Trouvez Votre Paradis{" "}
              <span className="block bg-gradient-to-r from-brand-500 via-ocean-500 to-adventure-500 bg-clip-text text-transparent mt-2">
                en 2 Minutes Chrono !
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-700 sm:text-2xl font-medium">
              🌍 L&apos;IA qui transforme vos rêves d&apos;expatriation en réalité
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/signin" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-lg px-8 py-4">
                  <Plane className="mr-2 h-5 w-5" />
                  Décoller Maintenant
                </Button>
              </Link>
              <a href="#demo" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full text-lg px-8 py-4">
                  <Map className="mr-2 h-5 w-5" />
                  Explorer la Carte
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                  25+
                </div>
                <div className="mt-2 text-sm text-gray-600 font-medium">Pays analysés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-ocean-500 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="mt-2 text-sm text-gray-600 font-medium">Gratuit</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-adventure-600 to-adventure-500 bg-clip-text text-transparent">
                  2min
                </div>
                <div className="mt-2 text-sm text-gray-600 font-medium">Pour décider</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Comment ça marche" */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              3 étapes simples pour trouver votre destination de rêve
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Étape 1 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-ocean-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative rounded-2xl border-2 border-brand-200 bg-white p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg">
                  <span className="text-3xl font-black text-white">1</span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  🎯 Remplissez votre profil
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Quelques questions sur vos envies, budget et style de vie
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-ocean-500 to-adventure-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative rounded-2xl border-2 border-ocean-200 bg-white p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-400 to-ocean-600 shadow-lg">
                  <span className="text-3xl font-black text-white">2</span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  🤖 L&apos;IA analyse
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Notre intelligence artificielle compare 25+ destinations
                </p>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-adventure-500 to-sunshine-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative rounded-2xl border-2 border-adventure-200 bg-white p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-adventure-400 to-adventure-600 shadow-lg">
                  <span className="text-3xl font-black text-white">3</span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  ✨ Recevez vos résultats
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Un classement personnalisé avec analyses détaillées
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Fonctionnalités" */}
      <section className="bg-gradient-to-br from-ocean-50 to-adventure-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Pourquoi NomadCompass ?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              La plateforme ultime pour les futurs nomades
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="group rounded-3xl border-2 border-brand-200 bg-white p-8 transition-all hover:scale-110 hover:shadow-2xl hover:border-brand-400">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 transition-transform group-hover:rotate-12 shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                IA Ultra-Précise
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Claude AI analyse en profondeur votre profil unique
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-3xl border-2 border-ocean-200 bg-white p-8 transition-all hover:scale-110 hover:shadow-2xl hover:border-ocean-400">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-400 to-ocean-600 transition-transform group-hover:rotate-12 shadow-lg">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Données Live
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Informations actualisées quotidiennement
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-3xl border-2 border-adventure-200 bg-white p-8 transition-all hover:scale-110 hover:shadow-2xl hover:border-adventure-400">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-adventure-400 to-adventure-600 transition-transform group-hover:rotate-12 shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Visuels Clairs
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Graphiques et comparaisons faciles à comprendre
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-3xl border-2 border-sunshine-200 bg-white p-8 transition-all hover:scale-110 hover:shadow-2xl hover:border-sunshine-400">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sunshine-400 to-sunshine-600 transition-transform group-hover:rotate-12 shadow-lg">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                25+ Destinations
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Portugal, Bali, Mexique, et bien plus !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-500 via-ocean-500 to-adventure-500 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2Mmgydi0yem0wLTJoLTJ2Mmgydi0yem0tMiAyaC0ydjJoMnYtMnptMC0yaC0ydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative mx-auto max-w-4xl text-center">
          <Users className="h-16 w-16 mx-auto mb-6 text-white animate-bounce-slow" />
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Prêt pour l&apos;aventure ? 🚀
          </h2>
          <p className="mt-6 text-xl text-white/90 font-medium">
            Rejoignez des milliers d&apos;aventuriers qui ont trouvé leur destination idéale
          </p>
          <div className="mt-10">
            <Link href="/auth/signin">
              <Button
                size="lg"
                variant="outline"
                className="border-4 border-white bg-white text-brand-600 hover:bg-brand-50 text-xl px-12 py-6 shadow-2xl hover:shadow-white/50"
              >
                <Sparkles className="mr-2 h-6 w-6" />
                C&apos;est Parti !
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-brand-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            {/* Colonne 1 - Logo et description */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-bold text-gray-900"
              >
                <div className="rounded-full bg-gradient-to-br from-brand-500 to-ocean-500 p-2">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <span className="bg-gradient-to-r from-brand-600 to-ocean-600 bg-clip-text text-transparent">
                  NomadCompass
                </span>
              </Link>
              <p className="mt-6 text-base text-gray-600 leading-relaxed">
                Votre guide intelligent pour une expatriation réussie.
                Propulsé par l&apos;Intelligence Artificielle Claude.
              </p>
            </div>

            {/* Colonne 2 - Liens */}
            <div>
              <h3 className="mb-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
                Navigation
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/auth/signin"
                    className="text-gray-600 hover:text-brand-600 transition-colors font-medium"
                  >
                    Se connecter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="text-gray-600 hover:text-brand-600 transition-colors font-medium"
                  >
                    Créer un compte
                  </Link>
                </li>
              </ul>
            </div>

            {/* Colonne 3 - Légal */}
            <div>
              <h3 className="mb-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
                Légal
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-brand-600 transition-colors font-medium"
                  >
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-brand-600 transition-colors font-medium"
                  >
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-brand-600 transition-colors font-medium"
                  >
                    CGU
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 border-t-2 border-gray-100 pt-8">
            <p className="text-center text-gray-500 font-medium">
              © 2024 NomadCompass · Propulsé par Claude AI · Made with ❤️ pour les voyageurs
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
