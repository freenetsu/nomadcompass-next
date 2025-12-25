import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateRecommendations } from "@/lib/claude";
import type { QuestionnaireFormData } from "@/lib/validations/questionnaire";

export async function GET() {
  try {
    // Vérifier l'authentification
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
            "No questionnaire found. Please complete the questionnaire first.",
        },
        { status: 404 },
      );
    }

    // Récupérer tous les pays avec leurs données
    const countries = await prisma.country.findMany({
      include: {
        data: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (countries.length === 0) {
      return NextResponse.json(
        { error: "No country data available" },
        { status: 404 },
      );
    }

    // Préparer les données pour Claude
    const countriesForAnalysis = countries.map((country) => ({
      id: country.id,
      name: country.name,
      code: country.code,
      flag: country.flag,
      data: {
        costOfLivingIndex: country.data?.costOfLivingIndex ?? undefined,
        averageRent: country.data?.averageRent ?? undefined,
        averageSalary: country.data?.averageSalary ?? undefined,
        averageTemp: country.data?.averageTemp ?? undefined,
        climate: country.data?.climate ?? undefined,
        safetyIndex: country.data?.safetyIndex ?? undefined,
        healthcareIndex: country.data?.healthcareIndex ?? undefined,
        pollutionIndex: country.data?.pollutionIndex ?? undefined,
        transportIndex: country.data?.transportIndex ?? undefined,
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
        { error: "API configuration error. Please contact support." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 },
    );
  }
}
