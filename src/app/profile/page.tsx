"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, User as UserIcon, MapPin, Mail } from "lucide-react";
import Link from "next/link";

import { profileSchema, type ProfileFormData } from "@/lib/validations/profile";
import { Input } from "@/components/form/Input";
import { Label } from "@/components/form/Label";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  const fetchProfileData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user/profile");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        const errorMessage =
          errorData.error === "Unauthorized"
            ? "Non authentifié. Veuillez vous reconnecter."
            : errorData.error === "User not found"
            ? "Utilisateur introuvable dans la base de données."
            : errorData.error || `Erreur ${response.status}: ${response.statusText}`;

        throw new Error(errorMessage);
      }

      const data = await response.json();
      reset({
        name: data.name || "",
        location: data.location || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors du chargement du profil"
      );
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchProfileData();
    }
  }, [status, router, fetchProfileData]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSaving(true);

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      reset({
        name: updatedUser.name || "",
        location: updatedUser.location || "",
      });

      toast.success("Profil mis à jour avec succès");

      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Erreur lors de la mise à jour du profil");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-ocean-50">
        <header className="border-b border-ocean-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-ocean-200"></div>
              <div className="h-6 w-32 animate-pulse rounded bg-ocean-200"></div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="h-8 w-48 animate-pulse rounded bg-ocean-200"></div>
              <div className="h-10 w-full animate-pulse rounded bg-ocean-100"></div>
              <div className="h-10 w-full animate-pulse rounded bg-ocean-100"></div>
              <div className="h-10 w-full animate-pulse rounded bg-ocean-100"></div>
            </div>
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
            <div className="flex items-center gap-3">
              <UserIcon className="h-8 w-8 text-brand-500" />
              <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
            </div>
            <Link
              href="/home"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Informations personnelles
            </h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    Email
                  </div>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="bg-gray-50"
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  Votre adresse email ne peut pas être modifiée
                </p>
              </div>

              <div>
                <Label htmlFor="name">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    Nom complet
                  </div>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom"
                  {...register("name")}
                  error={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-error-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="location">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    Localisation
                  </div>
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Ville, Pays"
                  {...register("location")}
                  error={!!errors.location}
                />
                {errors.location && (
                  <p className="mt-1.5 text-xs text-error-600">
                    {errors.location.message}
                  </p>
                )}
                <p className="mt-1.5 text-xs text-gray-500">
                  Exemple : Paris, France
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" isLoading={isSaving} className="min-w-[150px]">
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
