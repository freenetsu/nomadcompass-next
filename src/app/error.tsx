"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/10">
          <AlertTriangle className="h-8 w-8 text-error-500" />
        </div>
        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
          Une erreur est survenue
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {error.message || "Une erreur inattendue s'est produite"}
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600 active:bg-brand-700"
          >
            Réessayer
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    </div>
  );
}
