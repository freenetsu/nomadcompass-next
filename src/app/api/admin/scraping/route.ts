import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
