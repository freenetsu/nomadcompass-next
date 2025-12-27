"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, X, Search } from "lucide-react";
import { Button, Input, Badge, Select } from "@/components/ui";
import { Card } from "@/components/ui/Card";

interface Country {
  id: string;
  name: string;
  flag: string;
  code: string;
}

const MOCK_COUNTRIES: Country[] = [
  { id: "portugal", name: "Portugal", flag: "🇵🇹", code: "PT" },
  { id: "espagne", name: "Espagne", flag: "🇪🇸", code: "ES" },
  { id: "thailande", name: "Thaïlande", flag: "🇹🇭", code: "TH" },
  { id: "mexique", name: "Mexique", flag: "🇲🇽", code: "MX" },
  { id: "grece", name: "Grèce", flag: "🇬🇷", code: "GR" },
];

const CRITERIA = [
  { key: "costOfLiving", label: "Coût de vie" },
  { key: "safety", label: "Sécurité" },
  { key: "healthcare", label: "Santé" },
  { key: "climate", label: "Climat" },
  { key: "internet", label: "Internet" },
  { key: "transport", label: "Transport" },
];

export default function ComparePage() {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = MOCK_COUNTRIES.filter(
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Retour</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
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
            <div className="relative">
              <Input
                placeholder="Rechercher un pays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={<Search className="h-5 w-5 text-gray-400" />}
                disabled={selectedCountries.length >= 3}
              />
              {searchQuery && filteredCountries.length > 0 && (
                <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  {filteredCountries.slice(0, 5).map((country) => (
                    <button
                      key={country.id}
                      onClick={() => addCountry(country)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
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
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Critère
                  </th>
                  {selectedCountries.map((country) => (
                    <th
                      key={country.id}
                      className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white"
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
                    className={`border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50 ${
                      index % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-800/30" : ""
                    }`}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {criterion.label}
                    </td>
                    {selectedCountries.map((country) => (
                      <td
                        key={`${country.id}-${criterion.key}`}
                        className="px-4 py-4 text-center"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all"
                              style={{
                                width: `${Math.floor(Math.random() * 40 + 60)}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {Math.floor(Math.random() * 40 + 60)}/100
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Aucun pays sélectionné
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Recherchez et sélectionnez des pays ci-dessus pour commencer la
              comparaison
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
