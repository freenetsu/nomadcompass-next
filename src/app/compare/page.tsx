"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, X, Search } from "lucide-react";
import { Input, Badge } from "@/components/ui";
import { Card } from "@/components/ui/Card";

interface Country {
  id: string;
  name: string;
  flag: string;
  code: string;
  data?: {
    costOfLivingIndex?: number;
    safetyIndex?: number;
    healthcareIndex?: number;
    climate?: string;
    internetSpeed?: number;
    transportIndex?: number;
  } | null;
}

const CRITERIA = [
  { key: "costOfLivingIndex", label: "Coût de vie" },
  { key: "safetyIndex", label: "Sécurité" },
  { key: "healthcareIndex", label: "Santé" },
  { key: "climate", label: "Climat" },
  { key: "internetSpeed", label: "Internet" },
  { key: "transportIndex", label: "Transport" },
];

export default function ComparePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/countries");
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedCountries.find((c) => c.id === country.id),
  );

  const addCountry = (country: Country) => {
    if (selectedCountries.length < 3) {
      setSelectedCountries([...selectedCountries, country]);
      setSearchQuery("");
    }
  };

  const removeCountry = (countryId: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c.id !== countryId));
  };

  return (
    <div className="min-h-screen bg-ocean-50">
      <header className="border-b border-ocean-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/home"
              className="flex items-center gap-2 text-gray-900 transition-colors hover:text-brand-500"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Retour</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Comparer les pays
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Sélection des pays */}
        <Card
          title="Sélectionnez jusqu'à 3 pays"
          desc="Choisissez les pays que vous souhaitez comparer"
          className="mb-8"
        >
          <div className="space-y-4">
            {!isLoading && countries.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-900 mb-3">
                  Pays disponibles pour comparaison :
                </p>
                <div className="flex flex-wrap gap-2">
                  {countries.filter(
                    (country) => !selectedCountries.find((c) => c.id === country.id)
                  ).slice(0, 10).map((country) => (
                    <button
                      key={country.id}
                      onClick={() => addCountry(country)}
                      disabled={selectedCountries.length >= 3}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-900 bg-ocean-50 rounded-full transition-colors hover:bg-brand-50 hover:text-brand-500 disabled:opacity-50 disabled:cursor-not-allowed border border-ocean-200"
                    >
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="relative">
              <Input
                placeholder="Rechercher un pays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={<Search className="h-5 w-5 text-gray-400" />}
                disabled={selectedCountries.length >= 3}
              />
              {searchQuery && filteredCountries.length > 0 && (
                <div className="absolute z-10 mt-2 w-full rounded-lg border border-ocean-200 bg-white shadow-lg">
                  {filteredCountries.slice(0, 5).map((country) => (
                    <button
                      key={country.id}
                      onClick={() => addCountry(country)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-ocean-50"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {country.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((country) => (
                <Badge
                  key={country.id}
                  variant="light"
                  color="primary"
                  className="flex items-center gap-2 text-sm"
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <button
                    onClick={() => removeCountry(country.id)}
                    className="ml-1 transition-transform hover:scale-110"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Tableau de comparaison */}
        {selectedCountries.length > 0 ? (
          <Card title="Comparaison" className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Critère
                  </th>
                  {selectedCountries.map((country) => (
                    <th
                      key={country.id}
                      className="px-4 py-3 text-center text-sm font-semibold text-gray-900"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CRITERIA.map((criterion, index) => (
                  <tr
                    key={criterion.key}
                    className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-gray-50/50" : ""
                    }`}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {criterion.label}
                    </td>
                    {selectedCountries.map((country) => {
                      const value = criterion.key === "climate"
                        ? country.data?.climate || "N/A"
                        : country.data?.[criterion.key as keyof typeof country.data];
                      const numericValue = typeof value === "number" ? value : null;

                      return (
                        <td
                          key={`${country.id}-${criterion.key}`}
                          className="px-4 py-4 text-center"
                        >
                          {criterion.key === "climate" ? (
                            <span className="text-sm font-semibold text-gray-900">
                              {value}
                            </span>
                          ) : numericValue !== null ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-gray-200">
                                <div
                                  className="h-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all"
                                  style={{
                                    width: `${Math.min(100, numericValue)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-900">
                                {numericValue.toFixed(0)}/100
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">N/A</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Aucun pays sélectionné
            </h2>
            <p className="mt-2 text-gray-900">
              Recherchez et sélectionnez des pays ci-dessus pour commencer la
              comparaison
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
