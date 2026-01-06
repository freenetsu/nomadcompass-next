"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, Globe } from "lucide-react";
import { Input, Select, Badge } from "@/components/ui";
import { Card } from "@/components/ui/Card";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

interface Country {
  id: string;
  name: string;
  flag: string;
  continent: string;
  data?: {
    costOfLivingIndex?: number;
    safetyIndex?: number;
    climate?: string;
  } | null;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [continentFilter, setContinentFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "costOfLiving" | "safety">(
    "name",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const continents = [
    "all",
    ...Array.from(new Set(countries.map((c) => c.continent))),
  ];

  const filteredAndSortedCountries = useMemo(() => {
    const result = countries.filter((country) => {
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
      } else if (sortBy === "costOfLiving") {
        const aValue = a.data?.costOfLivingIndex ?? 0;
        const bValue = b.data?.costOfLivingIndex ?? 0;
        comparison = aValue - bValue;
      } else if (sortBy === "safety") {
        const aValue = a.data?.safetyIndex ?? 0;
        const bValue = b.data?.safetyIndex ?? 0;
        comparison = aValue - bValue;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [countries, searchQuery, continentFilter, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ocean-50">
        <header className="border-b border-ocean-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SkeletonCard />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </main>
      </div>
    );
  }

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
                  {country.data?.costOfLivingIndex !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-900">
                        Coût de vie
                      </span>
                      <Badge
                        color={
                          country.data.costOfLivingIndex < 50
                            ? "success"
                            : country.data.costOfLivingIndex < 70
                              ? "warning"
                              : "error"
                        }
                        size="sm"
                      >
                        {country.data.costOfLivingIndex.toFixed(0)}/100
                      </Badge>
                    </div>
                  )}
                  {country.data?.safetyIndex !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-900">
                        Sécurité
                      </span>
                      <Badge
                        color={
                          country.data.safetyIndex > 80
                            ? "success"
                            : country.data.safetyIndex > 70
                              ? "warning"
                              : "error"
                        }
                        size="sm"
                      >
                        {country.data.safetyIndex.toFixed(0)}/100
                      </Badge>
                    </div>
                  )}
                  {country.data?.climate && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-900">
                        Climat
                      </span>
                      <span className="text-xs font-medium text-gray-900">
                        {country.data.climate}
                      </span>
                    </div>
                  )}
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
