import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/10">
          <FileQuestion className="h-10 w-10 text-brand-500" />
        </div>
        <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
          Page introuvable
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Désolé, nous n&apos;avons pas pu trouver la page que vous recherchez.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/"
            className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600 active:bg-brand-700"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700"
          >
            Voir le dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
