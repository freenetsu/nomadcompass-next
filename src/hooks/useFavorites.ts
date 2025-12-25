"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  continent: string;
  data?: {
    costOfLivingIndex?: number;
    averageRent?: number;
    safetyIndex?: number;
    healthcareIndex?: number;
  } | null;
}

interface Favorite {
  id: string;
  userId: string;
  countryId: string;
  createdAt: string;
  country: Country;
}

interface UseFavoritesReturn {
  favorites: Favorite[];
  isLoading: boolean;
  error: string | null;
  addFavorite: (countryId: string) => Promise<void>;
  removeFavorite: (favoriteId: string) => Promise<void>;
  isFavorite: (countryId: string) => boolean;
  toggleFavorite: (countryId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/favorites");

      if (!response.ok) {
        if (response.status === 401) {
          setFavorites([]);
          return;
        }
        throw new Error("Failed to fetch favorites");
      }

      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (countryId: string) => {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add favorite");
      }

      await fetchFavorites();
      toast.success("Pays ajouté aux favoris");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error adding favorite";
      setError(message);
      toast.error("Erreur lors de l'ajout aux favoris");
      throw err;
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      await fetchFavorites();
      toast.success("Pays retiré des favoris");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error removing favorite";
      setError(message);
      toast.error("Erreur lors de la suppression");
      throw err;
    }
  };

  const isFavorite = (countryId: string): boolean => {
    return favorites.some((fav) => fav.countryId === countryId);
  };

  const toggleFavorite = async (countryId: string) => {
    const favorite = favorites.find((fav) => fav.countryId === countryId);

    if (favorite) {
      await removeFavorite(favorite.id);
    } else {
      await addFavorite(countryId);
    }
  };

  return {
    favorites,
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    refetch: fetchFavorites,
  };
}
