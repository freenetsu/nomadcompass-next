"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // Log détaillé de l'erreur côté client
  if (error) {
    console.error("🔴 [AUTH ERROR PAGE] Type d'erreur:", error);
    console.error("🔴 [AUTH ERROR PAGE] Tous les params:", {
      error: searchParams.get("error"),
      code: searchParams.get("code"),
      state: searchParams.get("state"),
    });
  }

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "Il y a un problème avec la configuration du serveur. Vérifiez les logs du serveur pour plus de détails.";
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

  const getErrorDetails = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return [
          "• Vérifiez que les variables d'environnement GitHub OAuth sont correctes",
          "• Assurez-vous que l'URL de redirection dans GitHub Settings est exacte",
          "• Consultez les logs du serveur dans le terminal pour plus d'informations",
        ];
      default:
        return null;
    }
  };

  const errorDetails = getErrorDetails(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ocean-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral-50">
            <AlertTriangle className="h-8 w-8 text-coral-500" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Erreur d&apos;authentification
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {getErrorMessage(error)}
          </p>
        </div>

        <div className="rounded-xl border border-ocean-200 bg-white p-8 shadow-md">
          {errorDetails && (
            <div className="mb-6 rounded-lg bg-amber-50 p-4 text-left">
              <p className="mb-2 text-sm font-semibold text-amber-900">
                Informations de débogage :
              </p>
              <ul className="space-y-1 text-xs text-amber-800">
                {errorDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

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
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Code d&apos;erreur : {error}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Consultez la console du navigateur (F12) et les logs du serveur
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-ocean-50 px-4">
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
