"use client";

import { useState, useEffect } from "react";

interface CountryData {
  id: string;
  name: string;
  code: string;
  flag: string;
  continent: string;
  data?: {
    costOfLivingIndex?: number;
    averageRent?: number;
    averageSalary?: number;
    averageTemp?: number;
    climate?: string;
    safetyIndex?: number;
    healthcareIndex?: number;
    pollutionIndex?: number;
    internetSpeed?: number;
    transportIndex?: number;
    rainfall?: number;
  } | null;
}

interface UseCountryReturn {
  country: CountryData | null;
  isLoading: boolean;
  error: string | null;
}

export function useCountry(id: string): UseCountryReturn {
  const [country, setCountry] = useState<CountryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/countries/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Pays non trouvé");
          }
          throw new Error("Erreur lors du chargement des données");
        }

        const data = await response.json();
        setCountry(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Une erreur est survenue";
        setError(message);
        setCountry(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCountry();
    }
  }, [id]);

  return {
    country,
    isLoading,
    error,
  };
}
