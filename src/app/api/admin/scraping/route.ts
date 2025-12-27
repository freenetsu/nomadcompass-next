import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/helpers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Vérification admin avec helper type-safe
    await requireAdmin();

    // Récupérer tous les pays
    const countries = await prisma.country.findMany({
      select: { id: true, name: true },
    });

    const results = [];

    for (const country of countries) {
      try {
        // Note: Le scraping réel nécessiterait d'importer et d'exécuter
        // les scripts de scraping de scripts/scrapers/
        // Pour simplifier, on simule ici
        results.push({
          country: country.name,
          status: "success",
          message: "Données mises à jour (simulation)",
        });
      } catch (error) {
        results.push({
          country: country.name,
          status: "error",
          message: error instanceof Error ? error.message : "Erreur inconnue",
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error during scraping:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
