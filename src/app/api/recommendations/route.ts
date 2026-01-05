import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateRecommendations } from "@/lib/claude";
import type { QuestionnaireFormData } from "@/lib/validations/questionnaire";

export async function GET() {
  try {
    // Vérifier l'authentification
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour accéder aux recommandations" },
        { status: 401 },
      );
    }

    // Récupérer le questionnaire de l'utilisateur
    const userResponse = await prisma.userResponse.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!userResponse) {
      return NextResponse.json(
        {
          error:
            "Aucun questionnaire trouvé. Veuillez d'abord compléter le questionnaire pour recevoir des recommandations personnalisées.",
        },
        { status: 404 },
      );
    }

    // Récupérer tous les pays avec leurs données
    const countries = await prisma.countries.findMany({
      include: {
        country_data: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (countries.length === 0) {
      return NextResponse.json(
        {
          error:
            "Aucune donnée de pays disponible. Veuillez contacter l'administrateur.",
        },
        { status: 404 },
      );
    }

    // Préparer les données pour Claude
    const countriesForAnalysis = countries.map((country) => ({
      id: country.id,
      name: country.name,
      code: country.code,
      flag: country.flag,
      country_data: {
        costOfLivingIndex: country.country_data?.costOfLivingIndex ?? undefined,
        averageRent: country.country_data?.averageRent ?? undefined,
        averageSalary: country.country_data?.averageSalary ?? undefined,
        averageTemp: country.country_data?.averageTemp ?? undefined,
        climate: country.country_data?.climate ?? undefined,
        safetyIndex: country.country_data?.safetyIndex ?? undefined,
        healthcareIndex: country.country_data?.healthcareIndex ?? undefined,
        pollutionIndex: country.country_data?.pollutionIndex ?? undefined,
        transportIndex: country.country_data?.transportIndex ?? undefined,
      },
    }));

    // Générer les recommandations avec Claude
    const questionnaire = userResponse.responses as QuestionnaireFormData;
    const recommendations = await generateRecommendations(
      questionnaire,
      countriesForAnalysis,
    );

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error generating recommendations:", error);

    if (error instanceof Error && error.message.includes("ANTHROPIC_API_KEY")) {
      return NextResponse.json(
        {
          error:
            "Erreur de configuration. Veuillez contacter l'administrateur.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error:
          "Impossible de générer les recommandations. Veuillez réessayer plus tard.",
      },
      { status: 500 },
    );
  }
}
