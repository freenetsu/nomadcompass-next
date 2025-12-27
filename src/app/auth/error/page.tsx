"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "Il y a un problème avec la configuration du serveur.";
      case "AccessDenied":
        return "L'accès a été refusé.";
      case "Verification":
        return "Le lien de vérification a expiré ou a déjà été utilisé.";
      case "OAuthSignin":
        return "Erreur lors de la connexion avec le fournisseur OAuth.";
      case "OAuthCallback":
        return "Erreur lors du retour de l'authentification.";
      case "OAuthCreateAccount":
        return "Impossible de créer votre compte OAuth.";
      case "EmailCreateAccount":
        return "Impossible de créer votre compte email.";
      case "Callback":
        return "Erreur lors du processus d'authentification.";
      case "OAuthAccountNotLinked":
        return "Cet email est déjà associé à un autre compte.";
      case "EmailSignin":
        return "Impossible d'envoyer l'email de connexion.";
      case "CredentialsSignin":
        return "Les identifiants fournis sont incorrects.";
      default:
        return "Une erreur inattendue s'est produite lors de l'authentification.";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-100 dark:bg-error-900">
            <AlertTriangle className="h-8 w-8 text-error-600 dark:text-error-400" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Erreur d&apos;authentification
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {getErrorMessage(error)}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-8 shadow-theme-md dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <Link href="/auth/signin">
              <Button className="w-full" size="lg">
                Réessayer la connexion
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full" size="lg">
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </div>

        {error && (
          <p className="text-center text-xs text-gray-500 dark:text-gray-300">
            Code d&apos;erreur : {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
