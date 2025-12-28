"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            NomadCompass
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Connectez-vous pour accéder à votre profil
          </p>
        </div>

        <div className="rounded-xl border bg-white p-8 shadow-theme-md dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-6">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continuer avec Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                  ou
                </span>
              </div>
            </div>

            <Link href="/">
              <Button variant="ghost" className="w-full" size="lg">
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Vous n&apos;avez pas encore de compte ?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
            >
              Créer un compte
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-300">
          En vous connectant, vous acceptez nos conditions d&apos;utilisation et
          notre politique de confidentialité.
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <SignInContent />
    </Suspense>
  );
}
