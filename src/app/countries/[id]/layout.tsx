import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const country = await prisma.countries.findUnique({
      where: { id: params.id },
      select: { name: true, flag: true, continent: true },
    });

    if (!country) {
      return {
        title: "Pays non trouvé",
      };
    }

    return {
      title: `${country.name} - Guide d'Expatriation`,
      description: `Découvrez toutes les informations pour expatrier en ${country.name} ${country.flag} : coût de vie, climat, sécurité, santé et qualité de vie. Guide complet pour votre installation.`,
      openGraph: {
        title: `${country.name} - Guide d'Expatriation | NomadCompass`,
        description: `Informations complètes pour expatrier en ${country.name}. Coût de vie, climat, sécurité et plus.`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Détails du Pays",
    };
  }
}

export default function CountryDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
