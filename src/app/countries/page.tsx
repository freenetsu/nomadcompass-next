"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, Globe } from "lucide-react";
import { Input, Select, Badge } from "@/components/ui";
import { Card } from "@/components/ui/Card";

interface Country {
  id: string;
  name: string;
  flag: string;
  continent: string;
  costOfLiving: number;
  safety: number;
  climate: string;
}

const MOCK_COUNTRIES: Country[] = [
  {
    id: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    continent: "Europe",
    costOfLiving: 65,
    safety: 85,
    climate: "Méditerranéen",
  },
  {
    id: "espagne",
    name: "Espagne",
    flag: "🇪🇸",
    continent: "Europe",
    costOfLiving: 70,
    safety: 80,
    climate: "Méditerranéen",
  },
  {
    id: "thailande",
    name: "Thaïlande",
    flag: "🇹🇭",
    continent: "Asia",
    costOfLiving: 45,
    safety: 70,
    climate: "Tropical",
  },
  {
    id: "mexique",
    name: "Mexique",
    flag: "🇲🇽",
    continent: "Americas",
    costOfLiving: 50,
    safety: 65,
    climate: "Tropical",
  },
  {
    id: "grece",
    name: "Grèce",
    flag: "🇬🇷",
    continent: "Europe",
    costOfLiving: 68,
    safety: 82,
    climate: "Méditerranéen",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    flag: "🇻🇳",
    continent: "Asia",
    costOfLiving: 40,
    safety: 75,
    climate: "Tropical",
  },
  {
    id: "croatie",
    name: "Croatie",
    flag: "🇭🇷",
    continent: "Europe",
    costOfLiving: 62,
    safety: 88,
    climate: "Méditerranéen",
  },
  {
    id: "colombie",
    name: "Colombie",
    flag: "🇨🇴",
    continent: "Americas",
    costOfLiving: 48,
    safety: 68,
    climate: "Tropical",
  },
];

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [continentFilter, setContinentFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "costOfLiving" | "safety">(
    "name",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const continents = [
    "all",
    ...Array.from(new Set(MOCK_COUNTRIES.map((c) => c.continent))),
  ];

  const filteredAndSortedCountries = useMemo(() => {
    const result = MOCK_COUNTRIES.filter((country) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesContinent =
        continentFilter === "all" || country.continent === continentFilter;
      return matchesSearch && matchesContinent;
    });

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison = a[sortBy] - b[sortBy];
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, continentFilter, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="min-h-screen bg-ocean-50">
      <header className="border-b border-ocean-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tous les pays
              </h1>
              <p className="mt-1 text-sm text-gray-900">
                {filteredAndSortedCountries.length} pays disponibles
              </p>
            </div>
            <Link
              href="/dashboard"
              className="rounded-lg border border-ocean-200 px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-ocean-50"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filtres */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <Input
                placeholder="Rechercher un pays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={<Search className="h-5 w-5 text-gray-400" />}
              />
            </div>
            <Select
              label=""
              value={continentFilter}
              onChange={(e) => setContinentFilter(e.target.value)}
              options={continents.map((c) => ({
                value: c,
                label: c === "all" ? "Tous les continents" : c,
              }))}
            />
            <Select
              label=""
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              options={[
                { value: "name", label: "Nom" },
                { value: "costOfLiving", label: "Coût de vie" },
                { value: "safety", label: "Sécurité" },
              ]}
              endIcon={
                <button
                  onClick={toggleSortOrder}
                  className="absolute right-10 top-1/2 -translate-y-1/2"
                >
                  <ArrowUpDown className="h-4 w-4 text-gray-400 transition-transform hover:scale-110" />
                </button>
              }
            />
          </div>
        </Card>

        {/* Liste des pays */}
        {filteredAndSortedCountries.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedCountries.map((country) => (
              <Link
                key={country.id}
                href={`/countries/${country.id}`}
                className="group rounded-xl border border-ocean-200 bg-white p-5 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {country.flag}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {country.name}
                      </h3>
                      <p className="text-xs text-gray-900">
                        {country.continent}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-900">
                      Coût de vie
                    </span>
                    <Badge
                      color={
                        country.costOfLiving < 50
                          ? "success"
                          : country.costOfLiving < 70
                            ? "warning"
                            : "error"
                      }
                      size="sm"
                    >
                      {country.costOfLiving}/100
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-900">
                      Sécurité
                    </span>
                    <Badge
                      color={
                        country.safety > 80
                          ? "success"
                          : country.safety > 70
                            ? "warning"
                            : "error"
                      }
                      size="sm"
                    >
                      {country.safety}/100
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-900">
                      Climat
                    </span>
                    <span className="text-xs font-medium text-gray-900">
                      {country.climate}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-ocean-200 bg-white p-12 text-center shadow-sm">
            <Globe className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Aucun pays trouvé
            </h2>
            <p className="mt-2 text-gray-900">
              Essayez de modifier vos filtres de recherche
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
