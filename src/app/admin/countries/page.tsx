"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Skeleton, SkeletonTable } from "@/components/ui/Skeleton";

interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  continent: string;
  createdAt: string;
  data?: {
    costOfLivingIndex?: number;
    safetyIndex?: number;
  };
}

export default function AdminCountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/countries");
      if (!response.ok) throw new Error("Erreur lors du chargement");
      const data = await response.json();
      setCountries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer le pays "${name}" ?`)) return;

    try {
      const response = await fetch(`/api/admin/countries/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      await fetchCountries();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="mt-2 h-5 w-48" />
        </div>
        <Card>
          <SkeletonTable />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-lg bg-error-50 p-4 text-error-900 dark:bg-error-500/10 dark:text-error-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestion des Pays
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {countries.length} pays dans la base de données
          </p>
        </div>
        <Link href="/admin/countries/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un pays
          </Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Pays
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Code
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Continent
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Coût de vie
                </th>
                <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Sécurité
                </th>
                <th className="pb-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr
                  key={country.id}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {country.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                    {country.code}
                  </td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                    {country.continent}
                  </td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                    {country.data?.costOfLivingIndex?.toFixed(0) || "N/A"}
                  </td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                    {country.data?.safetyIndex?.toFixed(0) || "N/A"}
                  </td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/countries/${country.id}`}>
                        <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                          <Pencil className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(country.id, country.name)}
                        className="rounded-lg p-2 text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
