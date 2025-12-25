"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui";
import { RefreshCw, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function AdminScrapingPage() {
  const [isScrapingAll, setIsScrapingAll] = useState(false);
  const [results, setResults] = useState<
    Array<{ country: string; status: string; message: string }>
  >([]);

  const handleScrapeAll = async () => {
    setIsScrapingAll(true);
    setResults([]);

    try {
      const response = await fetch("/api/admin/scraping", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Erreur lors du scraping");
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur");
    } finally {
      setIsScrapingAll(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Scraping des données
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Mettre à jour les données de tous les pays depuis Numbeo et
          Climate-Data
        </p>
      </div>

      <Card className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Re-scraping complet
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Lance le scraping pour tous les pays. Cette opération peut prendre
              plusieurs minutes.
            </p>
            <div className="mt-4 rounded-lg bg-warning-50 p-3 dark:bg-warning-500/10">
              <p className="text-sm text-warning-800 dark:text-warning-200">
                ⚠️ Attention : Le scraping peut être bloqué par les sites si
                exécuté trop fréquemment. Utilisez cette fonction avec
                modération.
              </p>
            </div>
          </div>
          <Button
            onClick={handleScrapeAll}
            isLoading={isScrapingAll}
            disabled={isScrapingAll}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {isScrapingAll ? "Scraping en cours..." : "Lancer le scraping"}
          </Button>
        </div>
      </Card>

      {results.length > 0 && (
        <Card title="Résultats du scraping">
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                {result.status === "success" ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-success-500" />
                ) : result.status === "error" ? (
                  <XCircle className="h-5 w-5 flex-shrink-0 text-error-500" />
                ) : (
                  <Loader2 className="h-5 w-5 flex-shrink-0 animate-spin text-warning-500" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {result.country}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {result.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card title="Informations">
        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Sources de données
            </h4>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Numbeo : Coût de vie, sécurité, santé, pollution</li>
              <li>Climate-Data.org : Température, climat, précipitations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Fréquence recommandée
            </h4>
            <p className="mt-1">
              Les données changent peu fréquemment. Un scraping mensuel est
              suffisant pour la plupart des cas.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Durée estimée
            </h4>
            <p className="mt-1">
              ~30 secondes par pays en raison du rate limiting pour éviter les
              blocages.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
